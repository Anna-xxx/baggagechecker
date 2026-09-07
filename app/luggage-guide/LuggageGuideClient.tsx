'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type LuggageClass = {
  title: string;
  trip: string;
  use: string;
  note: string;
  w: number;
  h: number;
  d: number;
  fill: string;
  sideFill: string;
  stroke: string;
  ink: string;
  soft: boolean;
  checked: boolean;
};

function cls(
  title: string,
  trip: string,
  use: string,
  w: number,
  h: number,
  d: number,
  note: string,
  fill: string,
  sideFill: string,
  stroke: string,
  ink: string,
  soft = false,
  checked = false
): LuggageClass {
  return { title, trip, use, note, w, h, d, fill, sideFill, stroke, ink, soft, checked };
}

const CLASSES: LuggageClass[] = [
  cls('Personal item', 'Any trip', 'Under the seat', 30, 40, 15, 'A handbag, laptop bag or small backpack. Almost never weighed, but it has to fit under the seat in front of you.', '#e7effc', '#d5e3fb', '#93b4ef', '#1b4694', true),
  cls('Cabin bag', '1–3 days', 'Overhead bin', 40, 55, 23, 'The standard carry-on size accepted by most airlines. Budget carriers cut this down, so check before you fly.', '#cff5ec', '#b8efe1', '#5eddc4', '#0b5f56'),
  cls('Medium suitcase', '1–2 weeks', 'Checked', 45, 67, 27, 'The most common checked bag. Comfortably inside the 158 cm total limit and usually under 23 kg when packed.', '#fdf1dc', '#f8e3bd', '#e9b969', '#7a5406', false, true),
  cls('Large suitcase', '2+ weeks', 'Checked', 52, 78, 32, 'Close to the 158 cm total limit. Easy to exceed the weight allowance before you run out of space.', '#fdecec', '#fbdada', '#f0a9a9', '#8d2f2f', false, true),
];

const K = 1.55;

const FEES = [
  { label: 'Extra checked bag (online)', value: '$45 – $90' },
  { label: 'Extra checked bag (airport)', value: '$75 – $140' },
  { label: 'Overweight 23–32 kg', value: '$100' },
  { label: 'Oversize over 158 cm', value: '$150 – $200' },
  { label: 'Gate-checked cabin bag', value: '$70 – $120' },
];

const STEPS = [
  {
    n: 1,
    title: 'Measure Length (Longest Side)',
    text: 'Place your suitcase on a flat surface. Identify the longest side of your luggage and measure from end to end using your measuring tape. This is typically the side where the luggage opens.',
    noteLabel: 'Pro Tip:',
    note: 'Always measure at the widest point, including any protruding parts like wheels or external pockets.',
    noteBg: '#fdf8ee',
    noteBorder: '#e0a11a',
  },
  {
    n: 2,
    title: 'Measure Width',
    text: 'Turn your luggage to face you and measure from one side to the other at the widest point. Include any side pockets, zippers, or external features in your measurement.',
    noteLabel: 'Remember:',
    note: "Soft-sided luggage can expand, so measure when it's at its fullest capacity.",
    noteBg: '#e7effc',
    noteBorder: '#2563eb',
  },
  {
    n: 3,
    title: 'Measure Height (Depth)',
    text: 'Measure from the bottom (including wheels) to the top (including the handle when fully extended). This is the most critical measurement as it often determines if your bag fits in overhead compartments.',
    noteLabel: 'Important:',
    note: 'Include wheels and fully extended handles in your height measurement — airlines measure the total external dimensions.',
    noteBg: '#fdecec',
    noteBorder: '#dc4c4c',
  },
  {
    n: 4,
    title: 'Weigh Your Luggage',
    text: 'First, weigh yourself on a bathroom scale, then weigh yourself holding the luggage. Subtract your weight from the combined weight to get your luggage weight. For more accuracy, use a luggage scale if available.',
    noteLabel: 'Tip:',
    note: 'Weigh your empty luggage first to know how much packing space you have for items.',
    noteBg: '#e6f6ee',
    noteBorder: '#15803d',
  },
];

function ClassIllustration({ c, cv }: { c: LuggageClass; cv: (v: number) => number }) {
  const drawW = Math.round(c.w * K);
  const drawH = Math.round(c.h * K);
  const drawD = Math.max(24, Math.round(c.d * K));
  const radius = c.soft ? 18 : 11;
  return (
    <div style={{ background: '#f8fafc', borderRadius: 11, padding: '18px 14px 14px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 14, minHeight: 170 }}>
      <div style={{ position: 'relative', width: drawW, height: drawH }}>
        {!c.soft && <div style={{ position: 'absolute', left: '50%', top: -17, transform: 'translateX(-50%)', width: '38%', height: 20, border: '5px solid #94a3b8', borderBottom: 'none', borderRadius: '11px 11px 0 0' }} />}
        {c.soft && <div style={{ position: 'absolute', left: '50%', top: -18, transform: 'translateX(-50%)', width: '56%', height: 22, border: '4px solid #94a3b8', borderBottom: 'none', borderRadius: '999px 999px 0 0' }} />}
        <div style={{ position: 'absolute', inset: 0, background: c.fill, border: `2px solid ${c.stroke}`, borderRadius: radius }} />
        {!c.soft && <div style={{ position: 'absolute', left: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />}
        {!c.soft && <div style={{ position: 'absolute', right: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />}
        {c.soft && <div style={{ position: 'absolute', left: '16%', right: '16%', bottom: '14%', height: '28%', border: '2px solid rgba(15,28,46,.14)', borderRadius: 8 }} />}
        {c.checked && <div style={{ position: 'absolute', left: 0, right: 0, top: '22%', height: 7, background: 'rgba(15,28,46,.13)' }} />}
        {c.checked && <div style={{ position: 'absolute', left: 0, right: 0, bottom: '22%', height: 7, background: 'rgba(15,28,46,.13)' }} />}
        {c.checked && <div style={{ position: 'absolute', left: -1, bottom: -1, width: 18, height: 18, borderLeft: `4px solid ${c.stroke}`, borderBottom: `4px solid ${c.stroke}`, borderRadius: '0 0 0 11px' }} />}
        {c.checked && <div style={{ position: 'absolute', right: -1, bottom: -1, width: 18, height: 18, borderRight: `4px solid ${c.stroke}`, borderBottom: `4px solid ${c.stroke}`, borderRadius: '0 0 11px 0' }} />}
        {!c.soft && <div style={{ position: 'absolute', left: '16%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />}
        {!c.soft && <div style={{ position: 'absolute', right: '16%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />}
        <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 11.5, fontWeight: 700, color: c.ink, whiteSpace: 'nowrap' }}>
          {cv(c.w)} × {cv(c.h)}
        </span>
      </div>
      <div style={{ position: 'relative', width: drawD, height: drawH }}>
        {!c.soft && <div style={{ position: 'absolute', left: '50%', top: -17, transform: 'translateX(-50%)', width: 5, height: 20, borderRadius: 3, background: '#94a3b8' }} />}
        <div style={{ position: 'absolute', inset: 0, background: c.sideFill, border: `2px solid ${c.stroke}`, borderRadius: radius }} />
        {!c.soft && <div style={{ position: 'absolute', left: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />}
        {!c.soft && <div style={{ position: 'absolute', right: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />}
        <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 11, fontWeight: 700, color: c.ink, whiteSpace: 'nowrap' }}>{cv(c.d)}</span>
      </div>
    </div>
  );
}

export function LuggageGuideClient() {
  const [metric, setMetric] = useState(true);

  const cv = (v: number) => (metric ? v : Math.round(v / 2.54));
  const len = (v: number) => `${cv(v)} ${metric ? 'cm' : 'in'}`;

  return (
    <div style={{ width: '100%', background: '#f7f8f9' }}>
      <Header />

      <main id="top" style={{ maxWidth: 1200, margin: '0 auto', padding: '34px 24px 8px' }}>
        <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(26px,3.6vw,34px)', fontWeight: 800, letterSpacing: '-.03em' }}>Luggage guide</h1>
        <p style={{ margin: '0 0 26px', maxWidth: 680, fontSize: 14, lineHeight: 1.75, color: '#57677c' }}>
          Standard suitcase dimensions, the limits each airline publishes, and how bags are actually measured at the gate. Not sure how to measure? Jump to <a href="#how-to-measure">how to measure your bag</a>. If you
          already know your dimensions, run them through the <a href="#checker-cta">size checker</a>.
        </p>

        {/* Standard luggage classes */}
        <section id="classes" style={{ marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>Standard luggage classes</h2>
            <button
              onClick={() => setMetric((m) => !m)}
              className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 10, padding: '9px 14px', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#0f1c2e', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth={2} strokeLinecap="round">
                <path d="M4 8h14l-3-3M20 16H6l3 3" />
              </svg>
              {metric ? 'cm / kg' : 'in / lb'}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 18 }}>
            {CLASSES.map((c) => (
              <div key={c.title} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.015em' }}>{c.title}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: '#8494a8', whiteSpace: 'nowrap' }}>{c.trip}</span>
                </div>
                <ClassIllustration c={c} cv={cv} />
                <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, fontSize: 12.5 }}>
                    <span style={{ color: '#57677c' }}>Dimensions</span>
                    <span style={{ fontWeight: 800, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                      {cv(c.w)} × {cv(c.h)} × {len(c.d)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, fontSize: 12.5 }}>
                    <span style={{ color: '#57677c' }}>Typical use</span>
                    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{c.use}</span>
                  </div>
                </div>
                <p style={{ margin: '14px 0 0', fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>{c.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Link out to the airline directory */}
        <section id="limits" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '26px 28px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 26 }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 800, letterSpacing: '-.02em' }}>Limits for a specific airline</h2>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#57677c' }}>Carry-on, personal item and checked baggage allowances are listed per carrier in the airline directory, with fees and cabin-class differences.</p>
          </div>
          <Link
            href="/airlines"
            className="cta-link"
            style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fbbf47', color: '#3a2a05', borderRadius: 10, padding: '13px 20px', fontSize: 13, fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            View All Airlines &amp; Baggage Policies
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a2a05" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </section>

        {/* How to measure your bag */}
        <section id="how-to-measure" style={{ marginBottom: 26, scrollMarginTop: 80 }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 800, letterSpacing: '-.025em' }}>How to measure your bag</h2>

          <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 16 }}>
            <h3 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 800, letterSpacing: '-.01em' }}>What to measure</h3>
            <p style={{ margin: '0 0 8px', fontSize: 12.5, lineHeight: 1.7, color: '#7a8798' }}>Airlines quote limits in this order: width × height × depth. Match your numbers to theirs before you pack.</p>
            <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: '1 1 260px', minWidth: 0, maxWidth: 340 }}>
                <svg viewBox="0 0 260 210" width="100%" role="img" aria-label="Diagram showing where to measure width, height and depth of a suitcase">
                  <defs>
                    <marker id="guideDimArrow" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
                      <path d="M0 0 L10 5 L0 10 z" fill="#94a3b8" />
                    </marker>
                  </defs>
                  <rect x={66} y={48} width={112} height={118} rx={14} fill="#cff5ec" stroke="#5eddc4" strokeWidth={2} />
                  <rect x={66} y={80} width={112} height={10} fill="#fbbf47" />
                  <path d="M104 48v-14a6 6 0 0 1 6-6h24a6 6 0 0 1 6 6v14" fill="none" stroke="#94a3b8" strokeWidth={4} strokeLinecap="round" />
                  <rect x={104} y={134} width={36} height={9} rx={4} fill="#475569" opacity={0.28} />
                  <circle cx={86} cy={172} r={6} fill="#475569" />
                  <circle cx={158} cy={172} r={6} fill="#475569" />
                  <line x1={66} y1={196} x2={178} y2={196} stroke="#94a3b8" strokeWidth={1.6} markerStart="url(#guideDimArrow)" markerEnd="url(#guideDimArrow)" />
                  <text x={122} y={190} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={12} fontWeight={700} fill="#57677c">
                    Width
                  </text>
                  <line x1={44} y1={34} x2={44} y2={178} stroke="#94a3b8" strokeWidth={1.6} markerStart="url(#guideDimArrow)" markerEnd="url(#guideDimArrow)" />
                  <text x={36} y={106} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={12} fontWeight={700} fill="#57677c" transform="rotate(-90 36 106)">
                    Height
                  </text>
                  <rect x={204} y={48} width={40} height={118} rx={12} fill="#b8efe1" stroke="#5eddc4" strokeWidth={2} />
                  <circle cx={214} cy={172} r={6} fill="#475569" />
                  <circle cx={234} cy={172} r={6} fill="#475569" />
                  <line x1={204} y1={196} x2={244} y2={196} stroke="#94a3b8" strokeWidth={1.6} markerStart="url(#guideDimArrow)" markerEnd="url(#guideDimArrow)" />
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
              <div style={{ flex: '1 1 240px', minWidth: 0, display: 'grid', gap: 9 }}>
                <span style={{ fontSize: 12.5, color: '#57677c' }}>
                  <b>Width</b> — at the widest point of the shell
                </span>
                <span style={{ fontSize: 12.5, color: '#57677c' }}>
                  <b>Height</b> — floor to top of extended handle
                </span>
                <span style={{ fontSize: 12.5, color: '#57677c' }}>
                  <b>Depth</b> — front to back, wheels included
                </span>
                <span style={{ fontSize: 12.5, color: '#57677c' }}>
                  <b>Weight</b> — weigh the bag fully packed
                </span>
              </div>
            </div>
          </section>

          <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '22px 24px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 15, fontWeight: 800, letterSpacing: '-.01em', marginBottom: 18 }}>
              <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e0a11a" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6M10 21h4" />
                <path d="M12 3a6 6 0 0 0-3 11v1h6v-1a6 6 0 0 0-3-11z" />
              </svg>
              What You&apos;ll Need
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ flex: 'none', display: 'flex', width: 32, height: 32, borderRadius: 9, background: '#e3f5f2', alignItems: 'center', justifyContent: 'center' }}>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9h18v6H3z" />
                    <path d="M7 9v3M12 9v3M17 9v3" />
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>Measuring Tape</div>
                  <div style={{ fontSize: 12, color: '#7a8798' }}>Or rigid ruler</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ flex: 'none', display: 'flex', width: 32, height: 32, borderRadius: 9, background: '#fdf1dc', alignItems: 'center', justifyContent: 'center' }}>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e0a11a" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v16M6 20h12" />
                    <path d="M4 9h16l-3 5H7z" />
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>Digital Scale</div>
                  <div style={{ fontSize: 12, color: '#7a8798' }}>Bathroom scale works</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ flex: 'none', display: 'flex', width: 32, height: 32, borderRadius: 9, background: '#e7effc', alignItems: 'center', justifyContent: 'center' }}>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 16h18" />
                    <path d="M6 16V9h12v7" />
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>Flat Surface</div>
                  <div style={{ fontSize: 12, color: '#7a8798' }}>For accurate measurement</div>
                </div>
              </div>
            </div>
          </section>

          <div style={{ display: 'grid', gap: 16 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <span style={{ flex: 'none', display: 'flex', width: 26, height: 26, borderRadius: '50%', background: '#e3f5f2', color: '#0f766e', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{s.n}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.01em' }}>{s.title}</span>
                </div>
                <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.75, color: '#57677c' }}>{s.text}</p>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: s.noteBg, borderLeft: `3px solid ${s.noteBorder}`, borderRadius: '0 9px 9px 0', padding: '12px 14px' }}>
                  <span style={{ fontSize: 12, lineHeight: 1.6, color: '#57677c' }}>
                    <b style={{ color: s.noteBorder }}>{s.noteLabel}</b> {s.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common mistakes */}
        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 34 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 16, fontWeight: 800, letterSpacing: '-.015em', marginBottom: 18 }}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc4c4c" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4l9 16H3z" />
              <path d="M12 10v4M12 17h.01" />
            </svg>
            Common Measurement Mistakes to Avoid
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 20 }}>
            <div style={{ background: '#fdecec', borderRadius: 11, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 800, color: '#b3403f', marginBottom: 12 }}>
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
                Don&apos;t Forget:
              </div>
              <div style={{ display: 'grid', gap: 8, fontSize: 12.5, color: '#57677c', lineHeight: 1.6 }}>
                <span>Wheels and handles in height measurement</span>
                <span>External pockets and zippers</span>
                <span>Measuring at the widest/longest points</span>
                <span>Accounting for luggage expansion when packed</span>
              </div>
            </div>
            <div style={{ background: '#e6f6ee', borderRadius: 11, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 800, color: '#15803d', marginBottom: 12 }}>
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4.5 4.5L19 7" />
                </svg>
                Always Remember:
              </div>
              <div style={{ display: 'grid', gap: 8, fontSize: 12.5, color: '#57677c', lineHeight: 1.6 }}>
                <span>Use a flat, level surface</span>
                <span>Measure in centimeters for international travel</span>
                <span>Round up to the nearest centimeter</span>
                <span>Check measurements twice for accuracy</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sizer + fees */}
        <section id="sizer" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 18, marginBottom: 26 }}>
          <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24 }}>
            <h2 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 800, letterSpacing: '-.02em' }}>How bags are measured at the airport</h2>
            <p style={{ margin: '0 0 18px', fontSize: 13, lineHeight: 1.75, color: '#57677c' }}>
              Gates and check-in desks use a metal sizer frame. The bag has to drop in freely — if you have to push or the handle catches the rim, it counts as oversized and goes into the hold for a fee.
            </p>
            <div style={{ background: '#f8fafc', borderRadius: 11, padding: 24, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 190, height: 150, border: '5px solid #cbd5e1', borderRadius: 10, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 12 }}>
                <span style={{ position: 'absolute', left: 12, top: 10, fontSize: 10.5, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: '#a9b4c2' }}>Sizer</span>
                <div style={{ position: 'relative', width: 86, height: 104 }}>
                  <div style={{ position: 'absolute', left: '50%', top: -13, transform: 'translateX(-50%)', width: '38%', height: 16, border: '4px solid #94a3b8', borderBottom: 'none', borderRadius: '9px 9px 0 0' }} />
                  <div style={{ position: 'absolute', inset: 0, background: '#cff5ec', border: '2px solid #5eddc4', borderRadius: 10 }} />
                  <div style={{ position: 'absolute', left: '12%', bottom: -7, width: 10, height: 10, borderRadius: '50%', background: '#475569' }} />
                  <div style={{ position: 'absolute', right: '12%', bottom: -7, width: 10, height: 10, borderRadius: '50%', background: '#475569' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 9, marginTop: 18, fontSize: 12.5, color: '#57677c', lineHeight: 1.6 }}>
              <span>Measure your bag packed, not empty — soft sides expand.</span>
              <span>Height is taken from the floor to the top of the extended handle.</span>
              <span>External pockets and wheels count towards depth.</span>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24 }}>
            <h2 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 800, letterSpacing: '-.02em' }}>Excess &amp; oversize fees</h2>
            <p style={{ margin: '0 0 18px', fontSize: 13, lineHeight: 1.75, color: '#57677c' }}>Typical ranges across major carriers. Paying online before departure is almost always cheaper than at the airport.</p>
            <div style={{ background: '#f8fafc', borderRadius: 11, padding: '4px 16px' }}>
              {FEES.map((f) => (
                <div key={f.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '13px 0', borderBottom: '1px solid #eef2f6' }}>
                  <span style={{ fontSize: 12.5, color: '#57677c' }}>{f.label}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, whiteSpace: 'nowrap' }}>{f.value}</span>
                </div>
              ))}
            </div>
            <p style={{ margin: '16px 0 0', fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>A gate-checked cabin bag is usually the most expensive mistake — it costs more than a hold bag booked in advance.</p>
          </div>
        </section>

        {/* Requirements text */}
        <section id="requirements" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '26px 28px', marginBottom: 26 }}>
          <h2 style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>Understanding luggage size requirements</h2>
          <p style={{ margin: '0 0 18px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>
            Airline baggage rules are one of the most frequent sources of stress at the airport. Gate agents measure bags, and an oversized carry-on can turn into a fee that costs more than the ticket. Knowing your
            dimensions before you leave home removes that risk entirely.
          </p>

          <h3 style={{ margin: '0 0 8px', fontSize: 14.5, fontWeight: 800 }}>Carry-on luggage size restrictions</h3>
          <p style={{ margin: '0 0 8px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>
            Most major airlines allow one cabin bag per passenger, typically 22 × 14 × 9 inches (56 × 36 × 23 centimetres), including wheels and handles. Budget airlines in Europe such as Ryanair, Wizz Air and easyJet
            apply stricter limits, so check your airline before flying.
          </p>
          <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>
            Per-carrier numbers are listed in the <Link href="/airlines">airline directory</Link>.
          </p>

          <h3 style={{ margin: '0 0 8px', fontSize: 14.5, fontWeight: 800 }}>Checked baggage size &amp; weight limits</h3>
          <ul style={{ margin: '0 0 12px', paddingLeft: 20, fontSize: 13, lineHeight: 1.9, color: '#3d4759' }}>
            <li>62 linear inches (158 cm) for length + width + height</li>
            <li>Weight limits of 23 kg for economy class and up to 32 kg for business and first class</li>
          </ul>
          <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>Some airlines charge overweight baggage fees, which can range from $50 to $200 per bag depending on route.</p>

          <h3 style={{ margin: '0 0 8px', fontSize: 14.5, fontWeight: 800 }}>Soft-sided vs. hard-sided bags</h3>
          <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.75, color: '#3d4759' }}>Soft-sided luggage compresses slightly, which can help it pass a sizer, while hard-shell suitcases cannot flex. If you fly budget carriers often, a soft-sided bag is the safer choice.</p>

          <h3 style={{ margin: '0 0 8px', fontSize: 14.5, fontWeight: 800 }}>Before you fly</h3>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.9, color: '#3d4759' }}>
            <li>Measure and weigh every bag the night before</li>
            <li>Check your airline&apos;s own size and weight rules</li>
            <li>Weigh your suitcase with a portable luggage scale</li>
            <li>Pack heavier items in your checked bag where allowed</li>
          </ul>
        </section>

        {/* CTA */}
        <section id="checker-cta" style={{ background: '#fdf8ee', border: '1px solid #f3ebdb', borderRadius: 14, padding: 'clamp(30px,4vw,44px) 28px', textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(19px,2.4vw,23px)', fontWeight: 800, letterSpacing: '-.025em' }}>Know your dimensions? Check them against your airline</h2>
          <p style={{ margin: '0 auto 22px', maxWidth: 560, fontSize: 13.5, lineHeight: 1.75, color: '#57677c' }}>Enter width, height, depth and weight once, pick up to three airlines and see whether your bag passes as carry-on, personal item or checked baggage.</p>
          <Link
            href="/size-checker"
            className="cta-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fbbf47', color: '#3a2a05', borderRadius: 10, padding: '13px 24px', fontSize: 13.5, fontWeight: 800, textDecoration: 'none' }}
          >
            Open the size checker
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a2a05" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </section>
      </main>

      <Footer maxWidth={1200} gap={32} logoSize={30} logoIconSize={18} copyrightSize={11.5} copyrightLines={['© 2026 BaggageChecker.', 'All rights reserved.']} />
    </div>
  );
}
