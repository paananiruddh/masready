# Decisions Log

## 2026-05-04 — Remove DEMO_METRICS from homepage

**Decision**: Replace homepage capability strip with product-level facts instead of demo tenant numbers.

**Reason**: Displaying `DEMO_METRICS.seedFiles` (23), `DEMO_METRICS.namedUsers` (94) etc. on the homepage made visitors think those were product performance stats, not demo scenario data.

**Result**: Homepage strip now shows: 6 modules, 100% read-only, 0 mutations, 5 roles, 12min demo, 4 trust boundaries, 3 design variants, 0 prod risk. `DEMO_METRICS` is used only on clearly-labelled demo pages.

---

## 2026-05-04 — Interactive walkthrough instead of static step list

**Decision**: Rebuild `/demo-walkthrough` as an interactive guided experience.

**Reason**: Static list of cards provided no user value — no way to track progress, no detail on what to actually show during the demo.

**Result**: Full guided walkthrough with start screen, step cards (role + icon + detail + proof checklist), progress bar, step dots, live timer, back/next navigation, completion screen.

---

## 2026-05-04 — Two-column hero layout

**Decision**: Replace full-width centered hero text with two-column layout (copy left, animated dashboard right).

**Reason**: Centered full-width headline at 7xl font size appeared stretched and unprofessional. No visual product demonstration in the hero.

**Result**: Left column: headline with gradient word, description, CTAs. Right column: LiveDashboard animated card with cycling status panel, score progress bar, zero-mutation badge.

---

## 2026-04-27 — GitHub Pages with SPA routing

**Decision**: Use `404.html` redirect trick for SPA routing on GitHub Pages.

**Reason**: GitHub Pages serves static files; deep links to `/mas9-power` etc. return 404 without this.

**Result**: `404.html` stores `location.href` in `sessionStorage.redirect`; `index.html` reads and restores it via `history.replaceState`.

---

## 2026-04-27 — Three parallel design variants

**Decision**: Build three complete design systems (Design 1, 2, 3) sharing the same data/routing infrastructure.

**Reason**: Allows A/B comparison of visual approaches for the same content before choosing production direction.

**Result**: Each variant has its own Layout component, page set, and route prefix (`/`, `/design2`, `/design3`).
