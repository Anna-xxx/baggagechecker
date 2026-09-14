'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirlineLogo } from '@/components/AirlineLogo';
import { BagDiagram, type BagType } from '@/components/BagDiagram';
import { AIRLINES, airlineSlug, airlineBaggageUrl, getAirlineBaggage, BAGGAGE_RULES_REVIEW_DATE, type Airline } from '@/lib/airlines';

type Bag = { w: number; h: number; d: number; kg: number };
export function AirlineDetailClient({ airline }: { airline: Airline }) {
  const [metric, setMetric] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  const baggage = getAirlineBaggage(airline);
  const cabin = baggage.carryOn;
  const personal = baggage.personal;
  const info = baggage.checked;

  const len = (v: number) => (metric ? `${v} cm` : `${Math.round(v / 2.54)} in`);
  const wt = (v: number) => (metric ? `${v} kg` : `${Math.round(v * 2.205)} lb`);
  const dims = (b: Bag) => `${metric ? b.w : Math.round(b.w / 2.54)} × ${metric ? b.h : Math.round(b.h / 2.54)} × ${len(b.d)}`;

  const personalBag: Bag = {
    w: personal.w ?? 30,
    h: personal.h ?? 40,
    d: personal.d ?? 20,
    kg: personal.kg,
  };
  const personalRows =
    personal.rule === 'dimensions'
      ? [
          { label: 'Max dimensions', value: dims(personalBag) },
          { label: 'Max width', value: len(personalBag.w) },
          { label: 'Max height', value: len(personalBag.h) },
          { label: 'Max depth', value: len(personalBag.d) },
          { label: 'Max weight', value: personal.kg ? wt(personal.kg) : 'No weight limit' },
        ]
      : personal.rule === 'either'
        ? [
            { label: 'Max dimensions (or)', value: dims(personalBag) },
            { label: 'Maximum total dimensions (or)', value: `${personal.linearCm} cm (L + W + H)` },
            { label: 'Max weight', value: personal.kg ? wt(personal.kg) : 'No weight limit' },
          ]
        : personal.rule === 'linear'
        ? [
            { label: 'Maximum total dimensions', value: `${personal.linearCm} cm (L + W + H)` },
            { label: 'Max weight', value: personal.kg ? wt(personal.kg) : 'No weight limit' },
          ]
        : personal.rule === 'fitUnderSeat'
          ? [
              { label: 'Size rule', value: 'Must fit under seat' },
              { label: 'Max weight', value: personal.kg ? wt(personal.kg) : 'No weight limit' },
            ]
          : personal.rule === 'notSeparate'
            ? [{ label: 'Allowance', value: 'Not included' }]
            : [
                { label: 'Dimensions', value: 'Not published' },
                { label: 'Max weight', value: personal.kg ? wt(personal.kg) : 'No weight limit' },
              ];

  const carryOnLinearAddsConstraint = Boolean(cabin.linearCm && (cabin.linearOnly || cabin.w + cabin.h + cabin.d > cabin.linearCm));

  const carryOnRows = cabin.linearOnly
    ? [
        { label: 'Maximum total dimensions', value: `${cabin.linearCm} cm (L + W + H)` },
        { label: cabin.weightRule === 'combinedWithPersonal' ? 'Max total cabin weight' : 'Max weight', value: cabin.kg ? `${wt(cabin.kg)}${cabin.weightRule === 'combinedWithPersonal' ? ' incl. personal item' : ''}` : 'No weight limit' },
      ]
    : [
        { label: 'Max dimensions', value: dims(cabin) },
        { label: 'Max width', value: len(cabin.w) },
        { label: 'Max height', value: len(cabin.h) },
        { label: 'Max depth', value: len(cabin.d) },
        ...(carryOnLinearAddsConstraint && cabin.linearCm ? [{ label: 'Maximum total dimensions', value: `${cabin.linearCm} cm (L + W + H)` }] : []),
        { label: 'Max weight', value: cabin.kg ? wt(cabin.kg) : 'No weight limit' },
      ];

  const checkedRows = info.manualCheck
    ? [
        { label: 'Allowance', value: 'Route / fare dependent' },
        ...(info.rule === 'dimensions' && info.w && info.h && info.d
          ? [{ label: 'Max dimensions', value: `${info.h} × ${info.w} × ${info.d} cm` }]
          : info.total
            ? [{ label: 'Published size limit', value: `${len(info.total)} (L + W + H)` }]
            : []),
      ]
    : info.rule === 'dimensions'
      ? [
          { label: 'Max dimensions', value: `${info.h} × ${info.w} × ${info.d} cm` },
          { label: 'Standard bag weight', value: wt(info.kg) },
          { label: 'Bags included', value: info.bags },
        ]
      : [
          { label: 'Max total dimensions', value: `${len(info.total)} (L + W + H)` },
          { label: 'Standard bag weight', value: wt(info.kg) },
          { label: 'Oversize threshold', value: `over ${len(info.total)}` },
          { label: 'Bags included', value: info.bags },
        ];

  const sourceLabel = `Baggage allowance for ${airline.name} · check fare, route and operating-carrier conditions before travel`;

  const allowances = [
    {
      title: 'Personal Item',
      badge: 'PI',
      tint: '#e7effc',
      iconColor: '#2563eb',
      what: 'Goes under the seat in front of you',
      bag: personalBag,
      kind: 'personal' as BagType,
      rows: personalRows,
      note: 'A handbag, laptop bag or small backpack that fits under the seat in front of you.',
    },
    {
      title: 'Carry-on Baggage',
      badge: 'CO',
      tint: '#e3f5f2',
      iconColor: '#0f766e',
      what: 'Goes in the overhead bin',
      bag: cabin,
      kind: 'carryon' as BagType,
      rows: carryOnRows,
      note: cabin.note ?? 'One cabin bag per passenger. Measured with wheels and handles included.',
    },
    {
      title: 'Checked Baggage',
      badge: 'CB',
      tint: '#fdf1dc',
      iconColor: '#b98107',
      what: 'Handed over at the check-in desk',
      bag: { w: 45, h: 67, d: 27, kg: info.eco },
      kind: 'checked' as BagType,
      rows: checkedRows,
      note: info.note ?? 'Allowance depends on your fare and route. Check your booking for the included number of bags.',
    },
  ];

  const classes = (airline.classAllowances ?? []).map((row) => ({
    name: row.name,
    cabin: row.carryOn,
    bags: row.checkedBags,
    weight: row.weightPerBag,
    note: row.note,
  }));


  // Carrier pages used to be reachable only from the directory, which left each of them
  // with a single inbound link. Same-country carriers first — that is the comparison a
  // traveller actually makes — then others, so every page sits in a web rather than a spoke.
  const related = [
    ...AIRLINES.filter((a) => a.country === airline.country && a.code !== airline.code),
    ...AIRLINES.filter((a) => a.country !== airline.country && a.code !== airline.code),
  ].slice(0, 6);

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
            <a
              href={airlineBaggageUrl(airline.code, airline.website)}
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
              <div style={{ background: '#f8fafc', borderRadius: 11, padding: '20px 16px 16px', marginBottom: 12 }}>
                <BagDiagram
                  type={a.kind}
                  w={a.bag.w}
                  h={a.bag.h}
                  d={a.bag.d}
                  widthLabel={len(a.bag.w)}
                  heightLabel={len(a.bag.h)}
                  depthLabel={len(a.bag.d)}
                  minHeight={200}
                />
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 11, padding: '4px 16px', marginBottom: 14 }}>
                {a.rows.map((r) => (
                  <div key={r.label} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14, padding: '12px 0', borderBottom: '1px solid #eef2f6' }}>
                    <span style={{ flex: 'none', fontSize: 12.5, color: '#57677c' }}>{r.label}</span>
                    {/* Values run from "23 kg" to a full sentence about fare rules, so they wrap
                        instead of being pinned to one line and pushed outside the card. */}
                    <span style={{ flex: '1 1 auto', minWidth: 0, fontSize: 12.5, fontWeight: 800, fontVariantNumeric: 'tabular-nums', textAlign: 'right', overflowWrap: 'anywhere' }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>{a.note}</p>
            </div>
          ))}
        </section>

        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 20 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800, letterSpacing: '-.015em' }}>Allowance by Cabin Class / Fare</h2>
          {classes.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <div style={{ minWidth: 560 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.25fr 1.25fr 1fr', gap: 12, padding: '0 4px 12px', fontSize: 11.5, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase', color: '#8494a8', borderBottom: '1px solid #eef2f6' }}>
                  <span>Class / fare</span>
                  <span>Carry-on</span>
                  <span>Checked bags</span>
                  <span>Weight / allowance</span>
                </div>
                {classes.map((row) => (
                  <div key={row.name} style={{ padding: '14px 4px', borderBottom: '1px solid #f5f8fb' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.25fr 1.25fr 1fr', gap: 12, alignItems: 'center', fontSize: 12.5, color: '#475569', fontVariantNumeric: 'tabular-nums' }}>
                      <span style={{ fontWeight: 700, color: '#0f1c2e' }}>{row.name}</span>
                      <span>{row.cabin}</span>
                      <span>{row.bags}</span>
                      <span>{row.weight}</span>
                    </div>
                    {row.note && <div style={{ marginTop: 7, fontSize: 11.5, lineHeight: 1.55, color: '#8494a8' }}>{row.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background: '#f8fafc', borderRadius: 11, padding: '15px 16px', fontSize: 12.5, lineHeight: 1.65, color: '#57677c' }}>
              Exact cabin-class and fare baggage allowances vary by ticket, route and operating carrier. Use the airline baggage page or your booking confirmation for the applicable allowance.
            </div>
          )}
        </section>

        <p style={{ margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, lineHeight: 1.6, color: '#8494a8' }}>
          <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a9b4c2" strokeWidth={2} strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
          </svg>
          {sourceLabel}
        </p>

        {/* The cards above show the standard allowance. For carriers whose fare decides
            whether a cabin bag is included at all, that alone would mislead. */}
        {airline.carryOnVariants && airline.carryOnVariants.length > 1 && (
          <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 20 }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, letterSpacing: '-.015em' }}>Cabin allowance by fare</h2>
            <p style={{ margin: '0 0 16px', fontSize: 12.5, lineHeight: 1.65, color: '#57677c' }}>
              The figures above are the standard allowance. On {airline.name} it changes with the fare or cabin you book.
            </p>
            <div style={{ display: 'grid', gap: 10 }}>
              {airline.carryOnVariants.map((v) => {
                const excluded = v.allowed === false;
                return (
                  <div
                    key={v.id}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: 16,
                      flexWrap: 'wrap',
                      background: '#f8fafc',
                      borderLeft: `3px solid ${excluded ? '#c4cedb' : '#c6ebe5'}`,
                      borderRadius: '0 10px 10px 0',
                      padding: '12px 15px',
                    }}
                  >
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: '#0f1c2e' }}>{v.label.split(' · ')[0]}</span>
                    <span style={{ fontSize: 12.5, color: '#57677c', whiteSpace: 'nowrap' }}>
                      {excluded
                        ? 'Personal item only — no cabin bag'
                        : v.w && v.h && v.d
                          ? `${v.h} × ${v.w} × ${v.d} cm${v.kg ? ` · ${wt(v.kg)}` : ''}`
                          : v.kg
                            ? wt(v.kg)
                            : 'Included'}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 18, marginBottom: 20 }}>
          <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24 }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800, letterSpacing: '-.015em' }}>Excess &amp; Oversize Fees</h2>
            {/* We publish no fee figures because we have none verified. A table of invented
                numbers identical for every carrier was worse than an honest gap. */}
            <div style={{ background: '#f8fafc', borderRadius: 11, padding: '16px 18px', display: 'grid', gap: 9, fontSize: 12.5, lineHeight: 1.65, color: '#57677c' }}>
              <span>{airline.name} sets its own excess, overweight and gate-bag charges, and they change by route, fare and where you pay.</span>
              <span>We only publish figures we have checked against the carrier, and these are not among them — so the current amounts are on {airline.name}&apos;s own site.</span>
            </div>
            <a
              href={airline.baggageUrl || airline.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 14, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 10, padding: '10px 16px', fontSize: 12.5, fontWeight: 700, color: '#0f1c2e', textDecoration: 'none' }}
            >
              Check {airline.name} baggage fees
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </a>
            <p style={{ margin: '14px 0 0', fontSize: 12, lineHeight: 1.65, color: '#57677c' }}>Charges are usually lower when paid online before travel than at the airport.</p>
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
              Baggage rules last updated {BAGGAGE_RULES_REVIEW_DATE}
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

        <section style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 20 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 800, letterSpacing: '-.015em' }}>Compare with other airlines</h2>
          <p style={{ margin: '0 0 16px', fontSize: 12.5, color: '#8494a8' }}>
            Baggage limits differ sharply between carriers — these are the ones travellers most often weigh against {airline.name}.
          </p>
          <div className="grid-trio">
            {related.map((a) => (
              <Link
                key={a.code}
                href={`/airlines/${airlineSlug(a.name)}`}
                className="card-hover"
                style={{ display: 'flex', alignItems: 'center', gap: 11, border: '1px solid #edf0f3', borderRadius: 12, padding: '12px 14px', textDecoration: 'none', color: 'inherit' }}
              >
                <AirlineLogo code={a.code} width={34} height={34} radius={9} fontSize={11} />
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 13, fontWeight: 800 }}>{a.name}</span>
                  <span style={{ display: 'block', fontSize: 11.5, color: '#8494a8' }}>{a.country}</span>
                </span>
              </Link>
            ))}
          </div>
          <p style={{ margin: '16px 0 0', fontSize: 12.5 }}>
            <Link href="/airlines" style={{ color: '#0f766e', fontWeight: 700 }}>
              See all {AIRLINES.length} airlines →
            </Link>
          </p>
        </section>
      </main>

      <Footer maxWidth={1200} gap={32} logoSize={26} logoIconSize={15} copyrightSize={11} />
    </div>
  );
}
