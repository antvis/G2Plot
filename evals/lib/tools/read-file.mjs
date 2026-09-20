// Read a file in the repository.
import { tool } from 'ai';
import { z } from 'zod';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../const.mjs';

export const readFile = tool({
  description:
    'Read a file in the repository, e.g. charts/line.md, references/g2-v5-cheatsheet.md, examples/line/basic.ts. ' +
    'Use paths referenced by the skill entry file.',
  inputSchema: z.object({
    path: z.string().describe('File path relative to the repo root'),
  }),
  execute: async ({ path: relPath }) => {
    try {
      return await fs.readFile(path.join(ROOT, relPath), 'utf-8');
    } catch {
      return `Error: file not found: ${relPath}`;
    }
  },
});
