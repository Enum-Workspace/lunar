# MCPX Gateway — How To Use (Tenant A)

A per-tenant setup: **one LibreChat + one MCPX gateway** fronting on-prem MCP
servers (e.g. `erp-mcp`). MCPX aggregates the downstream servers, authenticates
the client, and enforces per-role tool access (RBAC).

---

## 1. The flow (OIDC mode — current)

```
  Browser (user) ──native login──► LibreChat :3080
        │                              │ first MCP use → 401 challenge from MCPX
        └──────► Keycloak :8081 ◄──────┘ per-user OAuth (PKCE), user signs in
                 realm tenant-a               │
                 (per-tenant IdP,             ▼ Bearer <user JWT>
                  Neon Postgres)     MCPX gateway :9000 /mcp ────────────► erp-mcp :3939
                                       │                   x-mcp-gateway-secret (mcp.json)
                                       ├─ verifies JWT (JWKS, issuer, audience)
                                       ├─ maps token `groups` claim → consumerTag → tools (RBAC)
                                       └─ forwards to erp (gateway ↔ server auth)
```

**Security boundaries:**

| Hop | Mechanism | Where configured |
|-----|-----------|------------------|
| Browser → LibreChat | LibreChat login (native auth) — unchanged | enum-chat |
| User → gateway | per-user Keycloak OAuth; MCPX verifies the JWT | `app.yaml` `auth.oidc` + Keycloak realm |
| MCPX → erp-mcp | `x-mcp-gateway-secret` header must match erp-mcp | `mcp.json` + erp-mcp `.env` |

**RBAC (spoof-proof):** the role comes from the **verified token's `groups`
claim** (Keycloak group membership), never from a client header. MCPX overwrites
`x-lunar-consumer-tag` with the claim-derived role, matches it to a
`consumers.<ROLE>` entry in `app.yaml`, and that allows/blocks named **tool
groups**. Tokens with no matching group get the sentinel `unmapped` → `default`
(deny-all).

> Each user has TWO logins: the LibreChat native login (chat app) and the
> Keycloak login (gateway connection, prompted once then kept alive by refresh
> tokens). The role is used ONLY at the gateway; it is NOT forwarded to erp-mcp.

**Fallback:** set `auth.mode: apikey` in `app.yaml` (or remove `mode`) to return
to the old static-key scheme (`x-lunar-api-key` = `AUTH_KEY`, role from the
`x-lunar-consumer-tag` header — spoofable, but works without Keycloak).

---

## 2. Components & ports

| Component | Where | Host port | Notes |
|-----------|-------|-----------|-------|
| LibreChat (`enum-chat`) | `../../../enum-chat` | 3080 | chat UI; MongoDB Atlas backend |
| LibreChat admin panel | same | 3000 | vendor-internal; manages MCP servers |
| MCPX server | this folder | 9000 | `/mcp` = data path (JWT-protected in oidc mode) |
| MCPX control-plane UI | this folder | 5273 | tool groups / permissions / live traffic |
| MCPX metrics | this folder | 3001 | Prometheus |
| Keycloak (per-tenant IdP) | this folder | 8081 | realm `tenant-a`; admin console + OIDC; Neon Postgres backend |
| erp-mcp | `../../../erp-mcp` | 3939 | on-prem MCP server (`/mcp`) |

> Keycloak's ONE canonical URL is `http://100.88.11.69:8081` (the host's
> **Tailscale IP**). It's reachable from the browser AND from inside containers
> (verified), and unlike `host.docker.internal` it doesn't depend on a
> Docker-managed hosts entry that goes stale when the hotspot IP changes. This
> keeps the token issuer consistent everywhere. If the Tailscale IP ever
> changes, update it in three places: `KC_HOSTNAME` (docker-compose.yml),
> `auth.oidc.issuer` (config/app.yaml), and LibreChat's `allowedAddresses`.
> Local dev is plain HTTP (`sslRequired: none`) — front with TLS in production.

---

## 3. Config files (this folder)

```
config/app.yaml   → auth mode + oidc settings + RBAC (consumers, toolGroups, permissions)
config/mcp.json   → downstream MCP servers MCPX connects to
.env              → AUTH_KEY (fallback), KC_* (Keycloak DB/admin), GATEWAY_SHARED_SECRET, CORS_ORIGINS
keycloak/realm-tenant-a.json → realm import (groups, test users, librechat client)
docker-compose.yml
```

> The realm JSON is applied only on first start against an empty Keycloak DB
> (`--import-realm` skips existing realms). After that, manage users/groups in
> the admin console — realm state lives in the Neon DB, not the file.

The `config/` folder is bind-mounted into the container, so edits persist to disk
and survive rebuilds. **The files are the source of truth.**

- Edit a file → **restart** to apply: `docker compose restart mcpx`
- Edit in the UI (5273) → applied live AND written back to the file (no restart)
- Don't do both at once — the UI rewrites the whole file (and strips comments).

---

## 4. Start / stop / logs (commands)

### MCPX (from this folder)
```powershell
cd C:\Users\Saminu\Documents\Enum\lunar\deploy\tenant-a

docker compose up -d --build        # first run / after a code patch
docker compose up -d                 # normal start
docker compose restart mcpx          # apply a hand-edited config file
docker compose down                  # stop
docker logs mcpx-tenant-a --tail 40 -f   # logs
```

### erp-mcp (on-prem server)
```powershell
cd C:\Users\Saminu\Documents\Enum\erp-mcp
npm run start:http                   # listens on :3939/mcp (needs gateway secret)
```

### LibreChat
```powershell
cd C:\Users\Saminu\Documents\Enum\enum-chat
docker compose up -d --no-deps api admin-panel   # Atlas-backed; keep --no-deps
docker logs LibreChat --tail 40 -f
```

---

## 5. Verify it works (curl)

```powershell
# Data path WITHOUT a token → 401 + WWW-Authenticate challenge (oidc mode)
curl -s -i -X POST http://localhost:9000/mcp `
  -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" `
  -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"initialize\",\"params\":{\"protocolVersion\":\"2024-11-05\",\"capabilities\":{},\"clientInfo\":{\"name\":\"t\",\"version\":\"1\"}}}"

# Discovery metadata (what MCP clients use to find the IdP):
curl -s http://localhost:9000/.well-known/oauth-protected-resource/mcp

# Get a real user token (test users; direct-access grant is enabled for dev):
curl -s -X POST http://host.docker.internal:8081/realms/tenant-a/protocol/openid-connect/token `
  -d "grant_type=password&client_id=librechat&username=fatima&password=fatima123&scope=openid profile email"
# → take .access_token from the JSON, then call /mcp with:
#   -H "Authorization: Bearer <access_token>"
# fatima (accountant group) lists finance-reads tools; bob/bob123 (marketing)
# lists marketing-reads tools. A spoofed -H "x-lunar-consumer-tag: ADMIN"
# changes NOTHING — the gateway overwrites it from the verified token.

# In apikey fallback mode instead: no key → 403; with
#   -H "x-lunar-api-key: tenantA-client-key-change-me" → 200

# See which role called what (audit log) — persisted on the host:
#   ./audit-logs/audit-<date>T<hour>.jsonl   (one JSON line per tool call)
docker exec mcpx-tenant-a sh -c "tail -5 $(ls -t /lunar/packages/mcpx-server/audit-logs/*.jsonl | head -1)"
```

Direct call to erp-mcp without the gateway secret must return 401 (bypass block):
```powershell
curl -s -o NUL -w "%{http_code}\n" -X POST http://localhost:3939/mcp -H "Content-Type: application/json" -d "{}"
```

---

## 6. Add a NEW downstream MCP server

Say you add `hr-mcp` at `http://host.docker.internal:4000/mcp`.

**Step 1 — register it** in `config/mcp.json`:
```json
{
  "mcpServers": {
    "erp": {
      "type": "streamable-http",
      "url": "http://host.docker.internal:3939/mcp",
      "headers": { "x-mcp-gateway-secret": { "fromEnv": "GATEWAY_SHARED_SECRET" } }
    },
    "hr": {
      "type": "streamable-http",
      "url": "http://host.docker.internal:4000/mcp",
      "headers": { "x-mcp-gateway-secret": { "fromEnv": "HR_GATEWAY_SECRET" } }
    }
  }
}
```
Add `HR_GATEWAY_SECRET=...` to `.env` (and the matching secret on hr-mcp).

**Step 2 — group its tools** in `config/app.yaml` under `toolGroups` (the service
key `hr` must match the name in `mcp.json`):
```yaml
toolGroups:
  - name: hr-reads
    services:
      hr:
        - list_employees
        - leave_balance
```

**Step 3 — grant a role access** in `app.yaml` under `permissions.consumers`:
```yaml
    accountant:
      _type: default-block
      allow:
        - finance-reads
        - hr-reads        # accountant can now use hr-reads too
```

**Step 4 — apply:** `docker compose restart mcpx`

> Or do all of this in the UI at :5273 (Servers / Tool Groups / Permissions) —
> it writes the same files, no restart needed.

`host.docker.internal` = your host machine from inside the container (works on
Docker Desktop). Remote servers use their real URL.

---

## 7. Add a NEW role, or a NEW user

**New user with an existing role (no config changes):**
1. Keycloak admin console `http://host.docker.internal:8081` → realm `tenant-a`
   → Users → Add user, set a password (Credentials tab, temporary off).
2. Groups tab → Join `accountant` (or `marketing`).
3. Done. The user logs into LibreChat as normal; the first MCP use prompts the
   Keycloak sign-in, and their group drives their tools.

**New role (e.g. `hr`):**
1. Keycloak: create group `hr`, add its users. The group name must match the
   consumer key **exactly, case-sensitive** (MCPX strips a leading `/`).
2. Add the consumer in `app.yaml`:
   ```yaml
       hr:
         _type: default-block
         allow:
           - hr-reads
   ```
   - `_type: default-block` + `allow: [...]` = only those groups (recommended).
   - `_type: default-allow` + `block: [...]` = everything except those groups.
3. Restart MCPX (or edit in UI). Users already signed in pick the new group up
   on their next token refresh (minutes).

Current roles: `accountant` (finance-reads), `marketing` (marketing-reads).
`ADMIN`/`USER` remain in `app.yaml` only for the apikey fallback mode. A token
whose groups match no consumer gets `unmapped` → default deny-all.

---

## 8. Add a NEW tenant

Copy this whole folder:
```powershell
cp -r tenant-a tenant-b
```
Then in `tenant-b/`:
- `.env`: new `AUTH_KEY`, new `GATEWAY_SHARED_SECRET`, `CORS_ORIGINS` for its UI port.
- `docker-compose.yml`: unique `container_name` and host ports (e.g. 9001, 5274, 3002).
- `config/mcp.json`: point at that tenant's on-prem servers.
- Deploy a separate LibreChat for tenant B, pointing its MCP server at `:9001`.

Each tenant = its own MCPX + LibreChat = full isolation.

---

## 9. LibreChat side (client)

Configured in `enum-chat/librechat.yaml` (bind-mounted via
`docker-compose.override.yml`). The `erp` server entry uses per-user OAuth:
- `type: streamable-http`, `url: http://host.docker.internal:9000/mcp`
- `oauth: { client_id: librechat, scope: "openid profile email offline_access" }`
  — endpoints are auto-discovered from MCPX's 401 challenge + `/.well-known`
- SSRF allow: `host.docker.internal:9000` AND `host.docker.internal:8081`
  (mcpSettings → allowedAddresses)
- NO auth headers — the old `x-lunar-api-key` / `x-lunar-consumer-tag` headers
  are gone (in oidc mode the gateway ignores/overwrites the tag anyway)

The Keycloak client's redirect URI is bound to the server name:
`http://localhost:3080/api/mcp/erp/oauth/callback`. Renaming the `erp` entry in
librechat.yaml means updating the redirect URI in Keycloak too.

If a server gets stuck mid-OAuth ("Access token missing", 404 loops):
**toggle "Requires OAuth" on then off** in the admin panel to reset its stored
OAuth state.

---

## 10. Local fork patches (IMPORTANT)

These changes were made to the `lunar` source and are baked into your built
image. Re-apply them if you ever pull upstream `lunar`:

1. `mcpx/packages/mcpx-server/src/server/auth.ts` — missing api key returns **403**
   instead of 401 (apikey mode only; a bare 401 makes LibreChat launch a doomed
   OAuth flow when there's no IdP behind it).
2. `mcpx/packages/mcpx-server/src/server/build-server.ts` — the auth guard
   protects **only** the `/mcp` data path; control-plane/UI routers use a no-op
   guard so the UI isn't locked out. Control plane relies on `:9000` being
   operator-local. Also selects the guard by `auth.mode` and mounts the
   well-known router in oidc mode.
3. **OIDC inbound auth (new):**
   - `mcpx/packages/shared-model/src/config/config.ts` — `auth.mode` +
     `auth.oidc` schema (issuer, audience, rolesClaim, resource, jwksUri).
   - `mcpx/packages/mcpx-server/src/server/oidc-auth.ts` — JWT guard (jose):
     verifies Bearer tokens against the IdP JWKS, 401 + `WWW-Authenticate`
     challenge, maps `groups` claim → `x-lunar-consumer-tag` (overwrites the
     client-sent header → roles are spoof-proof).
   - `mcpx/packages/mcpx-server/src/server/well-known-router.ts` — RFC 9728
     `/.well-known/oauth-protected-resource` discovery endpoints.
   - `mcpx/packages/mcpx-server/src/model/config/config.ts` — auth type mirror;
     `package.json` — added `jose`.
   - Tests: `mcpx/packages/mcpx-server/src/server/oidc-auth.test.ts`.

After changing MCPX source: `docker compose up -d --build mcpx`.

---

## 11. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Browser can't reach Keycloak login page | `host.docker.internal` not resolving on host | `ping host.docker.internal`; if missing, add `127.0.0.1 host.docker.internal` to the hosts file |
| MCPX log: "Token verification failed" (issuer) | token `iss` ≠ `auth.oidc.issuer` | all parties must use `http://host.docker.internal:8081`; check `KC_HOSTNAME` |
| MCPX log: "Token verification failed" (audience) | `aud` claim missing | the `mcpx-audience` mapper on the `librechat` client must emit `http://host.docker.internal:9000/mcp` |
| User authenticated but sees no tools | groups claim not matching a consumer (→ `unmapped`) | user must be in a Keycloak group whose name equals a `consumers.<ROLE>` key (case-sensitive) |
| Keycloak won't start / realm missing | Neon DB unreachable or empty-import skipped | check `KC_DB_*` in `.env`; `docker logs keycloak-tenant-a`; realm imports only into an empty DB |
| LibreChat "OAuth flow ... 404", tool calls fail (apikey mode) | MCP client forcing OAuth with no IdP behind the server | toggle Requires OAuth off/on in panel; apikey mode returns 403 not 401 (patch) |
| MCPX UI "failed to fetch" | CORS origin mismatch or auth guard on control plane | set `CORS_ORIGINS` to UI origin; control-plane must be un-guarded (patch) |
| Role gets no tools | consumer `allow: []` or tag not matching a consumer | fix the consumer's `allow`, match role string exactly |
| `Domain ... is not allowed` in LibreChat | SSRF block | add `host.docker.internal:9000` and `host.docker.internal:8081` to allowedAddresses |
| erp-mcp "invalid gateway secret" | secret mismatch | `GATEWAY_SHARED_SECRET` (.env) must equal erp-mcp's |
| Config edit not applying | no file watcher | `docker compose restart mcpx` |
```
