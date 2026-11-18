// @ts-check
import { defineConfig } from 'astro/config';

/** @type {Record<string, string | undefined>} */
const env = /** @type {{ process?: { env?: Record<string, string | undefined> } }} */ (globalThis).process?.env ?? {};

// Prefer an explicit public URL. On Render or Vercel, a host URL may be available at build time.
// Do not hardcode a fake domain (e.g. example.com) into canonical / Open Graph tags.
const site =
  env.PUBLIC_SITE_URL ||
  env.RENDER_EXTERNAL_URL ||
  (env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_URL
      ? `https://${env.VERCEL_URL}`
      : undefined);

export default defineConfig({
  site,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
});
