// Scan evals/cases/<chart>.jsonl and load all evaluation cases.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { CASES_DIR } from './const.mjs';

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
