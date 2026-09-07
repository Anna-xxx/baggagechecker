import { Fragment } from 'react';
import Link from 'next/link';
import { LogoMark } from './Logo';

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

const DEFAULT_RESOURCE_LINKS: FooterLink[] = [
  { label: 'Luggage Guide', href: '/luggage-guide' },
  { label: 'Luggage Size Checker', href: '/size-checker' },
  { label: 'Book Flights', href: '/' },
  { label: 'Book Hotels', href: '/' },
  { label: 'All Airlines', href: '/airlines' },
];

const DEFAULT_SITE_LINKS: FooterLink[] = [
  { label: 'About', href: '/' },
  { label: 'Privacy Policy', href: '/' },
  { label: 'Terms of Service', href: '/' },
  { label: 'Contact', href: '/' },
];

const DEFAULT_DISCLAIMER = 'Baggage rules reviewed September 2026. Airlines can change allowances at any time — confirm on the carrier’s own site before you fly.';

export function Footer({
  maxWidth = 1340,
  gap = 30,
  logoSize = 32,
  logoIconSize = 15,
  showWordmark = false,
  copyrightSize = 13,
  copyrightLines = ['© 2026 BaggageChecker. All rights reserved.'],
  resourceLinks = DEFAULT_RESOURCE_LINKS,
  siteLinks = DEFAULT_SITE_LINKS,
  columns,
  disclaimer = DEFAULT_DISCLAIMER,
}: {
  maxWidth?: number;
  gap?: number;
  logoSize?: number;
  logoIconSize?: number;
  showWordmark?: boolean;
  copyrightSize?: number;
  copyrightLines?: string[];
  resourceLinks?: FooterLink[];
  siteLinks?: FooterLink[];
  columns?: FooterColumn[];
  disclaimer?: string;
}) {
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #edf0f3', padding: '44px 24px 32px' }}>
      <div
        style={{
          maxWidth,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: columns ? `minmax(0,1.4fr) repeat(${columns.length},minmax(0,1fr))` : 'repeat(auto-fit,minmax(220px,1fr))',
          gap,
        }}
      >
        {disclaimer && <p style={{ margin: '0 0 14px', fontSize: 11.5, lineHeight: 1.6, color: '#8494a8' }}>{disclaimer}</p>}

        <div>
          {showWordmark ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 14, marginBottom: 10 }}>
              <LogoMark size={logoSize} iconSize={logoIconSize} /> BaggageChecker
            </div>
          ) : (
            <div style={{ marginBottom: 16 }}>
              <LogoMark size={logoSize} iconSize={logoIconSize} />
            </div>
          )}
          <p style={{ margin: 0, fontSize: copyrightSize, color: '#8494a8', lineHeight: 1.7 }}>
            {copyrightLines.map((line, i) => (
              <Fragment key={line}>
                {line}
                {i < copyrightLines.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        </div>

        {columns
          ? columns.map((col) => (
              <div key={col.title}>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 12 }}>{col.title}</div>
                {col.links.map((link) => (
                  <div key={link.label} style={{ marginBottom: 8 }}>
                    <Link href={link.href} style={{ fontSize: 12, color: '#7a8798' }}>
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            ))
          : (
            <>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 12 }}>Helpful Resources</div>
                {resourceLinks.map((link) => (
                  <div key={link.label} style={{ marginBottom: 10 }}>
                    <Link href={link.href} style={{ fontSize: 12, color: '#7a8798' }}>
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 12 }}>Links</div>
                {siteLinks.map((link) => (
                  <div key={link.label} style={{ marginBottom: 10 }}>
                    <Link href={link.href} style={{ fontSize: 12, color: '#7a8798' }}>
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
      </div>
    </footer>
  );
}
