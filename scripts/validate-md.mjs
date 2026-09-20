#!/usr/bin/env node
/**
 * md 内联代码块弱校验：提取 md 中的 ts 代码块，随 examples 一起做 tsc 静态编译。
 *
 * 约定：
 * - ```ts / ```typescript 代码块：必须完整可编译（含 import 与上下文），会被校验
 * - ```ts-snippet 代码块：教学精简片段，不参与校验
 * - 易错点对照一律使用表格行内代码，不使用代码块
 */
import { execFileSync } from 'node:child_process';
import { globSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const TMP_DIR = 'examples/.tmp-md-blocks';
const CODE_BLOCK_RE = /```(?:ts|typescript)\s*\n([\s\S]*?)```/g;

const files = ['charts/*.md', 'references/*.md', 'skills/**/*.md', 'AGENTS.md'].flatMap((pattern) =>
  globSync(pattern),
);

let count = 0;
mkdirSync(TMP_DIR, { recursive: true });

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  for (const [, code] of content.matchAll(CODE_BLOCK_RE)) {
    writeFileSync(join(TMP_DIR, `${basename(file, '.md')}-${count++}.ts`), code);
  }
}

try {
  if (count === 0) {
    console.log('[validate-md] no ```ts code blocks found, skipped');
  } else {
    execFileSync('node_modules/.bin/tsc', ['--noEmit'], { stdio: 'inherit' });
    console.log(`[validate-md] ✓ ${count} code block(s) passed type check`);
  }
} finally {
  rmSync(TMP_DIR, { recursive: true, force: true });
}
