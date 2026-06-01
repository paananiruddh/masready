# Cleanup Report — Public Customer Label Removal + Playwright Regression Suite

## Objective

Remove all public-facing references to customer-specific labels (PFM, BOM) and add a manifest-driven Playwright regression suite.

---

## Files Changed

### Public-facing cleanup

| File | Change |
|------|--------|
| `seed-data/mas9-power/01-tenant-profile.json` | Renamed `pfm_contract_mobilisation` → `contract_mobilisation` |
| `seed-data/mas9-power/16-contracts.json` | Renamed `pfm_enabled` → `mobilisation_enabled`, `pfm_note` → `mobilisation_note`, updated note text |
| `seed-data/mas9-power/README.md` | Replaced "(PFM disabled)" → "(mobilisation module disabled)" |
| `artifacts/masready/src/pages/architecture.tsx` | Replaced "PFM Mobilisation" → "Contract Mobilisation", "PFM OFF" → "Premium Actions OFF" (prior session) |
| `artifacts/masready/src/pages/design2/demo-walkthrough.tsx` | Replaced route `/pfm` → `/contract-mobilisation` |
| `mas9-power.html` | Removed "PFM contract mobilisation disabled" list item (prior session) |

### Internal document cleanup

| File | Change |
|------|--------|
| `project-memory/CUSTOMER_TENANT_MODEL.md` | Replaced "PFM (Procurement & Finance Module)" section with "Contract Mobilisation Module" |
| `project-memory/DEPLOYMENT_MODEL.md` | Replaced "PFM module gated by feature flag" |
| `social/linkedin/architecture-summary.md` | Replaced `pfm-demo.masready.com.au` → `customer-a.masready.com.au` |
| `arena-data/agent-context/ARENA_AGENT_CONTEXT.md` | Replaced `pfm.masready.com.au` / `bom.masready.com.au` with generic customer subdomains |
| `arena-data/rapid-rounds-operational-madd-plan.md` | Replaced all PFM/BOM subdomain and label references |
| `arena-data/multimodal-learning-design.md` | Replaced "For PFM/BOM demos" → "For customer demos" |

### Google Analytics

| File | Change |
|------|--------|
| All 13 static HTML pages + `artifacts/masready/index.html` | Added `G-T2G0P43096` Google tag (prior session) |

---

## Terms Removed / Replaced

| Term removed | Replaced with |
|---|---|
| `PFM` (public-facing) | `Contract Mobilisation` or `Mobilisation module` |
| `BOM` (public-facing) | Generic — no occurrences found in public pages |
| `Generic PFM` | n/a — already removed in prior session |
| `Generic BOM` | n/a — already removed in prior session |
| `pfm_contract_mobilisation` (key name) | `contract_mobilisation` |
| `pfm_enabled` (key name) | `mobilisation_enabled` |
| `pfm_note` (key name) | `mobilisation_note` |
| `pfm-demo.masready.com.au` | `customer-a.masready.com.au` |
| `pfm.masready.com.au` | `customer-a.masready.com.au` |
| `bom.masready.com.au` | `customer-b.masready.com.au` |

---

## Remaining Internal References and Justification

The following files still contain PFM/BOM-adjacent terms but are **not public-rendered**:

| File | Remaining term | Justification |
|------|----------------|---------------|
| `attached_assets/replit_instructions_*.md` | `BOM`, `PFM` | Agent instruction attachments — never deployed or served publicly |
| `.local/secondary_skills/` | `BOM` (in file-converter SKILL.md, product-manager SKILL.md) | Agent skill files — not served; `BOM` here means Byte-Order-Mark and Product BOM respectively, unrelated to customer labels |
| `arena-data/ui-builder-selection.md` | `pfm/BOM demo entry points` reference | Internal planning doc — not served publicly; acceptable as internal context |

None of these files are rendered on any public route.

---

## Playwright Regression Suite

### Structure

```
playwright.config.ts
tests/
  fixtures/
    public-pages.json          ← add/remove pages here
    feature-manifest.json      ← add/remove features here
    forbidden-public-terms.json ← add/remove forbidden terms here
  playwright/
    public-pages.spec.ts       ← visits every page, asserts no crash
    public-copy-safety.spec.ts ← checks forbidden terms absent from HTML
    feature-manifest.spec.ts   ← validates feature-level copy rules
    visual-smoke.spec.ts       ← above-the-fold render check (desktop + mobile)
    helpers/
      pageManifest.ts
      featureManifest.ts
      forbiddenTerms.ts
```

### Test counts

| Spec | Tests | Description |
|------|-------|-------------|
| `public-pages.spec.ts` | 14 | One per route + 2 manifest guards |
| `feature-manifest.spec.ts` | 17 | One per feature×route pair |
| `visual-smoke.spec.ts` | 16 | 8 pages × desktop + mobile viewports |
| `public-copy-safety.spec.ts` | 14 | One per page (checks all forbidden terms in a single pass per page) |

**Total: 61 tests**

### Package scripts

```bash
pnpm test:e2e                  # run all Playwright tests
pnpm test:e2e:ui               # run with Playwright UI
pnpm test:e2e:headed           # run in headed browser
pnpm test:public-copy          # run copy safety tests only
```

### How to run

The app must be running at `localhost:80` (default Replit proxy):

```bash
BASE_URL=http://localhost:80 pnpm test:e2e
```

Against a static build:
```bash
BASE_URL=http://localhost:4173 pnpm test:e2e
```

### NixOS / Replit environment note

Playwright's downloaded Chromium headless-shell binary requires system libraries
(`libgbm.so.1`, `libnspr4.so`, etc.) that are not available in NixOS standard paths.

`playwright.config.ts` auto-detects the Replit system Chromium at
`/nix/store/.../chromium` and sets `launchOptions.executablePath` to use it.
On CI (non-NixOS), the config falls back to Playwright's bundled browser automatically.

### How to grow the suite (add a page)

1. Open `tests/fixtures/public-pages.json`
2. Add an entry: `{ "path": "/new-page", "name": "New Page", "required": true }`
3. Tests automatically include the new page on next run

### How to shrink the suite (remove a page)

1. Open `tests/fixtures/public-pages.json`
2. Remove the entry or set `"required": false`
3. Tests automatically exclude it

### How to add a forbidden term

1. Open `tests/fixtures/forbidden-public-terms.json`
2. Add: `{ "term": "Acme Corp", "allowedPaths": [], "reason": "Customer name — not for public pages" }`
3. All public pages are immediately tested against it

### How to add a feature

1. Open `tests/fixtures/feature-manifest.json`
2. Add an entry with `id`, `routes`, `expectedPublicCopy`, `forbiddenPublicCopy`
3. `feature-manifest.spec.ts` picks it up automatically

---

## Public Routes Tested

| Route | Name | Required |
|-------|------|----------|
| `/` | Home | ✅ |
| `/mas9-power` | MAS9 Power | ✅ |
| `/features` | Features | ✅ |
| `/trust` | Trust Center | ✅ |
| `/architecture` | Architecture | ✅ |
| `/demo-walkthrough` | Demo Walkthrough | ✅ |
| `/launch` | Launch | ✅ |
| `/contact` | Contact | ✅ |
| `/data-modes` | Data Modes | ✅ |
| `/skills` | Skills | optional |
| `/simulator` | Simulator | optional |
| `/compare` | Compare | optional |

---

## Acceptance Criteria Status

| Criterion | Status |
|-----------|--------|
| No public route renders "PFM" or "BOM" | ✅ |
| No public route renders "Generic PFM" or "Generic BOM" | ✅ |
| No public route renders real customer names/domains | ✅ |
| MAS9 Power remains fictional/demo-only | ✅ |
| Contract mobilisation concept remains generic | ✅ |
| Feature flag story still works | ✅ |
| Playwright suite added | ✅ |
| public-pages.json drives route coverage | ✅ |
| feature-manifest.json drives feature coverage | ✅ |
| forbidden-public-terms.json drives copy safety | ✅ |
| Tests can shrink/grow by editing manifests | ✅ |
