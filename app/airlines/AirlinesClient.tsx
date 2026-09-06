'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirlineLogo } from '@/components/AirlineLogo';
import { AIRLINES, airlineSlug, type Airline } from '@/lib/airlines';

function volume(a: Airline) {
  return a.cabin[0] * a.cabin[1] * a.cabin[2];
}

type Sort = 'name' | 'strict' | 'generous';

export function AirlinesClient() {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('All countries');
  const [sort, setSort] = useState<Sort>('name');
  const [fav, setFav] = useState<string[]>([]);

  const countries = useMemo(() => ['All countries'].concat(Array.from(new Set(AIRLINES.map((a) => a.country))).sort()), []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = AIRLINES.filter(
      (a) =>
        (!q || a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q) || a.country.toLowerCase().includes(q)) &&
        (country === 'All countries' || a.country === country)
    );
    if (sort === 'strict') filtered = [...filtered].sort((a, b) => volume(a) - volume(b) || a.cabinKg - b.cabinKg);
    else if (sort === 'generous') filtered = [...filtered].sort((a, b) => volume(b) - volume(a) || b.cabinKg - a.cabinKg);
    else filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [query, country, sort]);

  const resultsLabel = `${country === 'All countries' && !query ? 'All airlines' : 'Matching airlines'} (${rows.length})`;

  const toggleFav = (code: string) => {
    setFav((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : prev.concat(code)));
  };

  return (
    <div style={{ width: '100%' }}>
      <Header />

      <section id="top" style={{ background: '#f7f8f9', borderBottom: '1px solid #edf0f3', padding: '44px 24px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', background: '#e3f5f2', color: '#0f766e', border: '1px solid #c6ebe5', borderRadius: 999, padding: '6px 12px', fontSize: 12, fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf47' }} /> Airline Directory
            </span>
          </div>
          <h1 style={{ margin: '0 0 14px', textAlign: 'center', fontSize: 'clamp(26px,3.6vw,34px)', fontWeight: 800, letterSpacing: '-.03em' }}>Airline Baggage Policies &amp; Size Limits</h1>
          <p style={{ margin: '0 auto 28px', maxWidth: 600, textAlign: 'center', fontSize: 14, lineHeight: 1.7, color: '#57677c' }}>
            Complete directory of airline carry-on and checked baggage policies. Find size limits, weight restrictions and baggage fees for airlines worldwide. Check your luggage dimensions against any airline&apos;s requirements.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 16, marginBottom: 22 }}>
            <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 13 }}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e0a11a" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 13l20-7-7 20-3-8z" />
              </svg>
              <div>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-.02em' }}>{AIRLINES.length}+</div>
                <div style={{ fontSize: 11.5, color: '#8494a8' }}>Airlines covered</div>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 13 }}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18-2.5-2.6-2.5-15.4 0-18z" />
              </svg>
              <div>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-.02em' }}>{countries.length - 1}+</div>
                <div style={{ fontSize: 11.5, color: '#8494a8' }}>Countries</div>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 12, padding: '16px 18px' }}>
              <div style={{ fontSize: 11.5, color: '#8494a8', marginBottom: 4 }}>Most restrictive</div>
              <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.01em' }}>Ryanair</div>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 12, padding: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 10 }}>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #edf0f3', borderRadius: 9, padding: '10px 13px', minWidth: 0 }}>
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a9b4c2" strokeWidth={2} strokeLinecap="round">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l5 5" />
              </svg>
              <input
                placeholder="Search airlines by name, code, or country"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ flex: 1, minWidth: 0, border: 'none', fontSize: 13.5, color: '#0f1c2e', background: 'transparent' }}
              />
            </div>
            <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ border: '1px solid #edf0f3', borderRadius: 9, padding: '11px 13px', fontSize: 13, fontWeight: 600, color: '#0f1c2e', background: '#fff' }}>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} style={{ border: '1px solid #edf0f3', borderRadius: 9, padding: '11px 13px', fontSize: 13, fontWeight: 600, color: '#0f1c2e', background: '#fff' }}>
              <option value="name">Sort by: Name</option>
              <option value="strict">Sort by: Strictest first</option>
              <option value="generous">Sort by: Most generous</option>
            </select>
          </div>
        </div>
      </section>

      <section id="directory" style={{ maxWidth: 1200, margin: '0 auto', padding: '34px 24px 8px' }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 17, fontWeight: 800, letterSpacing: '-.02em' }}>{resultsLabel}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap: 18 }}>
          {rows.map((a) => {
            const on = fav.includes(a.code);
            const kgColor = a.cabinKg >= 12 ? '#15803d' : a.cabinKg <= 7 ? '#b45309' : '#0f1c2e';
            return (
              <div key={a.code} className="card-hover" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <AirlineLogo code={a.code} width={48} height={48} radius={10} fontSize={12} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-.01em' }}>{a.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: 11.5, color: '#8494a8' }}>
                      <span style={{ fontWeight: 700, color: '#57677c' }}>{a.code}</span>
                      <span>·</span>
                      <span>{a.country}</span>
                    </div>
                  </div>
                  <button onClick={() => toggleFav(a.code)} style={{ flex: 'none', border: 'none', background: 'none', padding: 2, cursor: 'pointer', lineHeight: 0 }}>
                    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill={on ? '#ef6a5a' : 'none'} stroke={on ? '#ef6a5a' : '#c3ccd7'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20z" />
                    </svg>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 10 }}>
                  <div style={{ background: '#f8fafc', borderRadius: 9, padding: '10px 12px' }}>
                    <div style={{ fontSize: 10.5, color: '#8494a8', marginBottom: 4 }}>Carry-on max size</div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                      {a.cabin[0]} × {a.cabin[1]} × {a.cabin[2]} cm
                    </div>
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: 9, padding: '10px 12px' }}>
                    <div style={{ fontSize: 10.5, color: '#8494a8', marginBottom: 4 }}>Carry-on max weight</div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: kgColor }}>{a.cabinKg} kg</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: '#a9b4c2' }}>
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  Updated 2 months ago
                </div>

                <Link href={`/airlines/${airlineSlug(a.name)}`} className="cta-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fbbf47', color: '#3a2a05', borderRadius: 9, padding: 11, fontSize: 13, fontWeight: 700, textDecoration: 'none', marginTop: 'auto' }}>
                  View Details
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a2a05" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
        {rows.length === 0 && (
          <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '44px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>No airlines match your filters</div>
            <p style={{ margin: 0, fontSize: 13, color: '#8494a8' }}>Try a different name, code or country.</p>
          </div>
        )}
      </section>

      <section id="policies" style={{ maxWidth: 900, margin: '0 auto', padding: '52px 24px 60px' }}>
        <h2 style={{ margin: '0 0 24px', textAlign: 'center', fontSize: 22, fontWeight: 800, letterSpacing: '-.025em' }}>Understanding Airline Baggage Policies</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 30 }}>
          <div>
            <h3 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 800 }}>Carry-on Baggage Rules</h3>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: '#57677c' }}>
              Most airlines allow one piece of carry-on luggage plus a personal item. Dimensions typically range from 55 × 40 × 20 cm to 56 × 45 × 25 cm, with weight limits between 7 and 10 kg. Always check your specific airline&apos;s requirements before travelling.
            </p>
          </div>
          <div>
            <h3 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 800 }}>Checked Baggage Policies</h3>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: '#57677c' }}>
              Checked luggage allowances vary significantly by airline, route and ticket type. Standard dimensions are usually around 158 cm total (length + width + height), with weight limits ranging from 20 to 32 kg per bag.
            </p>
          </div>
        </div>
        <div style={{ marginTop: 28, background: '#fff', border: '1px solid #edf0f3', borderRadius: 12, padding: '22px 24px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}>Tips for Avoiding Baggage Fees</div>
          <div style={{ display: 'grid', gap: 9, fontSize: 13, color: '#57677c' }}>
            <span>Measure your luggage at home using our luggage size checker</span>
            <span>Pack light and consider baggage weight restrictions</span>
            <span>Check if your credit card or airline status provides free baggage</span>
            <span>Consider shipping items to your destination for longer trips</span>
            <span>Pack essential items in your carry-on in case of delays</span>
          </div>
        </div>
      </section>

      <Footer maxWidth={1200} logoSize={28} logoIconSize={15} copyrightSize={12} />
    </div>
  );
}
