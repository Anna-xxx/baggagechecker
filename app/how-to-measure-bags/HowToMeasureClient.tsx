'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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

const FAQS = [
  {
    question: 'What units should I use to measure my luggage?',
    answer: 'Most international airlines use centimeters (cm) and kilograms (kg). US airlines may use inches and pounds. Our tool supports both metric and imperial units for easy conversion.',
  },
  {
    question: 'Do I include wheels and handles in my measurements?',
    answer: 'Yes, always include wheels, handles (when extended), and any external pockets in your measurements. Airlines measure the total external dimensions of your luggage.',
  },
  {
    question: 'How accurate do my measurements need to be?',
    answer: 'Be as accurate as possible and round up to the nearest centimeter. Airlines are strict about size limits, and being even 1cm over can result in additional fees or having to check your bag.',
  },
  {
    question: 'What if my soft-sided luggage can expand?',
    answer: "Measure your soft-sided luggage when it's fully packed to its maximum capacity. The expandable zippers and flexible sides can add significant dimensions when packed full.",
  },
];

export function HowToMeasureClient() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div style={{ width: '100%' }}>
      <Header />

      <section style={{ background: '#f7f8f9', borderBottom: '1px solid #edf0f3', padding: '48px 24px 40px', textAlign: 'center' }}>
        <h1 style={{ margin: '0 auto 14px', maxWidth: 760, fontSize: 'clamp(26px,3.6vw,34px)', fontWeight: 800, letterSpacing: '-.03em' }}>How to Measure Bag Dimensions: Complete Guide</h1>
        <p style={{ margin: '0 auto 24px', maxWidth: 560, fontSize: 14, lineHeight: 1.75, color: '#57677c' }}>
          Learn how to measure your luggage dimensions accurately at home. Follow our step-by-step guide to ensure your bag meets airline carry-on requirements and avoid unexpected fees.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {[
            { label: 'Accurate Measurements', icon: (<><path d="M3 9h18v6H3z" /><path d="M7 9v3M12 9v3M17 9v3" /></>) },
            { label: 'Airline Compliant', icon: (<><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.7 2.5L16 9.5" /></>) },
            { label: 'Weight & Dimensions', icon: (<><path d="M12 4v16M6 20h12" /><path d="M4 9h16l-3 5H7z" /></>) },
          ].map((pill) => (
            <span key={pill.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#e3f5f2', color: '#0f766e', border: '1px solid #c6ebe5', borderRadius: 999, padding: '7px 14px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                {pill.icon}
              </svg>
              {pill.label}
            </span>
          ))}
        </div>
      </section>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '28px 24px 8px' }}>
        {/* What you'll need */}
        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '22px 24px', marginBottom: 34 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 15, fontWeight: 800, letterSpacing: '-.01em', marginBottom: 18 }}>
            <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e0a11a" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18h6M10 21h4" />
              <path d="M12 3a6 6 0 0 0-3 11v1h6v-1a6 6 0 0 0-3-11z" />
            </svg>
            What You&apos;ll Need
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 16 }}>
            {[
              { title: 'Measuring Tape', sub: 'Or rigid ruler', bg: '#e3f5f2', color: '#0d9488', icon: (<><path d="M3 9h18v6H3z" /><path d="M7 9v3M12 9v3M17 9v3" /></>) },
              { title: 'Digital Scale', sub: 'Bathroom scale works', bg: '#fdf1dc', color: '#e0a11a', icon: (<><path d="M12 4v16M6 20h12" /><path d="M4 9h16l-3 5H7z" /></>) },
              { title: 'Flat Surface', sub: 'For accurate measurement', bg: '#e7effc', color: '#2563eb', icon: (<><path d="M3 16h18" /><path d="M6 16V9h12v7" /></>) },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ flex: 'none', display: 'flex', width: 32, height: 32, borderRadius: 9, background: item.bg, alignItems: 'center', justifyContent: 'center' }}>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#7a8798' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Visual guide */}
        <section style={{ marginBottom: 34 }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 800, letterSpacing: '-.025em' }}>Visual Measurement Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 20 }}>
            <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
              <div style={{ background: '#f8fafc', borderRadius: 11, padding: '20px 12px' }}>
                <svg aria-hidden="true" viewBox="0 0 320 180" width="100%" role="img" aria-label="Three suitcase sizes with width and height dimensions">
                  <defs>
                    <marker id="mArr" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
                      <path d="M0 0 L10 5 L0 10 z" fill="#94a3b8" />
                    </marker>
                  </defs>
                  <g>
                    <rect x={24} y={72} width={54} height={62} rx={9} fill="#cff5ec" stroke="#5eddc4" strokeWidth={2} />
                    <path d="M42 72v-9a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v9" fill="none" stroke="#94a3b8" strokeWidth={3} />
                    <circle cx={36} cy={140} r={5} fill="#475569" />
                    <circle cx={66} cy={140} r={5} fill="#475569" />
                    <line x1={24} y1={158} x2={78} y2={158} stroke="#94a3b8" strokeWidth={1.5} markerStart="url(#mArr)" markerEnd="url(#mArr)" />
                    <text x={51} y={174} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={10} fontWeight={700} fill="#57677c">
                      Cabin
                    </text>
                  </g>
                  <g>
                    <rect x={118} y={52} width={64} height={82} rx={10} fill="#cff5ec" stroke="#5eddc4" strokeWidth={2} />
                    <path d="M140 52v-11a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v11" fill="none" stroke="#94a3b8" strokeWidth={3} />
                    <circle cx={131} cy={140} r={5} fill="#475569" />
                    <circle cx={169} cy={140} r={5} fill="#475569" />
                    <line x1={118} y1={158} x2={182} y2={158} stroke="#94a3b8" strokeWidth={1.5} markerStart="url(#mArr)" markerEnd="url(#mArr)" />
                    <text x={150} y={174} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={10} fontWeight={700} fill="#57677c">
                      Medium
                    </text>
                  </g>
                  <g>
                    <rect x={222} y={30} width={74} height={104} rx={11} fill="#cff5ec" stroke="#5eddc4" strokeWidth={2} />
                    <path d="M248 30v-13a5 5 0 0 1 5-5h12a5 5 0 0 1 5 5v13" fill="none" stroke="#94a3b8" strokeWidth={3} />
                    <circle cx={234} cy={140} r={5} fill="#475569" />
                    <circle cx={284} cy={140} r={5} fill="#475569" />
                    <line x1={222} y1={158} x2={296} y2={158} stroke="#94a3b8" strokeWidth={1.5} markerStart="url(#mArr)" markerEnd="url(#mArr)" />
                    <text x={259} y={174} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={10} fontWeight={700} fill="#57677c">
                      Large
                    </text>
                  </g>
                  <line x1={308} y1={12} x2={308} y2={140} stroke="#94a3b8" strokeWidth={1.5} markerStart="url(#mArr)" markerEnd="url(#mArr)" />
                  <text x={304} y={78} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={10} fontWeight={700} fill="#57677c" transform="rotate(-90 304 78)">
                    Height
                  </text>
                </svg>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, margin: '18px 0 8px' }}>Understanding Dimensions</div>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: '#7a8798' }}>Length (L) is the longest side, Width (W) is from side to side, and Height (H) includes wheels and handles.</p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
              <div style={{ background: '#f8fafc', borderRadius: 11, padding: '20px 12px' }}>
                <svg aria-hidden="true" viewBox="0 0 320 180" width="100%" role="img" aria-label="Tape measure held along the height, width and depth of a suitcase">
                  <g>
                    <rect x={30} y={34} width={74} height={102} rx={11} fill="#cff5ec" stroke="#5eddc4" strokeWidth={2} />
                    <path d="M56 34V22a5 5 0 0 1 5-5h12a5 5 0 0 1 5 5v12" fill="none" stroke="#94a3b8" strokeWidth={3} />
                    <circle cx={44} cy={142} r={5} fill="#475569" />
                    <circle cx={90} cy={142} r={5} fill="#475569" />
                    <rect x={60} y={34} width={12} height={102} rx={3} fill="#fbbf47" />
                    <path d="M62 44h8M62 56h8M62 68h8M62 80h8M62 92h8M62 104h8M62 116h8M62 128h8" stroke="#b98107" strokeWidth={1.4} />
                    <text x={67} y={166} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={11} fontWeight={700} fill="#57677c">
                      Height
                    </text>
                  </g>
                  <g>
                    <rect x={130} y={34} width={74} height={102} rx={11} fill="#cff5ec" stroke="#5eddc4" strokeWidth={2} />
                    <path d="M156 34V22a5 5 0 0 1 5-5h12a5 5 0 0 1 5 5v12" fill="none" stroke="#94a3b8" strokeWidth={3} />
                    <circle cx={144} cy={142} r={5} fill="#475569" />
                    <circle cx={190} cy={142} r={5} fill="#475569" />
                    <rect x={130} y={78} width={74} height={12} rx={3} fill="#fbbf47" />
                    <path d="M140 80v8M152 80v8M164 80v8M176 80v8M188 80v8" stroke="#b98107" strokeWidth={1.4} />
                    <text x={167} y={166} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={11} fontWeight={700} fill="#57677c">
                      Width
                    </text>
                  </g>
                  <g>
                    <rect x={242} y={34} width={34} height={102} rx={10} fill="#b8efe1" stroke="#5eddc4" strokeWidth={2} />
                    <rect x={257} y={20} width={4} height={14} rx={2} fill="#94a3b8" />
                    <circle cx={248} cy={142} r={5} fill="#475569" />
                    <circle cx={270} cy={142} r={5} fill="#475569" />
                    <rect x={242} y={78} width={34} height={12} rx={3} fill="#fbbf47" />
                    <path d="M250 80v8M259 80v8M268 80v8" stroke="#b98107" strokeWidth={1.4} />
                    <text x={259} y={166} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize={11} fontWeight={700} fill="#57677c">
                      Depth
                    </text>
                  </g>
                </svg>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, margin: '18px 0 8px' }}>Proper Technique</div>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: '#7a8798' }}>Use a measuring tape against each side, ensuring it&apos;s straight and measuring at the widest points.</p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section style={{ marginBottom: 34 }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 800, letterSpacing: '-.025em' }}>Step-by-Step Measurement Guide</h2>
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

        {/* CTA */}
        <section style={{ background: '#fdf8ee', border: '1px solid #f3ebdb', borderRadius: 14, padding: 'clamp(30px,4vw,44px) 28px', textAlign: 'center', marginBottom: 38 }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(19px,2.4vw,23px)', fontWeight: 800, letterSpacing: '-.025em' }}>Test Your Measurements Against Airlines</h2>
          <p style={{ margin: '0 auto 22px', maxWidth: 560, fontSize: 13.5, lineHeight: 1.75, color: '#57677c' }}>Now that you know how to measure your bag dimensions, use our free tool to check if your luggage meets the requirements of over 200 airlines worldwide.</p>
          <Link
            href="/size-checker"
            className="cta-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fbbf47', color: '#3a2a05', borderRadius: 10, padding: '13px 24px', fontSize: 13.5, fontWeight: 800, textDecoration: 'none' }}
          >
            Check My Bag Size
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a2a05" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 0 52px' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 800, letterSpacing: '-.025em' }}>Frequently Asked Questions</h2>
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
