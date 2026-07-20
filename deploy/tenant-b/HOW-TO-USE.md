# MCPX Gateway — How To Use (Tenant B)

Second tenant with its own Keycloak realm + Neon branch, but the **same standard
ports as Tenant A** (only one tenant runs at a time — Tenant A is stopped while
Tenant B is up). Fronts the **same** on-prem `erp-mcp`. Adds the **Identity
page** — a UI for managing Keycloak users and roles without the Keycloak console.

## Components & ports

| Component | Host port | Notes |
|-----------|-----------|-------|
| MCPX server | 9000 | `/mcp` = data path (JWT-protected, oidc mode) |
| MCPX control-plane UI | 5273 | includes the **Identity** page |
| MCPX metrics | 3001 | Prometheus |
| Keycloak (IdP) | 8081 | realm `tenant-b`; Neon-backed |
| erp-mcp | 3939 | shared on-prem MCP server (run from `../../../erp-mcp`) |

> These are the same ports Tenant A uses. **Stop Tenant A before starting Tenant
> B** (`docker compose down` in `deploy/tenant-a`) or they clash. Because MCPX is
> on the default 9000, the UI needs no `VITE_MCPX_SERVER_PORT` override.

Keycloak's canonical URL is `http://100.88.11.69:8081` (host Tailscale IP —
reachable from the browser AND containers; see tenant-a's guide for why).

## Auth flow (oidc)

Per-user Keycloak OAuth: a client hits MCPX `:9000/mcp`, gets a 401 challenge,
runs OAuth against `tenant-b` realm, and MCPX verifies the JWT and derives the
tool role from the token's `groups` claim (spoof-proof). Same design as tenant-a.

## The Identity page (`:5273/identity`)

Manages the `tenant-b` realm through MCPX's own service-account client
(`mcpx-admin`, least-privilege `realm-management` roles). Requires
`auth.mode: oidc` + `KEYCLOAK_ADMIN_CLIENT_SECRET` (both set in `.env`); if either
is missing the page shows a "not enabled" setup card.

- **Users tab** — list users with role + enabled state; create a user (username,
  email, password, role); change role; enable/disable; reset password; delete.
- **Roles tab** — list Keycloak groups, showing which map to a
  `permissions.consumers` entry and which tool groups they grant. **Create role**
  (name + pick tool groups) creates the Keycloak group AND the matching gateway
  consumer, writing both to `config/app.yaml`. Each existing role has an **Edit
  tools / Add tools** button to change its granted tool groups (also writes to
  the config file).

**Change role = move semantics**: a user holds exactly one managed (top-level)
role group; changing it removes the previous one. (The gateway resolves the role
from the first claim matching a consumer, so one group per user is unambiguous.)

**Creating/editing a role writes to `app.yaml`** via the same config API the
Tools page uses (consumer `_type: default-block`, `allow: [<selected tool
groups>]`). Tool groups themselves are still defined on the Tools page; the
Identity page attaches existing ones to roles. Role names must match the
consumer key exactly (case-sensitive, no spaces). "Allow-all" roles (like ADMIN)
are shown read-only here — manage those on the Tools page.

## Start / stop

```powershell
cd C:\Users\Saminu\Documents\Enum\lunar\deploy\tenant-b
docker compose up -d --build          # first run (KC first-boot migration ~6-7 min)
docker compose down                    # stop
docker logs mcpx-tenant-b --tail 40 -f
docker logs keycloak-tenant-b --tail 40 -f
```

erp-mcp (shared, run once): `cd ../../../erp-mcp && npm run start:http`.

## Verify

```powershell
# IdP status (should be enabled + reachable):
curl -s http://localhost:9000/idp/status
# Users (test users, no service-account rows):
curl -s http://localhost:9000/idp/users
# Unauthenticated data path → 401 challenge:
curl -s -i -X POST http://localhost:9000/mcp -H "Content-Type: application/json" -d "{}"
```

Test users: `fatima`/`fatima123` (accountant), `bob`/`bob123` (marketing).
Keycloak admin console: `http://100.88.11.69:8081` → `admin` / `tenantB-kc-admin-change-me`.

## Local fork patches (baked into the image)

Beyond tenant-a's patches (403-on-missing-key, control-plane guard split, OIDC
inbound auth), this build adds the **Identity / Keycloak-admin feature**:
- `shared-model/src/api/idp.ts` — idp request/response schemas
- `mcpx-server/src/services/keycloak-admin.ts` — Keycloak Admin API client
- `mcpx-server/src/server/idp.ts` — `/idp` control-plane router (mounted in `build-server.ts`)
- `mcpx-server/src/env.ts` — `KEYCLOAK_ADMIN_CLIENT_ID`/`SECRET`
- `mcpx-server/src/errors.ts` — `IdpUnavailableError`
- `ui/src/pages/Identity.tsx` + `ui/src/components/identity/*` + `ui/src/data/idp.ts` + `ui/src/lib/api.ts` idp methods + routes/sidebar entries

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Identity page shows "not enabled" | `auth.mode` ≠ oidc, or no admin secret | check `app.yaml` mode + `KEYCLOAK_ADMIN_CLIENT_SECRET` in `.env`, restart mcpx |
| Status `reachable: false` | Keycloak down / bad secret / Tailscale IP changed | `docker logs keycloak-tenant-b`; verify the client_credentials curl below |
| `/idp/*` returns 503 | feature disabled at request time | same as "not enabled" |
| Keycloak won't migrate | Neon idle-in-transaction timeout | `ALTER ROLE neondb_owner SET idle_in_transaction_session_timeout = 0;` on the branch |
| Browser can't reach `:8081` | Tailscale off / IP changed | ensure Tailscale up; update `KC_HOSTNAME` + `app.yaml` issuer if IP changed |
| UI shows "Not Connected" | Tenant A still running on the same ports, or a stale cached `config.json` | stop Tenant A (`docker compose down` in `deploy/tenant-a`); hard-refresh the browser (Ctrl+Shift+R) |

Verify the admin service account works:
```powershell
curl -s -X POST http://100.88.11.69:8081/realms/tenant-b/protocol/openid-connect/token `
  -d "grant_type=client_credentials&client_id=mcpx-admin&client_secret=tenantB-mcpx-admin-secret-change-me"
```
