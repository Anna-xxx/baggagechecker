'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirlineLogo } from '@/components/AirlineLogo';
import { AIRLINES as ALL_AIRLINES } from '@/lib/airlines';

type Row = { name: string; code: string; h: number; w: number; d: number; kg: number };

const AIRLINES: Row[] = [
  { name: 'Air Canada', code: 'AC', h: 55, w: 40, d: 23, kg: 10 },
  { name: 'Air France', code: 'AF', h: 55, w: 35, d: 25, kg: 12 },
  { name: 'Air India', code: 'AI', h: 55, w: 40, d: 20, kg: 7 },
  { name: 'ITA Airways', code: 'AZ', h: 45, w: 35, d: 20, kg: 5 },
  { name: 'All Nippon Airways', code: 'NH', h: 55, w: 40, d: 25, kg: 10 },
  { name: 'American Airlines', code: 'AA', h: 56, w: 36, d: 23, kg: 10 },
  { name: 'Austrian Airlines', code: 'OS', h: 55, w: 40, d: 23, kg: 8 },
  { name: 'British Airways', code: 'BA', h: 56, w: 45, d: 25, kg: 23 },
  { name: 'Brussels Airlines', code: 'SN', h: 55, w: 40, d: 23, kg: 8 },
  { name: 'Cathay Pacific', code: 'CX', h: 56, w: 36, d: 23, kg: 7 },
  { name: 'Copa Airlines', code: 'CM', h: 56, w: 36, d: 26, kg: 10 },
  { name: 'Delta Air Lines', code: 'DL', h: 56, w: 35, d: 23, kg: 10 },
  { name: 'easyJet', code: 'U2', h: 56, w: 45, d: 25, kg: 15 },
  { name: 'Emirates', code: 'EK', h: 55, w: 38, d: 22, kg: 7 },
  { name: 'Ethiopian Airlines', code: 'ET', h: 55, w: 40, d: 23, kg: 7 },
  { name: 'Frontier Airlines', code: 'F9', h: 61, w: 41, d: 25, kg: 10 },
  { name: 'Garuda Indonesia', code: 'GA', h: 56, w: 36, d: 23, kg: 7 },
  { name: 'Hainan Airlines', code: 'HU', h: 55, w: 40, d: 20, kg: 5 },
  { name: 'Iberia', code: 'IB', h: 55, w: 40, d: 20, kg: 10 },
  { name: 'IndiGo', code: '6E', h: 55, w: 35, d: 25, kg: 7 },
  { name: 'Japan Airlines', code: 'JL', h: 55, w: 40, d: 25, kg: 10 },
  { name: 'JetBlue Airways', code: 'B6', h: 56, w: 36, d: 23, kg: 10 },
  { name: 'KLM Royal Dutch', code: 'KL', h: 55, w: 35, d: 25, kg: 12 },
  { name: 'Lufthansa', code: 'LH', h: 55, w: 40, d: 23, kg: 8 },
  { name: 'Malaysia Airlines', code: 'MH', h: 55, w: 40, d: 20, kg: 7 },
  { name: 'Qantas', code: 'QF', h: 56, w: 36, d: 23, kg: 7 },
  { name: 'Qatar Airways', code: 'QR', h: 50, w: 37, d: 25, kg: 7 },
  { name: 'Ryanair', code: 'FR', h: 55, w: 40, d: 20, kg: 10 },
  { name: 'Scandinavian Airlines', code: 'SK', h: 55, w: 40, d: 23, kg: 8 },
  { name: 'Singapore Airlines', code: 'SQ', h: 55, w: 40, d: 20, kg: 7 },
  { name: 'Southwest Airlines', code: 'WN', h: 61, w: 41, d: 25, kg: 10 },
  { name: 'Spirit Airlines', code: 'NK', h: 56, w: 46, d: 25, kg: 10 },
  { name: 'TAP Air Portugal', code: 'TP', h: 55, w: 40, d: 20, kg: 8 },
  { name: 'Thai Airways', code: 'TG', h: 56, w: 45, d: 25, kg: 7 },
  { name: 'Turkish Airlines', code: 'TK', h: 55, w: 40, d: 23, kg: 8 },
  { name: 'Uzbekistan Airways', code: 'HY', h: 56, w: 45, d: 25, kg: 8 },
  { name: 'Virgin Atlantic', code: 'VS', h: 56, w: 36, d: 23, kg: 10 },
  { name: 'Virgin Australia', code: 'VA', h: 56, w: 36, d: 23, kg: 7 },
  { name: 'Vueling', code: 'VY', h: 55, w: 40, d: 20, kg: 10 },
  { name: 'Wizz Air', code: 'W6', h: 55, w: 40, d: 23, kg: 10 },
];

function websiteFor(code: string): string {
  return ALL_AIRLINES.find((a) => a.code === code)?.website ?? (code === 'W6' ? 'https://wizzair.com' : '');
}

const FEES = [
  { label: 'Extra checked bag (online)', value: '$45 – $90' },
  { label: 'Extra checked bag (airport)', value: '$75 – $140' },
  { label: 'Overweight 23–32 kg', value: '$100' },
  { label: 'Oversize over 158 cm', value: '$150 – $200' },
  { label: 'Gate-checked cabin bag', value: '$70 – $120' },
];

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
};

const CLASSES: LuggageClass[] = [
  { title: 'Personal item', trip: 'Any trip', use: 'Under the seat', w: 30, h: 40, d: 15, note: 'A handbag, laptop bag or small backpack. Almost never weighed, but it has to fit under the seat in front of you.', fill: '#e7effc', sideFill: '#d5e3fb', stroke: '#93b4ef', ink: '#1b4694' },
  { title: 'Cabin bag', trip: '1–3 days', use: 'Overhead bin', w: 40, h: 55, d: 23, note: 'The standard carry-on size accepted by most airlines. Budget carriers cut this down, so check before you fly.', fill: '#cff5ec', sideFill: '#b8efe1', stroke: '#5eddc4', ink: '#0b5f56' },
  { title: 'Medium suitcase', trip: '1–2 weeks', use: 'Checked', w: 45, h: 67, d: 27, note: 'The most common checked bag. Comfortably inside the 158 cm total limit and usually under 23 kg when packed.', fill: '#fdf1dc', sideFill: '#f8e3bd', stroke: '#e9b969', ink: '#7a5406' },
  { title: 'Large suitcase', trip: '2+ weeks', use: 'Checked', w: 52, h: 78, d: 32, note: 'Close to the 158 cm total limit. Easy to exceed the weight allowance before you run out of space.', fill: '#fdecec', sideFill: '#fbdada', stroke: '#f0a9a9', ink: '#8d2f2f' },
];

const K = 1.55;

type Sort = 'name' | 'strict' | 'generous';

export function LuggageGuideClient() {
  const [metric, setMetric] = useState(true);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('name');
  const [expand, setExpand] = useState(false);

  const cv = (v: number) => (metric ? v : Math.round(v / 2.54));
  const len = (v: number) => `${cv(v)} ${metric ? 'cm' : 'in'}`;
  const wt = (v: number) => `${metric ? v : Math.round(v * 2.205)} ${metric ? 'kg' : 'lb'}`;

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = AIRLINES.filter((a) => !q || a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q));
    const vol = (a: Row) => a.h * a.w * a.d;
    if (sort === 'strict') filtered = [...filtered].sort((a, b) => vol(a) - vol(b) || a.kg - b.kg);
    else if (sort === 'generous') filtered = [...filtered].sort((a, b) => vol(b) - vol(a) || b.kg - a.kg);
    else filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [query, sort]);

  const shown = expand ? list : list.slice(0, 12);
  const noMatches = list.length === 0;
  const showMore = expand || list.length > 12;

  return (
    <div style={{ width: '100%', background: '#f7f8f9' }}>
      <Header />

      <main id="top" style={{ maxWidth: 1200, margin: '0 auto', padding: '34px 24px 8px' }}>
        <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(26px,3.6vw,34px)', fontWeight: 800, letterSpacing: '-.03em' }}>Luggage guide</h1>
        <p style={{ margin: '0 0 26px', maxWidth: 680, fontSize: 14, lineHeight: 1.75, color: '#57677c' }}>
          Standard suitcase dimensions, the limits each airline publishes, and how bags are actually measured at the gate. If you already know your dimensions, run them through the{' '}
          <Link href="/size-checker">size checker</Link> instead.
        </p>

        {/* Standard luggage classes */}
        <section style={{ marginBottom: 26 }}>
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
            {CLASSES.map((c) => {
              const drawW = Math.round(c.w * K);
              const drawH = Math.round(c.h * K);
              const drawD = Math.max(24, Math.round(c.d * K));
              return (
                <div key={c.title} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.015em' }}>{c.title}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: '#8494a8', whiteSpace: 'nowrap' }}>{c.trip}</span>
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: 11, padding: '18px 14px 14px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 14, minHeight: 170 }}>
                    <div style={{ position: 'relative', width: drawW, height: drawH }}>
                      <div style={{ position: 'absolute', left: '50%', top: -17, transform: 'translateX(-50%)', width: '38%', height: 20, border: '5px solid #94a3b8', borderBottom: 'none', borderRadius: '11px 11px 0 0' }} />
                      <div style={{ position: 'absolute', inset: 0, background: c.fill, border: `2px solid ${c.stroke}`, borderRadius: 11 }} />
                      <div style={{ position: 'absolute', left: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />
                      <div style={{ position: 'absolute', right: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />
                      <div style={{ position: 'absolute', left: '16%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                      <div style={{ position: 'absolute', right: '16%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                      <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 11.5, fontWeight: 700, color: c.ink, whiteSpace: 'nowrap' }}>
                        {cv(c.w)} × {cv(c.h)}
                      </span>
                    </div>
                    <div style={{ position: 'relative', width: drawD, height: drawH }}>
                      <div style={{ position: 'absolute', left: '50%', top: -17, transform: 'translateX(-50%)', width: 5, height: 20, borderRadius: 3, background: '#94a3b8' }} />
                      <div style={{ position: 'absolute', inset: 0, background: c.sideFill, border: `2px solid ${c.stroke}`, borderRadius: 11 }} />
                      <div style={{ position: 'absolute', left: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                      <div style={{ position: 'absolute', right: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                      <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 11, fontWeight: 700, color: c.ink, whiteSpace: 'nowrap' }}>{cv(c.d)}</span>
                    </div>
                  </div>
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
              );
            })}
          </div>
        </section>

        {/* Airline limits table */}
        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>Airline limits, side by side</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12.5, color: '#8494a8' }}>
                {list.length} of {AIRLINES.length} airlines
              </span>
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
          </div>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: '#7a8798' }}>Carry-on and checked baggage limits as published by each airline. Wheels and handles are always included.</p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
            <div style={{ flex: '1 1 260px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #e4eaf1', borderRadius: 10, padding: '11px 14px', background: '#fff' }}>
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a9b4c2" strokeWidth={2} strokeLinecap="round">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l5 5" />
              </svg>
              <input
                placeholder="Search airline by name or code"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setExpand(true);
                }}
                style={{ flex: 1, minWidth: 0, border: 'none', fontSize: 13.5, color: '#0f1c2e', background: 'transparent' }}
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              style={{ flex: '0 1 220px', border: '1px solid #e4eaf1', borderRadius: 10, padding: '11px 14px', fontSize: 13, fontWeight: 600, color: '#0f1c2e', background: '#fff' }}
            >
              <option value="name">Sort by: Name</option>
              <option value="strict">Sort by: Strictest carry-on</option>
              <option value="generous">Sort by: Most generous</option>
            </select>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 700 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.1fr .7fr 1.1fr 1.1fr', gap: 12, padding: '0 4px 12px', fontSize: 11.5, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase', color: '#8494a8', borderBottom: '1px solid #eef2f7' }}>
                <span>Airline</span>
                <span>Carry-on size ({metric ? 'cm' : 'in'})</span>
                <span>Carry-on weight</span>
                <span>Personal item ({metric ? 'cm' : 'in'})</span>
                <span>
                  Checked ({metric ? 'cm' : 'in'} / {metric ? 'kg' : 'lb'})
                </span>
              </div>
              {shown.map((a) => (
                <div key={a.name} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.1fr .7fr 1.1fr 1.1fr', gap: 12, alignItems: 'center', padding: '13px 4px', borderBottom: '1px solid #f5f8fb', fontSize: 12.5, color: '#475569', fontVariantNumeric: 'tabular-nums' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    <AirlineLogo code={a.code} website={websiteFor(a.code)} width={32} height={24} radius={7} fontSize={9} />
                    <span style={{ fontWeight: 700, color: '#0f1c2e' }}>{a.name}</span>
                  </span>
                  <span style={{ whiteSpace: 'nowrap' }}>
                    {cv(a.h)} × {cv(a.w)} × {cv(a.d)}
                  </span>
                  <span style={{ whiteSpace: 'nowrap' }}>{wt(a.kg)}</span>
                  <span style={{ whiteSpace: 'nowrap' }}>
                    {cv(40)} × {cv(30)} × {cv(15)}
                  </span>
                  <span style={{ whiteSpace: 'nowrap' }}>
                    {cv(158)} total / {wt(23)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {noMatches && <p style={{ margin: '16px 0 0', fontSize: 13, color: '#8494a8' }}>No airlines match that search.</p>}
          {showMore && (
            <button onClick={() => setExpand((e) => !e)} style={{ marginTop: 16, border: 'none', background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, color: '#0d9488', cursor: 'pointer' }}>
              {expand ? 'Show fewer airlines' : `Show all ${list.length} airlines`}
            </button>
          )}
        </section>

        {/* Sizer + fees */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 18, marginBottom: 26 }}>
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

        {/* CTA */}
        <section style={{ background: '#fdf8ee', border: '1px solid #f3ebdb', borderRadius: 14, padding: 'clamp(30px,4vw,44px) 28px', textAlign: 'center', marginBottom: 40 }}>
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
