'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BagDiagram, type BagType } from '@/components/BagDiagram';
import { DimensionIcon, type DimensionAxis } from '@/components/DimensionIcon';
import { BagTypeIcon } from '@/components/BagTypeIcon';
import { AIRLINES, DEFAULT_BAG, BAGGAGE_RULES_REVIEW_DATE } from '@/lib/airlines';

const TYPE_TABS: { key: BagType; title: string }[] = [
  { key: 'personal', title: 'Personal Item' },
  { key: 'carryon', title: 'Carry-on' },
  { key: 'checked', title: 'Checked Bag' },
];

const HERO_TITLE: Record<BagType, string> = {
  personal: 'Enter Your Personal Item Dimensions',
  carryon: 'Enter Your Carry-on Dimensions',
  checked: 'Enter Your Checked Bag Dimensions',
};

const STEPS = [
  'Place your luggage upright on a flat surface.',
  'Use a tape measure to measure from the ground to the top handle (height).',
  'Measure the width from side to side.',
  'Measure the depth from front to back, including wheels and handles.',
  'Compare all three measurements to your airline limits.',
];

// What the left of the hero promises, opposite the input card. Each line is a claim
// the site actually keeps, so none of them can be padded out without changing the product.
const HERO_POINTS = [
  'Limits taken from each carrier’s own published policy',
  'Route, fare and aircraft variants shown separately, not averaged',
  'Free, no account, nothing to install',
];

const WHAT_WE_CHECK = [
  { title: 'Personal item', text: 'The small bag that goes under the seat in front of you — almost always free, and rarely weighed.' },
  { title: 'Carry-on', text: 'The wheeled case stowed in the overhead bin — the allowance airlines enforce most strictly, and where budget carriers differ most.' },
  { title: 'Checked', text: 'The suitcase you hand over at check-in — sized and weighed against the allowance included with your fare.' },
];

const NAV_CARDS = [
  { href: '/size-checker', bg: '#e3f5f2', color: '#0d9488', title: 'Size Checker', text: 'Check if your luggage meets airline requirements in a few seconds.', icon: (<><path d="M3 9h18v6H3z" /><path d="M7 9v3M12 9v3M17 9v3" /></>) },
  { href: '/airlines', bg: '#fdecec', color: '#dc4c4c', title: 'Airline Directory', text: 'Browse the full directory of airlines and their luggage policies.', icon: <path d="M2 13l20-7-7 20-3-8z" /> },
  { href: '/luggage-guide', bg: '#fdf1dc', color: '#e08c0b', title: 'Luggage Guide', text: 'Standard suitcase sizes, how bags are measured, and what fees cost.', icon: (<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>) },
];

const FAQS = [
  { question: 'Do airlines weigh carry-on luggage?', answer: 'Many do, particularly in Europe and Asia. Budget carriers weigh cabin bags at the gate and charge a fee if you are over the allowance.' },
  { question: 'Are wheels and handles included in the size?', answer: 'Yes. Published dimensions always include wheels, handles and external pockets, so measure the bag at its widest and tallest points.' },
  { question: 'What happens if my bag is too big?', answer: 'The bag is usually checked into the hold at the gate for a fee, which is typically higher than paying for hold luggage in advance.' },
  { question: 'Do carry-on rules differ for international flights?', answer: 'They can. Long-haul flights often allow a slightly larger cabin bag, while regional aircraft may require smaller bags to be gate-checked.' },
];

export function HomeClient() {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [type, setType] = useState<BagType>('carryon');
  const [width, setWidth] = useState(DEFAULT_BAG.w);
  const [height, setHeight] = useState(DEFAULT_BAG.h);
  const [depth, setDepth] = useState(DEFAULT_BAG.d);
  const [weightKg, setWeightKg] = useState(DEFAULT_BAG.kg);
  const [openFaq, setOpenFaq] = useState(-1);

  const conv = (v: number) => (unit === 'cm' ? v : Math.round(v / 2.54));

  const dims: { label: string; axis: DimensionAxis; min: number; max: number; value: number; display: string; onChange: (v: number) => void }[] = [
    { label: 'Width', axis: 'width', min: 10, max: 90, value: width, display: `${conv(width)} ${unit}`, onChange: setWidth },
    { label: 'Height', axis: 'height', min: 10, max: 100, value: height, display: `${conv(height)} ${unit}`, onChange: setHeight },
    { label: 'Depth', axis: 'depth', min: 5, max: 60, value: depth, display: `${conv(depth)} ${unit}`, onChange: setDepth },
    { label: 'Weight', axis: 'weight', min: 1, max: 32, value: weightKg, display: `${weightKg} kg`, onChange: setWeightKg },
  ];

  // Values in the handoff URL are always metric integers; `unit` and `type` only set the
  // checker's own toggles. The checker itself owns every fits/too-large decision from here.
  const sizeCheckerHref = `/size-checker?w=${width}&h=${height}&d=${depth}&kg=${weightKg}&unit=${unit === 'cm' ? 'metric' : 'in'}&type=${type}`;


  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <Header />

      <section id="home" style={{ background: '#f7f8f9', padding: '56px 24px 64px' }}>
        <div className="grid-split" style={{ maxWidth: 1200, margin: '0 auto', alignItems: 'start' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#e3f5f2', color: '#0f766e', border: '1px solid #c6ebe5', borderRadius: 999, padding: '6px 12px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf47' }} /> {AIRLINES.length} airlines · reviewed {BAGGAGE_RULES_REVIEW_DATE}
            </span>
            <h1 style={{ margin: '18px 0 14px', fontSize: 48, lineHeight: 1.08, fontWeight: 800, letterSpacing: '-.03em', maxWidth: '11ch' }}>Will your bag fit?</h1>
            <p style={{ margin: '0 0 24px', fontSize: 16, lineHeight: 1.6, color: '#57677c', maxWidth: '48ch' }}>
              Set your bag&apos;s width, height, depth and weight, then check it against every airline we cover — personal item, carry-on and checked baggage.
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 13, maxWidth: '48ch' }}>
              {HERO_POINTS.map((point) => (
                <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 14, lineHeight: 1.55, color: '#3d4759' }}>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 2 }}>
                    <path d="M4 12.5l5.5 5.5L20 6.5" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, letterSpacing: '-.01em' }}>{HERO_TITLE[type]}</h2>
                <button
                  onClick={() => setUnit((u) => (u === 'cm' ? 'in' : 'cm'))}
                  className="btn-outline"
                  style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 8, padding: '5px 9px', fontSize: 11, fontWeight: 700, color: '#57677c', fontFamily: 'inherit', cursor: 'pointer' }}
                >
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.2} strokeLinecap="round">
                    <path d="M4 8h14l-3-3M20 16H6l3 3" />
                  </svg>{' '}
                  {unit}
                </button>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {TYPE_TABS.map((t) => {
                  const on = type === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setType(t.key)}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, border: `1px solid ${on ? '#14b8a6' : '#e4eaf1'}`, background: on ? '#f4faf9' : '#fff', borderRadius: 10, padding: '10px 6px', fontFamily: 'inherit', cursor: 'pointer' }}
                    >
                      <BagTypeIcon type={t.key} size={26} />
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: on ? '#0f766e' : '#57677c', textAlign: 'center' }}>{t.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="range-compact" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginBottom: 18 }}>
                {dims.map((d) => (
                  <div key={d.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: '#0f1c2e' }}>
                        <DimensionIcon axis={d.axis} size={14} />
                        {d.label}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#7a8798' }}>{d.display}</span>
                    </div>
                    <input type="range" min={d.min} max={d.max} value={d.value} onChange={(e) => d.onChange(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 14, background: '#f8fafc', borderRadius: 12, padding: '20px 16px 16px' }}>
                <BagDiagram
                  type={type}
                  w={width}
                  h={height}
                  d={depth}
                  widthLabel={`${conv(width)} ${unit}`}
                  heightLabel={`${conv(height)} ${unit}`}
                  depthLabel={`${conv(depth)} ${unit}`}
                  minHeight={210}
                />
              </div>
              {/* Echoes the input rather than judging it — Home never decides whether a bag fits. */}
              <p style={{ margin: '0 0 16px', fontSize: 12.5, fontWeight: 700, color: '#57677c', textAlign: 'center' }}>
                {conv(width)} × {conv(height)} × {conv(depth)} {unit} · {weightKg} kg
              </p>

              <Link
                href={sizeCheckerHref}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 13, background: '#fbbf47', color: '#3a2a05', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 800, textDecoration: 'none' }}
              >
                Check against {AIRLINES.length} airlines
                <span aria-hidden="true" style={{ marginLeft: 8 }}>→</span>
              </Link>
              {/* Says what the button does before it is pressed: nothing is judged here. */}
              <p style={{ margin: '12px 0 0', fontSize: 11.5, color: '#8494a8', textAlign: 'center' }}>
                Opens the size checker with these measurements filled in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '48px 24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ border: '1px solid #edf0f3', borderRadius: 14, padding: 26 }}>
            <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 800, letterSpacing: '-.01em' }}>What we check</h2>
              <p style={{ margin: '0 0 18px', fontSize: 12.5, color: '#8494a8' }}>Every airline allowance splits into three, checked in this order:</p>
              <div style={{ display: 'grid', gap: 14 }}>
                {WHAT_WE_CHECK.map((w, i) => (
                  <div key={w.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ flex: 'none', display: 'flex', width: 24, height: 24, borderRadius: '50%', background: '#e3f5f2', color: '#0f766e', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{i + 1}</span>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 3 }}>{w.title}</div>
                      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: '#7a8798' }}>{w.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ margin: '18px 0 0', paddingTop: 16, borderTop: '1px solid #f0f2f5', fontSize: 11.5, lineHeight: 1.6, color: '#8494a8' }}>
                Standard published limits for economy tickets, reviewed {BAGGAGE_RULES_REVIEW_DATE}. Fare type, route and aircraft can change the allowance — the checker shows those variants per airline.
              </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 24px', background: '#fff' }}>
        <div className="grid-trio" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {NAV_CARDS.map((card) => (
            <Link key={card.title} href={card.href} className="card-hover" style={{ display: 'block', border: '1px solid #edf0f3', borderRadius: 14, padding: 22, textDecoration: 'none', color: 'inherit' }}>
              <span style={{ display: 'flex', width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', background: card.bg, marginBottom: 20 }}>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  {card.icon}
                </svg>
              </span>
              <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 7 }}>{card.title}</div>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: '#7a8798' }}>{card.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="sizes" style={{ background: '#f7f8f9', padding: '48px 24px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 8px', textAlign: 'center', fontSize: 26, fontWeight: 800, letterSpacing: '-.02em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9h18v6H3z" />
              <path d="M7 9v3M12 9v3M17 9v3" />
            </svg>
            How to Measure Your Luggage
          </h2>
          <p style={{ margin: '0 0 26px', textAlign: 'center', fontSize: 13, color: '#7a8798' }}>Follow these 5 simple steps, or see the full walkthrough in the <Link href="/luggage-guide#how-to-measure">luggage guide</Link>.</p>
          {STEPS.map((text, i) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', border: '1px solid #edf0f3', borderRadius: 11, padding: '14px 18px', marginBottom: 10 }}>
              <span style={{ flex: 'none', width: 24, height: 24, borderRadius: '50%', background: '#0d9488', color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              <span style={{ fontSize: 13, lineHeight: 1.5, color: '#2c3852' }}>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: '56px 24px 0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 14px', textAlign: 'center', fontSize: 24, fontWeight: 800, letterSpacing: '-.02em' }}>Understanding Luggage Size Requirements</h2>
          <p style={{ margin: '0 0 22px', textAlign: 'center', fontSize: 13.5, lineHeight: 1.75, color: '#3d4759', maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
            Most airlines cluster around the same numbers — roughly 56 × 36 × 23 cm for a cabin bag and 158 cm total for checked baggage — but budget carriers cut both, and the airline you fly always has the final word.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link href="/luggage-guide" style={{ display: 'inline-block', padding: '12px 26px', background: '#fbbf47', color: '#3a2a05', borderRadius: 9, fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
              Read the full luggage guide
            </Link>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '56px 24px 64px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 24px', textAlign: 'center', fontSize: 24, fontWeight: 800, letterSpacing: '-.02em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" />
            </svg>
            Frequently Asked Questions
          </h2>
          {FAQS.map((q, i) => {
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
                {open && <p style={{ margin: 0, padding: '0 4px 18px', fontSize: 13, lineHeight: 1.7, color: '#5a6478' }}>{q.answer}</p>}
              </div>
            );
          })}
        </div>
      </section>

      <Footer maxWidth={1200} gap={32} logoSize={24} logoIconSize={13} showWordmark copyrightSize={11} />
    </div>
  );
}
