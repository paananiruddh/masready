# Replit Agent Instructions — MASReady Fix All Issues

## CONTEXT

This is a pnpm monorepo with two applications:

1. **Marketing site** — `artifacts/masready/` — Vite + React 19 + Wouter + Tailwind + shadcn/ui. Deployed to GitHub Pages at masready.com.au. Routes: `/`, `/mas9-power`, `/features`, `/trust`, `/architecture`, `/media`, `/demo-walkthrough`, `/launch`, `/contact`, `/simulator`, `/compare`, and design2/design3 variants.

2. **Live backend app** — `artifacts/api-server/` — Express 5 + TypeScript. Deployed to Azure App Service. Currently only has `/api/healthz` and `/api/contact` routes in `src/routes/index.ts`. The FULL live app at mas9power.masready.com.au is a separate private deployment — however this same repo structure is what you extend here.

**Seed data location:** `seed-data/mas9-power/` — 23 JSON files, all fictional, all tagged `"data_classification": "FICTIONAL — DEMO ONLY"`.

**Key constants file:** `artifacts/masready/src/lib/constants.ts` — `DEMO_METRICS` object with all hardcoded demo numbers.

**DO NOT** modify any seed data values. **DO NOT** change the safety model. **DO NOT** add any write operations to Maximo, Jira, or any external system. All changes are either UI additions, copy corrections, or backend auth middleware.

---

## IMPORTANT: Two-repo context

The `artifacts/masready/` React app is the **marketing site** (masready.com.au).

The live demo app at `mas9power.masready.com.au` is a **more advanced private build** — but its backend structure matches `artifacts/api-server/`. When you add new API routes below, you are adding them to `artifacts/api-server/src/routes/` which will be deployed to the live app.

---

## FIXES TO IMPLEMENT — IN PRIORITY ORDER

---

### FIX 1 (P0 — SECURITY): Gate /api/audit behind authentication

**File:** `artifacts/api-server/src/middlewares/` — create `requireAuth.ts`
**File:** `artifacts/api-server/src/routes/index.ts` — add audit route with auth middleware

**Problem:** The `/audit` route in the live app and the `GET /api/audit` endpoint return real data including real email addresses and IP addresses without any authentication check.

**What to do:**

1. Create `artifacts/api-server/src/middlewares/requireAuth.ts`:

```typescript
import { type Request, type Response, type NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // The live app uses Express session with httpOnly cookies.
  // Session user is stored at req.session.userId after login.
  // If no session exists, return 401.
  const session = (req as any).session;
  if (!session?.userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  next();
}

export function requirePlatformAdmin(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  if (!session?.userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  if (session.role !== "platform_admin") {
    res.status(403).json({ error: "Platform admin access required" });
    return;
  }
  next();
}
```

2. Create `artifacts/api-server/src/routes/audit.ts`:

```typescript
import { Router, type IRouter } from "express";
import { requirePlatformAdmin } from "../middlewares/requireAuth";

const router: IRouter = Router();

// Gate the audit log behind platform admin auth.
// In the live app this route returns real audit events.
// The middleware ensures only authenticated platform admins can access it.
router.get("/audit", requirePlatformAdmin, (_req, res) => {
  // The live app's full audit implementation goes here.
  // For now, return a clear message that auth is required and working.
  res.json({
    protected: true,
    message: "Audit log requires platform_admin authentication.",
    events: []
  });
});

export default router;
```

3. Update `artifacts/api-server/src/routes/index.ts` to register the audit route:

```typescript
import { Router, type IRouter } from "express";
import healthRouter from "./health";
import auditRouter from "./audit";

const router: IRouter = Router();

router.use(healthRouter);
router.use(auditRouter);

export default router;
```

**Important note in code comments:** Add a comment in `audit.ts` saying: "The live Azure deployment uses express-session with PostgreSQL/Redis session store. The session.userId and session.role fields are set at login. This middleware pattern is compatible with the live app's existing auth implementation."

---

### FIX 2 (P0 — SECURITY): Gate /api/customers from non-admin users

**File:** `artifacts/api-server/src/routes/` — create `customers.ts`

**Problem:** The `GET /api/customers` endpoint in the live app returns all customer tenant codes including real organisation names (BOM, PFM, CITRYROADS, etc.). This must be restricted to platform_admin only.

**What to do:**

Create `artifacts/api-server/src/routes/customers.ts`:

```typescript
import { Router, type IRouter } from "express";
import { requirePlatformAdmin } from "../middlewares/requireAuth";

const router: IRouter = Router();

// Customer list — platform admin only.
// This prevents tenant enumeration by non-admin users.
router.get("/customers", requirePlatformAdmin, (_req, res) => {
  // Live app implementation returns full tenant list.
  // Protected here — only platform_admin session can access.
  res.json({
    protected: true,
    message: "Customer list requires platform_admin authentication."
  });
});

// Domain context — return only the current tenant's code, never a full list.
// This endpoint is called on every page load to determine which customer
// the current subdomain maps to. It should return only the current tenant.
router.get("/domain-context", (_req, res) => {
  // In the live app, this reads the subdomain from req.hostname and
  // returns only the matching tenant's public metadata.
  // Never return a full list of all tenants here.
  res.json({
    customerCode: "MAS9_POWER",
    allowDemoSeed: true,
    allowLiveMutation: false
  });
});

export default router;
```

Register in `artifacts/api-server/src/routes/index.ts` — add `import customersRouter from "./customers"` and `router.use(customersRouter)`.

---

### FIX 3 (P1 — UI): Add demo-mode banner component for seeded data pages

**File:** Create `artifacts/masready/src/components/DemoBanner.tsx`

**Problem:** Pages showing seeded/fictional data have no visible indicator that the data is demo-only. A prospect cannot distinguish demo numbers from real numbers.

**What to do:**

Create `artifacts/masready/src/components/DemoBanner.tsx`:

```tsx
interface DemoBannerProps {
  variant?: "seed" | "planning";
  className?: string;
}

export function DemoBanner({ variant = "seed", className = "" }: DemoBannerProps) {
  if (variant === "planning") {
    return (
      <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-sm font-medium mb-6 ${className}`}>
        <span className="flex-shrink-0 text-yellow-400">⚠</span>
        <span>
          <strong>Planning visibility only.</strong> Figures shown are fictional demo data. 
          Not legal, contractual, IBM-certified, or compliance advice.
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-6 ${className}`}>
      <span className="flex-shrink-0 text-blue-400">ℹ</span>
      <span>
        <strong>Demo data — MAS9 Power fictional tenant.</strong> All figures are seeded demo data, 
        not connected to any real Maximo environment.
      </span>
    </div>
  );
}
```

Then add this banner to the top of the following pages (inside the page container, before the first heading). Import `{ DemoBanner }` from `@/components/DemoBanner` in each:

- `artifacts/masready/src/pages/mas9-power.tsx` — add `<DemoBanner />` at the top of the return, inside the container div, before the motion div. This page renders DEMO_METRICS numbers — it must be clearly labelled.
- `artifacts/masready/src/pages/trust.tsx` — add `<DemoBanner variant="planning" />` before the licence disclaimer section.
- Any page in `artifacts/masready/src/pages/` that renders a value from `DEMO_METRICS` — check each page.

Also add a `<DemoBanner />` to the simulator page `artifacts/masready/src/pages/simulator.tsx` — it already has a static disclaimer text `"Static guided simulation — no real customer systems connected."` — wrap that in the `DemoBanner` component instead.

---

### FIX 4 (P1 — BRANDING): Fix the live app HTML title

**File:** `artifacts/masready/index.html`

**Problem:** The marketing site's `index.html` already has the correct title: `"MASReady — Maximo Delivery Automation Workbench"`. 

The live app at `mas9power.masready.com.au` has `<title>Maximo Bro Bot</title>` — this is the **private repo's** `index.html`, not the one in this public repo. Since you are working in Replit, look for any `index.html` in the project that contains `"Maximo Bro Bot"` and change the title to:

```html
<title>MASReady — Maximo Delivery Workbench</title>
```

If the file is at the repo root or inside the main app package, update it. The correct title to use is `MASReady — Maximo Delivery Workbench`.

Also: in the theme init script inside `index.html` (the one with `localStorage.getItem('aseeti-theme')`), change the localStorage key from `'aseeti-theme'` to `'masready-theme'` for consistency with the public brand name.

---

### FIX 5 (P1 — BRANDING): Standardise footer and schema.org references

**Problem:** All static HTML pages in the repo root contain:
- Footer text: `"© ... Software Compare Review. GitHub Pages-ready static site."`
- `ld+json` schema: `"name": "Software Compare Review"`, `"url": "https://github.com/softwarecomparereview"`

These look like internal/dev labels, not a product brand. For a prospect-facing site this is unprofessional.

**What to do — in all of these files:**
`architecture.html`, `features.html`, `trust.html`, `mas9-power.html`, `demo-walkthrough.html`, `docs.html`, `launch.html`, `contact.html`, `media.html`, `madd.html`

Make two changes in each file:

1. Change the footer copyright line from:
   `Software Compare Review. GitHub Pages-ready static site.`
   to:
   `MASReady — Maximo Delivery Automation Workbench.`

2. In the `<script type="application/ld+json">` block, change:
   ```json
   {"@type": "Organization", "name": "Software Compare Review", "url": "https://github.com/softwarecomparereview", "sameAs": ["https://github.com/softwarecomparereview"]}
   ```
   to:
   ```json
   {"@type": "Organization", "name": "MASReady", "url": "https://masready.com.au", "sameAs": ["https://masready.com.au"]}
   ```

---

### FIX 6 (P1 — CONTENT): Fix MAS9 Power page — add current-state/target framing

**File:** `artifacts/masready/src/pages/mas9-power.tsx`
**File:** `mas9-power.html` (static version in repo root)

**Problem:** The page describes the demo tenant as "running IBM Maximo Application Suite Manage 9.x" but the live demo fingerprint shows Maximo 7.6.1.3 on-premise. These are not contradictions — but the current wording doesn't explain the scenario. The correct framing is: customer currently on 7.6.1.3, planning path to MAS 9.

**What to do in `artifacts/masready/src/pages/mas9-power.tsx`:**

1. Change the opening paragraph from:
   ```
   "A fictional energy and utilities company running IBM Maximo Application Suite Manage 9.x. 
   This demo environment showcases the full capabilities of MASReady in a complex, multi-asset context."
   ```
   to:
   ```
   "A fictional energy and utilities company currently running Maximo 7.6.1.3 on-premise, 
   planning its upgrade path to IBM MAS Manage 9.x. The workbench demonstrates full 
   pre-upgrade readiness: fingerprinting the current estate, scoring patch impact, 
   reviewing licence headroom, and validating delivery confidence — before a single 
   change is made to production."
   ```

2. In the Environment Profile card, change the Platform row:
   - Find: `<span className="font-medium text-white">IBM MAS Manage 9.x</span>`
   - Replace with:
   ```tsx
   <span className="font-medium text-white">Maximo 7.6.1.3 on-premise</span>
   ```
   
3. Add a new row to the Environment Profile table after the Platform row:
   ```tsx
   <div className="flex justify-between pb-2 border-b border-white/5">
     <span className="text-muted-foreground">Target Platform</span>
     <span className="font-medium text-accent">IBM MAS Manage 9.x</span>
   </div>
   ```

**What to do in `mas9-power.html`:**

Find the customer profile table row that says:
```
|Platform|IBM Maximo Application Suite Manage 9.x|
```
Change it to two rows:
```
|Current Platform|Maximo 7.6.1.3 on-premise|
|Target Platform|IBM MAS Manage 9.x|
```

Also find the opening descriptive paragraph in `mas9-power.html` and apply the same updated wording as above (the text about "currently running Maximo 7.6.1.3...").

---

### FIX 7 (P1 — CONTENT): Correct demo-walkthrough.tsx claim language

**File:** `artifacts/masready/src/pages/demo-walkthrough.tsx`

**Find the `STEPS` array and make these specific changes:**

**Step index 1 (Delivery Intelligence) — change `detail`:**

Find:
```
"The top-level score (87/100) aggregates requirements coverage, patch risk, skill gaps, and licence headroom into one defensible number. Walk through each contributing factor."
```
Replace with:
```
"The delivery confidence score aggregates requirements coverage, patch risk, skill gaps, and licence headroom into one number. In this demo the score is 87/100 from seeded data. In a live deployment, every contributing factor reflects your real environment. Walk through each dimension to explain the methodology."
```

**Step index 1 (Delivery Intelligence) — change `proof` array item 1:**

Find: `"Intelligence Score: 87/100"`
Replace with: `"Intelligence Score: 87/100 (demo seed data)"`

**Step index 2 (Trust Center) — change `proof` array item 1:**

Find: `"0 mutations badge"`
Replace with: `"Zero mutations — platform is architecturally read-only"`

And change `detail`:

Find:
```
"The Trust Center shows every integration in READ-ONLY mode. No SQL exec, no Jira write, no Maximo write. The \"Zero Mutations\" counter proves no data was altered during the session."
```
Replace with:
```
"The Trust Center shows every integration in READ-ONLY mode. No SQL execution, no Jira write, no Maximo write. The platform is architecturally constrained — write operations are impossible by design, not just by configuration."
```

**Step index 3 (Integration Settings) — change `detail`:**

Find:
```
"Open Integration Settings. Show that Jira, Azure DevOps, and Maximo connections are configured with read-only tokens. Write toggles are disabled at the platform level — not just via UI."
```
Replace with:
```
"Open Integration Settings. Show that write toggles are disabled at the platform level — not just via UI. In a live customer deployment, Jira and Maximo tokens are stored as server-side environment variables and scoped to read-only. In this demo environment the integration is shown in unconfigured state — no live token is active."
```

**Step index 3 (Integration Settings) — change `proof` array:**

Replace the three proof points:
```
["Jira: READ scope only", "ADO: no write permission", "Maximo: fingerprint-read only"]
```
with:
```
["Write toggles disabled at platform level", "API tokens stored server-side only — never in browser", "Integration architecture is read-only by design"]
```

**Step index 5 (Maximo Fingerprint) — change `proof` array item 2:**

Find: `"Version: MAS 9.x Manage"`
Replace with: `"Current: Maximo 7.6.1.3 on-premise → Target: MAS 9.x"`

And change `detail`:

Find:
```
"The fingerprint scan identifies 46 customisations across MAS9 Manage — BOs, screen changes, scripts, workflow modifications. This snapshot is the baseline for all patch impact analysis."
```
Replace with:
```
"The fingerprint scan reads the current Maximo 7.6.1.3 environment and identifies 46 customisations — BOs, screen changes, automation scripts, and workflow modifications. This snapshot becomes the baseline for MAS 9 readiness assessment. Non-destructive: zero mutations, zero SQL writes."
```

---

### FIX 8 (P2 — ROUTING): Fix four broken route tags in demo-walkthrough.html

**File:** `demo-walkthrough.html` (static HTML in repo root)

Make these exact find-and-replace changes:

1. Find: `<span class="tag">/demo-status</span>`
   Replace with: `<span class="tag">/dashboard</span>`

2. Find: `<span class="tag">/requirement-uploads</span>`
   Replace with: `<span class="tag">/req-uploads</span>`

3. Find: `<span class="tag">/maximo-fingerprint</span>`
   Replace with: `<span class="tag">/maximo-inventory</span>`

4. Find: `<span class="tag">/license-reporting</span>`
   Replace with: `<span class="tag">/license-report</span>`

---

### FIX 9 (P2 — ROUTING): Add /demo-status route to the marketing site SPA

**File:** `artifacts/masready/src/App.tsx`
**File:** Create `artifacts/masready/src/pages/demo-status.tsx`

**Problem:** Scene S01 of the walkthrough references `/demo-status`. The route does not exist — the live app returns a 404 with "Did you forget to add the page to the router?".

**What to do:**

1. Create `artifacts/masready/src/pages/demo-status.tsx`:

```tsx
import { DEMO_METRICS } from "@/lib/constants";
import { CheckCircle2, XCircle, AlertCircle, Shield } from "lucide-react";
import { Link } from "wouter";

const WALKTHROUGH_ROUTES = [
  { scene: "S01", name: "Login + Customer Switch", route: "/", status: "ready" },
  { scene: "S02", name: "Delivery Intelligence", route: "/delivery-intelligence", status: "ready" },
  { scene: "S03", name: "Trust Center", route: "/trust-center", status: "ready" },
  { scene: "S04", name: "Integration Settings", route: "/integration-settings", status: "ready" },
  { scene: "S05", name: "Requirement Uploads", route: "/req-uploads", status: "ready" },
  { scene: "S06", name: "Maximo Inventory", route: "/maximo-inventory", status: "ready" },
  { scene: "S07", name: "Patch Impact", route: "/patch-impact", status: "ready" },
  { scene: "S08", name: "License Report", route: "/license-report", status: "ready" },
  { scene: "S09", name: "Skill Packs", route: "/skills", status: "ready" },
  { scene: "S10", name: "PFM (disabled)", route: null, status: "gated" },
  { scene: "S11", name: "Audit Log", route: "/audit", status: "auth-required" },
  { scene: "S12", name: "Help Center", route: "/help", status: "ready" },
] as const;

export default function DemoStatus() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
          Demo Environment
        </div>
        <h1 className="text-4xl font-bold mb-3">Demo Status</h1>
        <p className="text-muted-foreground">
          MAS9 Power fictional tenant — Maximo 7.6.1.3 → MAS 9 readiness scenario.
          All data is seeded demo data. No live Maximo connection active.
        </p>
      </div>

      {/* Tenant summary */}
      <div className="rounded-xl border border-white/10 bg-card p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-400" />
          Tenant Profile
        </h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: "Tenant", value: "MAS9 Power" },
            { label: "Data mode", value: "demo_seed" },
            { label: "Current platform", value: "Maximo 7.6.1.3" },
            { label: "Target platform", value: "IBM MAS Manage 9.x" },
            { label: "Trust boundary", value: "REVIEW ONLY" },
            { label: "Mutations", value: "0" },
            { label: "Seed files", value: String(DEMO_METRICS.seedFiles) },
            { label: "Customisations", value: String(DEMO_METRICS.customisationsScanned) },
          ].map(row => (
            <div key={row.label} className="flex justify-between py-2 border-b border-white/5">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Walkthrough checklist */}
      <div className="rounded-xl border border-white/10 bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">12-Scene Walkthrough — Route Status</h2>
        <div className="space-y-2">
          {WALKTHROUGH_ROUTES.map(item => (
            <div key={item.scene} className="flex items-center justify-between py-2 px-3 rounded-lg bg-background/50 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-8">{item.scene}</span>
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.status === "ready" && (
                  <><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-green-400 text-xs">Ready</span></>
                )}
                {item.status === "gated" && (
                  <><XCircle className="w-4 h-4 text-muted-foreground" /><span className="text-muted-foreground text-xs">Feature gated</span></>
                )}
                {item.status === "auth-required" && (
                  <><AlertCircle className="w-4 h-4 text-yellow-400" /><span className="text-yellow-400 text-xs">Auth required</span></>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-primary text-sm underline underline-offset-4">
          ← Back to demo home
        </Link>
      </div>
    </div>
  );
}
```

2. In `artifacts/masready/src/App.tsx`, add the import at the top with other page imports:
```tsx
import DemoStatus from "@/pages/demo-status";
```

3. Inside the `Design1Router` function's `<Switch>`, add before the `<Route component={NotFound} />` line:
```tsx
<Route path="/demo-status" component={DemoStatus} />
```

---

### FIX 10 (P2 — ARCHITECTURE): Render Mermaid diagrams in architecture.html

**File:** `architecture.html` (repo root)

**Problem:** Six Mermaid architecture diagrams are rendered as raw `<pre class="diagram">` text blocks. The page itself explains this as intentional for "GitHub Pages compatibility" — but Mermaid.js works fine via CDN on GitHub Pages.

**What to do:**

1. In `architecture.html`, find the closing `</head>` tag and add **before** it:
```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true, theme: 'dark', securityLevel: 'loose' });
</script>
```

2. Find every occurrence of `<pre class="diagram">` and replace with `<pre class="mermaid">`.

There are exactly 6 diagram blocks. The Mermaid syntax inside each block is already valid — no content changes needed.

3. Update the architecture page description paragraph that currently reads:
```
"Architecture source diagrams are included as Mermaid files and rendered here as readable source blocks for GitHub Pages compatibility."
```
Change to:
```
"Architecture diagrams rendered with Mermaid.js. Evidence-in, review-ready intelligence out."
```

---

### FIX 11 (P2 — SEO): Fix Google Search Console placeholder in all HTML files

**Files:** `architecture.html`, `features.html`, `trust.html`, `mas9-power.html`, `demo-walkthrough.html`, `docs.html`, `launch.html`, `contact.html`, `media.html`, `madd.html`, and any other `.html` file containing the placeholder.

**What to do:**

In every `.html` file that contains:
```html
<meta name="google-site-verification" content="REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN"/>
```

Replace with:
```html
<meta name="google-site-verification" content="bQVxkYSSkx4lEeF_SR7dpgW3XisUnvywslkSK-GghnI"/>
```

Note: `bQVxkYSSkx4lEeF_SR7dpgW3XisUnvywslkSK-GghnI` is the real token already used in `index.html` (the SPA entry point). Use that same token for all static HTML pages.

---

### FIX 12 (P2 — ARCHITECTURE): Fix architecture diagram hardcoded tenant reference

**File:** `architecture.html`

**Problem:** The first Mermaid diagram hardcodes the fictional tenant name directly.

Find in the first diagram block:
```
CC[Customer Config
MAS9_POWER
customer_hosted | jira_only]
```

Replace with:
```
CC[Customer Config
  tenant_id
  deployment_model | integration_mode]
```

This makes the diagram read as a general architecture pattern, not a demo-only artefact.

---

### FIX 13 (P2 — CONTENT): Add persona/user-type guidance section to home page

**File:** `artifacts/masready/src/pages/home.tsx`

**Problem:** The home page has no "who is this for" section. Different stakeholder types need different entry points.

**What to do:**

After the `LiveDashboard` component section (after the first major hero block), add a new section. Find a logical place after the statistics/metrics row and before the features cards, then insert:

```tsx
{/* Who is this for */}
<section className="py-24 border-t border-white/5">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for your team</h2>
    <p className="text-muted-foreground max-w-2xl mx-auto">
      Each role in a Maximo delivery programme has a different question. MASReady answers all of them from one platform.
    </p>
  </div>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
    {[
      {
        role: "Delivery Manager",
        question: "Is this upgrade ready to go live?",
        answer: "Delivery Intelligence dashboard — one confidence score, every risk surfaced.",
        href: "/mas9-power",
        color: "text-primary",
        border: "border-primary/20",
        bg: "bg-primary/5",
      },
      {
        role: "Maximo Administrator",
        question: "What customisations will break on this patch?",
        answer: "Patch Impact Analysis — 46 customisations cross-referenced against the fix pack manifest.",
        href: "/features",
        color: "text-orange-400",
        border: "border-orange-400/20",
        bg: "bg-orange-400/5",
      },
      {
        role: "Finance / Licence Planner",
        question: "Are we over-entitled or approaching overage?",
        answer: "AppPoint Planning — 12-month trend, inactive users, mobile pool headroom.",
        href: "/features",
        color: "text-yellow-400",
        border: "border-yellow-400/20",
        bg: "bg-yellow-400/5",
      },
      {
        role: "Security / Governance",
        question: "What does this tool actually do to our data?",
        answer: "Trust Center — read-only posture, zero mutations, full audit trail, data boundary proof.",
        href: "/trust",
        color: "text-green-400",
        border: "border-green-400/20",
        bg: "bg-green-400/5",
      },
      {
        role: "Solution Architect",
        question: "What is in our Maximo environment right now?",
        answer: "Environment Fingerprint — scripts, objects, workflows, domains across DEV/TEST/UAT/PROD.",
        href: "/architecture",
        color: "text-violet-400",
        border: "border-violet-400/20",
        bg: "bg-violet-400/5",
      },
      {
        role: "Executive Sponsor",
        question: "What is the business case for this tool?",
        answer: "The MAS9 Power demo story — fictional infrastructure tenant, full upgrade readiness walkthrough.",
        href: "/mas9-power",
        color: "text-accent",
        border: "border-accent/20",
        bg: "bg-accent/5",
      },
    ].map((item, i) => (
      <a
        key={i}
        href={item.href}
        className={`rounded-xl border ${item.border} ${item.bg} p-6 block hover:border-opacity-60 transition-colors`}
      >
        <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${item.color}`}>{item.role}</div>
        <div className="font-semibold text-white mb-2 text-sm">"{item.question}"</div>
        <div className="text-muted-foreground text-xs leading-relaxed">{item.answer}</div>
      </a>
    ))}
  </div>
</section>
```

---

### FIX 14 (P2 — CONTENT): Add API vs Extract explanation to features page

**File:** `artifacts/masready/src/pages/features.tsx`

**Problem:** Features page lists capabilities but never explains how data enters the system. This is a key enterprise differentiator — the extract path means no API token is required.

**What to do:**

At the end of the features page (before the closing `</div>` of the main container), add a new section:

```tsx
{/* Data ingestion paths */}
<section className="mt-24 pt-16 border-t border-white/5">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold mb-4">Two paths in. Same intelligence out.</h2>
    <p className="text-muted-foreground max-w-2xl mx-auto">
      Not every customer can open a live API connection on day one. MASReady works either way.
    </p>
  </div>
  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    <div className="rounded-xl border border-white/10 bg-card p-8">
      <div className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Path A — Live API</div>
      <h3 className="text-xl font-bold mb-4">Read-only connector</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex gap-2"><span className="text-primary">→</span> Maximo OSLC / REST endpoint</li>
        <li className="flex gap-2"><span className="text-primary">→</span> Read-only API token (never stored in browser)</li>
        <li className="flex gap-2"><span className="text-primary">→</span> Real-time environment fingerprint</li>
        <li className="flex gap-2"><span className="text-primary">→</span> Live customisation scan</li>
        <li className="flex gap-2"><span className="text-primary">→</span> Zero mutations — read scope only</li>
      </ul>
    </div>
    <div className="rounded-xl border border-white/10 bg-card p-8">
      <div className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Path B — Customer Extracts</div>
      <h3 className="text-xl font-bold mb-4">File upload — no API needed</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex gap-2"><span className="text-accent">→</span> CSV / JSON export from Maximo admin</li>
        <li className="flex gap-2"><span className="text-accent">→</span> Upload via secure intake</li>
        <li className="flex gap-2"><span className="text-accent">→</span> Same patch impact, licence planning, and fingerprint outputs</li>
        <li className="flex gap-2"><span className="text-accent">→</span> Fully anonymisable before upload</li>
        <li className="flex gap-2"><span className="text-accent">→</span> No live connection to customer systems required</li>
      </ul>
    </div>
  </div>
</section>
```

---

## AFTER ALL FIXES: VERIFICATION CHECKLIST

Run through these checks after implementing all fixes:

1. `pnpm run typecheck` — must pass with zero errors
2. `pnpm run build` — must pass with zero errors
3. Open `masready.com.au` (or local dev server) and verify:
   - [ ] Home page has "Built for your team" persona section
   - [ ] MAS9 Power page shows "Current: Maximo 7.6.1.3" and "Target: IBM MAS Manage 9.x"
   - [ ] Demo Walkthrough page shows correct route names (no `/demo-status`, `/license-reporting`, `/maximo-fingerprint`, `/requirement-uploads`)
   - [ ] Architecture page shows rendered Mermaid diagrams (not raw text)
   - [ ] Architecture page first diagram says `tenant_id` not `MAS9_POWER`
   - [ ] All static HTML page footers say "MASReady — Maximo Delivery Automation Workbench"
   - [ ] `/demo-status` route loads the DemoStatus page
   - [ ] DemoBanner component appears on mas9-power page
   - [ ] Features page has "Two paths in" section at the bottom
4. Check `/api/audit` returns 401 when called without a session
5. Check `/api/customers` returns 403 for non-admin sessions

---

## WHAT NOT TO DO

- Do NOT change any values in `seed-data/mas9-power/` JSON files
- Do NOT add any write operations to Maximo, Jira, or ADO
- Do NOT remove or weaken the trust center disclaimers
- Do NOT change the licence planning disclaimer
- Do NOT hardcode any real customer names, emails, or credentials anywhere
- Do NOT remove the `data_classification: "FICTIONAL — DEMO ONLY"` labels from seed data
- Do NOT change the safety model feature flags (`sql_execution: false`, `jira_write: false`, `maximo_write: false`)
- Do NOT publish the Playwright trace ZIP files mentioned in README
- Do NOT remove the `pnpm minimumReleaseAge: 1440` security setting in `pnpm-workspace.yaml`
