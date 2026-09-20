<div align="center">

# G2Plot v3

**Prompt 驱动的可视化组件知识库，让 AI Coding Agent 写出正确的 [G2 v5](https://github.com/antvis/G2) 代码。**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

</div>

G2Plot v3 不是传统的 JS 图表库，没有运行时、没有 npm 依赖。它是一套**结构化的图表知识库**：每个图表类型对应一份提示词文件（选型规则 + 数据要求 + 可运行案例 + 易错点对照），供 Claude Code、CodeFuse、Cursor 等 AI Coding Agent 读取，直接在你的项目中生成原生 G2 v5 图表代码。

```
你: "帮我画一个多系列折线图，数据是每月的销售额和利润"
 ↓
AI Agent 读取 charts/line.md + examples/line/multi-series.ts
 ↓
在你的代码库中生成可直接运行的 G2 v5 图表组件
```

## ✨ 为什么需要它

G2 v4 → v5 是一次破坏性升级（`.position('time*value')` → `.encode('x', 'time')`），而 AI 的训练语料中充斥着大量 v4 甚至 G2Plot v2 的写法，生成 v5 代码时幻觉严重：编出不存在的 API、混淆配置层级、用错数据格式。

G2Plot v3 的每个图表文件都内置 **「v4 → v5 易错点对照」** 和 **经编译校验的可运行案例**，让 Agent 一次生成对的代码，而不是反复调试改错。

## 🚀 快速开始

### 作为 Skill 安装（推荐）

```bash
npx skills add https://github.com/antvis/G2Plot
```

安装后，在 AI Coding Agent 中直接描述你的需求即可：

> "我要做一个堆叠柱状图，数据是各季度三个产品线的营收"

Agent 会自动完成图表选型、读取对应提示词文件、生成 G2 v5 代码并放入你的项目。

### 通用方式

本仓库同时提供 [AGENTS.md](./AGENTS.md) 通用入口，任何支持 AGENTS.md 的 Agent（Cursor、GitHub Copilot 等）都能自动识别。你也可以直接浏览 `charts/` 目录，把提示词文件当作图表开发手册使用。

## 📊 图表支持

MVP 首批 10 个高频图表：

| 趋势 | 对比 | 占比 | 分布 | 关系/其他 |
|---|---|---|---|---|
| line 折线图 | column 柱状图 | pie 饼图 | scatter 散点图 | dual-axes 双轴图 |
| area 面积图 | bar 条形图 | | heatmap 热力图 | funnel 漏斗图 |
| | | | | radar 雷达图 |

完整覆盖 G2Plot v2 的 36 个图表类型已在路线图中，见 [设计文档](./docs/design-docs/active/2026-09-20-g2plot-v3-prompt-charts.md)。

## 📖 内容结构

```
├── skills/g2plot-v3/SKILL.md   # Skill 入口：图表选型决策树 + 文件索引
├── AGENTS.md                   # 通用 Agent 入口
├── charts/                     # 每个图表一份提示词文件
│   └── line.md                 #   选型规则、数据要求、精简代码片段、v4→v5 易错点
├── examples/                   # 事实源：完整可运行案例（tsc 编译校验）
│   └── line/
│       ├── basic.ts
│       └── multi-series.ts
├── references/                 # 跨图表共享知识
│   ├── g2-v5-cheatsheet.md     #   v5 API 速查
│   ├── v4-to-v5-migration.md   #   v4→v5 迁移对照
│   └── data-patterns.md        #   常见数据格式与转换
└── scripts/validate.ts         # 内容校验
```

**单一内容源**：图表知识只在 `charts/` + `examples/` 维护一份，各 Agent 入口文件仅做索引转发。

## 🏗️ 工作原理

```
用户需求（自然语言 + 数据）
        ↓
┌─────────────────────┐
│ SKILL.md 选型决策树  │ → 根据数据特征与意图匹配图表类型
└─────────────────────┘
        ↓
┌─────────────────────┐
│ charts/<chart>.md   │ → 数据要求 / 精简片段 / 易错点
└─────────────────────┘
        ↓
┌─────────────────────┐
│ examples/<chart>/   │ → 完整可运行案例（事实源）
└─────────────────────┘
        ↓
生成原生 G2 v5 代码，写入你的项目 —— 代码归你所有，可自由修改
```

### 与 GPT-Vis 的区别

[GPT-Vis](https://github.com/antvis/GPT-Vis) 面向**运行时渲染**：LLM 输出私有 vis 语法，由 GPT-Vis 库在运行时解析渲染，适合 AI 对话应用内嵌图表。G2Plot v3 面向**出码**：生成的是开发者项目中的原生 G2 v5 代码，适合用 AI 辅助开发图表页面。两者互补。

## ✅ 内容质量保障

知识库里的每一段代码都必须能跑通：

1. **强校验**：`tsc` 直接编译 `examples/**/*.ts`，类型对齐 G2 v5
2. **弱校验**：提取 md 内联代码块做编译，防止片段腐烂
3. **出码验收**：每个图表用真实 Agent 完成至少一次端到端生成验证

```bash
npm run validate   # 校验全部案例与代码片段
```

## 🤝 贡献

欢迎补充新图表、修正案例、完善易错点对照。贡献前请先阅读对应图表的 `charts/*.md` 模板规范，并确保 `npm run validate` 通过。

## 🔗 相关项目

- [G2](https://github.com/antvis/G2) - 本知识库的目标渲染引擎（v5）
- [G2Plot v2](https://github.com/antvis/G2Plot/tree/master) - 经典运行时图表库（G2 4.x）
- [GPT-Vis](https://github.com/antvis/GPT-Vis) - 面向 LLM 运行时的可视化方案
- [AVA](https://github.com/antvis/AVA) - AI 原生的可视分析框架

## 📄 License

[MIT](./LICENSE)
