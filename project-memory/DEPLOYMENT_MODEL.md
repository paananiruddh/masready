# Deployment Model

## Public Marketing Site

| Property | Value |
|----------|-------|
| Domain | masready.com.au |
| CNAME | `CNAME` file in repo root |
| GitHub Pages repo | `softwarecomparereview/masready` (fork) |
| Upstream repo | `paananiruddh/masready` |
| SPA routing | `index.html` restores path from `sessionStorage.redirect`; `404.html` stores path |
| Static assets | `assets/index-*.js`, `assets/index-*.css`, `favicon.svg` in repo root |
| No workflow file | `.github/workflows/pages.yml` removed (OAuth token lacked `workflow` scope) |

## Git Remotes

| Remote | URL |
|--------|-----|
| `origin` | `https://github.com/paananiruddh/masready` |
| `live` | `https://github.com/softwarecomparereview/masready.git` |

## Push Process

User must push manually from their terminal (agent cannot push due to OAuth scope):
```bash
git push live main --force
```

## Replit Dev Environment

| Service | Port | Notes |
|---------|------|-------|
| masready React app | 23369 | Via proxy at `localhost:80/` |
| API server | 8080 | Via proxy at `localhost:80/api` |
| Mockup sandbox | 8081 | Via proxy at `localhost:80/__mockup` |

## Build Command (for GitHub Pages update)

```bash
PORT=23369 BASE_PATH=/ pnpm --filter @workspace/masready run build
```
Output goes to `artifacts/masready/dist/public/`. Then copy assets:
```bash
cp artifacts/masready/dist/public/assets/*.js assets/
cp artifacts/masready/dist/public/assets/*.css assets/
```

## Customer Instance Deployment (Future)

- Azure App Service or Azure Container Apps
- Customer subdomain: `<customer>.masready.com.au`
- Each instance isolated with its own database
- Read-only connectors to customer systems (Jira, ADO, Maximo)
- Contract mobilisation module gated by feature flag
