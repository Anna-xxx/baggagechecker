import type { ReactNode } from 'react';
import type { BagType } from './BagDiagram';

/**
 * The tinted tile that stands for each bag type. Shared so Home and the Size Checker
 * colour-code the three types identically — blue for the underseat bag, teal for the
 * cabin bag, amber for the hold bag — and a traveller can recognise the row they want
 * before reading its label.
 */
const TILES: Record<BagType, { tint: string; color: string; glyph: ReactNode }> = {
  personal: {
    tint: '#e7effc',
    color: '#2563eb',
    glyph: (
      <>
        <path d="M7 9a5 5 0 0 1 10 0v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
        <path d="M10 9V7a2 2 0 0 1 4 0v2" />
      </>
    ),
  },
  carryon: {
    tint: '#e3f5f2',
    color: '#0f766e',
    glyph: (
      <>
        <rect x="5" y="7" width="14" height="14" rx="2.5" />
        <path d="M9.5 7V4.6A.6.6 0 0 1 10.1 4h3.8a.6.6 0 0 1 .6.6V7" />
      </>
    ),
  },
  checked: {
    tint: '#fdf1dc',
    color: '#b98107',
    glyph: (
      <>
        <rect x="4" y="6" width="16" height="15" rx="2.5" />
        <path d="M9 6V3.6A.6.6 0 0 1 9.6 3h4.8a.6.6 0 0 1 .6.6V6" />
        <path d="M9.6 11v6M14.4 11v6" />
      </>
    ),
  },
};

export function BagTypeIcon({ type, size = 30 }: { type: BagType; size?: number }) {
  const tile = TILES[type];
  return (
    <span
      style={{
        flex: 'none',
        display: 'flex',
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.3),
        background: tile.tint,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        aria-hidden="true"
        width={Math.round(size * 0.54)}
        height={Math.round(size * 0.54)}
        viewBox="0 0 24 24"
        fill="none"
        stroke={tile.color}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {tile.glyph}
      </svg>
    </span>
  );
}
