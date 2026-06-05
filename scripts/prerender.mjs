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
import { newsArticles } from "./news-prerender-data.mjs";

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

// ─── Article HTML renderer ────────────────────────────────────────────────────
// Renders a full article as semantic HTML for injection into <div id="root">.
// Medium's importer (and search crawlers) read this directly without executing JS.

function renderBlock(block) {
  switch (block.type) {
    case "paragraph":
      return `<p>${esc(block.text)}</p>`;
    case "heading":
      return `<h2>${esc(block.text)}</h2>`;
    case "hr":
      return `<hr>`;
    case "callout":
      return `<blockquote><p>${esc(block.text)}</p></blockquote>`;
    case "list":
      return `<ul>${block.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    case "image":
      return `<figure><img src="${esc(block.src)}" alt="${esc(block.alt)}" />${
        block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ""
      }</figure>`;
    default:
      return "";
  }
}

function renderArticleHtml(article) {
  const blocks = article.content.map(renderBlock).join("\n");
  return `<article>
  <header>
    <p>${esc(article.category)} &middot; ${esc(article.displayDate)} &middot; ${esc(article.readTime)}</p>
    <h1>${esc(article.title)}</h1>
    <p>${esc(article.subtitle)}</p>
  </header>
  ${blocks}
</article>`;
}

// Generates a completely standalone pure HTML document — zero JavaScript,
// zero external scripts — for use with importers like Medium that need clean HTML.
function renderPureArticleDocument(article, baseUrl) {
  const blocks = article.content.map((block) => {
    switch (block.type) {
      case "paragraph":
        return `      <p>${esc(block.text)}</p>`;
      case "heading":
        return `      <h2>${esc(block.text)}</h2>`;
      case "hr":
        return `      <hr>`;
      case "callout":
        return `      <blockquote><p>${esc(block.text)}</p></blockquote>`;
      case "list":
        return `      <ul>\n${block.items.map((i) => `        <li>${esc(i)}</li>`).join("\n")}\n      </ul>`;
      case "image": {
        const imgSrc = block.src.startsWith("/")
          ? `${baseUrl}${block.src}`
          : block.src;
        return `      <figure>\n        <img src="${esc(imgSrc)}" alt="${esc(block.alt)}" style="max-width:100%;height:auto;" />\n${block.caption ? `        <figcaption>${esc(block.caption)}</figcaption>\n` : ""}      </figure>`;
      }
      default:
        return "";
    }
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(article.title)}</title>
  <meta name="description" content="${esc(article.summary)}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(article.title)}" />
  <meta property="og:description" content="${esc(article.summary)}" />
  <meta property="og:url" content="${baseUrl}/news/${article.slug}/" />
  <meta property="article:published_time" content="${article.date}" />
  <style>
    body { font-family: Georgia, serif; max-width: 740px; margin: 0 auto; padding: 2rem 1.5rem; color: #1a1a1a; line-height: 1.7; }
    h1 { font-size: 2rem; line-height: 1.25; margin-bottom: 0.5rem; }
    h2 { font-size: 1.35rem; margin-top: 2rem; margin-bottom: 0.5rem; }
    p { margin: 0.75rem 0; }
    blockquote { border-left: 4px solid #1d4ed8; margin: 1.5rem 0; padding: 0.75rem 1.25rem; background: #eff6ff; font-style: italic; }
    blockquote p { margin: 0; }
    ul { padding-left: 1.5rem; }
    li { margin: 0.4rem 0; }
    figure { margin: 2rem 0; }
    figure img { max-width: 100%; height: auto; border: 1px solid #e5e7eb; display: block; }
    figcaption { font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem; font-style: italic; }
    hr { border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0; }
    .meta { font-size: 0.875rem; color: #6b7280; margin-bottom: 1.5rem; }
    .subtitle { font-size: 1.15rem; color: #374151; margin-bottom: 2rem; font-style: italic; }
    .back { font-size: 0.875rem; margin-bottom: 2rem; }
    .back a { color: #1d4ed8; text-decoration: none; }
  </style>
</head>
<body>
  <p class="back"><a href="${baseUrl}/news/">← MASReady News</a></p>
  <article>
    <header>
      <p class="meta">${esc(article.category)} &middot; ${esc(article.displayDate)} &middot; ${esc(article.readTime)}</p>
      <h1>${esc(article.title)}</h1>
      <p class="subtitle">${esc(article.subtitle)}</p>
    </header>
${blocks}
  </article>
</body>
</html>`;
}

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
    html = html.replace(
      /(<title>[^<]*<\/title>)/,
      `$1\n    <meta name="description" content="${esc(meta.description)}" />`
    );
  }

  // Add Open Graph tags for news article routes so importers (Medium, etc.)
  // get structured metadata in addition to the full body HTML.
  const articleSlugMatch = route.match(/^\/news\/(.+)$/);
  if (articleSlugMatch) {
    const article = newsArticles.find((a) => a.slug === articleSlugMatch[1]);
    if (article) {
      const ogTags = [
        `<meta property="og:type" content="article" />`,
        `<meta property="og:title" content="${esc(meta.title)}" />`,
        `<meta property="og:description" content="${esc(meta.description)}" />`,
        `<meta property="og:url" content="https://masready.com.au${route}/" />`,
        `<meta property="article:published_time" content="${article.date}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(meta.title)}" />`,
        `<meta name="twitter:description" content="${esc(meta.description)}" />`,
      ].join("\n    ");
      html = html.replace("</head>", `    ${ogTags}\n  </head>`);

      // Inject full article HTML into <div id="root"> so crawlers and importers
      // see the complete article text without executing JavaScript.
      const articleHtml = renderArticleHtml(article);
      html = html.replace(
        `<div id="root"></div>`,
        `<div id="root">${articleHtml}</div>`
      );
    }
  }

  // Determine output directory
  const relPath = route === "/" ? "" : route.slice(1); // e.g. "demos/industries/utilities"
  const outDir = relPath ? resolve(DIST, relPath) : DIST;

  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, "index.html"), html, "utf-8");
    written++;
    console.log(`  ✓  ${route}`);

    // For news article routes, also write a zero-JS pure HTML version at
    // /news/:slug/raw/index.html — useful for importers like Medium.
    if (articleSlugMatch) {
      const article = newsArticles.find((a) => a.slug === articleSlugMatch[1]);
      if (article) {
        const rawDir = resolve(outDir, "raw");
        mkdirSync(rawDir, { recursive: true });
        const pureHtml = renderPureArticleDocument(article, "https://masready.com.au");
        writeFileSync(resolve(rawDir, "index.html"), pureHtml, "utf-8");
        console.log(`  ✓  ${route}/raw (pure HTML)`);
      }
    }
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
