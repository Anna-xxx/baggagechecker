import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { LEGAL_UPDATED } from '@/lib/site';

/**
 * The shell both legal pages sit in. They are plain prose, so they get one narrow
 * column and nothing else — no cards, no accent colours competing with the text.
 */
export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <Header />

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 64px' }}>
        <h1 style={{ margin: '0 0 12px', fontSize: 38, lineHeight: 1.1, fontWeight: 800, letterSpacing: '-.03em' }}>{title}</h1>
        <p style={{ margin: '0 0 8px', fontSize: 16, lineHeight: 1.65, color: '#57677c' }}>{intro}</p>
        <p style={{ margin: '0 0 36px', fontSize: 12.5, color: '#8494a8' }}>Last updated: {LEGAL_UPDATED}</p>
        <div style={{ fontSize: 15, lineHeight: 1.75, color: '#2c3852' }}>{children}</div>
      </main>

      <Footer />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 34 }}>
      <h2 style={{ margin: '0 0 12px', fontSize: 19, fontWeight: 800, letterSpacing: '-.02em' }}>{title}</h2>
      {children}
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ margin: '0 0 14px', paddingLeft: 22, display: 'grid', gap: 9 }}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
