import { SITE_URL } from '@/lib/site';
import type { MetadataRoute } from 'next';
import { AIRLINES, airlineSlug } from '@/lib/airlines';

// Same reason as robots.ts: emitted as a file during the build, not on demand.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/luggage-guide`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/size-checker`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/airlines`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/how-to-measure-bags`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const airlineRoutes: MetadataRoute.Sitemap = AIRLINES.map((a) => ({
    url: `${SITE_URL}/airlines/${airlineSlug(a.name)}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...airlineRoutes];
}
