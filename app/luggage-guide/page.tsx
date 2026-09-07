import type { Metadata } from 'next';
import { LuggageGuideClient } from './LuggageGuideClient';

export const metadata: Metadata = {
  title: 'Luggage Guide: Cabin, Medium & Large Bag Sizes | BaggageChecker',
  description: 'Standard luggage sizes explained: cabin, medium and large suitcase dimensions in cm and inches, airline carry-on limits, airport sizer frames and excess baggage fees.',
  keywords: ['luggage sizes', 'suitcase dimensions', 'cabin bag size', 'medium suitcase', 'large suitcase', 'airline carry-on limits'],
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  alternates: { canonical: 'https://sizemybag.com/luggage-guide' },
  openGraph: {
    type: 'website',
    siteName: 'BaggageChecker',
    url: 'https://sizemybag.com/luggage-guide',
    title: 'Luggage Sizes: Cabin, Medium & Large Bag Dimensions',
    description: 'Standard suitcase sizes, airline limits, sizer frames and baggage fees in one reference.',
  },
  twitter: { card: 'summary_large_image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Luggage Guide',
      url: 'https://sizemybag.com/luggage-guide',
      description: 'Reference of standard luggage sizes and airline baggage limits.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sizemybag.com/' },
        { '@type': 'ListItem', position: 2, name: 'Luggage Guide', item: 'https://sizemybag.com/luggage-guide' },
      ],
    },
  ],
};

export default function LuggageGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LuggageGuideClient />
    </>
  );
}
