# Seed Data Model

## Title: Seed Data

## Purpose

The seed data provides a fictional, repeatable demo tenant environment for MASReady. It allows the website, simulator, charts, reports, screenshots, wiki pages, patch impact examples, and license planning outputs to run without exposing any real customer information.

## Current Demo Tenant: MAS9 Power

A fictional Energy & Utilities organisation running IBM Maximo Application Suite Manage 9.x.

## Seed Data Design

- **23 structured JSON seed files** in `seed-data/mas9-power/`
- Fictional Energy & Utilities organisation
- Fictional users, assets, work orders, integrations, customisations, licenses, and reports
- Version-locked per demo tenant
- Updates must be explicit, auditable, and documented in `CHANGELOG.md`
- Seed data drives the simulator, charts, patch impact analysis, and license planning examples

## File Index

| File | Contents |
|------|---------|
| `01-tenant-profile.json` | Tenant name, platform version, data mode, feature flags |
| `02-users.json` | 7 fictional named users with roles, email, department |
| `03-roles.json` | Role definitions and permission scopes |
| `04-sites.json` | Fictional operational sites (power stations, substations) |
| `05-locations.json` | Site sub-locations |
| `06-assets-substations.json` | Fictional substation assets |
| `07-assets-transformers.json` | Fictional transformer assets |
| `08-assets-transmission-lines.json` | Fictional transmission line assets |
| `09-assets-smart-meters.json` | Fictional smart meter assets |
| `10-assets-control-systems.json` | Fictional SCADA/control system assets |
| `11-work-orders.json` | Fictional work orders referencing assets and sites |
| `12-preventive-maintenance.json` | PM schedules for asset classes |
| `13-job-plans.json` | Job plans referenced by work orders |
| `14-inventory.json` | Spare parts and materials inventory |
| `15-vendors.json` | Fictional vendor/supplier list |
| `16-contracts.json` | Fictional service and maintenance contracts |
| `17-integrations.json` | Read-only integration configs (Jira, ADO, Maximo) |
| `18-customisations.json` | 46 detected Maximo customisations |
| `19-automation-scripts.json` | Automation scripts in use |
| `20-security-groups.json` | Maximo security groups |
| `21-license-usage.json` | AppPoint usage, named users, mobile pool |
| `22-patch-impact-scenarios.json` | 7 impacted items, 2 high severity |
| `23-demo-dashboards.json` | Dashboard card/chart definitions |

## Demo User Roles

| Role | Count | Key responsibilities in demo |
|------|-------|------------------------------|
| Admin | 1 | System config, trust boundary, audit |
| Delivery Lead | 2 | Intelligence score, patch impact, requirements |
| Asset Manager | 1 | Fingerprint, customisations |
| Scheduler | 1 | PM and job plans |
| Field Tech | 1 | Work orders, asset context |
| Finance | 1 | License planning, AppPoints |
| Auditor | 1 | Immutable audit log |

## Energy & Utilities Asset Classes

- Substations
- Transformers
- Transmission lines
- Smart meters
- Control systems (SCADA)

## Safety Rules

- All seed data MUST be fictional
- Do NOT include real customer names, real emails, real assets, real site IDs, real work orders, or real operational data
- Any customer-specific live data connector MUST be separate from demo seed data
- Live customer discovery must be opt-in, guarded, and clearly labelled
- Seed data updates must be version-controlled and documented in `CHANGELOG.md`

## How to Extend Seed Data

1. Add a new JSON file following the naming convention (incremental number + descriptive name)
2. Ensure data is coherent with existing files (users reference roles, assets reference sites, etc.)
3. Document the new file in this `SEED_DATA_MODEL.md`
4. Update `seed-data/mas9-power/README.md`
5. Update `CHANGELOG.md`
6. If the website needs to display new data, update the relevant React component — never add real data to `constants.ts`
