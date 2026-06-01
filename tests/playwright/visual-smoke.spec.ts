import { test, expect } from "@playwright/test";

const SMOKE_PAGES = [
  { path: "/", name: "Home" },
  { path: "/mas9-power", name: "MAS9 Power" },
  { path: "/architecture", name: "Architecture" },
  { path: "/launch", name: "Launch" },
  { path: "/trust", name: "Trust Center" },
  { path: "/demo-walkthrough", name: "Demo Walkthrough" },
  { path: "/data-modes", name: "Data Modes" },
  { path: "/contact", name: "Contact" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 720 },
  { name: "mobile", width: 390, height: 844 },
];

for (const viewport of VIEWPORTS) {
  for (const pg of SMOKE_PAGES) {
    test(`[smoke:${viewport.name}] ${pg.name} renders above the fold`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(pg.path, { waitUntil: "domcontentloaded" });

      // Page must have visible content above the fold
      const body = page.locator("body");
      await expect(body).toBeVisible();

      // Header / nav must be visible
      const nav = page.locator("nav, header, [role='navigation']").first();
      const navCount = await nav.count();
      if (navCount > 0) {
        await expect(nav).toBeVisible();
      }

      // At least one heading or prominent text element
      const heading = page.locator("h1, h2").first();
      const headingCount = await heading.count();
      expect(headingCount, `${pg.name} (${viewport.name}): no h1/h2 found`).toBeGreaterThan(0);

      // Page body has rendered text (not blank white screen)
      const text = await body.innerText();
      expect(
        text.trim().length,
        `${pg.name} (${viewport.name}): page appears blank`
      ).toBeGreaterThan(30);
    });
  }
}
