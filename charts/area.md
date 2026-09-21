# Area 面积图

> 组件用途：在折线基础上填充线下区域，同时表达趋势与累积量级。

## 何时使用

- 趋势 + 量感：累计访问量、库存水位、营收规模走势
- 多系列总量与构成：各渠道流量随时间的堆叠占比
- 数据点连续（通常是时间），关注整体规模而非单点精确值

## 何时不用

- 只关心精确走势、不关心量级 → 用 line 折线图（视觉更轻）
- 多系列精确对比 → 用多系列 line（面积互相遮挡）
- 无序类别对比 → 用 column 柱状图

## 数据要求

- 长表数据，每行一个数据点，见 [数据模式](../references/data-patterns.md)
- `x` 字段：时间字符串或有序类别
- `y` 字段：数值（number）
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
  autoFit: true,
});

chart.options({
  type: 'area',
  data,
  encode: { x: 'month', y: 'value' },
  style: { fillOpacity: 0.3 },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 堆叠面积图 | `encode` 加 `color` + `transform: [{ type: 'stackY' }]` | [stacked.ts](../examples/area/stacked.ts) |
| 渐变填充 | `style.fill` 写 CSS linear-gradient 字符串 | [gradient.ts](../examples/area/gradient.ts) |
| 面积 + 折线 | `type: 'view'`，children 叠加 area 与 line | [area-line.ts](../examples/area/area-line.ts) |
| 平滑面积 | `encode` 增加 `shape: 'smooth'` | 见 [gradient.ts](../examples/area/gradient.ts) |

堆叠面积核心差异：

```ts-snippet
chart.options({
  type: 'area',
  data,
  encode: { x: 'month', y: 'value', color: 'channel' },
  transform: [{ type: 'stackY' }], // 多系列面积必须堆叠，否则互相遮挡
});
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 填充透明度 | `style: { fillOpacity: 0.3 }` | 单系列建议 0.2~0.4，堆叠建议 0.6+ |
| 渐变填充 | `style: { fill: 'linear-gradient(180deg, ...)' }` | CSS 渐变字符串，垂直方向用 `180deg`，见 [gradient.ts](../examples/area/gradient.ts) |
| 系列调色板 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 堆叠多系列着色 |
| 平滑曲线 | `encode: { shape: 'smooth' }` | 弱化单点波动 |
| 断点连接 | `style: { connect: true, connectStroke: '#aaa' }` | 数据含 `null` 时默认断开（`connect: false`）；连接段样式需配 `connectStroke` 等才可见 |

坐标轴标题、图例、主题等通用定制见 [line.md 样式自定义](./line.md#样式自定义)。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| 多系列面积不加 `stackY` | `transform: [{ type: 'stackY' }]`，否则系列互相遮挡 |
| 在 area 上用 `style.stroke` 描边 | 描边会包裹整个区域；要顶部边线用 view 叠加 line |
| 渐变写 `linear-gradient(90deg, ...)` | 垂直渐变用 `180deg`（从上到下）；`90deg` 是从左到右，见 [gradient.ts](../examples/area/gradient.ts) |
| 用 `gradient: true` 做单系列渐变 | 单系列垂直渐变在 `style.fill` 写 CSS 字符串；`gradient: true` 是系列值多段渐变 |
| `connectNulls: true`（属性不存在，运行白屏） | `style: { connect: true, connectStroke: '#aaa' }`；默认 `connect: false` 在 `null` 处断开 |
| `new Area('container', {...})`（G2Plot v2） | `new Chart({ container })` + `type: 'area'` |
| `areaStyle: {...}`（v2 配置） | `style: { fill, fillOpacity }` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/area/basic.ts) | 单系列趋势 + 量感，最简起步 | `type: 'area'`、`style.fillOpacity` |
| [stacked.ts](../examples/area/stacked.ts) | 多系列总量与构成 | `encode.color` + `transform: [{ type: 'stackY' }]` |
| [gradient.ts](../examples/area/gradient.ts) | 大屏/落地页视觉质感 | `style.fill` 渐变、`shape: 'smooth'` |
| [area-line.ts](../examples/area/area-line.ts) | 量感背景 + 精确走势线 | `type: 'view'` + area/line children |
