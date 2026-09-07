'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirlineLogo } from '@/components/AirlineLogo';
import { type Airline } from '@/lib/airlines';

type Bag = { w: number; h: number; d: number; kg: number };
type Personal = { w: number; h: number; d: number };
type CheckedInfo = { total: number; eco: number; biz: number; bags: string };

const AIRLINE_OVERRIDES: Record<string, { cabin: Bag; personal: Personal } & CheckedInfo> = {
  AA: { cabin: { w: 36, h: 56, d: 23, kg: 0 }, personal: { w: 36, h: 46, d: 20 }, total: 158, eco: 23, biz: 32, bags: '1 in economy (fee applies on most domestic fares)' },
  DL: { cabin: { w: 35, h: 56, d: 23, kg: 0 }, personal: { w: 36, h: 43, d: 20 }, total: 158, eco: 23, biz: 32, bags: '1 in economy on most international fares' },
  BA: { cabin: { w: 45, h: 56, d: 25, kg: 23 }, personal: { w: 30, h: 40, d: 15 }, total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business' },
  LH: { cabin: { w: 40, h: 55, d: 23, kg: 8 }, personal: { w: 30, h: 40, d: 10 }, total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business' },
  AC: { cabin: { w: 40, h: 55, d: 23, kg: 0 }, personal: { w: 33, h: 43, d: 16 }, total: 158, eco: 23, biz: 32, bags: '1 in economy on most fares' },
  AF: { cabin: { w: 35, h: 55, d: 25, kg: 12 }, personal: { w: 30, h: 40, d: 15 }, total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business' },
  EK: { cabin: { w: 38, h: 55, d: 22, kg: 7 }, personal: { w: 30, h: 40, d: 15 }, total: 150, eco: 30, biz: 40, bags: 'weight concept: 30 kg in economy' },
  QR: { cabin: { w: 37, h: 50, d: 25, kg: 7 }, personal: { w: 30, h: 40, d: 15 }, total: 158, eco: 25, biz: 32, bags: '1–2 bags depending on fare' },
  TK: { cabin: { w: 40, h: 55, d: 23, kg: 8 }, personal: { w: 30, h: 40, d: 15 }, total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business' },
  FR: { cabin: { w: 40, h: 55, d: 20, kg: 10 }, personal: { w: 25, h: 40, d: 20 }, total: 119, eco: 20, biz: 20, bags: 'none included — checked bags are paid extras' },
  U2: { cabin: { w: 45, h: 56, d: 25, kg: 15 }, personal: { w: 36, h: 45, d: 20 }, total: 275, eco: 23, biz: 23, bags: 'none included — checked bags are paid extras' },
};

const GENERIC_PERSONAL: Personal = { w: 30, h: 40, d: 20 };
const GENERIC_CHECKED: CheckedInfo = { total: 158, eco: 23, biz: 32, bags: '1 in economy' };

type BagKind = 'carryon' | 'personal' | 'checked';

const BAG_STYLE: Record<BagKind, { fill: string; sideFill: string; stroke: string; ink: string; radius: number; soft: boolean; hard: boolean; ribs: boolean; straps: boolean }> = {
  carryon: { fill: '#cff5ec', sideFill: '#b8efe1', stroke: '#5eddc4', ink: '#0b5f56', radius: 10, soft: false, hard: true, ribs: true, straps: false },
  personal: { fill: '#e7effc', sideFill: '#d5e3fb', stroke: '#93b4ef', ink: '#1b4694', radius: 16, soft: true, hard: false, ribs: false, straps: false },
  checked: { fill: '#fdf1dc', sideFill: '#f8e3bd', stroke: '#e9b969', ink: '#7a5406', radius: 10, soft: false, hard: true, ribs: false, straps: true },
};

function draw(b: Bag, kind: BagKind, metric: boolean) {
  const K = 1.5;
  return {
    ...BAG_STYLE[kind],
    drawW: Math.round(b.w * K),
    drawH: Math.round(b.h * K),
    drawD: Math.max(20, Math.round(b.d * K)),
    faceLabel: `${metric ? b.w : Math.round(b.w / 2.54)} × ${metric ? b.h : Math.round(b.h / 2.54)}`,
    depthValue: metric ? b.d : Math.round(b.d / 2.54),
  };
}

function BagIllustration({ b, kind, metric }: { b: Bag; kind: BagKind; metric: boolean }) {
  const s = draw(b, kind, metric);
  return (
    <div style={{ background: '#f8fafc', borderRadius: 11, padding: '20px 16px 16px', marginBottom: 12, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, minHeight: 150 }}>
      <div style={{ position: 'relative', width: s.drawW, height: s.drawH }}>
        {s.hard && <div style={{ position: 'absolute', left: '50%', top: -15, transform: 'translateX(-50%)', width: '36%', height: 18, border: '5px solid #94a3b8', borderBottom: 'none', borderRadius: '10px 10px 0 0' }} />}
        {s.soft && <div style={{ position: 'absolute', left: '50%', top: -17, transform: 'translateX(-50%)', width: '56%', height: 20, border: '4px solid #94a3b8', borderBottom: 'none', borderRadius: '999px 999px 0 0' }} />}
        <div style={{ position: 'absolute', inset: 0, background: s.fill, border: `2px solid ${s.stroke}`, borderRadius: s.radius }} />
        {s.ribs && <div style={{ position: 'absolute', left: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />}
        {s.ribs && <div style={{ position: 'absolute', right: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />}
        {s.soft && <div style={{ position: 'absolute', left: '16%', right: '16%', bottom: '14%', height: '28%', border: '2px solid rgba(15,28,46,.14)', borderRadius: 8 }} />}
        {s.straps && <div style={{ position: 'absolute', left: 0, right: 0, top: '22%', height: 7, background: 'rgba(15,28,46,.13)' }} />}
        {s.straps && <div style={{ position: 'absolute', left: 0, right: 0, bottom: '22%', height: 7, background: 'rgba(15,28,46,.13)' }} />}
        {s.straps && <div style={{ position: 'absolute', left: -1, bottom: -1, width: 18, height: 18, borderLeft: `4px solid ${s.stroke}`, borderBottom: `4px solid ${s.stroke}`, borderRadius: '0 0 0 10px' }} />}
        {s.straps && <div style={{ position: 'absolute', right: -1, bottom: -1, width: 18, height: 18, borderRight: `4px solid ${s.stroke}`, borderBottom: `4px solid ${s.stroke}`, borderRadius: '0 0 10px 0' }} />}
        {s.straps && <div style={{ position: 'absolute', left: 'calc(50% + 20px)', top: -13, width: 20, height: 13, border: `1.5px solid ${s.stroke}`, borderRadius: 3, background: '#fff' }} />}
        {s.hard && <div style={{ position: 'absolute', left: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />}
        {s.hard && <div style={{ position: 'absolute', right: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />}
        <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 10, fontWeight: 700, color: s.ink, whiteSpace: 'nowrap' }}>{s.faceLabel}</span>
      </div>
      <div style={{ position: 'relative', width: s.drawD, height: s.drawH }}>
        {s.hard && <div style={{ position: 'absolute', left: '50%', top: -15, transform: 'translateX(-50%)', width: 5, height: 18, borderRadius: 3, background: '#94a3b8' }} />}
        <div style={{ position: 'absolute', inset: 0, background: s.sideFill, border: `2px solid ${s.stroke}`, borderRadius: s.radius }} />
        {s.hard && <div style={{ position: 'absolute', left: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />}
        {s.hard && <div style={{ position: 'absolute', right: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />}
        <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 10, fontWeight: 700, color: s.ink, whiteSpace: 'nowrap' }}>{s.depthValue}</span>
      </div>
    </div>
  );
}

export function AirlineDetailClient({ airline }: { airline: Airline }) {
  const [metric, setMetric] = useState(true);
  const [fav, setFav] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const override = AIRLINE_OVERRIDES[airline.code];
  const cabin: Bag = override ? override.cabin : { w: airline.cabin[0], h: airline.cabin[1], d: airline.cabin[2], kg: airline.cabinKg };
  const personal: Personal = override ? override.personal : GENERIC_PERSONAL;
  const info: CheckedInfo = override ? override : GENERIC_CHECKED;

  const len = (v: number) => (metric ? `${v} cm` : `${Math.round(v / 2.54)} in`);
  const wt = (v: number) => (metric ? `${v} kg` : `${Math.round(v * 2.205)} lb`);
  const dims = (b: Bag) => `${metric ? b.w : Math.round(b.w / 2.54)} × ${metric ? b.h : Math.round(b.h / 2.54)} × ${len(b.d)}`;

  const sourceLabel = `Baggage allowance for ${airline.name} · figures reviewed September 2026`;

  const allowances = [
    {
      title: 'Personal Item',
      badge: 'PI',
      tint: '#e7effc',
      iconColor: '#2563eb',
      what: 'Goes under the seat in front of you',
      bag: { ...personal, kg: 0 },
      kind: 'personal' as BagKind,
      rows: [
        { label: 'Max dimensions', value: dims({ ...personal, kg: 0 }) },
        { label: 'Max width', value: len(personal.w) },
        { label: 'Max height', value: len(personal.h) },
        { label: 'Max depth', value: len(personal.d) },
        { label: 'Max weight', value: 'Not weighed' },
      ],
      note: 'A handbag, laptop bag or small backpack that fits under the seat in front of you.',
    },
    {
      title: 'Carry-on Baggage',
      badge: 'CO',
      tint: '#e3f5f2',
      iconColor: '#0f766e',
      what: 'Goes in the overhead bin',
      bag: cabin,
      kind: 'carryon' as BagKind,
      rows: [
        { label: 'Max dimensions', value: dims(cabin) },
        { label: 'Max width', value: len(cabin.w) },
        { label: 'Max height', value: len(cabin.h) },
        { label: 'Max depth', value: len(cabin.d) },
        { label: 'Max weight', value: cabin.kg ? wt(cabin.kg) : 'No published limit' },
      ],
      note: 'One cabin bag per passenger. Measured with wheels and handles included.',
    },
    {
      title: 'Checked Baggage',
      badge: 'CB',
      tint: '#fdf1dc',
      iconColor: '#b98107',
      what: 'Handed over at the check-in desk',
      bag: { w: 45, h: 67, d: 27, kg: info.eco },
      kind: 'checked' as BagKind,
      rows: [
        { label: 'Max total dimensions', value: `${len(info.total)} (L + W + H)` },
        { label: 'Max weight (economy)', value: wt(info.eco) },
        { label: 'Max weight (business)', value: wt(info.biz) },
        { label: 'Oversize threshold', value: `over ${len(info.total)}` },
        { label: 'Bags included', value: info.bags },
      ],
      note: 'Allowance depends on your fare. Extra bags can be added during booking.',
    },
  ];

  const classes = [
    { name: 'Economy', cabin: '1 bag + item', bags: `1 × ${info.eco} kg`, weight: wt(info.eco) },
    { name: 'Premium Economy', cabin: '1 bag + item', bags: `2 × ${info.eco} kg`, weight: wt(info.eco) },
    { name: 'Business', cabin: '2 bags + item', bags: `2 × ${info.biz} kg`, weight: wt(info.biz) },
    { name: 'First', cabin: '2 bags + item', bags: `3 × ${info.biz} kg`, weight: wt(info.biz) },
  ];

  const fees = [
    { label: 'Extra checked bag', value: '$75 – $120' },
    { label: 'Overweight (23–32 kg)', value: '$100' },
    { label: 'Overweight (32–45 kg)', value: '$200' },
    { label: 'Oversize (over ' + len(info.total) + ')', value: '$150' },
    { label: 'Gate-checked cabin bag', value: '$70' },
  ];

  const faqs = [
    {
      question: `Does ${airline.name} allow free cabin baggage?`,
      answer: `Yes, ${airline.name} typically allows free carry-on baggage within their specified size and weight limits. Check the dimensions above to ensure your bag complies with ${airline.name} regulations.`,
    },
    {
      question: `What happens if my bag doesn't fit ${airline.name}'s sizer?`,
      answer: `If your bag doesn't fit in ${airline.name}'s sizing frame at the airport, you'll need to check it as hold luggage, which may incur additional fees depending on your ticket type and baggage allowance.`,
    },
    {
      question: `Can I bring a personal item in addition to my ${airline.name} carry-on?`,
      answer: `Most ${airline.name} fare types allow a small personal item (like a handbag or laptop bag) in addition to your main carry-on. Check your specific ticket conditions for personal item size limits and restrictions.`,
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Header />

      <main id="top" style={{ maxWidth: 1160, margin: '0 auto', padding: '28px 24px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#8494a8', marginBottom: 22 }}>
          <Link href="/" style={{ color: '#8494a8' }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/airlines" style={{ color: '#8494a8' }}>
            Airlines
          </Link>
          <span>/</span>
          <span style={{ color: '#0f1c2e', fontWeight: 700 }}>{airline.name}</span>
        </div>

        <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(24px,3.4vw,32px)', fontWeight: 800, letterSpacing: '-.03em' }}>{airline.name} Baggage Size &amp; Weight Limits</h1>
        <p style={{ margin: '0 0 26px', maxWidth: 820, fontSize: 14, lineHeight: 1.75, color: '#57677c' }}>
          This page lists the {airline.name} cabin and checked baggage allowances, including maximum dimensions, weight limits and excess baggage fees. Use the size checker to confirm your own suitcase fits before
          you get to the airport.
        </p>

        <a
          href="#baggage-types"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 22, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 10, padding: '10px 15px', fontSize: 12.5, fontWeight: 700, color: '#0f1c2e', textDecoration: 'none' }}
        >
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2} strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
          </svg>
          What is carry-on, personal item and checked baggage?
          <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a9b4c2" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="M6 13l6 6 6-6" />
          </svg>
        </a>

        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginBottom: 18 }}>
          <AirlineLogo code={airline.code} website={airline.website} width={60} height={60} radius={12} fontSize={13} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.025em' }}>{airline.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 5, fontSize: 12.5, color: '#8494a8' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 13l20-7-7 20-3-8z" />
                </svg>
                {airline.code}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
                  <circle cx="12" cy="11" r="2.2" />
                </svg>
                {airline.country}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => setMetric((m) => !m)}
              className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 10, padding: '9px 14px', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, color: '#0f1c2e', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.1} strokeLinecap="round">
                <path d="M4 8h14l-3-3M20 16H6l3 3" />
              </svg>
              {metric ? 'cm / kg' : 'in / lb'}
            </button>
            <button
              onClick={() => setFav((f) => !f)}
              className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 10, padding: '9px 14px', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, color: '#0f1c2e', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill={fav ? '#ef6a5a' : 'none'} stroke={fav ? '#ef6a5a' : '#8494a8'} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20z" />
              </svg>
              {fav ? 'Saved' : 'Add to Favorites'}
            </button>
            <a
              href={airline.website}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fbbf47', color: '#3a2a05', borderRadius: 10, padding: '10px 16px', fontSize: 12.5, fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Visit Website
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3a2a05" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4h6v6" />
                <path d="M20 4l-9 9" />
                <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
              </svg>
            </a>
          </div>
        </section>

        <p style={{ margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, lineHeight: 1.6, color: '#8494a8' }}>
          <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a9b4c2" strokeWidth={2} strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
          </svg>
          {sourceLabel}
        </p>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 18, marginBottom: 20 }}>
          {allowances.map((a) => (
            <div key={a.title} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11, marginBottom: 14 }}>
                <span style={{ flex: 'none', display: 'flex', width: 34, height: 34, borderRadius: 10, background: a.tint, alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: a.iconColor }}>{a.badge}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 15, fontWeight: 800, letterSpacing: '-.015em' }}>{a.title}</span>
                  <span style={{ display: 'block', marginTop: 3, fontSize: 12, lineHeight: 1.5, color: '#7a8798' }}>{a.what}</span>
                </span>
              </div>
              <BagIllustration b={a.bag} kind={a.kind} metric={metric} />
              <div style={{ background: '#f8fafc', borderRadius: 11, padding: '4px 16px', marginBottom: 14 }}>
                {a.rows.map((r) => (
                  <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '12px 0', borderBottom: '1px solid #eef2f6' }}>
                    <span style={{ fontSize: 12.5, color: '#57677c' }}>{r.label}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>{a.note}</p>
            </div>
          ))}
        </section>

        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 20 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800, letterSpacing: '-.015em' }}>Allowance by Cabin Class</h2>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 520 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr 1fr', gap: 12, padding: '0 4px 12px', fontSize: 11.5, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase', color: '#8494a8', borderBottom: '1px solid #eef2f6' }}>
                <span>Class</span>
                <span>Carry-on</span>
                <span>Checked bags</span>
                <span>Weight per bag</span>
              </div>
              {classes.map((c) => (
                <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr 1fr', gap: 12, alignItems: 'center', padding: '14px 4px', borderBottom: '1px solid #f5f8fb', fontSize: 12.5, color: '#475569', fontVariantNumeric: 'tabular-nums' }}>
                  <span style={{ fontWeight: 700, color: '#0f1c2e' }}>{c.name}</span>
                  <span>{c.cabin}</span>
                  <span>{c.bags}</span>
                  <span>{c.weight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <p style={{ margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, lineHeight: 1.6, color: '#8494a8' }}>
          <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a9b4c2" strokeWidth={2} strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
          </svg>
          {sourceLabel}
        </p>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 18, marginBottom: 20 }}>
          <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24 }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800, letterSpacing: '-.015em' }}>Excess &amp; Oversize Fees</h2>
            <div style={{ background: '#f8fafc', borderRadius: 11, padding: '4px 16px' }}>
              {fees.map((f) => (
                <div key={f.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '12px 0', borderBottom: '1px solid #eef2f6' }}>
                  <span style={{ fontSize: 12.5, color: '#57677c' }}>{f.label}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, whiteSpace: 'nowrap' }}>{f.value}</span>
                </div>
              ))}
            </div>
            <p style={{ margin: '14px 0 0', fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>Fees vary by route and are usually cheaper when paid online before travel than at the airport.</p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24 }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800, letterSpacing: '-.015em' }}>Good to Know</h2>
            <div style={{ display: 'grid', gap: 10, fontSize: 12.5, color: '#57677c', lineHeight: 1.6 }}>
              <span>Published dimensions include wheels, handles and external pockets.</span>
              <span>Baggage rules can differ on codeshare and partner-operated flights.</span>
              <span>Special items such as sports gear or instruments need advance booking.</span>
              <span>Always confirm on the airline&apos;s website before you travel.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, paddingTop: 16, borderTop: '1px solid #f0f2f5', fontSize: 11.5, color: '#8494a8' }}>
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              Baggage rules last updated June 2026
            </div>
          </div>
        </section>

        <section style={{ background: '#fdf8ee', border: '1px solid #f3ebdb', borderRadius: 14, padding: 26, textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>Will your bag fit {airline.name}?</h2>
          <p style={{ margin: '0 auto 20px', maxWidth: 520, fontSize: 13, lineHeight: 1.7, color: '#57677c' }}>Enter your suitcase dimensions in the size checker and see instantly whether it meets these limits.</p>
          <Link
            href="/size-checker"
            className="cta-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fbbf47', color: '#3a2a05', borderRadius: 10, padding: '13px 24px', fontSize: 13.5, fontWeight: 800, textDecoration: 'none' }}
          >
            Check my bag for {airline.name}
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a2a05" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </section>

        <section id="baggage-types" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 36, scrollMarginTop: 80 }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 800, letterSpacing: '-.015em' }}>The three baggage types, explained</h2>
          <p style={{ margin: '0 0 20px', maxWidth: 680, fontSize: 13, lineHeight: 1.7, color: '#57677c' }}>
            Airlines split what you travel with into three allowances. Each has its own size and weight limit, and the one you exceed decides what you pay.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 16 }}>
            <div>
              <div style={{ marginBottom: 14, borderRadius: 10, overflow: 'hidden', background: '#f8fafc', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg aria-hidden="true" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeOpacity={0.35} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 9a5 5 0 0 1 10 0v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
                  <path d="M10 9V7a2 2 0 0 1 4 0v2" />
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ flex: 'none', display: 'flex', width: 32, height: 32, borderRadius: 9, background: '#e7effc', alignItems: 'center', justifyContent: 'center' }}>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 9a5 5 0 0 1 10 0v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
                    <path d="M10 9V7a2 2 0 0 1 4 0v2" />
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 5 }}>Personal item</div>
                  <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>The small bag that goes under the seat in front of you — handbag, laptop bag or small backpack. Usually free and rarely weighed.</p>
                </div>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: 14, borderRadius: 10, overflow: 'hidden', background: '#f8fafc', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg aria-hidden="true" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeOpacity={0.35} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="7" width="14" height="14" rx="2.5" />
                  <path d="M9.5 7V4.6A.6.6 0 0 1 10.1 4h3.8a.6.6 0 0 1 .6.6V7" />
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ flex: 'none', display: 'flex', width: 32, height: 32, borderRadius: 9, background: '#e3f5f2', alignItems: 'center', justifyContent: 'center' }}>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="7" width="14" height="14" rx="2.5" />
                    <path d="M9.5 7V4.6A.6.6 0 0 1 10.1 4h3.8a.6.6 0 0 1 .6.6V7" />
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 5 }}>Carry-on</div>
                  <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>The wheeled case you take into the cabin and store in the overhead bin. Sized at the gate, and weighed by many airlines.</p>
                </div>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: 14, borderRadius: 10, overflow: 'hidden', background: '#f8fafc', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg aria-hidden="true" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#b98107" strokeOpacity={0.35} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="16" height="15" rx="2.5" />
                  <path d="M9 6V3.6A.6.6 0 0 1 9.6 3h4.8a.6.6 0 0 1 .6.6V6" />
                  <path d="M9.6 11v6M14.4 11v6" />
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ flex: 'none', display: 'flex', width: 32, height: 32, borderRadius: 9, background: '#fdf1dc', alignItems: 'center', justifyContent: 'center' }}>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b98107" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="6" width="16" height="15" rx="2.5" />
                    <path d="M9 6V3.6A.6.6 0 0 1 9.6 3h4.8a.6.6 0 0 1 .6.6V6" />
                    <path d="M9.6 11v6M14.4 11v6" />
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 5 }}>Checked baggage</div>
                  <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>The large suitcase you hand over at the desk and collect at your destination. Charged by bag, with strict weight limits.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 0 56px' }}>
          <h2 style={{ margin: '0 0 22px', textAlign: 'center', fontSize: 22, fontWeight: 800, letterSpacing: '-.025em' }}>Frequently Asked Questions</h2>
          {faqs.map((q, i) => {
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
