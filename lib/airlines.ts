export type Airline = {
  name: string;
  code: string;
  country: string;
  website: string;
  /** Carry-on max dimensions in cm: [height, width, depth] */
  cabin: [number, number, number];
  /** Carry-on max weight in kg. Use 0 when the airline publishes no numeric limit. */
  cabinKg: number;
};

export type BagLimit = {
  w: number;
  h: number;
  d: number;
  kg: number;
};

export type CheckedBaggageLimit = BagLimit & {
  total: number;
  eco: number;
  biz: number;
  bags: string;
};

export type PersonalItemRule = 'dimensions' | 'linear' | 'fitUnderSeat' | 'notSeparate' | 'unknown';

export type AirlineBaggage = {
  carryOn: BagLimit;
  personal: BagLimit;
  personalRule: PersonalItemRule;
  personalLinearCm?: number;
  personalVerified: boolean;
  checked: CheckedBaggageLimit;
};

const AIRLINE_BASE: Airline[] = [
  { name: 'Air Canada', code: 'AC', country: 'Canada', website: 'https://www.aircanada.com', cabin: [55, 40, 23], cabinKg: 10 },
  { name: 'Air France', code: 'AF', country: 'France', website: 'https://www.airfrance.com', cabin: [55, 35, 25], cabinKg: 12 },
  { name: 'Air India', code: 'AI', country: 'India', website: 'https://www.airindia.com', cabin: [55, 40, 20], cabinKg: 7 },
  { name: 'ITA Airways', code: 'AZ', country: 'Italy', website: 'https://www.ita-airways.com', cabin: [55, 40, 23], cabinKg: 8 },
  { name: 'All Nippon Airways', code: 'NH', country: 'Japan', website: 'https://www.ana.co.jp', cabin: [55, 40, 25], cabinKg: 10 },
  { name: 'American Airlines', code: 'AA', country: 'United States', website: 'https://www.aa.com', cabin: [56, 36, 23], cabinKg: 10 },
  { name: 'Austrian Airlines', code: 'OS', country: 'Austria', website: 'https://www.austrian.com', cabin: [55, 40, 23], cabinKg: 8 },
  { name: 'British Airways', code: 'BA', country: 'United Kingdom', website: 'https://www.britishairways.com', cabin: [56, 45, 25], cabinKg: 23 },
  { name: 'Brussels Airlines', code: 'SN', country: 'Belgium', website: 'https://www.brusselsairlines.com', cabin: [55, 40, 23], cabinKg: 8 },
  { name: 'Cathay Pacific', code: 'CX', country: 'Hong Kong', website: 'https://www.cathaypacific.com', cabin: [56, 36, 23], cabinKg: 7 },
  { name: 'Copa Airlines', code: 'CM', country: 'Panama', website: 'https://www.copaair.com', cabin: [56, 36, 26], cabinKg: 10 },
  { name: 'Delta Air Lines', code: 'DL', country: 'United States', website: 'https://www.delta.com', cabin: [56, 35, 23], cabinKg: 10 },
  { name: 'easyJet', code: 'U2', country: 'United Kingdom', website: 'https://www.easyjet.com', cabin: [45, 36, 20], cabinKg: 15 },
  { name: 'Emirates', code: 'EK', country: 'United Arab Emirates', website: 'https://www.emirates.com', cabin: [55, 38, 22], cabinKg: 7 },
  { name: 'Ethiopian Airlines', code: 'ET', country: 'Ethiopia', website: 'https://www.ethiopianairlines.com', cabin: [55, 40, 23], cabinKg: 7 },
  { name: 'Frontier Airlines', code: 'F9', country: 'United States', website: 'https://www.flyfrontier.com', cabin: [61, 41, 25], cabinKg: 15.9 },
  { name: 'Garuda Indonesia', code: 'GA', country: 'Indonesia', website: 'https://www.garuda-indonesia.com', cabin: [56, 36, 23], cabinKg: 7 },
  { name: 'Hainan Airlines', code: 'HU', country: 'China', website: 'https://www.hainanairlines.com', cabin: [55, 40, 20], cabinKg: 5 },
  { name: 'Iberia', code: 'IB', country: 'Spain', website: 'https://www.iberia.com', cabin: [56, 40, 25], cabinKg: 10 },
  { name: 'IndiGo', code: '6E', country: 'India', website: 'https://www.goindigo.in', cabin: [55, 35, 25], cabinKg: 7 },
  { name: 'Japan Airlines', code: 'JL', country: 'Japan', website: 'https://www.jal.com', cabin: [55, 40, 25], cabinKg: 10 },
  { name: 'JetBlue Airways', code: 'B6', country: 'United States', website: 'https://www.jetblue.com', cabin: [56, 36, 23], cabinKg: 10 },
  { name: 'KLM Royal Dutch Airlines', code: 'KL', country: 'Netherlands', website: 'https://www.klm.com', cabin: [55, 35, 25], cabinKg: 12 },
  { name: 'Lufthansa', code: 'LH', country: 'Germany', website: 'https://www.lufthansa.com', cabin: [55, 40, 23], cabinKg: 8 },
  { name: 'Malaysia Airlines', code: 'MH', country: 'Malaysia', website: 'https://www.malaysiaairlines.com', cabin: [56, 36, 23], cabinKg: 7 },
  { name: 'Qantas', code: 'QF', country: 'Australia', website: 'https://www.qantas.com', cabin: [56, 36, 23], cabinKg: 7 },
  { name: 'Qatar Airways', code: 'QR', country: 'Qatar', website: 'https://www.qatarairways.com', cabin: [50, 37, 25], cabinKg: 7 },
  { name: 'Ryanair', code: 'FR', country: 'Ireland', website: 'https://www.ryanair.com', cabin: [55, 40, 20], cabinKg: 10 },
  { name: 'Scandinavian Airlines', code: 'SK', country: 'Sweden', website: 'https://www.flysas.com', cabin: [55, 40, 23], cabinKg: 8 },
  { name: 'Singapore Airlines', code: 'SQ', country: 'Singapore', website: 'https://www.singaporeair.com', cabin: [55, 40, 20], cabinKg: 7 },
  { name: 'Southwest Airlines', code: 'WN', country: 'United States', website: 'https://www.southwest.com', cabin: [61, 41, 25], cabinKg: 10 },
  { name: 'Spirit Airlines', code: 'NK', country: 'United States', website: 'https://www.spirit.com', cabin: [56, 46, 25], cabinKg: 10 },
  { name: 'TAP Air Portugal', code: 'TP', country: 'Portugal', website: 'https://www.flytap.com', cabin: [55, 40, 25], cabinKg: 10 },
  { name: 'Thai Airways', code: 'TG', country: 'Thailand', website: 'https://www.thaiairways.com', cabin: [56, 45, 25], cabinKg: 7 },
  { name: 'Turkish Airlines', code: 'TK', country: 'Turkey', website: 'https://www.turkishairlines.com', cabin: [55, 40, 23], cabinKg: 8 },
  { name: 'Uzbekistan Airways', code: 'HY', country: 'Uzbekistan', website: 'https://www.uzairways.com', cabin: [55, 35, 25], cabinKg: 8 },
  { name: 'Virgin Atlantic', code: 'VS', country: 'United Kingdom', website: 'https://www.virginatlantic.com', cabin: [56, 36, 23], cabinKg: 10 },
  { name: 'Virgin Australia', code: 'VA', country: 'Australia', website: 'https://www.virginaustralia.com', cabin: [56, 36, 23], cabinKg: 8 },
  { name: 'Vueling', code: 'VY', country: 'Spain', website: 'https://www.vueling.com', cabin: [55, 40, 20], cabinKg: 10 },
  { name: 'Wizz Air', code: 'W6', country: 'Hungary', website: 'https://wizzair.com', cabin: [55, 40, 23], cabinKg: 10 },
];

const DEFAULT_PERSONAL: BagLimit = { w: 30, h: 40, d: 20, kg: 0 };

const PERSONAL_BY_CODE: Record<string, BagLimit> = {
  AC: { w: 33, h: 43, d: 16, kg: 0 },
  AF: { w: 30, h: 40, d: 15, kg: 0 },
  AI: { w: 30, h: 40, d: 20, kg: 3 },
  AZ: { w: 30, h: 40, d: 15, kg: 0 },
  NH: { w: 30, h: 40, d: 20, kg: 0 },
  AA: { w: 35, h: 45, d: 20, kg: 0 },
  OS: { w: 30, h: 40, d: 15, kg: 0 },
  BA: { w: 30, h: 40, d: 15, kg: 0 },
  SN: { w: 30, h: 40, d: 15, kg: 0 },
  CX: { w: 30, h: 40, d: 15, kg: 0 },
  CM: { w: 25, h: 43, d: 22, kg: 0 },
  U2: { w: 36, h: 45, d: 20, kg: 15 },
  F9: { w: 35.56, h: 45.72, d: 20.32, kg: 15.9 },
  HU: { w: 30, h: 30, d: 20, kg: 0 },
  IB: { w: 30, h: 40, d: 15, kg: 0 },
  B6: { w: 33, h: 43.2, d: 20.32, kg: 0 },
  KL: { w: 30, h: 40, d: 15, kg: 0 },
  LH: { w: 30, h: 40, d: 15, kg: 0 },
  MH: { w: 25, h: 36, d: 25, kg: 0 },
  FR: { w: 30, h: 40, d: 20, kg: 0 },
  SK: { w: 30, h: 40, d: 15, kg: 0 },
  SQ: { w: 30, h: 40, d: 10, kg: 0 },
  NK: { w: 35, h: 45, d: 20, kg: 0 },
  TP: { w: 30, h: 40, d: 15, kg: 2 },
  TG: { w: 25, h: 37.5, d: 12.5, kg: 1.5 },
  TK: { w: 30, h: 40, d: 15, kg: 4 },
  VA: { w: 33, h: 45, d: 20, kg: 8 },
  VY: { w: 30, h: 40, d: 20, kg: 0 },
  W6: { w: 30, h: 40, d: 20, kg: 10 },
};

const PERSONAL_LINEAR_BY_CODE: Record<string, { total: number; kg: number }> = {
  HY: { total: 92, kg: 5 },
};

const PERSONAL_WEIGHT_ONLY_BY_CODE: Record<string, number> = {
  ET: 3,
  '6E': 3,
};

const PERSONAL_FIT_UNDER_SEAT_CODES = new Set(['JL', 'QF', 'WN']);
const PERSONAL_NOT_SEPARATE_CODES = new Set<string>();

const CARRY_ON_BY_CODE: Record<string, BagLimit> = {
  AC: { w: 40, h: 55, d: 23, kg: 0 },
  AA: { w: 36, h: 56, d: 23, kg: 0 },
  DL: { w: 35, h: 56, d: 23, kg: 0 },
  U2: { w: 45, h: 56, d: 25, kg: 15 },
};

const CHECKED_BY_CODE: Record<string, Partial<CheckedBaggageLimit>> = {
  AC: { total: 158, eco: 23, biz: 32, bags: '1 in economy on most fares' },
  AF: { total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business' },
  AA: { total: 158, eco: 23, biz: 32, bags: '1 in economy (fee applies on most domestic fares)' },
  BA: { total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business' },
  DL: { total: 158, eco: 23, biz: 32, bags: '1 in economy on most international fares' },
  U2: { total: 275, eco: 23, biz: 23, bags: 'none included — checked bags are paid extras' },
  EK: { total: 150, eco: 30, biz: 40, bags: 'weight concept: 30 kg in economy' },
  LH: { total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business' },
  QR: { total: 158, eco: 25, biz: 32, bags: '1–2 bags depending on fare' },
  FR: { total: 119, eco: 20, biz: 20, bags: 'none included — checked bags are paid extras' },
  TK: { total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business' },
};

export const AIRLINES: Airline[] = AIRLINE_BASE;

export function getAirlineBaggage(airline: Airline): AirlineBaggage {
  const carryOn =
    CARRY_ON_BY_CODE[airline.code] ?? {
      w: airline.cabin[1],
      h: airline.cabin[0],
      d: airline.cabin[2],
      kg: airline.cabinKg,
    };
  const exactPersonal = PERSONAL_BY_CODE[airline.code];
  const linearPersonal = PERSONAL_LINEAR_BY_CODE[airline.code];
  const weightOnly = PERSONAL_WEIGHT_ONLY_BY_CODE[airline.code];

  let personal = exactPersonal ?? { ...DEFAULT_PERSONAL, kg: weightOnly ?? 0 };
  let personalRule: PersonalItemRule = 'unknown';
  let personalLinearCm: number | undefined;

  if (exactPersonal) {
    personalRule = 'dimensions';
  } else if (linearPersonal) {
    personal = { ...DEFAULT_PERSONAL, kg: linearPersonal.kg };
    personalRule = 'linear';
    personalLinearCm = linearPersonal.total;
  } else if (PERSONAL_FIT_UNDER_SEAT_CODES.has(airline.code)) {
    personalRule = 'fitUnderSeat';
  } else if (PERSONAL_NOT_SEPARATE_CODES.has(airline.code)) {
    personalRule = 'notSeparate';
  }

  const checkedOverride = CHECKED_BY_CODE[airline.code] ?? {};
  const checked = {
    ...DEFAULT_CHECKED,
    ...checkedOverride,
    kg: checkedOverride.eco ?? DEFAULT_CHECKED.eco,
  };

  return {
    carryOn,
    personal,
    personalRule,
    personalLinearCm,
    personalVerified: personalRule !== 'unknown',
    checked,
  };
}

/** Legacy generic checked-baggage figures. New UI code should use getAirlineBaggage().checked. */
export const TYPICAL_CHECKED = { w: 55, h: 40, d: 20, kg: 23 };

export function airlineSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function findAirlineBySlug(slug: string): Airline | undefined {
  return AIRLINES.find((a) => airlineSlug(a.name) === slug);
}

const AIRLINE_BAGGAGE_URLS: Record<string, string> = {
  AC: 'https://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html',
  AF: 'https://wwws.airfrance.es/en/information/bagages/bagage-cabine-soute',
  AI: 'https://www.airindia.com/in/en/travel-information/baggage-guidelines/cabin-baggage.html',
  AZ: 'https://www.ita-airways.com/es/en/book-and-prepare/travel-information/baggage/carry-on-baggage',
  NH: 'https://www.ana.co.jp/en/eur/travel-information/baggage-information/',
  AA: 'https://www.aa.com/web/i18n/travel-info/baggage/carry-on-baggage.html',
  OS: 'https://www.austrian.com/us/en/handgepaeck',
  BA: 'https://www.britishairways.com/content/en/information/baggage-essentials',
  SN: 'https://www.brusselsairlines.com/us/en/extra-services/baggage/carry-on-baggage',
  CX: 'https://www.cathaypacific.com/cx/en_US/baggage/cabin-baggage.html',
  CM: 'https://www.copaair.com/en-us/travel-information/baggage-information/carry-on/',
  DL: 'https://www.delta.com/us/en/baggage/carry-on-baggage',
  U2: 'https://www.easyjet.com/en/help/baggage/cabin-bags',
  EK: 'https://www.emirates.com/english/before-you-fly/baggage/cabin-baggage-rules/',
  ET: 'https://www.ethiopianairlines.com/information/baggage-information/carry-on-baggage',
  F9: 'https://www.flyfrontier.com/travel/travel-info/bag-options/',
  GA: 'https://www.garuda-indonesia.com/id/id/new-baggage-policy',
  HU: 'https://www.hainanairlines.com/HUPortal/dyn/portal/DisplayPage?COUNTRY_SITE=MX&LANGUAGE=US&PAGE=CABA&SITE=CBHZCBHZ',
  IB: 'https://www.iberia.com/es/luggage/hand-luggage/?BV_UseBVCookie=no',
  '6E': 'https://www.goindigo.in/baggage/cabin-baggage.html',
  JL: 'https://www.jal.co.jp/jp/en/inter/baggage/inflight/',
  B6: 'https://www.jetblue.com/help/carry-on-bags',
  KL: 'https://www.klm.com/information/baggage/hand-baggage-allowance',
  LH: 'https://www.lufthansa.com/us/en/carry-on-baggage',
  MH: 'https://www.malaysiaairlines.com/uk/en/travel-info/baggage/cabin-baggage.html',
  QF: 'https://www.qantas.com/en-au/baggage/carry-on',
  QR: 'https://www.qatarairways.com/en/baggage/allowance.onboardpopup.html',
  FR: 'https://help.ryanair.com/hc/en-us/categories/12489112419089-Bag-Rules',
  SK: 'https://www.flysas.com/no-en/travel-info/baggage/carry-on',
  SQ: 'https://www.singaporeair.com/es_ES/es/travel-info/baggage/cabin-baggage/',
  WN: 'https://support.southwest.com/helpcenter/article/carryon-baggage-policy',
  TP: 'https://www.flytap.com/en-es/information/baggage/hand-baggage',
  TG: 'https://www.thaiairways.com/es-es/content/baggage/carry-on-baggage/',
  TK: 'https://www.turkishairlines.com/en-int/any-questions/carry-on-baggage/',
  HY: 'https://www.uzairways.com/en/press-center/news/uzbekistan-airways-hand-baggage-regulations',
  VS: 'https://www.virginatlantic.com/gb/en/travel-information/baggage-allowance.html',
  VA: 'https://www.virginaustralia.com/au/en/travel-info/baggage/carry-on-baggage/',
  VY: 'https://www.vueling.com/en/prepare-your-trip/luggage/cabin-luggage',
  W6: 'https://ssr-weu2.wizzair.com/en-gb/help-centre/booking-information-and-services/baggage/baggage-allowance/cabin-baggage',
};

export function airlineBaggageUrl(code: string, fallbackWebsite: string): string {
  return AIRLINE_BAGGAGE_URLS[code] ?? fallbackWebsite;
}

export function airlineDomain(website: string): string {
  return website.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
}

/**
 * Public logo sources, tried in order. Google's favicon service (keyed by the airline's own domain) is
 * used first — favicons are designed to stay legible at small square sizes, unlike a full wordmark.
 * pics.avs.io's wordmark banner (keyed by IATA code) is the fallback for domains with no usable favicon.
 * AirlineLogo falls back to a plain text badge if both fail to load.
 */
export function airlineLogoSources(code: string, website: string, width: number, height: number): string[] {
  const size = Math.max(width, height) * 2;
  return [`https://www.google.com/s2/favicons?domain=${airlineDomain(website)}&sz=${size}`, `https://pics.avs.io/${width * 2}/${height * 2}/${code}.png`];
}
