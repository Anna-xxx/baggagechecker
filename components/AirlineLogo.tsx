'use client';

import { useState } from 'react';
import { airlineLogoSources } from '@/lib/airlines';

export function AirlineLogo({
  code,
  website,
  width,
  height,
  radius = 8,
  fontSize = 10,
}: {
  code: string;
  website: string;
  width: number;
  height: number;
  radius?: number;
  fontSize?: number;
}) {
  const sources = airlineLogoSources(code, website, width, height);
  const [sourceIndex, setSourceIndex] = useState(0);
  const failed = sourceIndex >= sources.length;

  return (
    <span
      style={{
        flex: 'none',
        position: 'relative',
        width,
        height,
        border: '1px solid #edf0f3',
        borderRadius: radius,
        background: '#f8fafc',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 800,
        color: '#57677c',
      }}
    >
      {code}
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={sources[sourceIndex]}
          src={sources[sourceIndex]}
          alt={`${code} logo`}
          onError={() => setSourceIndex((i) => i + 1)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }}
        />
      )}
    </span>
  );
}
