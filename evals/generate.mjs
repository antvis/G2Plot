// 生成代码：调用 LLM 为每个 case 生成 TypeScript 代码，写入 evals/results/，并用 tsc 校验
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { config as loadEnv } from 'dotenv';
import { generateText } from 'ai';
import { createModel } from './lib/llm.mjs';
import { loadCases, ROOT, RESULTS_DIR, EVALS_DIR } from './lib/load-cases.mjs';

loadEnv({ path: path.join(EVALS_DIR, '.env'), quiet: true });

async function readPrompt(name) {
  const text = await fs.readFile(path.join(EVALS_DIR, 'prompts', name), 'utf-8');
  return text.trim();
}

function tscCheck(filePath) {
  const args = [
    '--noEmit', '--strict', '--skipLibCheck', '--esModuleInterop',
    '--target', 'ES2020', '--module', 'ESNext', '--moduleResolution', 'bundler',
    '--lib', 'ES2020,DOM', filePath,
  ];
  return new Promise((resolve) => {
    execFile('npx', ['tsc', ...args], { cwd: ROOT }, (error, stdout, stderr) => {
      resolve({ success: !error, output: (stdout + stderr).trim() });
    });
  });
}

function extractCode(text) {
  // 提取第一个 ```ts 或 ```typescript 代码块
  const m = text.match(/```(?:ts|typescript)\n([\s\S]*?)```/);
  if (m) return m[1].trim();
  // 退化：无代码块标记则尝试首段
  return text.trim();
}

async function main() {
  const { model, modelId, temperature } = createModel();
  const systemTemplate = await readPrompt('generate.md');
  const cases = await loadCases();
  if (cases.length === 0) {
    console.log('No cases found.');
    return;
  }
  console.log(`Generating code for ${cases.length} case(s) using ${modelId}...`);

  await fs.rm(RESULTS_DIR, { recursive: true, force: true });
  await fs.mkdir(RESULTS_DIR, { recursive: true });

  const results = [];
  for (const evalCase of cases) {
    const skillPath = path.join(ROOT, 'charts', `${evalCase.chart}.md`);
    const skill = await fs.readFile(skillPath, 'utf-8');
    const system = systemTemplate.replace('{{SKILL}}', skill);

    process.stdout.write(`  ${evalCase.id} ... `);
    let code = '';
    let tsc = { success: false, output: 'not run' };
    try {
      const { text } = await generateText({
        model,
        system,
        prompt: evalCase.prompt,
        temperature,
      });
      code = extractCode(text);
      const filePath = path.join(RESULTS_DIR, `${evalCase.id}.ts`);
      await fs.writeFile(filePath, code);
      tsc = await tscCheck(filePath);
      console.log(tsc.success ? '✓ tsc ok' : `✗ tsc failed`);
    } catch (err) {
      console.log(`✗ ${err.message?.slice(0, 80)}`);
    }
    results.push({ id: evalCase.id, chart: evalCase.chart, code, tsc });
  }

  await fs.writeFile(
    path.join(RESULTS_DIR, '_generate.json'),
    JSON.stringify(results, null, 2)
  );

  const ok = results.filter((r) => r.tsc.success).length;
  console.log(`\nGenerated ${ok}/${results.length} passed tsc check.`);
  if (ok < results.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
