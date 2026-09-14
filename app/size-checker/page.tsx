import { SITE_URL } from '@/lib/site';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { SizeCheckerClient } from './SizeCheckerClient';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Luggage Size Checker – Check Your Bag Against Airline Limits',
  description:
    'Free luggage size checker: enter your bag once, pick your airlines, and see whether it passes as carry-on, personal item or checked baggage.',
  keywords: ['luggage size checker', 'compare luggage sizes', 'airline baggage comparison', 'cabin bag size limits', 'suitcase dimensions checker'],
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  alternates: { canonical: `${SITE_URL}/size-checker` },
  openGraph: {
    type: 'website',
    siteName: 'BaggageChecker',
    url: `${SITE_URL}/size-checker`,
    title: 'Luggage Size Checker – Will Your Bag Fit?',
    description: 'Check one suitcase against multiple airline baggage policies side by side.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luggage Size Checker – Will Your Bag Fit?',
    description: 'Check one suitcase against multiple airline baggage policies side by side.',
  },
};

const HOWTO = [
  { n: '1', bg: '#e0edff', color: '#2563eb', title: 'Measure Your Luggage', text: 'Use a measuring tape to get exact dimensions of your suitcase including handles, wheels, and any protrusions.' },
  { n: '2', bg: '#e3f5f2', color: '#0f766e', title: 'Enter Dimensions', text: 'Input your luggage measurements into our size checker above. Switch between metric and imperial units as needed.' },
  { n: '3', bg: '#dcfce7', color: '#15803d', title: 'Get Results', text: 'Instantly see which airlines accept your luggage size and avoid unexpected fees at the airport.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Luggage Size Comparison Tool',
      url: `${SITE_URL}/size-checker`,
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: "Compare a suitcase's dimensions and weight against the carry-on, personal item or checked baggage allowances of multiple airlines.",
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Luggage Size Checker', item: `${SITE_URL}/size-checker` },
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
    <div style={{ width: '100%', background: '#f7f8f9' }}>
      <Header />

      <main id="top" style={{ maxWidth: 1340, margin: '0 auto', padding: '34px 24px 8px' }}>
        <a href="#top" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 600, color: '#0f1c2e', textDecoration: 'none' }}>
          <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M11 6l-6 6 6 6" />
          </svg>
          Back
        </a>
        <h1 style={{ margin: '22px 0 12px', fontSize: 'clamp(26px,3.6vw,34px)', fontWeight: 800, letterSpacing: '-.03em' }}>Luggage Size Checker</h1>
        <p style={{ margin: '0 0 26px', maxWidth: 640, fontSize: 14, lineHeight: 1.75, color: '#57677c' }}>Enter your bag once, pick the airlines you are flying with, and see whether it passes as a carry-on, a personal item or checked baggage.</p>

        {/* The checker reads the query string, which forces it to render in the browser.
            Keeping it inside Suspense lets everything around it stay in the HTML, so a
            crawler still receives the heading and the whole explanation of the page. */}
        <Suspense fallback={<div style={{ minHeight: 520 }} />}>
          <SizeCheckerClient />
        </Suspense>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 0px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 36, alignItems: 'start' }}>
            <div>
              <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(21px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em', lineHeight: 1.22 }}>Why Airlines Have Different Luggage Rules</h2>
              <p style={{ margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.8, color: '#57677c' }}>
                Each airline sets its own baggage restrictions based on aircraft type, business model, and operational efficiency. Low-cost carriers often have stricter size limits to maximize revenue and streamline boarding.
              </p>
              <p style={{ margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.8, color: '#57677c' }}>
                Overhead compartment sizes vary between aircraft models, and airlines must ensure all passengers&apos; bags fit safely. Weight restrictions help manage fuel costs and aircraft balance.
              </p>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.8, color: '#57677c' }}>
                Using our <a href="#checker">luggage size checker</a> before you travel helps you avoid unexpected fees and delays at check-in.
              </p>
            </div>
            <div className="grid-pair" style={{ gap: 14 }}>
              {[
                { color: '#2563eb', title: 'Aircraft Limits', text: 'Overhead space varies by plane model', icon: <path d="M2 13l20-7-7 20-3-8z" /> },
                { color: '#15803d', title: 'Passenger Safety', text: 'Weight limits ensure safe operations', icon: (<><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><path d="M16 6.5a3 3 0 0 1 0 5.6M18 20c0-2.4-1-4.2-2.6-5.2" /></>) },
                { color: '#e0a11a', title: 'Boarding Speed', text: 'Standard sizes speed up the process', icon: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2.2" /></>) },
                { color: '#7c3aed', title: 'Business Model', text: 'Fees help keep base fares low', icon: <path d="M12 3l7 3v5.5c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5V6z" /> },
              ].map((card) => (
                <div key={card.title} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '20px 16px', textAlign: 'center' }}>
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10 }}>
                    {card.icon}
                  </svg>
                  <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 5 }}>{card.title}</div>
                  <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: '#7a8798' }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="types" style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 0px 0' }}>
          <h2 style={{ margin: '0 0 8px', textAlign: 'center', fontSize: 'clamp(21px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em' }}>The Three Baggage Types, Explained</h2>
          <p style={{ margin: '0 0 28px', textAlign: 'center', maxWidth: 620, marginLeft: 'auto', marginRight: 'auto', fontSize: 13, lineHeight: 1.7, color: '#57677c' }}>
            Airlines split what you travel with into three allowances. Each has its own size and weight limit, and the one you exceed decides what you pay.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {[
              {
                tint: '#e7effc',
                iconColor: '#2563eb',
                title: 'Personal item',
                text: 'The small bag that goes under the seat in front of you — handbag, laptop bag or small backpack. Usually free and rarely weighed.',
                icon: (
                  <>
                    <path d="M7 9a5 5 0 0 1 10 0v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
                    <path d="M10 9V7a2 2 0 0 1 4 0v2" />
                  </>
                ),
              },
              {
                tint: '#e3f5f2',
                iconColor: '#0f766e',
                title: 'Carry-on',
                text: 'The wheeled case you take into the cabin and store in the overhead bin. Sized at the gate, and weighed by many airlines.',
                icon: (
                  <>
                    <rect x="5" y="7" width="14" height="14" rx="2.5" />
                    <path d="M9.5 7V4.6A.6.6 0 0 1 10.1 4h3.8a.6.6 0 0 1 .6.6V7" />
                  </>
                ),
              },
              {
                tint: '#fdf1dc',
                iconColor: '#b98107',
                title: 'Checked baggage',
                text: 'The large suitcase you hand over at the desk and collect at your destination. Charged by bag, with strict weight limits.',
                icon: (
                  <>
                    <rect x="4" y="6" width="16" height="15" rx="2.5" />
                    <path d="M9 6V3.6A.6.6 0 0 1 9.6 3h4.8a.6.6 0 0 1 .6.6V6" />
                    <path d="M9.6 11v6M14.4 11v6" />
                  </>
                ),
              },
            ].map((card) => (
              <div key={card.title} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ flex: 'none', display: 'flex', width: 32, height: 32, borderRadius: 9, background: card.tint, alignItems: 'center', justifyContent: 'center' }}>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={card.iconColor} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                      {card.icon}
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 5 }}>{card.title}</div>
                    <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 0px 0' }}>
          <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '26px 28px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h2 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 800, letterSpacing: '-.02em' }}>Looking for the full list of airline limits?</h2>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#57677c' }}>The Luggage Guide reference lists carry-on, personal item and checked baggage limits for every airline we cover, plus airport sizer frames and baggage fees.</p>
            </div>
            <Link
              href="/luggage-guide"
              className="btn-outline"
              style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 10, padding: '12px 18px', fontSize: 13, fontWeight: 700, color: '#0f1c2e', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Browse all airline limits
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </section>

        <section id="howto" style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 0px 0' }}>
          <h2 style={{ margin: '0 0 28px', textAlign: 'center', fontSize: 'clamp(21px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em' }}>How to Use Our Carry-On Size Checker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20 }}>
            {HOWTO.map((h) => (
              <div key={h.n} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '28px 22px', textAlign: 'center' }}>
                <span style={{ display: 'inline-flex', width: 36, height: 36, borderRadius: '50%', alignItems: 'center', justifyContent: 'center', background: h.bg, color: h.color, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>{h.n}</span>
                <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 10 }}>{h.title}</div>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: '#7a8798' }}>{h.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 0px clamp(48px,6vw,72px)' }}>
          <h2 style={{ margin: '0 0 28px', textAlign: 'center', fontSize: 'clamp(21px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em' }}>Pro Tips for Checking Suitcase Size Online</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '26px 26px 28px' }}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 14 }}>
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12.5l2.7 2.5L16 9.5" />
              </svg>
              <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 12 }}>What to Include</div>
              <div style={{ display: 'grid', gap: 9, fontSize: 12.5, color: '#57677c' }}>
                <span>All handles and straps</span>
                <span>Wheels and feet</span>
                <span>External pockets when packed</span>
                <span>Any expandable sections</span>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '26px 26px 28px' }}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e0a11a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 14 }}>
                <path d="M12 4l9 16H3z" />
                <path d="M12 10v4M12 17h.01" />
              </svg>
              <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 12 }}>Common Mistakes</div>
              <div style={{ display: 'grid', gap: 9, fontSize: 12.5, color: '#57677c' }}>
                <span>Measuring empty bags only</span>
                <span>Forgetting about wheels</span>
                <span>Using wrong measurement units</span>
                <span>Not checking weight limits</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer maxWidth={1340} logoSize={32} logoIconSize={15} copyrightSize={13} />
    </div>
    </>
  );
}
