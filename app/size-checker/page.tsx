import type { Metadata } from 'next';
import { SizeCheckerClient } from './SizeCheckerClient';

export const metadata: Metadata = {
  title: 'Luggage Size Checker – Check Your Bag Against Airline Limits',
  description:
    'Free luggage size checker: enter width, height, depth and weight to see instantly whether your suitcase fits carry-on limits for Ryanair, easyJet, Wizz Air, British Airways and Lufthansa.',
  keywords: ['luggage size checker', 'carry-on size checker', 'suitcase size online', 'cabin bag dimensions', 'hand luggage limits'],
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  alternates: { canonical: 'https://sizemybag.com/size-checker' },
  openGraph: {
    type: 'website',
    siteName: 'BaggageChecker',
    url: 'https://sizemybag.com/size-checker',
    title: 'Luggage Size Checker – Check Your Bag Against Airline Limits',
    description: 'Enter your suitcase dimensions and instantly compare them with the carry-on rules of major airlines. Free, no sign-up.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luggage Size Checker – See if Your Bag Fits',
    description: 'Compare your cabin bag with airline size limits and avoid gate fees.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Luggage Size Checker',
      url: 'https://sizemybag.com/size-checker',
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool that compares your suitcase dimensions and weight with airline carry-on allowances.',
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
