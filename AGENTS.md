# AGENTS.md

本仓库是 **G2Plot v3** —— 面向 AI Coding 的可视化组件库，提示词即组件。无运行时、无构建产物，全部内容为 markdown 提示词 + 可运行 TypeScript 案例。

## 生成图表代码

1. 读 [skills/g2plot-v3/SKILL.md](skills/g2plot-v3/SKILL.md) 的选型决策树，确定图表类型
2. 读对应的 `charts/<chart>.md` 组件提示词（数据要求、变体、易错点）
3. 参照 `examples/<chart>/` 可运行案例，生成基于 **@antv/g2 ^5** 的代码
4. 对照 `references/v4-to-v5-migration.md` 自查幻觉

## 贡献组件

- 组件模板参照 [charts/line.md](charts/line.md)（首个标准组件）
- 每个组件 = `charts/<chart>.md` + `examples/<chart>/*.ts`
- md 中 ```ts 代码块必须完整可编译；教学片段用 ```ts-snippet
- 提交前运行 `npm run validate` 确保全部案例与代码块通过 tsc 校验

## 硬约束

- 所有示例代码基于 `@antv/g2` ^5，禁止 G2 v4 与 G2Plot v2 的任何 API
- 示例数据自包含，字段名语义化
