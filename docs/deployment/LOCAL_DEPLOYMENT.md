# Local / On-Premises Deployment — MAS9 Power (AU)

This guide covers running the `mas9power.masready.com.au` instance on a customer's
own infrastructure — laptop, VM, or internal server — without any cloud dependency.

---

## What gets deployed

The MASReady SPA is a **static React application** bundled at build time.
All MAS9 Power demo data is embedded in the bundle (from `seed-data/mas9-power/`
and `artifacts/masready/src/lib/constants.ts`). No live API or database is
required for the demo tenant.

---

## Prerequisites

| Requirement | Minimum version | Notes |
|-------------|----------------|-------|
| Docker Engine | 24+ | Docker Desktop works on Windows/Mac |
| Docker Compose | v2 (plugin) | Included in Docker Desktop |
| Port 80 free | — | Or remap in `docker-compose.yml` |

If Docker is not available, see the **No-Docker option** below.

---

## Option A — Docker Compose (recommended)

```bash
# 1. Clone the repository (or copy the repo folder to the customer machine)
git clone https://github.com/paananiruddh/masready.git
cd masready

# 2. Build and start
docker compose -f deploy/local/docker-compose.yml up --build -d

# 3. Open in browser
#    http://localhost        (if on the same machine)
#    http://<server-ip>      (if on a server on the local network)
```

To stop:
```bash
docker compose -f deploy/local/docker-compose.yml down
```

To rebuild after a code update:
```bash
docker compose -f deploy/local/docker-compose.yml up --build -d
```

### Change the port

Edit `deploy/local/docker-compose.yml`:
```yaml
ports:
  - "8080:80"   # serve on port 8080 instead of 80
```

---

## Option B — No-Docker (Node.js + serve)

Use this if Docker is not available on the customer machine.

```bash
# 1. Install Node.js 24+ and pnpm
npm install -g pnpm

# 2. Install dependencies
pnpm install --frozen-lockfile

# 3. Build the SPA
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/masready run build

# 4. Serve the output (pick one)
#    a) npx serve
npx serve artifacts/masready/dist/public -l 80

#    b) Python (zero-install)
cd artifacts/masready/dist/public && python3 -m http.server 80
```

> **SPA routing note:** The Python option does not handle client-side routes
> (e.g. `/features`, `/mas9-power`). Deep-linking will 404. Use `npx serve`
> or nginx instead for full SPA routing support.

---

## Option C — nginx (no Docker)

```bash
# After building (step 3 above), copy the dist folder to your nginx docroot:
sudo cp -r artifacts/masready/dist/public/* /var/www/html/

# Copy the nginx site config
sudo cp deploy/local/nginx.conf /etc/nginx/conf.d/masready.conf
sudo nginx -s reload
```

---

## Accessing the app from another machine

If deployed on an internal server (not localhost), open the server's IP in a
browser:

```
http://192.168.1.x/
```

For a friendly hostname, add an entry to the customer's `/etc/hosts` (or Windows
`C:\Windows\System32\drivers\etc\hosts`):

```
192.168.1.x   mas9power.local
```

Then access via `http://mas9power.local/`.

No DNS changes to `masready.com.au` are needed — this is fully air-gapped.

---

## Customer-specific data

The default build includes the fictional **MAS9 Power** demo dataset.
To deploy with real customer data:

1. Replace files in `seed-data/mas9-power/` with customer-provided seed files.
2. Update `artifacts/masready/src/lib/constants.ts` (`DEMO_METRICS`) with
   customer-specific metrics.
3. Rebuild following step 3 above.

See `project-memory/CUSTOMER_TENANT_MODEL.md` for data safety requirements
before working with real customer data.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Port 80 already in use | Change `"80:80"` → `"8080:80"` in `docker-compose.yml` |
| `PORT` env var error during build | Ensure you're passing `PORT=3000` before the pnpm command |
| Routes 404 after page refresh (no-Docker) | Use `npx serve` or nginx — Python's HTTP server doesn't support SPA fallback |
| Docker build fails on `pnpm install` | Run `pnpm install --frozen-lockfile` locally first to verify the lockfile is current |
