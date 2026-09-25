const puppeteer = require('puppeteer-core');
// Homepage QA harness. Needs Chrome and puppeteer-core (npm i -g puppeteer-core, or npx). Serve the site on :3456 first.
// Output lands in the current directory; run it from scripts/qa/out (gitignored).
const fs = require('fs');
(async () => {
  const url = process.argv[2] || 'http://localhost:3456/';
  const tag = process.argv[3] || 'v';
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--hide-scrollbars'] });
  const out = [];
  for (const [name, w, h, mobile] of [['desk', 1280, 800, false], ['mob', 390, 844, true]]) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push('PAGEERROR ' + e.message));
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2500));
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    let y = 0, i = 0; const log = [];
    while (y < total - h + 1) {
      await page.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), y);
      await new Promise(r => setTimeout(r, 750));
      const info = await page.evaluate(() => {
        const c = document.getElementById('tl-clip'); const t = document.getElementById('tl-t');
        const sec = [...document.querySelectorAll('section')].find(s => { const r = s.getBoundingClientRect(); return r.top <= innerHeight / 2 && r.bottom >= innerHeight / 2; });
        return { sec: sec && sec.id, clip: c && c.getAttribute('width'), step: t && t.textContent, sw: document.documentElement.scrollWidth };
      });
      const f = `${tag}-${name}-${String(i).padStart(2, '0')}.png`;
      await page.screenshot({ path: f });
      log.push({ f, y, ...info });
      y += Math.round(h * 0.85); i++;
    }
    out.push({ name, total, frames: log, errors });
    await page.close();
  }
  await browser.close();
  fs.writeFileSync(`${tag}-log.json`, JSON.stringify(out, null, 1));
  console.log(JSON.stringify(out.map(o => ({ name: o.name, total: o.total, frames: o.frames.length, errors: o.errors, sw: [...new Set(o.frames.map(f => f.sw))], secs: o.frames.map(f => f.sec + (f.clip ? '/' + f.clip : '')).join(' ') })), null, 1));
})().catch(e => { console.error('FAIL', e); process.exit(1); });
