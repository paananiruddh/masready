# TODO Next

## High Priority

- [ ] **Push to GitHub Pages** — User must run `git push live main --force` to update masready.com.au with all recent changes (interactive walkthrough, homepage fix, seed data stage, etc.)
- [ ] **Rebuild React assets** — Run `PORT=23369 BASE_PATH=/ pnpm --filter @workspace/masready run build` then copy new assets to `/assets/` before pushing

## Near-term Features

- [ ] **Seed data validation script** — `scripts/validate-seed-data.js` that checks: all 23 files present, no real email domains, no real company names, cross-references (users→roles, assets→sites, work orders→assets) are valid
- [ ] **Demo reset command** — `scripts/reset-demo.js` that restores seed data to canonical state
- [ ] **Playwright screenshots** — Capture Seed Data stage card, homepage hero, walkthrough start screen for use in wiki/media page
- [ ] **Design 2 + Design 3 features pages** — Add Seed Data stage to the parallel variant features pages

## Medium Priority

- [ ] **Azure subdomain deployment notes** — Document how to deploy a customer instance to Azure and configure `<customer>.masready.com.au` DNS
- [ ] **Customer onboarding wizard screenshots** — Fictional screenshots of the onboarding flow for use on the website
- [ ] **Offline skill packs** — Bundle role-specific guides (Admin, Delivery Lead, Finance, etc.) as PDFs accessible from the Help Center

## Low Priority / Future

- [ ] Add `23-demo-dashboards.json` chart definitions to `media.tsx` (currently charts use hardcoded data — wire them to seed file)
- [ ] Add seed data version number to `01-tenant-profile.json` and display it on `/mas9-power` page
- [ ] Design 2 and Design 3 walkthrough pages — make them interactive (currently may be static)
- [ ] Compare page — add live side-by-side iframe comparison of all 3 designs

## Completed (remove when archived)

- [x] Fix homepage hero stretch and animation
- [x] Rebuild walkthrough as interactive guided experience
- [x] Replace DEMO_METRICS on homepage with product capability facts
- [x] Create 23 seed data JSON files
- [x] Add Seed Data stage to features page
- [x] Create project memory system
