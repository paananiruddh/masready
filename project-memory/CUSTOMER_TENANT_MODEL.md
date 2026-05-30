# Customer & Tenant Model

## Overview

MASReady separates three distinct tenant types:

| Type | Description | Data source | Visibility |
|------|-------------|-------------|------------|
| Demo tenant | Fictional scenario, pre-seeded | `seed-data/mas9-power/` | Public — website, simulator, charts |
| Customer demo | Real customer, demo environment | Customer-provided seed, isolated | Private — customer subdomain only |
| Customer live | Real customer, production discovery | Read-only connectors to real systems | Private — customer subdomain only, strict gates |

## MAS9 Power — The Demo Tenant

- **Type**: Demo tenant (fictional)
- **Organisation**: Unnamed fictional Energy & Utilities company
- **Platform**: IBM MAS Manage 9.x
- **Data**: Entirely fictional — 23 structured JSON seed files
- **Purpose**: Drives website simulator, charts, patch impact examples, walkthrough, and license planning outputs
- **Safety**: No real customer names, emails, site IDs, asset IDs, or operational data

## Customer Instance Model

Production customer instances run as subdomains:
- `<customer>.masready.com.au` → Azure-hosted instance
- Each customer instance has its own isolated database
- Customer live data discovery is opt-in and uses read-only connectors only
- Customer instances never share data with each other or with the public demo tenant

## Subdomain Routing (Future)

```
masready.com.au          → Public marketing site (GitHub Pages / Replit)
demo.masready.com.au     → MAS9 Power demo tenant (Azure)
<customer>.masready.com.au → Isolated customer instance (Azure)
```

## Safety Gates for Live Customer Data

Any work involving real customer data must:
1. Be clearly labelled "LIVE CUSTOMER DATA — NOT FOR PUBLIC DEMO"
2. Use separate code paths from demo seed data
3. Never be committed to the public repo
4. Use explicit opt-in configuration (`data_mode: live`)
5. Run through the same read-only connector architecture
6. Never appear in the marketing website, simulator, or public charts

## PFM (Procurement & Finance Module)

- PFM is a feature-flag gated module (`pfm_contract_mobilisation: false` in demo)
- PFM live data work is separate from fictional demo data
- The demo tenant has PFM disabled to prevent confusion with production capabilities
