import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Public_Sans } from 'next/font/google';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-public-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sizemybag.com'),
};

export const viewport: Viewport = {
  themeColor: '#fbbf47',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${publicSans.variable} ${ibmPlexMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-public-sans), system-ui, -apple-system, Segoe UI, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
