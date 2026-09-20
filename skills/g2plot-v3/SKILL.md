---
name: g2plot-v3
description: G2Plot v3 可视化组件库，提示词即组件。当用户需要创建、绘制 AntV G2 图表（折线图、柱状图、饼图、面积图、散点图、双轴图、雷达图、热力图、漏斗图等）时使用本 skill。提供 G2 v5 出码规范、图表选型决策、可运行案例与 v4→v5 防幻觉对照。
---

# G2Plot v3

面向 AI Coding 的可视化组件库：每个图表组件 = 选型规则 + 数据要求 + 可运行案例 + 易错点对照。生成的代码基于 **@antv/g2 ^5**，直接写入用户项目。

## 使用流程

1. 按下方「选型决策树」确定图表类型
2. 阅读 `charts/<chart>.md` 获取该组件的完整提示词
3. 参照 `examples/<chart>/` 中的可运行案例生成代码
4. 生成后对照 `references/v4-to-v5-migration.md` 自查，确认无 v4 / G2Plot v2 幻觉写法
5. 本地内容不足时，调用「AntV 上下文检索服务」兜底（见下节）

## 选型决策树

按用户意图与数据特征选择组件：

| 用户想表达 | 数据特征 | 组件 | 提示词文件 |
|---|---|---|---|
| 趋势变化、走势 | 时间/有序 x + 数值 y | line 折线图 | [charts/line.md](../../charts/line.md) |
| 多系列趋势对比 | x + y + 系列字段 | line（color 分组） | [charts/line.md](../../charts/line.md) |
| 类别数值对比 | 类别 x + 数值 y | column 柱状图 | charts/column.md（待补充） |
| 类别数值对比（横向） | 类别多/名称长 | bar 条形图 | charts/bar.md（待补充） |
| 占比、构成 | 类别 + 数值 | pie 饼图 | charts/pie.md（待补充） |
| 趋势 + 累积量 | 时间 x + 数值 y | area 面积图 | charts/area.md（待补充） |
| 双变量相关性 | 两个数值字段 | scatter 散点图 | charts/scatter.md（待补充） |
| 两个量级不同的指标 | 时间 x + 双数值 y | dual-axes 双轴图 | charts/dual-axes.md（待补充） |
| 多维能力对比 | 多维度数值 | radar 雷达图 | charts/radar.md（待补充） |
| 密度/频率分布 | 两个类别 + 数值 | heatmap 热力图 | charts/heatmap.md（待补充） |
| 流程转化 | 阶段 + 数值 | funnel 漏斗图 | charts/funnel.md（待补充） |

选型拿不准时，读对应 `charts/<chart>.md` 的「何时使用 / 何时不用」小节。

## 共享规范（生成前必读）

- G2 v5 API 速查：[references/g2-v5-cheatsheet.md](../../references/g2-v5-cheatsheet.md)
- v4 → v5 迁移对照（防幻觉）：[references/v4-to-v5-migration.md](../../references/v4-to-v5-migration.md)
- 数据模式（长表/宽表/时间字段）：[references/data-patterns.md](../../references/data-patterns.md)

## AntV 上下文检索服务

**本地文档优先**：`charts/`、`examples/`、`references/` 已覆盖选型与核心 API，优先读本地内容。当本地无法覆盖所需的 G2 v5 概念、API、用法或示例时（如陌生 mark 类型、复杂 transform、未收录的配置项），再通过 AntV 上下文检索服务获取官方参考文档。

- **Endpoint**：`GET https://sive.antv.antgroup.com/api/v1/context/retrieve`
- **检索方式**：混合检索（FTS + 向量 + RRF 融合）

### 参数

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `query` | string | ✅ | 检索关键词，如 `bar chart stacked` |
| `library` | string | ✅ | 库名：`g2` / `g6` / `x6`（本组件库固定用 `g2`） |
| `topK` | number | | 返回结果数，默认 5 |
| `content` | boolean | | 是否返回完整参考文档 markdown，默认 `true` |
| `maxTokens` | number | | 每条结果最大 token 数，默认不限 |

### 示例

```bash
curl "https://sive.antv.antgroup.com/api/v1/context/retrieve?query=bar+chart+stacked&library=g2"
```

检索结果与本地规范冲突时，以本地 `references/g2-v5-cheatsheet.md` 与 `references/v4-to-v5-migration.md` 的铁律为准。

## 生成代码的铁律

1. 只用 G2 v5 API：`import { Chart } from '@antv/g2'`，`new Chart()` + `chart.options(spec)` + `chart.render()`
2. 禁止 v4 语法糖：`.position('x*y')`、`.shape('smooth')`、`chart.source(data)`
3. 禁止 G2Plot v2 写法：`new Line()`、`xField` / `yField` / `seriesField`
4. 数据用长表，数值字段确保 `number` 类型
5. 生成代码自包含：示例数据内联，或明确标注数据来源与字段名
6. 布局用 `autoFit: true`（`new Chart({ container, autoFit: true })`），**不要**手动设置 spec `padding`：保持默认 `auto`，G2 会自动为坐标轴、图例留出空间，手动 padding 容易导致组件被遮挡/裁剪
