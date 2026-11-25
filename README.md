# TylerStorage.com: one-page site on Cloudflare Workers

## Deploy (static files on a Cloudflare Worker)
This is a plain static site: no build step and no Worker code. Cloudflare serves the files as they are.

**Connected to GitHub:** every push to `main` deploys automatically. Build command empty, deploy command `npx wrangler deploy`.
`wrangler.jsonc` only tells Cloudflare to serve this folder; its `name` must match the Worker's name in the dashboard.

**Uploading by hand instead:** upload only these files and folders:
`index.html`, `404.html`, `images/`, `robots.txt`, `sitemap.xml`, `_headers`, `_redirects`

- `_redirects`: old WordPress URLs to the matching sections, and /dev/reservation to U-Haul
- `_headers`: security headers and image caching
- `404.html`: friendly "page not found" page
- `.assetsignore`: keeps README and config files off the website

To put the site on the real domain: Workers & Pages > your Worker > Settings > Domains & Routes > Add > Custom domain,
then add `www.tylerstorage.com` and `tylerstorage.com` (the domain's DNS must be on Cloudflare).

**Other domains:** static files can't redirect by domain name, so forward easttexasstorage.com, storagetyler.com
and the bare tylerstorage.com with a 301 at GoDaddy (see below), or with a Cloudflare Redirect Rule if their DNS is on Cloudflare.

## Forwarding easttexasstorage.com and storagetyler.com
Both domains should send visitors and search engines to **https://www.tylerstorage.com** with a **permanent (301)** redirect.
That tells Google the domains are the same business, so it combines their ranking on one site instead of seeing duplicates.

In GoDaddy (Domain > Forwarding) for each domain:
- Forward to: `https://www.tylerstorage.com`
- Type: **Permanent (301)**. Not "Temporary (302)".
- Settings: **Forward only**. Do NOT use "Forward with masking": masking puts the site in a frame, which hides it from search engines.
- Set it up for both the bare domain and `www.`

Better option, if you can: move those domains' DNS to Cloudflare and create a Redirect Rule (Rules > Redirect Rules) that sends any request on
easttexasstorage.com, storagetyler.com or bare tylerstorage.com to `https://www.tylerstorage.com` + the same path, status 301, preserving the query string.

After forwarding is live:
- In Google Search Console, verify all three domains. If easttexasstorage.com or storagetyler.com ever had its own pages indexed, use the Change of Address tool to move them to www.tylerstorage.com.
- Keep both domains registered and set to auto-renew. Letting them lapse throws away the redirect.
- Use https://www.tylerstorage.com everywhere you list the business (Google Business Profile, Facebook, U-Haul, directories).


## Updating unit prices
Unit cards are plain HTML inside `<div class="units" id="unitGrid">`. Edit the price, the
`data-price` attribute, and the "Only X left" badge. Remove the `data-left` attribute and badge when a size is no longer scarce.
Prices were copied from the U-Haul listing on Nov 23, 2026.
