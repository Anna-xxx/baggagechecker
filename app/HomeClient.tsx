'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DEFAULT_BAG, BAGGAGE_RULES_REVIEW_DATE } from '@/lib/airlines';

type BagType = 'personal' | 'carryon' | 'checked';

const BAG_STYLE: Record<BagType, { fill: string; sideFill: string; stroke: string; ink: string; radius: number }> = {
  personal: { fill: '#e7effc', sideFill: '#d5e3fb', stroke: '#93b4ef', ink: '#1b4694', radius: 16 },
  carryon: { fill: '#cff5ec', sideFill: '#b8efe1', stroke: '#5eddc4', ink: '#0b5f56', radius: 10 },
  checked: { fill: '#fdf1dc', sideFill: '#f8e3bd', stroke: '#e9b969', ink: '#7a5406', radius: 10 },
};

const TYPE_TABS: { key: BagType; title: string; icon: React.ReactNode }[] = [
  {
    key: 'personal',
    title: 'Personal Item',
    icon: (
      <>
        <path d="M7 9a5 5 0 0 1 10 0v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
        <path d="M10 9V7a2 2 0 0 1 4 0v2" />
      </>
    ),
  },
  {
    key: 'carryon',
    title: 'Carry-on',
    icon: (
      <>
        <rect x="5" y="7" width="14" height="14" rx="2.5" />
        <path d="M9.5 7V4.6A.6.6 0 0 1 10.1 4h3.8a.6.6 0 0 1 .6.6V7" />
      </>
    ),
  },
  {
    key: 'checked',
    title: 'Checked Bag',
    icon: (
      <>
        <rect x="4" y="6" width="16" height="15" rx="2.5" />
        <path d="M9 6V3.6A.6.6 0 0 1 9.6 3h4.8a.6.6 0 0 1 .6.6V6" />
        <path d="M9.6 11v6M14.4 11v6" />
      </>
    ),
  },
];

const HERO_TITLE: Record<BagType, string> = {
  personal: 'Enter Your Personal Item Dimensions',
  carryon: 'Enter Your Carry-on Dimensions',
  checked: 'Enter Your Checked Bag Dimensions',
};

const FIT_CAPTION: Record<BagType, string> = {
  personal: 'Fits most airline personal item limits',
  carryon: 'Fits most airline cabin sizers',
  checked: 'Fits most airline checked bag limits',
};

const STEPS = [
  'Place your luggage upright on a flat surface.',
  'Use a tape measure to measure from the ground to the top handle (height).',
  'Measure the width from side to side.',
  'Measure the depth from front to back, including wheels and handles.',
  'Compare all three measurements to your airline limits.',
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

  const dims = [
    { label: 'Width', min: 10, max: 90, value: width, display: `${conv(width)} ${unit}`, onChange: setWidth },
    { label: 'Height', min: 10, max: 100, value: height, display: `${conv(height)} ${unit}`, onChange: setHeight },
    { label: 'Depth', min: 5, max: 60, value: depth, display: `${conv(depth)} ${unit}`, onChange: setDepth },
    { label: 'Weight', min: 1, max: 32, value: weightKg, display: `${weightKg} kg`, onChange: setWeightKg },
  ];

  // Values in the handoff URL are always metric integers; `unit` and `type` only set the
  // checker's own toggles. The checker itself owns every fits/too-large decision from here.
  const sizeCheckerHref = `/size-checker?w=${width}&h=${height}&d=${depth}&kg=${weightKg}&unit=${unit === 'cm' ? 'metric' : 'in'}&type=${type}`;

  const panelBoxScale = 90 + ((Math.min(100, Math.max(10, height)) - 10) / 90) * 130;
  const boxScale = panelBoxScale / height;
  const boxW = Math.max(92, Math.round(width * boxScale));
  const boxH = Math.round(panelBoxScale);
  const depthW = Math.max(30, Math.round(depth * boxScale));

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <Header />

      <section id="home" style={{ background: '#f7f8f9', padding: '56px 24px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#e3f5f2', color: '#0f766e', border: '1px solid #c6ebe5', borderRadius: 999, padding: '6px 12px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf47' }} /> Airline Luggage Sizes
            </span>
            <h1 style={{ margin: '18px 0 14px', fontSize: 48, lineHeight: 1.08, fontWeight: 800, letterSpacing: '-.03em', maxWidth: '11ch' }}>Will your bag fit?</h1>
            <p style={{ margin: '0 0 24px', fontSize: 16, lineHeight: 1.6, color: '#57677c', maxWidth: '48ch' }}>
              Set your bag&apos;s width, height, depth and weight, then check it against every airline we cover — personal item, carry-on and checked baggage.
            </p>
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
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={on ? '#0f766e' : '#7a8798'} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                        {t.icon}
                      </svg>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: on ? '#0f766e' : '#57677c', textAlign: 'center' }}>{t.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="range-compact" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginBottom: 18 }}>
                {dims.map((d) => (
                  <div key={d.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#0f1c2e' }}>{d.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#7a8798' }}>{d.display}</span>
                    </div>
                    <input type="range" min={d.min} max={d.max} value={d.value} onChange={(e) => d.onChange(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 14, background: '#f8fafc', borderRadius: 12, padding: '20px 16px 16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 18, minHeight: 190 }}>
                <div style={{ position: 'relative', width: boxW, height: boxH }}>
                  <div style={{ position: 'absolute', left: '50%', top: -13, transform: 'translateX(-50%)', width: '34%', height: 16, border: '3px solid #94a3b8', borderBottom: 'none', borderRadius: '8px 8px 0 0' }} />
                  <div style={{ position: 'absolute', inset: 0, background: BAG_STYLE[type].fill, border: `2px solid ${BAG_STYLE[type].stroke}`, borderRadius: BAG_STYLE[type].radius, zIndex: 1, overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />
                    <div style={{ position: 'absolute', right: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />
                    <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 12, fontWeight: 700, color: BAG_STYLE[type].ink, whiteSpace: 'nowrap' }}>
                      {conv(width)}×{conv(height)}×{conv(depth)}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', left: '18%', bottom: -8, width: 10, height: 10, borderRadius: '50%', background: '#475569', zIndex: 2 }} />
                  <div style={{ position: 'absolute', right: '18%', bottom: -8, width: 10, height: 10, borderRadius: '50%', background: '#475569', zIndex: 2 }} />
                </div>
                <div style={{ position: 'relative', width: depthW, height: boxH }}>
                  <div style={{ position: 'absolute', left: '50%', top: -13, transform: 'translateX(-50%)', width: 4, height: 16, borderRadius: 2, background: '#94a3b8' }} />
                  <div style={{ position: 'absolute', inset: 0, background: BAG_STYLE[type].sideFill, border: `2px solid ${BAG_STYLE[type].stroke}`, borderRadius: BAG_STYLE[type].radius }} />
                  <div style={{ position: 'absolute', left: 2, bottom: -8, width: 10, height: 10, borderRadius: '50%', background: '#475569' }} />
                  <div style={{ position: 'absolute', right: 2, bottom: -8, width: 10, height: 10, borderRadius: '50%', background: '#475569' }} />
                  <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 12, fontWeight: 700, color: BAG_STYLE[type].ink, whiteSpace: 'nowrap' }}>{conv(depth)}</span>
                </div>
              </div>
              <p style={{ margin: '0 0 16px', fontSize: 12.5, fontWeight: 700, color: '#b45309', textAlign: 'center' }}>{FIT_CAPTION[type]}</p>

              <Link
                href={sizeCheckerHref}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 13, background: '#fbbf47', color: '#3a2a05', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 800, textDecoration: 'none' }}
              >
                Check Baggage Size
              </Link>
            </div>
          </div>

          <div>
            <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 26 }}>
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
        </div>
      </section>

      <section style={{ padding: '48px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 20 }}>
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

      <section id="sizes" style={{ background: '#f7f8f9', padding: '48px 24px 56px' }}>
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

      <section style={{ background: '#f7f8f9', padding: '36px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 26, textAlign: 'center' }}>
          <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>If your flight is delayed or cancelled, you could get $250–$600 compensation — check eligibility here.</p>
          <Link href="/size-checker" style={{ display: 'inline-block', padding: '11px 24px', background: '#fbbf47', color: '#3a2a05', borderRadius: 9, fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
            Check eligibility
          </Link>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '8px 24px 56px' }}>
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

      <section style={{ background: '#fff', padding: '44px 24px 56px' }}>
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
