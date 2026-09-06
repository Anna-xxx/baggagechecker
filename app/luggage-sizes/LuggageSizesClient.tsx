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
  max: [number, number, number];
  kg: number;
};

const AIRLINES: Airline[] = [
  { name: 'Ryanair', code: 'FR', website: 'https://www.ryanair.com', size: '55 × 40 × 20 cm', weight: '10 kg', max: [55, 40, 20], kg: 10 },
  { name: 'EasyJet', code: 'U2', website: 'https://www.easyjet.com', size: '56 × 45 × 25 cm', weight: 'No weight limit', max: [56, 45, 25], kg: 99 },
  { name: 'Wizz Air', code: 'W6', website: 'https://wizzair.com', size: '55 × 40 × 23 cm', weight: '10 kg', max: [55, 40, 23], kg: 10 },
  { name: 'British Airways', code: 'BA', website: 'https://www.britishairways.com', size: '56 × 45 × 25 cm', weight: '23 kg', max: [56, 45, 25], kg: 23 },
  { name: 'Lufthansa', code: 'LH', website: 'https://www.lufthansa.com', size: '55 × 40 × 23 cm', weight: '8 kg', max: [55, 40, 23], kg: 8 },
  { name: 'Emirates', code: 'EK', website: 'https://www.emirates.com', size: '55 × 38 × 20 cm', weight: '7 kg', max: [55, 38, 20], kg: 7 },
];

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
  const [picker, setPicker] = useState(false);
  const [sel, setSel] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const base = { W, H, D, KG };
  const setBase: Record<DimKey, (n: number) => void> = { W: setW, H: setH, D: setD, KG: setKG };

  const toDisp = (v: number, k: DimKey) => (metric ? v : Math.round(k === 'KG' ? v * 2.205 : v / 2.54));
  const toBase = (v: number, k: DimKey) => (metric ? v : k === 'KG' ? v / 2.205 : v * 2.54);
  const lenU = metric ? 'cm' : 'in';

  const handleFieldChange = (def: (typeof FIELD_DEFS)[number]) => (n: number) => {
    setBase[def.key](clamp(Math.round(toBase(n, def.key)), def.min, def.max));
    setChecked(false);
  };

  const verdictOf = (a: Airline) => {
    const dims = [W, H, D].sort((x, y) => y - x);
    const lim = [...a.max].sort((x, y) => y - x);
    return dims.every((d, i) => d <= lim[i]) && KG <= a.kg;
  };

  const chosen = AIRLINES.filter((a) => sel.includes(a.name));
  const results = checked ? chosen.map((a) => ({ airline: a, fits: verdictOf(a) })) : [];

  const boxW = Math.max(80, Math.round(W * 1.9));
  const boxH = Math.max(80, Math.round(H * 1.9));
  const depthW = Math.max(28, Math.round(20 + D * 1.1));
  const faceLabel = `${toDisp(W, 'W')} × ${toDisp(H, 'H')} ${lenU}`;
  const depthValue = toDisp(D, 'D');

  const toggleAirline = (name: string) => {
    setSel((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : prev.concat(name)));
    setChecked(false);
  };

  const removeAirline = (name: string) => {
    setSel((prev) => prev.filter((n) => n !== name));
    setChecked(false);
  };

  const submit = () => {
    setChecked(sel.length > 0);
    if (sel.length === 0) setPicker(true);
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

        {/* Dimensions input */}
        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 26 }}>
          <div style={{ border: '1px solid #f0f2f5', borderRadius: 12, padding: 'clamp(18px,2.5vw,26px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 22 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>Enter Your Luggage Dimensions</h2>
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

            <button
              onClick={submit}
              className="btn-primary"
              style={{
                width: '100%',
                marginTop: 22,
                padding: 15,
                border: 'none',
                borderRadius: 10,
                background: '#fbbf47',
                color: '#3a2a05',
                fontFamily: 'inherit',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Check Baggage Size
            </button>
          </div>
        </section>

        {/* Airlines */}
        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 18 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, letterSpacing: '-.02em' }}>Selected Airlines</h2>
            <button
              onClick={() => setPicker((p) => !p)}
              className="btn-outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid #e4eaf1',
                background: '#fff',
                borderRadius: 10,
                padding: '10px 15px',
                fontFamily: 'inherit',
                fontSize: 13.5,
                fontWeight: 600,
                color: '#0f1c2e',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f1c2e" strokeWidth={2.2} strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Airline
            </button>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: 12, padding: '26px 22px' }}>
            {picker && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, justifyContent: 'center' }}>
                {AIRLINES.map((a) => {
                  const on = sel.includes(a.name);
                  return (
                    <button
                      key={a.name}
                      onClick={() => toggleAirline(a.name)}
                      style={{
                        border: `1px solid ${on ? '#14b8a6' : '#e4eaf1'}`,
                        background: on ? '#e3f5f2' : '#fff',
                        color: on ? '#0f766e' : '#475569',
                        borderRadius: 999,
                        padding: '8px 15px',
                        fontFamily: 'inherit',
                        fontSize: 13,
                        fontWeight: 600,
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

            {chosen.length > 0 && (
              <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
                {chosen.map((a) => (
                  <div
                    key={a.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 14,
                      flexWrap: 'wrap',
                      background: '#fff',
                      border: '1px solid #edf0f3',
                      borderRadius: 10,
                      padding: '13px 16px',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700 }}>
                      <AirlineLogo code={a.code} website={a.website} width={34} height={34} radius={7} fontSize={10} />
                      {a.name}
                    </span>
                    <span style={{ fontSize: 12.5, color: '#7a8798', marginLeft: 'auto' }}>
                      {a.size} · {a.weight}
                    </span>
                    <button
                      onClick={() => removeAirline(a.name)}
                      className="remove-link"
                      style={{ border: 'none', background: 'none', color: '#94a3b8', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!picker && chosen.length === 0 && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 18px', fontSize: 14, color: '#8494a8' }}>No airlines selected for comparison.</p>
                <button
                  onClick={() => setPicker(true)}
                  className="btn-outline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    border: '1px solid #e4eaf1',
                    background: '#fff',
                    borderRadius: 10,
                    padding: '11px 18px',
                    fontFamily: 'inherit',
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: '#0f1c2e',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f1c2e" strokeWidth={2.2} strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Add Airline
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 'clamp(40px,6vw,70px) 24px', marginBottom: 26, textAlign: 'center' }}>
          {results.length > 0 && (
            <div style={{ display: 'grid', gap: 12, textAlign: 'left', maxWidth: 760, margin: '0 auto' }}>
              {results.map(({ airline: a, fits }) => (
                <div
                  key={a.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 14,
                    flexWrap: 'wrap',
                    border: '1px solid #edf0f3',
                    borderRadius: 11,
                    padding: '16px 18px',
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{a.name}</span>
                  <span style={{ fontSize: 12.5, color: '#7a8798', marginLeft: 'auto' }}>
                    {a.size} · {a.weight}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: fits ? '#15803d' : '#b91c1c',
                      background: fits ? '#dcfce7' : '#fee2e2',
                      borderRadius: 999,
                      padding: '6px 13px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {fits ? 'Fits cabin allowance' : 'Too large'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {results.length === 0 && (
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: '#f4f6f8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a9b4c2" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 13l20-7-7 20-3-8z" />
                </svg>
              </span>
              <h3 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, letterSpacing: '-.02em' }}>No airlines selected yet</h3>
              <p style={{ margin: '0 auto', maxWidth: 470, fontSize: 15, lineHeight: 1.7, color: '#8494a8' }}>
                Click &quot;Add Airline&quot; above to select airlines and compare how your luggage measures up against their baggage policies.
              </p>
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
