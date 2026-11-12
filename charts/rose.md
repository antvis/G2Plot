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
- `product` 字段：类别字符串，显式映射到 `encode.x`，在极坐标中决定角度位置
- `value` 字段：数值（number），显式映射到 `encode.y`，决定花瓣半径
- `series` 字段（多系列时）：系列字符串，映射到 `encode.color`；布局另由 `dodgeX` 或 `stackY` 决定

## 基础实现（G2 v5）

G2 v5 没有独立的 rose mark。玫瑰图由 `interval` 与 `polar` 组合实现：`x` 映射类别角度，`y` 映射数值半径，`color` 按类别着色。

```ts
/**
 * 基础玫瑰图
 * 场景：比较不同产品线的销售量，花瓣等角分布，半径表示数值大小
 * 要点：interval + polar；encode.x 显式映射类别，encode.y 映射数值
 */
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
  type: 'interval',
  data,
  coordinate: { type: 'polar' },
  encode: { x: 'product', y: 'value', color: 'product' },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 分组多系列 | `encode.color` 映射 `series` + `transform` 使用 `dodgeX` | [multi-series.ts](../examples/rose/multi-series.ts) |
| 堆叠多系列 | `encode.color` 映射 `series` + `transform` 使用 `stackY` | [stacked.ts](../examples/rose/stacked.ts) |
| 环形玫瑰图 | `coordinate` 增加 `innerRadius` | [with-label.ts](../examples/rose/with-label.ts) |
| 数据标签与 tooltip | `labels` + `tooltip.items` 使用 `field` 指定原始字段 | [with-label.ts](../examples/rose/with-label.ts) |
| 主题深浅 | `theme: 'dark'` / `theme: 'light'` | - |

### 多系列核心差异（数据需含 `series` 字段）

`color` 只负责颜色编码，不会自动产生分组或堆叠布局。分组用于比较各系列绝对值，堆叠用于比较总量及其构成。

分组布局：

```ts-snippet
chart.options({
  type: 'interval',
  data,
  coordinate: { type: 'polar' },
  encode: { x: 'product', y: 'value', color: 'series' },
  transform: [{ type: 'dodgeX' }],
});
```

堆叠布局：

```ts-snippet
chart.options({
  type: 'interval',
  data,
  coordinate: { type: 'polar' },
  encode: { x: 'product', y: 'value', color: 'series' },
  transform: [{ type: 'stackY' }],
});
```

## 样式自定义

常用视觉定制项：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 色阶 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 多系列按系列值序着色 |
| 花瓣颜色 | `style: { fill: '#5B8FF9' }` | 固定单系列颜色 |
| 线宽 | `style: { lineWidth: 2 }` | 花瓣边线粗细 |
| 虚线 | `style: { lineDash: [4, 2] }` | 花瓣边线虚线 |
| 花瓣圆角 | `style: { radius: 3 }` | 控制花瓣圆角 |
| 坐标轴标题 | `axis: { x: { title: '类别' } }` | y 轴同理 |
| 关闭图例 | `legend: false` | |
| 内置主题 | `theme: 'dark'` | 暗色场景自适配文字颜色 |

### 组件文字样式命名规律

`titleXxx`（标题）、`labelXxx`（轴标签）、`itemLabelXxx`（图例项文字）——如 `axis.x.titleFill`、`axis.y.labelFontSize`、`legend.color.itemLabelFill`。

### 内置主题

`theme: 'light' | 'dark' | 'classic' | 'classicDark'`，一行切换整体配色。暗色场景用 `'classicDark'`，坐标轴、图例、标题的文字颜色自动适配，无需逐个设置。

### 环形、数据标签与 tooltip

`innerRadius` 控制中心内孔，`labels` 在花瓣外侧展示数值文本；完整示例见 [with-label.ts](../examples/rose/with-label.ts)：

```ts-snippet
chart.options({
  type: 'interval',
  data,
  coordinate: { type: 'polar', innerRadius: 0.25 },
  encode: { x: 'product', y: 'value', color: 'product' },
  labels: [{ text: 'value', position: 'outside', style: { fontSize: 10 } }],
  tooltip: {
    title: 'product',
    items: [{ field: 'value', name: '数值', valueFormatter: (v) => `${v}` }],
  },
});
```

## 易错点

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| 使用 G2 v5 不存在的 `rose` mark | `type: 'interval'` + `coordinate: { type: 'polar' }` |
| `encode: { value: 'value' }`，依赖类别自动映射 | 显式设置 `x: 'product'`、`y: 'value'`、`color: 'product'`；x 决定角度，y 决定半径 |
| 用 `theta` 实现玫瑰图 | 玫瑰图用 `polar`；`theta` 配合 `stackY` 用于饼图 |
| 多系列只设置 `color: 'series'`，期待自动分组 | `color` 只负责分色；分组加 `dodgeX`，堆叠加 `stackY` |
| 分组与堆叠混用 transform | 比较单系列绝对值只用 `dodgeX`；比较总量与构成只用 `stackY` |
| 把 `innerRadius` 放在 mark 顶层 | 放入 `coordinate: { type: 'polar', innerRadius: 0.25 }` |

通用 API 迁移对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/rose/basic.ts) | 单系列类别比较，最简起步 | `interval` + `polar` + `encode: { x, y, color }` |
| [multi-series.ts](../examples/rose/multi-series.ts) | 同类别下分组比较各系列绝对值 | `encode.color` + `transform: [{ type: 'dodgeX' }]` |
| [stacked.ts](../examples/rose/stacked.ts) | 各类别总量对比与系列构成 | `encode.color` + `transform: [{ type: 'stackY' }]` |
| [with-label.ts](../examples/rose/with-label.ts) | 环形玫瑰图展示外侧数值标签与格式化提示 | `innerRadius` + `labels` + `tooltip.items.field` |
