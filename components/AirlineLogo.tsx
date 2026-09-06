'use client';

import { useState } from 'react';
import { airlineLogoUrl } from '@/lib/airlines';

export function AirlineLogo({
  code,
  width,
  height,
  radius = 8,
  fontSize = 10,
}: {
  code: string;
  width: number;
  height: number;
  radius?: number;
  fontSize?: number;
}) {
  const [failed, setFailed] = useState(false);

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
          src={airlineLogoUrl(code, width * 2, height * 2)}
          alt={`${code} logo`}
          onError={() => setFailed(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }}
        />
      )}
    </span>
  );
}
