#!/usr/bin/env node
/**
 * MASReady pre-render verification script
 *
 * Checks that every expected static HTML file exists in dist/public/.
 * Fails with a non-zero exit code if any file is missing.
 *
 * Run:  node scripts/verify-prerender.mjs
 *       pnpm run verify:prerender
 */

import { existsSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist/public");

// ─── Industry slugs (mirrors INDUSTRY_SLUGS in prerender.mjs) ────────────────
const INDUSTRY_SLUGS = [
  "utilities", "transport", "government", "mining", "facilities",
  "power", "water", "rail", "roads", "airports",
];

// ─── Expected files relative to dist/public/ ─────────────────────────────────
const EXPECTED = [
  // Root
  "index.html",
  // Static routes
  "mas9-power/index.html",
  "demo-walkthrough/index.html",
  "industry-previews/index.html",
  "launch/index.html",
  "preview-studio/index.html",
  "contact/index.html",
  "trust/index.html",
  "data-modes/index.html",
  "architecture/index.html",
  "features/index.html",
  "platform/index.html",
  "audit-checklist/index.html",
  "media/index.html",
  // Industry marketing routes
  ...INDUSTRY_SLUGS.map((s) => `industry/${s}/index.html`),
  // Industry demo app routes
  ...INDUSTRY_SLUGS.map((s) => `demos/industries/${s}/index.html`),
];

// ─── Check ────────────────────────────────────────────────────────────────────

console.log(`\nVerifying pre-render output in dist/public/ (${EXPECTED.length} files expected)\n`);

let missing = 0;
let present = 0;

for (const rel of EXPECTED) {
  const full = resolve(DIST, rel);
  if (!existsSync(full)) {
    console.error(`  ✗  MISSING  dist/public/${rel}`);
    missing++;
  } else {
    const size = statSync(full).size;
    if (size < 500) {
      console.error(`  ✗  EMPTY    dist/public/${rel}  (${size} bytes — suspiciously small)`);
      missing++;
    } else {
      console.log(`  ✓  ${rel}  (${(size / 1024).toFixed(1)} KB)`);
      present++;
    }
  }
}

console.log(`\n${present} present, ${missing} missing.\n`);

if (missing > 0) {
  console.error(`Pre-render verification FAILED. Run "pnpm run prerender" to fix.\n`);
  process.exit(1);
} else {
  console.log(`Pre-render verification PASSED.\n`);
}
