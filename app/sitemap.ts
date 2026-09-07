import type { MetadataRoute } from 'next';
import { AIRLINES, airlineSlug } from '@/lib/airlines';

const BASE_URL = 'https://sizemybag.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/luggage-guide`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/size-checker`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/airlines`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/how-to-measure-bags`, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const airlineRoutes: MetadataRoute.Sitemap = AIRLINES.map((a) => ({
    url: `${BASE_URL}/airlines/${airlineSlug(a.name)}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...airlineRoutes];
}
