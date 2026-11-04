# Error-bar 误差棒图

> 组件用途：展示数值的变异性或不确定性，如标准误、置信区间，通常与折线或柱状图配合使用。

## 何时使用

- **展示统计指标的变异性**：标准差、标准误、置信区间（Confidence Interval）
- **科学实验结果展示**：实验数据的误差范围、测量不确定性
- **质量控制**：过程能力指标的变异展示、批次间差异
- **与趋势图配合**：在折线图上标记数据点的误差范围，同时关注整体走势

## 何时不用

- 如果只关心数值的绝对大小或排序，不需要展示变异性 → 用 `line` 普通折线图
- 数据本身没有误差或变异概念 → 误差棒无意义，直接用 `line` 或 `column`
- 类别间纯数值对比且不关心分布 → 用 `column` 柱状图

## 数据要求

- **长表数据**，每行一个数据点，见 [数据模式](../references/data-patterns.md)
- `x` 字段：类别字符串或时间字符串（`'2026-01'`）；用于误差棒的水平定位
- `y` 字段：主/均值数值（number）；误差棒的中心点
- `y0` 字段：下界/下误差数值（number）；`y` - 下误差范围
- `y1` 字段：上界/上误差数值（number）；`y` + 上误差范围
- 当仅需要**对称误差**时，可使用单一 `error` 字段表示相对误差幅度，G2 会自动计算 `y0 = y - error`、`y1 = y + error`
- 数值字段必须是 `number` 类型，字符串数字需先 `Number()` 转换

## 基础实现（G2 v5）

误差棒图使用 `type: 'interval'` 标记类型，通过 `encode` 将 `y`（中心值）、`y0`（下界）和 `y1`（上界）映射到视觉通道：

```ts
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', value: 100, error: 10 },
  { month: 'Feb', value: 200, error: 15 },
  { month: 'Mar', value: 150, error: 12 },
  { month: 'Apr', value: 280, error: 20 },
  { month: 'May', value: 220, error: 18 },
  { month: 'Jun', value: 350, error: 25 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'month',
    y: 'value',
    y0: 'value - error', // 或预先计算好的下界
    y1: 'value + error', // 或预先计算好的上界
  },
  style: {
    fill: '#5B8FF9',
    stroke: '#5B8FF9',
  },
});

chart.render();
```

**对称误差快捷写法**：若数据字段含 `error`（相对误差），可直接使用：

```ts
encode: {
  x: 'month',
  y: 'value',
  error, // 对称误差幅度，G2 会自动推导 y0/y1
},
```

G2 会将 `error` 自动转换为 `y0: d => d.value - d.error`、`y1: d => d.value + d.error`。

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多系列 | `encode` 增加 `color: 'series'` | [multi-series.ts](../examples/error-bar/multi-series.ts) |
| 带数据标签 | `labels: [{ text: 'value', position: 'top' }]` | [with-label.ts](../examples/error-bar/with-label.ts) |
| 可逆/非对称误差 | 使用独立 `y0Error` / `y1Error` 字段表示不同下上界 | [asymmetric.ts](../examples/error-bar/asymmetric.ts) |
| 误差棒颜色自定义 | `style: { fill: '#ff5555' }` 与 `color` 通道分组 | [style-variant.ts](../examples/error-bar/style-variant.ts) |

### 多系列核心差异（数据需含 `series` 字段）

```ts
chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'month',
    y: 'value',
    y0: 'y0',
    y1: 'y1',
    color: 'series',
  },
});
```

## 样式自定义

常用视觉定制项（以下写法均经 `@antv/g2` ^5 类型校验），完整示例见 [style-variant.ts](../examples/error-bar/style-variant.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 误差棒颜色 | `style: { fill: '#5B8FF9' }` | 单色填充色 |
| 多系列颜色 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 按系列值序着色 |
| 线宽 | `style: { lineWidth: 3 }` | 误差棒边框线宽 |
| 虚线 | `style: { lineDash: [6, 4] }` | 虚线效果 |
| 透明度 | `style: { fillOpacity: 0.3 }` | 填充透明度，常用于展示分布密度 |
| 圆角 | `style: { radius: 2 }` | 矩形端角圆角 |
| 坐标轴标题 | `axis: { x: { title: '月份' } }` | y 轴同理 |
| 关闭图例 | `legend: false` | |
| 关闭坐标轴 | `axis: { x: false }` | |

### 图表标题与组件文字样式

完整示例见 [theme.ts](../examples/error-bar/theme.ts)：

```ts
title: {
  title: '月度指标与误差范围',
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

数据标签与 tooltip 格式化，完整示例见 [with-label.ts](../examples/error-bar/with-label.ts)：

```ts
labels: [{ text: 'value', position: 'top', style: { fontSize: 10 } }],
tooltip: {
  title: 'month',
  items: [{ channel: 'y', name: '均值', valueFormatter: (v) => `${v} ± ${v * 0.1}` }],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'error-bar'`（不存在的 mark 类型） | `type: 'interval'` + `encode y0/y1` 实现误差棒 |
| `import { ErrorBar } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` + `type: 'interval'` |
| `new ErrorBar('container', {...})`（G2Plot v2 写法） | `new Chart({ container })` + `type: 'interval'` |
| `.position('y*error')`（v4 链式写法） | `.encode('y', 'value').encode('y0', 'lower').encode('y1', 'upper')` |
| `errorField: 'error'`（v2 配置） | `encode: { error }`（v5 通过 interval mark 实现） |
| `chart.source(data)`（v4） | `chart.options({ data })` |
| 将 `error` 当作普通 `y` 字段绘制 | 必须同时配 `y0`/`y1` 或使用 `error` 通道，否则只绘制折线不显示误差范围 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/error-bar/basic.ts) | 单系列误差棒，最简起步 | `type: 'interval'` + `encode: { x, y, y0, y1 }` |
| [multi-series.ts](../examples/error-bar/multi-series.ts) | 多系列误差棒对比 | `encode: { color: 'series' }` + `type: 'interval'` |
| [asymmetric.ts](../examples/error-bar/asymmetric.ts) | 非对称下上界误差 | `y0Error` / `y1Error` 独立字段 |
| [with-label.ts](../examples/error-bar/with-label.ts) | 误差棒 + 数据标签同显 | `labels` + `type: 'interval'` |
| [style-variant.ts](../examples/error-bar/style-variant.ts) | 多系列 + 品牌视觉定制 | `scale.color.range`、`style.fillOpacity`、`axis.title` |