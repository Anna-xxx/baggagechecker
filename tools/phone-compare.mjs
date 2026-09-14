import { chromium } from 'playwright-core';
const PORT = process.env.PORT || "8079";
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });

for (const [name, url, anchor] of [
  ['home', 'index.html', null],
  ['checker', 'size-checker.html', '#checker'],
]) {
  const p = await b.newPage({ viewport: { width: 393, height: 900 }, deviceScaleFactor: 2 });
  await p.goto(`http://127.0.0.1:${PORT}/${url}`, { waitUntil: 'load' });
  await p.waitForTimeout(700);
  const box = await p.evaluate((sel) => {
    const el = sel ? document.querySelector(sel) : [...document.querySelectorAll('h2')].find((h) => /Enter Your/.test(h.textContent))?.closest('div');
    el.scrollIntoView({ block: 'start' });
    const r = el.getBoundingClientRect();
    return { x: Math.max(0, r.x - 4), y: Math.max(0, r.y - 4), width: Math.min(393, r.width + 8), height: Math.min(880, r.height + 8) };
  }, anchor);
  await p.screenshot({ path: `/tmp/phone-${name}.png`, clip: box });
  const text = await p.evaluate((sel) => {
    const el = sel ? document.querySelector(sel) : [...document.querySelectorAll('h2')].find((h) => /Enter Your/.test(h.textContent))?.closest('div');
    return el.innerText.split('\n').map((s) => s.trim()).filter(Boolean).slice(0, 22).join(' | ');
  }, anchor);
  console.log(`${name}: ${text}\n`);
  await p.close();
}
await b.close();
