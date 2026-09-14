import { chromium } from 'playwright-core';

const BAG = { w: 40, h: 55, d: 23, kg: 10 };
const TYPES = ['personal', 'carryon', 'checked'];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--no-sandbox'],
});

const problems = [];

for (const type of TYPES) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  const url = `http://127.0.0.1:8086/size-checker.html?w=${BAG.w}&h=${BAG.h}&d=${BAG.d}&kg=${BAG.kg}&unit=metric&type=${type}`;
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  const rows = await page.evaluate(() => {
    const section = document.querySelector('#result');
    if (!section) return { error: 'no #result section' };
    // Each airline card is the element carrying the carrier name in its first line.
    const cards = [...section.querySelectorAll('div')].filter((el) => {
      const kids = el.children;
      return kids.length >= 2 && el.className === '' && /\n/.test(el.innerText || '') && el.dataset.card === undefined;
    });
    return { text: section.innerText, cardCount: cards.length };
  });

  if (rows.error) {
    problems.push(`[${type}] ${rows.error}`);
    await page.close();
    continue;
  }

  const lines = rows.text.split('\n').map((l) => l.trim()).filter(Boolean);
  console.log(`\n================ ${type.toUpperCase()} — bag ${BAG.w}×${BAG.h}×${BAG.d} cm, ${BAG.kg} kg ================`);
  console.log(lines.slice(0, 14).join(' | '));

  // Anomalies worth flagging: a limit of zero, an empty measurement, NaN anywhere.
  const zeroLimits = lines.filter((l) => /\b0 cm\b/.test(l));
  const nans = lines.filter((l) => /NaN|undefined|null/.test(l));
  if (zeroLimits.length) problems.push(`[${type}] "0 cm" appears ${zeroLimits.length}×: ${zeroLimits.slice(0, 3).join(' / ')}`);
  if (nans.length) problems.push(`[${type}] broken value: ${nans.slice(0, 3).join(' / ')}`);
  if (errors.length) problems.push(`[${type}] JS error: ${errors[0]}`);

  // Count the verdicts so the spread is visible at a glance.
  const verdicts = {};
  for (const v of ['Fits', 'Fits on most flights', 'Check weight', 'Needs manual check', 'Not included', 'Too large']) {
    verdicts[v] = lines.filter((l) => l === v).length;
  }
  console.log('verdicts:', JSON.stringify(verdicts));

  await page.screenshot({ path: `/tmp/checker-${type}.png`, fullPage: false });
  await page.close();
}

console.log('\n================ PROBLEMS ================');
console.log(problems.length ? problems.join('\n') : 'none detected by these checks');

await browser.close();
