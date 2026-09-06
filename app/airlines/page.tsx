import type { Metadata } from 'next';
import { AirlinesClient } from './AirlinesClient';

export const metadata: Metadata = {
  title: 'Airline Baggage Policies & Size Limits | BaggageChecker',
  description: 'Directory of airline carry-on and checked baggage policies. Compare size limits, weight restrictions and baggage fees for airlines worldwide.',
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  alternates: { canonical: 'https://sizemybag.com/airlines' },
  openGraph: {
    type: 'website',
    siteName: 'BaggageChecker',
    title: 'Airline Baggage Policies & Size Limits',
    description: 'Carry-on and checked baggage limits for airlines worldwide, in one directory.',
  },
  twitter: { card: 'summary_large_image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Airline Baggage Policies & Size Limits',
      url: 'https://sizemybag.com/airlines',
      description: 'Directory of airline carry-on and checked baggage policies.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sizemybag.com/' },
        { '@type': 'ListItem', position: 2, name: 'Airlines', item: 'https://sizemybag.com/airlines' },
      ],
    },
  ],
};

export default function AirlinesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AirlinesClient />
    </>
  );
}
