import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AIRLINES, airlineSlug, findAirlineBySlug } from '@/lib/airlines';
import { AirlineDetailClient } from './AirlineDetailClient';

export function generateStaticParams() {
  return AIRLINES.map((a) => ({ slug: airlineSlug(a.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const airline = findAirlineBySlug(slug);
  if (!airline) return {};

  const title = `${airline.name} Baggage Size & Weight Limits | BaggageChecker`;
  const description = `${airline.name} carry-on and checked baggage limits: maximum width, height, depth, total dimensions and weight allowances. Check your bag before you fly.`;
  const url = `https://sizemybag.com/airlines/${slug}`;

  return {
    title,
    description,
    robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      siteName: 'BaggageChecker',
      url,
      title,
      description: `Carry-on and checked baggage allowances for ${airline.name}, with dimensions and weight limits.`,
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function AirlineDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const airline = findAirlineBySlug(slug);
  if (!airline) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Airline', name: airline.name, iataCode: airline.code, url: airline.website },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sizemybag.com/' },
          { '@type': 'ListItem', position: 2, name: 'Airlines', item: 'https://sizemybag.com/airlines' },
          { '@type': 'ListItem', position: 3, name: airline.name, item: `https://sizemybag.com/airlines/${slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Does ${airline.name} allow free cabin baggage?`,
            acceptedAnswer: { '@type': 'Answer', text: `Yes, ${airline.name} typically allows free carry-on baggage within their specified size and weight limits.` },
          },
          {
            '@type': 'Question',
            name: `What happens if my bag doesn't fit ${airline.name}'s sizer?`,
            acceptedAnswer: { '@type': 'Answer', text: `You'll need to check it as hold luggage, which may incur additional fees depending on your ticket type and baggage allowance.` },
          },
          {
            '@type': 'Question',
            name: `Can I bring a personal item in addition to my ${airline.name} carry-on?`,
            acceptedAnswer: { '@type': 'Answer', text: `Most ${airline.name} fare types allow a small personal item such as a handbag or laptop bag in addition to the main carry-on.` },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AirlineDetailClient airline={airline} />
    </>
  );
}
