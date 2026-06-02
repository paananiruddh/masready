# MASReady — Recovery & Runbook

> Source of truth: `artifacts/masready/src/` (React SPA, Vite, wouter routing)
> Last audited: 2026-06-02

---

## 1. Source of Truth

| Item | Value |
|------|-------|
| App type | React SPA (Vite + wouter + Tailwind v4) |
| Source directory | `artifacts/masready/src/` |
| Entry point | `artifacts/masready/src/main.tsx` |
| Router | `artifacts/masready/src/App.tsx` |
| Build output | `artifacts/masready/dist/public/` |
| Static HTML at root? | YES — old SEO pages. They do NOT shadow React routes. Deployment uses `router = "application"` mode (serves SPA). Only served if explicitly navigated with `.html` extension. |
| Active deployment mode | `router = "application"` → React SPA served for all routes |

**Never edit root-level `.html` files** expecting those changes to appear on the live React app. The React SPA in `artifacts/masready/src/` is the live product.

---

## 2. How to Run Locally

```bash
# From repo root
pnpm install

# Start the MASReady dev server (binds to PORT=5173)
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/masready dev
```

Then open: `http://localhost:5173/`

The Replit workflow `MASReady Dev` runs this command automatically.

---

## 3. How to Build

```bash
# From repo root — builds all workspace packages
pnpm run build

# Or build only masready
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/masready build
```

Output lands in: `artifacts/masready/dist/public/`

---

## 4. How to Preview Production Build Locally

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/masready serve
```

---

## 5. How to Deploy

Deployment is managed by Replit. Config is in `.replit`:

```toml
[deployment]
router = "application"
deploymentTarget = "autoscale"

[deployment.postBuild]
args = ["pnpm", "store", "prune"]
```

The `router = "application"` setting means Replit serves the React SPA for all paths (SPA fallback). The build output at `artifacts/masready/dist/public/` is what gets deployed.

**Required environment variables at build time** (set in Replit secrets/env):
- `PORT` — port for dev/preview server (e.g. `5173`)
- `BASE_PATH` — base path (e.g. `/`)
- `VITE_BUILD_TIME` — optional, used by debug banner
- `VITE_COMMIT_SHA` — optional, used by debug banner

---

## 6. Active Routes (React SPA)

All routes are defined in `artifacts/masready/src/App.tsx`.

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | Home | Landing page |
| `/mas9-power` | MAS9Power | Full MAS9 Power demo page |
| `/demo-walkthrough` | DemoWalkthrough | 12-step animated walkthrough |
| `/industry-previews` | IndustryPreviews | Gallery with dual buttons |
| `/industry/:slug` | IndustryPage | Marketing deep-dive per industry |
| `/demos/industries/:industrySlug` | IndustryDemoApp | 7-tab full demo app (10 industries) |
| `/platform` | Platform | Three operating modes |
| `/preview-studio` | PreviewStudio | Session-scoped synthetic preview creator |
| `/preview-session/:sessionId` | PreviewSession | Active preview session |
| `/preview/:industry` | PreviewGate | Preview entry gate |
| `/launch` | Launch | Demo request + persisted demo form |
| `/contact` | Contact | Contact form with Aniruddh + phone |
| `/audit-checklist` | AuditChecklist | Delivery audit checklist |
| `/architecture` | Architecture | Technical architecture page |
| `/trust` | Trust | Trust center |
| `/features` | Features | Feature listing |
| `/design2/*` | Design2 variants | Alternative design (do not modify) |
| `/design3/*` | Design3 variants | Alternative design (do not modify) |

---

## 7. Expected Features — Audit Table

| Feature | Expected | Implemented | Evidence |
|---------|----------|-------------|----------|
| A. MAS9/MAS9Power naming | Exact "MAS9 Power" / "MAS9Power" only | ✅ Yes | Consistent throughout mas9-power.tsx, industry-demo.tsx |
| B. 11 full demo experiences | 1 MAS9Power + 10 industry apps | ✅ Yes | /mas9-power + /demos/industries/:slug (10 slugs) |
| C. Industry demo route | /demos/industries/:industrySlug | ✅ Yes | App.tsx line 129, industry-demo.tsx |
| C. Industry demo — 7 tabs | Dashboard, WO, Assets, PM, SLA, Integrations, Demo Access | ✅ Yes | industry-demo.tsx tabs array |
| C. Industry demo — seeded data | Synthetic records from industryData.ts | ✅ Yes | getWorkOrders(), getAssetRegister() etc. |
| C. Industry demo — filters | WO and Asset filters | ✅ Yes | industry-demo.tsx filter state |
| C. Industry demo — detail drawer | WO and Asset drawers | ✅ Yes | WODrawer, AssetDrawer components |
| D. /industry/:slug marketing page | Separate marketing page | ✅ Yes | industry-page.tsx, App.tsx line 124 |
| E. Industry hub dual buttons | View Brief + Launch Full Demo | ✅ Yes | industry-previews.tsx lines 222, 228 |
| F. PUBLIC_DEMO_MODE=true | All integrations disabled in demo | ✅ Yes | industry-demo.tsx line 20 |
| G. Demo Access on /mas9-power | 5-step instructions, persona cards, link to mas9power.masready.com.au | ✅ Yes | mas9-power.tsx line 487+ |
| G. Demo Access on /industry/:slug | Demo Access section | ✅ Yes | industry-page.tsx |
| G. Demo Access on /demos/industries/:slug | Demo Access tab | ✅ Yes | industry-demo.tsx tab 7 |
| H. /launch persisted form polish | Full layout, polished form | ✅ Yes | launch.tsx with Layout wrapper |
| I. /preview-studio | React SPA (not static HTML) | ✅ Yes | preview-studio.tsx, served by SPA |
| J. /demo-walkthrough animation | Hero, count-up, stagger, reveals | ✅ Yes | demo-walkthrough.tsx (rewritten 2026-06-02) |
| K. Tenant shell architecture | Design documented | Partial | data-modes.tsx, architecture.tsx — no live shell demo |
| L. Four data models | public_demo, empty_shell, customer_enriched, live_integrated | Partial | data-modes.tsx page exists, not prominently linked |
| M. Zero Trust Data Model | Visible in messaging | Partial | trust.tsx exists, not on all marketing pages |
| N. Contact details — Aniruddh | Name + phone on contact page | ✅ Yes (fixed 2026-06-02) | contact.tsx: aniruddh@assetize.com.au + 0430 739 020 |
| O. Static HTML conflict | No conflict — SPA is live | ✅ Confirmed | router="application" serves SPA |

---

## 8. Debug Marker

Append `?debug=1` to any URL to see a footer debug bar showing:

- Build source (always `React SPA`)
- Current route
- Build timestamp
- Commit SHA
- PUBLIC_DEMO_MODE

Example: `https://masready.com.au/?debug=1`

---

## 9. Post-Deploy Verification Checklist

```
□ Open /?debug=1
  → Footer shows: Build source: React SPA
  → Route: /

□ Open /demo-walkthrough
  → Hero animates in (title, subtitle slide up)
  → Metric cards count up (11→12 steps, 11→12 min)
  → Step list staggers in
  → Click "Start 12-Minute Walkthrough"
  → Step card slides in from right on each Next click

□ Open /industry-previews
  → Each industry card shows two buttons: "View Industry Brief" + "Launch Full Demo"

□ Open /demos/industries/utilities
  → 7 tabs visible: Dashboard, Work Orders, Assets, Preventive Maint., SLAs, Integrations, Demo Access
  → Work Orders tab shows filterable list
  → Clicking a work order opens a detail drawer
  → Integrations tab shows all controls disabled (PUBLIC_DEMO_MODE)

□ Open /industry/utilities
  → Marketing page (not the demo app)
  → Contains "Launch Utilities Full Demo" link

□ Open /mas9-power
  → Demo Access section visible
  → Button links to https://mas9power.masready.com.au (opens new tab)
  → Page title/heading uses "MAS9 Power" not "Math Nine Power"

□ Open /launch?mode=persisted#demo-form
  → Full layout with header/footer
  → Form scrolls into view
  → "persisted demo" pre-selected in interest dropdown

□ Open /contact
  → Form renders correctly
  → Below form: aniruddh@assetize.com.au + Aniruddh Panvalkar · 0430 739 020

□ Open /preview-studio?industry=utilities
  → React SPA renders (not static HTML)
  → Industry pre-selected or available
```

---

## 10. Rules — Preventing Future Lost Work

1. **Never edit root-level `.html` files** — they are old SEO static pages, not the live app.
2. **Never edit only `artifacts/masready/dist/`** — the dist is a build artifact, overwritten by every build.
3. **Always edit `artifacts/masready/src/`** — this is the source of truth.
4. **Always add new routes to `App.tsx`** — route must be registered for the SPA to serve it.
5. **Always verify route in dev server** before claiming done — screenshot the route.
6. **Always run a text search before claiming "removed"** — `grep -rn "pattern" artifacts/masready/src/`.
7. **design2/ and design3/ directories must not be touched** — alternative design variants, leave as-is.
8. **PUBLIC_DEMO_MODE must remain `true`** in `industry-demo.tsx` for all public-facing demo routes.
9. **To confirm source in production**, append `?debug=1` to any URL and check the footer debug banner.

---

## 11. Key Files

| File | Purpose |
|------|---------|
| `artifacts/masready/src/App.tsx` | All routes |
| `artifacts/masready/src/lib/industryData.ts` | All 10 industry definitions + seed data generators |
| `artifacts/masready/src/pages/industry-demo.tsx` | 7-tab industry demo app |
| `artifacts/masready/src/pages/industry-previews.tsx` | Industry hub gallery |
| `artifacts/masready/src/pages/industry-page.tsx` | Per-industry marketing page |
| `artifacts/masready/src/pages/mas9-power.tsx` | MAS9 Power full demo page |
| `artifacts/masready/src/pages/demo-walkthrough.tsx` | 12-step animated walkthrough |
| `artifacts/masready/src/pages/preview-studio.tsx` | Session-scoped synthetic preview |
| `artifacts/masready/src/pages/preview-session.tsx` | Active preview session |
| `artifacts/masready/src/pages/launch.tsx` | Demo request + persisted form |
| `artifacts/masready/src/pages/contact.tsx` | Contact form |
| `artifacts/masready/src/components/layout/Navbar.tsx` | Navigation |
| `artifacts/masready/src/components/layout/Footer.tsx` | Footer + debug marker |
| `artifacts/masready/vite.config.ts` | Build config (PORT, BASE_PATH required) |
| `.replit` | Deployment config |
