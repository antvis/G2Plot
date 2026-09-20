# AGENTS.md

本文件是给**参与开发本仓库**的 AI Coding Agent 的约束与要求。

本仓库是 **G2Plot v3** —— 面向 AI Coding 的可视化组件库，提示词即组件。无运行时、无构建产物，全部内容为 markdown 提示词 + 可运行 TypeScript 案例。

## 仓库结构

- `charts/<chart>.md` — 组件提示词：选型、数据要求、变体、样式自定义、易错点
- `examples/<chart>/*.ts` — 可运行案例（事实源，tsc 校验）
- `references/` — 跨组件共享规范：G2 v5 API 速查、v4→v5 迁移对照、数据模式
- `skills/g2plot-v3/SKILL.md` — 组件库对**使用者**的入口（选型决策树），与本文件职责不同

## 贡献组件

- 组件模板参照 [charts/line.md](charts/line.md)（首个标准组件）
- 每个组件 = `charts/<chart>.md` + `examples/<chart>/*.ts`
- examples/ 是事实源：md 中的完整代码块必须与对应 examples 文件保持一致
- 每个 example 文件必须以头部块注释开头，介绍案例：用途、适用场景、关键要点（与「完整案例」表格中的元信息一致）
- 「完整案例」章节必须用表格维护每个案例的元信息：案例链接、场景、关键配置
- 组件涉及的 G2 API 用法先用「AntV 上下文检索服务」核实（见下节），不要凭记忆写
- 提交前运行 `npm run validate`（tsc 校验全部 examples）

## 查询 G2 文档（AntV 上下文检索服务）

AI 生成本项目内容时（`charts/`、`references/`、`examples/`）；可以通过 AntV 上下文检索服务查询官方参考文档：

```bash
curl "https://sive.antv.antgroup.com/api/v1/context/retrieve?query=bar+chart+stacked&library=g2"
```

| 参数 | 必填 | 说明 |
|---|---|---|
| `query` | ✅ | 检索关键词，如 `axis label style` |
| `library` | ✅ | 本仓库固定 `g2`（服务另支持 `g6` / `x6`） |
| `topK` | | 返回结果数，默认 5 |
| `content` | | 是否返回完整文档 markdown，默认 `true` |
| `maxTokens` | | 每条结果最大 token 数，默认不限 |

避免生成的代码包含不存在，或者错误的 API。

## 硬约束

- 所有示例代码基于 `@antv/g2` ^5，禁止 G2 v4 与 G2Plot v2 的任何 API
- 示例数据自包含，字段名语义化

## 开发要求

- 每次生成代码后，不要自动 commit 和 push
- 保持代码、文档的简洁，不要过度设计
