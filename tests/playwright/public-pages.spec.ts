import { test, expect } from "@playwright/test";
import { loadPageManifest } from "./helpers/pageManifest";

const pages = loadPageManifest();

for (const page of pages) {
  test(`[${page.required ? "required" : "optional"}] ${page.name} renders at ${page.path}`, async ({ page: pw }) => {
    const response = await pw.goto(page.path, { waitUntil: "domcontentloaded" });

    // Should not be a hard 404
    if (response) {
      expect(
        response.status(),
        `${page.name} returned HTTP ${response.status()}`
      ).not.toBe(404);
    }

    // Body must exist and have content
    const body = pw.locator("body");
    await expect(body).toBeAttached();

    // Page must not be blank — at least one visible text element
    const textContent = await body.innerText();
    expect(textContent.trim().length, `${page.name} body appears empty`).toBeGreaterThan(20);

    // No obvious crash markers
    const crashPhrases = [
      "Cannot read properties",
      "is not a function",
      "Uncaught TypeError",
      "Uncaught ReferenceError",
      "Application error",
      "Something went wrong",
      "ChunkLoadError",
    ];
    for (const phrase of crashPhrases) {
      expect(
        textContent,
        `${page.name} contains crash marker: "${phrase}"`
      ).not.toContain(phrase);
    }

    // Title or h1 must exist
    const titleEl = pw.locator("h1, title");
    const count = await titleEl.count();
    expect(count, `${page.name} has no h1 or title element`).toBeGreaterThan(0);
  });
}

// Manifest integrity guard: if public-pages.json is empty, warn
test("public-pages manifest is not empty", () => {
  expect(pages.length, "public-pages.json has no entries — add pages to grow the suite").toBeGreaterThan(0);
});

test("all required pages are present in manifest", () => {
  const required = pages.filter((p) => p.required);
  expect(required.length, "No required pages defined in public-pages.json").toBeGreaterThan(0);
});
