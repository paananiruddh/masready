# MAS9 Power — Seed Data

> ALL DATA IN THIS DIRECTORY IS ENTIRELY FICTIONAL.
> No real customer names, emails, site IDs, asset IDs, work orders, or operational data are present.

## What is this?

These 23 structured JSON files define the fictional demo tenant environment for **MAS9 Power** — a fictional Energy & Utilities organisation used to demonstrate the MASReady Maximo Delivery Automation Workbench.

The seed data drives:
- The MASReady simulator
- Website charts and dashboards (`/media`)
- Patch impact analysis examples
- License planning outputs
- The 12-minute interactive walkthrough
- Screenshots and wiki pages

## File Index

| File | Contents |
|------|---------|
| `01-tenant-profile.json` | Tenant name, platform version, data mode, feature flags |
| `02-users.json` | 7 fictional named users with roles, email, department |
| `03-roles.json` | Role definitions and permission scopes |
| `04-sites.json` | 5 fictional operational sites |
| `05-locations.json` | Sub-locations within sites |
| `06-assets-substations.json` | 5 fictional substation assets |
| `07-assets-transformers.json` | 5 fictional transformer assets |
| `08-assets-transmission-lines.json` | 4 fictional transmission line assets |
| `09-assets-smart-meters.json` | 4 smart meter batches (11,461 fictional units) |
| `10-assets-control-systems.json` | 5 fictional SCADA/control system assets |
| `11-work-orders.json` | 6 fictional work orders referencing assets and sites |
| `12-preventive-maintenance.json` | 5 PM schedules across all asset classes |
| `13-job-plans.json` | 5 job plans referenced by PM schedules |
| `14-inventory.json` | 7 spare parts and materials (fictional values) |
| `15-vendors.json` | 7 fictional vendor/supplier records |
| `16-contracts.json` | 5 fictional service/maintenance contracts (mobilisation module disabled) |
| `17-integrations.json` | Read-only integration configs (Jira, ADO, Maximo) |
| `18-customisations.json` | 46 detected Maximo customisations (patch risk classified) |
| `19-automation-scripts.json` | 10 key automation scripts with patch risk |
| `20-security-groups.json` | 11 Maximo security groups |
| `21-license-usage.json` | AppPoint usage, named users, mobile pool, 12-month trend |
| `22-patch-impact-scenarios.json` | 7 impacted items (2 HIGH, 3 MEDIUM, 2 LOW) for MAS 9.1.0 fictional patch |
| `23-demo-dashboards.json` | Dashboard card/chart definitions used by the website |

## Data Coherence

The files are designed to be internally consistent:
- Users (`02`) reference roles (`03`)
- Work orders (`11`) reference assets (`06-10`) and sites (`04`)
- Assets (`06-10`) reference locations (`05`)
- License usage (`21`) maps to named users in `02`
- Patch impact (`22`) references customisations (`18`)
- Dashboard definitions (`23`) reference data from `21` and `18`

## Demo User Roles (7 total)

| Role | User | Dept |
|------|------|------|
| Admin | Alex Thornton | IT Operations |
| Delivery Lead | Morgan Chen | Delivery |
| Delivery Lead | Riley Okafor | Delivery |
| Asset Manager | Jordan Patel | Asset Management |
| Scheduler | Sam Kowalski | Operations |
| Field Tech | Taylor Nguyen | Field Operations |
| Finance | Casey Ibrahim | Finance |

## Asset Classes (5 total)

- Substations (SS-001 to SS-005)
- Transformers (TR-001 to TR-005)
- Transmission Lines (TL-001 to TL-004)
- Smart Meters (batches SM-WEST-001, SM-WEST-002, SM-SOUTH-001, SM-SOUTH-002)
- Control Systems / SCADA (CS-001 to CS-005)

## How to Extend Seed Data Safely

1. Add a new JSON file following the naming convention: `NN-descriptive-name.json`
2. Start with `"data_classification": "FICTIONAL — DEMO ONLY"` as the first key
3. Ensure data is coherent with existing files (users reference roles, etc.)
4. Document the new file in this README and in `/project-memory/SEED_DATA_MODEL.md`
5. Update `/project-memory/CHANGELOG.md`
6. If the website needs to consume the new data, update the relevant React component

## Safety Rules

- NEVER include real customer names, real emails, real site IDs, real asset IDs, or real operational data
- NEVER use this seed data for anything other than demo and development purposes
- NEVER connect these files to a live customer environment
- All fictional email domains must end in `.demo` to prevent accidental use
