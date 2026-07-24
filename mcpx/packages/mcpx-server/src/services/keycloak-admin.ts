// LOCAL FORK PATCH (IdP management UI): thin client for the Keycloak Admin
// REST API backing the control-plane /idp endpoints. Authenticates with a
// per-tenant service-account client (client_credentials); everything is
// derived live from auth.oidc config so a config change only needs the usual
// restart, never a code change.
import { IdpGroup, IdpStatus, IdpUser } from "@mcpx/shared-model";
import { Logger } from "winston";
import z from "zod/v4";
import { ConfigService } from "../config.js";
import { env } from "../env.js";
import {
  AlreadyExistsError,
  IdpUnavailableError,
  NotFoundError,
} from "../errors.js";

const TOKEN_EXPIRY_SLACK_MS = 30_000;
const GROUPS_FETCH_CONCURRENCY = 10;

const tokenResponseSchema = z.looseObject({
  access_token: z.string(),
  expires_in: z.number(),
});

const kcUserSchema = z.looseObject({
  id: z.string(),
  username: z.string(),
  email: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  enabled: z.boolean(),
});
type KcUser = z.infer<typeof kcUserSchema>;

const kcGroupSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  path: z.string().nullish(),
});
type KcGroup = z.infer<typeof kcGroupSchema>;

interface ResolvedIdp {
  realm: string;
  issuer: string;
  adminBase: string;
  tokenUrl: string;
  clientId: string;
  clientSecret: string;
}

interface CreateUserInput {
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password: string;
  group: string;
}

// Only top-level groups can ever match a permissions.consumers key (the OIDC
// guard strips a single leading "/"), so nested groups are invisible here.
function isTopLevel(group: KcGroup): boolean {
  const path = group.path ?? `/${group.name}`;
  return path.split("/").length === 2;
}

export class KeycloakAdminService {
  private cachedToken: { accessToken: string; expiresAt: number } | undefined;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: Logger,
    private readonly fetchFn: typeof globalThis.fetch = globalThis.fetch,
  ) {}

  // Enabled only when oidc mode is fully configured AND the admin secret is
  // present — otherwise the whole feature self-disables (status reports why).
  private resolve(): ResolvedIdp | null {
    const auth = this.config.getConfig().auth;
    const secret = env.KEYCLOAK_ADMIN_CLIENT_SECRET;
    if (!auth?.enabled || auth.mode !== "oidc" || !auth.oidc || !secret) {
      return null;
    }
    const issuer = auth.oidc.issuer.replace(/\/+$/, "");
    const match = issuer.match(/^(.+)\/realms\/([^/]+)$/);
    if (!match || !match[1] || !match[2]) {
      this.logger.warn(
        "IdP admin disabled: issuer does not look like a Keycloak realm URL",
        { issuer },
      );
      return null;
    }
    return {
      realm: match[2],
      issuer,
      adminBase: `${match[1]}/admin/realms/${match[2]}`,
      tokenUrl: `${issuer}/protocol/openid-connect/token`,
      clientId: env.KEYCLOAK_ADMIN_CLIENT_ID,
      clientSecret: secret,
    };
  }

  isEnabled(): boolean {
    return this.resolve() !== null;
  }

  private mode(): IdpStatus["mode"] {
    const auth = this.config.getConfig().auth;
    if (!auth?.enabled) {
      return "off";
    }
    return auth.mode === "oidc" ? "oidc" : "apikey";
  }

  async getStatus(): Promise<IdpStatus> {
    const resolved = this.resolve();
    if (!resolved) {
      return { enabled: false, mode: this.mode() };
    }
    const base = {
      enabled: true,
      mode: "oidc" as const,
      realm: resolved.realm,
      issuer: resolved.issuer,
    };
    try {
      // Acquiring a token proves both reachability and credential validity.
      await this.getToken(resolved);
      return { ...base, reachable: true };
    } catch (e) {
      this.logger.warn("IdP status probe failed", {
        error: e instanceof Error ? e.message : String(e),
      });
      return { ...base, reachable: false };
    }
  }

  private requireResolved(): ResolvedIdp {
    const resolved = this.resolve();
    if (!resolved) {
      throw new IdpUnavailableError(
        "IdP management is not enabled on this instance",
      );
    }
    return resolved;
  }

  private async getToken(resolved: ResolvedIdp): Promise<string> {
    if (
      this.cachedToken &&
      this.cachedToken.expiresAt - TOKEN_EXPIRY_SLACK_MS > Date.now()
    ) {
      return this.cachedToken.accessToken;
    }
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: resolved.clientId,
      client_secret: resolved.clientSecret,
    });
    const response = await this.wrapNetwork(() =>
      this.fetchFn(resolved.tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }),
    );
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new IdpUnavailableError(
        `IdP token request failed (${response.status}): ${body.slice(0, 200)}`,
      );
    }
    const parsed = tokenResponseSchema.safeParse(await response.json());
    if (!parsed.success) {
      throw new IdpUnavailableError("IdP returned an invalid token response");
    }
    this.cachedToken = {
      accessToken: parsed.data.access_token,
      expiresAt: Date.now() + parsed.data.expires_in * 1000,
    };
    return this.cachedToken.accessToken;
  }

  private async wrapNetwork(fn: () => Promise<Response>): Promise<Response> {
    try {
      return await fn();
    } catch (e) {
      const reason = e instanceof Error ? e.message : String(e);
      throw new IdpUnavailableError(`IdP is unreachable: ${reason}`);
    }
  }

  private async adminFetch(
    path: string,
    init: RequestInit = {},
    notFoundMessage?: string,
  ): Promise<Response> {
    const resolved = this.requireResolved();
    const doFetch = async (): Promise<Response> => {
      const token = await this.getToken(resolved);
      return this.wrapNetwork(() =>
        this.fetchFn(`${resolved.adminBase}${path}`, {
          ...init,
          headers: {
            "Content-Type": "application/json",
            ...init.headers,
            Authorization: `Bearer ${token}`,
          },
        }),
      );
    };
    let response = await doFetch();
    if (response.status === 401) {
      this.cachedToken = undefined;
      response = await doFetch();
    }
    if (response.ok) {
      return response;
    }
    const body = await response.text().catch(() => "");
    const kcMessage = extractKeycloakMessage(body);
    if (response.status === 404) {
      throw new NotFoundError(notFoundMessage ?? kcMessage ?? "Not found");
    }
    if (response.status === 409) {
      throw new AlreadyExistsError(kcMessage ?? "Already exists");
    }
    throw new Error(
      `IdP admin request failed (${response.status} ${path}): ${kcMessage ?? body.slice(0, 200)}`,
    );
  }

  async listUsers(): Promise<IdpUser[]> {
    const response = await this.adminFetch(
      "/users?max=1000&briefRepresentation=true",
    );
    const users = z.array(kcUserSchema).parse(await response.json());
    // Keycloak lists service-account users too; hide them so an operator
    // cannot delete mcpx-admin's own account from this UI.
    const realUsers = users.filter(
      (u) => !u.username.startsWith("service-account-"),
    );
    const result: IdpUser[] = [];
    for (let i = 0; i < realUsers.length; i += GROUPS_FETCH_CONCURRENCY) {
      const chunk = realUsers.slice(i, i + GROUPS_FETCH_CONCURRENCY);
      const withGroups = await Promise.all(
        chunk.map(async (u) => this.toIdpUser(u, await this.userGroups(u.id))),
      );
      result.push(...withGroups);
    }
    return result;
  }

  async createUser(input: CreateUserInput): Promise<IdpUser> {
    // Resolve the group before creating anything so a bad group fails fast.
    const group = await this.findGroup(input.group);
    const response = await this.adminFetch("/users", {
      method: "POST",
      body: JSON.stringify({
        username: input.username,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        enabled: true,
        emailVerified: true,
      }),
    });
    const id = idFromLocation(response);
    if (!id) {
      throw new Error("IdP did not return the created user's id");
    }
    try {
      await this.resetPassword(id, { password: input.password, temporary: false });
      await this.adminFetch(`/users/${id}/groups/${group.id}`, {
        method: "PUT",
      });
    } catch (e) {
      // Best-effort rollback; a failed rollback leaves a visible, deletable
      // partial user, which beats silently keeping a half-configured one.
      await this.adminFetch(`/users/${id}`, { method: "DELETE" }).catch(
        (rollbackError: unknown) =>
          this.logger.warn("Failed to roll back partially-created user", {
            id,
            error:
              rollbackError instanceof Error
                ? rollbackError.message
                : String(rollbackError),
          }),
      );
      throw e;
    }
    return this.fetchUser(id);
  }

  async setEnabled(id: string, enabled: boolean): Promise<IdpUser> {
    // GET-then-PUT with the full representation: Keycloak treats PUT /users
    // as a full update and clears fields that are omitted.
    const response = await this.adminFetch(`/users/${id}`, {}, "User not found");
    const user = await response.json();
    await this.adminFetch(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...user, enabled }),
    });
    return this.fetchUser(id);
  }

  async resetPassword(
    id: string,
    input: { password: string; temporary: boolean },
  ): Promise<void> {
    await this.adminFetch(
      `/users/${id}/reset-password`,
      {
        method: "PUT",
        body: JSON.stringify({
          type: "password",
          value: input.password,
          temporary: input.temporary,
        }),
      },
      "User not found",
    );
  }

  async deleteUser(id: string): Promise<void> {
    await this.adminFetch(
      `/users/${id}`,
      { method: "DELETE" },
      "User not found",
    );
  }

  // Move semantics: the user ends up in exactly ONE managed (top-level realm)
  // group. The gateway resolves the role from the FIRST claim value matching
  // a consumer, so multiple managed groups would be order-dependent.
  async setUserGroup(id: string, groupName: string): Promise<IdpUser> {
    const target = await this.findGroup(groupName);
    const realmGroupIds = new Set(
      (await this.listGroupsRaw()).map((g) => g.id),
    );
    const current = await this.userGroupsRaw(id);
    for (const g of current) {
      if (isTopLevel(g) && realmGroupIds.has(g.id) && g.id !== target.id) {
        await this.adminFetch(`/users/${id}/groups/${g.id}`, {
          method: "DELETE",
        });
      }
    }
    await this.adminFetch(`/users/${id}/groups/${target.id}`, {
      method: "PUT",
    });
    return this.fetchUser(id);
  }

  async listGroups(): Promise<IdpGroup[]> {
    return (await this.listGroupsRaw()).map((g) => ({ id: g.id, name: g.name }));
  }

  async createGroup(name: string): Promise<IdpGroup> {
    const response = await this.adminFetch("/groups", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const id = idFromLocation(response);
    if (!id) {
      throw new Error("IdP did not return the created group's id");
    }
    return { id, name };
  }

  private async listGroupsRaw(): Promise<KcGroup[]> {
    const response = await this.adminFetch("/groups?max=500");
    const groups = z.array(kcGroupSchema).parse(await response.json());
    return groups.filter(isTopLevel);
  }

  private async findGroup(name: string): Promise<KcGroup> {
    const group = (await this.listGroupsRaw()).find((g) => g.name === name);
    if (!group) {
      throw new NotFoundError(`Group "${name}" not found`);
    }
    return group;
  }

  private async userGroupsRaw(id: string): Promise<KcGroup[]> {
    const response = await this.adminFetch(
      `/users/${id}/groups`,
      {},
      "User not found",
    );
    return z.array(kcGroupSchema).parse(await response.json());
  }

  private async userGroups(id: string): Promise<string[]> {
    return (await this.userGroupsRaw(id))
      .filter(isTopLevel)
      .map((g) => g.name);
  }

  private async fetchUser(id: string): Promise<IdpUser> {
    const response = await this.adminFetch(`/users/${id}`, {}, "User not found");
    const user = kcUserSchema.parse(await response.json());
    return this.toIdpUser(user, await this.userGroups(id));
  }

  private toIdpUser(user: KcUser, groups: string[]): IdpUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email ?? undefined,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      enabled: user.enabled,
      groups,
    };
  }
}

function idFromLocation(response: Response): string | undefined {
  const location = response.headers.get("location");
  const id = location?.split("/").pop();
  return id || undefined;
}

function extractKeycloakMessage(body: string): string | undefined {
  try {
    const parsed = JSON.parse(body) as Record<string, unknown>;
    const message = parsed["errorMessage"] ?? parsed["error_description"];
    return typeof message === "string" ? message : undefined;
  } catch {
    return undefined;
  }
}
