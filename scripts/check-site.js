#!/usr/bin/env node
/**
 * MASReady — Static site validation script (ESM)
 * Run: node scripts/check-site.js
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
let errors = [];
let warnings = [];
let passed = 0;

const ok   = (msg) => { console.log("  \x1b[32m✔\x1b[0m  " + msg); passed++; };
const fail = (msg) => { console.log("  \x1b[31m✘\x1b[0m  " + msg); errors.push(msg); };
const warn = (msg) => { console.log("  \x1b[33m⚠\x1b[0m  " + msg); warnings.push(msg); };
const section = (t) => console.log("\n\x1b[1m\x1b[34m" + t + "\x1b[0m");
const exists  = (rel) => fs.existsSync(path.join(ROOT, rel));
const read    = (rel) => { try { return fs.readFileSync(path.join(ROOT, rel), "utf8"); } catch { return null; } };

// ── Required pages ─────────────────────────────────────────────────────────
section("Required pages");
for (const f of [
  "index.html","features.html","trust.html","architecture.html",
  "media.html","demo-walkthrough.html","launch.html","contact.html",
  "mas9-power.html","404.html",
]) { exists(f) ? ok(f) : fail("MISSING: " + f); }

// ── CSS ────────────────────────────────────────────────────────────────────
section("Required CSS");
for (const f of [
  "assets/css/site.css","assets/css/design1.css",
  "assets/css/design2.css","assets/css/design3.css",
]) { exists(f) ? ok(f) : fail("MISSING: " + f); }

// ── JS ─────────────────────────────────────────────────────────────────────
section("Required JS");
for (const f of [
  "assets/js/site.js","assets/js/scenarios.js",
  "assets/js/simulator.js","assets/js/compare.js",
]) { exists(f) ? ok(f) : fail("MISSING: " + f); }

// ── SVG charts ─────────────────────────────────────────────────────────────
section("Required SVG charts");
for (const f of [
  "assets/charts/license-apppoints-trend.svg",
  "assets/charts/user-role-distribution.svg",
  "assets/charts/asset-class-distribution.svg",
  "assets/charts/patch-impact-risk.svg",
  "assets/charts/skill-coverage-summary.svg",
  "assets/charts/generation-run-status.svg",
  "assets/charts/work-risk-summary.svg",
  "assets/charts/outage-readiness-score.svg",
]) { exists(f) ? ok(f) : warn("MISSING chart: " + f); }

// ── Jekyll / deployment ────────────────────────────────────────────────────
section("Jekyll / deployment config");
exists(".nojekyll")                      ? ok(".nojekyll exists")                    : fail("MISSING: .nojekyll");
!exists("Gemfile")                       ? ok("No Gemfile (good)")                   : warn("Gemfile present — Jekyll may activate");
!exists("_config.yml")                   ? ok("No _config.yml (good)")               : warn("_config.yml present");
exists(".github/workflows/pages.yml")    ? ok(".github/workflows/pages.yml exists")  : fail("MISSING: .github/workflows/pages.yml");

// ── HTML checks ────────────────────────────────────────────────────────────
section("HTML file checks");
const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith(".html"));
const scssRefs = [], missingAssets = [], worldFirstClaims = [], seedBad = [];

for (const file of htmlFiles) {
  const content = read(file);
  if (!content) continue;

  // No .scss refs
  const sm = content.match(/href=["'][^"']*\.scss["']/g);
  if (sm) sm.forEach(m => scssRefs.push(file + ": " + m));

  // No world-first claims
  if (/world.{0,10}first/i.test(content)) worldFirstClaims.push(file);

  // No bad seed-data copy
  if (/seed data.{0,60}real customer/i.test(content) || /real customer.{0,60}seed data/i.test(content))
    seedBad.push(file);

  // Local asset refs exist
  const refs = content.match(/(?:href|src)=["']([^"'#?]+)["']/g) || [];
  for (const ref of refs) {
    const m = ref.match(/["']([^"'#?]+)["']/);
    if (!m) continue;
    const href = m[1];
    if (href.startsWith("http") || href.startsWith("//") || href.startsWith("data:") || href.startsWith("/")) continue;
    if (!fs.existsSync(path.join(ROOT, href)))
      missingAssets.push(file + ": " + href);
  }
}

scssRefs.length === 0        ? ok("No .scss references in HTML")          : scssRefs.forEach(fail);
worldFirstClaims.length === 0 ? ok("No 'world first' claims")             : worldFirstClaims.forEach(f => fail("'world first' claim: " + f));
seedBad.length === 0          ? ok("No misleading seed-data copy")        : seedBad.forEach(f => warn("Check seed-data copy: " + f));
missingAssets.length === 0    ? ok("All local asset references resolve")  : missingAssets.forEach(m => fail("Missing asset: " + m));

// ── SEO ────────────────────────────────────────────────────────────────────
section("SEO / sitemap");
exists("sitemap.xml")  ? ok("sitemap.xml")  : fail("MISSING: sitemap.xml");
exists("robots.txt")   ? ok("robots.txt")   : fail("MISSING: robots.txt");
const robots = read("robots.txt");
robots?.includes("Sitemap:") ? ok("robots.txt references Sitemap") : warn("robots.txt missing Sitemap reference");

// ── Trace files ────────────────────────────────────────────────────────────
section("Content safety");
const traceFiles = [];
function scanTraces(dir) {
  try {
    for (const f of fs.readdirSync(dir)) {
      if ([".git","node_modules","artifacts",".agents"].includes(f)) continue;
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) { scanTraces(full); continue; }
      if (f.endsWith(".zip") && f.includes("trace")) traceFiles.push(full.replace(ROOT + "/", ""));
    }
  } catch {}
}
scanTraces(ROOT);
traceFiles.length === 0 ? ok("No Playwright trace zip files") : traceFiles.forEach(f => fail("Trace file: " + f));

// ── Social kit ─────────────────────────────────────────────────────────────
section("Social kit (optional)");
for (const f of [
  "social/linkedin/maximo-delivery-workbench-launch-post.md",
  "social/linkedin/linkedin-poll-copy.md",
  "social/linkedin/cards/design1-thumbnail.svg",
  "social/linkedin/cards/design2-thumbnail.svg",
  "social/linkedin/cards/design3-thumbnail.svg",
]) { exists(f) ? ok(f) : warn("MISSING: " + f); }

// ── Summary ────────────────────────────────────────────────────────────────
console.log("\n" + "─".repeat(60));
console.log(`\x1b[1mResults: ${passed} passed, ${errors.length} errors, ${warnings.length} warnings\x1b[0m`);
if (errors.length > 0) {
  console.log("\x1b[31m\nFAILED — fix errors above.\x1b[0m");
  process.exit(1);
} else if (warnings.length > 0) {
  console.log("\x1b[33m\nPASSED with warnings.\x1b[0m");
} else {
  console.log("\x1b[32m\nALL CHECKS PASSED\x1b[0m");
}
