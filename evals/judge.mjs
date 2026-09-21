// Judge: render each generated case in a headless browser via G2 CDN,
// take a screenshot, and write score back to eval-result.json.
// score: 100 = rendered without errors, 0 = runtime error or empty code.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { build } from 'esbuild';
import { RESULTS_DIR } from './lib/const.mjs';
import { writeSummary } from './score.mjs';

const RESULT_FILE = path.join(RESULTS_DIR, 'eval-result.json');
const G2_CDN = 'https://unpkg.com/@antv/g2@5/dist/g2.min.js';

// Shim @antv/g2 imports to the browser global window.G2 loaded from CDN.
const g2ShimPlugin = {
  name: 'g2-shim',
  setup(b) {
    b.onResolve({ filter: /^@antv\/g2$/ }, () => ({ path: '@antv/g2', namespace: 'g2-shim' }));
    b.onLoad({ filter: /.*/, namespace: 'g2-shim' }, () => ({
      contents: 'module.exports = window.G2;',
      loader: 'js',
    }));
  },
};

async function transpile(code) {
  const result = await build({
    stdin: { contents: code, loader: 'ts', resolveDir: process.cwd() },
    bundle: true,
    format: 'iife',
    target: 'es2020',
    write: false,
    plugins: [g2ShimPlugin],
  });
  return result.outputFiles[0].text;
}

async function buildHtml(code) {
  const js = await transpile(code);
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><script src="${G2_CDN}"></script></head>
<body style="margin:0;background:#fff;">
<div id="container" style="width:800px;height:400px;"></div>
<script>
window.__errors = [];
window.addEventListener('error', (e) => window.__errors.push(e.message));
window.addEventListener('unhandledrejection', (e) => window.__errors.push(String(e.reason)));
try {
  ${js}
} catch (err) {
  window.__errors.push(String(err && err.stack || err));
}
</script>
</body>
</html>`;
}

// Detect a blank/white render by reading canvas pixels in the page.
// Returns true when no canvas exists, pixels can't be read, or the share of
// non-white pixels is below the threshold (i.e. the chart barely rendered).
// Sparse charts (scatter points, thin lines) legitimately render few non-white
// pixels (~0.8%), so the threshold must sit well below that to avoid false
// positives while still catching truly blank renders (0%).
const NON_WHITE_THRESHOLD = 0.003; // < 0.3% non-white pixels => blank
async function isBlank(page) {
  return page.evaluate((threshold) => {
    const canvas = document.querySelector('#container canvas');
    if (!canvas) return true;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return true;
    const ctx = canvas.getContext('2d');
    if (!ctx) return true;
    let data;
    try {
      data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    } catch {
      return true; // cannot read pixels -> treat as blank
    }
    // Sample pixels with a stride to keep it cheap on large canvases.
    const total = data.length / 4;
    const stride = Math.max(1, Math.floor(total / 5000));
    let sampled = 0;
    let nonWhite = 0;
    for (let i = 0; i < total; i += stride) {
      const o = i * 4;
      const r = data[o];
      const g = data[o + 1];
      const b = data[o + 2];
      const a = data[o + 3];
      sampled += 1;
      // Count pixels that are neither white-ish nor (near) transparent.
      if (a > 10 && (r < 245 || g < 245 || b < 245)) nonWhite += 1;
    }
    return sampled === 0 || nonWhite / sampled < threshold;
  }, NON_WHITE_THRESHOLD);
}

// Let the chart finish its enter animation before reading pixels / screenshot.
// Heatmaps and many marks fade/grow in over ~1s; sampling too early sees a
// blank canvas even though the chart renders fine.
const RENDER_SETTLE_MS = 1200;

async function judgeCase(browser, item) {
  const screenshot = path.join(RESULTS_DIR, `${item.id}.png`);
  if (!item.code) {
    return { ...item, score: 0, error: 'empty code' };
  }
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 820, height: 420 });
    await page.setContent(await buildHtml(item.code), { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('#container canvas', { timeout: 10000 }).catch(() => {});
    await new Promise((resolve) => setTimeout(resolve, RENDER_SETTLE_MS));
    const errors = await page.evaluate(() => window.__errors);
    const blank = await isBlank(page);
    await page.screenshot({ path: screenshot });
    if (errors && errors.length > 0) {
      return { ...item, score: 0, error: errors.join('; ').slice(0, 500) };
    }
    if (blank) {
      return { ...item, score: 0, error: 'blank render (white screen)', screenshot: `${item.id}.png` };
    }
    return { ...item, score: 100, screenshot: `${item.id}.png` };
  } catch (err) {
    return { ...item, score: 0, error: String(err.message || err).slice(0, 500) };
  } finally {
    await page.close();
  }
}

async function main() {
  const items = JSON.parse(await fs.readFile(RESULT_FILE, 'utf-8'));
  console.log(`Judging ${items.length} case(s) in headless browser...`);

  const browser = await puppeteer.launch({ headless: 'new' });
  const judged = [];
  for (const item of items) {
    process.stdout.write(`  ${item.id} ... `);
    const result = await judgeCase(browser, item);
    judged.push(result);
    console.log(result.score === 100 ? 'pass' : `fail: ${(result.error || '').slice(0, 80)}`);
  }
  await browser.close();

  await fs.writeFile(RESULT_FILE, JSON.stringify(judged, null, 2));

  const passed = judged.filter((r) => r.score === 100).length;
  console.log(`\nJudged ${passed}/${judged.length} passed. Screenshots saved to evals/results/.`);

  const summary = await writeSummary();
  console.log(`Summary written to evals/results/summary.json (passRate ${summary.passRate}%).`);

  if (passed < judged.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
