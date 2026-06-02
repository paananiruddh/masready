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
| Pre-render scripts | `artifacts/masready/scripts/` |
| Deployment mode | `router = "application"` (SPA + static route files) |

**Root-level `.html` files** (`mas9-power.html`, `demo-walkthrough.html`, etc.) are **legacy/SEO-only** stale pages. They are NOT the live app. Never edit them expecting changes to appear in the React app.

**Never edit `dist/`** — it is build output, overwritten on every build.

---

## 2. How to Run Locally

```bash
# From repo root
pnpm install

# Start the MASReady dev server
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/masready dev
```

Open: `http://localhost:5173/`

The Replit workflow `MASReady Dev` runs this automatically.

---

## 3. How to Build (includes pre-rendering)

```bash
# From repo root — builds Vite bundle then pre-renders all routes
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/masready build
```

This runs two steps internally:
1. `pnpm run build:vite` — Vite compiles the SPA to `dist/public/`
2. `pnpm run prerender` — generates `index.html` for every public route

To run either step separately:
```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/masready build:vite
node artifacts/masready/scripts/prerender.mjs
```

---

## 4. Pre-rendering All Public Routes

### Why

Every public route must have a static HTML file in `dist/public/` so that:
- Direct URL navigation works on any static host
- Each route has its own `<title>` and `<meta name="description">`
- Crawlers get meaningful HTML without executing JavaScript
- No 404 on first load of a deep-linked URL

React still hydrates from the compiled bundle — all interactivity, animations, tabs, filters, and drawers work normally after hydration.

### Approach

**Shell-based static pre-rendering** (not full React SSR).

After `vite build`, `scripts/prerender.mjs` reads `dist/public/index.html` and copies it to every route directory with route-specific title and meta tags injected. The React bundle is the same for every route — wouter's client-side router handles the correct page on hydration.

Full React SSR is intentionally not used here. The app contains framer-motion, recharts, IntersectionObserver, and localStorage — all browser-only APIs. Attempting SSR without invasive `typeof window` guards across 30+ files would produce hydration mismatches and broken builds. The shell approach achieves the same static-routing goal cleanly.

### Exact commands

```bash
# Build Vite bundle only
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/masready build:vite

# Pre-render all routes (requires dist/public/index.html to exist)
pnpm --filter @workspace/masready prerender
# or:
node artifacts/masready/scripts/prerender.mjs

# Verify all route files were generated
pnpm --filter @workspace/masready verify:prerender
# or:
node artifacts/masready/scripts/verify-prerender.mjs

# Full build (Vite + prerender, the one to use)
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/masready build
```

### Output folder

```
artifacts/masready/dist/public/
  index.html                              ← /
  mas9-power/index.html                   ← /mas9-power
  demo-walkthrough/index.html             ← /demo-walkthrough
  industry-previews/index.html            ← /industry-previews
  launch/index.html                       ← /launch
  preview-studio/index.html               ← /preview-studio
  contact/index.html                      ← /contact
  trust/index.html                        ← /trust
  data-modes/index.html                   ← /data-modes
  architecture/index.html                 ← /architecture
  features/index.html                     ← /features
  platform/index.html                     ← /platform
  audit-checklist/index.html              ← /audit-checklist
  media/index.html                        ← /media
  industry/utilities/index.html           ← /industry/utilities
  industry/transport/index.html           ← /industry/transport
  industry/government/index.html          ← /industry/government
  industry/mining/index.html              ← /industry/mining
  industry/facilities/index.html          ← /industry/facilities
  industry/power/index.html               ← /industry/power
  industry/water/index.html               ← /industry/water
  industry/rail/index.html                ← /industry/rail
  industry/roads/index.html               ← /industry/roads
  industry/airports/index.html            ← /industry/airports
  demos/industries/utilities/index.html   ← /demos/industries/utilities
  demos/industries/transport/index.html   ← /demos/industries/transport
  demos/industries/government/index.html  ← /demos/industries/government
  demos/industries/mining/index.html      ← /demos/industries/mining
  demos/industries/facilities/index.html  ← /demos/industries/facilities
  demos/industries/power/index.html       ← /demos/industries/power
  demos/industries/water/index.html       ← /demos/industries/water
  demos/industries/rail/index.html        ← /demos/industries/rail
  demos/industries/roads/index.html       ← /demos/industries/roads
  demos/industries/airports/index.html    ← /demos/industries/airports
```

### How routes are generated

**Static routes:** Defined in `scripts/prerender.mjs` `ROUTE_META` object. Each entry is a path → `{ title, description }` pair.

**Industry routes:** Auto-generated in the same script from `INDUSTRY_SLUGS` array, which mirrors `INDUSTRIES` in `src/lib/industryData.ts`.

### How query URLs are handled

Query-string routes (`/launch?mode=persisted`, `/preview-studio?industry=utilities`) do NOT need separate HTML files. The base route HTML (`launch/index.html`, `preview-studio/index.html`) is served on first load, React hydrates, then reads `window.location.search` to activate the correct state. This works correctly — verified locally.

### How to add a new public route

1. Add the route to `App.tsx` (required for routing to work)
2. Add the route with its meta to `ROUTE_META` in `scripts/prerender.mjs`
3. Add the expected output file to `EXPECTED` in `scripts/verify-prerender.mjs`
4. Run `pnpm --filter @workspace/masready build` to regenerate

### How to add a new industry

1. Add the industry to `INDUSTRIES` in `src/lib/industryData.ts`
2. Add the slug to `INDUSTRY_SLUGS` in `scripts/prerender.mjs` AND `scripts/verify-prerender.mjs`
3. Add the display name to `INDUSTRY_NAMES` in `scripts/prerender.mjs`
4. Run `pnpm --filter @workspace/masready build`

### How to check direct-load behaviour

After running the full build, start the preview server:
```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/masready serve
```

Then navigate directly to any route:
- `http://localhost:5173/demos/industries/utilities` — should load without 404
- `http://localhost:5173/industry/utilities` — should load without 404
- `http://localhost:5173/demo-walkthrough` — should load with animated hero

All 34 routes have their own `index.html` and load without a round-trip to the SPA root.

### How to deploy safely

1. Run `PORT=5173 BASE_PATH=/ pnpm --filter @workspace/masready build`
2. Run `node artifacts/masready/scripts/verify-prerender.mjs` — must pass
3. Deploy via Replit publish button
4. After deploy, append `?debug=1` to any live URL and check footer shows `Build source: React SPA`

---

## 5. Active Routes

All routes are defined in `artifacts/masready/src/App.tsx`.

| Route | Component | Pre-rendered |
|-------|-----------|-------------|
| `/` | Home | ✅ |
| `/mas9-power` | MAS9Power | ✅ |
| `/demo-walkthrough` | DemoWalkthrough | ✅ |
| `/industry-previews` | IndustryPreviews | ✅ |
| `/industry/:slug` | IndustryPage | ✅ × 10 |
| `/demos/industries/:industrySlug` | IndustryDemoApp | ✅ × 10 |
| `/platform` | Platform | ✅ |
| `/preview-studio` | PreviewStudio | ✅ |
| `/preview-session/:sessionId` | PreviewSession | — (user-specific) |
| `/launch` | Launch | ✅ |
| `/contact` | Contact | ✅ |
| `/audit-checklist` | AuditChecklist | ✅ |
| `/architecture` | Architecture | ✅ |
| `/trust` | Trust | ✅ |
| `/features` | Features | ✅ |
| `/data-modes` | DataModes | ✅ |
| `/media` | Media | ✅ |
| `/design2/*` | Design2 variants | — (internal) |
| `/design3/*` | Design3 variants | — (internal) |

---

## 6. Post-Deploy Verification Checklist

```
□ Open /?debug=1
  → Footer shows: Build source: React SPA
  → Route: /

□ Open /demo-walkthrough
  → Hero animates in (title, subtitle slide up on load)
  → Metric cards count up: 12 steps · 12 min · 5 roles
  → Step list staggers in
  → Start button triggers active walkthrough view
  → Step card slides right-to-left on "Mark Done & Next"

□ Open /industry-previews
  → Each card has two buttons: "View Industry Brief" + "Launch Full Demo"

□ Open /demos/industries/utilities  (direct URL — no redirect)
  → Loads without 404
  → 7 tabs: Dashboard, Work Orders, Assets, Preventive Maint., SLAs, Integrations, Demo Access
  → "PUBLIC DEMO MODE" banner visible at top
  → Work Orders filterable; clicking a row opens drawer
  → Integrations tab shows all controls disabled

□ Open /industry/utilities  (direct URL)
  → Loads without 404
  → Marketing page (not the demo app)

□ Open /mas9-power
  → Demo Access section visible
  → Button links to https://mas9power.masready.com.au (opens new tab)
  → Heading says "MAS9 Power" (not "Math Nine Power")

□ Open /launch?mode=persisted#demo-form
  → Full layout with nav + footer
  → Form scrolls into view
  → "Secure persisted demo" pre-selected

□ Open /contact
  → Form renders correctly
  → Below submit: aniruddh@assetize.com.au + Aniruddh Panvalkar · 0430 739 020

□ Open /preview-studio?industry=utilities
  → Preview studio loads (React SPA, not static HTML)
  → After hydration, industry is pre-selected or queryable
```

---

## 7. Rules — Preventing Future Lost Work

1. **Never edit root-level `.html` files** — they are stale SEO pages, not the live app.
2. **Never edit `artifacts/masready/dist/`** — overwritten by every build.
3. **Always edit `artifacts/masready/src/`** — the only source of truth.
4. **Always add new routes to `App.tsx`** — and also to `prerender.mjs` + `verify-prerender.mjs`.
5. **Always run `pnpm run verify:prerender` before deploying** — confirms 34 route files exist.
6. **Verify changes with a screenshot or local test** — never claim "done" without evidence.
7. **design2/ and design3/ directories must not be modified** — alternative design variants.
8. **PUBLIC_DEMO_MODE must remain `true`** in `industry-demo.tsx`.
9. **To confirm source in production**, append `?debug=1` to any URL and check the footer.

---

## 8. Key Files

| File | Purpose |
|------|---------|
| `artifacts/masready/src/App.tsx` | All routes |
| `artifacts/masready/src/lib/industryData.ts` | 10 industry definitions + seed data |
| `artifacts/masready/src/pages/industry-demo.tsx` | 7-tab industry demo app |
| `artifacts/masready/src/pages/industry-previews.tsx` | Industry hub gallery |
| `artifacts/masready/src/pages/industry-page.tsx` | Per-industry marketing page |
| `artifacts/masready/src/pages/mas9-power.tsx` | MAS9 Power full demo page |
| `artifacts/masready/src/pages/demo-walkthrough.tsx` | 12-step animated walkthrough |
| `artifacts/masready/src/pages/preview-studio.tsx` | Session-scoped synthetic preview |
| `artifacts/masready/src/pages/launch.tsx` | Demo request + persisted form |
| `artifacts/masready/src/pages/contact.tsx` | Contact form |
| `artifacts/masready/src/components/layout/Navbar.tsx` | Navigation |
| `artifacts/masready/src/components/layout/Footer.tsx` | Footer + `?debug=1` marker |
| `artifacts/masready/scripts/prerender.mjs` | Generates 34 static HTML route files |
| `artifacts/masready/scripts/verify-prerender.mjs` | Verifies all 34 files exist |
| `artifacts/masready/vite.config.ts` | Build config (PORT + BASE_PATH required) |
| `.replit` | Deployment config |
