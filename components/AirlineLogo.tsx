/**
 * The mark beside an airline's name.
 *
 * This used to hotlink Google's favicon service with pics.avs.io as a fallback. Both
 * were a poor trade: the favicons are 16-64px source images stretched to 48px or more,
 * which is why they looked pixelated, and every visitor's browser had to announce its
 * IP address to two companies that have nothing to do with this site just to draw a
 * 48-pixel square. The monogram below is drawn from the carrier's own IATA code, so it
 * is sharp at any size, costs no request, and keeps the page entirely first-party.
 */

// Deterministic so a carrier keeps the same colour on every page and across deploys.
const PALETTE = [
  { bg: '#e3f5f2', ink: '#0f766e' },
  { bg: '#e7effc', ink: '#2563eb' },
  { bg: '#fdf1dc', ink: '#a2700a' },
  { bg: '#fdecec', ink: '#c23b3b' },
  { bg: '#f1ebfd', ink: '#6d3fc4' },
  { bg: '#e8f6ea', ink: '#2f7a3d' },
];

function paletteFor(code: string) {
  let sum = 0;
  for (let i = 0; i < code.length; i++) sum += code.charCodeAt(i);
  return PALETTE[sum % PALETTE.length];
}

export function AirlineLogo({
  code,
  width,
  height,
  radius = 8,
  fontSize = 10,
}: {
  code: string;
  /** Kept in the signature so call sites read the same; the mark no longer fetches anything. */
  website?: string;
  width: number;
  height: number;
  radius?: number;
  fontSize?: number;
}) {
  const { bg, ink } = paletteFor(code);
  return (
    <span
      aria-hidden="true"
      style={{
        flex: 'none',
        width,
        height,
        borderRadius: radius,
        background: bg,
        color: ink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.max(fontSize, Math.round(Math.min(width, height) * 0.42)),
        fontWeight: 800,
        letterSpacing: '.02em',
      }}
    >
      {code}
    </span>
  );
}
