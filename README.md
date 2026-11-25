# TylerStorage.com: one-page site on Cloudflare Workers

## Deploy (Cloudflare Workers, connected to this GitHub repo)
Every push to `main` builds and deploys automatically (`npx wrangler deploy` reads `wrangler.jsonc`).
Cloudflare build settings: build command empty, deploy command `npx wrangler deploy`, root directory `/`.

- `index.html`, `images/`, `robots.txt`, `sitemap.xml`, `_headers`: the website itself (top level of `main`)
- `src/worker.js`: redirects other domains and old WordPress URLs, then serves the site files
- `wrangler.jsonc`: Worker settings
- `.assetsignore`: keeps README, src/ and config files from being served publicly

To put the site on the real domain: Workers & Pages > tylerstorage > Settings > Domains & Routes > Add > Custom domain,
then add `www.tylerstorage.com` and `tylerstorage.com` (the domain's DNS must be on Cloudflare).

## Forwarding easttexasstorage.com and storagetyler.com
Both domains should send visitors and search engines to **https://www.tylerstorage.com** with a **permanent (301)** redirect.
That tells Google the domains are the same business, so it combines their ranking on one site instead of seeing duplicates.

In GoDaddy (Domain > Forwarding) for each domain:
- Forward to: `https://www.tylerstorage.com`
- Type: **Permanent (301)**. Not "Temporary (302)".
- Settings: **Forward only**. Do NOT use "Forward with masking": masking puts the site in a frame, which hides it from search engines.
- Set it up for both the bare domain and `www.`

Better option, if you can: move those domains' DNS to Cloudflare and add them as custom domains on this Worker. `src/worker.js` then 301-redirects them to www.tylerstorage.com with the
path kept (for example storagetyler.com/contact-us/ goes to www.tylerstorage.com/contact-us/, which the Worker then sends to /#contact).
The same file also redirects the bare tylerstorage.com, and marks the *.workers.dev preview address noindex, so only one copy of the site gets indexed.

After forwarding is live:
- In Google Search Console, verify all three domains. If easttexasstorage.com or storagetyler.com ever had its own pages indexed, use the Change of Address tool to move them to www.tylerstorage.com.
- Keep both domains registered and set to auto-renew. Letting them lapse throws away the redirect.
- Use https://www.tylerstorage.com everywhere you list the business (Google Business Profile, Facebook, U-Haul, directories).


## Updating unit prices
Unit cards are plain HTML inside `<div class="units" id="unitGrid">`. Edit the price, the
`data-price` attribute, and the "Only X left" badge. Remove the `data-left` attribute and badge when a size is no longer scarce.
Prices were copied from the U-Haul listing on Nov 23, 2026.
