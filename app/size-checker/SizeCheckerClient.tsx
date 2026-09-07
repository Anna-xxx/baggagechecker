'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirlineLogo } from '@/components/AirlineLogo';
import { AIRLINES as ALL_AIRLINES, getAirlineBaggage, type PersonalItemRule, type CarryOnVariant } from '@/lib/airlines';

type Limits = { H: number; W: number; D: number; KG: number; maxSingleKg?: number; allowed?: boolean; rule?: PersonalItemRule; checkedRule?: 'linear' | 'dimensions'; linearCm?: number; linearOnly?: boolean; manualCheck?: boolean; note?: string; weightRule?: 'perPiece' | 'combinedWithPersonal' | 'none'; verified?: boolean };
type BagType = 'carryon' | 'personal' | 'checked';
type Airline = { name: string; code: string; limits: Record<BagType, Limits>; carryOnVariants?: CarryOnVariant[] };

type CheckedVariant = {
  id: string;
  label: string;
  rule: 'linear' | 'dimensions';
  kg: number;
  total?: number;
  w?: number;
  h?: number;
  d?: number;
  manualCheck?: boolean;
  note?: string;
};

const CHECKED_VARIANTS: Record<string, CheckedVariant[]> = {
  AI: [
    { id: 'dom-econ-value', label: 'Domestic · Economy Value · 15 kg', rule: 'linear', total: 158, kg: 15 },
    { id: 'dom-econ-classic', label: 'Domestic · Economy Classic · 20 kg', rule: 'linear', total: 158, kg: 20 },
    { id: 'dom-econ-flex', label: 'Domestic · Economy Flex · 25 kg', rule: 'linear', total: 158, kg: 25 },
    { id: 'dom-business', label: 'Domestic · Business · max 32 kg per bag', rule: 'linear', total: 158, kg: 32 },
    { id: 'intl-economy-piece', label: 'International piece route · Economy · 23 kg', rule: 'linear', total: 158, kg: 23 },
    { id: 'intl-business-piece', label: 'International piece route · Business/First · 32 kg', rule: 'linear', total: 158, kg: 32 },
    { id: 'intl-weight', label: 'International weight concept · check ticket', rule: 'linear', total: 158, kg: 0, manualCheck: true, note: 'Air India total checked allowance varies by international route and fare under the weight concept. Use the allowance printed on the ticket.' },
  ],
  EK: [
    { id: 'piece-economy', label: 'Americas/Africa · Economy · 23 kg', rule: 'linear', total: 150, kg: 23 },
    { id: 'piece-business', label: 'Americas/Africa · Business/First · 32 kg', rule: 'linear', total: 150, kg: 32 },
    { id: 'weight-special', label: 'Other routes · Economy Special · 20 kg', rule: 'linear', total: 203, kg: 20 },
    { id: 'weight-saver', label: 'Other routes · Economy Saver · 25 kg', rule: 'linear', total: 203, kg: 25 },
    { id: 'weight-flex', label: 'Other routes · Economy Flex · 30 kg', rule: 'linear', total: 203, kg: 30 },
    { id: 'weight-flexplus', label: 'Other routes · Economy Flex Plus · max 32 kg per bag', rule: 'linear', total: 203, kg: 32 },
    { id: 'weight-premium', label: 'Other routes · Premium/Business/First · max 32 kg per bag', rule: 'linear', total: 203, kg: 32 },
  ],
  '6E': [
    { id: 'domestic', label: 'Domestic · 15 kg allowance', rule: 'linear', total: 158, kg: 15 },
    { id: 'intl-20', label: 'International · 20 kg allowance', rule: 'linear', total: 158, kg: 20 },
    { id: 'intl-25', label: 'International · 25 kg allowance', rule: 'linear', total: 158, kg: 25 },
    { id: 'intl-30', label: 'International · 30 kg allowance', rule: 'linear', total: 158, kg: 30 },
    { id: 'longhaul-32', label: 'Long-haul / premium · max 32 kg per bag', rule: 'linear', total: 158, kg: 32 },
    { id: 'atr', label: 'ATR-operated flight · check aircraft rule', rule: 'linear', total: 158, kg: 0, manualCheck: true, note: 'IndiGo ATR-operated flights can use a separate checked-baggage dimensional rule. Check the operating aircraft and ticket allowance.' },
  ],
  MH: [
    { id: 'weight-value', label: 'Weight concept · Economy Value · 20 kg', rule: 'linear', total: 158, kg: 20 },
    { id: 'weight-basic', label: 'Weight concept · Economy Basic · 25 kg', rule: 'linear', total: 158, kg: 25 },
    { id: 'weight-flex', label: 'Weight concept · Economy Flex · max 32 kg per bag', rule: 'linear', total: 158, kg: 32 },
    { id: 'weight-business', label: 'Weight concept · Business · max 32 kg per bag', rule: 'linear', total: 158, kg: 32 },
    { id: 'piece-economy', label: 'Piece concept · Economy · 23 kg', rule: 'linear', total: 158, kg: 23 },
    { id: 'piece-business', label: 'Piece concept · Business · 32 kg', rule: 'linear', total: 158, kg: 32 },
  ],
  QF: [
    { id: 'dom-economy', label: 'Domestic Australia · Economy · 23 kg', rule: 'linear', total: 140, kg: 23 },
    { id: 'dom-business', label: 'Domestic Australia · Business · 32 kg', rule: 'linear', total: 140, kg: 32 },
    { id: 'americas-economy', label: 'International · Americas · Economy · 32 kg', rule: 'linear', total: 158, kg: 32 },
    { id: 'intl-other-economy', label: 'International · Other routes · Economy · 30 kg', rule: 'linear', total: 158, kg: 30 },
    { id: 'intl-premium', label: 'International · Premium cabin · max 32 kg per bag', rule: 'linear', total: 158, kg: 32 },
  ],
  QR: [
    { id: 'piece-economy', label: 'Africa/Americas · Economy · 23 kg', rule: 'linear', total: 158, kg: 23 },
    { id: 'piece-business', label: 'Africa/Americas · Business/First · 32 kg', rule: 'linear', total: 158, kg: 32 },
    { id: 'other-economy', label: 'Other routes · Economy · choose ticket allowance', rule: 'linear', total: 300, kg: 0, manualCheck: true, note: 'Qatar Economy weight allowance varies by fare. Use the allowance shown on the ticket; no single checked bag may exceed 32 kg.' },
    { id: 'other-premium', label: 'Other routes · Business/First · max 32 kg per bag', rule: 'linear', total: 300, kg: 32 },
  ],
  FR: [
    { id: '10kg', label: '10 kg checked bag', rule: 'dimensions', w: 120, h: 80, d: 120, kg: 10 },
    { id: '20kg', label: '20 kg checked bag', rule: 'dimensions', w: 120, h: 80, d: 120, kg: 20 },
    { id: '23kg', label: '23 kg checked bag', rule: 'dimensions', w: 120, h: 80, d: 120, kg: 23 },
  ],
  SQ: [
    { id: 'us-economy', label: 'US/Canada · Economy/Premium Economy · 23 kg', rule: 'linear', total: 158, kg: 23 },
    { id: 'us-business', label: 'US/Canada · Business/First/Suites · 32 kg', rule: 'linear', total: 158, kg: 32 },
    { id: 'other-econ-lite', label: 'Other routes · Economy Lite/Value · 25 kg', rule: 'linear', total: 158, kg: 25 },
    { id: 'other-econ-standard', label: 'Other routes · Economy Standard/Flexi · 30 kg', rule: 'linear', total: 158, kg: 30 },
    { id: 'other-premium', label: 'Other routes · Premium cabins · max 32 kg per bag', rule: 'linear', total: 158, kg: 32 },
  ],
  TK: [
    { id: 'dom-ecofly', label: 'Domestic · EcoFly · 15 kg', rule: 'linear', total: 158, kg: 15 },
    { id: 'dom-extrafly', label: 'Domestic · ExtraFly · 20 kg', rule: 'linear', total: 158, kg: 20 },
    { id: 'dom-primefly', label: 'Domestic · PrimeFly · 25 kg', rule: 'linear', total: 158, kg: 25 },
    { id: 'dom-business', label: 'Domestic · Business · 30 kg', rule: 'linear', total: 158, kg: 30 },
    { id: 'intl-piece-economy', label: 'International piece concept · Economy · 23 kg', rule: 'linear', total: 158, kg: 23 },
    { id: 'intl-piece-business', label: 'International piece concept · Business · 32 kg', rule: 'linear', total: 158, kg: 32 },
    { id: 'intl-weight', label: 'International weight concept · check ticket', rule: 'linear', total: 158, kg: 0, manualCheck: true, note: 'The total checked allowance depends on route and fare. Use the baggage allowance shown on your ticket.' },
  ],
  VY: [
    { id: '15kg', label: '15 kg checked bag', rule: 'linear', total: 158, kg: 15 },
    { id: '20kg', label: '20 kg checked bag', rule: 'linear', total: 158, kg: 20 },
    { id: '25kg', label: '25 kg checked bag', rule: 'linear', total: 158, kg: 25 },
    { id: '30kg', label: '30 kg checked bag', rule: 'linear', total: 158, kg: 30 },
  ],
  W6: [
    { id: '10kg', label: '10 kg checked bag', rule: 'dimensions', w: 119, h: 149, d: 171, kg: 10 },
    { id: '20kg', label: '20 kg checked bag', rule: 'dimensions', w: 119, h: 149, d: 171, kg: 20 },
    { id: '26kg', label: '26 kg checked bag', rule: 'dimensions', w: 119, h: 149, d: 171, kg: 26 },
    { id: '32kg', label: '32 kg checked bag', rule: 'dimensions', w: 119, h: 149, d: 171, kg: 32 },
  ],
};

const AIRLINES: Airline[] = ALL_AIRLINES.map((a) => {
  const baggage = getAirlineBaggage(a);
  return {
    name: a.name,
    code: a.code,
    carryOnVariants: a.carryOnVariants,
    limits: {
      carryon: {
        H: baggage.carryOn.h,
        W: baggage.carryOn.w,
        D: baggage.carryOn.d,
        KG: baggage.carryOn.kg,
        linearCm: baggage.carryOn.linearCm,
        linearOnly: baggage.carryOn.linearOnly,
        manualCheck: baggage.carryOn.manualCheck,
        note: baggage.carryOn.note,
        weightRule: baggage.carryOn.weightRule,
      },
      personal: {
        H: baggage.personal.h ?? 0,
        W: baggage.personal.w ?? 0,
        D: baggage.personal.d ?? 0,
        KG: baggage.personal.kg,
        rule: baggage.personal.rule,
        linearCm: baggage.personal.linearCm,
        verified: baggage.personal.verified,
      },
      checked: {
        H: baggage.checked.h ?? 0,
        W: baggage.checked.w ?? 0,
        D: baggage.checked.d ?? 0,
        KG: baggage.checked.kg,
        linearCm: baggage.checked.total,
        checkedRule: baggage.checked.rule ?? 'linear',
        manualCheck: baggage.checked.manualCheck,
        note: baggage.checked.note,
        verified: baggage.checked.verified,
      },
    },
  };
});

function websiteFor(code: string): string {
  return ALL_AIRLINES.find((a) => a.code === code)?.website ?? '';
}

const MAX_AIRLINES = 3;

type DimKey = 'W' | 'H' | 'D' | 'KG' | 'KGC';

const TYPE_DEFS: { key: BagType; title: string; hint: string; iconColor: string; tint: string; icon: React.ReactNode }[] = [
  {
    key: 'personal',
    title: 'Personal item',
    hint: 'Small bag under the seat',
    iconColor: '#2563eb',
    tint: '#e7effc',
    icon: (
      <>
        <path d="M7 9a5 5 0 0 1 10 0v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
        <path d="M10 9V7a2 2 0 0 1 4 0v2" />
      </>
    ),
  },
  {
    key: 'carryon',
    title: 'Carry-on',
    hint: 'Cabin bag for the overhead bin',
    iconColor: '#0f766e',
    tint: '#e3f5f2',
    icon: (
      <>
        <rect x="5" y="7" width="14" height="14" rx="2.5" />
        <path d="M9.5 7V4.6A.6.6 0 0 1 10.1 4h3.8a.6.6 0 0 1 .6.6V7" />
      </>
    ),
  },
  {
    key: 'checked',
    title: 'Checked bag',
    hint: 'Handed over at check-in',
    iconColor: '#b98107',
    tint: '#fdf1dc',
    icon: (
      <>
        <rect x="4" y="6" width="16" height="15" rx="2.5" />
        <path d="M9 6V3.6A.6.6 0 0 1 9.6 3h4.8a.6.6 0 0 1 .6.6V6" />
        <path d="M9.6 11v6M14.4 11v6" />
      </>
    ),
  },
];

const STEP1_TITLE: Record<BagType, string> = {
  carryon: 'Enter Your Carry-on Dimensions',
  personal: 'Enter Your Personal Item Dimensions',
  checked: 'Enter Your Checked Bag Dimensions',
};

const BAG_CAPTION: Record<BagType, string> = { carryon: 'carry-on', personal: 'personal item', checked: 'checked bag' };
const FACE_FILL: Record<BagType, string> = { carryon: '#cff5ec', personal: '#e7effc', checked: '#fdf1dc' };
const SIDE_FILL: Record<BagType, string> = { carryon: '#b8efe1', personal: '#d5e3fb', checked: '#f8e3bd' };
const FACE_STROKE: Record<BagType, string> = { carryon: '#5eddc4', personal: '#93b4ef', checked: '#e9b969' };
const INK_COLOR: Record<BagType, string> = { carryon: '#0b5f56', personal: '#1b4694', checked: '#7a5406' };

const HOWTO = [
  { n: '1', bg: '#e0edff', color: '#2563eb', title: 'Measure Your Luggage', text: 'Use a measuring tape to get exact dimensions of your suitcase including handles, wheels, and any protrusions.' },
  { n: '2', bg: '#e3f5f2', color: '#0f766e', title: 'Enter Dimensions', text: 'Input your luggage measurements into our size checker above. Switch between metric and imperial units as needed.' },
  { n: '3', bg: '#dcfce7', color: '#15803d', title: 'Get Results', text: 'Instantly see which airlines accept your luggage size and avoid unexpected fees at the airport.' },
];

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

const VALID_TYPES: BagType[] = ['carryon', 'personal', 'checked'];

export function SizeCheckerClient() {
  const searchParams = useSearchParams();
  const paramType = searchParams.get('type');
  const initialType: BagType = VALID_TYPES.includes(paramType as BagType) ? (paramType as BagType) : 'carryon';
  const paramKg = Number(searchParams.get('kg')) || 0;

  const [metric, setMetric] = useState(searchParams.get('unit') !== 'in');
  const [W, setW] = useState(() => Number(searchParams.get('w')) || 40);
  const [H, setH] = useState(() => Number(searchParams.get('h')) || 55);
  const [D, setD] = useState(() => Number(searchParams.get('d')) || 20);
  const [KG, setKG] = useState(() => (initialType !== 'checked' && paramKg ? paramKg : 10));
  const [KGC, setKGC] = useState(() => (initialType === 'checked' && paramKg ? paramKg : 20));
  const [type, setType] = useState<BagType>(initialType);
  const [sel, setSel] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [checkedVariantByCode, setCheckedVariantByCode] = useState<Record<string, string>>({});
  const [carryOnVariantByCode, setCarryOnVariantByCode] = useState<Record<string, string>>({});

  const weightKey: DimKey = type === 'checked' ? 'KGC' : 'KG';
  const weightMax = type === 'checked' ? 45 : 32;
  const base: Record<DimKey, number> = { W, H, D, KG, KGC };
  const setBase: Record<DimKey, (n: number) => void> = { W: setW, H: setH, D: setD, KG: setKG, KGC: setKGC };

  const toDisp = (v: number, k: DimKey) => (metric ? v : Math.round(k === 'KG' || k === 'KGC' ? v * 2.205 : v / 2.54));
  const toBase = (v: number, k: DimKey) => (metric ? v : k === 'KG' || k === 'KGC' ? v / 2.205 : v * 2.54);
  const lenU = metric ? 'cm' : 'in';
  const wU = metric ? 'kg' : 'lb';

  const FIELD_DEFS: { label: string; key: DimKey; min: number; max: number; iconColor: string; icon: React.ReactNode }[] = [
    { label: 'Width', key: 'W', min: 10, max: 90, iconColor: '#14b8a6', icon: (<><path d="M3 9h18v6H3z" /><path d="M7 9v3M12 9v3M17 9v3" /></>) },
    { label: 'Height', key: 'H', min: 10, max: 100, iconColor: '#ef6a5a', icon: (<><path d="M9 3h6v18H9z" /><path d="M9 7h3M9 12h3M9 17h3" /></>) },
    { label: 'Depth', key: 'D', min: 5, max: 60, iconColor: '#8b5cf6', icon: (<><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 21v-9l8-4.5M12 12L4 7.5" /></>) },
    { label: 'Weight', key: weightKey, min: 1, max: weightMax, iconColor: '#f0a824', icon: (<><path d="M12 4v16M6 20h12" /><path d="M4 9h16l-3 5H7z" /></>) },
  ];

  const handleFieldChange = (def: (typeof FIELD_DEFS)[number]) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value);
    if (Number.isNaN(n)) return;
    setBase[def.key](clamp(Math.round(toBase(n, def.key)), def.min, def.max));
    setChecked(false);
  };

  const boxW = Math.max(80, Math.round(W * 1.9));
  const boxH = Math.max(80, Math.round(H * 1.9));
  const depthW = Math.max(28, Math.round(20 + D * 1.1));
  const faceLabel = `${toDisp(W, 'W')} × ${toDisp(H, 'H')} ${lenU}`;
  const depthValue = toDisp(D, 'D');

  const showHandle = type !== 'personal';
  const showStrap = type === 'personal';
  const showWheels = type !== 'personal';
  const showRibs = type === 'carryon';
  const showPocket = type === 'personal';
  const showStraps = type === 'checked';
  const showCorners = type === 'checked';
  const faceRadius = type === 'personal' ? 16 : 10;

  const chosen = AIRLINES.filter((a) => sel.includes(a.name));

  const selectedCheckedVariant = (code: string) => {
    const id = checkedVariantByCode[code];
    return CHECKED_VARIANTS[code]?.find((v) => v.id === id);
  };

  const selectedCarryOnVariant = (a: Airline) => {
    const id = carryOnVariantByCode[a.code];
    return a.carryOnVariants?.find((v) => v.id === id);
  };

  const carryOnVariantLimits = (a: Airline): Limits => {
    const base = a.limits.carryon;
    const v = selectedCarryOnVariant(a);
    if (!v) return base;
    return {
      ...base,
      H: v.h ?? 0,
      W: v.w ?? 0,
      D: v.d ?? 0,
      KG: v.kg,
      maxSingleKg: v.maxSingleKg,
      allowed: v.allowed ?? true,
      linearCm: v.linearCm,
      linearOnly: v.linearOnly,
      manualCheck: v.manualCheck ?? false,
      note: v.note,
      weightRule: v.weightRule,
      verified: v.verified,
    };
  };

  const checkedVariantLimits = (a: Airline): Limits => {
    const base = a.limits.checked;
    const v = selectedCheckedVariant(a.code);
    if (!v) return base;
    return {
      ...base,
      H: v.h ?? 0,
      W: v.w ?? 0,
      D: v.d ?? 0,
      KG: v.kg,
      linearCm: v.total,
      checkedRule: v.rule,
      manualCheck: v.manualCheck ?? false,
      note: v.note,
    };
  };

  const hasActiveLinearLimit = (L: Limits) => Boolean(L.linearCm && (L.linearOnly || L.W + L.H + L.D > L.linearCm));

  const checksFor = (a: Airline, override?: Limits) => {
    const L = override ?? a.limits[type];

    if (type === 'checked') {
      const weightOk = !L.KG || KGC <= L.KG;
      const weightCheck = {
        key: 'KGC' as DimKey,
        label: 'Weight',
        detail: L.KG ? `${toDisp(L.KG, 'KG')} ${wU}` : 'No published limit',
        mark: weightOk ? '✓' : '✗',
        color: weightOk ? '#15803d' : '#b91c1c',
        over: !weightOk,
        excess: weightOk ? '' : `${toDisp(KGC - L.KG, 'KG')} ${wU} over`,
      };

      if (L.checkedRule === 'dimensions') {
        const dimensionChecks = [
          { key: 'W' as DimKey, label: 'Width', mine: W, max: L.W },
          { key: 'H' as DimKey, label: 'Height', mine: H, max: L.H },
          { key: 'D' as DimKey, label: 'Depth', mine: D, max: L.D },
        ].map((f) => {
          const ok = f.mine <= f.max;
          return {
            key: f.key,
            label: f.label,
            detail: `${toDisp(f.mine, f.key)} ${lenU}`,
            mark: ok ? '✓' : '✗',
            color: ok ? '#15803d' : '#b91c1c',
            over: !ok,
            excess: ok ? '' : `${toDisp(f.mine - f.max, f.key)} ${lenU} over`,
          };
        });
        return [...dimensionChecks, weightCheck];
      }

      const total = W + H + D;
      const maxTotal = L.linearCm ?? 0;
      const sizeOk = total <= maxTotal;
      return [
        {
          key: 'W' as DimKey,
          label: 'Total dimensions',
          detail: `${toDisp(total, 'W')} ${lenU}`,
          mark: sizeOk ? '✓' : '✗',
          color: sizeOk ? '#15803d' : '#b91c1c',
          over: !sizeOk,
          excess: sizeOk ? '' : `${toDisp(total - maxTotal, 'W')} ${lenU} over`,
        },
        weightCheck,
      ];
    }

    if (type === 'carryon' && hasActiveLinearLimit(L)) {
      const total = W + H + D;
      const maxTotal = L.linearCm ?? 0;
      const totalOk = total <= maxTotal;
      const combinedWeight = L.weightRule === 'combinedWithPersonal';
      const singleWeightLimit = combinedWeight && L.maxSingleKg ? L.maxSingleKg : L.KG;
      const weightOk = !singleWeightLimit || KG <= singleWeightLimit;
      const dimensionChecks = L.linearOnly
        ? []
        : [
            { key: 'W' as DimKey, label: 'Width', mine: W, max: L.W },
            { key: 'H' as DimKey, label: 'Height', mine: H, max: L.H },
            { key: 'D' as DimKey, label: 'Depth', mine: D, max: L.D },
          ].map((f) => {
            const ok = f.mine <= f.max;
            return {
              key: f.key,
              label: f.label,
              detail: `${toDisp(f.mine, f.key)} ${lenU}`,
              mark: ok ? '✓' : '✗',
              color: ok ? '#15803d' : '#b91c1c',
              over: !ok,
              excess: ok ? '' : `${toDisp(f.mine - f.max, f.key)} ${lenU} over`,
            };
          });

      return [
        ...dimensionChecks,
        {
          key: 'W' as DimKey,
          label: 'Total dimensions',
          detail: `${toDisp(total, 'W')} ${lenU}`,
          mark: totalOk ? '✓' : '✗',
          color: totalOk ? '#15803d' : '#b91c1c',
          over: !totalOk,
          excess: totalOk ? '' : `${toDisp(total - maxTotal, 'W')} ${lenU} over`,
        },
        {
          key: 'KG' as DimKey,
          label: combinedWeight ? 'Total cabin weight' : 'Weight',
          detail: L.KG
            ? combinedWeight
              ? L.maxSingleKg
                ? `${toDisp(L.maxSingleKg, 'KG')} ${wU} per item · ${toDisp(L.KG, 'KG')} ${wU} total`
                : `${toDisp(L.KG, 'KG')} ${wU} total`
              : `${toDisp(L.KG, 'KG')} ${wU}`
            : 'No published limit',
          mark: weightOk ? (combinedWeight ? '!' : '✓') : '✗',
          color: weightOk ? (combinedWeight ? '#b45309' : '#15803d') : '#b91c1c',
          over: !weightOk,
          manual: combinedWeight && weightOk,
          excess: weightOk ? (combinedWeight ? 'Add other cabin-item weight' : '') : `${toDisp(KG - singleWeightLimit, 'KG')} ${wU} over`,
        },
      ];
    }

    if (type === 'personal' && L.rule === 'either') {
      const dimsOk = W <= L.W && H <= L.H && D <= L.D;
      const total = W + H + D;
      const maxTotal = L.linearCm ?? 0;
      const totalOk = total <= maxTotal;
      const sizeOk = dimsOk || totalOk;
      const weightOk = !L.KG || KG <= L.KG;
      return [
        {
          key: 'W' as DimKey,
          label: 'Size (fixed size or total)',
          detail: `${toDisp(W, 'W')} × ${toDisp(H, 'H')} × ${toDisp(D, 'D')} ${lenU} (max ${L.W} × ${L.H} × ${L.D}) or ${toDisp(total, 'W')} ${lenU} total (max ${toDisp(maxTotal, 'W')})`,
          mark: sizeOk ? '✓' : '✗',
          color: sizeOk ? '#15803d' : '#b91c1c',
          over: !sizeOk,
          excess: sizeOk ? '' : `Exceeds both the fixed dimensions and the ${toDisp(maxTotal, 'W')} ${lenU} total limit`,
        },
        {
          key: 'KG' as DimKey,
          label: 'Weight',
          detail: L.KG ? `${toDisp(L.KG, 'KG')} ${wU}` : 'No published limit',
          mark: weightOk ? '✓' : '✗',
          color: weightOk ? '#15803d' : '#b91c1c',
          over: !weightOk,
          excess: weightOk ? '' : `${toDisp(KG - L.KG, 'KG')} ${wU} over`,
        },
      ];
    }

    if (type === 'personal' && L.rule === 'linear') {
      const total = W + H + D;
      const maxTotal = L.linearCm ?? 0;
      const sizeOk = total <= maxTotal;
      const weightOk = !L.KG || KG <= L.KG;
      return [
        {
          key: 'W' as DimKey,
          label: 'Total dimensions',
          detail: `${toDisp(total, 'W')} ${lenU}`,
          mark: sizeOk ? '✓' : '✗',
          color: sizeOk ? '#15803d' : '#b91c1c',
          over: !sizeOk,
          excess: sizeOk ? '' : `${toDisp(total - maxTotal, 'W')} ${lenU} over`,
        },
        {
          key: 'KG' as DimKey,
          label: 'Weight',
          detail: L.KG ? `${toDisp(L.KG, 'KG')} ${wU}` : 'No published limit',
          mark: weightOk ? '✓' : '✗',
          color: weightOk ? '#15803d' : '#b91c1c',
          over: !weightOk,
          excess: weightOk ? '' : `${toDisp(KG - L.KG, 'KG')} ${wU} over`,
        },
      ];
    }

    const carrySingleWeightLimit = type === 'carryon' && L.weightRule === 'combinedWithPersonal' && L.maxSingleKg ? L.maxSingleKg : L.KG;
    const lim: Record<DimKey, number> = { W: L.W, H: L.H, D: L.D, KG: carrySingleWeightLimit || 999, KGC: L.KG || 999 };
    return [
      { key: 'W' as DimKey, label: 'Width' },
      { key: 'H' as DimKey, label: 'Height' },
      { key: 'D' as DimKey, label: 'Depth' },
      { key: weightKey, label: 'Weight' },
    ].map((f) => {
      const axis: DimKey = f.key === 'KGC' ? 'KG' : f.key;
      const mine = base[f.key];
      const max = lim[f.key];
      const ok = mine <= max;
      const unit = axis === 'KG' ? wU : lenU;
      const d = (v: number) => `${toDisp(v, axis)} ${unit}`;
      const combinedWeight = type === 'carryon' && axis === 'KG' && L.weightRule === 'combinedWithPersonal';
      return {
        key: f.key,
        label: combinedWeight ? 'Total cabin weight' : f.label,
        detail: axis === 'KG'
          ? combinedWeight
            ? L.maxSingleKg
              ? `${d(L.maxSingleKg)} per item · ${d(L.KG)} total`
              : L.KG
                ? `${d(L.KG)} total`
                : 'No published limit'
            : max >= 99
              ? 'No published limit'
              : d(max)
          : d(mine),
        mark: ok ? (combinedWeight ? '!' : '✓') : '✗',
        color: ok ? (combinedWeight ? '#b45309' : '#15803d') : '#b91c1c',
        over: !ok,
        manual: combinedWeight && ok,
        excess: ok ? (combinedWeight ? 'Add other cabin-item weight' : '') : `${d(mine - max)} over`,
      };
    });
  };

  const results = checked
    ? chosen.map((a) => {
        const L = type === 'checked' ? checkedVariantLimits(a) : type === 'carryon' ? carryOnVariantLimits(a) : a.limits[type];
        const requiredVariants = type === 'checked' ? CHECKED_VARIANTS[a.code] : undefined;
        const selectedVariant = type === 'checked' ? selectedCheckedVariant(a.code) : undefined;
        const requiredCarryOnVariants = type === 'carryon' ? a.carryOnVariants : undefined;
        const selectedCarryOn = type === 'carryon' ? selectedCarryOnVariant(a) : undefined;

        if (type === 'checked' && requiredVariants?.length && !selectedVariant) {
          return {
            airline: a,
            checks: [],
            limit: 'Choose route / allowance',
            verdict: 'Check airline',
            color: '#b45309',
            bg: '#fdf8ee',
            showAdvice: true,
            advice: `Choose the route or checked-baggage allowance for ${a.name} above before checking this bag.`,
          };
        }

        if (type === 'carryon' && requiredCarryOnVariants?.length && !selectedCarryOn) {
          return {
            airline: a,
            checks: [],
            limit: 'Choose fare / route / class',
            verdict: 'Check airline',
            color: '#b45309',
            bg: '#fdf8ee',
            showAdvice: true,
            advice: `Choose the fare, route or cabin class for ${a.name} above before checking this bag.`,
          };
        }

        if (type === 'carryon' && selectedCarryOn && L.allowed === false) {
          return {
            airline: a,
            checks: [],
            limit: selectedCarryOn.label,
            verdict: 'Not included',
            color: '#b45309',
            bg: '#fdf8ee',
            showAdvice: true,
            advice: L.note ?? `A standard overhead carry-on bag is not included with this ${a.name} option. Use the Personal item checker for the included underseat bag or add a carry-on if the airline offers that option.`,
          };
        }

        if (type === 'personal' && L.rule && L.rule !== 'dimensions' && L.rule !== 'linear' && L.rule !== 'either') {
          const ruleText =
            L.rule === 'fitUnderSeat'
              ? 'Must fit under the seat'
              : L.rule === 'notSeparate'
                ? 'No separate personal item published'
                : 'No fixed personal-item dimensions published';
          return {
            airline: a,
            checks: [],
            limit: ruleText,
            verdict: 'Check airline',
            color: '#b45309',
            bg: '#fdf8ee',
            showAdvice: true,
            advice: `${a.name} does not publish a fixed three-dimension personal-item limit that this checker can validate automatically. Check the airline rule for your fare before travel.`,
          };
        }

        if (type === 'carryon' && L.manualCheck) {
          return {
            airline: a,
            checks: [],
            limit: L.note ?? 'Carry-on rule varies by route or aircraft',
            verdict: 'Check airline',
            color: '#b45309',
            bg: '#fdf8ee',
            showAdvice: true,
            advice: L.note ?? `${a.name} has route- or aircraft-dependent carry-on rules. Check the operating flight before travel.`,
          };
        }

        if (type === 'checked' && L.manualCheck) {
          return {
            airline: a,
            checks: [],
            limit: L.note ?? 'Checked baggage rule varies by route or fare',
            verdict: 'Check airline',
            color: '#b45309',
            bg: '#fdf8ee',
            showAdvice: true,
            advice: L.note ?? `${a.name} has route- or fare-dependent checked baggage rules. Check your booked itinerary before travel.`,
          };
        }

        const checks = checksFor(a, L);
        const failed = checks.filter((c) => c.over);
        const manualChecks = checks.filter((c) => 'manual' in c && c.manual);
        const needsWeightCheck = failed.length === 0 && manualChecks.length > 0;
        const limit =
          type === 'carryon' && hasActiveLinearLimit(L)
            ? L.linearOnly
              ? `≤ ${L.linearCm} cm total${L.KG ? ` · ${L.KG} kg${L.weightRule === 'combinedWithPersonal' ? ' combined' : ''}` : ''}`
              : `${L.W} × ${L.H} × ${L.D} cm · ≤ ${L.linearCm} cm total${L.KG ? ` · ${L.KG} kg${L.weightRule === 'combinedWithPersonal' ? ' combined' : ''}` : ''}`
            : type === 'personal' && L.rule === 'linear'
              ? `≤ ${L.linearCm} cm total${L.KG ? ` · ${L.KG} kg` : ''}`
              : type === 'personal' && L.rule === 'either'
                ? `${L.H} × ${L.W} × ${L.D} cm or ≤ ${L.linearCm} cm total${L.KG ? ` · ${L.KG} kg` : ''}`
                : type === 'checked'
                ? L.checkedRule === 'dimensions'
                  ? `${L.H} × ${L.W} × ${L.D} cm${L.KG ? ` · ${L.KG} kg` : ''}`
                  : `≤ ${L.linearCm} cm total${L.KG ? ` · ${L.KG} kg` : ''}`
                : `${L.W} × ${L.H} × ${L.D} cm${L.KG ? ` · ${L.KG} kg${L.weightRule === 'combinedWithPersonal' ? ' combined' : ''}` : ''}`;

        return {
          airline: a,
          checks,
          limit,
          verdict: failed.length > 0 ? 'Too large' : needsWeightCheck ? 'Check weight' : 'Fits',
          color: failed.length > 0 ? '#b91c1c' : needsWeightCheck ? '#b45309' : '#15803d',
          bg: failed.length > 0 ? '#fee2e2' : needsWeightCheck ? '#fdf8ee' : '#dcfce7',
          showAdvice: failed.length > 0 || needsWeightCheck,
          advice:
            failed.length > 0
              ? `Over the limit on ${failed.map((c) => c.label.toLowerCase()).join(' and ')}. You would need to check this bag into the hold, or repack into a smaller case.`
              : needsWeightCheck
                ? `${a.name} publishes ${L.KG} kg as a combined cabin-baggage limit. Add the weight of your other cabin items before treating this as a pass.`
                : '',
        };
      })
    : [];

  const fitCount = results.filter((r) => r.verdict === 'Fits').length;
  const tooLargeCount = results.filter((r) => r.verdict === 'Too large').length;
  const notIncludedCount = results.filter((r) => r.verdict === 'Not included').length;
  const manualCount = results.filter((r) => r.verdict === 'Check airline' || r.verdict === 'Check weight').length;
  const allFit = results.length > 0 && fitCount === results.length;
  const noneFit = results.length > 0 && tooLargeCount === results.length;
  const checkedOptionsReady = type !== 'checked' || chosen.every((a) => !CHECKED_VARIANTS[a.code]?.length || Boolean(selectedCheckedVariant(a.code)));
  const carryOnOptionsReady = type !== 'carryon' || chosen.every((a) => !a.carryOnVariants?.length || Boolean(selectedCarryOnVariant(a)));
  const canCheck = sel.length > 0 && checkedOptionsReady && carryOnOptionsReady;

  const toggleAirline = (name: string) => {
    const on = sel.includes(name);
    const code = AIRLINES.find((a) => a.name === name)?.code;
    setSel((prev) => (on ? prev.filter((n) => n !== name) : prev.concat(name)));
    if (on && code) {
      setCheckedVariantByCode((prev) => {
        const next = { ...prev };
        delete next[code];
        return next;
      });
      setCarryOnVariantByCode((prev) => {
        const next = { ...prev };
        delete next[code];
        return next;
      });
    }
    setQuery('');
    setChecked(false);
  };

  const removeAirline = (name: string) => {
    const code = AIRLINES.find((a) => a.name === name)?.code;
    setSel((prev) => prev.filter((n) => n !== name));
    if (code) {
      setCheckedVariantByCode((prev) => {
        const next = { ...prev };
        delete next[code];
        return next;
      });
      setCarryOnVariantByCode((prev) => {
        const next = { ...prev };
        delete next[code];
        return next;
      });
    }
    setChecked(false);
  };

  const formatLimit = (L: Limits) => {
    if (type === 'checked') {
      if (L.manualCheck && !L.linearCm && !L.W && !L.H && !L.D) return 'Route / fare dependent';
      if (L.checkedRule === 'dimensions') return `${L.H} × ${L.W} × ${L.D} cm${L.KG ? ` · ${L.KG} kg` : ''}`;
      if (L.linearCm) return `≤ ${L.linearCm} cm total${L.KG ? ` · ${L.KG} kg` : ''}`;
      return 'Route / fare dependent';
    }
    if (type === 'carryon' && hasActiveLinearLimit(L)) {
      return L.linearOnly ? `≤ ${L.linearCm} cm total` : `${L.W} × ${L.H} × ${L.D} cm · ≤ ${L.linearCm} cm total`;
    }
    if (type === 'personal') {
      if (L.rule === 'linear') return `≤ ${L.linearCm} cm total`;
      if (L.rule === 'fitUnderSeat') return 'Must fit under seat';
      if (L.rule === 'notSeparate') return 'No separate item';
      if (L.rule === 'unknown') return 'No fixed size published';
    }
    return `${L.W} × ${L.H} × ${L.D} cm`;
  };

  const q = query.trim().toLowerCase();
  const options = AIRLINES.filter((a) => !q || a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q)).slice(0, 40);
  const noMatches = q.length > 0 && options.length === 0;
  const showList = open && sel.length < MAX_AIRLINES;

  const summaryLabel = allFit
    ? results.length === 1
      ? 'Your bag fits this airline'
      : `Your bag fits all ${results.length} airlines`
    : noneFit
      ? results.length === 1
        ? 'Your bag is too large for this airline'
        : `Your bag is too large for all ${results.length} airlines`
      : manualCount || notIncludedCount
        ? [fitCount ? `${fitCount} fit` : '', tooLargeCount ? `${tooLargeCount} too large` : '', notIncludedCount ? `${notIncludedCount} not included` : '', manualCount ? `${manualCount} need a rule/weight check` : ''].filter(Boolean).join(' · ')
        : `Your bag fits ${fitCount} of ${results.length} airlines`;
  const summaryMark = allFit ? '✓' : noneFit ? '✗' : '!';
  const summaryColor = allFit ? '#15803d' : noneFit ? '#b91c1c' : '#b45309';
  const summaryBg = allFit ? '#e6f6ee' : noneFit ? '#fdecec' : '#fdf8ee';
  const summaryBorder = allFit ? '#c6ead4' : noneFit ? '#f6d5d5' : '#f3ebdb';
  const bagLabel = `Your bag: ${toDisp(W, 'W')} × ${toDisp(H, 'H')} × ${toDisp(D, 'D')} ${lenU}, ${toDisp(type === 'checked' ? KGC : KG, 'KG')} ${wU}`;

  const submit = () => {
    if (canCheck) setChecked(true);
  };

  return (
    <div style={{ width: '100%', background: '#f7f8f9' }}>
      <Header />

      <main id="top" style={{ maxWidth: 1340, margin: '0 auto', padding: '34px 24px 8px' }}>
        <a href="#top" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 600, color: '#0f1c2e', textDecoration: 'none' }}>
          <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M11 6l-6 6 6 6" />
          </svg>
          Back
        </a>
        <h1 style={{ margin: '22px 0 12px', fontSize: 'clamp(26px,3.6vw,34px)', fontWeight: 800, letterSpacing: '-.03em' }}>Luggage Size Checker</h1>
        <p style={{ margin: '0 0 26px', maxWidth: 640, fontSize: 14, lineHeight: 1.75, color: '#57677c' }}>Enter your bag once, pick the airlines you are flying with, and see whether it passes as a carry-on, a personal item or checked baggage.</p>

        {/* Step 1: dimensions + type toggle */}
        <section id="checker" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 26 }}>
          <div style={{ border: '1px solid #f0f2f5', borderRadius: 12, padding: 'clamp(18px,2.5vw,26px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 22 }}>
              <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>
                <span style={{ flex: 'none', display: 'flex', width: 24, height: 24, borderRadius: '50%', background: '#e3f5f2', color: '#0f766e', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>1</span>
                {STEP1_TITLE[type]}
              </h2>
              <button
                onClick={() => setMetric((m) => !m)}
                className="btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 10, padding: '9px 14px', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#0f1c2e', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 16.5L16.5 4l3.5 3.5L7.5 20z" />
                  <path d="M9 7l2 2M12.5 10.5l2 2" />
                </svg>
                {metric ? 'cm/kg' : 'in/lb'}
              </button>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#57677c', marginBottom: 10 }}>What are you checking?</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {TYPE_DEFS.map((t) => {
                  const on = type === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => {
                        setType(t.key);
                        setChecked(false);
                      }}
                      style={{ flex: '1 1 190px', display: 'flex', alignItems: 'flex-start', gap: 11, border: `1px solid ${on ? '#14b8a6' : '#e4eaf1'}`, background: on ? '#f4faf9' : '#fff', borderRadius: 11, padding: '13px 15px', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }}
                    >
                      <span style={{ flex: 'none', display: 'flex', width: 30, height: 30, borderRadius: 9, background: t.tint, alignItems: 'center', justifyContent: 'center' }}>
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.iconColor} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                          {t.icon}
                        </svg>
                      </span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: 13.5, fontWeight: 800, color: on ? '#0f766e' : '#0f1c2e' }}>{t.title}</span>
                        <span style={{ display: 'block', marginTop: 3, fontSize: 11.5, lineHeight: 1.5, color: '#8494a8' }}>{t.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="range-mint" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '22px 40px' }}>
              {FIELD_DEFS.map((def) => {
                const value = toDisp(base[def.key], def.key);
                return (
                  <div key={def.key}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={def.iconColor} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                          {def.icon}
                        </svg>
                        {def.label}
                      </span>
                      <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b7c1cd" strokeWidth={1.8} strokeLinecap="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 11v5M12 8h.01" />
                      </svg>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <input type="range" min={toDisp(def.min, def.key)} max={toDisp(def.max, def.key)} value={value} onChange={handleFieldChange(def)} style={{ flex: 1, minWidth: 0 }} />
                      <input
                        type="number"
                        value={value}
                        onChange={handleFieldChange(def)}
                        style={{ flex: 'none', width: 78, border: '1px solid #e4eaf1', borderRadius: 9, padding: 10, textAlign: 'center', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#0f1c2e', background: '#fff', fontVariantNumeric: 'tabular-nums' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 26, background: '#f8fafc', borderRadius: 12, padding: '20px 22px 26px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Visual Representation</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, flexWrap: 'wrap', minHeight: 170 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <div style={{ position: 'relative', width: boxW, height: boxH }}>
                    {showHandle && (
                      <div style={{ position: 'absolute', left: '50%', top: -15, transform: 'translateX(-50%)', width: '34%', height: 18, border: '3px solid #94a3b8', borderBottom: 'none', borderRadius: '9px 9px 0 0' }} />
                    )}
                    {showStrap && (
                      <div style={{ position: 'absolute', left: '50%', top: -16, transform: 'translateX(-50%)', width: '52%', height: 20, border: '3px solid #94a3b8', borderBottom: 'none', borderRadius: '999px 999px 0 0' }} />
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: FACE_FILL[type], border: `2px solid ${FACE_STROKE[type]}`, borderRadius: faceRadius, overflow: 'hidden' }}>
                      {showRibs && (
                        <>
                          <div style={{ position: 'absolute', left: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />
                          <div style={{ position: 'absolute', right: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />
                        </>
                      )}
                      {showPocket && <div style={{ position: 'absolute', left: '16%', right: '16%', bottom: '12%', height: '26%', border: '2px solid rgba(15,28,46,.14)', borderRadius: 8 }} />}
                      {showStraps && (
                        <>
                          <div style={{ position: 'absolute', left: 0, right: 0, top: '22%', height: 7, background: 'rgba(185,129,7,.35)' }} />
                          <div style={{ position: 'absolute', left: 0, right: 0, bottom: '22%', height: 7, background: 'rgba(185,129,7,.35)' }} />
                        </>
                      )}
                      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 12, fontWeight: 700, color: INK_COLOR[type], textAlign: 'center', lineHeight: 1.35, whiteSpace: 'nowrap' }}>
                        {faceLabel}
                      </div>
                    </div>
                    {showWheels && (
                      <>
                        <div style={{ position: 'absolute', left: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                        <div style={{ position: 'absolute', right: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                      </>
                    )}
                    {showCorners && (
                      <>
                        <div style={{ position: 'absolute', left: -1, bottom: -1, width: 16, height: 16, borderLeft: '4px solid #b98107', borderBottom: '4px solid #b98107', borderRadius: '0 0 0 10px' }} />
                        <div style={{ position: 'absolute', right: -1, bottom: -1, width: 16, height: 16, borderRight: '4px solid #b98107', borderBottom: '4px solid #b98107', borderRadius: '0 0 10px 0' }} />
                      </>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{BAG_CAPTION[type]}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <div style={{ position: 'relative', width: depthW, height: boxH }}>
                    {showHandle && <div style={{ position: 'absolute', left: '50%', top: -15, transform: 'translateX(-50%)', width: 4, height: 18, borderRadius: 2, background: '#94a3b8' }} />}
                    <div style={{ position: 'absolute', inset: 0, background: SIDE_FILL[type], border: `2px solid ${FACE_STROKE[type]}`, borderRadius: faceRadius }} />
                    {showWheels && (
                      <>
                        <div style={{ position: 'absolute', left: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                        <div style={{ position: 'absolute', right: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
                      </>
                    )}
                    <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 12, fontWeight: 700, color: INK_COLOR[type], whiteSpace: 'nowrap' }}>{depthValue}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#8494a8', fontWeight: 600 }}>depth</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: choose airlines */}
        <section id="airlines" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>
              <span style={{ flex: 'none', display: 'flex', width: 24, height: 24, borderRadius: '50%', background: '#e3f5f2', color: '#0f766e', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>2</span>
              Choose Your Airlines
            </h2>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: sel.length ? '#0f766e' : '#8494a8' }}>
              {sel.length} of {MAX_AIRLINES} selected
            </span>
          </div>
          <p style={{ margin: '0 0 16px 34px', fontSize: 13, color: '#7a8798' }}>Pick up to three airlines to compare your bag against.</p>

          {chosen.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 14 }}>
              {chosen.map((a) => (
                <span key={a.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#e3f5f2', border: '1px solid #14b8a6', color: '#0f766e', borderRadius: 999, padding: '6px 12px 6px 7px', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  <AirlineLogo code={a.code} website={websiteFor(a.code)} width={30} height={22} radius={6} fontSize={9} />
                  {a.name}
                  <button onClick={() => removeAirline(a.name)} style={{ border: 'none', background: 'none', padding: 0, lineHeight: 0, cursor: 'pointer', color: '#0f766e' }}>
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          {(() => {
            const pickers =
              type === 'carryon'
                ? chosen
                    .filter((a) => a.carryOnVariants?.length)
                    .map((a) => ({
                      code: a.code,
                      name: a.name,
                      axis: 'Fare / route / class',
                      options: (a.carryOnVariants ?? []).map((v) => ({ id: v.id, label: v.label, selected: carryOnVariantByCode[a.code] === v.id })),
                    }))
                : type === 'checked'
                ? chosen
                    .filter((a) => CHECKED_VARIANTS[a.code]?.length)
                    .map((a) => ({
                      code: a.code,
                      name: a.name,
                      axis: 'Route / allowance',
                      options: (CHECKED_VARIANTS[a.code] ?? []).map((v) => ({ id: v.id, label: v.label, selected: checkedVariantByCode[a.code] === v.id })),
                    }))
                : [];

            if (pickers.length === 0) return null;

            return (
              <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
                {pickers.map((p) => (
                  <div key={p.code} style={{ border: '1px solid #edf0f3', borderRadius: 11, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700 }}>{p.name}</span>
                    <span style={{ fontSize: 11.5, color: '#57677c' }}>{p.axis}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginLeft: 'auto' }}>
                      {p.options.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => {
                            if (type === 'carryon') {
                              setCarryOnVariantByCode((prev) => ({ ...prev, [p.code]: v.id }));
                            } else {
                              setCheckedVariantByCode((prev) => ({ ...prev, [p.code]: v.id }));
                            }
                            setChecked(false);
                          }}
                          style={{
                            border: `1px solid ${v.selected ? '#0f766e' : '#e4eaf1'}`,
                            background: v.selected ? '#0f766e' : '#fff',
                            color: v.selected ? '#fff' : '#57677c',
                            borderRadius: 999,
                            padding: '6px 13px',
                            fontFamily: 'inherit',
                            fontSize: 11.5,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${open ? '#14b8a6' : '#e4eaf1'}`, borderRadius: 10, padding: '11px 14px', background: '#fff' }}>
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a9b4c2" strokeWidth={2} strokeLinecap="round">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l5 5" />
              </svg>
              <input
                placeholder={sel.length >= MAX_AIRLINES ? `Maximum of ${MAX_AIRLINES} airlines selected` : `Search ${AIRLINES.length} airlines by name or code`}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                disabled={sel.length >= MAX_AIRLINES}
                style={{ flex: 1, minWidth: 0, border: 'none', fontFamily: 'inherit', fontSize: 13.5, color: '#0f1c2e', background: 'transparent' }}
              />
              {query.length > 0 && (
                <button onClick={() => setQuery('')} style={{ border: 'none', background: 'none', padding: 0, lineHeight: 0, cursor: 'pointer', color: '#a9b4c2' }}>
                  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              )}
            </div>

            {showList && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 6px)', zIndex: 20, maxHeight: 280, overflowY: 'auto', background: '#fff', border: '1px solid #e4eaf1', borderRadius: 12, boxShadow: '0 16px 32px -18px rgba(15,28,46,.35)' }}>
                {options.map((a) => {
                  const on = sel.includes(a.name);
                  const L = a.limits[type];
                  return (
                    <button
                      key={a.name}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => toggleAirline(a.name)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, border: 'none', borderBottom: '1px solid #f4f6f8', background: on ? '#f4faf9' : '#fff', padding: '11px 14px', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }}
                    >
                      <AirlineLogo code={a.code} website={websiteFor(a.code)} width={32} height={24} radius={6} fontSize={9} />
                      <span style={{ flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: 700, color: '#0f1c2e' }}>{a.name}</span>
                      <span style={{ fontSize: 11.5, color: '#8494a8', whiteSpace: 'nowrap' }}>
                        {type === 'carryon' && a.carryOnVariants?.length ? 'Fare / route / class dependent' : formatLimit(L)}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#14b8a6', width: 12, textAlign: 'center' }}>{on ? '✓' : ''}</span>
                    </button>
                  );
                })}
                {noMatches && <div style={{ padding: 16, fontSize: 13, color: '#8494a8' }}>No airlines match that search.</div>}
              </div>
            )}
          </div>

          <button
            onClick={submit}
            disabled={!canCheck}
            style={{ width: '100%', marginTop: 22, padding: 15, border: 'none', borderRadius: 10, background: canCheck ? '#fbbf47' : '#eef2f7', color: canCheck ? '#3a2a05' : '#a9b4c2', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: canCheck ? 'pointer' : 'not-allowed' }}
          >
            {canCheck ? 'Check my bag' : sel.length === 0 ? 'Select an airline first' : type === 'carryon' ? 'Choose fare / route / class' : 'Choose route / allowance'}
          </button>
        </section>

        {/* Step 3: result */}
        <section id="result" style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 24, marginBottom: 26 }}>
          <h2 style={{ margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 800, letterSpacing: '-.02em' }}>
            <span style={{ flex: 'none', display: 'flex', width: 24, height: 24, borderRadius: '50%', background: '#e3f5f2', color: '#0f766e', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>3</span>
            Your Result
          </h2>

          {results.length > 0 ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: summaryBg, border: `1px solid ${summaryBorder}`, borderRadius: 11, padding: '15px 18px', marginBottom: 16 }}>
                <span style={{ flex: 'none', display: 'flex', width: 30, height: 30, borderRadius: '50%', background: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: summaryColor }}>{summaryMark}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: summaryColor }}>{summaryLabel}</span>
                <span style={{ fontSize: 12.5, color: '#57677c', marginLeft: 'auto' }}>{bagLabel}</span>
              </div>

              <div style={{ display: 'grid', gap: 14 }}>
                {results.map((r) => (
                  <div key={r.airline.name} style={{ border: '1px solid #edf0f3', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', background: '#f8fafc', padding: '13px 16px' }}>
                      <AirlineLogo code={r.airline.code} website={websiteFor(r.airline.code)} width={34} height={26} radius={7} fontSize={10} />
                      <span style={{ fontSize: 14, fontWeight: 800 }}>{r.airline.name}</span>
                      <span style={{ fontSize: 12, color: '#7a8798' }}>{r.limit}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 800, color: r.color, background: r.bg, borderRadius: 999, padding: '6px 13px', whiteSpace: 'nowrap' }}>{r.verdict}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,150px),1fr))' }}>
                      {r.checks.map((c) => (
                        <div key={c.key} style={{ padding: '13px 16px', borderTop: '1px solid #f0f2f5', borderRight: '1px solid #f0f2f5' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: '#8494a8', marginBottom: 5 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: c.color }}>{c.mark}</span>
                            {c.label}
                          </div>
                          {c.detail && <div style={{ fontSize: 12.5, fontWeight: 700, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{c.detail}</div>}
                          {c.over && <div style={{ fontSize: 11, fontWeight: 700, color: '#b91c1c', marginTop: 3, whiteSpace: 'nowrap' }}>{c.excess}</div>}
                        </div>
                      ))}
                    </div>
                    {r.showAdvice && <p style={{ margin: 0, padding: '13px 16px', borderTop: '1px solid #f0f2f5', fontSize: 12, lineHeight: 1.65, color: '#57677c' }}>{r.advice}</p>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '44px 24px', textAlign: 'center' }}>
              <span style={{ display: 'inline-flex', width: 48, height: 48, borderRadius: 14, background: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a9b4c2" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 13l20-7-7 20-3-8z" />
                </svg>
              </span>
              <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 800, letterSpacing: '-.02em' }}>{canCheck ? 'Ready to check' : 'No airlines selected yet'}</h3>
              <p style={{ margin: '0 auto', maxWidth: 430, fontSize: 13, lineHeight: 1.7, color: '#8494a8' }}>
                {canCheck ? 'Press "Check my bag" above to compare your dimensions with the airlines you picked.' : 'Pick one to three airlines in step 2 to see whether your bag fits their cabin allowance.'}
              </p>
            </div>
          )}
        </section>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 0px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 36, alignItems: 'start' }}>
            <div>
              <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(21px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em', lineHeight: 1.22 }}>Why Airlines Have Different Luggage Rules</h2>
              <p style={{ margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.8, color: '#57677c' }}>
                Each airline sets its own baggage restrictions based on aircraft type, business model, and operational efficiency. Low-cost carriers often have stricter size limits to maximize revenue and streamline boarding.
              </p>
              <p style={{ margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.8, color: '#57677c' }}>
                Overhead compartment sizes vary between aircraft models, and airlines must ensure all passengers&apos; bags fit safely. Weight restrictions help manage fuel costs and aircraft balance.
              </p>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.8, color: '#57677c' }}>
                Using our <a href="#checker">luggage size checker</a> before you travel helps you avoid unexpected fees and delays at check-in.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14 }}>
              {[
                { color: '#2563eb', title: 'Aircraft Limits', text: 'Overhead space varies by plane model', icon: <path d="M2 13l20-7-7 20-3-8z" /> },
                { color: '#15803d', title: 'Passenger Safety', text: 'Weight limits ensure safe operations', icon: (<><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><path d="M16 6.5a3 3 0 0 1 0 5.6M18 20c0-2.4-1-4.2-2.6-5.2" /></>) },
                { color: '#e0a11a', title: 'Boarding Speed', text: 'Standard sizes speed up the process', icon: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2.2" /></>) },
                { color: '#7c3aed', title: 'Business Model', text: 'Fees help keep base fares low', icon: <path d="M12 3l7 3v5.5c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5V6z" /> },
              ].map((card) => (
                <div key={card.title} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '20px 16px', textAlign: 'center' }}>
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10 }}>
                    {card.icon}
                  </svg>
                  <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 5 }}>{card.title}</div>
                  <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: '#7a8798' }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="types" style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 0px 0' }}>
          <h2 style={{ margin: '0 0 8px', textAlign: 'center', fontSize: 'clamp(21px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em' }}>The Three Baggage Types, Explained</h2>
          <p style={{ margin: '0 0 28px', textAlign: 'center', maxWidth: 620, marginLeft: 'auto', marginRight: 'auto', fontSize: 13, lineHeight: 1.7, color: '#57677c' }}>
            Airlines split what you travel with into three allowances. Each has its own size and weight limit, and the one you exceed decides what you pay.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {[
              {
                tint: '#e7effc',
                iconColor: '#2563eb',
                title: 'Personal item',
                text: 'The small bag that goes under the seat in front of you — handbag, laptop bag or small backpack. Usually free and rarely weighed.',
                icon: (
                  <>
                    <path d="M7 9a5 5 0 0 1 10 0v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
                    <path d="M10 9V7a2 2 0 0 1 4 0v2" />
                  </>
                ),
              },
              {
                tint: '#e3f5f2',
                iconColor: '#0f766e',
                title: 'Carry-on',
                text: 'The wheeled case you take into the cabin and store in the overhead bin. Sized at the gate, and weighed by many airlines.',
                icon: (
                  <>
                    <rect x="5" y="7" width="14" height="14" rx="2.5" />
                    <path d="M9.5 7V4.6A.6.6 0 0 1 10.1 4h3.8a.6.6 0 0 1 .6.6V7" />
                  </>
                ),
              },
              {
                tint: '#fdf1dc',
                iconColor: '#b98107',
                title: 'Checked baggage',
                text: 'The large suitcase you hand over at the desk and collect at your destination. Charged by bag, with strict weight limits.',
                icon: (
                  <>
                    <rect x="4" y="6" width="16" height="15" rx="2.5" />
                    <path d="M9 6V3.6A.6.6 0 0 1 9.6 3h4.8a.6.6 0 0 1 .6.6V6" />
                    <path d="M9.6 11v6M14.4 11v6" />
                  </>
                ),
              },
            ].map((card) => (
              <div key={card.title} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: 22 }}>
                <div style={{ marginBottom: 14, borderRadius: 10, overflow: 'hidden', background: '#f8fafc', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg aria-hidden="true" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke={card.iconColor} strokeOpacity={0.35} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    {card.icon}
                  </svg>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ flex: 'none', display: 'flex', width: 32, height: 32, borderRadius: 9, background: card.tint, alignItems: 'center', justifyContent: 'center' }}>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={card.iconColor} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                      {card.icon}
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 5 }}>{card.title}</div>
                    <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#7a8798' }}>{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 0px 0' }}>
          <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '26px 28px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h2 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 800, letterSpacing: '-.02em' }}>Looking for the full list of airline limits?</h2>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#57677c' }}>The Luggage Guide reference lists carry-on, personal item and checked baggage limits for every airline we cover, plus airport sizer frames and baggage fees.</p>
            </div>
            <Link
              href="/luggage-guide"
              className="btn-outline"
              style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, border: '1px solid #e4eaf1', background: '#fff', borderRadius: 10, padding: '12px 18px', fontSize: 13, fontWeight: 700, color: '#0f1c2e', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Browse all airline limits
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </section>

        <section id="howto" style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 0px 0' }}>
          <h2 style={{ margin: '0 0 28px', textAlign: 'center', fontSize: 'clamp(21px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em' }}>How to Use Our Carry-On Size Checker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20 }}>
            {HOWTO.map((h) => (
              <div key={h.n} style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '28px 22px', textAlign: 'center' }}>
                <span style={{ display: 'inline-flex', width: 36, height: 36, borderRadius: '50%', alignItems: 'center', justifyContent: 'center', background: h.bg, color: h.color, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>{h.n}</span>
                <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 10 }}>{h.title}</div>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: '#7a8798' }}>{h.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 0px 0' }}>
          <h2 style={{ margin: '0 0 28px', textAlign: 'center', fontSize: 'clamp(21px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em' }}>Pro Tips for Checking Suitcase Size Online</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '26px 26px 28px' }}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 14 }}>
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12.5l2.7 2.5L16 9.5" />
              </svg>
              <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 12 }}>What to Include</div>
              <div style={{ display: 'grid', gap: 9, fontSize: 12.5, color: '#57677c' }}>
                <span>All handles and straps</span>
                <span>Wheels and feet</span>
                <span>External pockets when packed</span>
                <span>Any expandable sections</span>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #edf0f3', borderRadius: 14, padding: '26px 26px 28px' }}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e0a11a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 14 }}>
                <path d="M12 4l9 16H3z" />
                <path d="M12 10v4M12 17h.01" />
              </svg>
              <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 12 }}>Common Mistakes</div>
              <div style={{ display: 'grid', gap: 9, fontSize: 12.5, color: '#57677c' }}>
                <span>Measuring empty bags only</span>
                <span>Forgetting about wheels</span>
                <span>Using wrong measurement units</span>
                <span>Not checking weight limits</span>
              </div>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(44px,6vw,72px) 0px clamp(48px,6vw,72px)' }}>
          <div style={{ borderRadius: 18, background: '#fdf8ee', border: '1px solid #f3ebdb', padding: 'clamp(32px,5vw,50px) 28px', textAlign: 'center', color: '#0f1c2e' }}>
            <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(20px,2.6vw,26px)', fontWeight: 800, letterSpacing: '-.025em' }}>Ready to Check Your Luggage Size?</h2>
            <p style={{ margin: '0 auto 24px', maxWidth: 620, fontSize: 14, lineHeight: 1.7, color: '#57677c' }}>Use our free luggage size checker above to ensure your bags meet airline requirements and travel with confidence.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              {['Free to Use', 'All Major Airlines', 'Instant Results'].map((label) => (
                <span key={label} style={{ background: '#fff', border: '1px solid #f0e2c0', color: '#8a5a06', borderRadius: 999, padding: '9px 17px', fontSize: 12.5, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer maxWidth={1340} logoSize={32} logoIconSize={15} copyrightSize={13} />
    </div>
  );
}
