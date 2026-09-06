'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirlineLogo } from '@/components/AirlineLogo';

type Airline = {
  name: string;
  code: string;
  website: string;
  size: string;
  weight: string;
  personal: string;
  strict: string;
  bg: string;
  color: string;
  max: [number, number, number];
  kg: number;
};

const AIRLINES: Airline[] = [
  { name: 'Ryanair', code: 'FR', website: 'https://www.ryanair.com', size: '55 × 40 × 20', weight: '10 kg', personal: '40 × 20 × 25', strict: 'Very Strict', bg: '#fee2e2', color: '#b91c1c', max: [55, 40, 20], kg: 10 },
  { name: 'EasyJet', code: 'U2', website: 'https://www.easyjet.com', size: '56 × 45 × 25', weight: 'No limit', personal: '45 × 36 × 20', strict: 'Moderate', bg: '#fef3c7', color: '#b45309', max: [56, 45, 25], kg: 99 },
  { name: 'Wizz Air', code: 'W6', website: 'https://wizzair.com', size: '55 × 40 × 23', weight: '10 kg', personal: '40 × 30 × 18', strict: 'Strict', bg: '#fee2e2', color: '#b91c1c', max: [55, 40, 23], kg: 10 },
  { name: 'British Airways', code: 'BA', website: 'https://www.britishairways.com', size: '56 × 45 × 25', weight: '23 kg', personal: '40 × 30 × 15', strict: 'Lenient', bg: '#dcfce7', color: '#15803d', max: [56, 45, 25], kg: 23 },
  { name: 'Lufthansa', code: 'LH', website: 'https://www.lufthansa.com', size: '55 × 40 × 23', weight: '8 kg', personal: '40 × 30 × 10', strict: 'Moderate', bg: '#fef3c7', color: '#b45309', max: [55, 40, 23], kg: 8 },
];

type DimKey = 'W' | 'H' | 'D' | 'KG';

const FIELD_DEFS: { label: string; key: DimKey; min: number; max: number }[] = [
  { label: 'Width', key: 'W', min: 10, max: 90 },
  { label: 'Height', key: 'H', min: 10, max: 100 },
  { label: 'Depth', key: 'D', min: 5, max: 60 },
  { label: 'Weight', key: 'KG', min: 1, max: 32 },
];

const HOWTO = [
  { n: '1', bg: '#e0edff', color: '#2563eb', title: 'Measure Your Luggage', text: 'Use a measuring tape to get exact dimensions of your suitcase including handles, wheels, and any protrusions.' },
  { n: '2', bg: '#e3f5f2', color: '#0f766e', title: 'Enter Dimensions', text: 'Input your luggage measurements into our size checker tool above. Switch between metric and imperial units as needed.' },
  { n: '3', bg: '#dcfce7', color: '#15803d', title: 'Get Results', text: 'Instantly see which airlines accept your luggage size and avoid unexpected fees at the airport.' },
];

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

export function SizeCheckerClient() {
  const [metric, setMetric] = useState(true);
  const [W, setW] = useState(40);
  const [H, setH] = useState(55);
  const [D, setD] = useState(20);
  const [KG, setKG] = useState(10);
  const [picker, setPicker] = useState(false);
  const [sel, setSel] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const base = { W, H, D, KG };
  const setBase: Record<DimKey, (n: number) => void> = { W: setW, H: setH, D: setD, KG: setKG };

  const toDisp = (v: number, k: DimKey) => (metric ? v : Math.round(k === 'KG' ? v * 2.205 : v / 2.54));
  const toBase = (v: number, k: DimKey) => (metric ? v : k === 'KG' ? v / 2.205 : v * 2.54);
  const lenU = metric ? 'cm' : 'in';
  const wU = metric ? 'kg' : 'lb';

  const handleFieldChange = (def: (typeof FIELD_DEFS)[number]) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value);
    setBase[def.key](clamp(Math.round(toBase(n, def.key)), def.min, def.max));
    setChecked(false);
  };

  const canCheck = sel.length > 0;
  const boxW = Math.max(90, Math.round(W * 1.9));
  const boxH = Math.max(90, Math.round(H * 1.9));
  const depthW = Math.max(28, Math.round(20 + D * 1.1));
  const faceLabel = `${toDisp(W, 'W')} × ${toDisp(H, 'H')} ${lenU}`;
  const depthValue = toDisp(D, 'D');

  const results = checked
    ? AIRLINES.filter((a) => sel.includes(a.name)).map((a) => {
        const dims = [W, H, D].sort((x, y) => y - x);
        const lim = [...a.max].sort((x, y) => y - x);
        const fits = dims.every((d, i) => d <= lim[i]) && KG <= a.kg;
        return { airline: a, fits };
      })
    : [];

  const toggleAirline = (name: string) => {
    setSel((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : prev.concat(name)));
    setChecked(false);
  };

  return (
    <div style={{ width: '100%', background: '#f7f8f9' }}>
      <Header />

      <section id="top" style={{ background: '#f7f8f9', borderBottom: '1px solid #edf0f3', padding: 'clamp(36px,6vw,58px) 20px clamp(30px,4vw,44px)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#e3f5f2', color: '#0f766e', border: '1px solid #c6ebe5', borderRadius: 999, padding: '6px 12px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf47' }} /> Airline Luggage Sizes
          </span>
        </div>
        <h1 style={{ margin: '0 auto 20px', maxWidth: 720, fontSize: 'clamp(32px,6vw,50px)', lineHeight: 1.05, fontWeight: 800, letterSpacing: '-.035em' }}>
          Luggage Size Checker
        </h1>
        <p style={{ margin: '0 auto 26px', maxWidth: 540, fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.65, color: '#57677c' }}>
          Check your suitcase size online instantly and avoid costly surprises at the airport. Our free carry-on size checker ensures your luggage meets airline requirements.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {[
            { label: 'Instant Results', icon: <path d="M13 2 4 14h6l-1 8 9-12h-6z" /> },
            { label: 'All Airlines Covered', icon: <path d="M2 13l20-7-7 20-3-8z" /> },
            {
              label: 'Save Time & Fees',
              icon: (
                <>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </>
              ),
            },
          ].map((pill) => (
            <span
              key={pill.label}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #f0ead9', color: '#8a5a06', borderRadius: 999, padding: '8px 15px', fontSize: 12.5, fontWeight: 700, whiteSpace: 'nowrap' }}
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e0a11a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                {pill.icon}
              </svg>
              {pill.label}
            </span>
          ))}
        </div>
      </section>

      <section id="checker" style={{ padding: 'clamp(28px,4vw,44px) 20px 0' }}>
        <div className="range-mint" style={{ maxWidth: 1000, margin: '0 auto', background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 'clamp(20px,3vw,30px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, letterSpacing: '-.02em' }}>Enter Your Luggage Dimensions</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12.5 }}>
              <a href="#howto" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>
                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8h.01" />
                </svg>
                How to measure?
              </a>
              <button
                onClick={() => setMetric((m) => !m)}
                className="btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid #e4eaf1', background: '#f8fafc', borderRadius: 9, padding: '6px 11px', fontFamily: 'inherit', fontSize: 11.5, fontWeight: 800, color: '#0f1c2e', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.2} strokeLinecap="round">
                  <path d="M4 8h14l-3-3M20 16H6l3 3" />
                </svg>
                {metric ? 'cm / kg' : 'in / lb'}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '20px 28px' }}>
            {FIELD_DEFS.map((def) => {
              const value = toDisp(base[def.key], def.key);
              const min = toDisp(def.min, def.key);
              const max = toDisp(def.max, def.key);
              return (
                <div key={def.key}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.01em', color: '#0f1c2e' }}>{def.label}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: '#0d9488', fontVariantNumeric: 'tabular-nums' }}>
                      {value} {def.key === 'KG' ? wU : lenU}
                    </span>
                  </div>
                  <input type="range" min={min} max={max} value={value} onChange={handleFieldChange(def)} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: '#a9b4c2', marginTop: 2 }}>
                    <span>{min}</span>
                    <span>{max}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 28, borderTop: '1px solid #f1f5f9', paddingTop: 22 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: '#8494a8', marginBottom: 18 }}>Visual Representation</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 18, flexWrap: 'wrap', padding: '8px 0 4px', minHeight: 180 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ position: 'relative', width: boxW, height: boxH }}>
                  <div style={{ position: 'absolute', left: '50%', top: -16, transform: 'translateX(-50%)', width: '34%', height: 20, border: '3px solid #94a3b8', borderBottom: 'none', borderRadius: '10px 10px 0 0' }} />
                  <div style={{ position: 'absolute', inset: 0, background: '#cff5ec', border: '2px solid #5eddc4', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: '22%', top: 0, bottom: 0, width: 2, background: 'rgba(13,148,136,.28)' }} />
                    <div style={{ position: 'absolute', right: '22%', top: 0, bottom: 0, width: 2, background: 'rgba(13,148,136,.28)' }} />
                    <div style={{ position: 'absolute', left: '8%', right: '8%', top: '14%', height: 2, background: 'rgba(13,148,136,.22)' }} />
                    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 12, fontWeight: 800, color: '#0b5f56', textAlign: 'center', lineHeight: 1.35, whiteSpace: 'nowrap' }}>
                      {faceLabel}
                    </div>
                  </div>
                  <div style={{ position: 'absolute', left: '18%', bottom: -9, width: 12, height: 12, borderRadius: '50%', background: '#334155' }} />
                  <div style={{ position: 'absolute', right: '18%', bottom: -9, width: 12, height: 12, borderRadius: '50%', background: '#334155' }} />
                </div>
                <span style={{ fontSize: 11, color: '#8494a8', fontWeight: 600 }}>width × height</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ position: 'relative', width: depthW, height: boxH }}>
                  <div style={{ position: 'absolute', left: '50%', top: -17, transform: 'translateX(-50%)', width: 4, height: 20, borderRadius: 2, background: '#94a3b8' }} />
                  <div style={{ position: 'absolute', inset: 0, background: '#b8efe1', border: '2px solid #5eddc4', borderRadius: 12 }} />
                  <div style={{ position: 'absolute', left: 2, bottom: -9, width: 12, height: 12, borderRadius: '50%', background: '#334155' }} />
                  <div style={{ position: 'absolute', right: 2, bottom: -9, width: 12, height: 12, borderRadius: '50%', background: '#334155' }} />
                  <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 12, fontWeight: 800, color: '#0b5f56', whiteSpace: 'nowrap' }}>{depthValue}</span>
                </div>
                <span style={{ fontSize: 11, color: '#8494a8', fontWeight: 600 }}>depth</span>
              </div>
            </div>
          </div>

          <div id="airlines" style={{ marginTop: 26, borderTop: '1px solid #f1f5f9', paddingTop: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 800, marginBottom: 14 }}>
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 13l20-7-7 20-3-8z" />
              </svg>
              Select Airlines to Compare
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #edf0f3', borderRadius: 12, padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12.5, color: '#7a8798', fontWeight: 600 }}>
                  {sel.length} {sel.length === 1 ? 'airline selected' : 'airlines selected'}
                </span>
                <button
                  onClick={() => setPicker(true)}
                  className="btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 9, padding: '8px 13px', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: '#0f1c2e', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.4} strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Add Airline
                </button>
              </div>
              {picker && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                  {AIRLINES.map((a) => {
                    const on = sel.includes(a.name);
                    return (
                      <button
                        key={a.name}
                        onClick={() => toggleAirline(a.name)}
                        style={{
                          border: `1px solid ${on ? '#0d9488' : '#e4eaf1'}`,
                          background: on ? '#e3f5f2' : '#fff',
                          color: on ? '#0f766e' : '#475569',
                          borderRadius: 999,
                          padding: '7px 14px',
                          fontFamily: 'inherit',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {a.name}
                      </button>
                    );
                  })}
                </div>
              )}
              {!picker && sel.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
                  <div style={{ fontSize: 12.5, color: '#8494a8', marginBottom: 14 }}>No airlines selected yet</div>
                  <button
                    onClick={() => setPicker(true)}
                    className="btn-outline"
                    style={{ border: '1px solid #e4eaf1', background: '#fff', borderRadius: 9, padding: '9px 18px', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, color: '#0f1c2e', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    ＋ Select Airlines
                  </button>
                </div>
              )}
            </div>
          </div>

          {results.length > 0 && (
            <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
              {results.map(({ airline: a, fits }) => (
                <div key={a.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', border: '1px solid #edf0f3', borderRadius: 11, padding: '13px 16px' }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{a.name}</span>
                  <span style={{ fontSize: 12, color: '#7a8798', marginLeft: 'auto' }}>
                    {a.size} cm · {a.weight}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: fits ? '#15803d' : '#b91c1c',
                      background: fits ? '#dcfce7' : '#fee2e2',
                      borderRadius: 999,
                      padding: '5px 11px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {fits ? 'Fits' : 'Too large'}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => canCheck && setChecked(true)}
            style={{
              width: '100%',
              marginTop: 22,
              padding: 15,
              border: 'none',
              borderRadius: 11,
              background: canCheck ? '#fbbf47' : '#eef2f7',
              color: canCheck ? '#3a2a05' : '#a9b4c2',
              fontFamily: 'inherit',
              fontSize: 14.5,
              fontWeight: 800,
              letterSpacing: '-.01em',
              cursor: canCheck ? 'pointer' : 'not-allowed',
            }}
          >
            {canCheck ? 'Check My Luggage' : 'Select Airlines First'}
          </button>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 20px 0' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14 }}>
            {[
              { color: '#2563eb', title: 'Aircraft Limits', text: 'Overhead space varies by plane model', icon: <path d="M2 13l20-7-7 20-3-8z" /> },
              {
                color: '#15803d',
                title: 'Passenger Safety',
                text: 'Weight limits ensure safe operations',
                icon: (
                  <>
                    <circle cx="9" cy="8" r="3.2" />
                    <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
                    <path d="M16 6.5a3 3 0 0 1 0 5.6M18 20c0-2.4-1-4.2-2.6-5.2" />
                  </>
                ),
              },
              {
                color: '#e0a11a',
                title: 'Boarding Speed',
                text: 'Standard sizes speed up the process',
                icon: (
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3.5 2.2" />
                  </>
                ),
              },
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

      <section id="types" style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 20px 0' }}>
        <h2 style={{ margin: '0 0 28px', textAlign: 'center', fontSize: 'clamp(21px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em' }}>Different Types of Luggage</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
          {[
            {
              color: '#2563eb',
              title: 'Hard Shell Suitcases',
              text: 'Durable protection with fixed dimensions. Easy to measure but no flexibility for tight spaces.',
              points: ['Best protection for fragile items', 'Consistent size measurements', 'Popular for checked luggage'],
              icon: (
                <>
                  <rect x="4" y="6" width="16" height="15" rx="2.5" />
                  <path d="M9 6V3.5h6V6" />
                  <path d="M9.5 10v7M14.5 10v7" />
                </>
              ),
            },
            {
              color: '#15803d',
              title: 'Soft Backpacks',
              text: 'Flexible materials that can compress slightly. Great for carry-on due to adaptability.',
              points: ['Can compress when needed', 'Lightweight options available', 'Easy to store in overhead bins'],
              icon: (
                <>
                  <path d="M6 9a6 6 0 0 1 12 0v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
                  <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
                  <rect x="9.5" y="13" width="5" height="4" rx="1" />
                </>
              ),
            },
            {
              color: '#7c3aed',
              title: 'Rolling Duffel Bags',
              text: 'Hybrid design combining wheels with soft-sided flexibility. Versatile for various trip lengths.',
              points: ['Easy to maneuver', 'Expandable compartments', 'Good for longer trips'],
              icon: (
                <>
                  <rect x="3" y="8" width="18" height="9" rx="4.5" />
                  <path d="M8 8V6.5h8V8" />
                  <circle cx="8" cy="19.5" r="1.6" />
                  <circle cx="16" cy="19.5" r="1.6" />
                </>
              ),
            },
          ].map((card) => (
            <div key={card.title} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '26px 22px', textAlign: 'center' }}>
              <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth={1.7} strokeLinecap="round" style={{ marginBottom: 14 }}>
                {card.icon}
              </svg>
              <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 10 }}>{card.title}</div>
              <p style={{ margin: '0 0 14px', fontSize: 12.5, lineHeight: 1.65, color: '#7a8798' }}>{card.text}</p>
              <div style={{ display: 'grid', gap: 6, fontSize: 11.5, color: '#8494a8' }}>
                {card.points.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 20px 0' }}>
        <h2 style={{ margin: '0 0 26px', textAlign: 'center', fontSize: 'clamp(21px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em' }}>Popular Airlines Luggage Limits</h2>
        <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '6px 22px 16px', overflowX: 'auto' }}>
          <div style={{ minWidth: 620 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr 1fr 1.1fr .85fr', gap: 12, padding: '18px 0 12px', fontSize: 11.5, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase', color: '#8494a8', borderBottom: '1px solid #eef2f7' }}>
              <span>Airline</span>
              <span>Carry-On Size (cm)</span>
              <span>Weight Limit</span>
              <span>Personal Item</span>
              <span>Strictness</span>
            </div>
            {AIRLINES.map((row) => (
              <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr 1fr 1.1fr .85fr', gap: 12, alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #f5f8fb', fontSize: 12.5, color: '#475569', fontVariantNumeric: 'tabular-nums' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 9, fontWeight: 700, color: '#0f1c2e' }}>
                  <AirlineLogo code={row.code} website={row.website} width={32} height={32} radius={7} fontSize={9} />
                  {row.name}
                </span>
                <span>{row.size}</span>
                <span>{row.weight}</span>
                <span>{row.personal}</span>
                <span>
                  <span style={{ display: 'inline-block', background: row.bg, color: row.color, borderRadius: 999, padding: '4px 11px', fontSize: 10.5, fontWeight: 800, whiteSpace: 'nowrap' }}>{row.strict}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ margin: '14px 0 0', textAlign: 'center', fontSize: 11.5, color: '#8494a8' }}>* Restrictions may vary by route and ticket type. Always check with your airline before traveling.</p>
      </section>

      <section id="howto" style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 20px 0' }}>
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

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 20px 0' }}>
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

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 20px clamp(48px,6vw,72px)' }}>
        <div style={{ borderRadius: 18, background: '#fdf8ee', border: '1px solid #f3ebdb', padding: 'clamp(32px,5vw,50px) 28px', textAlign: 'center', color: '#0f1c2e' }}>
          <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(20px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em' }}>Ready to Check Your Luggage Size?</h2>
          <p style={{ margin: '0 auto 24px', maxWidth: 620, fontSize: 14, lineHeight: 1.7, color: '#57677c' }}>Use our free luggage size checker above to ensure your bags meet airline requirements and travel with confidence.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {['Free to Use', 'All Major Airlines', 'Instant Results'].map((label) => (
              <span key={label} style={{ background: '#fff', border: '1px solid #f0e2c0', color: '#8a5a06', borderRadius: 999, padding: '9px 17px', fontSize: 12.5, fontWeight: 700, whiteSpace: 'nowrap' }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer
        maxWidth={1000}
        logoSize={30}
        logoIconSize={16}
        copyrightSize={11.5}
        copyrightLines={['© 2026 BaggageChecker.', 'All rights reserved.']}
      />
    </div>
  );
}
