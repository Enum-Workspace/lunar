# MCPX Gateway — How To Use (Tenant A)

A per-tenant setup: **one LibreChat + one MCPX gateway** fronting on-prem MCP
servers (e.g. `erp-mcp`). MCPX aggregates the downstream servers, authenticates
the client, and enforces per-role tool access (RBAC).

---

## 1. The flow

```
  Browser (user logs in)
        │
        ▼
  LibreChat  ──────────────────────────────►  MCPX gateway  ─────────────►  erp-mcp (on-prem)
  :3080          x-lunar-api-key: <key>          :9000            x-mcp-gateway-secret       :3939
                 x-lunar-consumer-tag: <role>    /mcp             (from mcp.json)            /mcp
                                                   │
                                                   ├─ checks api key      (client ↔ gateway auth)
                                                   ├─ maps role → tools   (RBAC)
                                                   └─ forwards to erp     (gateway ↔ server auth)
```

**Three security boundaries:**

| Hop | Mechanism | Where configured |
|-----|-----------|------------------|
| Browser → LibreChat | LibreChat login (native auth, ADMIN/USER) | enum-chat |
| LibreChat → MCPX | `x-lunar-api-key` header must match `AUTH_KEY` | LibreChat MCP headers + MCPX `.env` |
| MCPX → erp-mcp | `x-mcp-gateway-secret` header must match erp-mcp | `mcp.json` + erp-mcp `.env` |

**RBAC:** LibreChat sends the logged-in user's role in `x-lunar-consumer-tag`
(via `{{LIBRECHAT_USER_ROLE}}`). MCPX matches it to a `consumers.<ROLE>` entry in
`app.yaml`, which allows/blocks named **tool groups**. Unknown roles hit the
`default` (deny-all).

> The role is used ONLY at the gateway. It is NOT forwarded to erp-mcp.

---

## 2. Components & ports

| Component | Where | Host port | Notes |
|-----------|-------|-----------|-------|
| LibreChat (`enum-chat`) | `../../../enum-chat` | 3080 | chat UI; MongoDB Atlas backend |
| LibreChat admin panel | same | 3000 | vendor-internal; manages MCP servers |
| MCPX server | this folder | 9000 | `/mcp` = data path (api-key protected) |
| MCPX control-plane UI | this folder | 5273 | tool groups / permissions / live traffic |
| MCPX metrics | this folder | 3001 | Prometheus |
| erp-mcp | `../../../erp-mcp` | 3939 | on-prem MCP server (`/mcp`) |

---

## 3. Config files (this folder)

```
config/app.yaml   → auth + RBAC (consumers, toolGroups, permissions)
config/mcp.json   → downstream MCP servers MCPX connects to
.env              → AUTH_KEY, GATEWAY_SHARED_SECRET, CORS_ORIGINS
docker-compose.yml
```

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
# Data path WITHOUT key → 403 (protected)
curl -s -o NUL -w "%{http_code}\n" -X POST http://localhost:9000/mcp `
  -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" `
  -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"initialize\",\"params\":{\"protocolVersion\":\"2024-11-05\",\"capabilities\":{},\"clientInfo\":{\"name\":\"t\",\"version\":\"1\"}}}"

# WITH key → 200
#   add:  -H "x-lunar-api-key: tenantA-client-key-change-me"

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

## 7. Add a NEW role

1. Make sure LibreChat actually issues that role string (this deployment issues
   only `ADMIN`/`USER` via native auth; custom roles need LibreChat custom-roles
   or OIDC). The value in `x-lunar-consumer-tag` must match the consumer key
   **exactly, case-sensitive**.
2. Add the consumer in `app.yaml`:
   ```yaml
       marketing:
         _type: default-block
         allow:
           - marketing-reads
   ```
   - `_type: default-block` + `allow: [...]` = only those groups (recommended).
   - `_type: default-allow` + `block: [...]` = everything except those groups.
3. Restart (or edit in UI).

Current roles: `ADMIN` (all tools), `USER` / `accountant` (finance-reads),
`marketing` (marketing-reads).

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

MCP server config is managed in the **admin panel** (stored in MongoDB), OR in a
`librechat.yaml` file (config-source). Server entry needs:
- `type: streamable-http`, `url: http://host.docker.internal:9000/mcp`
- header `x-lunar-api-key: tenantA-client-key-change-me`
- header `x-lunar-consumer-tag: {{LIBRECHAT_USER_ROLE}}`
- SSRF allow: `host.docker.internal:9000` (mcpSettings → allowed address)

If a DB/admin-panel server gets stuck proactively doing OAuth (404 errors,
"Access token missing"): **toggle "Requires OAuth" on then off** in the panel to
reset its stored OAuth state.

---

## 10. Local fork patches (IMPORTANT)

Two changes were made to the `lunar` source and are baked into your built image.
Re-apply them if you ever pull upstream `lunar`:

1. `mcpx/packages/mcpx-server/src/server/auth.ts` — missing api key returns **403**
   instead of 401. (A 401 makes LibreChat launch a doomed OAuth flow.)
2. `mcpx/packages/mcpx-server/src/server/build-server.ts` — the api-key guard
   protects **only** the `/mcp` data path; control-plane/UI routers use a no-op
   guard so the UI isn't locked out. Control plane relies on `:9000` being
   operator-local.

After changing MCPX source: `docker compose up -d --build mcpx`.

---

## 11. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| LibreChat "OAuth flow ... 404", tool calls fail | MCP client forcing OAuth on the server | toggle Requires OAuth off/on in panel; ensure MCPX returns 403 not 401 (patch) |
| MCPX UI "failed to fetch" | CORS origin mismatch or auth guard on control plane | set `CORS_ORIGINS` to UI origin; control-plane must be un-guarded (patch) |
| Role gets no tools | consumer `allow: []` or tag not matching a consumer | fix the consumer's `allow`, match role string exactly |
| `Domain ... is not allowed` in LibreChat | SSRF block | add `host.docker.internal:9000` to allowed addresses |
| erp-mcp "invalid gateway secret" | secret mismatch | `GATEWAY_SHARED_SECRET` (.env) must equal erp-mcp's |
| Config edit not applying | no file watcher | `docker compose restart mcpx` |
```
