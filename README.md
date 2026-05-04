# Maximo Delivery Automation Workbench — GitHub Pages Site

Static GitHub Pages-ready website for the **Maximo Delivery Automation Workbench**, with **MAS9 Power** positioned as the fictional Energy & Utilities demo story.

## Product/site naming

Lead with **Maximo Delivery Automation Workbench**. Use **MAS9 Power** as the demo/customer story, not the product name.

## Local preview

Because this is a static site, you can open `index.html` directly or run:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## GitHub Pages

1. Upload all files in this ZIP to the root of `softwarecomparereview/masready`.
2. Commit to `main`.
3. In GitHub: Settings → Pages → Source: GitHub Actions.
4. The included workflow `.github/workflows/pages.yml` will publish the static site.

## Search Console

Replace `REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN` in all HTML files with your Google Search Console meta verification token, or replace `google-site-verification-placeholder.html` with the real Google verification file.

## Content source

The site content is based on AssetizeMaximoBroBot commit:

`c671e33b9f28ab0c698d2b66d35a4ff47404c79d`

## Safety notes

- MAS9 Power is fictional seeded demo data.
- License usage planning is not legal, contractual, IBM-certified, or compliance advice.
- Do not publish Playwright trace ZIP files.
- Review screenshots/video before public release.
