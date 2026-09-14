/* Checks that no row of the airline list draws its allowance over the carrier's name. */
import { chromium } from 'playwright-core';

const PORT = process.env.PORT || '8079';
const WIDTHS = [320, 360, 393, 430, 619, 620, 768, 1400];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });

for (const width of WIDTHS) {
  const p = await b.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 2 });
  await p.goto(`http://127.0.0.1:${PORT}/size-checker`, { waitUntil: 'load' });
  await p.waitForTimeout(400);
  await p.click('#airlines input');
  await p.waitForTimeout(300);

  const out = await p.evaluate(() => {
    const rows = [...document.querySelectorAll('.pick-text')].map((t) => {
      const n = t.querySelector('.pick-name').getBoundingClientRect();
      const l = t.querySelector('.pick-limit').getBoundingClientRect();
      const r = t.parentElement.getBoundingClientRect();
      const overlap = n.right > l.left + 0.5 && n.left < l.right - 0.5 && n.bottom > l.top + 0.5 && n.top < l.bottom - 0.5;
      return {
        name: t.querySelector('.pick-name').textContent.trim(),
        overlap,
        spill: Math.round(Math.max(0, l.right - r.right, n.right - r.right)),
      };
    });
    return { rows, scroll: document.documentElement.scrollWidth > document.documentElement.clientWidth };
  });
  const bad = out.rows.filter((r) => r.overlap || r.spill > 0);
  console.log(
    `${String(width).padStart(4)}px → строк ${out.rows.length}, наложений: ${bad.length === 0 ? 'нет' : JSON.stringify(bad)}, прокрутка ${out.scroll ? 'ЕСТЬ' : 'нет'}`,
  );
  if (width === 393) await p.screenshot({ path: '/tmp/pick-393.png', clip: { x: 0, y: 0, width: 393, height: 900 } });
  await p.close();
}
await b.close();
