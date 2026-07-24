import { noOpLogger } from "@mcpx/toolkit-core/logging";
import { ConfigService } from "../config.js";
import {
  AlreadyExistsError,
  IdpUnavailableError,
  NotFoundError,
} from "../errors.js";
import { resetEnv } from "../env.js";
import { Config } from "../model/config/config.js";
import { KeycloakAdminService } from "./keycloak-admin.js";

const ISSUER = "http://idp.test:8081/realms/tenant-a";
const ADMIN_BASE = "http://idp.test:8081/admin/realms/tenant-a";
const TOKEN_URL = `${ISSUER}/protocol/openid-connect/token`;

function makeConfig(overrides?: Partial<Config["auth"]>): Config {
  return {
    permissions: {
      default: { _type: "default-block", allow: [] },
      consumers: {},
      clientNames: {},
    },
    toolGroups: [],
    auth: {
      enabled: true,
      mode: "oidc",
      oidc: {
        issuer: ISSUER,
        audience: "aud",
        rolesClaim: "groups",
        resource: "http://gw.test:9000/mcp",
      },
      ...overrides,
    },
    toolExtensions: { services: {} },
    targetServerAttributes: {},
    skills: { enabled: [] },
  };
}

function stubConfigService(config: Config): ConfigService {
  return { getConfig: () => config } as ConfigService;
}

type RouteHandler = (init: RequestInit | undefined) => Response | Promise<Response>;

// Tiny fetch fake: maps "METHOD url" to handlers; records calls in order.
function makeFetch(routes: Record<string, RouteHandler | Response>): {
  fetchFn: typeof globalThis.fetch;
  calls: string[];
} {
  const calls: string[] = [];
  const fetchFn = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const method = (init?.method ?? "GET").toUpperCase();
    const key = `${method} ${url}`;
    calls.push(key);
    const handler = routes[key];
    if (!handler) {
      throw new Error(`Unexpected fetch: ${key}`);
    }
    return typeof handler === "function" ? handler(init) : handler.clone();
  }) as typeof globalThis.fetch;
  return { fetchFn, calls };
}

function json(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

function tokenResponse(expiresIn = 300, token = "tok-1"): Response {
  return json({ access_token: token, expires_in: expiresIn });
}

const originalEnv = { ...process.env };

function setEnv(extra: Record<string, string | undefined> = {}): void {
  process.env = {
    ...originalEnv,
    VERSION: "1.0.0",
    INSTANCE_ID: "0",
    KEYCLOAK_ADMIN_CLIENT_ID: "mcpx-admin",
    KEYCLOAK_ADMIN_CLIENT_SECRET: "s3cret",
    ...extra,
  };
  resetEnv();
}

function makeService(
  routes: Record<string, RouteHandler | Response>,
  config: Config = makeConfig(),
): { service: KeycloakAdminService; calls: string[] } {
  const { fetchFn, calls } = makeFetch(routes);
  return {
    service: new KeycloakAdminService(
      stubConfigService(config),
      noOpLogger,
      fetchFn,
    ),
    calls,
  };
}

beforeEach(() => setEnv());
afterEach(() => {
  process.env = { ...originalEnv, VERSION: "1.0.0", INSTANCE_ID: "0" };
  resetEnv();
});

describe("enablement / URL derivation", () => {
  it("is disabled without the admin client secret", () => {
    setEnv({ KEYCLOAK_ADMIN_CLIENT_SECRET: undefined });
    const { service } = makeService({});
    expect(service.isEnabled()).toBe(false);
  });

  it("is disabled in apikey mode and reports the mode", async () => {
    const config = makeConfig({ mode: "apikey" });
    const { service } = makeService({}, config);
    expect(service.isEnabled()).toBe(false);
    expect(await service.getStatus()).toEqual({
      enabled: false,
      mode: "apikey",
    });
  });

  it("reports mode off when auth is disabled entirely", async () => {
    const config = makeConfig({ enabled: false });
    const { service } = makeService({}, config);
    expect(await service.getStatus()).toEqual({ enabled: false, mode: "off" });
  });

  it("is disabled when the issuer is not a realm URL", () => {
    const config = makeConfig();
    config.auth.oidc = { ...config.auth.oidc!, issuer: "http://idp.test:8081" };
    const { service } = makeService({}, config);
    expect(service.isEnabled()).toBe(false);
  });

  it("tolerates a trailing slash on the issuer", async () => {
    const config = makeConfig();
    config.auth.oidc = { ...config.auth.oidc!, issuer: `${ISSUER}/` };
    const { service } = makeService(
      { [`POST ${TOKEN_URL}`]: tokenResponse() },
      config,
    );
    const status = await service.getStatus();
    expect(status).toEqual({
      enabled: true,
      mode: "oidc",
      reachable: true,
      realm: "tenant-a",
      issuer: ISSUER,
    });
  });
});

describe("getStatus", () => {
  it("reports unreachable when the token request fails", async () => {
    const { service } = makeService({
      [`POST ${TOKEN_URL}`]: () => {
        throw new Error("fetch failed");
      },
    });
    const status = await service.getStatus();
    expect(status.enabled).toBe(true);
    expect(status.reachable).toBe(false);
  });

  it("reports unreachable on rejected credentials", async () => {
    const { service } = makeService({
      [`POST ${TOKEN_URL}`]: json({ error: "unauthorized_client" }, { status: 401 }),
    });
    const status = await service.getStatus();
    expect(status.reachable).toBe(false);
  });
});

describe("token caching", () => {
  it("reuses an unexpired token across calls", async () => {
    const { service, calls } = makeService({
      [`POST ${TOKEN_URL}`]: () => tokenResponse(300),
      [`GET ${ADMIN_BASE}/groups?max=500`]: () => json([]),
    });
    await service.listGroups();
    await service.listGroups();
    expect(calls.filter((c) => c.startsWith("POST " + TOKEN_URL))).toHaveLength(1);
  });

  it("clears the cache and retries once on a 401 admin response", async () => {
    let adminCalls = 0;
    const { service, calls } = makeService({
      [`POST ${TOKEN_URL}`]: () => tokenResponse(300),
      [`GET ${ADMIN_BASE}/groups?max=500`]: () => {
        adminCalls += 1;
        return adminCalls === 1
          ? json({}, { status: 401 })
          : json([{ id: "g1", name: "accountant", path: "/accountant" }]);
      },
    });
    const groups = await service.listGroups();
    expect(groups).toEqual([{ id: "g1", name: "accountant" }]);
    expect(calls.filter((c) => c.startsWith("POST " + TOKEN_URL))).toHaveLength(2);
  });
});

describe("listUsers", () => {
  it("filters service accounts and joins top-level groups", async () => {
    const { service } = makeService({
      [`POST ${TOKEN_URL}`]: () => tokenResponse(),
      [`GET ${ADMIN_BASE}/users?max=1000&briefRepresentation=true`]: () =>
        json([
          { id: "u1", username: "fatima", email: "f@t.a", enabled: true },
          { id: "sa", username: "service-account-mcpx-admin", enabled: true },
        ]),
      [`GET ${ADMIN_BASE}/users/u1/groups`]: () =>
        json([
          { id: "g1", name: "accountant", path: "/accountant" },
          { id: "g2", name: "nested", path: "/parent/nested" },
        ]),
    });
    const users = await service.listUsers();
    expect(users).toEqual([
      {
        id: "u1",
        username: "fatima",
        email: "f@t.a",
        firstName: undefined,
        lastName: undefined,
        enabled: true,
        groups: ["accountant"],
      },
    ]);
  });
});

describe("createUser", () => {
  const groupsRoute = (): Response =>
    json([{ id: "g1", name: "accountant", path: "/accountant" }]);

  it("fails fast when the group does not exist", async () => {
    const { service, calls } = makeService({
      [`POST ${TOKEN_URL}`]: () => tokenResponse(),
      [`GET ${ADMIN_BASE}/groups?max=500`]: groupsRoute,
    });
    await expect(
      service.createUser({
        username: "x",
        password: "password1",
        group: "missing",
      }),
    ).rejects.toThrow(NotFoundError);
    expect(calls.some((c) => c.startsWith(`POST ${ADMIN_BASE}/users`))).toBe(false);
  });

  it("creates, sets password, joins group", async () => {
    const { service, calls } = makeService({
      [`POST ${TOKEN_URL}`]: () => tokenResponse(),
      [`GET ${ADMIN_BASE}/groups?max=500`]: groupsRoute,
      [`POST ${ADMIN_BASE}/users`]: () =>
        new Response(null, {
          status: 201,
          headers: { location: `${ADMIN_BASE}/users/u9` },
        }),
      [`PUT ${ADMIN_BASE}/users/u9/reset-password`]: () =>
        new Response(null, { status: 204 }),
      [`PUT ${ADMIN_BASE}/users/u9/groups/g1`]: () =>
        new Response(null, { status: 204 }),
      [`GET ${ADMIN_BASE}/users/u9`]: () =>
        json({ id: "u9", username: "nadia", enabled: true }),
      [`GET ${ADMIN_BASE}/users/u9/groups`]: () => groupsRoute(),
    });
    const user = await service.createUser({
      username: "nadia",
      password: "password1",
      group: "accountant",
    });
    expect(user.username).toBe("nadia");
    expect(user.groups).toEqual(["accountant"]);
    expect(calls).toContain(`PUT ${ADMIN_BASE}/users/u9/reset-password`);
  });

  it("rolls back the created user when group join fails", async () => {
    const { service, calls } = makeService({
      [`POST ${TOKEN_URL}`]: () => tokenResponse(),
      [`GET ${ADMIN_BASE}/groups?max=500`]: groupsRoute,
      [`POST ${ADMIN_BASE}/users`]: () =>
        new Response(null, {
          status: 201,
          headers: { location: `${ADMIN_BASE}/users/u9` },
        }),
      [`PUT ${ADMIN_BASE}/users/u9/reset-password`]: () =>
        new Response(null, { status: 204 }),
      [`PUT ${ADMIN_BASE}/users/u9/groups/g1`]: () =>
        json({ errorMessage: "boom" }, { status: 500 }),
      [`DELETE ${ADMIN_BASE}/users/u9`]: () =>
        new Response(null, { status: 204 }),
    });
    await expect(
      service.createUser({
        username: "nadia",
        password: "password1",
        group: "accountant",
      }),
    ).rejects.toThrow();
    expect(calls).toContain(`DELETE ${ADMIN_BASE}/users/u9`);
  });

  it("maps a Keycloak 409 to AlreadyExistsError", async () => {
    const { service } = makeService({
      [`POST ${TOKEN_URL}`]: () => tokenResponse(),
      [`GET ${ADMIN_BASE}/groups?max=500`]: groupsRoute,
      [`POST ${ADMIN_BASE}/users`]: () =>
        json({ errorMessage: "User exists with same username" }, { status: 409 }),
    });
    await expect(
      service.createUser({
        username: "fatima",
        password: "password1",
        group: "accountant",
      }),
    ).rejects.toThrow(AlreadyExistsError);
  });
});

describe("setUserGroup (move semantics)", () => {
  it("leaves nested/unmanaged groups, removes other managed ones, joins target", async () => {
    const { service, calls } = makeService({
      [`POST ${TOKEN_URL}`]: () => tokenResponse(),
      [`GET ${ADMIN_BASE}/groups?max=500`]: () =>
        json([
          { id: "g1", name: "accountant", path: "/accountant" },
          { id: "g2", name: "marketing", path: "/marketing" },
        ]),
      [`GET ${ADMIN_BASE}/users/u1/groups`]: () =>
        json([
          { id: "g1", name: "accountant", path: "/accountant" },
          { id: "g9", name: "nested", path: "/parent/nested" },
        ]),
      [`DELETE ${ADMIN_BASE}/users/u1/groups/g1`]: () =>
        new Response(null, { status: 204 }),
      [`PUT ${ADMIN_BASE}/users/u1/groups/g2`]: () =>
        new Response(null, { status: 204 }),
      [`GET ${ADMIN_BASE}/users/u1`]: () =>
        json({ id: "u1", username: "fatima", enabled: true }),
    });
    await service.setUserGroup("u1", "marketing");
    expect(calls).toContain(`DELETE ${ADMIN_BASE}/users/u1/groups/g1`);
    expect(calls).toContain(`PUT ${ADMIN_BASE}/users/u1/groups/g2`);
    expect(calls).not.toContain(`DELETE ${ADMIN_BASE}/users/u1/groups/g9`);
  });
});

describe("error mapping", () => {
  it("maps 404 to NotFoundError", async () => {
    const { service } = makeService({
      [`POST ${TOKEN_URL}`]: () => tokenResponse(),
      [`DELETE ${ADMIN_BASE}/users/nope`]: () => json({}, { status: 404 }),
    });
    await expect(service.deleteUser("nope")).rejects.toThrow(NotFoundError);
  });

  it("maps network failures to IdpUnavailableError", async () => {
    const { service } = makeService({
      [`POST ${TOKEN_URL}`]: () => {
        throw new TypeError("fetch failed");
      },
    });
    await expect(service.listGroups()).rejects.toThrow(IdpUnavailableError);
  });

  it("throws IdpUnavailableError when disabled", async () => {
    setEnv({ KEYCLOAK_ADMIN_CLIENT_SECRET: undefined });
    const { service } = makeService({});
    await expect(service.listGroups()).rejects.toThrow(IdpUnavailableError);
  });
});
