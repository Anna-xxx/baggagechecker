/**
 * The mark beside an airline's name.
 *
 * This used to hotlink Google's favicon service with pics.avs.io behind it. Both were a
 * poor trade: those favicons are 16-64px images stretched to 48px or more, which is why
 * they looked pixelated, and every visitor's browser had to announce its IP address to
 * two companies with no part in this site just to draw one small square.
 *
 * So the mark is drawn here instead — the carrier's IATA code in that carrier's own
 * livery colours. It is sharp at any size, costs no request, and keeps the page entirely
 * first-party. The colours approximate each airline's well-known brand palette; they
 * identify the carrier at a glance and are decorative, not a reproduction of its logo.
 */

type Ink = { bg: string; ink: string };

const BRAND: Record<string, Ink> = {
  AC: { bg: '#fdecec', ink: '#c8102e' }, // Air Canada
  AF: { bg: '#e7effc', ink: '#002157' }, // Air France
  AI: { bg: '#fdecec', ink: '#b0142d' }, // Air India
  AZ: { bg: '#e8f0fb', ink: '#00307d' }, // ITA Airways
  NH: { bg: '#e7effc', ink: '#13448f' }, // All Nippon Airways
  AA: { bg: '#eef2f7', ink: '#0078d2' }, // American Airlines
  OS: { bg: '#fdecec', ink: '#d4002a' }, // Austrian
  BA: { bg: '#e7effc', ink: '#075aaa' }, // British Airways
  SN: { bg: '#e8f0fb', ink: '#00297a' }, // Brussels Airlines
  CX: { bg: '#e3f5f2', ink: '#00645a' }, // Cathay Pacific
  CM: { bg: '#e8f0fb', ink: '#0c2074' }, // Copa
  DL: { bg: '#fdecec', ink: '#c8102e' }, // Delta
  U2: { bg: '#fff0e4', ink: '#ff6600' }, // easyJet
  EK: { bg: '#fdecec', ink: '#d71921' }, // Emirates
  ET: { bg: '#e8f6ea', ink: '#2f7a3d' }, // Ethiopian
  F9: { bg: '#e8f6ea', ink: '#1d7a3e' }, // Frontier
  GA: { bg: '#e3f2fb', ink: '#00609c' }, // Garuda Indonesia
  HU: { bg: '#fdecec', ink: '#c0122c' }, // Hainan
  IB: { bg: '#fdecec', ink: '#d40f14' }, // Iberia
  '6E': { bg: '#e8f0fb', ink: '#012169' }, // IndiGo
  JL: { bg: '#fdecec', ink: '#c8102e' }, // Japan Airlines
  B6: { bg: '#e8f0fb', ink: '#003876' }, // JetBlue
  KL: { bg: '#e3f2fb', ink: '#00a1de' }, // KLM
  LH: { bg: '#fdf3da', ink: '#05164d' }, // Lufthansa
  MH: { bg: '#e3f5f2', ink: '#00664f' }, // Malaysia Airlines
  QF: { bg: '#fdecec', ink: '#e40000' }, // Qantas
  QR: { bg: '#f3e8ef', ink: '#5c0632' }, // Qatar Airways
  FR: { bg: '#e8f0fb', ink: '#073590' }, // Ryanair
  SK: { bg: '#e8f0fb', ink: '#003d7d' }, // SAS
  SQ: { bg: '#fdf3da', ink: '#8a6a00' }, // Singapore Airlines
  WN: { bg: '#e8f0fb', ink: '#304cb2' }, // Southwest
  TP: { bg: '#e8f6ea', ink: '#00703c' }, // TAP Air Portugal
  TG: { bg: '#f3e8fb', ink: '#5c2d91' }, // Thai Airways
  TK: { bg: '#fdecec', ink: '#c70a0c' }, // Turkish Airlines
  HY: { bg: '#e3f2fb', ink: '#0071bc' }, // Uzbekistan Airways
  VS: { bg: '#fdecec', ink: '#e10a0a' }, // Virgin Atlantic
  VA: { bg: '#fdecec', ink: '#d8232a' }, // Virgin Australia
  VY: { bg: '#fdf3da', ink: '#7a6100' }, // Vueling
  W6: { bg: '#f3e8fb', ink: '#c6007e' }, // Wizz Air
};

// Anything not in the table still gets a stable colour rather than a grey box.
const FALLBACK: Ink[] = [
  { bg: '#e3f5f2', ink: '#0f766e' },
  { bg: '#e7effc', ink: '#2563eb' },
  { bg: '#fdf1dc', ink: '#a2700a' },
  { bg: '#fdecec', ink: '#c23b3b' },
  { bg: '#f1ebfd', ink: '#6d3fc4' },
  { bg: '#e8f6ea', ink: '#2f7a3d' },
];

function inkFor(code: string): Ink {
  const brand = BRAND[code];
  if (brand) return brand;
  let sum = 0;
  for (let i = 0; i < code.length; i++) sum += code.charCodeAt(i);
  return FALLBACK[sum % FALLBACK.length];
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
  const { bg, ink } = inkFor(code);
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
