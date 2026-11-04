# Bullet 子弹图

> 组件用途：展示单个指标的实际值与目标值的对比，并在背景中展示定性区间（如 Poor/Fair/Good/Great），常用于 KPI 考核、目标达成报告。

## 何时使用

- KPI 考核：展示实际完成情况相对于目标的达成百分比
- 目标达成报告：多指标并列展示，一目了然地看到哪些达标、哪些未达标
- 需要在同一图表中展示定性区间（如： Poor / Fair / Good / Great）和量化数值的场景

## 何时不用

- 多类别间数值对比 → 用 column 柱状图或 bar 条形图
- 连续时间趋势 → 用 line 折线图
- 占比/构成 → 用 pie 饼图

## 数据要求

- 长表数据，每行一个指标，见 [数据模式](../references/data-patterns.md)
- `category` 字段：类别名称（如 'Sales', 'Profit', 'Conversion'）
- `measure` 字段：实际数值（number），需要对比的指标值
- `target` 字段：目标值（number），用于展示达成情况
- 可选 `range` 字段：定性区间标签（如 'poor', 'fair', 'good', 'great'），用于背景色块着色

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

const data = [
  { category: 'Sales', measure: 65, target: 75 },
  { category: 'Profit', measure: 45, target: 50 },
  { category: 'Conversion', measure: 72, target: 80 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'category',
    y: 'measure',
    y2: 0,
    color: 'category',
  },
  state: {
    target: {
      symbol: 'triangle',
      style: { fill: '#5B8FF9', stroke: '#5B8FF9' },
    },
  },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多指标对比 | 数据包含多行类别，每行有 measure 和 target | [multi-indicator.ts](../examples/bullet/multi-indicator.ts) |
| 包含定性区间 | 在背景添加 range 色块标记 Poor/Fair/Good/Great | [ranges.ts](../examples/bullet/ranges.ts) |
| 目标达成进度条 |  measure bar 显示已完成比例，左侧留白显示未完成 | [progress.ts](../examples/bullet/progress.ts) |
| 竖向布局 | x/y 轴互换，纵向展示的子弹图 | [vertical.ts](../examples/bullet/vertical.ts) |

## 样式自定义

常用视觉定制项（以下写法均经 `@antv/g2` ^5 类型校验），完整示例见 [custom-style.ts](../examples/bullet/custom-style.ts):

| 定制项 | 写法 | 说明 |
|---|---|---|
| 目标线样式 | `style: { lineDash: [4, 4] }` | 虚线目标，实线表示实际值 |
| 目标点样式 | `state.target.symbol: 'diamond'` | 目标标记形状 |
| 配色方案 | `scale: { color: { range: ['#5AD8A6', '#5B8FF9'] } }` | 单色渐变或多色分段 |
| 定性区间颜色 | `scale: { color: { range: ['#D8E2DC', '#8C9EAB', '#5B8FF9', '#2F4554'] } }` | Poor/Fair/Good/Great 四段色 |
| 刻度隐藏 | `axis: { y: false }` | 隐藏数值轴，仅保留类别标签 |
| 图例位置 | `legend: { color: { position: 'right' } }` | |

### 图表标题与组件文字样式

完整示例见 [theme.ts](../examples/bullet/theme.ts):

```ts-snippet
title: {
  title: '指标达成情况分析',
  subtitle: '单位：%',
  align: 'left',
  titleFontSize: 16,
  titleFill: '#1d1d1d',
  subtitleFontSize: 12,
  subtitleFill: '#8c8c8c',
},
```

组件文字样式命名规律：`titleXxx`（轴标题）、`labelXxx`（轴刻度标签）、`itemLabelXxx`（图例项文字）——如 `axis.y.titleFill`、`axis.x.labelFontSize`、`legend.color.itemLabelFill`。

### 内置主题

`theme: 'light' | 'dark' | 'classic' | 'classicDark' | 'academy'`，一行切换整体配色。暗色场景用 `'classicDark'`，坐标轴、图例、标题的文字颜色自动适配，无需逐个设置。

数据标签与 tooltip 格式化，完整示例见 [with-label.ts](../examples/bullet/with-label.ts):

```ts-snippet
labels: [{ text: 'measure', position: 'end', style: { fontSize: 10 } }],
tooltip: {
  title: 'category',
  items: [{ channel: 'y', name: '实际值', valueFormatter: (v) => `${v} 单位` },
    { channel: 'y2', name: '目标值', valueFormatter: (v) => `${v} 单位` }],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `.position('category*measure')` | `.encode('x', 'category').encode('y', 'measure')` |
| `import { Bullet } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` + `type: 'interval'` |
| `new Bullet('container', { ... })` | `new Chart({ container })` + `chart.options(spec)` |
| `targetField: 'target'`（v2 配置） | 通过 `encode` 或 `state` 配置目标样式 |
| `rangeField: 'range'`（v2 配置） | 通过数据字段直接映射 `color` 通道实现 |
| `chart.source(data)`（v4） | `chart.options({ data })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/bullet/basic.ts) | 最简单个指标的实际值 vs 目标值 | `type: 'interval'` + `encode: { x, y, y2, color }` |
| [multi-indicator.ts](../examples/bullet/multi-indicator.ts) | 多指标并列展示，一目了然达成情况 | `type: 'interval'` + 多类别数据 |
| [ranges.ts](../examples/bullet/ranges.ts) | 背景添加 Poor/Fair/Good/Great 定性区间 | `scale.color.range` 四段色 + `encode.color` |
| [progress.ts](../examples/bullet/progress.ts) | measure bar 显示已完成比例，留白显示未完成 | `y2` 编码控制 bar 长度 |
| [vertical.ts](../examples/bullet/vertical.ts) | 纵向排列的子弹图，适合长类别名称 | x/y 轴互换 |
| [custom-style.ts](../examples/bullet/custom-style.ts) | 多指标 + 品牌视觉定制 | `scale.color.range`、`style.lineWidth`、`axis.title` |
| [with-label.ts](../examples/bullet/with-label.ts) | 数据标签展示实际/目标数值、提示格式化 | `labels` + `tooltip.items` |
| [theme.ts](../examples/bullet/theme.ts) | 标题与组件文字样式、内置主题 | `title`（对象）、`theme: 'classicDark'` |
| [compare.ts](../examples/bullet/compare.ts) | 多组对比，展示不同类别的达成差异 | 多组 interval 叠加对比 |