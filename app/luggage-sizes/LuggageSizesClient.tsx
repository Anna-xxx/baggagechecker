'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirlineLogo } from '@/components/AirlineLogo';
import { AIRLINES as ALL_AIRLINES } from '@/lib/airlines';

type Airline = {
  name: string;
  code: string;
  size: string;
  weight: string;
  max: { H: number; W: number; D: number };
  kg: number;
};

const AIRLINES: Airline[] = [
  { name: 'Air Canada', code: 'AC', size: '55 × 40 × 23 cm', weight: '10 kg', max: { H: 55, W: 40, D: 23 }, kg: 10 },
  { name: 'Air France', code: 'AF', size: '55 × 35 × 25 cm', weight: '12 kg', max: { H: 55, W: 35, D: 25 }, kg: 12 },
  { name: 'Air India', code: 'AI', size: '55 × 40 × 20 cm', weight: '7 kg', max: { H: 55, W: 40, D: 20 }, kg: 7 },
  { name: 'ITA Airways', code: 'AZ', size: '45 × 35 × 20 cm', weight: '5 kg', max: { H: 45, W: 35, D: 20 }, kg: 5 },
  { name: 'All Nippon Airways', code: 'NH', size: '55 × 40 × 25 cm', weight: '10 kg', max: { H: 55, W: 40, D: 25 }, kg: 10 },
  { name: 'American Airlines', code: 'AA', size: '56 × 36 × 23 cm', weight: '10 kg', max: { H: 56, W: 36, D: 23 }, kg: 10 },
  { name: 'Austrian Airlines', code: 'OS', size: '55 × 40 × 23 cm', weight: '8 kg', max: { H: 55, W: 40, D: 23 }, kg: 8 },
  { name: 'British Airways', code: 'BA', size: '56 × 45 × 25 cm', weight: '23 kg', max: { H: 56, W: 45, D: 25 }, kg: 23 },
  { name: 'Brussels Airlines', code: 'SN', size: '55 × 40 × 23 cm', weight: '8 kg', max: { H: 55, W: 40, D: 23 }, kg: 8 },
  { name: 'Cathay Pacific', code: 'CX', size: '56 × 36 × 23 cm', weight: '7 kg', max: { H: 56, W: 36, D: 23 }, kg: 7 },
  { name: 'Copa Airlines', code: 'CM', size: '56 × 36 × 26 cm', weight: '10 kg', max: { H: 56, W: 36, D: 26 }, kg: 10 },
  { name: 'Delta Air Lines', code: 'DL', size: '56 × 35 × 23 cm', weight: '10 kg', max: { H: 56, W: 35, D: 23 }, kg: 10 },
  { name: 'easyJet', code: 'U2', size: '56 × 45 × 25 cm', weight: '15 kg', max: { H: 56, W: 45, D: 25 }, kg: 15 },
  { name: 'Emirates', code: 'EK', size: '55 × 38 × 22 cm', weight: '7 kg', max: { H: 55, W: 38, D: 22 }, kg: 7 },
  { name: 'Ethiopian Airlines', code: 'ET', size: '55 × 40 × 23 cm', weight: '7 kg', max: { H: 55, W: 40, D: 23 }, kg: 7 },
  { name: 'Frontier Airlines', code: 'F9', size: '61 × 41 × 25 cm', weight: '10 kg', max: { H: 61, W: 41, D: 25 }, kg: 10 },
  { name: 'Garuda Indonesia', code: 'GA', size: '56 × 36 × 23 cm', weight: '7 kg', max: { H: 56, W: 36, D: 23 }, kg: 7 },
  { name: 'Hainan Airlines', code: 'HU', size: '55 × 40 × 20 cm', weight: '5 kg', max: { H: 55, W: 40, D: 20 }, kg: 5 },
  { name: 'Iberia', code: 'IB', size: '55 × 40 × 20 cm', weight: '10 kg', max: { H: 55, W: 40, D: 20 }, kg: 10 },
  { name: 'IndiGo', code: '6E', size: '55 × 35 × 25 cm', weight: '7 kg', max: { H: 55, W: 35, D: 25 }, kg: 7 },
  { name: 'Japan Airlines', code: 'JL', size: '55 × 40 × 25 cm', weight: '10 kg', max: { H: 55, W: 40, D: 25 }, kg: 10 },
  { name: 'JetBlue Airways', code: 'B6', size: '56 × 36 × 23 cm', weight: '10 kg', max: { H: 56, W: 36, D: 23 }, kg: 10 },
  { name: 'KLM Royal Dutch', code: 'KL', size: '55 × 35 × 25 cm', weight: '12 kg', max: { H: 55, W: 35, D: 25 }, kg: 12 },
  { name: 'Lufthansa', code: 'LH', size: '55 × 40 × 23 cm', weight: '8 kg', max: { H: 55, W: 40, D: 23 }, kg: 8 },
  { name: 'Malaysia Airlines', code: 'MH', size: '55 × 40 × 20 cm', weight: '7 kg', max: { H: 55, W: 40, D: 20 }, kg: 7 },
  { name: 'Qantas', code: 'QF', size: '56 × 36 × 23 cm', weight: '7 kg', max: { H: 56, W: 36, D: 23 }, kg: 7 },
  { name: 'Qatar Airways', code: 'QR', size: '50 × 37 × 25 cm', weight: '7 kg', max: { H: 50, W: 37, D: 25 }, kg: 7 },
  { name: 'Ryanair', code: 'FR', size: '55 × 40 × 20 cm', weight: '10 kg', max: { H: 55, W: 40, D: 20 }, kg: 10 },
  { name: 'Scandinavian Airlines', code: 'SK', size: '55 × 40 × 23 cm', weight: '8 kg', max: { H: 55, W: 40, D: 23 }, kg: 8 },
  { name: 'Singapore Airlines', code: 'SQ', size: '55 × 40 × 20 cm', weight: '7 kg', max: { H: 55, W: 40, D: 20 }, kg: 7 },
  { name: 'Southwest Airlines', code: 'WN', size: '61 × 41 × 25 cm', weight: '10 kg', max: { H: 61, W: 41, D: 25 }, kg: 10 },
  { name: 'Spirit Airlines', code: 'NK', size: '56 × 46 × 25 cm', weight: '10 kg', max: { H: 56, W: 46, D: 25 }, kg: 10 },
  { name: 'TAP Air Portugal', code: 'TP', size: '55 × 40 × 20 cm', weight: '8 kg', max: { H: 55, W: 40, D: 20 }, kg: 8 },
  { name: 'Thai Airways', code: 'TG', size: '56 × 45 × 25 cm', weight: '7 kg', max: { H: 56, W: 45, D: 25 }, kg: 7 },
  { name: 'Turkish Airlines', code: 'TK', size: '55 × 40 × 23 cm', weight: '8 kg', max: { H: 55, W: 40, D: 23 }, kg: 8 },
  { name: 'Uzbekistan Airways', code: 'HY', size: '56 × 45 × 25 cm', weight: '8 kg', max: { H: 56, W: 45, D: 25 }, kg: 8 },
  { name: 'Virgin Atlantic', code: 'VS', size: '56 × 36 × 23 cm', weight: '10 kg', max: { H: 56, W: 36, D: 23 }, kg: 10 },
  { name: 'Virgin Australia', code: 'VA', size: '56 × 36 × 23 cm', weight: '7 kg', max: { H: 56, W: 36, D: 23 }, kg: 7 },
  { name: 'Vueling', code: 'VY', size: '55 × 40 × 20 cm', weight: '10 kg', max: { H: 55, W: 40, D: 20 }, kg: 10 },
  { name: 'Wizz Air', code: 'W6', size: '55 × 40 × 23 cm', weight: '10 kg', max: { H: 55, W: 40, D: 23 }, kg: 10 },
];

const WIZZ_AIR_WEBSITE = 'https://wizzair.com';
function websiteFor(code: string): string {
  return ALL_AIRLINES.find((a) => a.code === code)?.website ?? (code === 'W6' ? WIZZ_AIR_WEBSITE : '');
}

const MAX_AIRLINES = 3;

type DimKey = 'W' | 'H' | 'D' | 'KG';

const FIELD_DEFS: { label: string; key: DimKey; min: number; max: number; iconColor: string }[] = [
  { label: 'Width', key: 'W', min: 10, max: 90, iconColor: '#14b8a6' },
  { label: 'Height', key: 'H', min: 10, max: 100, iconColor: '#ef6a5a' },
  { label: 'Depth', key: 'D', min: 5, max: 60, iconColor: '#8b5cf6' },
  { label: 'Weight', key: 'KG', min: 1, max: 32, iconColor: '#f0a824' },
];

const FIELD_ICONS: Record<DimKey, React.ReactNode> = {
  W: (
    <>
      <path d="M3 9h18v6H3z" />
      <path d="M7 9v3M12 9v3M17 9v3" />
    </>
  ),
  H: (
    <>
      <path d="M9 3h6v18H9z" />
      <path d="M9 7h3M9 12h3M9 17h3" />
    </>
  ),
  D: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M12 21v-9l8-4.5M12 12L4 7.5" />
    </>
  ),
  KG: (
    <>
      <path d="M12 4v16M6 20h12" />
      <path d="M4 9h16l-3 5H7z" />
    </>
  ),
};

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function StepBadge({ n }: { n: number }) {
  return (
    <span
      style={{
        flex: 'none',
        display: 'flex',
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: '#e3f5f2',
        color: '#0f766e',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 800,
      }}
    >
      {n}
    </span>
  );
}

function DimensionField({
  label,
  iconColor,
  icon,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  iconColor: string;
  icon: React.ReactNode;
  min: number;
  max: number;
  value: number;
  onChange: (n: number) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value);
    if (Number.isNaN(n)) return;
    onChange(n);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 600 }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
            {icon}
          </svg>
          {label}
        </span>
        <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b7c1cd" strokeWidth={1.8} strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 8h.01" />
        </svg>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <input type="range" min={min} max={max} value={value} onChange={handleChange} style={{ flex: 1, minWidth: 0 }} />
        <input
          type="number"
          value={value}
          onChange={handleChange}
          style={{
            flex: 'none',
            width: 78,
            border: '1px solid #e4eaf1',
            borderRadius: 9,
            padding: 10,
            textAlign: 'center',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 600,
            color: '#0f1c2e',
            background: '#fff',
            fontVariantNumeric: 'tabular-nums',
          }}
        />
      </div>
    </div>
  );
}

export function LuggageSizesClient() {
  const [metric, setMetric] = useState(true);
  const [W, setW] = useState(40);
  const [H, setH] = useState(55);
  const [D, setD] = useState(20);
  const [KG, setKG] = useState(10);
  const [sel, setSel] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const base = { W, H, D, KG };
  const setBase: Record<DimKey, (n: number) => void> = { W: setW, H: setH, D: setD, KG: setKG };

  const toDisp = (v: number, k: DimKey) => (metric ? v : Math.round(k === 'KG' ? v * 2.205 : v / 2.54));
  const toBase = (v: number, k: DimKey) => (metric ? v : k === 'KG' ? v / 2.205 : v * 2.54);
  const lenU = metric ? 'cm' : 'in';
  const wU = metric ? 'kg' : 'lb';

  const handleFieldChange = (def: (typeof FIELD_DEFS)[number]) => (n: number) => {
    setBase[def.key](clamp(Math.round(toBase(n, def.key)), def.min, def.max));
    setChecked(false);
  };

  const boxW = Math.max(80, Math.round(W * 1.9));
  const boxH = Math.max(80, Math.round(H * 1.9));
  const depthW = Math.max(28, Math.round(20 + D * 1.1));
  const faceLabel = `${toDisp(W, 'W')} × ${toDisp(H, 'H')} ${lenU}`;
  const depthValue = toDisp(D, 'D');

  const chosen = AIRLINES.filter((a) => sel.includes(a.name));

  const checksFor = (a: Airline) => {
    const lim: Record<DimKey, number> = { W: a.max.W, H: a.max.H, D: a.max.D, KG: a.kg };
    return FIELD_DEFS.map((f) => {
      const mine = base[f.key];
      const max = lim[f.key];
      const ok = mine <= max;
      const unit = f.key === 'KG' ? wU : lenU;
      const d = (v: number) => `${toDisp(v, f.key)} ${unit}`;
      return {
        key: f.key,
        label: f.label,
        detail: `${d(mine)} / ${max >= 99 ? 'no limit' : d(max)}`,
        mark: ok ? '✓' : '✗',
        color: ok ? '#15803d' : '#b91c1c',
        over: !ok,
        excess: ok ? '' : `${d(mine - max)} over`,
      };
    });
  };

  const results = checked
    ? chosen.map((a) => {
        const checks = checksFor(a);
        const failed = checks.filter((c) => c.over);
        return {
          airline: a,
          checks,
          verdict: failed.length === 0 ? 'Fits' : 'Too large',
          color: failed.length === 0 ? '#15803d' : '#b91c1c',
          bg: failed.length === 0 ? '#dcfce7' : '#fee2e2',
          showAdvice: failed.length > 0,
          advice:
            failed.length > 0
              ? `Over the limit on ${failed.map((c) => c.label.toLowerCase()).join(' and ')}. You would need to check this bag into the hold, or repack into a smaller case.`
              : '',
        };
      })
    : [];

  const fitCount = results.filter((r) => r.verdict === 'Fits').length;
  const allFit = results.length > 0 && fitCount === results.length;
  const noneFit = results.length > 0 && fitCount === 0;
  const canCheck = sel.length > 0;

  const toggleAirline = (name: string) => {
    const on = sel.includes(name);
    setSel((prev) => (on ? prev.filter((n) => n !== name) : prev.concat(name)));
    setQuery('');
    setChecked(false);
  };

  const removeAirline = (name: string) => {
    setSel((prev) => prev.filter((n) => n !== name));
    setChecked(false);
  };

  const q = query.trim().toLowerCase();
  const options = AIRLINES.filter((a) => !q || a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q)).slice(0, 40);
  const noMatches = q.length > 0 && options.length === 0;
  const showList = open && sel.length < MAX_AIRLINES;

  const summaryLabel = allFit
    ? results.length === 1
      ? 'Your bag fits this airline'
      : `Your bag fits all ${results.length} airlines`
    : noneFit
      ? results.length === 1
        ? 'Your bag is too large for this airline'
        : `Your bag is too large for all ${results.length} airlines`
      : `Your bag fits ${fitCount} of ${results.length} airlines`;
  const summaryMark = allFit ? '✓' : noneFit ? '✗' : '!';
  const summaryColor = allFit ? '#15803d' : noneFit ? '#b91c1c' : '#b45309';
  const summaryBg = allFit ? '#e6f6ee' : noneFit ? '#fdecec' : '#fdf8ee';
  const summaryBorder = allFit ? '#c6ead4' : noneFit ? '#f6d5d5' : '#f3ebdb';
  const bagLabel = `Your bag: ${toDisp(W, 'W')} × ${toDisp(H, 'H')} × ${toDisp(D, 'D')} ${lenU}, ${toDisp(KG, 'KG')} ${wU}`;

  const submit = () => {
    if (canCheck) setChecked(true);
  };

  return (
    <div style={{ width: '100%', background: '#f7f8f9' }}>
      <Header />

      <main id="top" style={{ maxWidth: 1340, margin: '0 auto', padding: '34px 24px 8px' }}>
        <a
          href="#top"
          className="back-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 600, color: '#0f1c2e', textDecoration: 'none' }}
        >
          <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M11 6l-6 6 6 6" />
          </svg>
          Back
        </a>
        <h1 style={{ margin: '22px 0 26px', fontSize: 'clamp(26px,3.6vw,34px)', fontWeight: 800, letterSpacing: '-.03em' }}>
          Luggage size checker
        </h1>

        {/* Step 1: Dimensions input */}
        <section id="checker" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 26 }}>
          <div style={{ border: '1px solid #f0f2f5', borderRadius: 12, padding: 'clamp(18px,2.5vw,26px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 22 }}>
              <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>
                <StepBadge n={1} />
                Enter Your Luggage Dimensions
              </h2>
              <button
                onClick={() => setMetric((m) => !m)}
                className="btn-outline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  border: '1px solid #e4eaf1',
                  background: '#fff',
                  borderRadius: 10,
                  padding: '9px 14px',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#0f1c2e',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 16.5L16.5 4l3.5 3.5L7.5 20z" />
                  <path d="M9 7l2 2M12.5 10.5l2 2" />
                </svg>
                {metric ? 'cm/kg' : 'in/lb'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '22px 40px' }}>
              {FIELD_DEFS.map((def) => (
                <DimensionField
                  key={def.key}
                  label={def.label}
                  iconColor={def.iconColor}
                  icon={FIELD_ICONS[def.key]}
                  min={toDisp(def.min, def.key)}
                  max={toDisp(def.max, def.key)}
                  value={toDisp(base[def.key], def.key)}
                  onChange={handleFieldChange(def)}
                />
              ))}
            </div>

            <div style={{ marginTop: 26, background: '#f8fafc', borderRadius: 12, padding: '20px 22px 26px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Visual Representation</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, flexWrap: 'wrap', minHeight: 170 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <div style={{ position: 'relative', width: boxW, height: boxH }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: -15,
                        transform: 'translateX(-50%)',
                        width: '34%',
                        height: 18,
                        border: '3px solid #94a3b8',
                        borderBottom: 'none',
                        borderRadius: '9px 9px 0 0',
                      }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: '#cff5ec', border: '2px solid #5eddc4', borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', left: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(20,184,166,.25)' }} />
                      <div style={{ position: 'absolute', right: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(20,184,166,.25)' }} />
                      <div
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%,-50%)',
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#0b5f56',
                          textAlign: 'center',
                          lineHeight: 1.35,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {faceLabel}
                      </div>
                    </div>
                    <div style={{ position: 'absolute', left: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                    <div style={{ position: 'absolute', right: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                  </div>
                  <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>width × height</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <div style={{ position: 'relative', width: depthW, height: boxH }}>
                    <div style={{ position: 'absolute', left: '50%', top: -15, transform: 'translateX(-50%)', width: 4, height: 18, borderRadius: 2, background: '#94a3b8' }} />
                    <div style={{ position: 'absolute', inset: 0, background: '#b8efe1', border: '2px solid #5eddc4', borderRadius: 10 }} />
                    <div style={{ position: 'absolute', left: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                    <div style={{ position: 'absolute', right: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                    <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 12, fontWeight: 700, color: '#0b5f56', whiteSpace: 'nowrap' }}>
                      {depthValue}
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: '#8494a8', fontWeight: 600 }}>depth</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Choose airlines */}
        <section id="airlines" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>
              <StepBadge n={2} />
              Choose Your Airlines
            </h2>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: sel.length ? '#0f766e' : '#8494a8' }}>
              {sel.length} of {MAX_AIRLINES} selected
            </span>
          </div>
          <p style={{ margin: '0 0 16px 34px', fontSize: 13, color: '#7a8798' }}>Pick up to three airlines to compare your bag against.</p>

          {chosen.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 14 }}>
              {chosen.map((a) => (
                <span
                  key={a.name}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 9,
                    background: '#e3f5f2',
                    border: '1px solid #14b8a6',
                    color: '#0f766e',
                    borderRadius: 999,
                    padding: '6px 12px 6px 7px',
                    fontSize: 13,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <AirlineLogo code={a.code} website={websiteFor(a.code)} width={30} height={22} radius={6} fontSize={9} />
                  {a.name}
                  <button onClick={() => removeAirline(a.name)} style={{ border: 'none', background: 'none', padding: 0, lineHeight: 0, cursor: 'pointer', color: '#0f766e' }}>
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${open ? '#14b8a6' : '#e4eaf1'}`, borderRadius: 10, padding: '11px 14px', background: '#fff' }}>
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a9b4c2" strokeWidth={2} strokeLinecap="round">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l5 5" />
              </svg>
              <input
                placeholder={sel.length >= MAX_AIRLINES ? `Maximum of ${MAX_AIRLINES} airlines selected` : `Search ${AIRLINES.length} airlines by name or code`}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                disabled={sel.length >= MAX_AIRLINES}
                style={{ flex: 1, minWidth: 0, border: 'none', fontFamily: 'inherit', fontSize: 13.5, color: '#0f1c2e', background: 'transparent' }}
              />
              {query.length > 0 && (
                <button onClick={() => setQuery('')} style={{ border: 'none', background: 'none', padding: 0, lineHeight: 0, cursor: 'pointer', color: '#a9b4c2' }}>
                  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              )}
            </div>

            {showList && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 'calc(100% + 6px)',
                  zIndex: 20,
                  maxHeight: 280,
                  overflowY: 'auto',
                  background: '#fff',
                  border: '1px solid #e4eaf1',
                  borderRadius: 12,
                  boxShadow: '0 16px 32px -18px rgba(15,28,46,.35)',
                }}
              >
                {options.map((a) => {
                  const on = sel.includes(a.name);
                  return (
                    <button
                      key={a.name}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => toggleAirline(a.name)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 11,
                        border: 'none',
                        borderBottom: '1px solid #f4f6f8',
                        background: on ? '#f4faf9' : '#fff',
                        padding: '11px 14px',
                        fontFamily: 'inherit',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <AirlineLogo code={a.code} website={websiteFor(a.code)} width={32} height={24} radius={6} fontSize={9} />
                      <span style={{ flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: 700, color: '#0f1c2e' }}>{a.name}</span>
                      <span style={{ fontSize: 11.5, color: '#8494a8', whiteSpace: 'nowrap' }}>
                        {a.max.W} × {a.max.H} × {a.max.D} cm
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#14b8a6', width: 12, textAlign: 'center' }}>{on ? '✓' : ''}</span>
                    </button>
                  );
                })}
                {noMatches && <div style={{ padding: 16, fontSize: 13, color: '#8494a8' }}>No airlines match that search.</div>}
              </div>
            )}
          </div>

          <button
            onClick={submit}
            style={{
              width: '100%',
              marginTop: 22,
              padding: 15,
              border: 'none',
              borderRadius: 10,
              background: canCheck ? '#fbbf47' : '#eef2f7',
              color: canCheck ? '#3a2a05' : '#a9b4c2',
              fontFamily: 'inherit',
              fontSize: 15,
              fontWeight: 700,
              cursor: canCheck ? 'pointer' : 'not-allowed',
            }}
          >
            {canCheck ? 'Check my bag' : 'Select an airline first'}
          </button>
        </section>

        {/* Step 3: Result */}
        <section id="result" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 26 }}>
          <h2 style={{ margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>
            <StepBadge n={3} />
            Your Result
          </h2>

          {results.length > 0 ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: summaryBg, border: `1px solid ${summaryBorder}`, borderRadius: 11, padding: '15px 18px', marginBottom: 16 }}>
                <span style={{ flex: 'none', display: 'flex', width: 30, height: 30, borderRadius: '50%', background: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: summaryColor }}>
                  {summaryMark}
                </span>
                <span style={{ fontSize: 14, fontWeight: 800, color: summaryColor }}>{summaryLabel}</span>
                <span style={{ fontSize: 12.5, color: '#57677c', marginLeft: 'auto' }}>{bagLabel}</span>
              </div>

              <div style={{ display: 'grid', gap: 14 }}>
                {results.map((r) => (
                  <div key={r.airline.name} style={{ border: '1px solid #edf0f3', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', background: '#f8fafc', padding: '13px 16px' }}>
                      <AirlineLogo code={r.airline.code} website={websiteFor(r.airline.code)} width={34} height={26} radius={7} fontSize={10} />
                      <span style={{ fontSize: 14, fontWeight: 800 }}>{r.airline.name}</span>
                      <span style={{ fontSize: 12, color: '#7a8798' }}>
                        {r.airline.size} · {r.airline.weight}
                      </span>
                      <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 800, color: r.color, background: r.bg, borderRadius: 999, padding: '6px 13px', whiteSpace: 'nowrap' }}>
                        {r.verdict}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,150px),1fr))' }}>
                      {r.checks.map((c) => (
                        <div key={c.key} style={{ padding: '13px 16px', borderTop: '1px solid #f0f2f5', borderRight: '1px solid #f0f2f5' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: '#8494a8', marginBottom: 5 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: c.color }}>{c.mark}</span>
                            {c.label}
                          </div>
                          <div style={{ fontSize: 12.5, fontWeight: 700, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{c.detail}</div>
                          {c.over && <div style={{ fontSize: 11, fontWeight: 700, color: '#b91c1c', marginTop: 3, whiteSpace: 'nowrap' }}>{c.excess}</div>}
                        </div>
                      ))}
                    </div>
                    {r.showAdvice && <p style={{ margin: 0, padding: '13px 16px', borderTop: '1px solid #f0f2f5', fontSize: 12, lineHeight: 1.65, color: '#57677c' }}>{r.advice}</p>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '44px 24px', textAlign: 'center' }}>
              <span style={{ display: 'inline-flex', width: 48, height: 48, borderRadius: 14, background: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a9b4c2" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 13l20-7-7 20-3-8z" />
                </svg>
              </span>
              <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 800, letterSpacing: '-.02em' }}>{canCheck ? 'Ready to check' : 'No airlines selected yet'}</h3>
              <p style={{ margin: '0 auto', maxWidth: 430, fontSize: 13, lineHeight: 1.7, color: '#8494a8' }}>
                {canCheck
                  ? 'Press "Check my bag" above to compare your dimensions with the airlines you picked.'
                  : 'Pick one to three airlines in step 2 to see whether your bag fits their cabin allowance.'}
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
