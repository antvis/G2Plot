// 评审代码：LLM 按 groundTruth 评审 results/ 中生成代码，汇总报告到 evals/report.md
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { config as loadEnv } from 'dotenv';
import { generateObject } from 'ai';
import { z } from 'zod';
import { createModel } from './lib/llm.mjs';
import { loadCases, EVALS_DIR, RESULTS_DIR } from './lib/load-cases.mjs';

loadEnv({ path: path.join(EVALS_DIR, '.env'), quiet: true });

const Verdict = z.object({
  pass: z.boolean().describe('score >= 4 时为 true'),
  score: z.number().int().min(1).max(5).describe('1-5 分，5 为完全满足'),
  reason: z.string().describe('简要说明评分理由，指出具体问题'),
});

async function readPrompt(name) {
  const text = await fs.readFile(path.join(EVALS_DIR, 'prompts', name), 'utf-8');
  return text.trim();
}

async function main() {
  const { model, modelId } = createModel();
  const judgeSystem = await readPrompt('judge.md');
  const cases = await loadCases();

  const generated = JSON.parse(
    await fs.readFile(path.join(RESULTS_DIR, '_generate.json'), 'utf-8')
  );
  const genMap = new Map(generated.map((g) => [g.id, g]));

  console.log(`Judging ${cases.length} case(s) using ${modelId}...`);

  const verdicts = [];
  for (const c of cases) {
    const g = genMap.get(c.id);
    if (!g) {
      verdicts.push({ id: c.id, chart: c.chart, error: 'no generated code' });
      continue;
    }
    process.stdout.write(`  ${c.id} ... `);
    try {
      const { object } = await generateObject({
        model,
        system: judgeSystem,
        schema: Verdict,
        prompt: [
          `【用户需求】\n${c.prompt}`,
          `\n【评测依据】\n${c.groundTruth}`,
          `\n【生成代码】\n\`\`\`ts\n${g.code}\n\`\`\``,
          `\n【tsc 编译结果】\n${g.tsc.success ? '通过' : `失败：\n${g.tsc.output}`}`,
        ].join('\n'),
      });
      verdicts.push({ id: c.id, chart: c.chart, ...object });
      console.log(`${object.pass ? '✓' : '✗'} score=${object.score}`);
    } catch (err) {
      verdicts.push({ id: c.id, chart: c.chart, error: err.message?.slice(0, 120) });
      console.log(`✗ ${err.message?.slice(0, 60)}`);
    }
  }

  const valid = verdicts.filter((v) => !v.error);
  const passed = valid.filter((v) => v.pass);
  const failed = valid.filter((v) => !v.pass);
  const errored = verdicts.filter((v) => v.error);
  const passRate = valid.length ? ((passed.length / valid.length) * 100).toFixed(1) : '0.0';
  const avgScore = valid.length
    ? (valid.reduce((s, v) => s + v.score, 0) / valid.length).toFixed(2)
    : '0.00';

  let report = '# Skill Evaluation Report\n\n';
  report += `- Model: ${modelId}\n- Total: ${verdicts.length}\n- Passed: ${passed.length}\n- Failed: ${failed.length}\n- Errors: ${errored.length}\n- Pass rate: ${passRate}%\n- Avg score: ${avgScore}/5\n`;
  if (failed.length) {
    report += '\n## Failures\n';
    for (const v of failed) {
      report += `\n### ${v.id} (score ${v.score})\n\n${v.reason}\n`;
    }
  }
  if (errored.length) {
    report += '\n## Errors\n';
    for (const v of errored) {
      report += `\n### ${v.id}\n\n${v.error}\n`;
    }
  }
  await fs.writeFile(path.join(EVALS_DIR, 'report.md'), report);
  await fs.writeFile(
    path.join(EVALS_DIR, 'report.json'),
    JSON.stringify(verdicts, null, 2)
  );

  console.log(`\nPassed ${passed.length}/${verdicts.length} (${passRate}%), avg score ${avgScore}/5`);
  console.log('Report: evals/report.md');
  if (failed.length || errored.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
