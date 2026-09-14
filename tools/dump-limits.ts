import { AIRLINES, getAirlineBaggage } from '../lib/airlines.ts';
// The checker's handoff pre-picks the first seven carriers; those are the ones the
// property tests can see without driving the picker.
const first7 = AIRLINES.slice(0, 7).map((a) => {
  const variants = a.carryOnVariants ?? [];
  const v = variants.find((x) => x.allowed !== false);
  const c = getAirlineBaggage(a).carryOn;
  return {
    name: a.name,
    code: a.code,
    // What the checker will compare against by default.
    limit: v && v.w && v.h && v.d ? { w: v.w, h: v.h, d: v.d, kg: v.kg } : { w: c.w, h: c.h, d: c.d, kg: c.kg },
    linearOnly: Boolean(v?.linearOnly ?? c.linearOnly),
    linearCm: v?.linearCm ?? c.linearCm ?? null,
    manualCheck: Boolean(v?.manualCheck),
    variantCount: variants.length,
  };
});
console.log(JSON.stringify(first7, null, 1));
