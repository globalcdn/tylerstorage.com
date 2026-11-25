/**
 * East Texas Storage Center: Cloudflare Worker in front of the static site in /public.
 *
 * 1. One home for every domain: requests on any other host name (bare tylerstorage.com,
 *    easttexasstorage.com, storagetyler.com, www. versions) get a 301 to
 *    https://www.tylerstorage.com with the same path, so search engines combine
 *    the ranking of all three domains on one site.
 * 2. Old WordPress URLs 301 to the matching section (or to U-Haul for reservations).
 * 3. *.workers.dev preview addresses still work (so you can check the site before the
 *    domain moves) but are marked noindex so they never compete with the real site.
 */
const CANONICAL_HOST = 'www.tylerstorage.com';
const UHAUL = 'https://www.uhaul.com/Locations/Self-Storage-near-Tyler-TX-75704/1010830/';

const OLD_PATHS = {
  '/climate-controlled-standard-self-storage': '/#climate',
  '/covered-rv-and-boat-facilities': '/#rv',
  '/reservation': '/#units',
  '/contact-us': '/#contact',
  '/dev/reservation': UHAUL,
  '/dev': '/',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const isPreview = host.endsWith('.workers.dev') || host.endsWith('.pages.dev');
    const isLocal = host === 'localhost' || host === '127.0.0.1';

    // 1. Send every other domain to the canonical one
    if (host !== CANONICAL_HOST && !isPreview && !isLocal) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    // 2. Old WordPress page URLs
    const path = url.pathname.replace(/\/+$/, '').toLowerCase();
    if (OLD_PATHS[path]) {
      return Response.redirect(new URL(OLD_PATHS[path], url.origin).toString(), 301);
    }

    // 3. Serve the static site
    const res = await env.ASSETS.fetch(request);
    if (isPreview) {
      const out = new Response(res.body, res);
      out.headers.set('X-Robots-Tag', 'noindex');
      return out;
    }
    return res;
  },
};
