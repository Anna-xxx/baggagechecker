import type { Metadata } from 'next';
import { HowToMeasureClient } from './HowToMeasureClient';

export const metadata: Metadata = {
  title: 'How to Measure Bag Dimensions: Complete Guide | BaggageChecker',
  description: 'Learn how to measure your luggage dimensions accurately at home. Step-by-step guide to length, width, height and weight so your bag meets airline carry-on requirements.',
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  alternates: { canonical: 'https://sizemybag.com/how-to-measure-bags' },
  openGraph: {
    type: 'article',
    siteName: 'BaggageChecker',
    title: 'How to Measure Bag Dimensions: Complete Guide',
    description: 'Measure length, width, height and weight correctly and avoid unexpected baggage fees.',
  },
  twitter: { card: 'summary_large_image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      name: 'How to measure bag dimensions',
      step: [
        { '@type': 'HowToStep', name: 'Measure Length (Longest Side)', text: 'Place your suitcase on a flat surface. Identify the longest side of your luggage and measure from end to end using your measuring tape.' },
        { '@type': 'HowToStep', name: 'Measure Width', text: 'Turn your luggage to face you and measure from one side to the other at the widest point.' },
        { '@type': 'HowToStep', name: 'Measure Height (Depth)', text: 'Measure from the bottom including wheels to the top including the handle when fully extended.' },
        { '@type': 'HowToStep', name: 'Weigh Your Luggage', text: 'Weigh yourself on a bathroom scale, then weigh yourself holding the luggage and subtract your weight.' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sizemybag.com/' },
        { '@type': 'ListItem', position: 2, name: 'How to Measure Bags', item: 'https://sizemybag.com/how-to-measure-bags' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What units should I use to measure my luggage?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most international airlines use centimeters and kilograms. US airlines may use inches and pounds.' },
        },
        {
          '@type': 'Question',
          name: 'Do I include wheels and handles in my measurements?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, always include wheels, handles when extended, and any external pockets.' },
        },
        {
          '@type': 'Question',
          name: 'How accurate do my measurements need to be?',
          acceptedAnswer: { '@type': 'Answer', text: 'Be as accurate as possible and round up to the nearest centimeter.' },
        },
        {
          '@type': 'Question',
          name: 'What if my soft-sided luggage can expand?',
          acceptedAnswer: { '@type': 'Answer', text: 'Measure soft-sided luggage when it is fully packed to its maximum capacity.' },
        },
      ],
    },
  ],
};

export default function HowToMeasureBagsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HowToMeasureClient />
    </>
  );
}
