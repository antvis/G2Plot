# Rose 玫瑰图

> 组件用途：用于展示多类别数据的比较，通过圆形布局将每个类别作为一个“花瓣”，花瓣的半径或长度代表数值大小，适合展示各类别之间的相对大小关系。

## 何时使用

- 多类别数据比较：想直观展示不同类别（如季度、产品线、区域）的相对数值大小
- 相对规模分析：关注各类别之间的比例而非精确数值
- 类别较少（≤ 8 个）且类别名相对较短的情况

## 何时不用

- 精确数值对比 → 用 column 柱状图 或 bar 条形图
- 连续时间序列趋势 → 用 line 折线图
- 两个数值变量的相关性 → 用 scatter 散点图
- 类别较多（≥ 10 个）→ 视觉拥挤，建议使用排序后的 bar 图

## 数据要求

- 长表数据，每行一个数据点，见 [数据模式](../references/data-patterns.md)
- `product` 字段：类别字符串（如 '产品 A', '季度 1'）；rose 图的每个花瓣对应一个类别
- `value` 字段：数值（number），决定花瓣的半径/长度
- 玫瑰图会自动将类别环绕圆心均匀分布

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

const data = [
  { product: '产品A', value: 120 },
  { product: '产品B', value: 200 },
  { product: '产品C', value: 150 },
  { product: '产品D', value: 280 },
  { product: '产品E', value: 220 },
  { product: '产品F', value: 350 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'rose',
  data,
  encode: { value: 'value' },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多系列 | `encode` 增加 `color: 'series'`，支持按系列分组比较 | [multi-series.ts](../examples/rose/multi-series.ts) |
| 数据标签 | `labels: [{ text: 'value', position: 'outside' }]` | [with-label.ts](../examples/rose/with-label.ts) |
| 主题深浅 | `theme: 'dark'` / `theme: 'light'` | - |

### 多系列核心差异（数据需含 `series` 字段）

```ts-snippet
chart.options({
  type: 'rose',
  data,
  encode: { value: 'value', color: 'series' },
});
```

## 样式自定义

常用视觉定制项（以下写法均经 `@antv/g2` ^5 类型校验），完整示例见 [custom-style.ts](../examples/rose/custom-style.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 色阶 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 多系列按系列值序着色 |
| 花瓣颜色 | `style: { fill: '#5B8FF9' }` | 固定单系列颜色 |
| 线宽 | `style: { lineWidth: 2 }` | 花瓣边线粗细 |
| 虚线 | `style: { lineDash: [4, 2] }` | 花瓣边线虚线 |
| 花瓣圆角 | `style: { radius: 3 }` |  controls petal roundness |
| 坐标轴标题 | `axis: { x: { title: '类别' } }` | y 轴同理 |
| 关闭图例 | `legend: false` | |
| 内置主题 | `theme: 'dark'` | 暗色场景自适配文字颜色 |

### 组件文字样式命名规律

`titleXxx`（标题）、`labelXxx`（轴标签）、`itemLabelXxx`（图例项文字）——如 `axis.x.titleFill`、`axis.y.labelFontSize`、`legend.color.itemLabelFill`。

### 内置主题

`theme: 'light' | 'dark' | 'classic' | 'classicDark'`，一行切换整体配色。暗色场景用 `'classicDark'`，坐标轴、图例、标题的文字颜色自动适配，无需逐个设置。

数据标签与 tooltip 格式化，完整示例见 [with-label.ts](../examples/rose/with-label.ts)：

```ts-snippet
labels: [{ text: 'value', position: 'outside', style: { fontSize: 10 } }],
tooltip: {
  title: '产品',
  items: [{ channel: 'value', name: '数值', valueFormatter: (v) => `${v}` }],
},
```

花瓣叠加数据点（高频组合），完整示例见 [with-label.ts](../examples/rose/with-label.ts)：

```ts-snippet
chart.options({
  type: 'rose',
  data,
  encode: { value: 'value' },
  labels: [{ text: 'value', position: 'outside' }],
});
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `.position('category*value')` | `encode: { value: 'value' }`（category 由 rose mark 自动映射）|
| `import { Rose } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| `new Rose('container', { ... })` | `new Chart({ container })` + `chart.options(spec)` |
| `radiusField: 'value'`（v2 配置） | `encode: { value: 'value' }` |
| `encode: { category }`（v2/v4 写法） | `encode: { value: 'value' }`（v5 写法，类别由 rose mark 自动分布）|
| `chart.source(data)`（v4） | `chart.options({ data })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/rose/basic.ts) | 单系列基本起步，展示类别间比较 | `type: 'rose'` + `encode: { value: 'value' }`|
| [multi-series.ts](../examples/rose/multi-series.ts) | 多系列玫瑰图对比不同系列的类别分布 | `encode: { color: 'series' }` |
| [with-label.ts](../examples/rose/with-label.ts) | 数值标签展示在花瓣外侧，便于数值阅读 | `labels` + `tooltip` 格式化 |
| [custom-style.ts](../examples/rose/custom-style.ts) | 多系列 + 品牌视觉定制 | `scale.color.range`、`style.lineWidth`、`axis.title`、`legend.position` |