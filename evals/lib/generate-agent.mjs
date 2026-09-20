// Build a nano AI Coding Agent for G2Plot v3 eval.
import { ToolLoopAgent, stepCountIs } from 'ai';
import { activeSkill } from './tools/active-skill.mjs';
import { readFile } from './tools/read-file.mjs';
import { curl } from './tools/curl.mjs';

const INSTRUCTIONS = `You are an AI Coding Agent that generates runnable G2 v5 chart TypeScript code from user requirements.

## Workflow

1. Call activeSkill to activate the g2plot-v3 skill and get its content.
2. Use the selection guide in the skill to pick a chart type, then readFile the referenced \`charts/<chart>.md\` component prompt.
3. readFile any referenced files under references/ or examples/ as needed (data patterns, API cheatsheet, runnable examples).
4. If local docs cannot cover a G2 v5 API, use curl to call the AntV context retrieval service mentioned in the skill.
5. Generate the final code.

## Hard requirements

- Output exactly one \`\`\`ts code block in the final answer, with no explanatory text outside it.
- The code must use @antv/g2 v5 (import { Chart } from '@antv/g2'). Do not use any G2 v4 or G2Plot v2 APIs.
- Data must be self-contained and inlined in the code (const data = [...]) with semantic field names.
- Create the chart with new Chart({ container: 'container', autoFit: true, height: 360 }) and end with chart.render().`;

export function createGenerateAgent({ model, temperature }) {
  return new ToolLoopAgent({
    model,
    instructions: INSTRUCTIONS,
    temperature,
    tools: { activeSkill, readFile, curl },
    // Max steps: activeSkill -> read charts/<chart>.md -> read examples -> generate code.
    stopWhen: stepCountIs(30),
  });
}
