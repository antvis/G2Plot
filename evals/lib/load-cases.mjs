// 扫描 evals/cases/<chart>.jsonl，加载全部评估用例
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const EVALS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const ROOT = path.resolve(EVALS_DIR, '..');
export const RESULTS_DIR = path.join(EVALS_DIR, 'results');
export const CASES_DIR = path.join(EVALS_DIR, 'cases');

export async function loadCases() {
  const cases = [];
  const entries = await fs.readdir(CASES_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.jsonl')) continue;
    const chart = path.basename(entry.name, '.jsonl');
    const content = await fs.readFile(path.join(CASES_DIR, entry.name), 'utf-8');
    for (const line of content.split('\n')) {
      if (line.trim()) cases.push({ chart, ...JSON.parse(line) });
    }
  }
  return cases;
}
