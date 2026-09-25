const puppeteer = require('puppeteer-core');
// Homepage QA harness. Needs Chrome and puppeteer-core (npm i -g puppeteer-core, or npx). Serve the site on :3456 first.
// Output lands in the current directory; run it from scripts/qa/out (gitignored).
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args:['--hide-scrollbars'] });
  const p = await b.newPage(); await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:3456/', { waitUntil: 'networkidle0' });
  const r = await p.evaluate(() => { const m=document.getElementById('line-mobile'); const r=m.getBoundingClientRect(); return { top: r.top+scrollY, h: Math.round(r.height), sceneDisp: getComputedStyle(document.getElementById('line-scene')).display, sw: document.documentElement.scrollWidth }; });
  for (let i=0;i<3;i++){ await p.evaluate(y=>window.scrollTo(0,y), r.top + i*800); await new Promise(x=>setTimeout(x,900)); await p.screenshot({path:`mline-${i}.png`}); }
  console.log(JSON.stringify(r)); await b.close();
})();
