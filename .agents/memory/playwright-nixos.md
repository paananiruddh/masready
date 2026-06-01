---
name: Playwright NixOS setup
description: How to run Playwright on Replit's NixOS environment — the downloaded chromium-headless-shell lacks libgbm.so.1 and other libs; use system chromium from nixpkgs instead.
---

## Problem

Playwright's downloaded `chrome-headless-shell` binary fails on Replit NixOS with:
```
error while loading shared libraries: libgbm.so.1: cannot open shared object file
```

Installing `mesa` via `installSystemDependencies` does NOT fix it — GBM is not exposed in standard lib paths on NixOS.

## Solution

Install system Chromium from nixpkgs:
```js
installSystemDependencies({ packages: ["chromium"] })
```

Then configure `playwright.config.ts` to use it via `launchOptions.executablePath`. Auto-detect the nix store path with a `try/execSync("test -f ...")` guard so CI (non-NixOS) still uses Playwright's bundled browser.

**Why:** NixOS manages libraries through the Nix store, not standard `/usr/lib` paths. The nixpkgs `chromium` package is wrapped with all required library paths baked in. The downloaded Playwright binary is a standard Linux ELF with no NixOS awareness.

**How to apply:** Any project using `@playwright/test` on Replit needs this pattern. The nix store path encodes the chromium version hash — if the nix `chromium` package is updated, the path changes. Use `which chromium` or `find /nix/var/nix/profiles -name chromium` to get the current path, then update `playwright.config.ts`.

## Current path (Replit as of 2026-06-01)
```
/nix/store/qa9cnw4v5xkxyip6mb9kxqfq1z4x2dx1-chromium-138.0.7204.100/bin/chromium
```

## Additional libs installed (not sufficient alone)

For reference, these were installed via `installSystemDependencies` before finding the real fix:
- `glib`, `nss`, `nspr`, `at-spi2-atk`, `cups`, `pango`, `cairo`
- `dbus`, `xorg.libX11`, `xorg.libXcomposite`, `xorg.libXdamage`, `xorg.libXext`
- `xorg.libXfixes`, `xorg.libXrandr`, `mesa`, `expat`, `xorg.libxcb`, `systemd`, `alsa-lib`
