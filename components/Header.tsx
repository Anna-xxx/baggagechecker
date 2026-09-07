'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoMark } from './Logo';

const NAV_ITEMS = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    ),
  },
  {
    href: '/size-checker',
    label: 'Size Checker',
    icon: (
      <>
        <rect x="5" y="7" width="14" height="14" rx="2" />
        <path d="M9.5 7V4h5v3" />
      </>
    ),
  },
  {
    href: '/airlines',
    label: 'Airlines',
    icon: <path d="M2 13l20-7-7 20-3-8z" />,
  },
  {
    href: '/luggage-guide',
    label: 'Luggage Guide',
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l5 5" />
      </>
    ),
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#fff',
        borderBottom: '1px solid #edf0f3',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: '-.02em',
          }}
        >
          <LogoMark size={43} iconSize={26} radius={12} />
          BaggageChecker
        </div>
        <nav
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            fontWeight: 600,
            color: '#4b5768',
            whiteSpace: 'nowrap',
            flexWrap: 'wrap',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? undefined : 'nav-link'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  color: active ? '#0f766e' : '#4b5768',
                  background: active ? '#e3f5f2' : undefined,
                  padding: '9px 14px',
                  borderRadius: 10,
                }}
              >
                <svg
                  aria-hidden="true"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.icon}
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
