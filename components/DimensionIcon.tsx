import type { ReactNode } from 'react';

export type DimensionAxis = 'width' | 'height' | 'depth' | 'weight';

/**
 * The four measurement marks, kept in one place so Home and the Size Checker label
 * the same quantity with the same glyph and colour. Someone who sets their bag up on
 * Home and lands on the checker should not have to work out which icon means depth
 * a second time.
 */
const GLYPHS: Record<DimensionAxis, { color: string; path: ReactNode }> = {
  width: { color: '#14b8a6', path: (<><path d="M3 9h18v6H3z" /><path d="M7 9v3M12 9v3M17 9v3" /></>) },
  height: { color: '#ef6a5a', path: (<><path d="M9 3h6v18H9z" /><path d="M9 7h3M9 12h3M9 17h3" /></>) },
  depth: { color: '#8b5cf6', path: (<><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 21v-9l8-4.5M12 12L4 7.5" /></>) },
  weight: { color: '#f0a824', path: (<><path d="M12 4v16M6 20h12" /><path d="M4 9h16l-3 5H7z" /></>) },
};

export function DimensionIcon({ axis, size = 16 }: { axis: DimensionAxis; size?: number }) {
  const glyph = GLYPHS[axis];
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={glyph.color}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: 'none' }}
    >
      {glyph.path}
    </svg>
  );
}
