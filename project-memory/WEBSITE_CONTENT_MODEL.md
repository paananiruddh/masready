# Website Content Model

## Overview

The MASReady marketing website at `masready.com.au` is a React SPA with three parallel design variants.

## Design 1 (Enterprise SaaS) — Primary

Route: `/`

### Homepage Sections
1. **Hero** — Two-column: headline/copy left, animated LiveDashboard card right. Animated gradient orbs. Badge: "MAS 9 Delivery Intelligence · MAS9 Power Demo".
2. **Capability Strip** — 8 product-level facts (6 modules, 100% read-only, 0 mutations, 5 roles, 12min demo, 4 trust boundaries, 3 design variants, 0 prod risk). Count-up animation on scroll. NOT demo tenant data.
3. **Features Grid** — 4 feature cards: Delivery Intelligence, Maximo Fingerprint, License Planning, Trust Center.
4. **Demo Spotlight** — MAS9 Power demo call-out card with glow effect.
5. **CTA** — 12-Minute Walkthrough + Contact buttons.

### Named Pages

| Page | Route | Purpose |
|------|-------|---------|
| MAS9 Power Demo | `/mas9-power` | Full demo tenant profile. Uses DEMO_METRICS. Clearly labelled fictional. |
| Features | `/features` | Six module deep-dive. Includes Seed Data stage card (Stage 2). |
| Trust Center | `/trust` | Zero-mutation proof, audit trail, trust boundaries |
| Architecture | `/architecture` | System design, read-only connectors |
| Media | `/media` | Charts generated from fictional MAS9 Power data (labelled) |
| Walkthrough | `/demo-walkthrough` | Interactive 12-step guided demo with timer and progress tracking |
| Launch | `/launch` | Pre-launch / early access |
| Contact | `/contact` | Contact form |
| Simulator | `/simulator` | Animated scenario simulator |
| Compare | `/compare` | Side-by-side design variant comparison |

## Naming Rules (Critical)

| Correct | Incorrect |
|---------|-----------|
| MAS9 Power | MAS9Power |
| MAS9 Power | MAS 9 Power |
| MAS9 Power | Mag9 Power |
| MAS9 Power demo tenant | MAS9 energy tenant (unless lowercase descriptive only) |
| fictional MAS9 Power data | real/live data (never) |

## Demo Data Labelling Rules

Any number, chart, or metric that comes from the MAS9 Power seed data MUST be labelled:
- "MAS9 Power Demo Tenant" or
- "Demo Tenant" or  
- "fictional MAS9 Power data" or
- shown on the `/mas9-power` or `/media` pages which are already clearly framed as demo

The homepage capability strip shows PRODUCT-LEVEL facts only (not demo tenant numbers).

## Visual Style (Design 1)

- Background: `#0d1426` (dark navy)
- Primary: blue (`#3b82f6`)
- Accent: cyan (`#06b6d4`)
- Cards: `bg-card/80 backdrop-blur border border-white/10`
- Rounded: `rounded-xl` or `rounded-2xl`
- Font: Inter (system fallback)
- Animations: Framer Motion fade/slide-in, animated gradient orbs
