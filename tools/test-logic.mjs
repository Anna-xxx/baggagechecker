// Property tests for the size checker. These do not reimplement the verdict rules —
// copying the logic would only prove the copy matches. Instead they assert properties
// that must hold whatever the implementation is: a bag exactly at the limit passes, one
// millimetre over does not, a smaller bag never does worse than a bigger one, the units
// toggle changes nothing, and the summary agrees with the cards it summarises.
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const PORT = process.env.PORT || '8088';
const LIMITS = JSON.parse(readFileSync('/tmp/limits.json', 'utf8'));

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });

const failures = [];
const checks = { run: 0, passed: 0 };
function expect(cond, msg) {
  checks.run++;
  if (cond) checks.passed++;
  else failures.push(msg);
}

/** Load the checker with a bag and read every result card. */
async function results({ w, h, d, kg, type = 'carryon', unit = 'metric' }) {
  await page.goto(`http://127.0.0.1:${PORT}/size-checker.html?w=${w}&h=${h}&d=${d}&kg=${kg}&unit=${unit}&type=${type}`, {
    waitUntil: 'load',
  });
  await page.waitForTimeout(700);
  return page.evaluate(() => {
    const section = document.querySelector('#result');
    const text = section.innerText;
    const cards = [];
    const VERDICTS = ['Fits', 'Fits on most flights', 'Check weight', 'Needs manual check', 'Not included', 'Too heavy', 'Too large'];
    // Row labels vary: a combined cap renames Weight, and linear limits add their own row.
    const ROWS = ['Width', 'Height', 'Depth', 'Weight', 'Total cabin weight', 'Total dimensions'];
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const nameAt = lines.map((l) => window.__names.includes(l));
    for (let i = 0; i < lines.length; i++) {
      if (!VERDICTS.includes(lines[i])) continue;
      let nameIdx = -1;
      for (let j = i - 1; j >= 0 && j > i - 6; j--) if (nameAt[j]) { nameIdx = j; break; }
      if (nameIdx < 0) continue;
      // Read rows until the next carrier's card begins, so a fare-chip row cannot truncate them.
      const marks = [];
      for (let k = i + 1; k < lines.length; k++) {
        if (nameAt[k]) break;
        if (ROWS.includes(lines[k]) && ['✓', '✗', '!', '?', '–'].includes(lines[k - 1])) {
          marks.push({ field: lines[k], mark: lines[k - 1] });
        }
      }
      cards.push({ airline: lines[nameIdx], verdict: lines[i], marks });
    }
    const summary = lines.find((l) => /fits|too large|over the weight|not included|manual check/i.test(l)) || '';
    return { cards, summary };
  });
}

await page.addInitScript((names) => {
  window.__names = names;
}, LIMITS.map((l) => l.name));

// ---------------------------------------------------------------- 1. exact limit passes
for (const a of LIMITS) {
  if (a.linearOnly || a.manualCheck) continue;
  const kg = a.limit.kg || 5;
  const { cards } = await results({ w: a.limit.w, h: a.limit.h, d: a.limit.d, kg });
  const card = cards.find((c) => c.airline === a.name);
  expect(card, `[exact limit] no card rendered for ${a.name}`);
  if (card) {
    expect(
      ['Fits', 'Check weight', 'Fits on most flights'].includes(card.verdict),
      `[exact limit] ${a.name} ${a.limit.w}×${a.limit.h}×${a.limit.d} ${kg}kg is exactly its own limit but got "${card.verdict}"`,
    );
  }
}

// ------------------------------------------------------------- 2. one cm over must fail
for (const a of LIMITS) {
  if (a.linearOnly || a.manualCheck) continue;
  const kg = Math.max(1, (a.limit.kg || 5) - 1);
  for (const axis of ['w', 'h', 'd']) {
    const bag = { w: a.limit.w, h: a.limit.h, d: a.limit.d, kg };
    bag[axis] = a.limit[axis] + 1;
    const { cards } = await results(bag);
    const card = cards.find((c) => c.airline === a.name);
    if (!card) continue;
    expect(
      card.verdict !== 'Fits',
      `[over by 1cm] ${a.name} ${axis}=${bag[axis]} exceeds its limit ${a.limit[axis]} but still says "${card.verdict}"`,
    );
  }
}

// ------------------------------------------------------- 3. over on weight only = heavy
for (const a of LIMITS) {
  if (a.linearOnly || a.manualCheck || !a.limit.kg) continue;
  const { cards } = await results({ w: a.limit.w, h: a.limit.h, d: a.limit.d, kg: a.limit.kg + 2 });
  const card = cards.find((c) => c.airline === a.name);
  if (!card) continue;
  expect(
    card.verdict === 'Too heavy' || card.verdict === 'Check weight',
    `[weight only] ${a.name} is the right size but ${a.limit.kg + 2}kg vs ${a.limit.kg}kg — expected a weight verdict, got "${card.verdict}"`,
  );
}

// ------------------------------------------------ 4. verdict agrees with its own marks
{
  const { cards } = await results({ w: 40, h: 55, d: 23, kg: 10 });
  for (const c of cards) {
    const bad = c.marks.filter((m) => m.mark === '✗');
    const weighty = (m) => m.field === 'Weight' || m.field === 'Total cabin weight';
    if (c.verdict === 'Fits') expect(bad.length === 0, `[marks] ${c.airline} says "Fits" but ${bad.length} row(s) are ✗`);
    if (c.verdict === 'Too heavy') {
      expect(
        bad.length > 0 && bad.every(weighty),
        `[marks] ${c.airline} says "Too heavy" but the failing rows are ${bad.map((m) => m.field).join(', ') || 'none'}`,
      );
    }
    if (c.verdict === 'Too large') {
      // An aircraft-dependent card marks its size rows "!" rather than "✗", so a size failure
      // is either a ✗ on a size row or no passing size row at all.
      const sizeRows = c.marks.filter((m) => !weighty(m));
      expect(
        bad.some((m) => !weighty(m)) || sizeRows.some((m) => m.mark === '!'),
        `[marks] ${c.airline} says "Too large" but no size row reports a problem`,
      );
    }
  }
}

// ------------------------------------------------------------ 5. smaller never does worse
{
  const order = ['Fits', 'Fits on most flights', 'Check weight', 'Too heavy', 'Needs manual check', 'Not included', 'Too large'];
  const big = await results({ w: 45, h: 60, d: 28, kg: 12 });
  const small = await results({ w: 30, h: 40, d: 15, kg: 4 });
  for (const b of big.cards) {
    const s = small.cards.find((c) => c.airline === b.airline);
    if (!s) continue;
    if (b.verdict === 'Fits') {
      expect(s.verdict === 'Fits', `[monotonic] ${b.airline}: 45×60×28 12kg fits but the smaller 30×40×15 4kg says "${s.verdict}"`);
    }
    expect(
      order.indexOf(s.verdict) <= order.indexOf(b.verdict) || s.verdict === b.verdict,
      `[monotonic] ${b.airline}: smaller bag graded worse ("${s.verdict}") than the bigger one ("${b.verdict}")`,
    );
  }
}

// -------------------------------------------------------- 6. units must not change verdicts
{
  const metric = await results({ w: 40, h: 55, d: 23, kg: 10, unit: 'metric' });
  const imperial = await results({ w: 40, h: 55, d: 23, kg: 10, unit: 'in' });
  for (const m of metric.cards) {
    const i = imperial.cards.find((c) => c.airline === m.airline);
    if (!i) continue;
    expect(i.verdict === m.verdict, `[units] ${m.airline}: "${m.verdict}" in cm but "${i.verdict}" in inches`);
  }
}

// ------------------------------------------------------- 7. summary agrees with the cards
for (const bag of [
  { w: 40, h: 55, d: 23, kg: 10 },
  { w: 30, h: 40, d: 15, kg: 5 },
  { w: 55, h: 75, d: 35, kg: 20 },
]) {
  const { cards, summary } = await results(bag);
  const fits = cards.filter((c) => c.verdict === 'Fits').length;
  const m = summary.match(/(\d+)\s+fit/);
  if (m) expect(Number(m[1]) === fits, `[summary] says "${m[1]} fit" but ${fits} cards say Fits (bag ${bag.w}×${bag.h}×${bag.d})`);
  const heavy = cards.filter((c) => c.verdict === 'Too heavy').length;
  const mh = summary.match(/(\d+)\s+over the weight limit/);
  if (mh) expect(Number(mh[1]) === heavy, `[summary] says "${mh[1]} over the weight limit" but ${heavy} cards say Too heavy`);
  expect(cards.length === 7, `[summary] expected 7 cards from the handoff, rendered ${cards.length}`);
}

// -------------------------------------------------- 8. every type renders a full result
for (const type of ['personal', 'carryon', 'checked']) {
  const { cards } = await results({ w: 40, h: 55, d: 23, kg: 10, type });
  expect(cards.length === 7, `[types] ${type}: expected 7 cards, got ${cards.length}`);
  expect(
    cards.every((c) => c.verdict && c.marks.length >= 1),
    `[types] ${type}: a card has no verdict or no measurement rows`,
  );
}

console.log(`checks run: ${checks.run}, passed: ${checks.passed}, failed: ${failures.length}`);
if (failures.length) {
  console.log('\n===== FAILURES =====');
  failures.forEach((f) => console.log('  ' + f));
} else {
  console.log('all properties hold');
}

await browser.close();
