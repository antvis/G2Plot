# G2Plot v3（WIP）

> Prompt 驱动的可视化组件知识库：基于 G2 v5，面向 AI Coding Agent 的图表出码场景。

与 v2 的本质区别：v3 不是 JS 运行时库，而是一套「提示词 + G2 v5 案例代码」的结构化知识库。开发者在 AI Coding Agent（Claude Code / CodeFuse / Cursor 等）中描述需求，Agent 读取本库的图表提示词文件，直接生成可运行的 G2 v5 业务代码。

## 与 GPT-Vis 的关系

[AntV GPT-Vis](https://github.com/antvis/GPT-Vis) 面向**运行时渲染**场景：LLM 输出私有 vis 语法，由 GPT-Vis 库在运行时渲染。G2Plot v3 面向**出码**场景：生成的是开发者项目中的原生 G2 v5 代码，代码归开发者所有、可自由修改扩展。两者互补。

## 使用方式

```bash
# 作为 Claude Code / CodeFuse skill 安装
npx skills add <repo-url>

# 或手动拷贝 skills/g2plot-v3/ 到你的 Agent skills 目录
```

## 目录结构

```
├── AGENTS.md             # 通用 Agent 入口
├── skills/g2plot-v3/     # Skill 标准入口（图表选型决策树）
├── charts/               # 提示词文件：选型 + 数据要求 + 内联精简片段
├── examples/             # 事实源：完整可运行案例（tsc 直接校验）
├── references/           # 跨图表共享知识（v5 API 速查、v4→v5 迁移对照）
├── scripts/              # 内容校验工具
└── docs/design-docs/     # 设计文档
```

## 覆盖图表（MVP）

line、column、bar、pie、area、scatter、dual-axes、radar、heatmap、funnel

## License

MIT
