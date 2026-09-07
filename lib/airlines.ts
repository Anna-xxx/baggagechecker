export type PersonalItemRule = 'dimensions' | 'linear' | 'fitUnderSeat' | 'notSeparate' | 'unknown';

export type BagLimit = {
  w?: number;
  h?: number;
  d?: number;
  kg: number;
  verified: boolean;
};

export type PersonalItemLimit = BagLimit & {
  rule: PersonalItemRule;
  linearCm?: number;
};

export type CheckedBaggageLimit = Required<Pick<BagLimit, 'w' | 'h' | 'd' | 'kg'>> & {
  total: number;
  eco: number;
  biz: number;
  bags: string;
  verified: boolean;
};

export type CabinClassAllowance = {
  name: string;
  carryOn: string;
  checkedBags: string;
  weightPerBag: string;
  note?: string;
  verified: boolean;
};

export type Airline = {
  name: string;
  code: string;
  country: string;
  website: string;
  baggageUrl: string;
  carryOn: Required<Pick<BagLimit, 'w' | 'h' | 'd' | 'kg'>> & { verified: boolean; linearCm?: number; linearOnly?: boolean; manualCheck?: boolean; note?: string };
  personal: PersonalItemLimit;
  checked: CheckedBaggageLimit;
  classAllowances?: CabinClassAllowance[];
};

export type AirlineBaggage = Pick<Airline, 'carryOn' | 'personal' | 'checked'>;

export const AIRLINES: Airline[] = [
  {
    name: 'Air Canada',
    code: 'AC',
    country: 'Canada',
    website: 'https://www.aircanada.com',
    baggageUrl: 'https://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html',
    carryOn: { w: 40, h: 55, d: 23, kg: 0, verified: true },
    personal: { rule: 'dimensions', w: 43, h: 33, d: 16, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy on most fares', verified: true },
  },
  {
    name: 'Air France',
    code: 'AF',
    country: 'France',
    website: 'https://www.airfrance.com',
    baggageUrl: 'https://wwws.airfrance.es/en/information/bagages/bagage-cabine-soute',
    carryOn: { w: 35, h: 55, d: 25, kg: 12, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business', verified: true },
  },
  {
    name: 'Air India',
    code: 'AI',
    country: 'India',
    website: 'https://www.airindia.com',
    baggageUrl: 'https://www.airindia.com/in/en/travel-information/baggage-guidelines/cabin-baggage.html',
    carryOn: { w: 40, h: 55, d: 23, kg: 7, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 20, kg: 3, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'ITA Airways',
    code: 'AZ',
    country: 'Italy',
    website: 'https://www.ita-airways.com',
    baggageUrl: 'https://www.ita-airways.com/es/en/book-and-prepare/travel-information/baggage/carry-on-baggage',
    carryOn: { w: 40, h: 55, d: 23, kg: 8, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'All Nippon Airways',
    code: 'NH',
    country: 'Japan',
    website: 'https://www.ana.co.jp',
    baggageUrl: 'https://www.ana.co.jp/en/eur/travel-information/baggage-information/',
    carryOn: { w: 40, h: 55, d: 25, kg: 10, verified: true, linearCm: 115, manualCheck: true, note: 'Standard rule for aircraft with 100+ seats: max 55 × 40 × 25 cm and 115 cm total. On ANA domestic aircraft with fewer than 100 seats, the stricter limit is 45 × 35 × 20 cm and 100 cm total.' },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 20, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'American Airlines',
    code: 'AA',
    country: 'United States',
    website: 'https://www.aa.com',
    baggageUrl: 'https://www.aa.com/web/i18n/travel-info/baggage/carry-on-baggage.html',
    carryOn: { w: 36, h: 56, d: 23, kg: 0, verified: true },
    personal: { rule: 'dimensions', w: 35, h: 45, d: 20, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy (fee applies on most domestic fares)', verified: true },
  },
  {
    name: 'Austrian Airlines',
    code: 'OS',
    country: 'Austria',
    website: 'https://www.austrian.com',
    baggageUrl: 'https://www.austrian.com/us/en/handgepaeck',
    carryOn: { w: 40, h: 55, d: 23, kg: 8, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'British Airways',
    code: 'BA',
    country: 'United Kingdom',
    website: 'https://www.britishairways.com',
    baggageUrl: 'https://www.britishairways.com/content/en/information/baggage-essentials',
    carryOn: { w: 45, h: 56, d: 25, kg: 23, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business', verified: true },
    classAllowances: [
      { name: 'Economy', carryOn: '1 cabin bag + 1 hand bag', checkedBags: '1 bag (0 on Economy Basic)', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy', carryOn: '1 cabin bag + 1 hand bag', checkedBags: '2 bags on most routes', weightPerBag: '23 kg', note: 'A limited number of routes have a lower checked-bag allowance.', verified: true },
      { name: 'Business', carryOn: '1 cabin bag + 1 hand bag', checkedBags: '2 bags', weightPerBag: '32 kg', verified: true },
      { name: 'First', carryOn: '1 cabin bag + 1 hand bag', checkedBags: '3 bags', weightPerBag: '32 kg', verified: true },
    ],
  },
  {
    name: 'Brussels Airlines',
    code: 'SN',
    country: 'Belgium',
    website: 'https://www.brusselsairlines.com',
    baggageUrl: 'https://www.brusselsairlines.com/us/en/extra-services/baggage/carry-on-baggage',
    carryOn: { w: 40, h: 55, d: 23, kg: 8, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Cathay Pacific',
    code: 'CX',
    country: 'Hong Kong',
    website: 'https://www.cathaypacific.com',
    baggageUrl: 'https://www.cathaypacific.com/cx/en_US/baggage/cabin-baggage.html',
    carryOn: { w: 36, h: 56, d: 23, kg: 7, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Copa Airlines',
    code: 'CM',
    country: 'Panama',
    website: 'https://www.copaair.com',
    baggageUrl: 'https://www.copaair.com/en-us/travel-information/baggage-information/carry-on/',
    carryOn: { w: 36, h: 56, d: 26, kg: 10, verified: true },
    personal: { rule: 'dimensions', w: 25, h: 43, d: 22, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Delta Air Lines',
    code: 'DL',
    country: 'United States',
    website: 'https://www.delta.com',
    baggageUrl: 'https://www.delta.com/us/en/baggage/carry-on-baggage',
    carryOn: { w: 35, h: 56, d: 23, kg: 0, verified: true },
    personal: { rule: 'unknown', kg: 0, verified: false },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy on most international fares', verified: true },
  },
  {
    name: 'easyJet',
    code: 'U2',
    country: 'United Kingdom',
    website: 'https://www.easyjet.com',
    baggageUrl: 'https://www.easyjet.com/en/help/baggage/cabin-bags',
    carryOn: { w: 45, h: 56, d: 25, kg: 15, verified: true },
    personal: { rule: 'dimensions', w: 36, h: 45, d: 20, kg: 15, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 275, eco: 23, biz: 23, bags: 'none included — checked bags are paid extras', verified: true },
  },
  {
    name: 'Emirates',
    code: 'EK',
    country: 'United Arab Emirates',
    website: 'https://www.emirates.com',
    baggageUrl: 'https://www.emirates.com/english/before-you-fly/baggage/cabin-baggage-rules/',
    carryOn: { w: 38, h: 55, d: 22, kg: 7, verified: true },
    personal: { rule: 'unknown', kg: 0, verified: false },
    checked: { w: 55, h: 80, d: 30, kg: 30, total: 150, eco: 30, biz: 40, bags: 'weight concept: 30 kg in economy', verified: true },
  },
  {
    name: 'Ethiopian Airlines',
    code: 'ET',
    country: 'Ethiopia',
    website: 'https://www.ethiopianairlines.com',
    baggageUrl: 'https://www.ethiopianairlines.com/information/baggage-information/carry-on-baggage',
    carryOn: { w: 40, h: 55, d: 20, kg: 7, verified: true },
    personal: { rule: 'unknown', kg: 3, verified: false },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Frontier Airlines',
    code: 'F9',
    country: 'United States',
    website: 'https://www.flyfrontier.com',
    baggageUrl: 'https://www.flyfrontier.com/travel/travel-info/bag-options/',
    carryOn: { w: 40.64, h: 60.96, d: 25.4, kg: 15.9, verified: true },
    personal: { rule: 'dimensions', w: 35.56, h: 45.72, d: 20.32, kg: 15.9, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Garuda Indonesia',
    code: 'GA',
    country: 'Indonesia',
    website: 'https://www.garuda-indonesia.com',
    baggageUrl: 'https://www.garuda-indonesia.com/id/id/new-baggage-policy',
    carryOn: { w: 36, h: 56, d: 23, kg: 7, verified: true },
    personal: { rule: 'unknown', kg: 0, verified: false },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Hainan Airlines',
    code: 'HU',
    country: 'China',
    website: 'https://www.hainanairlines.com',
    baggageUrl: 'https://www.hainanairlines.com/HUPortal/dyn/portal/DisplayPage?COUNTRY_SITE=MX&LANGUAGE=US&PAGE=CABA&SITE=CBHZCBHZ',
    carryOn: { w: 40, h: 55, d: 20, kg: 7, verified: true, manualCheck: true, note: 'Domestic: max 55 × 40 × 20 cm and 7 kg. International/regional: max 115 cm total (L + W + H) and 10 kg per piece; US departures also use max 115 cm total and 10 kg.' },
    personal: { rule: 'dimensions', w: 30, h: 30, d: 20, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Iberia',
    code: 'IB',
    country: 'Spain',
    website: 'https://www.iberia.com',
    baggageUrl: 'https://www.iberia.com/es/luggage/hand-luggage/?BV_UseBVCookie=no',
    carryOn: { w: 40, h: 56, d: 25, kg: 10, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'IndiGo',
    code: '6E',
    country: 'India',
    website: 'https://www.goindigo.in',
    baggageUrl: 'https://www.goindigo.in/baggage/cabin-baggage.html',
    carryOn: { w: 35, h: 55, d: 25, kg: 7, verified: true },
    personal: { rule: 'unknown', kg: 3, verified: false },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Japan Airlines',
    code: 'JL',
    country: 'Japan',
    website: 'https://www.jal.com',
    baggageUrl: 'https://www.jal.co.jp/jp/en/inter/baggage/inflight/',
    carryOn: { w: 40, h: 55, d: 25, kg: 10, verified: true, linearCm: 115 },
    personal: { rule: 'fitUnderSeat', kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'JetBlue Airways',
    code: 'B6',
    country: 'United States',
    website: 'https://www.jetblue.com',
    baggageUrl: 'https://www.jetblue.com/help/carry-on-bags',
    carryOn: { w: 35.56, h: 55.88, d: 22.86, kg: 0, verified: true },
    personal: { rule: 'dimensions', w: 33, h: 43.2, d: 20.32, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'KLM Royal Dutch Airlines',
    code: 'KL',
    country: 'Netherlands',
    website: 'https://www.klm.com',
    baggageUrl: 'https://www.klm.com/information/baggage/hand-baggage-allowance',
    carryOn: { w: 35, h: 55, d: 25, kg: 12, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Lufthansa',
    code: 'LH',
    country: 'Germany',
    website: 'https://www.lufthansa.com',
    baggageUrl: 'https://www.lufthansa.com/us/en/carry-on-baggage',
    carryOn: { w: 40, h: 55, d: 23, kg: 8, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business', verified: true },
  },
  {
    name: 'Malaysia Airlines',
    code: 'MH',
    country: 'Malaysia',
    website: 'https://www.malaysiaairlines.com',
    baggageUrl: 'https://www.malaysiaairlines.com/uk/en/travel-info/baggage/cabin-baggage.html',
    carryOn: { w: 36, h: 56, d: 23, kg: 7, verified: true },
    personal: { rule: 'dimensions', w: 25, h: 36, d: 25, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Qantas',
    code: 'QF',
    country: 'Australia',
    website: 'https://www.qantas.com',
    baggageUrl: 'https://www.qantas.com/en-au/baggage/carry-on',
    carryOn: { w: 36, h: 56, d: 23, kg: 7, verified: true },
    personal: { rule: 'fitUnderSeat', kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Qatar Airways',
    code: 'QR',
    country: 'Qatar',
    website: 'https://www.qatarairways.com',
    baggageUrl: 'https://www.qatarairways.com/en/baggage/allowance.onboardpopup.html',
    carryOn: { w: 37, h: 50, d: 25, kg: 7, verified: true },
    personal: { rule: 'unknown', kg: 0, verified: false },
    checked: { w: 55, h: 80, d: 30, kg: 25, total: 158, eco: 25, biz: 32, bags: '1–2 bags depending on fare', verified: true },
  },
  {
    name: 'Ryanair',
    code: 'FR',
    country: 'Ireland',
    website: 'https://www.ryanair.com',
    baggageUrl: 'https://help.ryanair.com/hc/en-us/categories/12489112419089-Bag-Rules',
    carryOn: { w: 40, h: 55, d: 20, kg: 10, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 20, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 20, total: 119, eco: 20, biz: 20, bags: 'none included — checked bags are paid extras', verified: true },
  },
  {
    name: 'Scandinavian Airlines',
    code: 'SK',
    country: 'Sweden',
    website: 'https://www.flysas.com',
    baggageUrl: 'https://www.flysas.com/no-en/travel-info/baggage/carry-on',
    carryOn: { w: 40, h: 55, d: 23, kg: 8, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Singapore Airlines',
    code: 'SQ',
    country: 'Singapore',
    website: 'https://www.singaporeair.com',
    baggageUrl: 'https://www.singaporeair.com/es_ES/es/travel-info/baggage/cabin-baggage/',
    carryOn: { w: 40, h: 55, d: 20, kg: 7, verified: true, linearCm: 115, linearOnly: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 10, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Southwest Airlines',
    code: 'WN',
    country: 'United States',
    website: 'https://www.southwest.com',
    baggageUrl: 'https://support.southwest.com/helpcenter/article/carryon-baggage-policy',
    carryOn: { w: 40.64, h: 60.96, d: 25.4, kg: 0, verified: true },
    personal: { rule: 'fitUnderSeat', kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Spirit Airlines',
    code: 'NK',
    country: 'United States',
    website: 'https://www.spirit.com',
    baggageUrl: 'https://www.spirit.com',
    carryOn: { w: 46, h: 56, d: 25, kg: 0, verified: true },
    personal: { rule: 'dimensions', w: 35, h: 45, d: 20, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'TAP Air Portugal',
    code: 'TP',
    country: 'Portugal',
    website: 'https://www.flytap.com',
    baggageUrl: 'https://www.flytap.com/en-es/information/baggage/hand-baggage',
    carryOn: { w: 40, h: 55, d: 25, kg: 10, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 2, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Thai Airways',
    code: 'TG',
    country: 'Thailand',
    website: 'https://www.thaiairways.com',
    baggageUrl: 'https://www.thaiairways.com/es-es/content/baggage/carry-on-baggage/',
    carryOn: { w: 45, h: 56, d: 25, kg: 7, verified: true },
    personal: { rule: 'dimensions', w: 25, h: 37.5, d: 12.5, kg: 1.5, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Turkish Airlines',
    code: 'TK',
    country: 'Turkey',
    website: 'https://www.turkishairlines.com',
    baggageUrl: 'https://www.turkishairlines.com/en-int/any-questions/carry-on-baggage/',
    carryOn: { w: 40, h: 55, d: 23, kg: 8, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 4, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy, 2 in business', verified: true },
  },
  {
    name: 'Uzbekistan Airways',
    code: 'HY',
    country: 'Uzbekistan',
    website: 'https://www.uzairways.com',
    baggageUrl: 'https://www.uzairways.com/en/press-center/news/uzbekistan-airways-hand-baggage-regulations',
    carryOn: { w: 35, h: 55, d: 25, kg: 8, verified: true, linearCm: 115 },
    personal: { rule: 'linear', kg: 5, linearCm: 92, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Virgin Atlantic',
    code: 'VS',
    country: 'United Kingdom',
    website: 'https://www.virginatlantic.com',
    baggageUrl: 'https://www.virginatlantic.com/gb/en/travel-information/baggage-allowance.html',
    carryOn: { w: 36, h: 56, d: 23, kg: 10, verified: true },
    personal: { rule: 'unknown', kg: 0, verified: false },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Virgin Australia',
    code: 'VA',
    country: 'Australia',
    website: 'https://www.virginaustralia.com',
    baggageUrl: 'https://www.virginaustralia.com/au/en/travel-info/baggage/carry-on-baggage/',
    carryOn: { w: 36, h: 56, d: 23, kg: 8, verified: true },
    personal: { rule: 'dimensions', w: 33, h: 45, d: 20, kg: 8, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Vueling',
    code: 'VY',
    country: 'Spain',
    website: 'https://www.vueling.com',
    baggageUrl: 'https://www.vueling.com/en/prepare-your-trip/luggage/cabin-luggage',
    carryOn: { w: 40, h: 55, d: 20, kg: 10, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 20, kg: 0, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  },
  {
    name: 'Wizz Air',
    code: 'W6',
    country: 'Hungary',
    website: 'https://wizzair.com',
    baggageUrl: 'https://ssr-weu2.wizzair.com/en-gb/help-centre/booking-information-and-services/baggage/baggage-allowance/cabin-baggage',
    carryOn: { w: 40, h: 55, d: 23, kg: 10, verified: true },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 20, kg: 10, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
  }
];

export function getAirlineBaggage(airline: Airline): AirlineBaggage {
  return {
    carryOn: airline.carryOn,
    personal: airline.personal,
    checked: airline.checked,
  };
}

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

export function airlineBaggageUrl(code: string, fallbackWebsite: string): string {
  return AIRLINES.find((a) => a.code === code)?.baggageUrl ?? fallbackWebsite;
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
