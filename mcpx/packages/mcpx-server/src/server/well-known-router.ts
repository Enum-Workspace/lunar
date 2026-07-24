import { OidcAuthConfig } from "@mcpx/shared-model";
import cors from "cors";
import { Router } from "express";

// LOCAL FORK PATCH (OIDC inbound auth): RFC 9728 protected-resource metadata.
// MCP clients (LibreChat) resolve this from the WWW-Authenticate challenge's
// resource_metadata URL — or by probing the well-known paths directly — to
// discover which authorization server (IdP) to run their OAuth flow against.
export function buildWellKnownRouter(oidc: OidcAuthConfig): Router {
  const router = Router();

  const metadata = {
    resource: oidc.resource,
    authorization_servers: [oidc.issuer],
    bearer_methods_supported: ["header"],
    scopes_supported: ["openid", "profile", "email"],
  };

  // Discovery must work from any origin (browser-based MCP clients probe it
  // cross-origin), unlike the operator-local control-plane CORS policy.
  router.use("/.well-known/oauth-protected-resource", cors({ origin: "*" }));
  // Root form plus the RFC 9728 path-inserted forms for each data-path route.
  for (const path of [
    "/.well-known/oauth-protected-resource",
    "/.well-known/oauth-protected-resource/mcp",
    "/.well-known/oauth-protected-resource/sse",
  ]) {
    router.get(path, (_req, res) => {
      res.json(metadata);
    });
  }

  return router;
}
