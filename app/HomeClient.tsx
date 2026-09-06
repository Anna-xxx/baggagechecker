'use client';

import { useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirlineLogo } from '@/components/AirlineLogo';

function PhotoPlaceholder({ label, aspectRatio, radius = 0 }: { label: string; aspectRatio: string; radius?: number }) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: radius,
        overflow: 'hidden',
        background: 'repeating-linear-gradient(135deg,#eef1f4 0 10px,#e5eaef 10px 20px)',
        aspectRatio,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: 11, color: '#8494a8', letterSpacing: '.04em' }}>{label}</span>
    </div>
  );
}

type HomeAirline = { code: string; name: string; cabin: string; cabinKg: string; checked: string };

const AIRLINES: HomeAirline[] = [
  { code: 'AF', name: 'Air France', cabin: '55×35×25 cm', cabinKg: '12 kg', checked: '158 cm / 23 kg' },
  { code: 'AZ', name: 'ITA Airways', cabin: '55×35×25 cm', cabinKg: '8 kg', checked: '158 cm / 23 kg' },
  { code: 'KL', name: 'KLM Royal Dutch', cabin: '55×35×25 cm', cabinKg: '12 kg', checked: '158 cm / 23 kg' },
  { code: 'AA', name: 'American Airlines', cabin: '56×36×23 cm', cabinKg: 'No limit', checked: '158 cm / 23 kg' },
  { code: 'LH', name: 'Lufthansa', cabin: '55×40×23 cm', cabinKg: '8 kg', checked: '158 cm / 23 kg' },
  { code: 'BA', name: 'British Airways', cabin: '56×45×25 cm', cabinKg: '23 kg', checked: '208 cm / 23 kg' },
  { code: 'FR', name: 'Ryanair', cabin: '55×40×20 cm', cabinKg: '10 kg', checked: '119 cm / 20 kg' },
  { code: 'IB', name: 'Iberia', cabin: '56×40×25 cm', cabinKg: '10 kg', checked: '158 cm / 23 kg' },
];

const STEPS = [
  'Place your luggage upright on a flat surface.',
  'Use a tape measure to measure from the ground to the top handle (height).',
  'Measure the width from side to side.',
  'Measure the depth from front to back, including wheels and handles.',
  'Compare all three measurements to your airline limits.',
];

const BENEFITS = [
  { photo: 'boarding gate', title: 'Save Money', text: 'Avoid excess baggage fees by checking your luggage dimensions before you get to the airport.' },
  { photo: 'aircraft on stand', title: 'Save Time', text: 'Skip the repacking at the check-in desk and move straight through security with a bag you know fits.' },
  { photo: 'suitcase in cabin', title: 'Travel Confidently', text: 'Fly knowing your bag meets the rules of every airline on your itinerary.' },
];

const FAQS = [
  { question: 'Do airlines weigh carry-on luggage?', answer: 'Many do, particularly in Europe and Asia. Budget carriers weigh cabin bags at the gate and charge a fee if you are over the allowance.' },
  { question: 'Are wheels and handles included in the size?', answer: 'Yes. Published dimensions always include wheels, handles and external pockets, so measure the bag at its widest and tallest points.' },
  { question: 'What happens if my bag is too big?', answer: 'The bag is usually checked into the hold at the gate for a fee, which is typically higher than paying for hold luggage in advance.' },
  { question: 'Do carry-on rules differ for international flights?', answer: 'They can. Long-haul flights often allow a slightly larger cabin bag, while regional aircraft may require smaller bags to be gate-checked.' },
];

const FOOTER_COLUMNS = [
  { title: 'Popular Resources', links: ['Carry-On Sizes', 'Checked Baggage Limits', 'Airline Comparison', 'Baggage Fee Guide', 'Travel Tips'] },
  { title: 'Tools', links: ['Size Checker', 'Airline Directory', 'Transfer Booking', 'Flight Search'] },
  { title: 'Company', links: ['About', 'Contact', 'Privacy Policy', 'Terms of Use'] },
];

export function HomeClient() {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(55);
  const [depth, setDepth] = useState(23);
  const [weightKg, setWeightKg] = useState(10);
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(-1);

  const conv = (v: number) => (unit === 'cm' ? v : Math.round(v / 2.54));

  const dims = [
    { label: 'Width', min: 15, max: 70, value: width, display: `${conv(width)} ${unit}`, onChange: setWidth },
    { label: 'Height', min: 20, max: 90, value: height, display: `${conv(height)} ${unit}`, onChange: setHeight },
    { label: 'Depth', min: 5, max: 45, value: depth, display: `${conv(depth)} ${unit}`, onChange: setDepth },
    { label: 'Weight', min: 1, max: 32, value: weightKg, display: `${weightKg} kg`, onChange: setWeightKg },
  ];

  const airlines = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? AIRLINES.filter((a) => a.name.toLowerCase().includes(q)) : AIRLINES;
  }, [query]);

  const fits = height <= 56 && width <= 45 && depth <= 25;
  const boxW = Math.round(26 + width * 1.05);
  const boxH = Math.round(26 + height * 0.95);
  const depthW = Math.round(14 + depth * 0.75);
  const boxLabel = `${conv(width)}×${conv(height)}×${conv(depth)}`;

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <Header />

      <section id="home" style={{ background: '#f7f8f9', padding: '56px 24px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.95fr)', gap: 48, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#e3f5f2', color: '#0f766e', border: '1px solid #c6ebe5', borderRadius: 999, padding: '6px 12px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf47' }} /> Airline Luggage Sizes
            </span>
            <h1 style={{ margin: '18px 0 14px', fontSize: 52, lineHeight: 1.05, fontWeight: 800, letterSpacing: '-.03em', maxWidth: '11ch' }}>Luggage Size Checker</h1>
            <p style={{ margin: '0 0 24px', fontSize: 16, lineHeight: 1.6, color: '#57677c', maxWidth: '52ch' }}>
              Check if your luggage dimensions meet size and weight requirements for popular airlines. <a href="#sizes" style={{ fontWeight: 700 }}>Avoid excess baggage fees!</a>
            </p>
            <form style={{ display: 'flex', gap: 10, maxWidth: 520 }} onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Search airline or luggage requirement" style={{ flex: 1, minWidth: 0, padding: '13px 16px', border: '1px solid #ecdfc4', background: '#fff', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', color: '#0f1c2e', outline: 'none' }} />
              <button type="submit" className="btn-primary" style={{ padding: '13px 26px', background: '#fbbf47', color: '#3a2a05', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>
                Search
              </button>
            </form>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <PhotoPlaceholder label="airport terminal photo" aspectRatio="16/11" radius={18} />
              <span style={{ position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: '50%', background: '#fbbf47' }} />
            </div>
            <div style={{ position: 'absolute', left: 24, bottom: -18, background: '#fff', border: '1px solid #edf0f3', borderRadius: 12, boxShadow: '0 8px 24px rgba(22,35,61,.10)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700 }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#1fa87a', color: '#fff', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4.5 4.5L19 7" />
                </svg>
              </span>
              Verified for 40+ airlines
            </div>
          </div>
        </div>
      </section>

      <div style={{ background: '#f7f8f9', padding: '14px 24px', display: 'flex', justifyContent: 'center' }}>
        <span style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 999, padding: '6px 16px', fontSize: 11, color: '#7a8798', fontWeight: 600 }}>Baggage rules last updated: 12 June 2026</span>
      </div>

      <section id="checker" className="range-compact" style={{ background: '#f7f8f9', padding: '8px 24px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,340px) minmax(0,1fr)', gap: 24, alignItems: 'start' }}>
          <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, letterSpacing: '-.01em' }}>Enter Your Luggage Dimensions</h3>
              <button
                onClick={() => setUnit((u) => (u === 'cm' ? 'in' : 'cm'))}
                className="btn-outline"
                style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 8, padding: '5px 9px', fontSize: 11, fontWeight: 700, color: '#57677c', fontFamily: 'inherit', cursor: 'pointer' }}
              >
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.2} strokeLinecap="round">
                  <path d="M4 8h14l-3-3M20 16H6l3 3" />
                </svg>{' '}
                {unit === 'cm' ? 'cm' : 'inch'}
              </button>
            </div>

            {dims.map((d) => (
              <div key={d.label} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0f1c2e' }}>{d.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#7a8798' }}>{d.display}</span>
                </div>
                <input type="range" min={d.min} max={d.max} value={d.value} onChange={(e) => d.onChange(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
            ))}

            <div style={{ margin: '18px 0 16px', background: '#f8fafc', borderRadius: 12, padding: '26px 16px 20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 22 }}>
              <div style={{ position: 'relative', width: boxW, height: boxH }}>
                <div style={{ position: 'absolute', left: '50%', top: -13, transform: 'translateX(-50%)', width: '34%', height: 16, border: '3px solid #94a3b8', borderBottom: 'none', borderRadius: '8px 8px 0 0' }} />
                <div style={{ position: 'absolute', inset: 0, background: '#cff5ec', border: '2px solid #5eddc4', borderRadius: 10, zIndex: 1 }} />
                <div style={{ position: 'absolute', left: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(20,184,166,.25)', zIndex: 2 }} />
                <div style={{ position: 'absolute', right: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(20,184,166,.25)', zIndex: 2 }} />
                <div style={{ position: 'absolute', left: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569', zIndex: 2 }} />
                <div style={{ position: 'absolute', right: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569', zIndex: 2 }} />
                <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 10, fontWeight: 700, color: '#0b5f56', whiteSpace: 'nowrap', zIndex: 3 }}>{boxLabel}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
                <div style={{ position: 'relative', width: depthW, height: boxH }}>
                  <div style={{ position: 'absolute', left: '50%', top: -14, transform: 'translateX(-50%)', width: 4, height: 16, borderRadius: 2, background: '#94a3b8' }} />
                  <div style={{ position: 'absolute', inset: 0, background: '#b8efe1', border: '2px solid #5eddc4', borderRadius: 10 }} />
                  <div style={{ position: 'absolute', left: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                  <div style={{ position: 'absolute', right: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                  <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 10, fontWeight: 700, color: '#0b5f56', whiteSpace: 'nowrap' }}>{conv(depth)}</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: 11, color: '#7a8798', textAlign: 'center', marginBottom: 14 }}>{fits ? 'Fits most airline cabin sizers' : 'Too large for most cabin sizers'}</div>

            <button className="btn-primary" style={{ width: '100%', padding: 13, background: '#fbbf47', color: '#3a2a05', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 800, fontFamily: 'inherit', cursor: 'pointer' }}>
              Check Baggage Size
            </button>
          </div>

          <div id="airlines" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, letterSpacing: '-.01em' }}>Popular Airlines</h3>
              <span style={{ fontSize: 11, color: '#8494a8' }}>Showing airlines that your luggage fits — {airlines.length} of 42 airlines</span>
            </div>
            <div style={{ display: 'flex', gap: 8, margin: '14px 0 6px' }}>
              <input
                placeholder="Search for an airline (e.g. Ryanair, Emirates)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ flex: 1, minWidth: 0, padding: '10px 14px', border: '1px solid #e4eaf1', borderRadius: 9, fontSize: 13, fontFamily: 'inherit', outline: 'none', color: '#0f1c2e' }}
              />
              <button className="btn-primary" style={{ flex: 'none', width: 44, background: '#fbbf47', border: 'none', borderRadius: 9, color: '#3a2a05', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a2a05" strokeWidth={2.2} strokeLinecap="round">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16l5 5" />
                </svg>
              </button>
            </div>
            <div style={{ fontSize: 11, color: '#8494a8', marginBottom: 6 }}>
              Currently viewing: <b style={{ color: '#0f1c2e' }}>All airlines</b>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,290px),1fr))', gap: '0 28px' }}>
              {airlines.map((a) => (
                <div key={a.code} style={{ display: 'flex', gap: 12, padding: '14px 0', borderTop: '1px solid #f0f2f5' }}>
                  <AirlineLogo code={a.code} width={40} height={40} radius={8} fontSize={10} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{a.name}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 18px', fontSize: 10.5, color: '#7a8798', lineHeight: 1.5 }}>
                      <span style={{ minWidth: 0 }}>
                        Carry-on
                        <br />
                        <b style={{ display: 'block', color: '#0f1c2e', fontWeight: 600, whiteSpace: 'nowrap' }}>{a.cabin}</b>
                      </span>
                      <span style={{ minWidth: 0, whiteSpace: 'nowrap' }}>
                        Max weight
                        <br />
                        <b style={{ display: 'block', color: '#0f1c2e', fontWeight: 600 }}>{a.cabinKg}</b>
                      </span>
                      <span style={{ minWidth: 0 }}>
                        Checked
                        <br />
                        <b style={{ display: 'block', color: '#0f1c2e', fontWeight: 600, whiteSpace: 'nowrap' }}>{a.checked}</b>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', paddingTop: 16, borderTop: '1px solid #f0f2f5', marginTop: 4 }}>
              <a href="#airlines" style={{ fontSize: 12, fontWeight: 700 }}>
                Show 34 more airlines →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 20 }}>
          {[
            { bg: '#e3f5f2', color: '#0d9488', title: 'Luggage Size Checker', text: 'Check if your luggage meets airline requirements in a few seconds.', icon: (<><path d="M3 9h18v6H3z" /><path d="M7 9v3M12 9v3M17 9v3" /></>) },
            { bg: '#e7effc', color: '#2563eb', title: 'Compare Luggage Sizes', text: 'Compare baggage dimensions across the leading airlines side by side.', icon: <path d="M4 8h14l-3-3M20 16H6l3 3" /> },
            { bg: '#fdecec', color: '#dc4c4c', title: 'Airline Directory', text: 'Browse the full directory of airlines and their luggage policies.', icon: <path d="M2 13l20-7-7 20-3-8z" /> },
            { bg: '#fdf1dc', color: '#e08c0b', title: 'Book Your Flights', text: 'Find and book your next flight once your luggage is ready to go.', icon: (<><path d="M3 9a2 2 0 0 1 0 6v3h18v-3a2 2 0 0 1 0-6V6H3z" /><path d="M12 7v10" strokeDasharray="2 3" /></>) },
          ].map((card) => (
            <div key={card.title} className="card-hover" style={{ border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
              <span style={{ display: 'flex', width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', background: card.bg, marginBottom: 30 }}>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  {card.icon}
                </svg>
              </span>
              <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 7 }}>{card.title}</div>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: '#7a8798' }}>{card.text}</p>
            </div>
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
          <p style={{ margin: '0 0 26px', textAlign: 'center', fontSize: 13, color: '#7a8798' }}>Follow these 5 simple steps to check if your luggage will fit in the cabin.</p>
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
          <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>If your flight is delayed or cancelled, you could get €250–€600 compensation — check eligibility here.</p>
          <a href="#home" style={{ display: 'inline-block', padding: '11px 24px', background: '#fbbf47', color: '#3a2a05', borderRadius: 9, fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
            Check eligibility
          </a>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '52px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 26px', textAlign: 'center', fontSize: 24, fontWeight: 800, letterSpacing: '-.02em' }}>Travel Confidently</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 22 }}>
            {BENEFITS.map((b) => (
              <div key={b.title} style={{ border: '1px solid #edf0f3', borderRadius: 14, overflow: 'hidden', boxShadow: '0 6px 18px rgba(22,35,61,.05)' }}>
                <PhotoPlaceholder label={b.photo} aspectRatio="16/10" />
                <div style={{ padding: '16px 18px 20px' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 7 }}>{b.title}</div>
                  <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: '#7a8798' }}>{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '8px 24px 56px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 26px', textAlign: 'center', fontSize: 24, fontWeight: 800, letterSpacing: '-.02em' }}>Understanding Luggage Size Requirements</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 38, alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 460px', minWidth: 0 }}>
              <div style={{ marginBottom: 28 }}>
                <PhotoPlaceholder label="passenger checking boarding pass" aspectRatio="16/9" radius={14} />
              </div>

              <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 800 }}>Why Luggage Size Matters When Traveling</h3>
              <p style={{ margin: '0 0 18px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>
                Airline baggage rules are one of the most frequent sources of stress at the airport. Gate agents measure bags, and an oversized carry-on can turn into a fee that costs more than the ticket. Knowing your dimensions before you leave home removes that risk entirely.
              </p>
              <p style={{ margin: '0 0 22px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>
                To avoid these troubles, travellers can measure their luggage using a <a href="#checker">luggage size checker</a> before heading to the airport.
              </p>

              <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 800 }}>Common Airline Requirements for Luggage Sizes</h3>
              <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>While there are no universal luggage size rules, most airlines follow standard dimension ranges for carry-on and checked baggage. Here is a general guide.</p>

              <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800 }}>Carry-On Luggage Size Restrictions</h4>
              <p style={{ margin: '0 0 8px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>Most major airlines allow one cabin bag per passenger, typically:</p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 20, fontSize: 13, lineHeight: 1.9, color: '#3d4759' }}>
                <li>22 × 14 × 9 inches (56 × 36 × 23 centimetres), including wheels and handles</li>
              </ul>
              <p style={{ margin: '0 0 8px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>However, budget airlines in Europe such as Ryanair, Wizz Air and easyJet apply stricter limits, so check your airline before flying. You can find this information on their websites, for example:</p>
              <ul style={{ margin: '0 0 22px', paddingLeft: 20, fontSize: 13, lineHeight: 1.9, color: '#3d4759' }}>
                <li>American Airlines baggage policy</li>
                <li>Ryanair cabin bags guide</li>
                <li>Emirates baggage allowance</li>
              </ul>

              <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800 }}>Checked Baggage Size &amp; Weight Limits</h4>
              <p style={{ margin: '0 0 8px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>For checked luggage, airlines typically allow:</p>
              <ul style={{ margin: '0 0 12px', paddingLeft: 20, fontSize: 13, lineHeight: 1.9, color: '#3d4759' }}>
                <li>62 linear inches (158 cm) for length + width + height</li>
                <li>Weight limits of 23 kg for economy class and up to 32 kg for business and first class</li>
              </ul>
              <p style={{ margin: '0 0 22px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>Some airlines charge overweight baggage fees, which can range from $50 to $200 per bag depending on route.</p>

              <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 800 }}>How to Measure Your Luggage Correctly</h3>
              <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>Using a luggage size checker is only useful if you measure your bag correctly and consistently. Here is how to make sure your numbers are right.</p>

              <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800 }}>Include Wheels and Handles</h4>
              <p style={{ margin: '0 0 18px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>Many travellers make the mistake of measuring only the main compartment of their suitcase. Always measure from the floor to the top of the extended handle, wheels included.</p>

              <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800 }}>Measure the Widest Points</h4>
              <p style={{ margin: '0 0 18px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>Instead of measuring the middle of the bag, place a ruler at the widest point of your suitcase, including external pockets.</p>

              <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800 }}>Use a Digital Luggage Scale</h4>
              <p style={{ margin: '0 0 18px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>To avoid overweight baggage fees, use a portable luggage scale to weigh your suitcase before arriving at the airport.</p>

              <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800 }}>Consider Soft-Sided vs. Hard-Sided Bags</h4>
              <p style={{ margin: '0 0 22px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>Soft-sided luggage compresses slightly, which can help it pass a sizer, while hard-shell suitcases cannot flex. If you fly budget carriers often, a soft-sided bag is the safer choice.</p>

              <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 800 }}>Luggage Size Checker: A Must-Have Travel Tool</h3>
              <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>
                Instead of guessing whether your suitcase will fit airline requirements, use an online luggage size checker like <a href="#home">BaggageChecker</a> to compare dimensions instantly. The tool lets you:
              </p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 20, fontSize: 13, lineHeight: 1.9, color: '#3d4759' }}>
                <li>Enter your luggage dimensions in centimetres or inches</li>
                <li>Check baggage rules for dozens of major airlines</li>
                <li>See restrictions for cabin and checked luggage side by side</li>
              </ul>
              <p style={{ margin: '0 0 22px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>Being able to compare limits in one place saves time and helps you avoid surprises at the check-in desk.</p>

              <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 800 }}>Avoid Extra Fees &amp; Travel Stress</h3>
              <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>A little planning with luggage policies turns a potentially expensive last-minute headache into a non-event. Before you fly:</p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 20, fontSize: 13, lineHeight: 1.9, color: '#3d4759' }}>
                <li>Measure and weigh every bag the night before</li>
                <li>Check your airline&apos;s own size and weight rules</li>
                <li>Weigh your suitcase with a portable luggage scale</li>
                <li>Pack heavier items in your checked bag where allowed</li>
              </ul>
              <p style={{ margin: '0 0 22px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>By planning ahead, you can save money, avoid queues and travel with confidence knowing your luggage meets all airline requirements.</p>

              <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 800 }}>Final Thoughts</h3>
              <p style={{ margin: '0 0 22px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>
                Packing for a trip does not have to be a guessing game. With a luggage size checker you can confirm whether your bag meets the standards set by the airline you are flying with, whether you are taking a hand carry-on for a weekend or checking two large suitcases for a long trip.
              </p>
              <p style={{ margin: '0 0 26px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>
                For a fast and accurate luggage size check, use <a href="#checker">BaggageChecker</a> and compare baggage policies today.
              </p>

              <div style={{ textAlign: 'center' }}>
                <a href="#checker" style={{ display: 'inline-block', padding: '12px 28px', background: '#fbbf47', color: '#3a2a05', borderRadius: 9, fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
                  Check Your Luggage Size Now
                </a>
              </div>
            </div>

            <aside style={{ flex: '1 1 250px', maxWidth: 330, position: 'sticky', top: 80, display: 'grid', gap: 14 }}>
              <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: '#8494a8', marginBottom: 18 }}>What to measure</div>
                <div style={{ padding: '4px 0 2px' }}>
                  <svg viewBox="0 0 260 210" width="100%" role="img" aria-label="Diagram showing where to measure width, height and depth of a suitcase">
                    <defs>
                      <marker id="dimArrow" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
                        <path d="M0 0 L10 5 L0 10 z" fill="#94a3b8" />
                      </marker>
                    </defs>
                    <rect x={66} y={48} width={112} height={118} rx={14} fill="#cff5ec" stroke="#5eddc4" strokeWidth={2} />
                    <rect x={66} y={80} width={112} height={10} fill="#fbbf47" />
                    <path d="M104 48v-14a6 6 0 0 1 6-6h24a6 6 0 0 1 6 6v14" fill="none" stroke="#94a3b8" strokeWidth={4} strokeLinecap="round" />
                    <rect x={104} y={134} width={36} height={9} rx={4} fill="#475569" opacity={0.28} />
                    <circle cx={86} cy={172} r={6} fill="#475569" />
                    <circle cx={158} cy={172} r={6} fill="#475569" />
                    <line x1={66} y1={196} x2={178} y2={196} stroke="#94a3b8" strokeWidth={1.6} markerStart="url(#dimArrow)" markerEnd="url(#dimArrow)" />
                    <text x={122} y={190} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={12} fontWeight={700} fill="#57677c">
                      Width
                    </text>
                    <line x1={44} y1={34} x2={44} y2={178} stroke="#94a3b8" strokeWidth={1.6} markerStart="url(#dimArrow)" markerEnd="url(#dimArrow)" />
                    <text x={36} y={106} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={12} fontWeight={700} fill="#57677c" transform="rotate(-90 36 106)">
                      Height
                    </text>
                    <rect x={204} y={48} width={40} height={118} rx={12} fill="#b8efe1" stroke="#5eddc4" strokeWidth={2} />
                    <circle cx={214} cy={172} r={6} fill="#475569" />
                    <circle cx={234} cy={172} r={6} fill="#475569" />
                    <line x1={204} y1={196} x2={244} y2={196} stroke="#94a3b8" strokeWidth={1.6} markerStart="url(#dimArrow)" markerEnd="url(#dimArrow)" />
                    <text x={224} y={190} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={12} fontWeight={700} fill="#57677c">
                      Depth
                    </text>
                    <text x={122} y={12} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={11} fill="#8494a8">
                      front
                    </text>
                    <text x={224} y={12} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={11} fill="#8494a8">
                      side
                    </text>
                  </svg>
                </div>
                <div style={{ display: 'grid', gap: 7, paddingTop: 16, marginTop: 14, borderTop: '1px solid #f1f4f7' }}>
                  <span style={{ fontSize: 11.5, color: '#57677c' }}>
                    <b>Width</b> — at the widest point of the shell
                  </span>
                  <span style={{ fontSize: 11.5, color: '#57677c' }}>
                    <b>Height</b> — floor to top of extended handle
                  </span>
                  <span style={{ fontSize: 11.5, color: '#57677c' }}>
                    <b>Depth</b> — front to back, wheels included
                  </span>
                  <span style={{ fontSize: 11.5, color: '#57677c' }}>
                    <b>Weight</b> — weigh the bag fully packed
                  </span>
                </div>
                <p style={{ margin: '14px 0 0', fontSize: 12, lineHeight: 1.7, color: '#7a8798' }}>Airlines quote limits in this order: width × height × depth. Match your numbers to theirs before you pack.</p>
              </div>

              <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: '#8494a8', marginBottom: 16 }}>Typical limits</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, padding: '10px 0 14px', borderBottom: '1px solid #f1f4f7' }}>
                  <div style={{ position: 'relative', width: 26, height: 26, flex: 'none' }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 5, background: '#eef1f4', border: '2px solid #cbd5e1' }} />
                    <div style={{ position: 'absolute', left: '50%', top: -7, transform: 'translateX(-50%)', width: 12, height: 8, border: '2px solid #b6c1cf', borderBottom: 'none', borderRadius: '5px 5px 0 0' }} />
                  </div>
                  <div style={{ position: 'relative', width: 40, height: 52, flex: 'none' }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 7, background: '#cff5ec', border: '2px solid #5eddc4' }} />
                    <div style={{ position: 'absolute', left: 0, right: 0, top: '38%', height: 4, background: 'rgba(20,184,166,.3)' }} />
                    <div style={{ position: 'absolute', left: '50%', top: -10, transform: 'translateX(-50%)', width: 15, height: 11, border: '2px solid #94a3b8', borderBottom: 'none', borderRadius: '6px 6px 0 0' }} />
                    <div style={{ position: 'absolute', left: 5, bottom: -6, width: 8, height: 8, borderRadius: '50%', background: '#475569' }} />
                    <div style={{ position: 'absolute', right: 5, bottom: -6, width: 8, height: 8, borderRadius: '50%', background: '#475569' }} />
                  </div>
                  <div style={{ position: 'relative', width: 58, height: 78, flex: 'none' }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 9, background: '#fdf1d8', border: '2px solid #f3c976' }} />
                    <div style={{ position: 'absolute', left: 0, right: 0, top: '34%', height: 5, background: 'rgba(224,140,11,.25)' }} />
                    <div style={{ position: 'absolute', left: '50%', top: -11, transform: 'translateX(-50%)', width: 20, height: 12, border: '2px solid #94a3b8', borderBottom: 'none', borderRadius: '6px 6px 0 0' }} />
                    <div style={{ position: 'absolute', left: 7, bottom: -6, width: 9, height: 9, borderRadius: '50%', background: '#475569' }} />
                    <div style={{ position: 'absolute', right: 7, bottom: -6, width: 9, height: 9, borderRadius: '50%', background: '#475569' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gap: 11, paddingTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ flex: 'none', width: 9, height: 9, borderRadius: 3, background: '#eef1f4', border: '1.5px solid #cbd5e1' }} />
                    <span style={{ fontSize: 12.5, fontWeight: 700, flex: 'none' }}>Personal item</span>
                    <span style={{ fontSize: 11.5, color: '#7a8798', marginLeft: 'auto', textAlign: 'right' }}>40 × 30 × 15 cm</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ flex: 'none', width: 9, height: 9, borderRadius: 3, background: '#cff5ec', border: '1.5px solid #5eddc4' }} />
                    <span style={{ fontSize: 12.5, fontWeight: 700, flex: 'none' }}>Cabin bag</span>
                    <span style={{ fontSize: 11.5, color: '#7a8798', marginLeft: 'auto', textAlign: 'right' }}>56 × 36 × 23 cm · 8–10 kg</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ flex: 'none', width: 9, height: 9, borderRadius: 3, background: '#fdf1d8', border: '1.5px solid #f3c976' }} />
                    <span style={{ fontSize: 12.5, fontWeight: 700, flex: 'none' }}>Checked bag</span>
                    <span style={{ fontSize: 11.5, color: '#7a8798', marginLeft: 'auto', textAlign: 'right' }}>158 cm total · 23 kg</span>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: '#8494a8', marginBottom: 14 }}>Gate sizer</div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 16px' }}>
                  <div style={{ position: 'relative', width: 148, height: 118 }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 10, width: 9, borderRadius: 4, background: 'linear-gradient(180deg,#dbe2ea,#c3ccd7)' }} />
                    <div style={{ position: 'absolute', right: 0, top: 0, bottom: 10, width: 9, borderRadius: 4, background: 'linear-gradient(180deg,#dbe2ea,#c3ccd7)' }} />
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 9, borderRadius: 4, background: 'linear-gradient(90deg,#dbe2ea,#c3ccd7)' }} />
                    <div style={{ position: 'absolute', left: -6, right: -6, bottom: 0, height: 10, borderRadius: 5, background: '#94a3b8' }} />
                    <div style={{ position: 'absolute', left: '50%', bottom: 10, transform: 'translateX(-50%)', width: 66, height: 78 }}>
                      <div style={{ position: 'absolute', inset: 0, borderRadius: 8, background: '#cff5ec', border: '2px solid #5eddc4' }} />
                      <div style={{ position: 'absolute', left: 0, right: 0, top: '36%', height: 5, background: 'rgba(20,184,166,.28)' }} />
                      <div style={{ position: 'absolute', left: '50%', top: -11, transform: 'translateX(-50%)', width: 22, height: 12, border: '2px solid #94a3b8', borderBottom: 'none', borderRadius: '6px 6px 0 0' }} />
                    </div>
                    <div style={{ position: 'absolute', left: 11, bottom: 26, width: 22, borderTop: '2px dashed #a9b4c2' }} />
                    <div style={{ position: 'absolute', right: 11, bottom: 26, width: 22, borderTop: '2px dashed #a9b4c2' }} />
                    <span style={{ position: 'absolute', right: -2, top: 16, display: 'inline-flex', alignItems: 'center', gap: 4, background: '#e6f8f0', border: '1px solid #b6e6cf', color: '#15803d', borderRadius: 999, padding: '3px 8px', fontSize: 10, fontWeight: 800 }}>
                      fits
                    </span>
                  </div>
                </div>
                <p style={{ margin: '8px 0 0', fontSize: 12, lineHeight: 1.7, color: '#7a8798' }}>If the bag drops into the frame without pressure, it passes. Soft-sided shells give you a couple of centimetres of margin.</p>
              </div>
            </aside>
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

      <section style={{ background: '#f7f8f9', padding: '48px 24px 56px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 22px', textAlign: 'center', fontSize: 20, fontWeight: 800, letterSpacing: '-.02em' }}>Need an airport transfer? Compare transfers in 175+ countries.</h2>
          <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ background: '#fbbf47', color: '#3a2a05', fontSize: 11, fontWeight: 800, letterSpacing: '.12em', textAlign: 'center', padding: 8 }}>TRANSFER BOOKING</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1.3fr) minmax(0,.7fr) minmax(0,.6fr) minmax(0,.9fr) 52px', gap: 10, padding: 16 }}>
              <div style={{ border: '1px solid #e4eaf1', borderRadius: 9, padding: '8px 12px' }}>
                <div style={{ fontSize: 9, color: '#a9b4c2', fontWeight: 700, letterSpacing: '.06em' }}>FROM: AIRPORT</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 3 }}>Paris Charles de Gaulle</div>
              </div>
              <div style={{ border: '1px solid #e4eaf1', borderRadius: 9, padding: '8px 12px' }}>
                <div style={{ fontSize: 9, color: '#a9b4c2', fontWeight: 700, letterSpacing: '.06em' }}>TO: HOTEL, ADDRESS</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 3 }}>Enter destination</div>
              </div>
              <div style={{ border: '1px solid #e4eaf1', borderRadius: 9, padding: '8px 12px' }}>
                <div style={{ fontSize: 9, color: '#a9b4c2', fontWeight: 700, letterSpacing: '.06em' }}>DATE</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 3 }}>14 Jul</div>
              </div>
              <div style={{ border: '1px solid #e4eaf1', borderRadius: 9, padding: '8px 12px' }}>
                <div style={{ fontSize: 9, color: '#a9b4c2', fontWeight: 700, letterSpacing: '.06em' }}>TIME</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 3 }}>10:30</div>
              </div>
              <div style={{ border: '1px solid #e4eaf1', borderRadius: 9, padding: '8px 12px' }}>
                <div style={{ fontSize: 9, color: '#a9b4c2', fontWeight: 700, letterSpacing: '.06em' }}>PASSENGERS</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 3 }}>2 passengers</div>
              </div>
              <button className="btn-primary" style={{ background: '#fbbf47', border: 'none', borderRadius: 9, color: '#3a2a05', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a2a05" strokeWidth={2.2} strokeLinecap="round">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16l5 5" />
                </svg>
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 10, color: '#a2aab8', marginTop: 8 }}>Powered by transfer partners</div>
        </div>
      </section>

      <div style={{ background: '#f7f8f9', padding: '0 24px 40px', textAlign: 'center', fontSize: 12, color: '#7a8798' }}>
        Personal luggage advice? <a href="#home">Talk to our travel team</a>
      </div>

      <Footer maxWidth={1200} gap={32} logoSize={24} logoIconSize={13} showWordmark copyrightSize={11} columns={FOOTER_COLUMNS} />
    </div>
  );
}
