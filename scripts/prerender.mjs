#!/usr/bin/env node
/**
 * MASReady pre-render script
 *
 * Generates a static index.html for every public route inside dist/public/.
 * Each file is the Vite-built SPA shell with route-specific <title> and
 * <meta name="description"> injected.  React hydrates normally from the
 * compiled bundle — no SSR complexity, no hydration mismatches.
 *
 * Run:  node scripts/prerender.mjs
 * Auto: included in `pnpm run build` via package.json scripts.
 *
 * Industry slugs come from src/lib/industryData.ts INDUSTRIES array.
 * If you add a new industry, also add its slug to INDUSTRY_SLUGS below.
 *
 * News articles come from src/lib/newsArticles.ts.
 * Add new article slugs to NEWS_ARTICLES below — keep in sync with that file.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist/public");

// ─── Industry data (mirrors src/lib/industryData.ts INDUSTRIES) ───────────────
// Keep in sync with the INDUSTRIES array in industryData.ts.
const INDUSTRY_SLUGS = [
  "utilities", "transport", "government", "mining", "facilities",
  "power", "water", "rail", "roads", "airports",
];

const INDUSTRY_NAMES = {
  utilities: "Utilities",
  transport: "Transport",
  government: "Government",
  mining: "Mining",
  facilities: "Facilities Management",
  power: "Power Generation",
  water: "Water & Wastewater",
  rail: "Rail & Transit",
  roads: "Roads & Highways",
  airports: "Airports & Aviation",
};

// ─── Route meta map ───────────────────────────────────────────────────────────

/** @type {Record<string, { title: string; description: string }>} */
const ROUTE_META = {
  "/": {
    title: "MASReady — Maximo Delivery Automation Workbench",
    description:
      "Operational intelligence platform for IBM Maximo environments. Environment fingerprinting, patch impact analysis, licence planning, and delivery intelligence.",
  },
  "/mas9-power": {
    title: "MAS9 Power Demo | MASReady",
    description:
      "Explore the MAS9 Power synthetic demo environment — delivery intelligence, patch impact analysis, and licence planning for IBM MAS 9.",
  },
  "/demo-walkthrough": {
    title: "Demo Walkthrough | MASReady",
    description:
      "Step through every MASReady module in 12 minutes. Guided walkthrough of the MAS9 Power demo tenant.",
  },
  "/industry-previews": {
    title: "Industry Previews | MASReady",
    description:
      "Explore MASReady demos across 10 industries: utilities, mining, rail, airports, government, and more.",
  },
  "/launch": {
    title: "Request a Demo | MASReady",
    description:
      "Request a persisted private MASReady demo or explore the public synthetic preview across 10 industry sectors.",
  },
  "/preview-studio": {
    title: "Preview Studio | MASReady",
    description:
      "Create a personalised synthetic Maximo preview for any industry. Session-scoped — no production data required.",
  },
  "/contact": {
    title: "Contact | MASReady",
    description:
      "Get in touch with the MASReady team to discuss your Maximo delivery challenges.",
  },
  "/trust": {
    title: "Trust Center | MASReady",
    description:
      "MASReady Trust Center — read-only architecture, zero mutations, data classification and audit trail.",
  },
  "/data-modes": {
    title: "Data Modes | MASReady",
    description:
      "Four MASReady data models: public demo, empty shell, customer enriched, and live integrated.",
  },
  "/architecture": {
    title: "Architecture | MASReady",
    description:
      "MASReady technical architecture — Zero Trust Data Model, tenant isolation, and integration design.",
  },
  "/features": {
    title: "Features | MASReady",
    description:
      "MASReady features — environment fingerprinting, patch impact analysis, licence planning, skill coverage, and audit trail.",
  },
  "/platform": {
    title: "Platform | MASReady",
    description:
      "Three MASReady operating modes: public synthetic preview, persisted private demo, and secure connected assessment.",
  },
  "/audit-checklist": {
    title: "Audit Checklist | MASReady",
    description:
      "MASReady delivery audit checklist for IBM Maximo environments.",
  },
  "/media": {
    title: "Media | MASReady",
    description: "MASReady media, press kit, and resources.",
  },
};

// Dynamic industry marketing routes  — /industry/:slug
for (const slug of INDUSTRY_SLUGS) {
  const name = INDUSTRY_NAMES[slug] || slug;
  ROUTE_META[`/industry/${slug}`] = {
    title: `${name} | MASReady Industry Brief`,
    description: `MASReady delivery intelligence for IBM Maximo in the ${name.toLowerCase()} sector. Industry brief, environment snapshot, and demo access.`,
  };
}

// Dynamic industry demo routes — /demos/industries/:slug
for (const slug of INDUSTRY_SLUGS) {
  const name = INDUSTRY_NAMES[slug] || slug;
  ROUTE_META[`/demos/industries/${slug}`] = {
    title: `${name} Demo Environment | MASReady`,
    description: `Full MASReady demo for ${name.toLowerCase()} environments. Dashboard, work orders, assets, PM compliance, SLA monitoring, and integrations.`,
  };
}

// ─── News routes ──────────────────────────────────────────────────────────────
// Keep in sync with src/lib/newsArticles.ts.
// Add a new entry here whenever a new article is published.

ROUTE_META["/news"] = {
  title: "News & Insights | MASReady",
  description:
    "Product updates, upgrade insights, and practical Maximo / MAS 9 readiness notes from the MASReady team.",
};

/** @type {Record<string, { title: string; description: string }>} */
const NEWS_ARTICLES = {
  "maximo-security-profiles-mas-9": {
    title: "Your Maximo Security Groups Are Lying to You | MASReady",
    description:
      "MASReady Security Profiles: a read-only governance module that turns raw Maximo security group data into role-based clarity before the complexity carries into MAS 9.",
  },
};

for (const [slug, meta] of Object.entries(NEWS_ARTICLES)) {
  ROUTE_META[`/news/${slug}`] = meta;
}

const ALL_ROUTES = Object.keys(ROUTE_META);

// ─── Guard ────────────────────────────────────────────────────────────────────

if (!existsSync(DIST)) {
  console.error(`\n  ERROR: dist/public/ not found.\n  Run "pnpm run build:vite" first.\n`);
  process.exit(1);
}

const templatePath = resolve(DIST, "index.html");
if (!existsSync(templatePath)) {
  console.error(`\n  ERROR: dist/public/index.html not found.\n  Run "pnpm run build:vite" first.\n`);
  process.exit(1);
}

// ─── Read template ────────────────────────────────────────────────────────────

const template = readFileSync(templatePath, "utf-8");

// ─── Pre-render each route ────────────────────────────────────────────────────

console.log(`\nPre-rendering ${ALL_ROUTES.length} routes → dist/public/\n`);

let written = 0;
let failed = 0;

for (const route of ALL_ROUTES) {
  const meta = ROUTE_META[route];

  // Inject route-specific <title>
  let html = template.replace(
    /<title>[^<]*<\/title>/,
    `<title>${esc(meta.title)}</title>`
  );

  // Inject or replace <meta name="description">
  if (/<meta\s+name="description"/.test(html)) {
    html = html.replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${esc(meta.description)}" />`
    );
  } else {
    // Insert after <title> if not present
    html = html.replace(
      /(<title>[^<]*<\/title>)/,
      `$1\n    <meta name="description" content="${esc(meta.description)}" />`
    );
  }

  // Determine output directory
  const relPath = route === "/" ? "" : route.slice(1); // e.g. "demos/industries/utilities"
  const outDir = relPath ? resolve(DIST, relPath) : DIST;

  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, "index.html"), html, "utf-8");
    written++;
    console.log(`  ✓  ${route}`);
  } catch (err) {
    console.error(`  ✗  ${route}  →  ${err.message}`);
    failed++;
  }
}

console.log(`\n${written} routes written, ${failed} failed.\n`);
if (failed > 0) process.exit(1);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function esc(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
