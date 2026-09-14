import { SITE_URL } from '@/lib/site';
import type { MetadataRoute } from 'next';

// Written once at build time rather than answered per request, because the site
// is exported as plain files and there is no server left to generate it.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
