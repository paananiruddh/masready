# MASReady – Environment Audit Checklist Integration
## Replit Prompt (Fully Owned — No External URLs)

---

## Context

You are working inside the `paananiruddh/masready` GitHub repository.
Working directory for all changes: `artifacts/masready/`

Tech stack (do not change):
- React 19 + Vite + Wouter
- Tailwind CSS v4 (`@import "tailwindcss"` — NOT v3 syntax)
- framer-motion for animations
- shadcn/ui component library
- pnpm monorepo — do NOT run `npm install`, use `pnpm install`

The goal is to integrate a fully MASReady-owned, self-contained environment audit checklist directly into the marketing site. **No external URLs. No third-party hosting. No Perplexity links.** The tool lives entirely at `masready.com.au/audit-checklist`.

State is held in React (`useState`) — no localStorage, no backend, no database required.

---

## Files to create

### File 1 — `artifacts/masready/src/lib/auditChecklist.ts`

Create this file with the EXACT content below (do not modify):

```typescript
// ← PASTE THE FULL CONTENT OF masready-integration/src/lib/auditChecklist.ts HERE
// (52 checks across 7 sections with all data definitions, scoring, and export logic)
```

> The full file content is provided in the attached zip `masready-audit-integration.zip` at path `masready-integration/src/lib/auditChecklist.ts`

### File 2 — `artifacts/masready/src/pages/audit-checklist.tsx`

Create this file with the EXACT content below (do not modify):

```typescript
// ← PASTE THE FULL CONTENT OF masready-integration/src/pages/audit-checklist.tsx HERE
// (Full React component — dashboard view, audit detail view, section panels, check rows, score ring, export)
```

> The full file content is provided in the attached zip `masready-audit-integration.zip` at path `masready-integration/src/pages/audit-checklist.tsx`

---

## Files to edit

### Edit 1 — `artifacts/masready/src/App.tsx`

**Add import** after the `AdaptiveRegression` import line:
```tsx
import AuditChecklist from "@/pages/audit-checklist";
```

**Add route** inside `Design1Router`'s `<Switch>`, after the `/adaptive-regression` route:
```tsx
<Route path="/audit-checklist" component={AuditChecklist} />
```

---

### Edit 2 — `artifacts/masready/src/components/layout/Navbar.tsx`

In the `NAV_LINKS` array, add the following entry **after** `{ href: "/trust", label: "Trust Center" }`:

```tsx
{ href: "/audit-checklist", label: "Audit Checklist" },
```

---

### Edit 3 — `artifacts/masready/src/pages/features.tsx`

**Step 1:** Add `ClipboardCheck` to the existing `lucide-react` import (add it to the end of the existing named import list).

**Step 2:** In the `FEATURES` array, add this entry **after** the `Trust Center` entry:
```tsx
{ title: "Environment Audit Checklist", icon: ClipboardCheck, desc: "52-point pre-migration assessment covering delivery intelligence, trust center compliance, patch impact, and AppPoints licence planning for Maximo 7.6.x to MAS Manage 9 transitions. Fully owned by MASReady." },
```

---

### Edit 4 (conditional) — Design2Layout and Design3Layout

Check if `artifacts/masready/src/components/layout/Design2Layout.tsx` and `Design3Layout.tsx` contain their own NAV_LINKS arrays. If they do, add `{ href: "/audit-checklist", label: "Audit Checklist" }` after the Trust Center entry in each.

---

## Verification checklist

After making all changes, verify:

1. `pnpm run typecheck` inside `artifacts/masready/` passes with zero errors
2. Navigate to `/audit-checklist` — the page renders with the dark MASReady theme (no white flash, no broken layout)
3. Click "New Audit Session" — a modal appears, form submits, audit detail view loads
4. In the audit detail view, expand a check row — SQL hint, remediation, and notes fields all appear
5. Mark a check as Pass/Fail/Warn — the section progress bar and overall score ring update
6. Click "Export Report" — a `.md` file downloads
7. Click "All audits" — returns to dashboard, the completed session is listed with its score
8. Navigate to `/features` — "Environment Audit Checklist" appears as a feature card
9. "Audit Checklist" appears in the desktop and mobile navigation
10. No existing routes are broken (`/`, `/trust`, `/patch-impact`, `/license-report`, etc.)

---

## Hard constraints — DO NOT violate

- Do NOT link to any external URL (no perplexity.ai, no hosted tools)
- Do NOT add localStorage, sessionStorage, cookies, or indexedDB calls
- Do NOT add a backend, API routes, or database
- Do NOT modify any existing page logic, seed data, or constants
- Do NOT change the Vite config, Tailwind config, or pnpm workspace
- Do NOT change any existing route — only ADD new ones
- Do NOT use Tailwind v3 syntax (`@tailwind base` etc.) — this project uses Tailwind v4 (`@import "tailwindcss"`)
- The disclaimer wording on the page must stay consistent with Trust Center language
- Keep `DemoBanner variant="planning"` at the top of the page — this is required by the MASReady trust model

---

## What the page delivers

The audit checklist page (`/audit-checklist`) is a fully self-contained React tool that:

- Creates and manages multiple named audit sessions (no persistence needed — sessions live in React state during the visit)
- Presents 52 checks across 7 domains: Delivery Intelligence, Trust Center Compliance, Patch & iFix Impact Analysis, License Planning Readiness, OpenShift & Infrastructure, Integration & API Readiness, Post-Migration Validation
- Colour-codes by severity: Critical (red dot), High (orange), Medium (amber), Low (green)
- Marks each check Pass / Warn / Fail / N/A with a toggle-style status button row
- Expands each check to show: full description, read-only SQL diagnostic hint (where applicable), remediation guidance, reference, and assessor notes textarea
- Shows a real-time readiness score ring and section progress bars
- Displays a critical-fails banner when critical severity items are marked Fail
- Exports the full audit as a structured Markdown report
- All state is in-memory React state — no external dependencies, no API calls
