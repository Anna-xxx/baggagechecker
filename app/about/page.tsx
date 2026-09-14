import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, CONTACT_EMAIL } from '@/lib/site';
import { AIRLINES, BAGGAGE_RULES_REVIEW_DATE } from '@/lib/airlines';
import { LegalPage, LegalSection, LegalList } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'About BaggageChecker: Where Our Data Comes From',
  description:
    'How BaggageChecker sources and checks airline baggage limits: every figure is read from the carrier’s own published policy, never from aggregators.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: 'website',
    siteName: 'BaggageChecker',
    title: 'About BaggageChecker',
    description: 'Where the baggage figures come from, how they are checked, and what we refuse to publish.',
  },
};

const COUNTRY_COUNT = new Set(AIRLINES.map((a) => a.country)).size;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about`,
      url: `${SITE_URL}/about`,
      name: 'About BaggageChecker',
      description: `How BaggageChecker sources and verifies baggage allowances for ${AIRLINES.length} airlines.`,
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'BaggageChecker',
      url: SITE_URL,
      email: CONTACT_EMAIL,
      description: `A free reference for airline baggage size and weight limits, covering ${AIRLINES.length} airlines in ${COUNTRY_COUNT} countries.`,
    },
  ],
};

const link = { color: '#0f766e', fontWeight: 600 };

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ border: '1px solid #edf0f3', borderRadius: 12, padding: '16px 18px' }}>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.02em' }}>{value}</div>
      <div style={{ fontSize: 12, color: '#8494a8', marginTop: 2 }}>{label}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <LegalPage
      title="About BaggageChecker"
      intro="BaggageChecker answers one question: will this bag be accepted on this airline? It is free, needs no account, and exists because the answer is genuinely hard to find — every carrier publishes its limits differently, and most sites that collect them quietly average the differences away."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid-trio" style={{ marginBottom: 34 }}>
        <Stat value={String(AIRLINES.length)} label="Airlines covered" />
        <Stat value={String(COUNTRY_COUNT)} label="Countries" />
        <Stat value={BAGGAGE_RULES_REVIEW_DATE} label="Limits last reviewed" />
      </div>

      <LegalSection title="Where the numbers come from">
        <p style={{ margin: '0 0 14px' }}>
          Every figure on this site is read from the airline&apos;s own published baggage page — the carrier&apos;s site, in
          the carrier&apos;s words. We do not copy from booking sites, comparison sites or other baggage directories,
          because those inherit each other&apos;s mistakes and none of them show their source.
        </p>
        <p style={{ margin: 0 }}>
          Each airline page links to the exact page the figures were taken from, so you can check our work in one click.
          If we and the airline disagree, the airline is right — and we want to hear about it.
        </p>
      </LegalSection>

      <LegalSection title="What we do differently">
        <LegalList
          items={[
            <>
              <strong>Fares are kept apart, not averaged.</strong> On many carriers a basic fare includes no cabin bag at
              all while the next fare up does. Showing one blended &quot;carry-on limit&quot; for such an airline is worse
              than showing nothing, so the checker lists each fare, route or cabin separately and lets you pick yours.
            </>,
            <>
              <strong>Aircraft differences are shown.</strong> A few carriers publish different cabin limits depending on
              the aircraft you fly. Where that happens, the result says so rather than quietly picking one.
            </>,
            <>
              <strong>Weight is separated from size.</strong> A bag of exactly the right dimensions that is two kilos over
              is not &quot;too large&quot; — the fix is to take something out, not to buy a smaller case. The checker says
              which of the two is wrong.
            </>,
            <>
              <strong>Gaps are left visible.</strong> Where a carrier does not publish a number, the page says it is not
              published and links you to the airline. We removed a table of baggage fees from this site for exactly this
              reason: the figures were not sourced, and a plausible invented number is worse than an honest gap.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection title="How current this is">
        <p style={{ margin: '0 0 14px' }}>
          All {AIRLINES.length} carriers were last checked against their own published policies in{' '}
          {BAGGAGE_RULES_REVIEW_DATE}. That date appears in the footer of every page, so you always know how fresh the
          figures are without having to guess.
        </p>
        <p style={{ margin: 0 }}>
          Airlines change allowances whenever they like, sometimes without announcement, and a few publish limits that
          contradict themselves — a stated total that does not match the sum of their own three sides. Where that happens
          we show the carrier&apos;s stated numbers and flag the conflict rather than silently choosing one.
        </p>
      </LegalSection>

      <LegalSection title="Independence and privacy">
        <p style={{ margin: '0 0 14px' }}>
          We are not affiliated with any airline, we sell nothing, and no carrier pays to appear here or to be ranked a
          particular way. Airline names and codes are used only to identify whose policy is described.
        </p>
        <p style={{ margin: 0 }}>
          The site collects nothing about you: no accounts, no forms, no cookies, no tracking, and no fonts or images
          loaded from other companies. The size checker runs entirely in your browser, so the measurements you type never
          leave your device. The <Link href="/privacy-policy" style={link}>privacy policy</Link> says the same in full.
        </p>
      </LegalSection>

      <LegalSection title="Where to start">
        <LegalList
          items={[
            <>
              <Link href="/size-checker" style={link}>Size Checker</Link> — enter your bag once and compare it against the
              airlines you are flying.
            </>,
            <>
              <Link href="/airlines" style={link}>Airline directory</Link> — every carrier we cover, with personal item,
              carry-on and checked limits side by side.
            </>,
            <>
              <Link href="/luggage-guide" style={link}>Luggage guide</Link> — standard case sizes and what the limits
              actually mean.
            </>,
            <>
              <Link href="/how-to-measure-bags" style={link}>How to measure</Link> — measuring the way airlines do, wheels
              and handles included.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection title="Corrections and contact">
        <p style={{ margin: 0 }}>
          If a figure here is wrong or out of date, tell us and we will check it against the carrier and fix it. Write to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} style={link}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
