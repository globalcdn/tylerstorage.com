# TylerStorage.com: one-page site for Cloudflare Pages

## Deploy
1. Put the 17 `tylerstorage_*` image files (downloaded from the current site) in the `images` folder.
   Any image that's missing falls back to the original WordPress URL automatically.
2. In Cloudflare: Workers & Pages → Create → Pages → Upload assets (or connect a Git repo). Build command: none. Output directory: `/` (this folder).
3. Add the custom domain `www.tylerstorage.com` (and redirect the bare domain to www).
4. Submit `https://www.tylerstorage.com/sitemap.xml` in Google Search Console, and update the Google Business Profile website link if needed.

## Forwarding easttexasstorage.com and storagetyler.com
Both domains should send visitors and search engines to **https://www.tylerstorage.com** with a **permanent (301)** redirect.
That tells Google the domains are the same business, so it combines their ranking on one site instead of seeing duplicates.

In GoDaddy (Domain > Forwarding) for each domain:
- Forward to: `https://www.tylerstorage.com`
- Type: **Permanent (301)**. Not "Temporary (302)".
- Settings: **Forward only**. Do NOT use "Forward with masking": masking puts the site in a frame, which hides it from search engines.
- Set it up for both the bare domain and `www.`

Better option, if you can: move those domains' DNS to Cloudflare and add them as custom domains on this Pages project
(or use a Cloudflare Redirect Rule). `functions/_middleware.js` then 301-redirects them to www.tylerstorage.com with the
path kept (for example storagetyler.com/contact-us/ goes to www.tylerstorage.com/contact-us/, which `_redirects` then sends to /#contact).
The same file also redirects the bare tylerstorage.com and the project's *.pages.dev address, so only one copy of the site gets indexed.

After forwarding is live:
- In Google Search Console, verify all three domains. If easttexasstorage.com or storagetyler.com ever had its own pages indexed, use the Change of Address tool to move them to www.tylerstorage.com.
- Keep both domains registered and set to auto-renew. Letting them lapse throws away the redirect.
- Use https://www.tylerstorage.com everywhere you list the business (Google Business Profile, Facebook, U-Haul, directories).

## Files
- `index.html`: the whole site (CSS and JS inline, no build step)
- `functions/_middleware.js`: 301s every other host name (other domains, bare domain, pages.dev) to www.tylerstorage.com
- `_redirects`: 301s from the old WordPress page URLs to the matching sections
- `_headers`: security headers + long caching for images
- `robots.txt`, `sitemap.xml`

## Updating unit prices
Unit cards are plain HTML inside `<div class="units" id="unitGrid">`. Edit the price, the
`data-price` attribute, and the "Only X left" badge. Remove the `data-left` attribute and badge when a size is no longer scarce.
Prices were copied from the U-Haul listing on Nov 23, 2026.
