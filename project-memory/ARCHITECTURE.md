# Architecture

## Repository Structure

```
/                                   # Repo root (also GitHub Pages static site)
├── artifacts/
│   ├── masready/                   # React/Vite marketing site
│   │   ├── src/
│   │   │   ├── pages/              # Page components
│   │   │   │   ├── home.tsx        # Design 1 home
│   │   │   │   ├── mas9-power.tsx  # Demo tenant profile
│   │   │   │   ├── features.tsx
│   │   │   │   ├── trust.tsx
│   │   │   │   ├── architecture.tsx
│   │   │   │   ├── media.tsx       # Charts from fictional MAS9 Power data
│   │   │   │   ├── demo-walkthrough.tsx  # Interactive 12-step walkthrough
│   │   │   │   ├── design2/        # Social feed variant pages
│   │   │   │   └── design3/        # Command center variant pages
│   │   │   ├── components/
│   │   │   │   ├── layout/         # Layout, Design2Layout, Design3Layout
│   │   │   │   ├── SimulatorPanel.tsx
│   │   │   │   └── ui/             # shadcn/ui primitives
│   │   │   ├── lib/
│   │   │   │   └── constants.ts    # DEMO_METRICS — demo data only
│   │   │   └── App.tsx             # Router: Design1Router, Design2Router, Design3Router
│   │   ├── vite.config.ts
│   │   └── package.json
│   ├── api-server/                 # Express API server (port 8080)
│   └── mockup-sandbox/             # Component preview server (port 8081)
├── seed-data/
│   └── mas9-power/                 # 23 fictional JSON seed files
├── project-memory/                 # Durable agent memory (this directory)
├── scripts/                        # Validation and utility scripts
├── index.html                      # GitHub Pages React SPA entrypoint
├── 404.html                        # GitHub Pages SPA redirect
└── CNAME                           # masready.com.au
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend framework | React 18 + TypeScript |
| Build tool | Vite 7 |
| Routing | wouter |
| Animations | Framer Motion |
| Charts | Recharts |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Package manager | pnpm (workspace monorepo) |
| API server | Express + Pino logging |

## Design Variants

Three parallel design systems exist under different routes:

| Variant | Route prefix | Style |
|---------|-------------|-------|
| Design 1 | `/` | Enterprise SaaS — dark navy, blue/cyan accents |
| Design 2 | `/design2` | Social feed — card-based, warm tones |
| Design 3 | `/design3` | Command center — terminal/HUD, monospace, green accents |

Each variant has its own Layout component and parallel page set.

## Routing

The `Router` component in `App.tsx` routes by path prefix:
- Paths starting `/design3` → Design3Router
- Paths starting `/design2` → Design2Router
- All others → Design1Router

## Key Conventions

- `DEMO_METRICS` in `constants.ts` contains demo tenant numbers only — never real customer data
- Homepage capability strip uses hardcoded product-level facts (not DEMO_METRICS)
- Any component displaying demo numbers must include a "MAS9 Power Demo Tenant" label
- Server code uses `req.log` / `logger` (never `console.log`)
