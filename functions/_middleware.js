/**
 * One home for every domain.
 * East Texas Storage Center owns three domains:
 *   - www.tylerstorage.com   (main site, canonical)
 *   - easttexasstorage.com   (forwards here)
 *   - storagetyler.com       (forwards here)
 * Any request that reaches this site on another host name (the bare tylerstorage.com,
 * the www or bare form of easttexasstorage.com / storagetyler.com if they are ever pointed
 * straight at Cloudflare, or the production *.pages.dev address) gets a permanent 301
 * redirect to https://www.tylerstorage.com with the same path and query. That way search
 * engines index one site and the ranking from all three domains is combined on it.
 * Branch preview deployments (<hash>.<project>.pages.dev) and local dev are left alone.
 */
const CANONICAL_HOST = 'www.tylerstorage.com';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  const isLocal = host === 'localhost' || host === '127.0.0.1';
  const isPreview = host.endsWith('.pages.dev') && host.split('.').length > 3;

  if (host !== CANONICAL_HOST && !isLocal && !isPreview) {
    url.protocol = 'https:';
    url.hostname = CANONICAL_HOST;
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
