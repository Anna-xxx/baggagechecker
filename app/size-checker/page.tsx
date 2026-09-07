import type { Metadata } from 'next';
import { SizeCheckerClient } from './SizeCheckerClient';

export const metadata: Metadata = {
  title: 'Luggage Size Checker – Check Your Bag Against Airline Limits',
  description:
    'Free luggage size checker: enter your bag width, height, depth and weight, pick your airlines and see instantly whether it fits carry-on, personal item or checked baggage limits.',
  keywords: ['luggage size checker', 'compare luggage sizes', 'airline baggage comparison', 'cabin bag size limits', 'suitcase dimensions checker'],
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  alternates: { canonical: 'https://sizemybag.com/size-checker' },
  openGraph: {
    type: 'website',
    siteName: 'BaggageChecker',
    url: 'https://sizemybag.com/size-checker',
    title: 'Luggage Size Checker – Will Your Bag Fit?',
    description: 'Check one suitcase against multiple airline baggage policies side by side.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luggage Size Checker – Will Your Bag Fit?',
    description: 'Check one suitcase against multiple airline baggage policies side by side.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Luggage Size Comparison Tool',
      url: 'https://sizemybag.com/size-checker',
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: "Compare a suitcase's dimensions and weight against the carry-on, personal item or checked baggage allowances of multiple airlines.",
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sizemybag.com/' },
        { '@type': 'ListItem', position: 2, name: 'Luggage Size Checker', item: 'https://sizemybag.com/size-checker' },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to use our carry-on size checker',
      step: [
        { '@type': 'HowToStep', name: 'Measure your luggage', text: 'Use a measuring tape to get exact dimensions of your suitcase including handles, wheels, and any protrusions.' },
        { '@type': 'HowToStep', name: 'Enter dimensions', text: 'Input your luggage measurements into the size checker tool and switch between metric and imperial units as needed.' },
        { '@type': 'HowToStep', name: 'Get results', text: 'Instantly see which airlines accept your luggage size and avoid unexpected fees at the airport.' },
      ],
    },
  ],
};

export default function SizeCheckerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SizeCheckerClient />
    </>
  );
}
