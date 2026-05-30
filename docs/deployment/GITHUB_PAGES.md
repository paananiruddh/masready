# GitHub Pages Setup

The public marketing site is hosted on GitHub Pages served from the repository root.

## Configuration

- Branch: `main`
- Folder: `/` (repository root)
- Custom domain: `masready.com.au`
- HTTPS: enforced via GitHub Pages

## Deployment

Push to `main` triggers `.github/workflows/pages.yml` which:
1. Checks out the repository
2. Uploads the repository root as the Pages artifact
3. Deploys to GitHub Pages

No build step required. This is a static HTML/CSS/JS site.

## Important

- `.nojekyll` must exist at the repository root to prevent Jekyll processing.
- No `Gemfile`, `_config.yml`, or Jekyll themes.
- All asset paths must be relative or use the `/masready/` base path for GitHub Pages subdirectory hosting.

## Live URL

https://softwarecomparereview.github.io/masready/
