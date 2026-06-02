# Customer Live Deployment — On-Premises

This is for deploying MASReady at a **real customer site** (e.g. Transurban, a
utility, or any organisation running IBM MAS / Maximo) where MASReady connects
to their live Maximo instance and presents their actual operational data.

---

## What runs at the customer site

```
Browser
  └─► nginx (port 80)
        ├─► /           → React SPA (static files)
        └─► /api/*      → Express API server (port 8080, internal)
                              └─► Customer's Maximo / IBM MAS (read-only OSLC)
                              └─► PostgreSQL (connector run history + cache)
```

All Maximo access is **read-only**. MASReady never creates, modifies, or
deletes records in Maximo.

---

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| Docker Engine 24+ | Docker Desktop works on Windows/Mac |
| Docker Compose v2 | Included in Docker Desktop |
| Network access from this server to Maximo | HTTPS on port 443 (or the customer's OSLC port) |
| Port 80 free on this server | Or change in `docker-compose.yml` |

---

## Step 1 — Get credentials from the customer

### IBM MAS 9.x (OAuth2)

Ask the customer's IBM MAS administrator to create an **OAuth2 client** with
`client_credentials` grant and read-only scopes. They will provide:

| Value | Where to get it |
|-------|----------------|
| `MAXIMO_BASE_URL` | e.g. `https://manage.masapps.customer.com` |
| `MAXIMO_TOKEN_URL` | e.g. `https://auth.masapps.customer.com/oidc/endpoint/MaximoAppSuite/token` |
| `MAXIMO_CLIENT_ID` | Created in IBM IAM / Keycloak |
| `MAXIMO_CLIENT_SECRET` | Created in IBM IAM / Keycloak |

Set `MAXIMO_AUTH_MODE=oauth2` in `.env`.

### Maximo 7.6.x (API key)

Ask the Maximo administrator to generate an **API key** for a read-only service
account:

| Value | Where to get it |
|-------|----------------|
| `MAXIMO_BASE_URL` | e.g. `https://maximo.customer.com` |
| `MAXIMO_API_KEY` | Maximo → Security → API Keys |

Set `MAXIMO_AUTH_MODE=apikey` in `.env`.

---

## Step 2 — Configure the deployment

```bash
cd deploy/customer
cp .env.template .env
```

Edit `.env` and fill in:
- `TENANT_SLUG` — short identifier, e.g. `transurban`
- `TENANT_NAME` — display name, e.g. `Transurban`
- Maximo credentials (see above)
- `POSTGRES_PASSWORD` — choose a strong password (internal only)

---

## Step 3 — Build and start

```bash
# From repo root
docker compose -f deploy/customer/docker-compose.yml --env-file deploy/customer/.env up --build -d
```

On first run this will:
1. Build the React SPA (nginx image)
2. Build the API server (Node.js image)
3. Start PostgreSQL and wait for it to be healthy
4. Start the API server (connects to Maximo when a scan is triggered)
5. Start nginx

Check everything is up:
```bash
docker compose -f deploy/customer/docker-compose.yml ps
```

---

## Step 4 — Run the initial Maximo scan

Once the stack is running, trigger a read-only fingerprint scan:

```bash
curl -X POST http://localhost/api/connector/maximo/scan
```

Or from a browser at the customer's machine:
```
POST http://<server-ip>/api/connector/maximo/scan
```

The response includes the detected Maximo version, sites, automation scripts
(customisations), and a user count. This scan is the foundation for all
MASReady analysis.

Check connector status at any time:
```bash
curl http://localhost/api/connector/status
```

---

## Step 5 — Access the app

Open a browser and navigate to `http://<server-ip>/`.

For a friendly hostname, add to the customer's `hosts` file or internal DNS:
```
<server-ip>   masready.transurban.local
```

---

## Domain and HTTPS (optional)

For production use, put an SSL-terminating reverse proxy in front of the
nginx container. Options:
- **Caddy** — `Caddyfile` with automatic HTTPS from Let's Encrypt or internal CA
- **Traefik** — label-based config, works well with Docker Compose
- **Customer's existing load balancer** — forward HTTPS → HTTP to port 80

If using the customer's own subdomain (e.g. `masready.transurban.com.au`),
the customer's IT team configures their internal DNS to point to this server.
No changes to `masready.com.au` DNS are needed.

---

## Updates

To update to a new version of MASReady:

```bash
git pull origin main
docker compose -f deploy/customer/docker-compose.yml --env-file deploy/customer/.env up --build -d
```

Data in PostgreSQL is preserved (Docker named volume `db_data`).

---

## Logs

```bash
# All services
docker compose -f deploy/customer/docker-compose.yml logs -f

# API server only (shows Maximo connector activity)
docker compose -f deploy/customer/docker-compose.yml logs -f api
```

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| `POST /api/connector/maximo/scan` returns 502 | Wrong `MAXIMO_BASE_URL` or bad credentials | Check `.env`, verify you can curl the Maximo URL from the server |
| OAuth2 token fetch failed 401 | Wrong `MAXIMO_CLIENT_ID` / `CLIENT_SECRET` | Re-issue credentials in IBM IAM |
| `configured: false` on `/api/connector/status` | Missing env vars | Check that `.env` is present and `MAXIMO_BASE_URL` + auth vars are set |
| Cannot reach Maximo from the server | Firewall / network policy | Customer IT needs to allow outbound HTTPS from this server to the Maximo host |
| Port 80 conflict | Another service on port 80 | Change `"80:80"` → `"8080:80"` in `docker-compose.yml` |

---

## Security notes

- Maximo credentials are stored only in `.env` on this server — never in the repo
- The PostgreSQL database is not exposed outside the Docker network
- All Maximo calls are read-only (OSLC GET only, no POST/PUT/DELETE)
- `.env` should be owned by the deployment user (`chmod 600 .env`)
