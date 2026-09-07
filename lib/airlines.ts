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
    classAllowances: [
      { name: 'Economy Basic', carryOn: 'Personal item only on certain itineraries', checkedBags: 'Varies by route', weightPerBag: '23 kg', note: 'Economy Basic carry-on restrictions apply on certain itineraries for tickets purchased on or after 3 Jan 2025.', verified: true },
      { name: 'Economy Standard / Flex / Comfort / Latitude', carryOn: '1 carry-on + 1 personal item', checkedBags: 'Varies by fare/route', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy', carryOn: '1 carry-on + 1 personal item', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Business Class', carryOn: '1 carry-on + 1 personal item', checkedBags: '2 bags', weightPerBag: '32 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy', carryOn: '0–1 hand bag + 1 small bag', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', note: 'Cabin items: 12 kg combined.', verified: true },
      { name: 'Premium', carryOn: '2 hand bags + 1 small bag', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', note: 'Cabin items: 12 kg combined.', verified: true },
      { name: 'Business', carryOn: '2 hand bags + 1 small bag', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', note: 'Cabin items: 18 kg combined.', verified: true },
      { name: 'La Première', carryOn: '2 hand bags + 1 small bag', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', note: 'Cabin items: 18 kg combined.', verified: true },
    ],
  },
  {
    name: 'Air India',
    code: 'AI',
    country: 'India',
    website: 'https://www.airindia.com',
    baggageUrl: 'https://www.airindia.com/in/en/travel-information/baggage-guidelines/cabin-baggage.html',
    carryOn: { w: 40, h: 55, d: 20, kg: 7, verified: true, linearCm: 115 },
    personal: { rule: 'dimensions', w: 30, h: 40, d: 20, kg: 3, verified: true },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
    classAllowances: [
      { name: 'Economy', carryOn: '1 bag · 7 kg', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag · 7 kg', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', verified: true },
      { name: 'Business', carryOn: '1 bag · 10 kg', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', verified: true },
      { name: 'First', carryOn: '1 bag · 10 kg', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy Light', carryOn: '1 bag · 8 kg + personal item', checkedBags: '0 bags', weightPerBag: '—', verified: true },
      { name: 'Economy', carryOn: '1 bag · 8 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', note: 'Some routes/fare products include 2 checked bags.', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag · 8 kg + personal item', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Business', carryOn: 'Check ticket/fare; ITA publishes class-specific variations', checkedBags: '2 bags', weightPerBag: '32 kg', note: 'Domestic Italy may use 2 × 23 kg; some domestic Business products include 1 × 23 kg.', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy', carryOn: '1 carry-on + 1 personal item · 10 kg combined', checkedBags: '0–2 bags', weightPerBag: '23 kg', note: 'Checked-bag count depends on fare rules.', verified: true },
      { name: 'Premium Economy', carryOn: '1 carry-on + 1 personal item · 10 kg combined', checkedBags: '1–2 bags', weightPerBag: '23 kg', note: 'Checked-bag count depends on fare rules.', verified: true },
      { name: 'Business', carryOn: '1 carry-on + 1 personal item · 10 kg combined', checkedBags: '1–2 bags', weightPerBag: '32 kg', note: 'Checked-bag count depends on fare rules.', verified: true },
      { name: 'First', carryOn: '1 carry-on + 1 personal item · 10 kg combined', checkedBags: '3 bags', weightPerBag: '32 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Basic Economy / Main Cabin', carryOn: '1 carry-on + 1 personal item', checkedBags: 'Varies by fare/route; fees often apply', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy', carryOn: '1 carry-on + 1 personal item', checkedBags: '2 bags on many international products', weightPerBag: '23 kg', note: 'Allowance varies by route/product.', verified: true },
      { name: 'Business', carryOn: '1 carry-on + 1 personal item', checkedBags: '2 bags', weightPerBag: '32 kg', verified: true },
      { name: 'First', carryOn: '1 carry-on + 1 personal item', checkedBags: '2–3 bags depending on First product/route', weightPerBag: '32 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy', carryOn: '1 bag · 8 kg + personal item', checkedBags: '1 bag (0 on Basic/Light)', weightPerBag: '23 kg', note: 'Some routes include more.', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag · 8 kg + personal item', checkedBags: '1–2 bags depending on fare', weightPerBag: '23 kg', note: 'Premium Economy Light: 1 bag; most other Premium Economy fares: 2 bags.', verified: true },
      { name: 'Business', carryOn: '2 bags · 8 kg each + personal item', checkedBags: '1–2 bags depending on fare', weightPerBag: '32 kg', note: 'Business Light/Comfort variants may include 1 bag; standard Business generally 2.', verified: true },
      { name: 'First', carryOn: '2 bags · 8 kg each + personal item', checkedBags: '3 bags', weightPerBag: '32 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy Basic', carryOn: 'Personal item only', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', verified: true },
      { name: 'Economy', carryOn: '1 bag · 8 kg + personal item', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag · 8 kg + personal item', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', verified: true },
      { name: 'Business', carryOn: '2 bags · 8 kg each + personal item', checkedBags: 'Varies by fare/route', weightPerBag: 'Varies', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy Light', carryOn: '1 bag · 7 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Economy Essential / Flex', carryOn: '1 bag · 7 kg + personal item', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag · 7 kg + personal item', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Business', carryOn: '1 bag · 10 kg + personal item', checkedBags: '2 bags', weightPerBag: '32 kg', note: 'Hong Kong–New Zealand may use 3 × 23 kg.', verified: true },
      { name: 'First', carryOn: '1 bag · 15 kg + personal item', checkedBags: '3 bags', weightPerBag: '32 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Standard', carryOn: '1 small bag · 45 × 36 × 20 cm · 15 kg', checkedBags: '0 bags included', weightPerBag: 'Purchased separately', verified: true },
      { name: 'Large cabin bag eligible / added', carryOn: 'Small bag + 1 large bag · 56 × 45 × 25 cm · 15 kg', checkedBags: 'Depends on booking', weightPerBag: 'Purchased allowance', note: 'Large cabin bag is included only with eligible fares/seats/memberships or when purchased.', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy', carryOn: '1 bag · 7 kg', checkedBags: '20–35 kg total', weightPerBag: '32 kg max each', note: 'Checked allowance depends on Special / Saver / Flex / Flex Plus and route.', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag · 10 kg', checkedBags: '35 kg total', weightPerBag: '32 kg max each', verified: true },
      { name: 'Business', carryOn: '2 cabin items · 7 kg each', checkedBags: '40 kg total', weightPerBag: '32 kg max each', note: 'Piece-concept routes can differ.', verified: true },
      { name: 'First', carryOn: '2 cabin items · 7 kg each', checkedBags: '50 kg total', weightPerBag: '32 kg max each', note: 'Piece-concept routes can differ.', verified: true },
    ],
  },
  {
    name: 'Ethiopian Airlines',
    code: 'ET',
    country: 'Ethiopia',
    website: 'https://www.ethiopianairlines.com',
    baggageUrl: 'https://www.ethiopianairlines.com/information/baggage-information/carry-on-baggage',
    carryOn: { w: 40, h: 55, d: 23, kg: 7, verified: true },
    personal: { rule: 'unknown', kg: 3, verified: false },
    checked: { w: 55, h: 80, d: 30, kg: 23, total: 158, eco: 23, biz: 32, bags: '1 in economy', verified: false },
    classAllowances: [
      { name: 'Economy', carryOn: '1 bag · 7 kg + personal item', checkedBags: 'Usually 2 bags internationally', weightPerBag: '23 kg', note: 'Exact allowance varies by route/fare.', verified: true },
      { name: 'Business', carryOn: '2 bags · 7 kg each + personal item', checkedBags: '2 × 32 kg or 3 × 23 kg', weightPerBag: 'Route dependent', note: 'Use the ticket allowance for the operating route.', verified: true },
    ],
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
    classAllowances: [
      { name: 'Basic', carryOn: 'Personal item included; carry-on optional', checkedBags: 'Optional', weightPerBag: '40 lb / 18.1 kg standard', verified: true },
      { name: 'Economy / Premium bundle', carryOn: '1 carry-on · up to 35 lb / 15.9 kg', checkedBags: 'Check bundle', weightPerBag: '40 lb / 18.1 kg standard', verified: true },
      { name: 'Business bundle', carryOn: '1 carry-on · up to 35 lb / 15.9 kg', checkedBags: '2 bags included', weightPerBag: '50 lb / 22.7 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy', carryOn: '1 bag + personal item · 10 kg combined', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag + personal item · 10 kg combined', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Business', carryOn: '1 bag + personal item · 10 kg combined', checkedBags: '3 bags', weightPerBag: '32 kg', verified: true },
      { name: 'First', carryOn: '1 bag + personal item · 10 kg combined', checkedBags: '3 bags', weightPerBag: '32 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy Basic', carryOn: 'Small underseat bag only', checkedBags: '0 bags', weightPerBag: '—', note: 'Availability of Basic depends on market.', verified: true },
      { name: 'Economy Light / Standard / Flex', carryOn: '1 bag + small bag · 12 kg combined', checkedBags: '0–1 bag', weightPerBag: '23 kg', note: 'Light normally has no checked bag; Standard/Flex normally include 1.', verified: true },
      { name: 'Premium Comfort', carryOn: '2 bags + small bag · 18 kg combined', checkedBags: '0–2 bags', weightPerBag: '23 kg', note: 'Light has no checked bag; Standard/Flex normally include 2.', verified: true },
      { name: 'Business', carryOn: '2 bags + small bag · 18 kg combined', checkedBags: '1–2 bags', weightPerBag: '32 kg', note: 'Business Light normally includes 1; Standard/Flex normally include 2.', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy Light', carryOn: '1 bag · 8 kg + personal item', checkedBags: '0 bags', weightPerBag: '—', verified: true },
      { name: 'Economy', carryOn: '1 bag · 8 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy Light', carryOn: '1 bag · 8 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag · 8 kg + personal item', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Business Light', carryOn: '2 bags · 8 kg each + personal item', checkedBags: '1 bag', weightPerBag: '32 kg', verified: true },
      { name: 'Business', carryOn: '2 bags · 8 kg each + personal item', checkedBags: '2 bags', weightPerBag: '32 kg', verified: true },
      { name: 'First', carryOn: '2 bags · 8 kg each + personal item', checkedBags: '3 bags', weightPerBag: '32 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy', carryOn: '1 bag · 7 kg', checkedBags: '25–35 kg total or 2 bags', weightPerBag: '23 kg on Americas/Africa piece routes', note: 'Allowance varies by Economy Lite / Classic / Convenience / Comfort and route.', verified: true },
      { name: 'Business', carryOn: '2 bags · 15 kg combined', checkedBags: '40 kg total or 2 bags', weightPerBag: '32 kg on Americas/Africa piece routes', verified: true },
      { name: 'First', carryOn: '2 bags · 15 kg combined', checkedBags: '50 kg total or 2 bags', weightPerBag: '32 kg on Americas/Africa piece routes', verified: true },
    ],
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
    classAllowances: [
      { name: 'All fares', carryOn: '1 small bag · 40 × 30 × 20 cm', checkedBags: 'Optional', weightPerBag: '10 / 20 / 23 kg options', verified: true },
      { name: 'Priority & 2 Cabin Bags', carryOn: 'Small bag + 1 × 10 kg overhead bag', checkedBags: 'Optional', weightPerBag: '10 / 20 / 23 kg options', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy Light', carryOn: 'Underseat bag only within Europe', checkedBags: '0 bags', weightPerBag: '—', note: 'Outside Europe, 1 × 8 kg carry-on is included.', verified: true },
      { name: 'Economy Standard / Flex', carryOn: '1 bag · 8 kg + underseat bag', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Premium', carryOn: '1 × 8 kg in Europe; 2 × 8 kg outside Europe', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Business', carryOn: '1 × 8 kg in Europe; 2 × 8 kg outside Europe', checkedBags: '2 bags', weightPerBag: '32 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy', carryOn: '1 bag · 7 kg', checkedBags: '25–30 kg total or 2 bags to/from USA', weightPerBag: '23 kg on USA piece routes', note: 'Weight allowance depends on fare type.', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag · 7 kg', checkedBags: '35 kg total or 2 bags to/from USA', weightPerBag: '23 kg on USA piece routes', verified: true },
      { name: 'Business', carryOn: '2 bags · 7 kg each', checkedBags: '40 kg total or 2 bags to/from USA', weightPerBag: '32 kg on USA piece routes', verified: true },
      { name: 'First / Suites', carryOn: '2 bags · 7 kg each', checkedBags: '50 kg total or 2 bags to/from USA', weightPerBag: '32 kg on USA piece routes', verified: true },
    ],
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
    classAllowances: [
      { name: 'Basic', carryOn: '1 carry-on + 1 personal item', checkedBags: 'Paid', weightPerBag: '23 kg standard', verified: true },
      { name: 'Choice', carryOn: '1 carry-on + 1 personal item', checkedBags: 'Paid', weightPerBag: '23 kg standard', verified: true },
      { name: 'Choice Preferred', carryOn: '1 carry-on + 1 personal item', checkedBags: 'Paid', weightPerBag: '23 kg standard', verified: true },
      { name: 'Choice Extra', carryOn: '1 carry-on + 1 personal item', checkedBags: '2 bags included', weightPerBag: '23 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Value', carryOn: 'Personal item included; carry-on paid', checkedBags: 'Paid', weightPerBag: 'Up to 50 lb / 22.7 kg', verified: true },
      { name: 'Premium Economy', carryOn: '1 carry-on + personal item', checkedBags: 'Paid', weightPerBag: 'Up to 50 lb / 22.7 kg', verified: true },
      { name: 'Spirit First', carryOn: '1 carry-on + personal item', checkedBags: '1 bag included', weightPerBag: 'Up to 50 lb / 22.7 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy Discount', carryOn: '1 bag · 10 kg + personal item', checkedBags: '0 bags', weightPerBag: '—', note: 'Route-specific exceptions apply.', verified: true },
      { name: 'Economy Basic / Classic / Plus', carryOn: '1 bag · 10 kg + personal item', checkedBags: 'Usually 1 bag', weightPerBag: '23 kg', note: 'Included baggage varies by route and fare.', verified: true },
      { name: 'Business Executive / Top Executive', carryOn: '2 bags · 10 kg each + personal item', checkedBags: 'Usually 2 bags', weightPerBag: '32 kg', note: 'Check route-specific fare conditions.', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy Saver / Standard', carryOn: '1 bag · 7 kg', checkedBags: 'Usually 1 bag internationally', weightPerBag: '23 kg', note: 'Piece Concept applies on covered routes from 2 Mar 2026; some destinations differ.', verified: true },
      { name: 'Economy Flexi / Full Flex', carryOn: '1 bag · 7 kg', checkedBags: 'Usually 2 bags internationally', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag · 7 kg', checkedBags: '2 bags internationally', weightPerBag: '23 kg', verified: true },
      { name: 'Royal Silk (Business)', carryOn: '2 bags · 7 kg each', checkedBags: '2 bags internationally', weightPerBag: '32 kg', verified: true },
      { name: 'Royal First', carryOn: '2 bags · 7 kg each', checkedBags: '3 bags internationally', weightPerBag: '32 kg', note: 'Reward fare may include 2 bags.', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy Light', carryOn: '1 bag · 10 kg', checkedBags: '0 bags', weightPerBag: '—', verified: true },
      { name: 'Economy Classic / Delight', carryOn: '1 bag · 10 kg', checkedBags: '1 bag', weightPerBag: '23 kg', note: 'Selected routes can include 2 checked bags.', verified: true },
      { name: 'Premium', carryOn: '1 bag · 10 kg', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Upper Class', carryOn: '2 bags · max 12 kg each / 16 kg combined', checkedBags: '2 bags', weightPerBag: '32 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Economy Lite', carryOn: '1 bag · 8 kg + personal item', checkedBags: '0 bags', weightPerBag: '—', verified: true },
      { name: 'Economy Choice / Flex', carryOn: '1 bag · 8 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Economy X', carryOn: 'Up to 2 bags · 14 kg combined + personal item', checkedBags: 'Depends on underlying fare', weightPerBag: '23 kg when included', verified: true },
      { name: 'Business', carryOn: 'Up to 2 bags · 14 kg combined + personal item', checkedBags: '2 bags', weightPerBag: '32 kg', note: 'Qatar-operated international services use the operating carrier rules.', verified: true },
    ],
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
    classAllowances: [
      { name: 'Fly Light', carryOn: '1 underseat bag · 40 × 30 × 20 cm', checkedBags: '0 bags', weightPerBag: '—', verified: true },
      { name: 'Fly', carryOn: 'Underseat bag + choice of 10 kg overhead bag', checkedBags: 'Or choose 1 × 25 kg checked bag', weightPerBag: '25 kg if checked option selected', verified: true },
      { name: 'Fly Grande', carryOn: 'Underseat bag + 1 × 10 kg overhead bag', checkedBags: '1 bag', weightPerBag: '25 kg', verified: true },
    ],
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
    classAllowances: [
      { name: 'Basic', carryOn: '1 underseat bag · 40 × 30 × 20 cm · 10 kg', checkedBags: '0 bags', weightPerBag: '—', verified: true },
      { name: 'WIZZ Priority', carryOn: 'Underseat bag + 1 trolley · 55 × 40 × 23 cm · 10 kg', checkedBags: 'Optional', weightPerBag: '10 / 20 / 26 / 32 kg options', verified: true },
      { name: 'WIZZ Go / WIZZ Plus', carryOn: 'Includes trolley bag + underseat bag', checkedBags: 'Included', weightPerBag: 'Check booking bundle', note: 'Wizz publishes several checked-bag weights; the exact included option is shown during booking.', verified: true },
    ],
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
