import { Fragment } from 'react';
import Link from 'next/link';
import { LogoMark } from './Logo';

const DEFAULT_RESOURCE_LINKS = [
  'Luggage Guide',
  'Luggage Size Checker',
  'How to Measure Bags',
  'Book Flights',
  'Book Hotels',
  'All Airlines',
];

const DEFAULT_SITE_LINKS = ['About', 'Privacy Policy', 'Terms of Service', 'Contact'];

export type FooterColumn = { title: string; links: string[] };

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
}: {
  maxWidth?: number;
  gap?: number;
  logoSize?: number;
  logoIconSize?: number;
  showWordmark?: boolean;
  copyrightSize?: number;
  copyrightLines?: string[];
  resourceLinks?: string[];
  siteLinks?: string[];
  columns?: FooterColumn[];
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
                {col.links.map((label) => (
                  <div key={label} style={{ marginBottom: 8 }}>
                    <Link href="/" style={{ fontSize: 12, color: '#7a8798' }}>
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
            ))
          : (
            <>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 12 }}>Helpful Resources</div>
                {resourceLinks.map((label) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <Link href="/" style={{ fontSize: 12, color: '#7a8798' }}>
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 12 }}>Links</div>
                {siteLinks.map((label) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <Link href="/" style={{ fontSize: 12, color: '#7a8798' }}>
                      {label}
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
