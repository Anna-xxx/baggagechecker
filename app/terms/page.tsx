import type { Metadata } from 'next';
import { SITE_URL, CONTACT_EMAIL } from '@/lib/site';
import { BAGGAGE_RULES_REVIEW_DATE } from '@/lib/airlines';
import { LegalPage, LegalSection, LegalList } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service | BaggageChecker',
  description:
    'The terms for using BaggageChecker: what the baggage figures are, how current they are, and why the airline you fly always has the final word.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: { type: 'website', siteName: 'BaggageChecker', title: 'Terms of Service | BaggageChecker', description: 'The terms for using BaggageChecker, and why the airline you fly always has the final word on your baggage.' },
};


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/terms`,
  url: `${SITE_URL}/terms`,
  name: 'Terms of Service',
  description: 'The terms for using BaggageChecker, and why the airline you fly always has the final word on your baggage.',
  isPartOf: { '@type': 'WebSite', name: 'BaggageChecker', url: SITE_URL },
};

const link = { color: '#0f766e', fontWeight: 600 };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="BaggageChecker is free to use and asks nothing of you. These terms exist mainly to be honest about one thing: baggage rules are set by airlines and they change, so the figures here are a guide and not a guarantee."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <LegalSection title="What this site is">
        <p style={{ margin: 0 }}>
          A reference tool that collects published baggage allowances — personal item, carry-on and checked — and lets you
          compare your own bag against them. It is free, needs no account, and is offered as information only. It is not
          travel advice, and it is not a booking service.
        </p>
      </LegalSection>

      <LegalSection title="Accuracy, and its limits">
        <p style={{ margin: '0 0 14px' }}>
          Every figure on this site is taken from the carrier&apos;s own published policy and was last reviewed in{' '}
          {BAGGAGE_RULES_REVIEW_DATE}. We check them carefully and correct them when we find an error. Even so, three
          things are outside our control:
        </p>
        <LegalList
          items={[
            <>Airlines change allowances whenever they choose, sometimes without notice, and a page here may be behind.</>,
            <>
              Your specific allowance can depend on your fare, your route, your aircraft, your status and who actually
              operates the flight. The checker shows these variations where a carrier publishes them, but it cannot know
              which ticket you hold.
            </>,
            <>
              Staff at the gate apply the rules on the day. A bag that matches the published numbers can still be refused
              or weighed differently than you expect.
            </>,
          ]}
        />
        <p style={{ margin: 0, fontWeight: 700 }}>
          Always confirm with your airline before you travel. Where this site and the carrier disagree, the carrier is
          right.
        </p>
      </LegalSection>

      <LegalSection title="Liability">
        <p style={{ margin: 0 }}>
          The site is provided as it is, without warranty of any kind. Because it is a free information service you use at
          your own discretion, we are not liable for baggage fees, gate charges, repacking, delays, missed flights,
          refused items or any other loss arising from relying on what you read here. That is precisely why the section
          above asks you to check with the airline.
        </p>
      </LegalSection>

      <LegalSection title="Airline names and marks">
        <p style={{ margin: 0 }}>
          We are not affiliated with, endorsed by or sponsored by any airline. Carrier names and IATA codes appear solely
          to identify whose baggage policy is being described, and they remain the property of their respective owners.
        </p>
      </LegalSection>

      <LegalSection title="Using the site">
        <p style={{ margin: 0 }}>
          Use it as much as you like, for yourself or in the course of your work. What we ask you not to do is
          automated bulk copying of the data, or anything that degrades the site for other people. The text, layout, code
          and the way the data is organised here are ours; the underlying allowances are facts published by the airlines
          and belong to nobody.
        </p>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <p style={{ margin: '0 0 14px' }}>
          These terms may change; the date at the top says when they last did. Continuing to use the site after a change
          means the current version applies.
        </p>
        <p style={{ margin: 0 }}>
          Questions go to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} style={link}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
