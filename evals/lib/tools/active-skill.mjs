// Activate a skill and return its entry content.
import { tool } from 'ai';
import { z } from 'zod';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../const.mjs';

const SKILLS = [
  {
    name: 'g2plot-v3',
    description: 'AntV G2Plot v3 可视化组件库，提示词即组件。当用户需要创建、绘制 AntV G2 图表（折线图、柱状图、饼图、面积图、散点图、双轴图、雷达图、热力图、漏斗图等）时使用本 skill。提供 G2 v5 出码规范、图表选型决策、可运行案例与 v4→v5 防幻觉对照。',
    entry: 'skills/g2plot-v3/SKILL.md',
  },
];

const skillList = SKILLS.map((s) => `- ${s.name}: ${s.description}`).join('\n');
const skillNames = SKILLS.map((s) => s.name).join(', ');

export const activeSkill = tool({
  description: `Activate a skill and return its content. Available skills:\n${skillList}`,
  inputSchema: z.object({
    name: z.string().describe(`Skill name, available: ${skillNames}`),
  }),
  execute: async ({ name }) => {
    const skill = SKILLS.find((s) => s.name === name);
    if (!skill) {
      return `Skill "${name}" not found. Available skills: ${skillNames}`;
    }
    try {
      const content = await fs.readFile(path.join(ROOT, skill.entry), 'utf-8');
      return `[Skill: ${skill.name}]\n${content}`;
    } catch {
      return `Error: skill entry file not found: ${skill.entry}`;
    }
  },
});
