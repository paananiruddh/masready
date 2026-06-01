# Architecture Summary

For use in LinkedIn comments, articles, and supporting posts.

---

## Public Marketing Site

- Hosted on GitHub Pages
- Static HTML/CSS/JS — no backend, no database
- Fictional demo fixtures only for the public simulator
- No real customer systems connected
- Three interactive design variants (Design 1, 2, 3)
- Poll/compare page for public feedback

## Customer Demos

- Hosted on Azure App Service or Azure Static Web Apps
- Per-customer subdomains — e.g. `customer-a.masready.com.au`, `mas9power.masready.com.au`
- Host/subdomain maps to default branding and customer context only
- Auth and RBAC remain the real security boundary
- Configured per customer — data boundary model selected per deployment

## Customer Data Boundary Models

| Model | Where data lives | Best for |
|-------|-----------------|----------|
| Static public simulator | GitHub Pages — fictional fixtures only | Public demos, product storytelling |
| No-store / zero-retention | Runtime memory only — nothing persisted | Sensitive customers, strict data boundaries |
| Customer-hosted | Customer-controlled environment | Live customer environments |
| BYO storage | Customer-owned S3, Azure Blob, GCS | Enterprises needing storage control |
| Azure-hosted customer subdomain | Azure per customer | Customer-specific live demos |
| Assetize-managed demo workspace | Managed demo environment | Sales demos, prospect walkthroughs |

## Core Engine

- Local skill packs — version-locked, offline, air-gap capable
- Maximo-specific knowledge — not generic LLM output
- Evidence-based workflows — requirements, fingerprints, patch data, skill coverage
- Review-ready outputs — reports, checklists, runbooks, executive summaries

## Safety Model

- No SQL execution
- No Maximo mutation
- No Jira mutation
- No Azure DevOps mutation
- Review-only output
- RBAC is the real security boundary — host routing is branding/context only
- Backend-only secrets — no keys in the frontend
- Demo fixtures are demo-only — always clearly labelled

## Disclaimer

License usage planning features are for planning and visibility only. They are not legal, contractual, IBM-certified, or compliance advice.
