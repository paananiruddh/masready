# Changelog

## 2026-05-04

### Homepage Layout & Animation Fix
- Rewrote `home.tsx` hero from full-width centered layout to two-column (copy left, LiveDashboard right)
- Added three animated gradient orbs (blue, cyan, purple) with Framer Motion
- Added `LiveDashboard` component with: score progress bar, cycling live status panel (4 metrics, 2.2s interval), zero-mutation badge
- Removed stretch from hero headline (was 7xl full-width)

### Capability Strip (Homepage)
- Replaced `DEMO_METRICS` usage on homepage with product-level capability facts
- Removed `DEMO_METRICS` import from `home.tsx` entirely
- New stats: 6 Modules, 100% Read-only, 0 Mutations, 5 Roles, 12min Demo, 4 Trust Boundaries, 3 Design Variants, 0 Prod Risk

### Demo Data Labelling
- Added "MAS9 Power Demo Tenant" labels to Design 3 home metric cards (Patch Risk, AppPoints)
- Removed unused `DEMO_METRICS` import from `media.tsx`

### Interactive Walkthrough
- Rebuilt `demo-walkthrough.tsx` from static list to full guided interactive experience
- Features: start screen with step preview, per-step detail cards with role/icon/proof checklist, live stopwatch, progress bar, step dot navigation, back/next buttons, completion screen

### Seed Data
- Created `seed-data/mas9-power/` with 23 fictional JSON files
- All data fictional — no real customer names, emails, site IDs, or asset IDs
- Created `seed-data/mas9-power/README.md`

### Features Page — Seed Data Stage
- Added Stage 2 "Seed Data" card to `features.tsx`
- Shows 23-file count, 7 roles, 5 asset classes, fictional-only safety callout
- Footer badge: MAS9 Power → 23 files · 7 users · 5 asset classes

### Project Memory
- Created `/project-memory/` with 12 durable memory files
- All future agents must read project-memory before making changes

### Files Changed
- `artifacts/masready/src/pages/home.tsx` — rewrote hero + strip
- `artifacts/masready/src/pages/demo-walkthrough.tsx` — full interactive rebuild
- `artifacts/masready/src/pages/features.tsx` — added Seed Data stage
- `artifacts/masready/src/pages/media.tsx` — removed unused import
- `artifacts/masready/src/pages/design3/home.tsx` — added demo tenant labels
- `seed-data/mas9-power/*.json` (23 files) — created
- `seed-data/mas9-power/README.md` — created
- `project-memory/*.md` (12 files) — created
