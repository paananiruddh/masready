# Azure Customer Subdomain Architecture

## Overview

The public GitHub Pages site hosts the marketing site and static simulator only.
Customer-specific live demos and applications are hosted on Azure, accessible via subdomains.

## Public Marketing Site

- URL: https://softwarecomparereview.github.io/masready/ (or https://masready.com.au once DNS is configured)
- Hosting: GitHub Pages
- Content: Static HTML/CSS/JS, fictional demo fixtures only
- No real customer systems connected

## Customer Demo Subdomains (Azure)

Each customer or demo tenant gets a dedicated subdomain:

| Subdomain | Example | Hosting |
|-----------|---------|---------|
| `mas9power.masready.com.au` | MAS9 Power demo | Azure Static Web Apps |
| `customer-a.masready.com.au` | Customer A live demo | Azure App Service |
| `customer-b.masready.com.au` | Customer B live demo | Azure App Service |

## DNS Configuration (GoDaddy)

For each Azure-hosted subdomain, add to GoDaddy DNS:

```
CNAME  mas9power   →  your-app.azurestaticapps.net
TXT    asuid.mas9power  →  [Azure domain verification token]
```

Azure provides the verification token when you configure a custom domain in your Static Web App settings.

## Security

- Host/subdomain routing is branding and default context only — not an authorization boundary.
- RBAC and customer access controls remain the real security boundary.
- Customer data stays within the configured data boundary model (customer-hosted, BYO storage, etc.).
- No customer data is hosted on the public GitHub Pages site.

## Data Boundary Models

Customer deployments use a selected data boundary model:
- No-store / zero-retention runtime
- Customer-hosted
- BYO storage (S3, Azure Blob, GCS)
- Azure-hosted customer subdomain
- Assetize-managed demo workspace
