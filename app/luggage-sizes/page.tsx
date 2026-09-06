import type { Metadata } from 'next';
import { LuggageSizesClient } from './LuggageSizesClient';

export const metadata: Metadata = {
  title: 'Compare Luggage Sizes Across Airlines | BaggageChecker',
  description:
    'Compare your suitcase against several airlines at once. Enter width, height, depth and weight and see which cabin baggage allowances your bag fits.',
  keywords: ['compare luggage sizes', 'airline baggage comparison', 'cabin bag size limits', 'suitcase dimensions checker'],
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  alternates: { canonical: 'https://sizemybag.com/luggage-sizes' },
  openGraph: {
    type: 'website',
    siteName: 'BaggageChecker',
    url: 'https://sizemybag.com/luggage-sizes',
    title: 'Compare Luggage Sizes Across Airlines',
    description: 'Check one suitcase against multiple airline baggage policies side by side.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Luggage Sizes Across Airlines',
    description: 'Check one suitcase against multiple airline baggage policies side by side.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Luggage Size Comparison Tool',
      url: 'https://sizemybag.com/luggage-sizes',
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: "Compare a suitcase's dimensions and weight against the cabin baggage allowances of multiple airlines.",
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sizemybag.com/' },
        { '@type': 'ListItem', position: 2, name: 'Luggage Sizes', item: 'https://sizemybag.com/luggage-sizes' },
      ],
    },
  ],
};

export default function LuggageSizesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LuggageSizesClient />
    </>
  );
}
