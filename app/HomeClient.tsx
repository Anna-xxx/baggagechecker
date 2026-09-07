'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirlineLogo } from '@/components/AirlineLogo';
import { AIRLINES as ALL_AIRLINES, airlineSlug, getAirlineBaggage } from '@/lib/airlines';

type BagType = 'carryon' | 'personal' | 'checked';

const BAG_TITLE: Record<BagType, string> = { personal: 'Personal Item', carryon: 'Carry-on', checked: 'Checked Bag' };
const BAG_STYLE: Record<BagType, { fill: string; sideFill: string; stroke: string; ink: string; radius: number; soft: boolean; hard: boolean; ribs: boolean; straps: boolean }> = {
  carryon: { fill: '#cff5ec', sideFill: '#b8efe1', stroke: '#5eddc4', ink: '#0b5f56', radius: 10, soft: false, hard: true, ribs: true, straps: false },
  personal: { fill: '#e7effc', sideFill: '#d5e3fb', stroke: '#93b4ef', ink: '#1b4694', radius: 16, soft: true, hard: false, ribs: false, straps: false },
  checked: { fill: '#fdf1dc', sideFill: '#f8e3bd', stroke: '#e9b969', ink: '#7a5406', radius: 10, soft: false, hard: true, ribs: false, straps: true },
};
const FIT_LIMITS: Record<BagType, { h: number; w: number; d: number }> = {
  carryon: { h: 56, w: 45, d: 25 },
  personal: { h: 40, w: 30, d: 15 },
  checked: { h: 80, w: 55, d: 30 },
};
const TYPE_ICONS: Record<BagType, ReactNode> = {
  carryon: (
    <>
      <rect x="5" y="7" width="14" height="14" rx="2.5" />
      <path d="M9.5 7V4.6A.6.6 0 0 1 10.1 4h3.8a.6.6 0 0 1 .6.6V7" />
    </>
  ),
  personal: (
    <>
      <path d="M7 9a5 5 0 0 1 10 0v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
      <path d="M10 9V7a2 2 0 0 1 4 0v2" />
    </>
  ),
  checked: (
    <>
      <rect x="4" y="6" width="16" height="15" rx="2.5" />
      <path d="M9 6V3.6A.6.6 0 0 1 9.6 3h4.8a.6.6 0 0 1 .6.6V6" />
      <path d="M9.6 11v6M14.4 11v6" />
    </>
  ),
};

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

type HomeAirline = { code: string; name: string; website: string; cabin: string; cabinKg: string };

const POPULAR_AIRLINE_CODES = ['AF', 'AZ', 'KL', 'AA', 'LH', 'BA', 'FR', 'IB'];

const AIRLINES: HomeAirline[] = POPULAR_AIRLINE_CODES.flatMap((code) => {
  const airline = ALL_AIRLINES.find((a) => a.code === code);
  if (!airline) return [];
  const carryOn = getAirlineBaggage(airline).carryOn;
  return [
    {
      code: airline.code,
      name: airline.name,
      website: airline.website,
      cabin: `${carryOn.h}×${carryOn.w}×${carryOn.d} cm`,
      cabinKg: carryOn.kg ? `${carryOn.kg} kg` : 'No limit',
    },
  ];
});

function fitsAirline(a: HomeAirline, w: number, h: number, d: number, kg: number) {
  const parts = a.cabin.replace(' cm', '').split('×').map(Number);
  const lim = [...parts].sort((x, y) => y - x);
  const mine = [w, h, d].sort((x, y) => y - x);
  const kgLimit = parseFloat(a.cabinKg);
  const sizeOk = mine.every((v, i) => v <= lim[i]);
  const kgOk = Number.isNaN(kgLimit) || kg <= kgLimit;
  return sizeOk && kgOk;
}

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
  {
    title: 'Popular Resources',
    links: [
      { label: 'Carry-On Sizes', href: '/luggage-guide' },
      { label: 'Checked Baggage Limits', href: '/luggage-guide' },
      { label: 'Airline Comparison', href: '/airlines' },
      { label: 'Baggage Fee Guide', href: '/luggage-guide' },
      { label: 'Travel Tips', href: '/luggage-guide' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'Size Checker', href: '/size-checker' },
      { label: 'Airline Directory', href: '/airlines' },
      { label: 'Transfer Booking', href: '/' },
      { label: 'Flight Search', href: '/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/' },
      { label: 'Contact', href: '/' },
      { label: 'Privacy Policy', href: '/' },
      { label: 'Terms of Use', href: '/' },
    ],
  },
];

export function HomeClient() {
  const router = useRouter();
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [type, setType] = useState<BagType>('carryon');
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(55);
  const [depth, setDepth] = useState(23);
  const [weightKg, setWeightKg] = useState(10);
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(-1);

  const conv = (v: number) => (unit === 'cm' ? v : Math.round(v / 2.54));
  const weightMax = type === 'checked' ? 45 : 32;

  const dims = [
    { label: 'Width', min: 10, max: 90, value: width, display: `${conv(width)} ${unit}`, onChange: setWidth },
    { label: 'Height', min: 10, max: 100, value: height, display: `${conv(height)} ${unit}`, onChange: setHeight },
    { label: 'Depth', min: 5, max: 60, value: depth, display: `${conv(depth)} ${unit}`, onChange: setDepth },
    { label: 'Weight', min: 1, max: weightMax, value: weightKg, display: `${weightKg} kg`, onChange: setWeightKg },
  ];

  const airlines = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? AIRLINES.filter((a) => a.name.toLowerCase().includes(q)) : AIRLINES;
    return list.map((a) => {
      const fits = fitsAirline(a, width, height, depth, weightKg);
      return {
        ...a,
        fitLabel: fits ? 'Fits your bag' : 'Too large',
        fitColor: fits ? '#15803d' : '#b3403f',
        fitBg: fits ? '#e6f6ee' : '#fdecec',
      };
    });
  }, [query, width, height, depth, weightKg]);

  const fitSummary = `${airlines.filter((a) => a.fitLabel === 'Fits your bag').length} of ${airlines.length} popular airlines fit your bag`;

  const fitLim = FIT_LIMITS[type];
  const fits = height <= fitLim.h && width <= fitLim.w && depth <= fitLim.d;
  const bagStyle = BAG_STYLE[type];

  const goToSizeChecker = () => {
    const params = new URLSearchParams({ unit, type, w: String(width), h: String(height), d: String(depth), kg: String(weightKg) });
    router.push(`/size-checker?${params.toString()}`);
  };

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
              Check if your luggage dimensions meet size and weight requirements for popular airlines. <Link href="/size-checker" style={{ fontWeight: 700 }}>Avoid excess baggage fees!</Link>
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
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, letterSpacing: '-.01em' }}>Enter Your {BAG_TITLE[type]} Dimensions</h3>
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

            <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
              {(Object.keys(BAG_TITLE) as BagType[]).map((key) => {
                const on = type === key;
                return (
                  <button
                    key={key}
                    onClick={() => setType(key)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      border: `1px solid ${on ? '#14b8a6' : '#e4eaf1'}`,
                      background: on ? '#f4faf9' : '#fff',
                      borderRadius: 9,
                      padding: '8px 4px',
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                    }}
                  >
                    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={on ? '#0f766e' : '#8494a8'} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                      {TYPE_ICONS[key]}
                    </svg>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: on ? '#0f766e' : '#57677c', textAlign: 'center', lineHeight: 1.2 }}>{BAG_TITLE[key]}</span>
                  </button>
                );
              })}
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
                {bagStyle.hard && (
                  <div style={{ position: 'absolute', left: '50%', top: -13, transform: 'translateX(-50%)', width: '34%', height: 16, border: '3px solid #94a3b8', borderBottom: 'none', borderRadius: '8px 8px 0 0' }} />
                )}
                {bagStyle.soft && (
                  <div style={{ position: 'absolute', left: '50%', top: -15, transform: 'translateX(-50%)', width: '52%', height: 18, border: '3px solid #94a3b8', borderBottom: 'none', borderRadius: '999px 999px 0 0' }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: bagStyle.fill, border: `2px solid ${bagStyle.stroke}`, borderRadius: bagStyle.radius, zIndex: 1 }} />
                {bagStyle.ribs && <div style={{ position: 'absolute', left: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)', zIndex: 2 }} />}
                {bagStyle.ribs && <div style={{ position: 'absolute', right: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)', zIndex: 2 }} />}
                {bagStyle.soft && <div style={{ position: 'absolute', left: '16%', right: '16%', bottom: '14%', height: '28%', border: '2px solid rgba(15,28,46,.14)', borderRadius: 8, zIndex: 2 }} />}
                {bagStyle.straps && <div style={{ position: 'absolute', left: 0, right: 0, top: '22%', height: 6, background: 'rgba(15,28,46,.13)', zIndex: 2 }} />}
                {bagStyle.straps && <div style={{ position: 'absolute', left: 0, right: 0, bottom: '22%', height: 6, background: 'rgba(15,28,46,.13)', zIndex: 2 }} />}
                {bagStyle.hard && <div style={{ position: 'absolute', left: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569', zIndex: 2 }} />}
                {bagStyle.hard && <div style={{ position: 'absolute', right: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569', zIndex: 2 }} />}
                <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 10, fontWeight: 700, color: bagStyle.ink, whiteSpace: 'nowrap', zIndex: 3 }}>{boxLabel}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
                <div style={{ position: 'relative', width: depthW, height: boxH }}>
                  {bagStyle.hard && <div style={{ position: 'absolute', left: '50%', top: -14, transform: 'translateX(-50%)', width: 4, height: 16, borderRadius: 2, background: '#94a3b8' }} />}
                  <div style={{ position: 'absolute', inset: 0, background: bagStyle.sideFill, border: `2px solid ${bagStyle.stroke}`, borderRadius: bagStyle.radius }} />
                  {bagStyle.hard && <div style={{ position: 'absolute', left: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />}
                  {bagStyle.hard && <div style={{ position: 'absolute', right: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />}
                  <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 10, fontWeight: 700, color: bagStyle.ink, whiteSpace: 'nowrap' }}>{conv(depth)}</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: 11, color: '#7a8798', textAlign: 'center', marginBottom: 14 }}>
              {fits ? `Fits most airline ${type === 'personal' ? 'under-seat limits' : type === 'checked' ? 'checked bag limits' : 'cabin sizers'}` : `Too large for most ${type === 'personal' ? 'under-seat limits' : type === 'checked' ? 'checked bag limits' : 'cabin sizers'}`}
            </div>

            <button onClick={goToSizeChecker} className="btn-primary" style={{ width: '100%', padding: 13, background: '#fbbf47', color: '#3a2a05', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 800, fontFamily: 'inherit', cursor: 'pointer' }}>
              Check Baggage Size
            </button>
          </div>

          <div id="airlines" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, letterSpacing: '-.01em' }}>Popular Airlines</h3>
              <span style={{ fontSize: 11, color: '#8494a8' }}>{fitSummary}</span>
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
                  <AirlineLogo code={a.code} website={a.website} width={40} height={40} radius={8} fontSize={10} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{a.name}</span>
                      <span style={{ fontSize: 10, fontWeight: 800, color: a.fitColor, background: a.fitBg, borderRadius: 999, padding: '3px 9px', whiteSpace: 'nowrap' }}>{a.fitLabel}</span>
                      <Link href={`/airlines/${airlineSlug(a.name)}`} style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 700, whiteSpace: 'nowrap' }}>
                        Details →
                      </Link>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 18px', fontSize: 10.5, color: '#7a8798', lineHeight: 1.5 }}>
                      <span style={{ minWidth: 0 }}>
                        Carry-on (H×W×D)
                        <br />
                        <b style={{ display: 'block', color: '#0f1c2e', fontWeight: 600, whiteSpace: 'nowrap' }}>{a.cabin}</b>
                      </span>
                      <span style={{ minWidth: 0, whiteSpace: 'nowrap' }}>
                        Max weight
                        <br />
                        <b style={{ display: 'block', color: '#0f1c2e', fontWeight: 600 }}>{a.cabinKg}</b>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', paddingTop: 16, borderTop: '1px solid #f0f2f5', marginTop: 4 }}>
              <Link href="/airlines" style={{ fontSize: 12, fontWeight: 700 }}>
                View All Airlines &amp; Baggage Policies →
              </Link>
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
          <Link href="/size-checker" style={{ display: 'inline-block', padding: '11px 24px', background: '#fbbf47', color: '#3a2a05', borderRadius: 9, fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
            Check eligibility
          </Link>
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
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 18px', textAlign: 'center', fontSize: 24, fontWeight: 800, letterSpacing: '-.02em' }}>Understanding Luggage Size Requirements</h2>
          <p style={{ margin: '0 0 16px', fontSize: 13.5, lineHeight: 1.75, color: '#3d4759' }}>
            Airline baggage rules are one of the most frequent sources of stress at the airport. Gate agents measure bags, and an oversized carry-on can turn into a fee that costs more than the ticket. Knowing your dimensions before you leave home removes that risk entirely.
          </p>
          <p style={{ margin: '0 0 16px', fontSize: 13.5, lineHeight: 1.75, color: '#3d4759' }}>
            There are no universal luggage size rules, but most airlines cluster around the same numbers: 56 × 36 × 23 cm for a cabin bag, 158 cm total for a checked bag, 23 kg in economy and up to 32 kg in business. Budget carriers in Europe apply stricter limits, so the airline you are flying always has the final word.
          </p>
          <p style={{ margin: '0 0 26px', fontSize: 13.5, lineHeight: 1.75, color: '#3d4759' }}>
            The luggage guide covers standard suitcase classes, how bags are measured at the airport, soft-sided versus hard-shell shells and what excess and oversize fees usually cost.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/luggage-guide" style={{ display: 'inline-block', padding: '12px 26px', background: '#fbbf47', color: '#3a2a05', borderRadius: 9, fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
              Read the luggage guide
            </Link>
            <Link href="/size-checker" style={{ display: 'inline-block', padding: '12px 26px', background: '#fff', border: '1px solid #e4eaf1', color: '#0f1c2e', borderRadius: 9, fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
              Check your bag size
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
        Personal luggage advice? <Link href="/airlines">Talk to our travel team</Link>
      </div>

      <Footer maxWidth={1200} gap={32} logoSize={24} logoIconSize={13} showWordmark copyrightSize={11} columns={FOOTER_COLUMNS} />
    </div>
  );
}
