# Line 折线图

> 组件用途：展示连续变量（通常是时间）的变化趋势，支持多系列对比。

## 何时使用

- 时间序列趋势：股价、气温、销售额走势、PV/UV 变化
- 多系列趋势对比：多产品线营收、多城市气温
- 数据点较多（≥ 5 个）且关注整体走向而非单点数值

## 何时不用

- 无序类别间数值对比 → 用 column 柱状图
- 占比/构成 → 用 pie 饼图
- 两个数值变量的相关性 → 用 scatter 散点图
- 强调累积量/量级感 → 用 area 面积图

## 数据要求

- 长表数据，每行一个数据点，见 [数据模式](../references/data-patterns.md)
- `x` 字段：时间字符串（`'2026-01'`）或有序类别；**不要**预先格式化成展示文案
- `y` 字段：数值（number）；字符串数字先 `Number()` 转换
- `series` 字段（多系列时）：字符串，用于 `encode.color` 分组

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 150 },
  { month: 'Apr', value: 280 },
  { month: 'May', value: 220 },
  { month: 'Jun', value: 350 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true, // 宽度随容器自适应，避免坐标轴/图例被遮挡；不要手动设置 spec padding
  height: 360,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'month', y: 'value' },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多系列 | `encode` 增加 `color: 'series'` | [multi-series.ts](../examples/line/multi-series.ts) |
| 平滑曲线 | `encode` 增加 `shape: 'smooth'` | [smooth.ts](../examples/line/smooth.ts) |
| 阶梯线 | `shape: 'hvh'`（或 `'hv'` / `'vh'`） | [step.ts](../examples/line/step.ts) |
| 折线 + 数据点 | `type: 'view'`，children 叠加 line 与 point | [line-point.ts](../examples/line/line-point.ts) |
| 带数据标签 | `labels: [{ text: 'value', position: 'top' }]` | [with-label.ts](../examples/line/with-label.ts) |

多系列核心差异（数据需含 `series` 字段）：

```ts-snippet
chart.options({
  type: 'line',
  data,
  encode: { x: 'month', y: 'value', color: 'series' },
});
```

## 样式自定义

常用视觉定制项（以下写法均经 `@antv/g2` ^5 类型校验），完整示例见 [custom-style.ts](../examples/line/custom-style.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 系列调色板 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 多系列按系列值序着色 |
| 单系列颜色 | `style: { stroke: '#5B8FF9' }` | 固定线色 |
| 线宽 | `style: { lineWidth: 3 }` | |
| 虚线 | `style: { lineDash: [6, 4] }` | 数组为 实线/间隔 长度 |
| 坐标轴标题 | `axis: { x: { title: '月份' } }` | y 轴同理 |
| 图例位置 | `legend: { color: { position: 'top' } }` | `'top'` / `'bottom'` / `'left'` / `'right'` |
| 关闭图例 | `legend: false` | |
| 关闭坐标轴 | `axis: { x: false }` | |

数据标签与 tooltip 格式化，完整示例见 [with-label.ts](../examples/line/with-label.ts)：

```ts-snippet
labels: [{ text: 'value', position: 'top', style: { fontSize: 10 } }],
tooltip: {
  title: 'month',
  items: [{ channel: 'y', name: '销售额', valueFormatter: (v) => `${v} 万元` }],
},
```

折线叠加数据点（高频组合），完整示例见 [line-point.ts](../examples/line/line-point.ts)：

```ts-snippet
chart.options({
  type: 'view',
  data,
  children: [
    { type: 'line', encode: { x: 'month', y: 'value' } },
    { type: 'point', encode: { x: 'month', y: 'value' }, tooltip: false },
  ],
});
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `.position('month*value')` | `.encode('x', 'month').encode('y', 'value')` |
| `import { Line } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| `new Line('container', { xField, yField })` | `new Chart({ container })` + `chart.options(spec)` |
| `seriesField: 'series'`（v2 配置） | `encode: { color: 'series' }` |
| `smooth: true`（v2 配置） | `encode: { shape: 'smooth' }` |
| `.shape('smooth')`（v4 链式） | `encode: { shape: 'smooth' }` |
| `chart.source(data)`（v4） | `chart.options({ data })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/line/basic.ts) | 单系列趋势，最简起步 | `encode: { x, y }` |
| [multi-series.ts](../examples/line/multi-series.ts) | 多系列趋势对比 | `encode: { color: 'series' }` |
| [smooth.ts](../examples/line/smooth.ts) | 弱化单点波动、强调整体趋势 | `encode: { shape: 'smooth' }` |
| [step.ts](../examples/line/step.ts) | 离散跳变数据（价格、利率） | `encode: { shape: 'hvh' }` |
| [custom-style.ts](../examples/line/custom-style.ts) | 多系列 + 品牌视觉定制 | `scale.color.range`、`style.lineWidth/lineDash`、`axis.title`、`legend.position` |
| [line-point.ts](../examples/line/line-point.ts) | 趋势线同时标出每个数据点 | `type: 'view'` + line/point children |
| [with-label.ts](../examples/line/with-label.ts) | 数据点旁直接展示数值、提示格式化 | `labels`、`tooltip.items` |
