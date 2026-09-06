import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'BaggageChecker – Check Airline Luggage Size Limits Instantly',
  description: 'Check if your luggage meets airline carry-on and checked bag size limits. Compare baggage policies for 100+ airlines worldwide and avoid excess fees.',
  keywords: ['luggage size checker', 'airline baggage sizes', 'carry-on limits', 'checked baggage allowance', 'baggage fees'],
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  alternates: { canonical: 'https://sizemybag.com/' },
  openGraph: {
    type: 'website',
    siteName: 'BaggageChecker',
    url: 'https://sizemybag.com/',
    title: 'BaggageChecker – Check Airline Luggage Size Limits Instantly',
    description: 'Compare baggage policies for 100+ airlines and check your bag before you fly.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BaggageChecker – Airline Luggage Size Limits',
    description: 'Compare baggage policies for 100+ airlines and check your bag before you fly.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'BaggageChecker',
      url: 'https://sizemybag.com/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://sizemybag.com/results?airline={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebApplication',
      name: 'BaggageChecker Luggage Size Checker',
      url: 'https://sizemybag.com/',
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do airlines weigh carry-on luggage?',
          acceptedAnswer: { '@type': 'Answer', text: 'Many do, particularly in Europe and Asia. Budget carriers weigh cabin bags at the gate and charge a fee if you are over the allowance.' },
        },
        {
          '@type': 'Question',
          name: 'Are wheels and handles included in the size?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Published dimensions always include wheels, handles and external pockets, so measure the bag at its widest and tallest points.' },
        },
        {
          '@type': 'Question',
          name: 'What happens if my bag is too big?',
          acceptedAnswer: { '@type': 'Answer', text: 'The bag is usually checked into the hold at the gate for a fee, which is typically higher than paying for hold luggage in advance.' },
        },
        {
          '@type': 'Question',
          name: 'Do carry-on rules differ for international flights?',
          acceptedAnswer: { '@type': 'Answer', text: 'They can. Long-haul flights often allow a slightly larger cabin bag, while regional aircraft may require smaller bags to be gate-checked.' },
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to measure your luggage',
      step: [
        { '@type': 'HowToStep', name: 'Place luggage upright', text: 'Place your luggage upright on a flat surface.' },
        { '@type': 'HowToStep', name: 'Measure height', text: 'Use a tape measure to measure from the ground to the top handle.' },
        { '@type': 'HowToStep', name: 'Measure width', text: 'Measure the width from side to side.' },
        { '@type': 'HowToStep', name: 'Measure depth', text: 'Measure the depth from front to back, including wheels and handles.' },
        { '@type': 'HowToStep', name: 'Compare with limits', text: 'Compare all three measurements to your airline limits.' },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeClient />
    </>
  );
}
