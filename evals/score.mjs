// Score: aggregate evals/results/eval-result.json into evals/results/summary.json.
// Computes overall pass rate plus per-chart breakdown, and lists failed cases.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { RESULTS_DIR } from './lib/const.mjs';

const RESULT_FILE = path.join(RESULTS_DIR, 'eval-result.json');
const SUMMARY_FILE = path.join(RESULTS_DIR, 'summary.json');

/**
 * Aggregate judged results into a summary object.
 * @param {Array<{id:string, chart:string, score?:number, error?:string}>} items
 */
export function summarize(items) {
  const byChart = new Map();
  for (const item of items) {
    if (!byChart.has(item.chart)) byChart.set(item.chart, { total: 0, passed: 0, failed: [] });
    const bucket = byChart.get(item.chart);
    bucket.total += 1;
    if (item.score === 100) {
      bucket.passed += 1;
    } else {
      bucket.failed.push({ id: item.id, error: (item.error || '').slice(0, 200) });
    }
  }

  const charts = {};
  let total = 0;
  let passed = 0;
  for (const [chart, bucket] of Object.entries(Object.fromEntries(byChart)).sort()) {
    charts[chart] = {
      total: bucket.total,
      passed: bucket.passed,
      passRate: bucket.total ? Number(((bucket.passed / bucket.total) * 100).toFixed(2)) : 0,
      failed: bucket.failed,
    };
    total += bucket.total;
    passed += bucket.passed;
  }

  return {
    time: new Date().toISOString(),
    total,
    passed,
    failed: total - passed,
    passRate: total ? Number(((passed / total) * 100).toFixed(2)) : 0,
    charts,
  };
}

/**
 * Read eval-result.json, write summary.json, and return the summary.
 */
export async function writeSummary() {
  const items = JSON.parse(await fs.readFile(RESULT_FILE, 'utf-8'));
  const summary = await summarize(items);
  await fs.writeFile(SUMMARY_FILE, JSON.stringify(summary, null, 2));
  return summary;
}
