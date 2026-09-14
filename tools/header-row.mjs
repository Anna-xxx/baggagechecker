/* Checks that the verdict badge sits on the airline's own line at every width, and that
   the header never pushes the card sideways. Picks the carriers with the longest names so
   the worst case is the one being measured. */
import { chromium } from 'playwright-core';

const PORT = process.env.PORT || '8079';
const WIDTHS = [320, 360, 393, 430, 619, 620, 768, 1400];
const PICK = ['Turkish Airlines', 'Singapore Airlines', 'All Nippon Airways', 'Uzbekistan Airways', 'Virgin Atlantic', 'TAP Air Portugal', 'American Airlines'];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });

for (const width of WIDTHS) {
  const p = await b.newPage({ viewport: { width, height: 1000 } });
  // An oversized, overweight bag, so the cards carry the longest badge text.
  await p.goto(`http://127.0.0.1:${PORT}/size-checker`, { waitUntil: 'load' });
  await p.waitForTimeout(500);
  await p.evaluate(() => {
    const set = (el, v) => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, String(v));
      el.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const ranges = [...document.querySelectorAll('#checker input[type=range]')];
    [80, 70, 45, 30].forEach((v, i) => ranges[i] && set(ranges[i], v));
  });
  await p.waitForTimeout(150);

  for (const name of PICK) {
    await p.click('#airlines input');
    await p.fill('#airlines input', name);
    await p.waitForTimeout(150);
    const opt = p.locator('button', { hasText: name }).first();
    await opt.click();
    await p.waitForTimeout(80);
  }
  await p.click('h2');
  await p.waitForTimeout(150);
  await p.click('button:has-text("Check my bag")');
  await p.waitForTimeout(600);

  const out = await p.evaluate(() => {
    const rows = [...document.querySelectorAll('.result-verdict')].map((pill) => {
      const row = pill.parentElement;
      const name = row.querySelector('.result-airline');
      const rr = row.getBoundingClientRect();
      const nr = name.getBoundingClientRect();
      const pr = pill.getBoundingClientRect();
      return {
        airline: name.textContent.trim(),
        verdict: pill.textContent.trim(),
        sameLine: Math.abs(nr.top - pr.top) < Math.max(nr.height, pr.height),
        nameLines: Math.round(nr.height / parseFloat(getComputedStyle(name).lineHeight)),
        spill: Math.round(Math.max(0, pr.right - rr.right)),
      };
    });
    return { rows, scroll: document.documentElement.scrollWidth > document.documentElement.clientWidth };
  });
  const bad = out.rows.filter((r) => !r.sameLine || r.spill > 0 || r.nameLines > 1);
  console.log(
    `${String(width).padStart(4)}px → карточек ${out.rows.length}, в одной строке: ${bad.length === 0 ? 'все' : 'НЕТ — ' + JSON.stringify(bad)}, прокрутка ${out.scroll ? 'ЕСТЬ' : 'нет'}`,
  );
  await p.close();
}
await b.close();
