// Checks the baggage data against itself: not "does the site render", but "can these
// numbers all be true at once". Run with: node --experimental-strip-types test-data.ts
import { AIRLINES, airlineSlug, getAirlineBaggage } from '../lib/airlines.ts';

const fail: string[] = [];
const warn: string[] = [];
const note = (list: string[], airline: string, msg: string) => list.push(`${airline}: ${msg}`);

const slugs = new Map<string, string>();
const codes = new Map<string, string>();

for (const a of AIRLINES) {
  const b = getAirlineBaggage(a);

  // --- identity -------------------------------------------------------------
  const slug = airlineSlug(a.name);
  if (slugs.has(slug)) note(fail, a.name, `slug "${slug}" collides with ${slugs.get(slug)}`);
  slugs.set(slug, a.name);
  if (codes.has(a.code)) note(fail, a.name, `IATA code ${a.code} also used by ${codes.get(a.code)}`);
  codes.set(a.code, a.name);
  if (!/^https?:\/\//.test(a.website)) note(fail, a.name, `website is not a URL: ${a.website}`);
  if (a.baggageUrl && !/^https?:\/\//.test(a.baggageUrl)) note(fail, a.name, `baggageUrl is not a URL`);

  // --- carry-on -------------------------------------------------------------
  const c = b.carryOn;
  for (const [k, v] of Object.entries({ w: c.w, h: c.h, d: c.d })) {
    if (!Number.isFinite(v) || v <= 0) note(fail, a.name, `carry-on ${k} is ${v}`);
    if (v > 100) note(warn, a.name, `carry-on ${k} = ${v} cm looks too large for a cabin bag`);
  }
  if (c.kg && (c.kg < 3 || c.kg > 32)) note(warn, a.name, `carry-on weight ${c.kg} kg is outside 3-32`);
  if (c.h < c.w) note(warn, a.name, `carry-on height ${c.h} < width ${c.w} — axes may be swapped`);
  if (c.d > c.w) note(warn, a.name, `carry-on depth ${c.d} > width ${c.w} — axes may be swapped`);

  // A published linear limit that the carrier's own three sides already exceed is a
  // contradiction in their policy; we keep both numbers but it must be deliberate.
  if (c.linearCm && !c.linearOnly && c.w + c.h + c.d > c.linearCm) {
    note(warn, a.name, `carry-on ${c.w}+${c.h}+${c.d} = ${c.w + c.h + c.d} cm exceeds its own ${c.linearCm} cm total`);
  }
  if (c.linearOnly && !c.linearCm) note(fail, a.name, 'carry-on marked linearOnly but has no linearCm');

  // --- personal item --------------------------------------------------------
  const p = b.personal;
  if (p.rule === 'dimensions' || p.rule === 'either') {
    if (!p.w || !p.h || !p.d) note(fail, a.name, `personal item rule "${p.rule}" needs w/h/d`);
    else {
      const pv = p.w * p.h * p.d;
      const cv = c.w * c.h * c.d;
      if (pv > cv) note(fail, a.name, `personal item (${pv} cm³) is larger than the carry-on (${cv} cm³)`);
    }
  }
  if ((p.rule === 'linear' || p.rule === 'either') && !p.linearCm) {
    note(fail, a.name, `personal item rule "${p.rule}" needs linearCm`);
  }

  // --- checked --------------------------------------------------------------
  const ch = b.checked;
  // A linear rule with no total is how "route-dependent, no single number" is encoded;
  // it is only a contradiction when the page claims to know the answer.
  if (ch.rule === 'linear' && !ch.total && !ch.manualCheck) note(fail, a.name, 'checked rule "linear" needs a total');
  if (ch.rule === 'dimensions' && !(ch.w && ch.h && ch.d)) note(fail, a.name, 'checked rule "dimensions" needs w/h/d');
  // Only a published linear limit is range-checked. Under a dimensions rule the total is
  // just the sum of the carrier's three sides and can legitimately be large.
  if (ch.rule === 'linear' && ch.total && (ch.total < 100 || ch.total > 350)) note(warn, a.name, `checked total ${ch.total} cm is outside 100-350`);
  if (ch.rule === 'dimensions' && ch.total && ch.w && ch.h && ch.d && ch.total !== ch.w + ch.h + ch.d) {
    note(warn, a.name, `checked total ${ch.total} does not equal ${ch.w}+${ch.h}+${ch.d}`);
  }
  if (ch.kg && (ch.kg < 10 || ch.kg > 45)) note(warn, a.name, `checked weight ${ch.kg} kg is outside 10-45`);
  if (ch.eco && ch.biz && ch.biz < ch.eco) note(warn, a.name, `business allowance ${ch.biz} kg is below economy ${ch.eco} kg`);

  // --- fare variants --------------------------------------------------------
  const variants = a.carryOnVariants ?? [];
  if (variants.length === 1) note(warn, a.name, 'has exactly one carry-on variant — the picker adds nothing');
  const ids = new Set<string>();
  let allowedCount = 0;
  for (const v of variants) {
    if (ids.has(v.id)) note(fail, a.name, `duplicate variant id "${v.id}"`);
    ids.add(v.id);
    if (!v.label?.trim()) note(fail, a.name, `variant "${v.id}" has no label`);
    if (v.allowed === false) {
      if (v.w || v.h || v.d) note(warn, a.name, `variant "${v.id}" is not allowed yet carries dimensions`);
    } else {
      allowedCount++;
      // A variant may be bounded by three sides or by a single linear total — not both is fine.
      const hasBox = Boolean(v.w && v.h && v.d);
      const hasLinear = Boolean(v.linearOnly && v.linearCm);
      if (!hasBox && !hasLinear) note(fail, a.name, `variant "${v.id}" allows a bag but states no limit at all`);
    }
  }
  if (variants.length && allowedCount === 0) {
    note(fail, a.name, 'every carry-on variant is "not allowed" — the checker would never show a size');
  }
}

console.log(`Airlines checked: ${AIRLINES.length}`);
console.log(`\n===== CONTRADICTIONS (${fail.length}) =====`);
fail.forEach((f) => console.log('  ' + f));
if (!fail.length) console.log('  none');
console.log(`\n===== WORTH A LOOK (${warn.length}) =====`);
warn.forEach((w) => console.log('  ' + w));
if (!warn.length) console.log('  none');
