# Tiny Column 迷你柱状图

> 组件用途：在 KPI 卡片、表格和列表等紧凑空间中，用一簇细小柱体展示有序数据的相对高低与波动。

## 何时使用

- 卡片或表格内联趋势：近 7/14/30 天访问量、订单量、销售额
- 有序离散数据的快速对比：关注峰谷、波动和相对幅度，而非坐标轴精确读数
- 正负值变化：每日净利润、现金流、同比增长量
- 空间有限，可隐藏坐标轴与图例，并保留 tooltip 按需查看数值

## 何时不用

- 需要完整坐标轴、刻度或精确比较 → 用 column 柱状图
- 数据点密集且关注连续走势 → 用 line 折线图或 area 面积图
- 无序类别较多、类别名称较长 → 用 bar 条形图
- 多系列分组或堆叠对比 → 用 column 柱状图，迷你形态不提供足够阅读空间
- 占比与构成 → 用 pie 饼图

## 数据要求

- 长表数据，每行一个时间点或有序类别，见 [数据模式](../references/data-patterns.md)
- `x` 字段：时间字符串（`'2026-01-01'`）或有序类别；数据按业务顺序排列
- `y` 字段：数值（number）；字符串数字先 `Number()` 转换
- 通常使用 5～30 个数据点；过密时先聚合，不要依靠压缩柱宽硬塞
- 零值显式传 `0`；正负值场景保留原始正负号，不要取绝对值

## 基础实现（G2 v5）

迷你柱状图不是独立 mark：`type: 'interval'` 映射 `x/y`，再关闭坐标轴和图例即可。`autoFit` 负责适配容器，容器高度由页面 CSS 提供。

```ts
/**
 * 基础迷你柱状图
 * 场景：KPI 卡片等紧凑区域展示近 12 天访问量的相对高低与波动
 * 要点：interval + 隐藏 x/y 轴和图例；保留 tooltip 供按需读数
 */
import { Chart } from '@antv/g2';

const data = [
  { date: '2026-01-01', pageViews: 320 },
  { date: '2026-01-02', pageViews: 460 },
  { date: '2026-01-03', pageViews: 380 },
  { date: '2026-01-04', pageViews: 520 },
  { date: '2026-01-05', pageViews: 610 },
  { date: '2026-01-06', pageViews: 480 },
  { date: '2026-01-07', pageViews: 560 },
  { date: '2026-01-08', pageViews: 720 },
  { date: '2026-01-09', pageViews: 650 },
  { date: '2026-01-10', pageViews: 780 },
  { date: '2026-01-11', pageViews: 690 },
  { date: '2026-01-12', pageViews: 840 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'date', y: 'pageViews' },
  axis: { x: false, y: false },
  legend: false,
  style: { maxWidth: 12 },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 正负值着色 | `encode.color` 按数值返回盈亏类别，`scale.color` 固定类别颜色 | [positive-negative.ts](../examples/tiny-column/positive-negative.ts) |
| 品牌样式与提示 | `style.fill/radius/maxWidth` + `tooltip.items` | [custom-style.ts](../examples/tiny-column/custom-style.ts) |

正负值场景保留 `y` 的符号，颜色只负责表达方向：

```ts-snippet
encode: {
  x: 'tradingDay',
  y: 'netProfit',
  color: (d: { netProfit: number }) => (d.netProfit >= 0 ? '盈利' : '亏损'),
},
scale: {
  color: { domain: ['盈利', '亏损'], range: ['#5B8FF9', '#F4664A'] },
},
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 固定柱体颜色 | `style: { fill: '#5B8FF9' }` | 单系列固定色 |
| 条件着色 | `encode.color` 回调 + `scale.color.domain/range` | 适合盈亏、峰值高亮；显式 domain 可固定颜色顺序 |
| 最大柱宽 | `style: { maxWidth: 12 }` | 单位 px，避免少量柱体过宽 |
| 柱顶圆角 | `style: { radiusTopLeft: 2, radiusTopRight: 2 }` | 适合非负柱体 |
| 关闭坐标轴 | `axis: { x: false, y: false }` | 迷你柱状图的核心配置 |
| 关闭图例 | `legend: false` | 条件着色不需要图例时也关闭，节省空间 |
| 悬浮读数 | `tooltip: { title: 'date', items: [{ channel: 'y', name: '访问量' }] }` | 隐藏轴后按需补充精确值 |
| 格式化读数 | ``items: [{ channel: 'y', valueFormatter: (v) => `${v} 万元` }]`` | 可添加单位或千分位 |
| 关闭提示 | `tooltip: false` | 仅用于无需读数的纯装饰场景 |
| 多卡片同值域 | `scale: { y: { domain: [0, 200] } }` | 跨卡片比较时使用相同 domain，避免柱高误导 |

品牌色、圆角与 tooltip 的完整组合见 [custom-style.ts](../examples/tiny-column/custom-style.ts)。坐标轴、主题等通用配置见 [line.md 样式自定义](./line.md#样式自定义)，但迷你场景应谨慎重新开启组件，避免挤压绘图区。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `import { TinyColumn } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| `new TinyColumn('container', { xField, yField })` | `new Chart({ container, autoFit: true })` + `chart.options(spec)` |
| `type: 'tiny-column'` / `type: 'column'` | 使用 `type: 'interval'`，通过隐藏轴形成迷你柱状图 |
| `xField` / `yField`（G2Plot v2） | `encode: { x: 'date', y: 'pageViews' }` |
| `columnStyle: { fill: '#5B8FF9' }`（v2） | `style: { fill: '#5B8FF9' }` |
| `.position('date*pageViews')`（v4 链式） | 在 spec 的 `encode` 中显式映射 `x/y` |
| 只写 `axis: { x: false }` | 紧凑场景同时设置 `axis: { x: false, y: false }` |
| 为负值调用 `Math.abs()` 后再映射 | `y` 保留正负号，需要时用 `encode.color` 区分盈亏 |
| 自定义颜色数组传给 `scale.color.palette` | 数组传给 `scale.color.range`；`palette` 只接受调色板名称 |
| 手动设置 `padding` 或写死 `width/height` | 使用 `autoFit: true`，由容器 CSS 控制尺寸，保持默认自动 padding |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/tiny-column/basic.ts) | KPI 卡片展示近期访问量波动 | `type: 'interval'`、`axis: { x: false, y: false }`、`legend: false` |
| [positive-negative.ts](../examples/tiny-column/positive-negative.ts) | 紧凑展示每日净利润及盈亏方向 | `encode.color` 条件分类、`scale.color.domain/range`、带单位 tooltip |
| [custom-style.ts](../examples/tiny-column/custom-style.ts) | 品牌 KPI 卡片的配色、圆角和读数格式化 | `style.fill/radiusTopLeft/radiusTopRight/maxWidth`、`tooltip.items` |
