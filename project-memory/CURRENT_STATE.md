# Current State

Last updated: 2026-05-04

## Product Summary

MASReady is a Maximo-focused SaaS/demo platform for:
- Environment discovery (Maximo fingerprint scanning)
- Customer onboarding automation
- Change tracking and delivery intelligence
- Patch/hotfix impact analysis
- License planning (AppPoint utilisation, named users, mobile pools)
- Mobilisation automation
- Documentation and AI-assisted Maximo skills
- Role-based demo views

## Live Website

- **Domain**: masready.com.au
- **React app**: `artifacts/masready/` (Vite + React + Wouter + Framer Motion + Tailwind + Recharts)
- **Three design variants**: `/` (Design 1 enterprise SaaS), `/design2` (social feed), `/design3` (command center)
- **Simulator**: `/simulator`
- **Walkthrough**: `/demo-walkthrough` — fully interactive 12-step guided walkthrough with timer, progress bar, step cards

## Pages (Design 1)

| Route | Component | Status |
|-------|-----------|--------|
| `/` | `home.tsx` | Live — two-column hero, animated dashboard card, product capability metric strip |
| `/mas9-power` | `mas9-power.tsx` | Live — demo tenant profile, feature flags, safety disclaimer |
| `/features` | `features.tsx` | Live |
| `/trust` | `trust.tsx` | Live |
| `/architecture` | `architecture.tsx` | Live |
| `/media` | `media.tsx` | Live — charts from fictional MAS9 Power data |
| `/demo-walkthrough` | `demo-walkthrough.tsx` | Live — interactive 12-step walkthrough |
| `/launch` | `launch.tsx` | Live |
| `/contact` | `contact.tsx` | Live |
| `/simulator` | `simulator.tsx` | Live |
| `/compare` | `compare.tsx` | Live |

## Seed Data

- Location: `seed-data/mas9-power/` (23 JSON files)
- Demo tenant: MAS9 Power (fictional Energy & Utilities organisation)
- All data is fictional — no real customer, site, asset, or user data

## Constants

- `artifacts/masready/src/lib/constants.ts` — `DEMO_METRICS` object with demo tenant numbers
- Homepage NO LONGER uses DEMO_METRICS (removed to avoid confusing product metrics with demo data)
- MAS9 Power page, Design 3 home, and media page still use DEMO_METRICS appropriately (clearly labelled as demo)

## Known Issues

- GitHub Pages push blocked due to OAuth token lacking `workflow` scope — user needs to push manually
- Static HTML files at repo root (`index.html`, `404.html`) serve the React SPA for GitHub Pages SPA routing

## Workflows

| Workflow | Port | Command |
|---------|------|---------|
| `artifacts/masready: web` | 23369 | `pnpm --filter @workspace/masready run dev` |
| `artifacts/api-server: API Server` | 8080 | `pnpm --filter @workspace/api-server run dev` |
| `artifacts/mockup-sandbox` | 8081 | `pnpm --filter @workspace/mockup-sandbox run dev` |
