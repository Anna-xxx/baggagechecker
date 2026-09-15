import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SizeCheckerClient } from '@/app/size-checker/SizeCheckerClient';
import { AIRLINES, BAGGAGE_RULES_REVIEW_DATE } from '@/lib/airlines';

export const metadata: Metadata = {
  title: 'Draft – BaggageChecker Combined Experience',
  description: 'Internal draft combining the strongest parts of the BaggageChecker home page and luggage size checker.',
  robots: { index: false, follow: false },
};

const TRUST_POINTS = [
  'Limits taken from each carrier’s own published policy',
  'Route, fare and aircraft variants shown separately, not averaged',
  'Free, no account, nothing to install',
];

const BAG_TYPES = [
  ['Personal item', 'The small bag that goes under the seat in front of you — handbag, laptop bag or small backpack. Usually free and rarely weighed.', '#e7effc', '#2563eb'],
  ['Carry-on', 'The wheeled case you take into the cabin and store in the overhead bin. Sized at the gate, and weighed by many airlines.', '#e3f5f2', '#0f766e'],
  ['Checked baggage', 'The large suitcase you hand over at the desk and collect at your destination. Charged by bag, with strict weight limits.', '#fdf1dc', '#b98107'],
] as const;

const HOW_TO = [
  ['1', 'Measure Your Luggage', 'Use a measuring tape to get exact dimensions of your suitcase including handles, wheels, and any protrusions.', '#e0edff', '#2563eb'],
  ['2', 'Enter Dimensions', 'Input your luggage measurements into our size checker above. Switch between metric and imperial units as needed.', '#e3f5f2', '#0f766e'],
  ['3', 'Get Results', 'Instantly see which airlines accept your luggage size and avoid unexpected fees at the airport.', '#dcfce7', '#15803d'],
] as const;

const MEASURE_STEPS = [
  'Pack the bag as you plan to travel with it.',
  'Measure height from the floor to the highest point, including wheels and handles.',
  'Measure width from side to side at the widest point.',
  'Measure depth front to back, including external pockets and expandable sections.',
  'Weigh the packed bag and compare both size and weight with the rule for your airline, route and fare.',
];

const INCLUDE_ITEMS = [
  'Top and side handles, plus straps',
  'Wheels and feet',
  'External pockets when packed',
  'Any protruding parts',
  'Expanded sections if you will use them',
];

const COMMON_MISTAKES = [
  'Measuring empty bags only',
  'Forgetting about wheels and handles',
  'Using the wrong measurement units (cm vs inches)',
  'Not checking weight limits',
  'Ignoring expandable sections',
  'Assuming the same rules apply to all airlines',
];

const FINAL_CHECKS = [
  'Check the operating airline, not only the one that sold the ticket',
  'Select the correct baggage type: personal item, carry-on or checked bag',
  'Use the allowance for your fare and cabin class',
  'Watch for route, aircraft and codeshare exceptions',
  'Recheck the airline rule if your flight details change',
];

const FAQS = [
  ['Do airlines include wheels and handles in baggage dimensions?', 'Yes. Measure the bag at its maximum external dimensions, including wheels, handles, feet, pockets and other protruding parts.'],
  ['Do airlines weigh carry-on luggage?', 'Many do. Enforcement varies by airline, airport and route, so a bag can meet the size limit and still fail the weight allowance.'],
  ['Why can the same airline show more than one baggage limit?', 'Rules can change by fare, cabin class, route, aircraft and whether the airline uses a weight or piece concept. BaggageChecker keeps meaningful variants separate instead of averaging them into one number.'],
  ['What happens if my bag is too large or too heavy?', 'The airline may charge an excess or gate-check fee, require the bag to travel in the hold, or ask you to repack it. The exact outcome depends on the carrier and fare.'],
  ['Should I still check my airline before flying?', 'Yes. Baggage policies can change, and your ticket may contain a route- or fare-specific allowance. Use the checker for comparison, then confirm the allowance shown by the operating carrier before departure.'],
] as const;

const Check = ({ color }: { color: string }) => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 1 }}>
    <path d="M5 12.5l4 4L19 7" />
  </svg>
);

export default function DraftPage() {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: '#fff' }}>
      <Header />
      <main>
        <section style={{ background: '#f7f8f9', padding: '54px 24px 34px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#e3f5f2', color: '#0f766e', border: '1px solid #c6ebe5', borderRadius: 999, padding: '6px 12px', fontSize: 12, fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf47' }} />
              {AIRLINES.length} airlines · reviewed {BAGGAGE_RULES_REVIEW_DATE}
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: 40, alignItems: 'end', marginTop: 18 }}>
              <div>
                <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(36px,5vw,54px)', lineHeight: 1.04, fontWeight: 800, letterSpacing: '-.035em' }}>Will your bag fit?</h1>
                <p style={{ margin: 0, maxWidth: 650, fontSize: 16, lineHeight: 1.65, color: '#57677c' }}>Enter your bag once, choose the baggage type and airlines you are flying with, and compare your dimensions and weight against the rules that actually apply.</p>
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12 }}>
                {TRUST_POINTS.map((point) => <li key={point} style={{ display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.55, color: '#3d4759' }}><Check color="#0d9488" /><span>{point}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="checker" style={{ background: '#f7f8f9', padding: '0 24px 56px' }}>
          <div style={{ maxWidth: 1340, margin: '0 auto' }}><Suspense fallback={<div style={{ minHeight: 520 }} />}><SizeCheckerClient /></Suspense></div>
        </section>

        <section style={{ padding: '60px 24px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 8px', textAlign: 'center', fontSize: 'clamp(23px,3vw,28px)', fontWeight: 800 }}>The Three Baggage Types, Explained</h2>
            <p style={{ margin: '0 auto 28px', maxWidth: 650, textAlign: 'center', fontSize: 13.5, lineHeight: 1.7, color: '#57677c' }}>Airlines split what you travel with into three allowances. Each has its own size and weight limit, and the one you exceed decides what you pay.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 20 }}>
              {BAG_TYPES.map(([title, text, tint, color]) => (
                <div key={title} style={{ border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 9, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 10, height: 10, borderRadius: 2, border: `2px solid ${color}` }} /></span>
                    <div><h3 style={{ margin: '0 0 5px', fontSize: 13.5, fontWeight: 800 }}>{title}</h3><p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>{text}</p></div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ margin: '18px auto 0', maxWidth: 760, textAlign: 'center', fontSize: 11.5, lineHeight: 1.65, color: '#8494a8' }}>Fare type, route and aircraft can change the allowance. Where a carrier publishes meaningful variants, the checker shows them separately.</p>
          </div>
        </section>

        <section style={{ background: '#f7f8f9', padding: '60px 24px 64px', marginTop: 64 }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 28px', textAlign: 'center', fontSize: 'clamp(23px,3vw,28px)', fontWeight: 800 }}>How to Use Our Carry-On Size Checker</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 20 }}>
              {HOW_TO.map(([n, title, text, bg, color]) => <div key={n} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '28px 22px', textAlign: 'center' }}><span style={{ display: 'inline-flex', width: 36, height: 36, borderRadius: '50%', alignItems: 'center', justifyContent: 'center', background: bg, color, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>{n}</span><div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 10 }}>{title}</div><p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: '#7a8798' }}>{text}</p></div>)}
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px 0' }}>
          <h2 style={{ margin: '0 0 28px', textAlign: 'center', fontSize: 'clamp(23px,3vw,28px)', fontWeight: 800 }}>Why Airlines Have Different Luggage Rules</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 36 }}>
            <div style={{ fontSize: 13.5, lineHeight: 1.8, color: '#57677c' }}>
              <p>Each airline sets its own baggage restrictions based on aircraft type, business model, and operational efficiency. Low-cost carriers often have stricter size limits to maximize revenue and streamline boarding.</p>
              <p>Overhead compartment sizes vary between aircraft models, and airlines must ensure all passengers&apos; bags fit safely. Weight restrictions help manage fuel costs and aircraft balance.</p>
              <p>Using our <a href="#checker">luggage size checker</a> before you travel helps you avoid unexpected fees and delays at check-in.</p>
            </div>
            <div className="grid-pair" style={{ gap: 14 }}>
              {[
                ['Aircraft Limits', 'Overhead space varies by plane model', '#2563eb'],
                ['Passenger Safety', 'Weight limits ensure safe operations', '#15803d'],
                ['Boarding Speed', 'Standard sizes speed up the process', '#e0a11a'],
                ['Business Model', 'Fees help keep base fares low', '#7c3aed'],
              ].map(([title, text, color]) => <div key={title} style={{ border: '1px solid #edf0f3', borderRadius: 14, padding: '20px 16px', textAlign: 'center' }}><div style={{ width: 22, height: 22, border: `2px solid ${color}`, borderRadius: '50%', margin: '0 auto 10px' }} /><div style={{ fontSize: 13, fontWeight: 800, marginBottom: 5 }}>{title}</div><p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: '#7a8798' }}>{text}</p></div>)}
            </div>
          </div>
        </section>

        <section style={{ padding: '72px 24px 0' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 10px', textAlign: 'center', fontSize: 'clamp(25px,3.2vw,32px)', fontWeight: 800, letterSpacing: '-.03em' }}>Pro Tips for Checking Suitcase Size Online</h2>
            <p style={{ margin: '0 auto 34px', maxWidth: 760, textAlign: 'center', fontSize: 14, lineHeight: 1.7, color: '#64748b' }}>Follow these tips to get accurate results and avoid unexpected fees at the airport.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,500px),1fr))', gap: 22 }}>
              <div style={{ border: '1px solid #e3e9ef', borderRadius: 16, padding: '28px 30px' }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}><span style={{ width: 52, height: 52, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#e1f5f2' }}><svg aria-hidden="true" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#0f9488" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l14-14 4 4L7 21H3z" /><path d="M14 6l4 4M11 9l2 2M8 12l2 2M5 15l2 2" /></svg></span><div><h3 style={{ margin: '2px 0 6px', fontSize: 18, fontWeight: 800 }}>How to measure correctly</h3><p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: '#57677c' }}>Use a measuring tape and include every part of your suitcase to get its exact external dimensions.</p></div></div>
                <div style={{ display: 'grid', gap: 11 }}>{MEASURE_STEPS.map((step, i) => <div key={step} style={{ display: 'flex', gap: 13 }}><span style={{ flex: 'none', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#d6f3ed', color: '#0f766e', fontSize: 12.5, fontWeight: 800 }}>{i + 1}</span><span style={{ paddingTop: 4, fontSize: 13, lineHeight: 1.55, color: '#42526b' }}>{step}</span></div>)}</div>
              </div>

              <div style={{ border: '1px solid #e3e9ef', borderRadius: 16, padding: '28px 30px' }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 22 }}><span style={{ width: 52, height: 52, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#e7f7ea' }}><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" /></svg></span><div><h3 style={{ margin: '2px 0 6px', fontSize: 18, fontWeight: 800 }}>What to include</h3><p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: '#57677c' }}>Airlines use the bag&apos;s full external size, so include every part that adds to its height, width or depth.</p></div></div>
                <div style={{ display: 'grid', gap: 12 }}>{INCLUDE_ITEMS.map((item) => <div key={item} style={{ display: 'flex', gap: 13, fontSize: 13, lineHeight: 1.55, color: '#42526b' }}><Check color="#16a34a" /><span>{item}</span></div>)}</div>
              </div>

              <div style={{ border: '1px solid #e3e9ef', borderRadius: 16, padding: '28px 30px' }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 22 }}><span style={{ width: 52, height: 52, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#fff3dc' }}><svg aria-hidden="true" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#e59a05" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 16H3L12 3z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg></span><div><h3 style={{ margin: '2px 0 6px', fontSize: 18, fontWeight: 800 }}>Common mistakes to avoid</h3><p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: '#57677c' }}>These are the most frequent errors when checking luggage size online.</p></div></div>
                <div style={{ display: 'grid', gap: 12 }}>{COMMON_MISTAKES.map((item) => <div key={item} style={{ display: 'flex', gap: 13, fontSize: 13, lineHeight: 1.55, color: '#42526b' }}><Check color="#e59a05" /><span>{item}</span></div>)}</div>
              </div>

              <div style={{ border: '1px solid #e3e9ef', borderRadius: 16, padding: '28px 30px' }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 22 }}><span style={{ width: 52, height: 52, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#e6f0ff' }}><svg aria-hidden="true" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v4h4M9 11h6M9 15h6" /></svg></span><div><h3 style={{ margin: '2px 0 6px', fontSize: 18, fontWeight: 800 }}>Before you trust the result</h3><p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: '#57677c' }}>Airline rules can vary, so double-check a few key details before you travel.</p></div></div>
                <div style={{ display: 'grid', gap: 12 }}>{FINAL_CHECKS.map((item) => <div key={item} style={{ display: 'flex', gap: 13, fontSize: 13, lineHeight: 1.55, color: '#42526b' }}><Check color="#2563eb" /><span>{item}</span></div>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 24px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', border: '1px solid #edf0f3', borderRadius: 14, padding: '26px 28px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 250 }}><h2 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 800 }}>Need the rule for one specific airline?</h2><p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#57677c' }}>Browse the airline directory for carrier-specific personal item, carry-on and checked baggage rules, including important route and fare exceptions.</p></div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><Link href="/airlines" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 18px', borderRadius: 9, background: '#fbbf47', color: '#3a2a05', fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>Browse airlines</Link><Link href="/luggage-guide" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 18px', borderRadius: 9, border: '1px solid #e4eaf1', color: '#0f1c2e', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Luggage guide</Link></div>
          </div>
        </section>

        <section style={{ padding: '64px 24px 72px' }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 24px', textAlign: 'center', fontSize: 'clamp(22px,2.8vw,27px)', fontWeight: 800 }}>Frequently Asked Questions</h2>
            {FAQS.map(([question, answer]) => <details key={question} style={{ borderBottom: '1px solid #edf0f3' }}><summary style={{ listStyle: 'none', cursor: 'pointer', padding: '16px 4px', fontSize: 13.5, fontWeight: 700, color: '#0f1c2e' }}>{question}</summary><p style={{ margin: 0, padding: '0 4px 18px', fontSize: 13, lineHeight: 1.7, color: '#5a6478' }}>{answer}</p></details>)}
          </div>
        </section>
      </main>
      <Footer maxWidth={1200} gap={32} logoSize={24} logoIconSize={13} showWordmark copyrightSize={11} />
    </div>
  );
}
