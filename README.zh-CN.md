<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

<div align="center">

# 🍡 G2Plot v3, Prompts as Charts for AI!

**Prompts as Charts**，提示词即组件，一套面向 AI 的没有组件代码的可视化组件库。

Prompt in, Charts out，让 AI Coding Agent 写出正确的 [AntV](https://github.com/antvis) 可视化代码。

[![Version](https://badgen.net/npm/v/@antv/g2plot)](https://npmjs.com/@antv/g2plot) [![NPM downloads](https://img.shields.io/npm/dm/@antv/g2plot.svg)](https://npmjs.com/@antv/g2plot) ![Latest commit](https://badgen.net/github/last-commit/antvis/G2Plot) [![build Status](https://github.com/antvis/G2Plot/workflows/build/badge.svg?branch=v3)](https://github.com/antvis/G2Plot/actions?query=workflow%3Abuild) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

![G2Plot v3 preview](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*KQH4RZhVF1IAAAAAgBAAAAgAemJ7AQ/fmt.avif)

</div>

G2Plot v3 不是传统的 JS 图表库，没有运行时、没有 npm 依赖。它是一套**面向 AI Coding 的可视化组件库**：组件不是代码，而是 AI 运行上下文——每个图表组件对应一份提示词文件（选型规则 + 数据要求 + 可运行案例 + 易错点对照），供 Claude Code、CodeFuse、Cursor 等 AI Coding Agent 读取，直接在你的项目中生成原生 AntV 图表代码。

```text
你: "帮我画一个多系列折线图，数据是每月的销售额和利润"
 ↓
AI Agent 读取 charts/line.md + examples/line/multi-series.ts
 ↓
在你的代码库中生成可直接运行的 AntV 图表组件
```

## 🚀 快速开始

G2Plot v3 不是传统的 UI 组件库，而是作为 Skill，给 AI 安装和使用。

```bash
npx skills add https://github.com/antvis/G2Plot
```

安装后，在 AI Coding Agent 中直接描述你的需求即可：

> "我要做一个堆叠柱状图，数据是各季度三个产品线的营收"

Agent 会自动完成图表选型、读取对应提示词文件、生成 G2 v5 代码并放入你的项目。

## 📊 图表支持

G2Plot v3 覆盖 36+ 个常用图表类型，更多类型，欢迎提交 PR：

| 趋势 | 对比 | 占比 | 分布 | 关系/其他 |
|---|---|---|---|---|
| line 折线图 | column 柱状图 | pie 饼图 | scatter 散点图 | dual-axes 双轴图 |
| area 面积图 | bar 条形图 | | heatmap 热力图 | funnel 漏斗图 |
| | | | | radar 雷达图 |


## 🏗️ 工作原理

工作原理如下：

```text
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

## 🤝 贡献

欢迎补充新图表、修正案例、完善易错点对照。贡献前请先阅读对应图表的 `charts/*.md` 模板规范，并确保 `npm run validate` 通过。

## 🔗 相关项目

[GPT-Vis](https://github.com/antvis/GPT-Vis) 面向**运行时渲染**：LLM 输出私有 vis 语法，由 GPT-Vis 库在运行时解析渲染，适合 AI 对话应用内嵌图表。G2Plot v3 面向**出码**：生成的是开发者项目中的原生 G2 v5 代码，适合用 AI 辅助开发图表页面。两者互补。

- [G2](https://github.com/antvis/G2) - 一套简明和渐进式的可视化语法，本组件库的目标渲染引擎（v5）
- [G2Plot v2](https://github.com/antvis/G2Plot/tree/master) - 经典运行时图表库（G2 4.x）
- [GPT-Vis](https://github.com/antvis/GPT-Vis) - 面向 LLM 运行时的可视化方案
- [AVA](https://github.com/antvis/AVA) - AI 原生的可视分析框架

## 📄 License

[MIT](./LICENSE)
