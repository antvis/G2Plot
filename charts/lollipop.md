# Lollipop 棒棒糖图

> 组件用途：用「细茎 + 端点」替代实心柱子做类别数值对比，视觉更轻，焦点落在数值顶点。

## 何时使用

- 类别数值对比（5~15 项）：各渠道订单量、各城市活跃用户、各部门人数
- 排行榜 / Top N：配合排序与数值标签，一眼看出名次与差距
- 需要突出「数值点」而非「面积」：柱子太高会压满画面，棒棒糖留白更多
- 两个指标同类别对比（实际 vs 目标）：一条茎连接两个端点即哑铃图

## 何时不用

- 类别很多（> 20）或需要比较总量/面积 → 用 column 柱状图或 bar 条形图
- 堆叠构成、占比 → 用 pie 饼图，或 column + `transform: [{ type: 'stackY' }]`（`link` 不支持堆叠）
- 连续时间趋势 → 用 line 折线图，点太密时棒棒糖的茎会糊成一片
- 数值带负值、需要正负分向 → 用 column 柱状图，跨零轴的茎可读性差

## 数据要求

- 长表数据，每行一个类别，见 [数据模式](../references/data-patterns.md)
- `category` 字段：类别字符串（渠道名、城市名、部门名）
- `value` 字段：数值（number），字符串数字先 `Number()` 转换
- `baseline` 字段：茎的起点，固定为 `0`（G2 没有「从 0 起画」的隐式能力，需显式给字段）
- 两端对比（哑铃图）时改为两个数值字段，如 `actual` / `target`，无需 `baseline`

## 基础实现（G2 v5）

G2 v5 没有 `lollipop` mark：它是一个组合图形 = `type: 'view'` 下叠加 `link`（茎）+ `point`（糖头）。

```ts
import { Chart } from '@antv/g2';

/**
 * 基础棒棒糖图（Lollipop）
 * 场景：5~12 个类别的数值对比（各渠道订单量、各城市活跃用户数），
 *       希望比柱状图更轻量、视觉焦点落在数值顶点上
 * 要点：view 组合 link（茎）+ point（糖头）；link 的 encode.x / y 必须传
 *       [起点字段, 终点字段] 数组，单字段只会画出一个端点；
 *       baseline 字段固定为 0，是茎的起点，也让 y 轴从 0 开始
 */
const data = [
  { channel: '自然搜索', orders: 4820, baseline: 0 },
  { channel: '信息流广告', orders: 3610, baseline: 0 },
  { channel: '社交媒体', orders: 2940, baseline: 0 },
  { channel: '邮件营销', orders: 1260, baseline: 0 },
  { channel: '线下活动', orders: 870, baseline: 0 },
  { channel: '合作渠道', orders: 430, baseline: 0 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      // 茎：从 baseline(0) 连到 orders
      type: 'link',
      encode: { x: ['channel', 'channel'], y: ['baseline', 'orders'] },
      style: { stroke: '#5B8FF9', lineWidth: 2 },
      tooltip: false,
    },
    {
      // 糖头：数值顶点，position 决定视觉焦点
      type: 'point',
      encode: { x: 'channel', y: 'orders' },
      style: { r: 5, fill: '#5B8FF9', stroke: '#fff', lineWidth: 2 },
    },
  ],
  axis: {
    x: { title: '获客渠道' },
    y: { title: '订单量（单）' },
  },
  tooltip: {
    title: 'channel',
    items: [{ channel: 'y', name: '订单量', valueFormatter: (v) => `${v} 单` }],
  },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 横向棒棒糖 | 数值放 x 通道、类别放 y 通道 | [horizontal.ts](../examples/lollipop/horizontal.ts) |
| 排序 + 数值标签 | 数据侧 `sort`，`point` 上加 `labels` | [sorted-label.ts](../examples/lollipop/sorted-label.ts) |
| 哑铃图（实际 vs 目标） | 一条 link 连两个数值字段 + 两个 point | [dumbbell.ts](../examples/lollipop/dumbbell.ts) |

横向核心差异（类别名长时避免 x 轴标签重叠）：

```ts-snippet
children: [
  { type: 'link', encode: { x: ['baseline', 'headcount'], y: ['department', 'department'] } },
  { type: 'point', encode: { x: 'headcount', y: 'department' } },
],
```

哑铃图核心差异（茎连接两个数值端点，两点各配一个颜色）：

```ts-snippet
children: [
  { type: 'link', encode: { x: ['region', 'region'], y: ['target', 'actual'] } },
  { type: 'point', encode: { x: 'region', y: 'actual' }, style: { fill: '#5B8FF9' } },
  { type: 'point', encode: { x: 'region', y: 'target' }, style: { fill: '#FF9845' } },
],
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 茎颜色 | `style: { stroke: '#5B8FF9' }` | `link` 的颜色通道走 `stroke`，不是 `fill` |
| 茎粗细 | `style: { lineWidth: 2 }` | 1~2 最轻，哑铃图可加粗到 4 |
| 茎虚线 | `style: { lineDash: [4, 4] }` | 对比基准或弱化某些类别 |
| 茎半透明 | `style: { strokeOpacity: 0.6 }` | 多类别时降低视觉噪音 |
| 糖头大小 | `style: { r: 5 }` | `point` 的半径（px）；`r` 写在 `style` 里，不是 `encode` |
| 糖头填充 | `style: { fill: '#5B8FF9' }` | `point` 默认是空心圆，想要实心点必须显式给 `fill` |
| 糖头描边 | `style: { stroke: '#fff', lineWidth: 2 }` | 白色描边让端点从茎上「浮」起来 |
| 数值标签 | `labels: [{ text: 'value', position: 'top' }]` | 定位相对糖头；横向图用 `'right'` |
| 坐标轴标题 | `axis: { x: { title: '渠道' } }` | y 轴同理 |
| 图例位置 | `legend: { color: { position: 'top' } }` | 仅多系列/哑铃图需要，单系列可 `legend: false` |
| 内置主题 | `theme: 'classicDark'` | `'light'` / `'dark'` / `'classic'` / `'classicDark'` / `'academy'` |

完整写法见 [sorted-label.ts](../examples/lollipop/sorted-label.ts)（标签 + tooltip 格式化）与 [dumbbell.ts](../examples/lollipop/dumbbell.ts)（双色端点）。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'lollipop'`（G2 v5 无此 mark，白屏） | `type: 'view'` + children 里的 `link` + `point` |
| `link` 的 `encode.x` 传单字段 `'channel'` | 传数组 `['channel', 'channel']`；`y` 同理 `['baseline', 'orders']`，单字段只连一端 |
| 用极细的 `interval`（`style: { size: 1 }`）冒充茎 | 用 `link`：宽度不随数据量变化，起点终点由通道直接决定 |
| `link` 用 `style: { fill: '#5B8FF9' }` 上色（线段无填充，看不到颜色） | 线段用 `style: { stroke: '#5B8FF9' }` |
| `point` 只给 `fill` 却仍是空心圆 | `point` 默认 shape 是空心圆（颜色走 `stroke`）；要实心点显式写 `style: { fill }`，或 `encode: { shape: 'point' }` |
| 茎的起点直接写 `0` 字面量（`encode.y: ['0', 'orders']`，字段 '0' 不存在） | 数据里加 `baseline: 0` 字段，`encode.y: ['baseline', 'orders']` |
| 用 `transform: [{ type: 'stackY' }]` 堆叠棒棒糖 | `link` 不支持堆叠；需要构成对比改用 `interval` + `stackY` |
| `seriesField: 'series'`（G2Plot v2） | 多系列用 `encode: { color: 'series' }` |
| `new Lollipop('container', { xField, yField })`（v2） | `new Chart({ container, autoFit: true })` + `chart.options(spec)` |
| `.position('channel*orders')`（v4 链式） | `.encode('x', 'channel').encode('y', 'orders')` |
| 排序交给图例/坐标轴刻度 | 排序在数据侧完成（`[...data].sort(...)`），x 轴按数据出现顺序排列 |
| 值域不从 0 开始时直接比较茎长 | `baseline: 0` 已让 y 轴从 0 起；若业务要求非零起点，需在文案中说明 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/lollipop/basic.ts) | 渠道订单量对比，最简起步 | `view` + `link`（茎）+ `point`（糖头）、`baseline: 0` |
| [horizontal.ts](../examples/lollipop/horizontal.ts) | 部门人数，类别名长时横向排列 | 数值走 x、类别走 y；`link` 的 `x: ['baseline', 'headcount']` |
| [sorted-label.ts](../examples/lollipop/sorted-label.ts) | 文章阅读量排行榜 | 数据侧降序排序、`labels` 数值标签、tooltip `valueFormatter` |
| [dumbbell.ts](../examples/lollipop/dumbbell.ts) | 大区实际 vs 目标达成 | 一条 `link` 连两个数值字段 + 两个不同颜色的 `point` |
