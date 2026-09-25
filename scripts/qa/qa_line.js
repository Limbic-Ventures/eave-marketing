const puppeteer = require('puppeteer-core');
// Homepage QA harness. Needs Chrome and puppeteer-core (npm i -g puppeteer-core, or npx). Serve the site on :3456 first.
// Output lands in the current directory; run it from scripts/qa/out (gitignored).
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--hide-scrollbars'] });
  const page = await browser.newPage(); const errors = [];
  page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3456/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.documentElement.style.scrollBehavior = 'auto');
  const geo = await page.evaluate(() => { const s = document.getElementById('line-scene'); return { top: s.getBoundingClientRect().top + scrollY, h: s.offsetHeight, vh: innerHeight }; });
  const total = geo.h - geo.vh; const rows = [];
  const ps = [0.0, 0.03, 0.8/9, 1.8/9, 2.8/9, 3.8/9, 4.8/9, 5.8/9, 6.8/9, 7.8/9, 8.8/9, 1.0];
  for (let i = 0; i < ps.length; i++) {
    await page.evaluate(y => window.scrollTo(0, y), Math.round(geo.top + ps[i] * total));
    await new Promise(r => setTimeout(r, 1300));
    const info = await page.evaluate(() => {
      const on = [...document.querySelectorAll('.lcard.on h3')].map(e => e.textContent);
      const rail = [...document.querySelectorAll('.rail-item.on')].map(e => e.textContent.trim());
      const lit = [...document.querySelectorAll('.tnode.lit, .tmark.lit')].length;
      const drawn = [...document.querySelectorAll('.tp')].filter(p => parseFloat(getComputedStyle(p).strokeDashoffset) < 99).length;
      const pen = document.getElementById('tl-pen'); const st = document.querySelector('.line-sticky').getBoundingClientRect();
      const card = document.querySelector('.lcard.on'); let cr = null; if (card) { const r = card.getBoundingClientRect(); cr = [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)]; }
      return { card: on.join('|'), rail: rail.join('|'), lit, drawn, pen: getComputedStyle(pen).opacity, stickyTop: Math.round(st.top), cardRect: cr };
    });
    await page.screenshot({ path: `line-${String(i).padStart(2, '0')}.png` });
    rows.push({ p: ps[i], ...info });
  }
  console.log(JSON.stringify({ geo, errors, rows }, null, 1));
  await browser.close();
})();
