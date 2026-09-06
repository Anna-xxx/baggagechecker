export type Airline = {
  name: string;
  code: string;
  country: string;
  website: string;
  /** Carry-on max dimensions in cm: [width, height, depth] */
  cabin: [number, number, number];
  /** Carry-on max weight in kg */
  cabinKg: number;
};

export const AIRLINES: Airline[] = [
  { name: 'Air Canada', code: 'AC', country: 'Canada', website: 'https://www.aircanada.com', cabin: [55, 40, 23], cabinKg: 10 },
  { name: 'Air France', code: 'AF', country: 'France', website: 'https://www.airfrance.com', cabin: [55, 35, 25], cabinKg: 12 },
  { name: 'Air India', code: 'AI', country: 'India', website: 'https://www.airindia.com', cabin: [55, 40, 20], cabinKg: 7 },
  { name: 'ITA Airways', code: 'AZ', country: 'Italy', website: 'https://www.ita-airways.com', cabin: [45, 35, 20], cabinKg: 5 },
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
  { name: 'Frontier Airlines', code: 'F9', country: 'United States', website: 'https://www.flyfrontier.com', cabin: [61, 41, 25], cabinKg: 10 },
  { name: 'Garuda Indonesia', code: 'GA', country: 'Indonesia', website: 'https://www.garuda-indonesia.com', cabin: [56, 36, 23], cabinKg: 7 },
  { name: 'Hainan Airlines', code: 'HU', country: 'China', website: 'https://www.hainanairlines.com', cabin: [55, 40, 20], cabinKg: 5 },
  { name: 'Iberia', code: 'IB', country: 'Spain', website: 'https://www.iberia.com', cabin: [55, 40, 20], cabinKg: 10 },
  { name: 'IndiGo', code: '6E', country: 'India', website: 'https://www.goindigo.in', cabin: [55, 35, 25], cabinKg: 7 },
  { name: 'Japan Airlines', code: 'JL', country: 'Japan', website: 'https://www.jal.com', cabin: [55, 40, 25], cabinKg: 10 },
  { name: 'JetBlue Airways', code: 'B6', country: 'United States', website: 'https://www.jetblue.com', cabin: [56, 36, 23], cabinKg: 10 },
  { name: 'KLM Royal Dutch Airlines', code: 'KL', country: 'Netherlands', website: 'https://www.klm.com', cabin: [55, 35, 25], cabinKg: 12 },
  { name: 'Lufthansa', code: 'LH', country: 'Germany', website: 'https://www.lufthansa.com', cabin: [55, 40, 23], cabinKg: 8 },
  { name: 'Malaysia Airlines', code: 'MH', country: 'Malaysia', website: 'https://www.malaysiaairlines.com', cabin: [55, 40, 20], cabinKg: 7 },
  { name: 'Qantas', code: 'QF', country: 'Australia', website: 'https://www.qantas.com', cabin: [56, 36, 23], cabinKg: 7 },
  { name: 'Qatar Airways', code: 'QR', country: 'Qatar', website: 'https://www.qatarairways.com', cabin: [50, 37, 25], cabinKg: 7 },
  { name: 'Ryanair', code: 'FR', country: 'Ireland', website: 'https://www.ryanair.com', cabin: [55, 40, 20], cabinKg: 10 },
  { name: 'Scandinavian Airlines', code: 'SK', country: 'Sweden', website: 'https://www.flysas.com', cabin: [55, 40, 23], cabinKg: 8 },
  { name: 'Singapore Airlines', code: 'SQ', country: 'Singapore', website: 'https://www.singaporeair.com', cabin: [55, 40, 20], cabinKg: 7 },
  { name: 'Southwest Airlines', code: 'WN', country: 'United States', website: 'https://www.southwest.com', cabin: [61, 41, 25], cabinKg: 10 },
  { name: 'Spirit Airlines', code: 'NK', country: 'United States', website: 'https://www.spirit.com', cabin: [56, 46, 25], cabinKg: 10 },
  { name: 'TAP Air Portugal', code: 'TP', country: 'Portugal', website: 'https://www.flytap.com', cabin: [55, 40, 20], cabinKg: 8 },
  { name: 'Thai Airways', code: 'TG', country: 'Thailand', website: 'https://www.thaiairways.com', cabin: [56, 45, 25], cabinKg: 7 },
  { name: 'Turkish Airlines', code: 'TK', country: 'Turkey', website: 'https://www.turkishairlines.com', cabin: [55, 40, 23], cabinKg: 8 },
  { name: 'Uzbekistan Airways', code: 'HY', country: 'Uzbekistan', website: 'https://www.uzairways.com', cabin: [56, 45, 25], cabinKg: 8 },
  { name: 'Virgin Atlantic', code: 'VS', country: 'United Kingdom', website: 'https://www.virginatlantic.com', cabin: [56, 36, 23], cabinKg: 10 },
  { name: 'Virgin Australia', code: 'VA', country: 'Australia', website: 'https://www.virginaustralia.com', cabin: [56, 36, 23], cabinKg: 7 },
  { name: 'Vueling', code: 'VY', country: 'Spain', website: 'https://www.vueling.com', cabin: [55, 40, 20], cabinKg: 10 },
];

/** Generic checked-baggage figures (industry-typical; not airline-specific — real allowances vary by fare and route). */
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

export function airlineDomain(website: string): string {
  return website.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
}

/**
 * Public logo sources, tried in order. Clearbit's Logo API (keyed by the airline's own domain) tends
 * to return a compact brand mark that stays legible at small sizes; pics.avs.io's wordmark banner
 * (keyed by IATA code) is the fallback for domains Clearbit doesn't have a logo for. AirlineLogo
 * falls back to a plain text badge if both fail to load.
 */
export function airlineLogoSources(code: string, website: string, width: number, height: number): string[] {
  const size = Math.max(width, height) * 2;
  return [`https://logo.clearbit.com/${airlineDomain(website)}?size=${size}`, `https://pics.avs.io/${width * 2}/${height * 2}/${code}.png`];
}
