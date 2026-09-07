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

export type CheckedBaggageLimit = Pick<BagLimit, 'kg'> & {
  w?: number;
  h?: number;
  d?: number;
  total: number;
  eco: number;
  biz: number;
  bags: string;
  verified: boolean;
  rule?: 'linear' | 'dimensions';
  manualCheck?: boolean;
  note?: string;
};

export type CabinClassAllowance = {
  name: string;
  carryOn: string;
  checkedBags: string;
  weightPerBag: string;
  note?: string;
  verified: boolean;
};

export type CarryOnVariant = {
  id: string;
  label: string;
  w?: number;
  h?: number;
  d?: number;
  kg: number;
  maxSingleKg?: number;
  linearCm?: number;
  linearOnly?: boolean;
  allowed?: boolean;
  manualCheck?: boolean;
  note?: string;
  weightRule?: 'perPiece' | 'combinedWithPersonal' | 'none';
  verified: boolean;
};

export type Airline = {
  name: string;
  code: string;
  country: string;
  website: string;
  baggageUrl: string;
  carryOn: Required<Pick<BagLimit, 'w' | 'h' | 'd' | 'kg'>> & { verified: boolean; linearCm?: number; linearOnly?: boolean; manualCheck?: boolean; note?: string; weightRule?: 'perPiece' | 'combinedWithPersonal' | 'none' };
  carryOnVariants?: CarryOnVariant[];
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
    carryOnVariants: [
      { id: 'standard', label: 'Standard allowance · carry-on included', w: 40, h: 55, d: 23, kg: 0, verified: true },
      { id: 'basic-restricted', label: 'Economy Basic · restricted itinerary · personal item only', kg: 0, allowed: false, note: 'On certain Economy Basic itineraries, only a personal item is included. Eligible international connections can still include a standard carry-on.', verified: true },
    ],
    personal: { rule: 'dimensions', w: 43, h: 33, d: 16, kg: 0, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Fare-dependent; Premium Economy and Business generally include 2 bags', verified: true, rule: 'linear', note: 'Maximum standard size is 158 cm total. Economy and Premium Economy use 23 kg per bag; Business/Signature uses 32 kg per bag. Exact free bag count depends on fare and itinerary.' },
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
    carryOn: { w: 35, h: 55, d: 25, kg: 12, verified: true, weightRule: 'combinedWithPersonal', note: '12 kg combined across cabin bag and personal item.' },
    carryOnVariants: [
      { id: 'basic', label: 'Basic · small bag only', kg: 0, allowed: false, note: 'Standard hand baggage can be purchased separately on Basic fares.', verified: true },
      { id: 'economy-premium', label: 'Economy / Premium · 12 kg total cabin weight', w: 35, h: 55, d: 25, kg: 12, weightRule: 'combinedWithPersonal', verified: true },
      { id: 'business-first', label: 'Business / La Première · 18 kg total cabin weight', w: 35, h: 55, d: 25, kg: 18, weightRule: 'combinedWithPersonal', verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Fare-dependent', verified: true, rule: 'linear', note: 'Maximum standard size is 158 cm total. Economy/Premium: 23 kg per bag. Business/La Première: 32 kg per bag. Included bag count depends on fare and route.' },
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
    carryOnVariants: [
      { id: 'economy-premium', label: 'Economy / Premium Economy · 7 kg', w: 40, h: 55, d: 20, kg: 7, linearCm: 115, verified: true },
      { id: 'business-first', label: 'Business / First · 10 kg', w: 40, h: 55, d: 20, kg: 10, linearCm: 115, verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 20, kg: 3, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Route and fare dependent', verified: true, rule: 'linear', manualCheck: true, note: 'Air India mixes weight and piece concepts by route. Each piece must stay within 158 cm; Economy/Premium piece routes use up to 23 kg per piece and Business/First up to 32 kg. Check the booked route for the actual allowance.' },
    classAllowances: [
      { name: 'Economy Value', carryOn: '1 bag · 7 kg', checkedBags: 'Domestic: 15 kg · International: route dependent', weightPerBag: '23 kg max on piece routes', note: 'International allowance varies by destination; on many Europe/US/Canada/Japan piece routes Economy Value is 1 × 23 kg.', verified: true },
      { name: 'Economy Classic', carryOn: '1 bag · 7 kg', checkedBags: 'Domestic: 20 kg · International: route dependent', weightPerBag: '23 kg max on piece routes', note: 'On many piece-concept international routes this is 2 × 23 kg.', verified: true },
      { name: 'Economy Flex', carryOn: '1 bag · 7 kg', checkedBags: 'Domestic: 25 kg · International: route dependent', weightPerBag: '23 kg max on piece routes', note: 'On many piece-concept international routes this is 2 × 23 kg.', verified: true },
      { name: 'Premium Economy Value', carryOn: '1 bag · 7 kg', checkedBags: 'Domestic: 15 kg · International: route dependent', weightPerBag: '23 kg max on piece routes', note: 'International allowance varies by destination.', verified: true },
      { name: 'Premium Economy Flex', carryOn: '1 bag · 7 kg', checkedBags: 'Domestic: 25 kg · International: route dependent', weightPerBag: '23 kg max on piece routes', note: 'On many piece-concept international routes this is 2 × 23 kg.', verified: true },
      { name: 'Business Value', carryOn: '1 bag · 10 kg', checkedBags: 'Domestic: 30 kg · International: route dependent', weightPerBag: '32 kg max on piece routes', note: 'On many piece-concept international routes this is 2 × 32 kg.', verified: true },
      { name: 'Business Flex', carryOn: '1 bag · 10 kg', checkedBags: 'Domestic: 40 kg · International: route dependent', weightPerBag: '32 kg max on piece routes', note: 'On many piece-concept international routes this is 2 × 32 kg.', verified: true },
      { name: 'First', carryOn: '1 bag · 10 kg', checkedBags: 'Domestic: 40 kg · International: route dependent', weightPerBag: '32 kg max on piece routes', note: 'On many piece-concept international routes this is 2 × 32 kg.', verified: true },
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
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Economy Light 0; Economy 1; Premium Economy 2; Business usually 2', verified: true, rule: 'linear', note: 'Each checked bag may measure up to 158 cm total. Economy/Premium use 23 kg per piece; Business normally 32 kg per piece, with domestic Italy exceptions.' },
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
    carryOn: { w: 40, h: 55, d: 25, kg: 10, verified: true, linearCm: 115, manualCheck: true, weightRule: 'combinedWithPersonal', note: 'Standard rule for aircraft with 100+ seats: max 55 × 40 × 25 cm and 115 cm total. On aircraft with fewer than 100 seats, the stricter limit is 45 × 35 × 20 cm and 100 cm total. The 10 kg limit is combined across the carry-on bag and personal item.' },
    carryOnVariants: [
      { id: '100plus', label: 'Aircraft with 100+ seats · 55 × 40 × 25 cm', w: 40, h: 55, d: 25, kg: 10, linearCm: 115, weightRule: 'combinedWithPersonal', verified: true },
      { id: 'under100', label: 'Aircraft with fewer than 100 seats · 45 × 35 × 20 cm', w: 35, h: 45, d: 20, kg: 10, linearCm: 100, weightRule: 'combinedWithPersonal', verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 20, kg: 0, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Fare-dependent: Economy 0–2; Premium/Business 1–2; First 3', verified: true, rule: 'linear', note: 'ANA international checked bags are limited to 158 cm total per piece. Economy/Premium Economy: 23 kg per piece; Business/First: 32 kg per piece.' },
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
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Fare and route dependent', verified: true, rule: 'linear', note: 'Standard limit is 158 cm total. Economy/Premium Economy: 23 kg per bag; First/Business free bags: 32 kg per bag. Australia/New Zealand free bags use 32 kg.' },
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
    carryOnVariants: [
      { id: 'basic', label: 'Economy Basic · personal item only', kg: 0, allowed: false, verified: true },
      { id: 'standard', label: 'Other Economy / Premium · 8 kg', w: 40, h: 55, d: 23, kg: 8, verified: true },
      { id: 'business', label: 'Business · 8 kg per bag', w: 40, h: 55, d: 23, kg: 8, verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Fare-dependent', verified: true, rule: 'linear', note: 'Maximum size is 158 cm total. Economy/Premium Economy: 23 kg per piece; Business: 32 kg per piece.' },
    classAllowances: [
      { name: 'Economy Basic · selected short/medium-haul routes', carryOn: '1 personal item only · 40 × 30 × 15 cm', checkedBags: '0 bags', weightPerBag: '—', verified: true },
      { name: 'Economy Light', carryOn: '1 bag · 8 kg + personal item', checkedBags: '0 bags', weightPerBag: '23 kg if purchased', verified: true },
      { name: 'Economy Comfort / Comfort Plus / Comfort Green / Flex', carryOn: '1 bag · 8 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy Light', carryOn: '1 bag · 8 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy Comfort / Comfort Plus / Comfort Green / Flex', carryOn: '1 bag · 8 kg + personal item', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Business Light', carryOn: '2 bags · 8 kg each + personal item', checkedBags: '1 bag', weightPerBag: '32 kg', verified: true },
      { name: 'Business Comfort / Comfort Plus / Comfort Green / Flex', carryOn: '2 bags · 8 kg each + personal item', checkedBags: '2 bags', weightPerBag: '32 kg', verified: true },
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
    checked: { w: 75, h: 90, d: 43, kg: 23, total: 208, eco: 23, biz: 32, bags: 'Economy 0–1; Premium Economy usually 2; Business 2; First 3', verified: true, rule: 'dimensions', note: 'British Airways publishes a per-bag maximum of 90 × 75 × 43 cm rather than a 158 cm linear limit. Economy/Premium Economy: 23 kg per bag; Business/First: 32 kg per bag.' },
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
    carryOnVariants: [
      { id: 'basic', label: 'Economy Basic · personal item only', kg: 0, allowed: false, verified: true },
      { id: 'standard', label: 'Economy / Premium · 8 kg', w: 40, h: 55, d: 23, kg: 8, verified: true },
      { id: 'business', label: 'Business · 8 kg per bag', w: 40, h: 55, d: 23, kg: 8, verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Fare-dependent', verified: true, rule: 'linear', note: 'Maximum size is 158 cm total. Economy/Premium Economy: 23 kg per piece; Business: 32 kg per piece.' },
    classAllowances: [
      { name: 'Economy Basic · short/medium haul', carryOn: '1 personal item only · 40 × 30 × 15 cm', checkedBags: '0 bags', weightPerBag: '—', verified: true },
      { name: 'Economy Light · short/medium haul', carryOn: '1 bag · 8 kg + personal item', checkedBags: '0 bags', weightPerBag: '—', verified: true },
      { name: 'Economy Comfort / Comfort Green / Flex · short/medium haul', carryOn: '1 bag · 8 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Business Comfort / Comfort Green · short/medium haul', carryOn: '2 bags · 8 kg each + personal item', checkedBags: '1 bag', weightPerBag: '32 kg', verified: true },
      { name: 'Business Flex · short/medium haul', carryOn: '2 bags · 8 kg each + personal item', checkedBags: '2 bags', weightPerBag: '32 kg', verified: true },
      { name: 'Economy Light · long haul', carryOn: '1 bag · 8 kg + personal item', checkedBags: '0 bags', weightPerBag: '—', verified: true },
      { name: 'Economy · long haul', carryOn: '1 bag · 8 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy Light · long haul', carryOn: '1 bag · 8 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Premium Economy · long haul', carryOn: '1 bag · 8 kg + personal item', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Business Light · long haul', carryOn: '2 bags · 8 kg each + personal item', checkedBags: '1 bag', weightPerBag: '32 kg', verified: true },
      { name: 'Business · long haul', carryOn: '2 bags · 8 kg each + personal item', checkedBags: '2 bags', weightPerBag: '32 kg', verified: true },
    ],
  },
  {
    name: 'Cathay Pacific',
    code: 'CX',
    country: 'Hong Kong',
    website: 'https://www.cathaypacific.com',
    baggageUrl: 'https://www.cathaypacific.com/cx/en_US/baggage/cabin-baggage.html',
    carryOn: { w: 36, h: 56, d: 23, kg: 7, verified: true },
    carryOnVariants: [
      { id: 'economy-premium', label: 'Economy / Premium Economy · 7 kg', w: 36, h: 56, d: 23, kg: 7, verified: true },
      { id: 'business', label: 'Business · 10 kg', w: 36, h: 56, d: 23, kg: 10, verified: true },
      { id: 'first', label: 'First · 15 kg', w: 36, h: 56, d: 23, kg: 15, verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Economy Light 1; Economy Essential/Flex 2; Premium Economy 2; Business 2; First 3', verified: true, rule: 'linear', note: 'Cathay standard checked baggage is limited to 158 cm per piece. Economy Light: 1 × 23 kg; Economy Essential/Flex and Premium Economy: 2 × 23 kg; Business: 2 × 32 kg; First: 3 × 32 kg. Hong Kong–New Zealand Business has a 3 × 23 kg exception.' },
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
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Economy Basic 0; Classic 1; Full 2; Business 2', verified: true, rule: 'linear', note: 'Standard checked bag is 158 cm total. Economy bags are 23 kg; Business bags are 32 kg. Seasonal destination restrictions can reduce the number accepted.' },
    classAllowances: [
      { name: 'Economy Basic', carryOn: '1 bag · 10 kg + personal item', checkedBags: '0 bags included', weightPerBag: '23 kg if purchased', verified: true },
      { name: 'Economy Classic', carryOn: '1 bag · 10 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Economy Full', carryOn: '1 bag · 10 kg + personal item', checkedBags: '2 bags', weightPerBag: '23 kg', verified: true },
      { name: 'Business Promo / Full', carryOn: '1 bag · 10 kg + personal item', checkedBags: '2 bags', weightPerBag: '32 kg', verified: true },
    ],
  },
  {
    name: 'Delta Air Lines',
    code: 'DL',
    country: 'United States',
    website: 'https://www.delta.com',
    baggageUrl: 'https://www.delta.com/us/en/baggage/carry-on-baggage',
    carryOn: { w: 35, h: 56, d: 23, kg: 0, verified: true },
    personal: { rule: 'unknown', kg: 0, verified: false },
    checked: { kg: 23, total: 157, eco: 23, biz: 32, bags: 'Fare and route dependent', verified: true, rule: 'linear', note: 'Delta standard checked bags are limited to 62 linear inches (about 157 cm). Main/Comfort standard bags are 23 kg; eligible First/Delta One bags may be 32 kg.' },
    classAllowances: [
      { name: 'Delta Main / Delta Comfort', carryOn: '1 carry-on + 1 personal item', checkedBags: 'Varies by route/fare', weightPerBag: '23 kg standard', note: 'Domestic standard checked bags are normally paid unless another benefit applies.', verified: true },
      { name: 'Delta Premium Select', carryOn: '1 carry-on + 1 personal item', checkedBags: 'Varies by route/fare', weightPerBag: '23 kg', note: 'Basic premium fares introduced in 2026 can have reduced checked-bag benefits.', verified: true },
      { name: 'Delta First / Delta One', carryOn: '1 carry-on + 1 personal item', checkedBags: 'Varies by route/fare', weightPerBag: '32 kg', note: 'Basic premium fare variants may have reduced checked-bag benefits.', verified: true },
    ],
  },
  {
    name: 'easyJet',
    code: 'U2',
    country: 'United Kingdom',
    website: 'https://www.easyjet.com',
    baggageUrl: 'https://www.easyjet.com/en/help/baggage/cabin-bags',
    carryOn: { w: 45, h: 56, d: 25, kg: 15, verified: true },
    carryOnVariants: [
      { id: 'small-only', label: 'Small underseat bag only · 45 × 36 × 20 cm', kg: 0, allowed: false, note: 'The included bag must fit under the seat. Use the Personal item checker for this bag; a large overhead cabin bag must be included or purchased separately.', verified: true },
      { id: 'large', label: 'Large cabin bag included / purchased · 56 × 45 × 25 cm', w: 45, h: 56, d: 25, kg: 15, verified: true },
    ],
    personal: { rule: 'dimensions', w: 36, h: 45, d: 20, kg: 15, verified: true },
    checked: { kg: 23, total: 275, eco: 23, biz: 23, bags: 'Paid hold baggage; up to 3 bags per passenger', verified: true, rule: 'linear', note: 'easyJet standard hold bag is 23 kg. 15 kg and heavier options are available; no single bag may exceed 32 kg. Maximum total size is under 275 cm.' },
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
    carryOnVariants: [
      { id: 'economy', label: 'Economy · 7 kg', w: 38, h: 55, d: 22, kg: 7, verified: true },
      { id: 'premium', label: 'Premium Economy · 10 kg', w: 38, h: 55, d: 22, kg: 10, verified: true },
      { id: 'business-first', label: 'Business / First · 7 kg per piece', w: 38, h: 55, d: 22, kg: 7, note: 'Business and First allow two cabin items; this checks the larger handbag-sized piece.', verified: true },
      { id: 'brazil', label: 'Departure from Brazil · 10 kg', w: 38, h: 55, d: 22, kg: 10, verified: true },
    ],
    personal: { rule: 'unknown', kg: 0, verified: false },
    checked: { kg: 0, total: 0, eco: 0, biz: 0, bags: 'Weight or piece concept depending on route', verified: true, rule: 'linear', manualCheck: true, note: 'Emirates uses two different checked-baggage systems. Weight-concept routes allow each piece up to 203 cm and use total class weight; piece-concept routes use 150 cm per piece with different piece/weight allowances. Check the booked route.' },
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
    carryOn: { w: 40, h: 55, d: 20, kg: 7, verified: true },
    personal: { rule: 'unknown', kg: 3, verified: false },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Usually 2 pieces; route/fare exceptions apply', verified: true, rule: 'linear', note: 'Standard international piece limit is 158 cm. Economy: 23 kg per piece. Cloud Nine: up to 32 kg per piece, with some routes/fare products using different piece counts.' },
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
    carryOnVariants: [
      { id: 'personal-only', label: 'Personal item only · no carry-on purchased', kg: 0, allowed: false, verified: true },
      { id: 'carryon', label: 'Carry-on purchased / included · 35 lb', w: 40.64, h: 60.96, d: 25.4, kg: 15.9, verified: true },
    ],
    personal: { rule: 'dimensions', w: 35.56, h: 45.72, d: 20.32, kg: 15.9, verified: true },
    checked: { kg: 18.1, total: 157, eco: 18.1, biz: 22.7, bags: 'Paid unless included with a bundle/status', verified: true, rule: 'linear', note: 'Frontier standard checked bag: 62 linear inches and 40 lb (18.1 kg). Certain bundles allow 50 lb (22.7 kg). Bags over 100 lb are not accepted.' },
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
    carryOn: { w: 36, h: 56, d: 23, kg: 7, verified: true, linearCm: 115, manualCheck: true, note: 'Standard jets: max 56 × 36 × 23 cm, 115 cm total and 7 kg. On CRJ/ATR Economy flights, a stricter 41 × 34 × 17 cm and 92 cm total limit applies.' },
    carryOnVariants: [
      { id: 'standard-jet', label: 'Standard jet · 56 × 36 × 23 cm · 7 kg', w: 36, h: 56, d: 23, kg: 7, linearCm: 115, verified: true },
      { id: 'crj-atr', label: 'CRJ / ATR Economy · 41 × 34 × 17 cm · 7 kg', w: 34, h: 41, d: 17, kg: 7, linearCm: 92, verified: true },
    ],
    personal: { rule: 'unknown', kg: 0, verified: false },
    checked: { kg: 0, total: 0, eco: 0, biz: 0, bags: 'Ticket-specific under the new Piece Concept', verified: true, rule: 'linear', manualCheck: true, note: 'For tickets purchased or issued from 1 Sep 2026, Garuda uses a new Piece Concept. The ticket shows the included number of bags and weight per bag, so the checker should not assume one universal allowance.' },
    classAllowances: [
      { name: 'Economy', carryOn: '1 bag · 7 kg', checkedBags: 'See ticket', weightPerBag: 'Ticket-specific', note: 'For tickets issued/purchased from 1 Sep 2026, Garuda uses a new Piece Concept and prints the included piece count/weight on the ticket.', verified: true },
      { name: 'Business', carryOn: '1 bag · 7 kg', checkedBags: 'See ticket', weightPerBag: 'Ticket-specific', note: 'New Piece Concept applies to Garuda-operated flights for tickets issued/purchased from 1 Sep 2026.', verified: true },
      { name: 'First', carryOn: '1 bag · 7 kg', checkedBags: 'See ticket', weightPerBag: 'Ticket-specific', note: 'Where First Class is offered, use the allowance printed on the ticket under the new Piece Concept.', verified: true },
    ],
  },
  {
    name: 'Hainan Airlines',
    code: 'HU',
    country: 'China',
    website: 'https://www.hainanairlines.com',
    baggageUrl: 'https://www.hainanairlines.com/HUPortal/dyn/portal/DisplayPage?COUNTRY_SITE=MX&LANGUAGE=US&PAGE=CABA&SITE=CBHZCBHZ',
    carryOn: { w: 40, h: 55, d: 20, kg: 7, verified: true, manualCheck: true, note: 'Domestic: max 55 × 40 × 20 cm and 7 kg. International/regional: max 115 cm total (L + W + H) and 10 kg per piece; US departures also use max 115 cm total and 10 kg.' },
    carryOnVariants: [
      { id: 'domestic', label: 'Domestic · 55 × 40 × 20 cm · 7 kg', w: 40, h: 55, d: 20, kg: 7, verified: true },
      { id: 'international', label: 'International / regional · ≤ 115 cm total · 10 kg', kg: 10, linearCm: 115, linearOnly: true, verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 30, d: 20, kg: 0, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Route and branded-fare dependent', verified: true, rule: 'linear', manualCheck: true, note: 'Hainan updated checked baggage rules from 2 Sep 2026. Many international branded fares use 158 cm and 23 kg Economy pieces, while route/fare allowances vary; single pieces may not exceed 32 kg and 203 cm.' },
    classAllowances: [
      { name: 'Economy', carryOn: 'Domestic: 1 × 7 kg · International: 1 × 10 kg', checkedBags: 'Varies by route/fare', weightPerBag: 'Usually 23 kg on piece routes', note: 'International cabin size is governed by 115 cm total dimensions.', verified: true },
      { name: 'Business', carryOn: 'Domestic: 2 × 7 kg · International: 2 × 10 kg', checkedBags: 'Usually 2 bags on major international routes', weightPerBag: '32 kg on piece routes', note: 'Exact checked allowance varies by route and branded fare.', verified: true },
      { name: 'Premium Economy', carryOn: 'Check route/ticket', checkedBags: 'Often 2 bags on transpacific routes', weightPerBag: '23 kg', note: 'Premium Economy is not offered on every route; use the operating-flight allowance.', verified: true },
    ],
  },
  {
    name: 'Iberia',
    code: 'IB',
    country: 'Spain',
    website: 'https://www.iberia.com',
    baggageUrl: 'https://www.iberia.com/es/luggage/hand-luggage/?BV_UseBVCookie=no',
    carryOn: { w: 40, h: 56, d: 25, kg: 10, verified: true },
    carryOnVariants: [
      { id: 'economy-premium', label: 'Economy / Premium Economy · 10 kg', w: 40, h: 56, d: 25, kg: 10, verified: true },
      { id: 'business', label: 'Business · 14 kg per bag', w: 40, h: 56, d: 25, kg: 14, verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Fare-dependent', verified: true, rule: 'linear', note: 'Standard checked baggage is 158 cm total and 23 kg. Overweight can be purchased up to 32 kg; Business allowances may use 32 kg per piece.' },
    classAllowances: [
      { name: 'Economy Basic', carryOn: '1 bag · 10 kg + personal item', checkedBags: '0 bags included', weightPerBag: '23 kg if purchased', verified: true },
      { name: 'Economy Optima / Comfort / Flexible', carryOn: '1 bag · 10 kg + personal item', checkedBags: 'Usually 1 bag', weightPerBag: '23 kg', note: 'Exact inclusions depend on route/fare.', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag · 10 kg + personal item', checkedBags: '1–2 bags', weightPerBag: '23 kg', note: 'Promotional/Executive often include 1; Comfort/Flexible often include 2.', verified: true },
      { name: 'Business', carryOn: '1 × 14 kg; 2 × 14 kg on most long-haul', checkedBags: 'Varies by fare/route', weightPerBag: 'Up to 32 kg', note: 'US departures have a different cabin-bag piece rule.', verified: true },
    ],
  },
  {
    name: 'IndiGo',
    code: '6E',
    country: 'India',
    website: 'https://www.goindigo.in',
    baggageUrl: 'https://www.goindigo.in/baggage/cabin-baggage.html',
    carryOn: { w: 35, h: 55, d: 25, kg: 7, verified: true, linearCm: 115 },
    carryOnVariants: [
      { id: 'economy', label: 'Economy / Super 6E · 7 kg', w: 35, h: 55, d: 25, kg: 7, linearCm: 115, verified: true },
      { id: 'stretch', label: 'IndiGoStretch / Stretch+ · 12 kg', w: 35, h: 55, d: 25, kg: 12, linearCm: 115, verified: true },
    ],
    personal: { rule: 'unknown', kg: 3, verified: false },
    checked: { kg: 0, total: 158, eco: 0, biz: 0, bags: 'Weight allowance depends heavily on route', verified: true, rule: 'linear', manualCheck: true, note: 'IndiGo standard checked size is 158 cm total, but free weight varies by route: e.g. 15 kg domestic, 20–30 kg on many international routes, and codeshares may use piece limits. ATR aircraft also have a separate dimensional rule.' },
    classAllowances: [
      { name: 'Economy Saver / Flexi', carryOn: '1 bag · 7 kg', checkedBags: 'Route dependent', weightPerBag: 'Check booking', note: 'Domestic and international allowances differ; selected long-haul services include up to 30 kg checked baggage.', verified: true },
      { name: 'Super 6E', carryOn: '1 bag · 7 kg', checkedBags: 'Route dependent', weightPerBag: 'Check booking', note: 'Selected long-haul services include up to 35 kg checked baggage.', verified: true },
      { name: 'IndiGoStretch / Stretch+', carryOn: '1 bag · up to 12 kg on applicable long-haul aircraft', checkedBags: 'Up to 2 bags on applicable long-haul services', weightPerBag: 'Allowance shown in booking', note: 'Current A321XLR/Norse-operated long-haul rules differ from standard domestic Economy.', verified: true },
    ],
  },
  {
    name: 'Japan Airlines',
    code: 'JL',
    country: 'Japan',
    website: 'https://www.jal.com',
    baggageUrl: 'https://www.jal.co.jp/jp/en/inter/baggage/inflight/',
    carryOn: { w: 40, h: 55, d: 25, kg: 10, verified: true, linearCm: 115, weightRule: 'combinedWithPersonal', note: 'The 10 kg limit is combined across the carry-on bag and personal item.' },
    personal: { rule: 'fitUnderSeat', kg: 0, verified: true },
    checked: { kg: 23, total: 203, eco: 23, biz: 32, bags: 'Economy/Premium Economy 2; Business/First 3', verified: true, rule: 'linear', note: 'JAL international checked bags may measure up to 203 cm total. Economy/Premium Economy: 2 × 23 kg. Business/First: 3 × 32 kg.' },
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
    checked: { kg: 22.68, total: 158, eco: 22.68, biz: 32, bags: 'Fare-dependent; Mint/Mint Flex include 2 bags', verified: true, rule: 'linear', note: 'Standard JetBlue checked bag: 62 in / 158 cm total and 50 lb / 22.68 kg. Mint and Mint Flex include 2 bags up to 70 lb / 32 kg each.' },
    classAllowances: [
      { name: 'Main Base / Main / Main Flex', carryOn: '1 carry-on + 1 personal item', checkedBags: 'Paid on most routes', weightPerBag: '23 kg', note: 'Checked-bag price and inclusions vary by market; verify the booked fare.', verified: true },
      { name: 'EvenMore Base / EvenMore / EvenMore Flex', carryOn: '1 carry-on + 1 personal item', checkedBags: 'Paid on most routes', weightPerBag: '23 kg', note: 'Some international markets may include a bag; use the booked fare allowance.', verified: true },
      { name: 'Mint / Mint Flex', carryOn: '1 carry-on + 1 personal item', checkedBags: '2 bags included', weightPerBag: '32 kg', verified: true },
    ],
  },
  {
    name: 'KLM Royal Dutch Airlines',
    code: 'KL',
    country: 'Netherlands',
    website: 'https://www.klm.com',
    baggageUrl: 'https://www.klm.com/information/baggage/hand-baggage-allowance',
    carryOn: { w: 35, h: 55, d: 25, kg: 12, verified: true, weightRule: 'combinedWithPersonal', note: '12 kg combined across cabin bag and personal item.' },
    carryOnVariants: [
      { id: 'basic', label: 'Basic · small bag only', kg: 0, allowed: false, note: 'A standard hand-baggage item can be purchased separately.', verified: true },
      { id: 'economy', label: 'Economy Light / Standard / Flex · 12 kg total cabin weight', w: 35, h: 55, d: 25, kg: 12, weightRule: 'combinedWithPersonal', verified: true },
      { id: 'premium', label: 'Premium Comfort · 12 kg total cabin weight', w: 35, h: 55, d: 25, kg: 12, weightRule: 'combinedWithPersonal', verified: true },
      { id: 'business', label: 'Business · 18 kg total cabin weight', w: 35, h: 55, d: 25, kg: 18, weightRule: 'combinedWithPersonal', verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Economy 0–1; Premium Comfort 0–2; Business 1–2 by fare', verified: true, rule: 'linear', note: 'Each checked bag is limited to 158 cm total. Economy/Premium Comfort bags: 23 kg; Business bags: 32 kg. Basic/Light fare inclusions differ.' },
    classAllowances: [
      { name: 'Economy Basic', carryOn: 'Small underseat bag only', checkedBags: '0 bags', weightPerBag: '—', note: 'Availability of Basic depends on market.', verified: true },
      { name: 'Economy Light / Standard / Flex', carryOn: '1 bag + small bag · 12 kg combined', checkedBags: '0–1 bag', weightPerBag: '23 kg', note: 'Light normally has no checked bag; Standard/Flex normally include 1.', verified: true },
      { name: 'Premium Comfort', carryOn: '2 bags + small bag · 12 kg combined', checkedBags: '0–2 bags', weightPerBag: '23 kg', note: 'Light has no checked bag; Standard/Flex normally include 2.', verified: true },
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
    carryOnVariants: [
      { id: 'basic', label: 'Economy Basic · personal item only', kg: 0, allowed: false, verified: true },
      { id: 'economy-premium', label: 'Economy / Premium Economy · 8 kg', w: 40, h: 55, d: 23, kg: 8, verified: true },
      { id: 'business-first', label: 'Business / First · 8 kg per bag', w: 40, h: 55, d: 23, kg: 8, verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Fare-dependent', verified: true, rule: 'linear', note: 'Maximum size per piece is 158 cm. Economy: up to 23 kg; Business: up to 32 kg. Included piece count depends on fare, route and cabin.' },
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
    checked: { kg: 0, total: 158, eco: 0, biz: 0, bags: 'Weight or piece concept depending on ticket', verified: true, rule: 'linear', manualCheck: true, note: 'Malaysia Airlines uses both Weight Concept and Piece Concept. Every standard piece must stay under 158 cm and no piece may exceed 32 kg. Weight Concept varies by fare (for example Economy Value 20 kg, Basic 25 kg, Flex 35 kg; Business 40–55 kg). Piece Concept international fares can use 2 × 23 kg Economy or 2 × 32 kg Business.' },
    classAllowances: [
      { name: 'Economy Value', carryOn: '1 bag · 7 kg', checkedBags: '20 kg total', weightPerBag: 'Weight concept', note: 'Selected routes are excluded and may use different allowances.', verified: true },
      { name: 'Economy Basic', carryOn: '1 bag · 7 kg', checkedBags: '25 kg total', weightPerBag: 'Weight concept', verified: true },
      { name: 'Economy Flex', carryOn: '1 bag · 7 kg', checkedBags: '35 kg total', weightPerBag: 'Weight concept', verified: true },
      { name: 'Business Basic', carryOn: 'Up to 2 pieces · 14 kg combined, max 7 kg each', checkedBags: '40 kg total', weightPerBag: 'Weight concept', verified: true },
      { name: 'Business Flex', carryOn: 'Up to 2 pieces · 14 kg combined, max 7 kg each', checkedBags: '50 kg total', weightPerBag: 'Weight concept', verified: true },
      { name: 'Business Suite', carryOn: 'Up to 2 pieces · 14 kg combined, max 7 kg each', checkedBags: '55 kg total', weightPerBag: 'Weight concept', verified: true },
    ],
  },
  {
    name: 'Qantas',
    code: 'QF',
    country: 'Australia',
    website: 'https://www.qantas.com',
    baggageUrl: 'https://www.qantas.com/en-au/baggage/carry-on',
    carryOn: { w: 36, h: 56, d: 23, kg: 7, verified: true, linearCm: 115, manualCheck: true, note: 'International Economy: 1 piece up to 7 kg. Premium Economy, Business and First: 2 pieces up to 7 kg each. Domestic and Dash 8 rules differ.' },
    carryOnVariants: [
      { id: 'domestic-standard', label: 'Domestic Australia · 1 overhead bag · 10 kg', w: 36, h: 56, d: 23, kg: 10, verified: true },
      { id: 'domestic-two', label: 'Domestic Australia · 2 small bags · 14 kg total', w: 34, h: 48, d: 23, kg: 14, maxSingleKg: 10, weightRule: 'combinedWithPersonal', note: 'Two small carry-on pieces share a 14 kg total limit; no single piece may exceed 10 kg.', verified: true },
      { id: 'dash8', label: 'QantasLink Dash 8 · 7 kg', w: 36, h: 56, d: 23, kg: 7, note: 'Dash 8 services have their own carry-on configuration and may impose tighter stowage constraints.', verified: true },
      { id: 'intl-economy', label: 'International Economy · 7 kg', w: 36, h: 56, d: 23, kg: 7, verified: true },
      { id: 'intl-premium', label: 'International Premium / Business / First · 14 kg total', w: 36, h: 56, d: 23, kg: 14, maxSingleKg: 10, weightRule: 'combinedWithPersonal', note: 'Allowance includes an overhead and underseat item; no individual item may exceed 10 kg.', verified: true },
    ],
    personal: { rule: 'fitUnderSeat', kg: 0, verified: true },
    checked: { kg: 0, total: 0, eco: 0, biz: 0, bags: 'Route, cabin and status dependent', verified: true, rule: 'linear', manualCheck: true, note: 'Qantas size rules differ by route: Australian domestic bags are limited to 140 cm total, international bags to 158 cm. Economy is typically 1 × 23 kg domestic, 1 × 32 kg to the Americas, or 30 kg total on other international routes. Premium cabins and frequent-flyer status have different allowances.' },
    classAllowances: [
      { name: 'Economy', carryOn: 'International: 1 overhead bag · 7 kg + personal item', checkedBags: 'Domestic: 1 bag · Americas: 1 bag · Elsewhere: weight concept', weightPerBag: '23 kg domestic · 32 kg Americas · 30 kg total elsewhere', note: 'Domestic mainline carry-on can be up to 14 kg total; Dash 8 services are stricter.', verified: true },
      { name: 'Premium Economy', carryOn: 'International: 2 bags · 7 kg each', checkedBags: 'Domestic: 2 bags · Americas: 2 bags · Elsewhere: weight concept', weightPerBag: '23 kg domestic · 32 kg Americas · 40 kg total elsewhere', verified: true },
      { name: 'Business', carryOn: 'International: 2 bags · 7 kg each', checkedBags: 'Domestic/Americas: 2 bags · Elsewhere: weight concept', weightPerBag: '32 kg per piece where piece concept applies · 40 kg total elsewhere', verified: true },
      { name: 'First', carryOn: 'International: 2 bags · 7 kg each', checkedBags: 'Americas: 3 bags · Elsewhere: weight concept', weightPerBag: '32 kg per piece in Americas · 50 kg total elsewhere', verified: true },
    ],
  },
  {
    name: 'Qatar Airways',
    code: 'QR',
    country: 'Qatar',
    website: 'https://www.qatarairways.com',
    baggageUrl: 'https://www.qatarairways.com/en/baggage/allowance.onboardpopup.html',
    carryOn: { w: 37, h: 50, d: 25, kg: 7, verified: true },
    carryOnVariants: [
      { id: 'economy', label: 'Economy · 7 kg', w: 37, h: 50, d: 25, kg: 7, verified: true },
      { id: 'economy-brazil', label: 'Economy to / from Brazil · 10 kg', w: 37, h: 50, d: 25, kg: 10, verified: true },
      { id: 'business-first', label: 'Business / First · 15 kg total', w: 37, h: 50, d: 25, kg: 15, weightRule: 'combinedWithPersonal', note: 'Business and First allow two cabin pieces with a combined maximum of 15 kg. US departures are limited to one cabin bag plus one personal item.', verified: true },
    ],
    personal: { rule: 'unknown', kg: 0, verified: false },
    checked: { kg: 0, total: 0, eco: 0, biz: 0, bags: 'Piece concept for Africa/Americas; weight concept elsewhere', verified: true, rule: 'linear', manualCheck: true, note: 'Qatar Airways uses 158 cm per bag on flights to/from Africa or the Americas and up to 300 cm on most other routes. Africa/Americas use a piece allowance; other routes use total weight. No single checked bag may exceed 32 kg.' },
    classAllowances: [
      { name: 'Economy', carryOn: '1 bag · 7 kg', checkedBags: '20–35 kg total or 1–2 bags', weightPerBag: '23 kg on Americas/Africa piece routes', note: 'Lite / Classic / Convenience / Comfort and route determine the exact allowance; Brazil cabin allowance is 10 kg.', verified: true },
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
    carryOnVariants: [
      { id: 'basic', label: 'Basic / Plus · small personal bag only', kg: 0, allowed: false, note: 'The free 40 × 30 × 20 cm bag belongs under the seat and is handled as Personal item in this checker.', verified: true },
      { id: 'priority', label: 'Priority / Regular / Flexi Plus · 10 kg overhead bag', w: 40, h: 55, d: 20, kg: 10, verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 20, kg: 0, verified: true },
    checked: { w: 120, h: 80, d: 120, kg: 0, total: 320, eco: 0, biz: 0, bags: 'Paid 10 / 20 / 23 kg check-in bag options', verified: true, rule: 'dimensions', manualCheck: true, note: 'Ryanair checked bags may measure up to 80 × 120 × 120 cm. The purchased allowance can be 10, 20 or 23 kg, so the checker cannot assume one universal weight. No individual item over 32 kg is accepted.' },
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
    carryOnVariants: [
      { id: 'light-europe', label: 'Economy Light · within Europe · personal item only', kg: 0, allowed: false, verified: true },
      { id: 'light-outside', label: 'Economy Light · outside Europe · 8 kg', w: 40, h: 55, d: 23, kg: 8, verified: true },
      { id: 'standard', label: 'Economy Standard / Flex · 8 kg', w: 40, h: 55, d: 23, kg: 8, verified: true },
      { id: 'premium-business', label: 'Premium / Business · 8 kg per bag', w: 40, h: 55, d: 23, kg: 8, verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 15, kg: 0, verified: true },
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Ticket type and destination dependent', verified: true, rule: 'linear', note: 'SAS checked baggage is limited to 158 cm total. Maximum weight is 23 kg or 32 kg depending on ticket type and destination.' },
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
    checked: { kg: 0, total: 0, eco: 0, biz: 0, bags: 'Piece concept to/from US/Canada; weight concept elsewhere', verified: true, rule: 'linear', manualCheck: true, note: 'Singapore Airlines uses a piece concept to/from the US and Canada: Economy/Premium Economy 2 × 23 kg, Business/First/Suites 2 × 32 kg, each up to 158 cm. Other routes use total-weight allowances that depend on cabin and fare; no single piece may exceed 32 kg.' },
    classAllowances: [
      { name: 'Economy', carryOn: '1 bag · 7 kg', checkedBags: '25–30 kg total or 2 bags to/from US/Canada', weightPerBag: '23 kg on US/Canada piece routes', note: 'Weight concept: Lite/Value 25 kg; Standard/Flexi 30 kg.', verified: true },
      { name: 'Premium Economy', carryOn: '1 bag · 7 kg', checkedBags: '35 kg total or 2 bags to/from US/Canada', weightPerBag: '23 kg on US/Canada piece routes', verified: true },
      { name: 'Business', carryOn: '2 bags · 7 kg each', checkedBags: '40 kg total or 2 bags to/from US/Canada', weightPerBag: '32 kg on US/Canada piece routes', verified: true },
      { name: 'First / Suites', carryOn: '2 bags · 7 kg each', checkedBags: '50 kg total or 2 bags to/from US/Canada', weightPerBag: '32 kg on US/Canada piece routes', verified: true },
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
    checked: { kg: 22.68, total: 157.48, eco: 22.68, biz: 22.68, bags: 'Basic/Choice/Choice Preferred paid; Choice Extra includes 2', verified: true, rule: 'linear', note: 'Southwest standard checked bag limit is 62 linear inches (157.48 cm) and 50 lb (22.68 kg). Since April 9, 2026, Basic, Choice and Choice Preferred normally pay for checked bags; Choice Extra includes two.' },
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
    carryOnVariants: [
      { id: 'value', label: 'Value · personal item only', kg: 0, allowed: false, verified: true },
      { id: 'included', label: 'Premium Economy / Spirit First / purchased carry-on', w: 46, h: 56, d: 25, kg: 0, verified: true },
    ],
    personal: { rule: 'dimensions', w: 35, h: 45, d: 20, kg: 0, verified: true },
    checked: { kg: 22.6, total: 158, eco: 22.6, biz: 22.6, bags: 'Value/Premium Economy paid; Spirit First includes 1', verified: true, rule: 'linear', note: 'Spirit standard checked bag: 158 cm total and 50 lb / 22.6 kg. Spirit First includes one checked bag; other travel options can add checked baggage separately.' },
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
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Fare and route dependent', verified: true, rule: 'linear', note: 'TAP checked baggage is limited to 158 cm total. Economy bags are up to 23 kg and Business bags up to 32 kg. Included piece count depends on fare and route.' },
    classAllowances: [
      { name: 'Economy Discount', carryOn: '1 bag · 10 kg + personal item', checkedBags: '0 bags on most routes', weightPerBag: '—', note: 'Luanda/Maputo exceptions can include 1 × 23 kg.', verified: true },
      { name: 'Economy Basic', carryOn: '1 bag · 10 kg + personal item', checkedBags: 'Intercontinental: 1 bag; other routes may have none', weightPerBag: '23 kg', note: 'Luanda/Maputo exceptions can include 2 bags.', verified: true },
      { name: 'Economy Classic', carryOn: '1 bag · 10 kg + personal item', checkedBags: '1 bag', weightPerBag: '23 kg', verified: true },
      { name: 'Economy Plus', carryOn: '1 bag · 10 kg + personal item', checkedBags: '1 bag; 2 on mainland Portugal–islands and some Africa routes', weightPerBag: '23 kg', verified: true },
      { name: 'Economy Prime / Top Prime', carryOn: '1 bag · 10 kg + personal item', checkedBags: 'Intercontinental: 2 bags', weightPerBag: '23 kg', note: 'Prime products are not offered on every route.', verified: true },
      { name: 'Business Executive / Top Executive', carryOn: 'North America: 1 bag · 10 kg; Europe/Africa/South America/domestic: 2 bags · 10 kg each + personal item', checkedBags: '2 bags', weightPerBag: '32 kg', verified: true },
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
    checked: { kg: 23, total: 158, eco: 23, biz: 32, bags: 'Piece count depends on class, fare and sector', verified: true, rule: 'linear', note: 'For travel from 2 Mar 2026 under THAI’s new Piece Concept, every checked bag is limited to 158 cm. Economy/Premium Economy: 23 kg per piece; Royal Silk/Royal First/Premium Economy Plus: 32 kg per piece.' },
    classAllowances: [
      { name: 'Economy Saver / Standard', carryOn: '1 bag · 7 kg', checkedBags: 'International: 1 bag', weightPerBag: '23 kg', note: 'Saver has no checked bag on some destinations; new Piece Concept applies to covered travel from 2 Mar 2026.', verified: true },
      { name: 'Economy Flexi / Full Flex', carryOn: '1 bag · 7 kg', checkedBags: 'International: 2 bags', weightPerBag: '23 kg', verified: true },
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
    checked: { kg: 0, total: 158, eco: 0, biz: 0, bags: 'Piece or kg concept depending on route', verified: true, rule: 'linear', manualCheck: true, note: 'Turkish Airlines uses both piece and kilogram concepts. Every free checked bag must stay within 158 cm. On piece-concept routes Economy uses up to 23 kg per bag and Business up to 32 kg; domestic and other weight-concept allowances vary by fare and route.' },
    classAllowances: [
      { name: 'Economy EcoFly', carryOn: '1 bag · 8 kg', checkedBags: 'Domestic: 15 kg · International: route dependent', weightPerBag: '23 kg max on piece-concept routes', verified: true },
      { name: 'Economy ExtraFly', carryOn: '1 bag · 8 kg', checkedBags: 'Domestic: 20 kg · International: route dependent', weightPerBag: '23 kg max on piece-concept routes', verified: true },
      { name: 'Economy PrimeFly', carryOn: '1 bag · 8 kg', checkedBags: 'Domestic: 25 kg · International: route dependent', weightPerBag: '23 kg max on piece-concept routes', verified: true },
      { name: 'Business', carryOn: '2 bags · 8 kg each', checkedBags: 'Domestic: 30 kg · International: route dependent', weightPerBag: '32 kg max on piece-concept routes', note: 'BusinessFly / BusinessPrime benefits vary by route.', verified: true },
    ],
  },
  {
    name: 'Uzbekistan Airways',
    code: 'HY',
    country: 'Uzbekistan',
    website: 'https://www.uzairways.com',
    baggageUrl: 'https://www.uzairways.com/en/press-center/news/uzbekistan-airways-hand-baggage-regulations',
    carryOn: { w: 35, h: 55, d: 25, kg: 8, verified: true, linearCm: 115 },
    carryOnVariants: [
      { id: 'economy', label: 'Economy · 8 kg', w: 35, h: 55, d: 25, kg: 8, linearCm: 115, verified: true },
      { id: 'business', label: 'Business · 10 kg', w: 35, h: 55, d: 25, kg: 10, linearCm: 115, verified: true },
    ],
    personal: { rule: 'linear', kg: 5, linearCm: 92, verified: true },
    checked: { kg: 0, total: 158, eco: 0, biz: 0, bags: 'Destination and fare dependent', verified: true, rule: 'linear', manualCheck: true, note: 'Uzbekistan Airways standard checked-bag maximum is 158 cm and no accepted piece may exceed 32 kg. Actual free allowance varies by destination and fare: Economy may use 23 kg pieces, while Business fares can use 32 kg pieces.' },
    classAllowances: [
      { name: 'Economy Lite', carryOn: '1 bag · 8 kg', checkedBags: '0 bags', weightPerBag: '—', verified: true },
      { name: 'Economy Smart', carryOn: '1 bag · 8 kg', checkedBags: 'Included', weightPerBag: 'Usually 23 kg', note: 'Allowance varies by destination.', verified: true },
      { name: 'Economy Comfort', carryOn: '1 bag · 8 kg', checkedBags: 'Included', weightPerBag: '23–32 kg depending route', note: 'On selected routes Comfort includes 2 × 23 kg; on many others 1 × 32 kg.', verified: true },
      { name: 'Business Pro', carryOn: 'Cabin baggage up to 10 kg + personal item up to 5 kg', checkedBags: 'Included', weightPerBag: 'Usually 32 kg', note: 'Often 1 × 32 kg; destination rules apply.', verified: true },
      { name: 'Business Elite', carryOn: 'Cabin baggage up to 10 kg + personal item up to 5 kg', checkedBags: 'Included', weightPerBag: 'Usually 2 × 32 kg', note: 'If cabin baggage uses multiple bags, they are treated together under the current 115 cm rule; destination checked-baggage rules apply.', verified: true },
    ],
  },
  {
    name: 'Virgin Atlantic',
    code: 'VS',
    country: 'United Kingdom',
    website: 'https://www.virginatlantic.com',
    baggageUrl: 'https://www.virginatlantic.com/gb/en/travel-information/baggage-allowance.html',
    carryOn: { w: 36, h: 56, d: 23, kg: 10, verified: true },
    carryOnVariants: [
      { id: 'economy-premium', label: 'Economy / Premium · 10 kg', w: 36, h: 56, d: 23, kg: 10, verified: true },
      { id: 'upper', label: 'Upper Class · max 12 kg per bag / 16 kg total', w: 36, h: 56, d: 23, kg: 16, maxSingleKg: 12, weightRule: 'combinedWithPersonal', note: 'Upper Class allows two pieces, no more than 12 kg each and 16 kg combined.', verified: true },
    ],
    personal: { rule: 'unknown', kg: 0, verified: false },
    checked: { w: 75, h: 90, d: 43, kg: 23, total: 208, eco: 23, biz: 32, bags: 'Economy Light 0; Classic/Delight 1; Premium 2; Upper Class 2', verified: true, rule: 'dimensions', note: 'Virgin Atlantic publishes a maximum of 90 × 75 × 43 cm per checked bag. Economy/Premium bags: 23 kg; Upper Class: 32 kg.' },
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
    checked: { kg: 23, total: 140, eco: 23, biz: 32, bags: 'Lite 0; Choice/Flex 1; Business 2 for standard members', verified: true, rule: 'linear', note: 'Virgin Australia checked bags are limited to 140 cm total. Economy Choice/Flex standard allowance is 1 × 23 kg; Business is 2 × 32 kg. Status and partner-operated services can differ.' },
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
    carryOnVariants: [
      { id: 'light', label: 'Fly Light · underseat bag only', kg: 0, allowed: false, note: 'The included 40 × 30 × 20 cm underseat bag is handled as Personal item in this checker.', verified: true },
      { id: 'overhead', label: 'Overhead bag included / purchased · 10 kg', w: 40, h: 55, d: 20, kg: 10, verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 20, kg: 0, verified: true },
    checked: { kg: 0, total: 158, eco: 0, biz: 0, bags: 'Purchased 15 / 20 / 25 / 30 kg options', verified: true, rule: 'linear', manualCheck: true, note: 'Vueling checked bags are limited to 158 cm total. You can book 15, 20, 25 or 30 kg allowances; no single bag may exceed 32 kg. The checker cannot assume which weight option was purchased.' },
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
    carryOnVariants: [
      { id: 'basic', label: 'Basic · underseat bag only', kg: 0, allowed: false, note: 'The free 40 × 30 × 20 cm bag is handled as Personal item in this checker.', verified: true },
      { id: 'priority', label: 'WIZZ Priority / trolley included · 10 kg', w: 40, h: 55, d: 23, kg: 10, verified: true },
    ],
    personal: { rule: 'dimensions', w: 30, h: 40, d: 20, kg: 10, verified: true },
    checked: { w: 119, h: 149, d: 171, kg: 0, total: 439, eco: 0, biz: 0, bags: 'Purchased 10 / 20 / 26 / 32 kg options; up to 6 checked bags', verified: true, rule: 'dimensions', manualCheck: true, note: 'Wizz Air checked baggage may measure up to 149 × 119 × 171 cm. Available weight options are 10, 20, 26 or 32 kg. Basic fare includes no checked baggage; WIZZ Go and WIZZ Plus include checked baggage.' },
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
