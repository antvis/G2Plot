# Radial Bar 玉珏图

> 组件用途：在环形轨道上用弧长表达数值，用角度区分分类，适合在紧凑空间里对比同量纲的多个分类。

## 何时使用

- 同量纲分类对比：各渠道订单量、各区域销售额、各服务 QPS
- 周期性/循环性分类：一天内各时段请求量、一周各天活跃度
- 需要视觉重心集中、空间紧凑的场景：大屏指标卡、仪表盘页头
- 分类数量适中（5～12 个），且希望弱化排序、强调各自大小

## 何时不用

- 表达占比/构成（各部分之和为 100%）→ 用 pie 饼图（theta 坐标系）
- 精确比较相邻数值差异 → 用 column 柱状图或 bar 条形图，弧长比长度更难估读
- 分类超过 12～15 个 → 环带过窄，改用 bar 条形图或先做 Top-N 聚合
- 两个量级不同的指标同屏 → 用 dual-axes 双轴图
- 时间趋势（连续变化）→ 用 line 折线图

## 数据要求

- 长表数据，每行一个分类，见 [数据模式](../references/data-patterns.md)
- `x` 字段：分类字符串（渠道、区域、服务名），**不要**传数值或时间戳
- `y` 字段：数值（number），字符串数字先 `Number()` 转换
- 数值需为同量纲（同一单位），否则弧长失去可比性
- 分类顺序会按数据顺序沿圆周排布，若要固定顺序，先对数据排序或用 `scale.x.domain`

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

const data = [
  { channel: 'App', orders: 1860 },
  { channel: '小程序', orders: 1420 },
  { channel: 'H5', orders: 980 },
  { channel: 'Web', orders: 760 },
  { channel: '线下门店', orders: 540 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'channel', y: 'orders', color: 'channel' },
  coordinate: { type: 'polar', innerRadius: 0.35 },
  legend: false,
});

chart.render();
```

要点：`type` 仍是 `'interval'`，玉珏图由 `coordinate: { type: 'polar', innerRadius }` 决定；`innerRadius` 必须大于 0，否则会退化成饼图/玫瑰图。

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 圆角环带 | `style: { radius: 6 }` + 更大的 `innerRadius` | [rounded.ts](../examples/radial-bar/rounded.ts) |
| 外圈数值标签 | `labels: [{ text: 'y 字段', position: 'outside' }]` | [with-label.ts](../examples/radial-bar/with-label.ts) |
| 半圆环带 | `coordinate` 增加 `startAngle` / `endAngle` | [half-circle.ts](../examples/radial-bar/half-circle.ts) |
| 品牌配色与标题 | `scale.color.range`、`title`（对象）、`axis.y.title` | [custom-style.ts](../examples/radial-bar/custom-style.ts) |
| 暗色大屏 | `type: 'view'` + `theme: 'classicDark'` + `style: { viewFill }` | [dark-theme.ts](../examples/radial-bar/dark-theme.ts) |

关闭径向网格线的常用写法（避免网格穿过环带）：

```ts-snippet
axis: { x: { grid: false } },
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 中心孔大小 | `coordinate.innerRadius: 0.35` | `0`～`1`，占半径比例；玉珏图必须 > 0 |
| 环带起止角度 | `coordinate.startAngle` / `endAngle` | 默认 `-π/2` → `3π/2`（整圈）；半圆用 `-π/2` → `π/2` |
| 外径比例 | `coordinate.outerRadius: 0.95` | 留出外圈标签空间 |
| 柱形圆角 | `style: { radius: 4 }` | 也可用 `radiusTopLeft` / `radiusTopRight` 单独设置 |
| 分类调色板 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 按分类顺序固定颜色 |
| 半径轴标题 | `axis: { y: { title: '订单量（单）' } }` | 标注量纲，避免弧长含义不清 |
| 关闭角度轴网格 | `axis: { x: { grid: false } }` | 玉珏图常用，减少与环带的视觉冲突 |
| 关闭图例 | `legend: false` | 分类已由角度标签表达，图例通常冗余 |
| 图表标题 | `title: { title, subtitle, align }` | `title` 必须是对象，不能直接写字符串 |
| 内置主题 | `theme: 'light' \| 'dark' \| 'classic' \| 'classicDark' \| 'academy'` | 暗色场景用 `'classicDark'`，并配合 view 层 `style.viewFill` 提供深色画布 |

数据标签与提示格式化：

```ts-snippet
labels: [{ text: 'tasks', position: 'outside', style: { fontSize: 11, fill: '#555' } }],
tooltip: { title: 'stage', items: [{ channel: 'y', name: '任务数' }] },
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'radial-bar'` / `new RadialBar(...)`（G2Plot v2） | `type: 'interval'` + `coordinate: { type: 'polar', innerRadius }` |
| `innerRadius: 0.4` 写在 spec 顶层 | 写在 `coordinate: { type: 'polar', innerRadius: 0.4 }` 内 |
| `angleField: 'value'` / `radiusField: 'value'`（v2 配置） | `encode: { x: 'channel', y: 'value' }` |
| 用 `type: 'interval'` + `theta` 代替玉珏图 | `theta` 是饼/玫瑰图；玉珏图用 `polar` + `innerRadius > 0` |
| 以为玉珏图需要额外安装布局插件 | `polar` 由 `@antv/g2` 内置，无需 `@antv/g2-extension-plot` |
| 省略 `innerRadius` 导致渲染成饼图 | 显式设置 `innerRadius: 0.3` 及以上 |
| `legend: true` 同时保留角度标签，信息重复 | 分类已由 x 轴标签表达，用 `legend: false` |
| `chart.coordinate('polar')`（v4 链式） | `chart.options({ coordinate: { type: 'polar' } })` |
| 只设 `theme: 'classicDark'` 就以为画布变暗 | 主题只改文字与网格颜色；画布背景需用 `type: 'view'` 包一层并设 `style: { viewFill: '#0f172a' }` |
| 分类数过多导致环带过窄、标签重叠 | 先 Top-N 聚合，或改用 bar 条形图 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/radial-bar/basic.ts) | 各渠道订单量对比，最简起步 | `coordinate: { type: 'polar', innerRadius: 0.35 }`、`legend: false` |
| [rounded.ts](../examples/radial-bar/rounded.ts) | 大屏指标分布，圆角弱化硬边 | `innerRadius: 0.45`、`style: { radius: 6 }`、`axis.x.grid: false` |
| [with-label.ts](../examples/radial-bar/with-label.ts) | 环带外侧直接标注数值 | `labels`（`position: 'outside'`）、`tooltip.items` |
| [half-circle.ts](../examples/radial-bar/half-circle.ts) | 窄屏/页头，半圆紧凑布局 | `startAngle: -π/2`、`endAngle: π/2` |
| [custom-style.ts](../examples/radial-bar/custom-style.ts) | 品牌配色 + 标题 + 量纲标注 | `scale.color.range`、`title`（对象）、`axis.y.title` |
| [dark-theme.ts](../examples/radial-bar/dark-theme.ts) | 监控大屏暗色模式 | `type: 'view'` + `theme: 'classicDark'` + `style: { viewFill: '#0f172a' }` |