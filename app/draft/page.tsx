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
  {
    title: 'Personal item',
    text: 'The small bag that goes under the seat in front of you — handbag, laptop bag or small backpack. Usually free and rarely weighed.',
    tint: '#e7effc',
    color: '#2563eb',
    icon: (
      <>
        <path d="M7 9a5 5 0 0 1 10 0v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
        <path d="M10 9V7a2 2 0 0 1 4 0v2" />
      </>
    ),
  },
  {
    title: 'Carry-on',
    text: 'The wheeled case you take into the cabin and store in the overhead bin. Sized at the gate, and weighed by many airlines.',
    tint: '#e3f5f2',
    color: '#0f766e',
    icon: (
      <>
        <rect x="5" y="7" width="14" height="14" rx="2.5" />
        <path d="M9.5 7V4.6A.6.6 0 0 1 10.1 4h3.8a.6.6 0 0 1 .6.6V7" />
      </>
    ),
  },
  {
    title: 'Checked baggage',
    text: 'The large suitcase you hand over at the desk and collect at your destination. Charged by bag, with strict weight limits.',
    tint: '#fdf1dc',
    color: '#b98107',
    icon: (
      <>
        <rect x="4" y="6" width="16" height="15" rx="2.5" />
        <path d="M9 6V3.6A.6.6 0 0 1 9.6 3h4.8a.6.6 0 0 1 .6.6V6" />
        <path d="M9.6 11v6M14.4 11v6" />
      </>
    ),
  },
];

const HOW_TO = [
  {
    n: '1',
    bg: '#e0edff',
    color: '#2563eb',
    title: 'Measure Your Luggage',
    text: 'Use a measuring tape to get exact dimensions of your suitcase including handles, wheels, and any protrusions.',
  },
  {
    n: '2',
    bg: '#e3f5f2',
    color: '#0f766e',
    title: 'Enter Dimensions',
    text: 'Input your luggage measurements into our size checker above. Switch between metric and imperial units as needed.',
  },
  {
    n: '3',
    bg: '#dcfce7',
    color: '#15803d',
    title: 'Get Results',
    text: 'Instantly see which airlines accept your luggage size and avoid unexpected fees at the airport.',
  },
];

const MEASURE_STEPS = [
  'Pack the bag as you plan to travel with it.',
  'Measure height from the floor to the highest point, including wheels and handles.',
  'Measure width from side to side at the widest point.',
  'Measure depth front to back, including external pockets and expandable sections.',
  'Weigh the packed bag and compare both size and weight with the rule for your airline, route and fare.',
];

const FAQS = [
  {
    question: 'Do airlines include wheels and handles in baggage dimensions?',
    answer: 'Yes. Measure the bag at its maximum external dimensions, including wheels, handles, feet, pockets and other protruding parts.',
  },
  {
    question: 'Do airlines weigh carry-on luggage?',
    answer: 'Many do. Enforcement varies by airline, airport and route, so a bag can meet the size limit and still fail the weight allowance.',
  },
  {
    question: 'Why can the same airline show more than one baggage limit?',
    answer: 'Rules can change by fare, cabin class, route, aircraft and whether the airline uses a weight or piece concept. BaggageChecker keeps meaningful variants separate instead of averaging them into one number.',
  },
  {
    question: 'What happens if my bag is too large or too heavy?',
    answer: 'The airline may charge an excess or gate-check fee, require the bag to travel in the hold, or ask you to repack it. The exact outcome depends on the carrier and fare.',
  },
  {
    question: 'Should I still check my airline before flying?',
    answer: 'Yes. Baggage policies can change, and your ticket may contain a route- or fare-specific allowance. Use the checker for comparison, then confirm the allowance shown by the operating carrier before departure.',
  },
];

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
                <p style={{ margin: '0 0 24px', maxWidth: 650, fontSize: 16, lineHeight: 1.65, color: '#57677c' }}>
                  Enter your bag once, choose the baggage type and airlines you are flying with, and compare your dimensions and weight against the rules that actually apply.
                </p>
              </div>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12 }}>
                {TRUST_POINTS.map((point) => (
                  <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, lineHeight: 1.55, color: '#3d4759' }}>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 2 }}>
                      <path d="M4 12.5l5.5 5.5L20 6.5" />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="checker" style={{ background: '#f7f8f9', padding: '0 24px 56px' }}>
          <div style={{ maxWidth: 1340, margin: '0 auto' }}>
            <Suspense fallback={<div style={{ minHeight: 520 }} />}>
              <SizeCheckerClient />
            </Suspense>
          </div>
        </section>

        <section style={{ padding: '60px 24px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 8px', textAlign: 'center', fontSize: 'clamp(23px,3vw,28px)', fontWeight: 800, letterSpacing: '-.025em' }}>The Three Baggage Types, Explained</h2>
            <p style={{ margin: '0 auto 28px', maxWidth: 650, textAlign: 'center', fontSize: 13.5, lineHeight: 1.7, color: '#57677c' }}>
              Airlines split what you travel with into three allowances. Each has its own size and weight limit, and the one you exceed decides what you pay.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 20 }}>
              {BAG_TYPES.map((item) => (
                <div key={item.title} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ flex: 'none', display: 'flex', width: 32, height: 32, borderRadius: 9, background: item.tint, alignItems: 'center', justifyContent: 'center' }}>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                        {item.icon}
                      </svg>
                    </span>
                    <div>
                      <h3 style={{ margin: '0 0 5px', fontSize: 13.5, fontWeight: 800 }}>{item.title}</h3>
                      <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ margin: '18px auto 0', maxWidth: 760, textAlign: 'center', fontSize: 11.5, lineHeight: 1.65, color: '#8494a8' }}>
              Fare type, route and aircraft can change the allowance. Where a carrier publishes meaningful variants, the checker shows them separately.
            </p>
          </div>
        </section>

        <section style={{ background: '#f7f8f9', padding: '60px 24px 64px', marginTop: 64 }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 28px', textAlign: 'center', fontSize: 'clamp(23px,3vw,28px)', fontWeight: 800, letterSpacing: '-.025em' }}>How to Use Our Carry-On Size Checker</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 20 }}>
              {HOW_TO.map((item) => (
                <div key={item.n} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '28px 22px', textAlign: 'center' }}>
                  <span style={{ display: 'inline-flex', width: 36, height: 36, borderRadius: '50%', alignItems: 'center', justifyContent: 'center', background: item.bg, color: item.color, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>{item.n}</span>
                  <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 10 }}>{item.title}</div>
                  <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: '#7a8798' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px 0' }}>
          <h2 style={{ margin: '0 0 28px', textAlign: 'center', fontSize: 'clamp(23px,3vw,28px)', fontWeight: 800, letterSpacing: '-.025em', lineHeight: 1.22 }}>Why Airlines Have Different Luggage Rules</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 36, alignItems: 'start' }}>
            <div>
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

            <div className="grid-pair" style={{ gap: 14 }}>
              {[
                { color: '#2563eb', title: 'Aircraft Limits', text: 'Overhead space varies by plane model', icon: <path d="M2 13l20-7-7 20-3-8z" /> },
                { color: '#15803d', title: 'Passenger Safety', text: 'Weight limits ensure safe operations', icon: (<><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><path d="M16 6.5a3 3 0 0 1 0 5.6M18 20c0-2.4-1-4.2-2.6-5.2" /></>) },
                { color: '#e0a11a', title: 'Boarding Speed', text: 'Standard sizes speed up the process', icon: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2.2" /></>) },
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

        <section style={{ padding: '64px 24px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: 34, alignItems: 'start' }}>
            <div>
              <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(22px,2.8vw,27px)', fontWeight: 800, letterSpacing: '-.025em' }}>Measure your luggage correctly</h2>
              <p style={{ margin: '0 0 22px', fontSize: 13.5, lineHeight: 1.75, color: '#57677c' }}>
                The most common checking error is measuring the suitcase shell but forgetting the parts that stick out. Airlines use the bag’s full external size.
              </p>
              <div style={{ display: 'grid', gap: 10 }}>
                {MEASURE_STEPS.map((step, i) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, border: '1px solid #edf0f3', borderRadius: 11, padding: '13px 15px' }}>
                    <span style={{ flex: 'none', display: 'flex', width: 24, height: 24, borderRadius: '50%', background: '#0d9488', color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 800 }}>{i + 1}</span>
                    <span style={{ fontSize: 12.5, lineHeight: 1.6, color: '#3d4759' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gap: 18 }}>
              <div style={{ border: '1px solid #edf0f3', borderRadius: 14, padding: 24, background: '#f8fafc' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 800 }}>Before you trust the result</h3>
                <div style={{ display: 'grid', gap: 9, fontSize: 12.5, color: '#57677c' }}>
                  <span>✓ Check the operating airline, not only the airline that sold the ticket</span>
                  <span>✓ Select the correct baggage type: personal item, carry-on or checked bag</span>
                  <span>✓ Use the allowance for your fare and cabin class</span>
                  <span>✓ Watch for route, aircraft and codeshare exceptions</span>
                  <span>✓ Recheck the airline rule if your flight details change</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 24px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', border: '1px solid #edf0f3', borderRadius: 14, padding: '26px 28px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 250 }}>
              <h2 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>Need the rule for one specific airline?</h2>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#57677c' }}>
                Browse the airline directory for carrier-specific personal item, carry-on and checked baggage rules, including important route and fare exceptions.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/airlines" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 18px', borderRadius: 9, background: '#fbbf47', color: '#3a2a05', fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>Browse airlines</Link>
              <Link href="/luggage-guide" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 18px', borderRadius: 9, border: '1px solid #e4eaf1', color: '#0f1c2e', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Luggage guide</Link>
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 24px 72px', background: '#fff' }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 24px', textAlign: 'center', fontSize: 'clamp(22px,2.8vw,27px)', fontWeight: 800, letterSpacing: '-.025em' }}>Frequently Asked Questions</h2>
            {FAQS.map((item) => (
              <details key={item.question} style={{ borderBottom: '1px solid #edf0f3' }}>
                <summary style={{ listStyle: 'none', cursor: 'pointer', padding: '16px 4px', fontSize: 13.5, fontWeight: 700, color: '#0f1c2e' }}>{item.question}</summary>
                <p style={{ margin: 0, padding: '0 4px 18px', fontSize: 13, lineHeight: 1.7, color: '#5a6478' }}>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer maxWidth={1200} gap={32} logoSize={24} logoIconSize={13} showWordmark copyrightSize={11} />
    </div>
  );
}
