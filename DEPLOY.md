# MASReady — Fix Deployment

Repo: github.com/paananiruddh/masready  (GitHub Pages, branch `master`, domain masready.com.au)

## What was broken

1. **`index.html` was a dead React stub** — it loaded `/assets/index-CahwDQZA.js` (an old Vite/React SPA). Every other page (`features.html`, `trust.html`, etc.) is proper static HTML, but the homepage and any crawler hitting `/` got the broken React app. That's the "old design on refresh."
2. **`404.html` redirected everything back to the React app** via `<meta refresh>` + sessionStorage — this is an SPA fallback that resurrects the dead app on any unknown URL.
3. **Walkthrough had no animation** — just a flat static timeline.
4. **Footer year was blank** — `[data-year]` span was never filled by `site.js`.

## Files to commit (4)

| File | Action |
|------|--------|
| `index.html` | **Replace** — new animated static homepage (matches site.css design system) |
| `demo-walkthrough.html` | **Replace** — animated timeline: scroll-reveal scenes, sticky progress bar, Play button that auto-advances scene by scene, completion CTA |
| `404.html` | **Replace** — normal static 404, no SPA redirect |
| `assets/js/site.js` | **Replace** — same as before + fills `[data-year]` |

Drop these into the repo root (and `assets/js/`), commit, push to `master`. GitHub Pages redeploys in ~1 min.

## Files to DELETE from the repo (kill the old design for good)

These belong to the dead React app and must be removed so nothing references them:

```
/assets/index-CahwDQZA.js
/assets/index-Z1cQLfT5.css
masready-static-site.zip      (stale build artifact in repo root)
```

Also delete any other `/assets/index-*.js` or `/assets/index-*.css` hashed bundles if present.
Run locally:

```bash
git rm assets/index-*.js assets/index-*.css masready-static-site.zip
git rm -r --ignore-unmatch assets/  # ONLY if assets/ contains nothing but the old React bundle — check first!
```

⚠️ Do NOT delete `assets/css/site.css`, `assets/js/site.js`, `assets/icons/`, `assets/og/` — those are the live static site's assets. Only remove the hashed React `index-*` bundles.

## Animation summary

**Homepage:** floating gradient orbs in hero, fade-up reveals on scroll, count-up on the metric numbers (52, 7), card hover lift.

**Walkthrough:** 
- Sticky progress bar at top fills as you scroll
- Each scene fades+slides in when it enters view
- Vertical timeline line fills with gradient as you progress
- **Play button** auto-scrolls through all 12 scenes, highlighting the active one (pace scaled from each scene's real duration); manual scroll pauses it
- Completion banner with demo CTA at the end
- All motion respects `prefers-reduced-motion` (shows everything statically for those users)

## Verify after deploy

```bash
# Homepage should NOT reference the React bundle anymore
curl -s https://masready.com.au/index.html | grep -c "index-CahwDQZA"   # expect 0

# Walkthrough should have the animation script
curl -s https://masready.com.au/demo-walkthrough.html | grep -c "wt-progress"  # expect >0
```

Hard-refresh with cache cleared (Ctrl+Shift+R) — GitHub Pages + Cloudflare may cache the old index for a few minutes.
