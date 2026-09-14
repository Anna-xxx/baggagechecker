import type { Metadata } from 'next';
import { SITE_URL, CONTACT_EMAIL } from '@/lib/site';
import { LegalPage, LegalSection, LegalList } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | BaggageChecker',
  description:
    'What BaggageChecker does and does not collect. No accounts, no cookies, no tracking — the measurements you enter stay in your browser and are never sent to us.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

const link = { color: '#0f766e', fontWeight: 600 };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="BaggageChecker is a free reference tool. There is nothing to sign up for, nothing to log in to, and no form to fill in — so there is nothing for us to collect about you. This page says so in full, and explains the one thing that happens automatically whenever any website loads."
    >
      <LegalSection title="What we collect">
        <p style={{ margin: '0 0 14px' }}>
          Nothing. We do not ask for your name or email address, we set no cookies, we run no analytics, we carry no
          advertising or tracking pixels, and we store nothing in your browser.
        </p>
        <p style={{ margin: 0 }}>
          The size checker runs entirely inside your own browser. The width, height, depth and weight you enter are never
          transmitted anywhere — they live in the page while you use it and are gone the moment you close the tab. The
          airline limits you are checked against are already part of the page you downloaded, so pressing the button sends
          no request and reveals nothing about your bag to anyone, including us.
        </p>
      </LegalSection>

      <LegalSection title="What happens automatically">
        <LegalList
          items={[
            <>
              <strong>Serving the page.</strong> Like any website, this one runs on a hosting service — in our case
              Cloudflare. To send you a page and to keep the site online and protected from attack, it processes your IP
              address, which page you asked for, your browser and device type and an approximate location, and keeps
              short-term security logs. We do not receive those logs, and nothing in them is combined with anything else
              or used to build a picture of you.
            </>,
            <>
              <strong>Links to airlines.</strong> Each airline page links to that carrier&apos;s own baggage page so you can
              confirm the figures at the source. Following such a link takes you to their website, where their privacy
              policy applies instead of ours. We are not affiliated with any airline and receive nothing when you go.
            </>,
          ]}
        />
        <p style={{ margin: 0 }}>
          Everything else on the page — the text, the layout, the airline marks, the calculations — is served from this
          site alone. No fonts, images, scripts or embeds are pulled in from anywhere else, so loading a page here does
          not announce your visit to any other company.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p style={{ margin: 0 }}>
          There are none. We set no cookies of any kind, which is why you have never been asked to accept any. If that
          ever changes, this page will say what they are and what they do before they are used.
        </p>
      </LegalSection>

      <LegalSection title="Legal basis and your rights">
        <p style={{ margin: '0 0 14px' }}>
          Under the GDPR and UK GDPR, the limited processing described above rests on our legitimate interest in
          delivering the page you requested and keeping the site available and secure. We do not profile you and we make
          no automated decisions about you.
        </p>
        <p style={{ margin: '0 0 14px' }}>
          You have the right to ask what personal data is held about you, to have it corrected or erased, to object to
          processing, and to complain to your national data protection authority. In practice we have nothing to hand
          over: there is no database here to search, no account to close and no profile to delete. If you want to know
          about the server logs described above, write to us and we will tell you exactly who holds them and how to ask.
        </p>
        <p style={{ margin: 0 }}>
          For residents of California and other US states with comparable laws: we do not sell personal information, we do
          not share it for cross-context behavioural advertising, and we collect no categories of personal information
          beyond the automatic hosting data described above.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p style={{ margin: 0 }}>
          The site is a baggage reference for travellers generally. It is not directed at children, and it collects no
          information from anyone — children included.
        </p>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <p style={{ margin: '0 0 14px' }}>
          If this policy changes, the date at the top changes with it, so the page you are reading is always the current
          one. We do not keep earlier versions.
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
