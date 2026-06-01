import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:80";

// On NixOS (Replit), the downloaded Playwright Chromium headless-shell lacks
// libgbm.so.1 and other NixOS-incompatible system libs.
// We fall back to the system Chromium installed from nixpkgs, which is
// correctly wrapped and includes all required shared libraries.
// When running in CI (non-Replit), leave executablePath undefined so
// Playwright uses its own bundled browser.
const NIXOS_CHROMIUM =
  "/nix/store/qa9cnw4v5xkxyip6mb9kxqfq1z4x2dx1-chromium-138.0.7204.100/bin/chromium";

function resolveChromiumPath(): string | undefined {
  // Allow override via env var (e.g. CI)
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) {
    return process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  }
  // On Replit: use system chromium if available, else let Playwright pick
  try {
    const { execSync } = require("child_process");
    execSync(`test -f "${NIXOS_CHROMIUM}"`, { stdio: "ignore" });
    return NIXOS_CHROMIUM;
  } catch {
    return undefined;
  }
}

const chromiumPath = resolveChromiumPath();

export default defineConfig({
  testDir: "./tests/playwright",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never", outputFolder: "tests/playwright-report" }]],

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(chromiumPath ? { launchOptions: { executablePath: chromiumPath } } : {}),
      },
    },
    {
      name: "mobile-chrome",
      use: {
        ...devices["Pixel 5"],
        ...(chromiumPath ? { launchOptions: { executablePath: chromiumPath } } : {}),
      },
    },
  ],

  // App is already running in Replit via workflow.
  // To run against a local static build:
  //   BASE_URL=http://localhost:4173 pnpm test:e2e
  // To spin up a static server manually:
  //   npx serve . -l 4173
});
