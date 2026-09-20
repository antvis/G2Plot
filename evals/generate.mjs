// Code generation: simulate an AI Coding Agent handling user queries.
// The agent activates the g2plot-v3 skill, reads referenced files via tools,
// and writes generated code to evals/results/.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { config as loadEnv } from 'dotenv';
import { createModel } from './lib/llm.mjs';
import { createGenerateAgent } from './lib/generate-agent.mjs';
import { loadCases } from './lib/load-cases.mjs';
import { RESULTS_DIR, EVALS_DIR } from './lib/const.mjs';

loadEnv({ path: path.join(EVALS_DIR, '.env'), quiet: true });

const extractCode = (text) =>
  (text.match(/```(?:ts|typescript)\n([\s\S]*?)```/)?.[1] ?? text).trim();

async function main() {
  const { model, temperature } = createModel();
  const agent = createGenerateAgent({ model, temperature });

  const cases = await loadCases();
  console.log(`Generating code for ${cases.length} case(s) using ${model.modelId}...`);

  await fs.rm(RESULTS_DIR, { recursive: true, force: true });
  await fs.mkdir(RESULTS_DIR, { recursive: true });

  const results = [];
  for (const evalCase of cases) {
    process.stdout.write(`  ${evalCase.id} ... `);
    let code = '';
    let steps = 0;
    try {
      const result = await agent.generate({ prompt: evalCase.prompt });
      steps = result.steps?.length ?? 0;
      code = extractCode(result.text);
      await fs.writeFile(path.join(RESULTS_DIR, `${evalCase.id}.ts`), code);
      console.log(`ok (${steps} steps)`);
    } catch (err) {
      console.log(`error: ${err.message?.slice(0, 80)}`);
    }
    results.push({ id: evalCase.id, chart: evalCase.chart, code, steps });
  }

  await fs.writeFile(
    path.join(RESULTS_DIR, 'eval-result.json'),
    JSON.stringify(results, null, 2)
  );

  const ok = results.filter((r) => r.code).length;
  console.log(`\nGenerated ${ok}/${results.length} case(s) with code.`);
  if (ok < results.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
