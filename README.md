<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

<div align="center">

# G2Plot v3, Prompts as Charts for AI!

**Prompts as Charts** — prompts as components, a visualization component library for AI, with zero component code.

Prompt in, Charts out. Let AI Coding Agents write correct [AntV](https://github.com/antvis) visualization code.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

</div>

G2Plot v3 is not a traditional JS charting library — no runtime, no npm dependency. It is a **visualization component library for AI Coding**: components are not code, but AI runtime context. Each chart component is a prompt file (selection rules + data requirements + runnable examples + common-pitfall reference), read by AI Coding Agents such as Claude Code, CodeFuse, and Cursor to generate native AntV chart code directly in your project.

```
You: "Draw a multi-series line chart with monthly sales and profit"
 ↓
AI Agent reads charts/line.md + examples/line/multi-series.ts
 ↓
Generates runnable AntV chart components in your codebase
```

## 🚀 Quick Start

G2Plot v3 is not a traditional UI component library. It ships as a Skill, installed for AI.

```bash
npx skills add https://github.com/antvis/G2Plot
```

Once installed, just describe what you need in your AI Coding Agent:

> "I need a stacked column chart of quarterly revenue across three product lines"

The Agent handles chart selection, reads the corresponding prompt files, and generates G2 v5 code in your project.

## 📊 Chart Support

G2Plot v3 covers 36+ common chart types. PRs for more types are welcome:

| Trend | Comparison | Proportion | Distribution | Relationship/Other |
|---|---|---|---|---|
| line | column | pie | scatter | dual-axes |
| area | bar | | heatmap | funnel |
| | | | | radar |


## 🏗️ How It Works

```
User request (natural language + data)
        ↓
┌─────────────────────┐
│ SKILL.md selection  │ → Match chart type by data and intent
│ decision tree       │
└─────────────────────┘
        ↓
┌─────────────────────┐
│ charts/<chart>.md   │ → Data requirements / snippets / pitfalls
└─────────────────────┘
        ↓
┌─────────────────────┐
│ examples/<chart>/   │ → Complete runnable examples (source of truth)
└─────────────────────┘
        ↓
Native G2 v5 code generated into your project — yours to modify freely
```

## 🤝 Contributing

Contributions are welcome: new chart components, example fixes, and pitfall entries. Please read the template conventions in `charts/*.md` first and make sure `npm run validate` passes.

## 🔗 Related Projects

[GPT-Vis](https://github.com/antvis/GPT-Vis) targets **runtime rendering**: the LLM outputs a private vis syntax that the GPT-Vis runtime parses and renders — ideal for embedding charts in AI chat applications. G2Plot v3 targets **code generation**: it produces native G2 v5 code inside your project, ideal for AI-assisted chart development. The two are complementary.

- [G2](https://github.com/antvis/G2) - A concise and progressive visualization grammar; the target rendering engine (v5) of this library
- [G2Plot v2](https://github.com/antvis/G2Plot/tree/master) - The classic runtime charting library (G2 4.x)
- [GPT-Vis](https://github.com/antvis/GPT-Vis) - Visualization for LLM runtime rendering
- [AVA](https://github.com/antvis/AVA) - AI-native visual analytics framework

## 📄 License

[MIT](./LICENSE)
