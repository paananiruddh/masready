import { test, expect } from "@playwright/test";
import { loadPageManifest } from "./helpers/pageManifest";
import { loadForbiddenTerms } from "./helpers/forbiddenTerms";

const pages = loadPageManifest();
const forbiddenTerms = loadForbiddenTerms();

// One test per page — loads the page once, then checks all forbidden terms.
// This is far more efficient than one test per (page × term) pair.
for (const page of pages) {
  test(`[copy-safety] ${page.name} (${page.path}) — no forbidden terms`, async ({ page: pw }) => {
    await pw.goto(page.path, { waitUntil: "domcontentloaded" });

    const bodyText = await pw.locator("body").innerText();
    const html = await pw.content();

    const violations: string[] = [];

    for (const ft of forbiddenTerms) {
      if (ft.allowedPaths.includes(page.path)) continue;

      if (bodyText.includes(ft.term)) {
        violations.push(
          `Body text contains "${ft.term}" (reason: ${ft.reason})`
        );
      } else if (html.includes(ft.term)) {
        violations.push(
          `HTML source contains "${ft.term}" (reason: ${ft.reason})`
        );
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `Forbidden terms found on ${page.name} at ${page.path}:\n` +
          violations.map((v) => `  • ${v}`).join("\n")
      );
    }
  });
}

test("forbidden-terms manifest is not empty", () => {
  expect(
    forbiddenTerms.length,
    "forbidden-public-terms.json has no entries"
  ).toBeGreaterThan(0);
});

test("pages manifest is not empty", () => {
  expect(pages.length, "public-pages.json has no entries").toBeGreaterThan(0);
});
