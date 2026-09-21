# Column 柱状图

> 组件用途：纵向柱体对比各类别的数值大小，是类别对比的默认选择。

## 何时使用

- 类别数值对比：各产品销量、各部门人数、各城市 GDP
- 多系列类别对比：各季度多条产品线营收（分组）、总量与构成（堆叠）
- 类别数量适中（≤ 12 个），类别名较短

## 何时不用

- 类别名很长或类别很多 → 用 bar 条形图（横向更易读）
- 时间趋势 → 用 line 折线图
- 占比构成 → 用 pie 饼图

## 数据要求

- 长表数据，每行一个数据点，见 [数据模式](../references/data-patterns.md)
- `x` 字段：类别字符串
- `y` 字段：数值（number）
- `series` 字段（多系列时）：字符串，用于 `encode.color` 分组

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

const data = [
  { product: '手机', sales: 320 },
  { product: '平板', sales: 200 },
  { product: '耳机', sales: 150 },
  { product: '手表', sales: 280 },
  { product: '音箱', sales: 90 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'product', y: 'sales' },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 分组柱状图 | `encode` 加 `color` + `transform: [{ type: 'dodgeX' }]` | [grouped.ts](../examples/column/grouped.ts) |
| 堆叠柱状图 | `encode` 加 `color` + `transform: [{ type: 'stackY' }]` | [stacked.ts](../examples/column/stacked.ts) |
| 带数据标签 | `labels: [{ text, position: 'inside' }]`，text 回调自定义内容 | [with-label.ts](../examples/column/with-label.ts) |

分组 vs 堆叠的选择：分组（dodgeX）便于对比单系列绝对值，堆叠（stackY）便于对比总量与构成。

```ts-snippet
// 分组：并排
transform: [{ type: 'dodgeX' }],
// 堆叠：叠加
transform: [{ type: 'stackY' }],
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 柱体颜色 | `style: { fill: '#5B8FF9' }` | 单系列固定色 |
| 系列调色板 | `scale: { color: { range: [...] } }` | 多系列着色 |
| 圆角柱体 | `style: { radiusTopLeft: 4, radiusTopRight: 4 }` | |
| 柱宽 | `style: { maxWidth: 40 }` | 限制最大柱宽（px） |
| 数据标签 | `labels: [{ text: 'sales', position: 'inside' }]` | 放柱体中间用 `'inside'`；text 回调自定义内容，`style.dx/dy` 微调偏移 |

坐标轴标题、图例、主题等通用定制见 [line.md 样式自定义](./line.md#样式自定义)。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'column'` / `type: 'bar'` | G2 v5 统一为 `type: 'interval'` |
| 多系列不加 transform | 分组加 `dodgeX`，堆叠加 `stackY`，否则柱体重叠 |
| `transform: { type: 'stackY' }`（对象） | `transform: [{ type: 'stackY' }]`（数组） |
| `new Column('container', {...})`（G2Plot v2） | `new Chart({ container })` + `type: 'interval'` |
| `columnStyle: {...}`（v2 配置） | `style: { fill, radiusTopLeft }` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/column/basic.ts) | 单系列类别对比，最简起步 | `type: 'interval'`、`encode: { x, y }` |
| [grouped.ts](../examples/column/grouped.ts) | 多系列并排对比绝对值 | `encode.color` + `transform: [{ type: 'dodgeX' }]` |
| [stacked.ts](../examples/column/stacked.ts) | 总量对比 + 内部构成 | `encode.color` + `transform: [{ type: 'stackY' }]` |
| [with-label.ts](../examples/column/with-label.ts) | 报表直接读数 | `labels` inside + text 回调 + `tooltip.items` |
