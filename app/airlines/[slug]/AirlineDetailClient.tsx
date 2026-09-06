'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirlineLogo } from '@/components/AirlineLogo';
import { TYPICAL_CHECKED, type Airline } from '@/lib/airlines';

type Tab = 'cabin' | 'checked';

export function AirlineDetailClient({ airline }: { airline: Airline }) {
  const [tab, setTab] = useState<Tab>('cabin');
  const [metric, setMetric] = useState(true);
  const [fav, setFav] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const isCabin = tab === 'cabin';
  const set = isCabin ? { w: airline.cabin[0], h: airline.cabin[1], d: airline.cabin[2], kg: airline.cabinKg } : TYPICAL_CHECKED;

  const len = (v: number) => (metric ? `${v} cm` : `${Math.round(v / 2.54)} in`);
  const kg = (v: number) => (metric ? `${v} kg` : `${Math.round(v * 2.205)} lb`);
  const total = set.w + set.h + set.d;

  const rows = [
    { label: 'Max width', value: len(set.w) },
    { label: 'Max height', value: len(set.h) },
    { label: 'Max depth', value: len(set.d) },
    { label: 'Total dimensions', value: len(total) },
  ];

  const faqs = [
    {
      question: `Does ${airline.name} allow free cabin baggage?`,
      answer: `Yes, ${airline.name} typically allows free carry-on baggage within their specified size and weight limits. Check the dimensions above to ensure your bag complies with ${airline.name} regulations.`,
    },
    {
      question: `What happens if my bag doesn't fit ${airline.name}'s sizer?`,
      answer: `If your bag doesn't fit in ${airline.name}'s sizing frame at the airport, you'll need to check it as hold luggage, which may incur additional fees depending on your ticket type and baggage allowance.`,
    },
    {
      question: `Can I bring a personal item in addition to my ${airline.name} carry-on?`,
      answer: `Most ${airline.name} fare types allow a small personal item (like a handbag or laptop bag) in addition to your main carry-on. Check your specific ticket conditions for personal item size limits and restrictions.`,
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Header />

      <main id="top" style={{ maxWidth: 1160, margin: '0 auto', padding: '28px 24px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#8494a8', marginBottom: 22 }}>
          <Link href="/" style={{ color: '#8494a8' }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/airlines" style={{ color: '#8494a8' }}>
            Airlines
          </Link>
          <span>/</span>
          <span style={{ color: '#0f1c2e', fontWeight: 700 }}>{airline.name}</span>
        </div>

        <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(24px,3.4vw,32px)', fontWeight: 800, letterSpacing: '-.03em' }}>{airline.name} Baggage Size &amp; Weight Limits</h1>
        <p style={{ margin: '0 0 26px', maxWidth: 820, fontSize: 14, lineHeight: 1.75, color: '#57677c' }}>
          This page lets you check your luggage against {airline.name} cabin and checked bag size rules. Enter your bag dimensions in the size checker to instantly see if it fits within {airline.name} baggage
          allowances and avoid extra fees at the airport.
        </p>

        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginBottom: 18 }}>
          <AirlineLogo code={airline.code} website={airline.website} width={64} height={64} radius={12} fontSize={13} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.025em' }}>{airline.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 5, fontSize: 12.5, color: '#8494a8' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 13l20-7-7 20-3-8z" />
                </svg>
                {airline.code}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
                  <circle cx="12" cy="11" r="2.2" />
                </svg>
                {airline.country}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => setMetric((m) => !m)}
              className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 10, padding: '9px 14px', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, color: '#0f1c2e', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.1} strokeLinecap="round">
                <path d="M4 8h14l-3-3M20 16H6l3 3" />
              </svg>
              {metric ? 'cm / kg' : 'in / lb'}
            </button>
            <button
              onClick={() => setFav((f) => !f)}
              className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 10, padding: '9px 14px', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, color: '#0f1c2e', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill={fav ? '#ef6a5a' : 'none'} stroke={fav ? '#ef6a5a' : '#8494a8'} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20z" />
              </svg>
              {fav ? 'Saved' : 'Add to Favorites'}
            </button>
            <a
              href={airline.website}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fbbf47', color: '#3a2a05', borderRadius: 10, padding: '10px 16px', fontSize: 12.5, fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Visit Website
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3a2a05" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4h6v6" />
                <path d="M20 4l-9 9" />
                <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
              </svg>
            </a>
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, overflow: 'hidden', marginBottom: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', borderBottom: '1px solid #edf0f3' }}>
            <button
              onClick={() => setTab('cabin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 9,
                border: 'none',
                borderBottom: `2px solid ${isCabin ? '#0d9488' : 'transparent'}`,
                background: isCabin ? '#fff' : '#f8fafc',
                color: isCabin ? '#0f1c2e' : '#8494a8',
                padding: 16,
                fontFamily: 'inherit',
                fontSize: 13.5,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="7" width="14" height="14" rx="2.5" />
                <path d="M9.5 7V4.6A.6.6 0 0 1 10.1 4h3.8a.6.6 0 0 1 .6.6V7" />
              </svg>
              Carry-on Baggage
            </button>
            <button
              onClick={() => setTab('checked')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 9,
                border: 'none',
                borderBottom: `2px solid ${!isCabin ? '#0d9488' : 'transparent'}`,
                background: !isCabin ? '#fff' : '#f8fafc',
                color: !isCabin ? '#0f1c2e' : '#8494a8',
                padding: 16,
                fontFamily: 'inherit',
                fontSize: 13.5,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="6" width="16" height="15" rx="2.5" />
                <path d="M9 6V3.6A.6.6 0 0 1 9.6 3h4.8a.6.6 0 0 1 .6.6V6" />
                <path d="M9.6 11v6M14.4 11v6" />
              </svg>
              Checked Baggage
            </button>
          </div>

          <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 22 }}>
            <div>
              <h2 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 800, letterSpacing: '-.01em' }}>{isCabin ? 'Carry-on Dimensions' : 'Checked Baggage Dimensions'}</h2>
              <div style={{ background: '#f8fafc', borderRadius: 11, padding: '6px 16px' }}>
                {rows.map((r) => (
                  <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '13px 0', borderBottom: '1px solid #eef2f6' }}>
                    <span style={{ fontSize: 13, color: '#57677c' }}>{r.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 800, letterSpacing: '-.01em' }}>{isCabin ? 'Carry-on Weight' : 'Checked Baggage Weight'}</h2>
              <div style={{ background: '#f8fafc', borderRadius: 11, padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e0a11a" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v16M6 20h12" />
                    <path d="M4 9h16l-3 5H7z" />
                  </svg>
                  <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.025em', whiteSpace: 'nowrap' }}>{kg(set.kg)}</span>
                </div>
                {isCabin && <p style={{ margin: '14px 0 0', fontSize: 12.5, color: '#7a8798' }}>Standard carry-on allowance</p>}
              </div>
            </div>
          </div>

          {!isCabin && (
            <div style={{ margin: '0 24px 24px', background: '#f8fafc', borderRadius: 11, padding: '20px 22px' }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 12 }}>Important Notes</div>
              <div style={{ display: 'grid', gap: 9, fontSize: 12.5, color: '#57677c', lineHeight: 1.6 }}>
                <span>Figures above are typical industry-standard allowances, not {airline.name}-specific — checked baggage rules vary by route and fare class.</span>
                <span>Special items may require additional fees or handling.</span>
                <span>Pre-booking checked baggage online is usually cheaper than at the airport.</span>
                <span>Always check {airline.name}&apos;s website for the most up-to-date information.</span>
              </div>
            </div>
          )}
        </section>

        <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 0 56px' }}>
          <h2 style={{ margin: '0 0 22px', textAlign: 'center', fontSize: 22, fontWeight: 800, letterSpacing: '-.025em' }}>Frequently Asked Questions</h2>
          {faqs.map((q, i) => {
            const open = openFaq === i;
            return (
              <div key={q.question} style={{ borderBottom: '1px solid #edf0f3' }}>
                <button
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', padding: '16px 4px', textAlign: 'left', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: '#0f1c2e', cursor: 'pointer' }}
                >
                  <span style={{ flex: 1 }}>{q.question}</span>
                  <span style={{ flex: 'none', color: '#a9b4c2', fontSize: 15 }}>{open ? '−' : '+'}</span>
                </button>
                {open && <p style={{ margin: 0, padding: '0 4px 18px', fontSize: 13, lineHeight: 1.7, color: '#57677c' }}>{q.answer}</p>}
              </div>
            );
          })}
        </section>
      </main>

      <Footer maxWidth={1200} gap={32} logoSize={26} logoIconSize={15} copyrightSize={11} />
    </div>
  );
}
