# TylerStorage.com: one-page site for Cloudflare Pages

## Deploy
1. Put the 17 `tylerstorage_*` image files (downloaded from the current site) in the `images` folder.
   Any image that's missing falls back to the original WordPress URL automatically.
2. In Cloudflare: Workers & Pages → Create → Pages → Upload assets (or connect a Git repo). Build command: none. Output directory: `/` (this folder).
3. Add the custom domain `www.tylerstorage.com` (and redirect the bare domain to www).
4. Submit `https://www.tylerstorage.com/sitemap.xml` in Google Search Console, and update the Google Business Profile website link if needed.

## Files
- `index.html`: the whole site (CSS and JS inline, no build step)
- `_redirects`: 301s from the old WordPress page URLs to the matching sections
- `_headers`: security headers + long caching for images
- `robots.txt`, `sitemap.xml`

## Updating unit prices
Unit cards are plain HTML inside `<div class="units" id="unitGrid">`. Edit the price, the
`data-price` attribute, and the "Only X left" badge. Remove the `data-left` attribute and badge when a size is no longer scarce.
Prices were copied from the U-Haul listing on Nov 23, 2026.
