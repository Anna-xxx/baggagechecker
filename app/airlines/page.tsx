import { SITE_URL } from '@/lib/site';
import type { Metadata } from 'next';
import { AirlinesClient } from './AirlinesClient';

export const metadata: Metadata = {
  title: 'Airline Baggage Policies & Size Limits | BaggageChecker',
  description: 'Directory of airline carry-on and checked baggage policies. Compare size limits, weight restrictions and baggage fees for airlines worldwide.',
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  alternates: { canonical: `${SITE_URL}/airlines` },
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
      url: `${SITE_URL}/airlines`,
      description: 'Directory of airline carry-on and checked baggage policies.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Airlines', item: `${SITE_URL}/airlines` },
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
