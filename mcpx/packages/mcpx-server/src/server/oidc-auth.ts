import { OidcAuthConfig } from "@mcpx/shared-model";
import type { NextFunction, Request, Response } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { JWTVerifyGetKey } from "jose";
import { Logger } from "winston";
import { ConfigService } from "../config.js";
import { AuthGuard } from "./auth.js";

const CONSUMER_TAG_HEADER = "x-lunar-consumer-tag";

// Deliberately matches no permissions.consumers key, so resolution falls
// through to permissions.default. Do not name a consumer this.
export const UNMAPPED_CONSUMER_TAG = "unmapped";

// LOCAL FORK PATCH (OIDC inbound auth): unlike the apikey guard, this path
// returns spec-correct 401 + WWW-Authenticate challenges — that response is
// exactly what makes MCP clients (LibreChat) start their OAuth flow against
// the IdP advertised by /.well-known/oauth-protected-resource.

export function defaultJwksUri(oidc: OidcAuthConfig): string {
  if (oidc.jwksUri) {
    return oidc.jwksUri;
  }
  const issuer = oidc.issuer.replace(/\/+$/, "");
  return `${issuer}/protocol/openid-connect/certs`;
}

// RFC 9728: the metadata URL inserts the well-known suffix between the
// resource origin and the resource path.
export function protectedResourceMetadataUrl(resource: string): string {
  const url = new URL(resource);
  const path = url.pathname === "/" ? "" : url.pathname;
  return `${url.origin}/.well-known/oauth-protected-resource${path}`;
}

function extractBearerToken(req: Request): string | undefined {
  const raw = req.headers["authorization"];
  const header = Array.isArray(raw) ? raw[0] : raw;
  if (!header) {
    return undefined;
  }
  const [scheme, ...rest] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer") {
    return undefined;
  }
  const token = rest.join(" ").trim();
  return token.length > 0 ? token : undefined;
}

function claimValues(claim: unknown): string[] {
  if (typeof claim === "string") {
    return [claim];
  }
  if (Array.isArray(claim)) {
    return claim.filter((v): v is string => typeof v === "string");
  }
  return [];
}

/**
 * Builds an Express middleware enforcing IdP-issued Bearer JWTs on the
 * routes you mount it on.
 * - 401 + `WWW-Authenticate: Bearer resource_metadata="..."` when the token
 *   is missing or invalid (the challenge MCP clients use to begin OAuth)
 * - on success, derives the consumer tag from the configured roles claim and
 *   OVERWRITES the x-lunar-consumer-tag header so the client-asserted value
 *   can never reach permission checks (same pattern as nginx auth_request
 *   header injection)
 *
 * `getKey` is injectable for tests; defaults to a cached remote JWKS.
 */
export function buildOidcGuard(
  config: ConfigService,
  logger: Logger,
  getKey?: JWTVerifyGetKey,
): AuthGuard {
  const authConfig = config.getConfig().auth;
  const oidc = authConfig?.oidc;
  if (!oidc) {
    // The config schema rejects mode "oidc" without an oidc block; this
    // guard must never silently degrade to open access.
    throw new Error("OIDC auth guard requires an auth.oidc configuration");
  }

  const jwks = getKey ?? createRemoteJWKSet(new URL(defaultJwksUri(oidc)));
  const metadataUrl = protectedResourceMetadataUrl(oidc.resource);
  logger.info("OIDC auth guard is enabled", {
    issuer: oidc.issuer,
    audience: oidc.audience,
    rolesClaim: oidc.rolesClaim,
  });

  function challenge(res: Response, error?: string, description?: string): void {
    const params = [`resource_metadata="${metadataUrl}"`];
    if (error) {
      params.push(`error="${error}"`);
    }
    if (description) {
      params.push(`error_description="${description}"`);
    }
    res.setHeader("WWW-Authenticate", `Bearer ${params.join(", ")}`);
    res.status(401).send(`Unauthorized: ${description ?? "Bearer token required"}`);
  }

  return function (req: Request, res: Response, next: NextFunction): void {
    const token = extractBearerToken(req);
    if (!token) {
      logger.warn("No Bearer token provided, will not allow connection");
      challenge(res);
      return;
    }

    jwtVerify(token, jwks, {
      issuer: oidc.issuer,
      audience: oidc.audience,
      clockTolerance: 5,
    })
      .then(({ payload }) => {
        const roles = claimValues(payload[oidc.rolesClaim]).map((role) =>
          role.replace(/^\//, ""),
        );
        const consumers = config.getConfig().permissions.consumers;
        const matched = roles.find((role) =>
          Object.prototype.hasOwnProperty.call(consumers, role),
        );
        if (!matched) {
          logger.warn("Token has no role matching a configured consumer", {
            sub: payload.sub,
            roles,
          });
        }
        req.headers[CONSUMER_TAG_HEADER] = matched ?? UNMAPPED_CONSUMER_TAG;
        next();
      })
      .catch((e: unknown) => {
        const reason = e instanceof Error ? e.message : String(e);
        logger.warn("Invalid Bearer token, will not allow connection", {
          reason,
        });
        challenge(res, "invalid_token", "Token verification failed");
      });
  };
}
