# Radial Bar 玉珏图（径向条形图）

> 组件用途：在极坐标下用同心圆弧的长度对比多个类别的数值，兼顾排名与整体观感。

## 何时使用

- 类别排名/对比（5~8 个类别）：渠道转化率、部门目标完成度、产品评分
- KPI 看板、大屏：环形造型节省横向空间，视觉记忆点强
- 数值同量纲且非负（百分比、分数、金额），需要固定基准对比
- 强调“完成度/达成率”：配合 `scale.y.domain` 固定 0~100，弧长即完成比例

## 何时不用

- 类别多（> 10）或类别名称长 → 用 bar 条形图，标签更好排布
- 需要精确比较细微差异 → 用 column / bar，直线长度比弧长更易读
- 展示整体构成（各块加起来 100%）→ 用 pie 饼图；玉珏图每环独立，不构成整体
- 时间序列趋势 → 用 line 折线图
- 数据含负值 → 用 bar 或发散条形图；弧长无法表达正负方向

## 数据要求

- 长表数据，每行一个类别，见 [数据模式](../references/data-patterns.md)
- `x` 字段：类别字符串（如 `channel`、`department`）
- `y` 字段：数值（number），必须非负；百分比统一用 0~1 或 0~100，并与 `scale.y.domain` 一致
- 数据顺序决定各环的排列顺序；排名场景先在渲染前对数据排序，不要依赖图例顺序
- 单指标多类别场景不要传多系列字段；多系列堆叠不是玉珏图的常规用法

## 基础实现（G2 v5）

玉珏图 = `type: 'interval'` + `coordinate: { type: 'radial' }`。在 radial 坐标系下，`y` 数值映射为圆弧角度，`x` 类别映射为同心环半径，因此弧越长数值越大。

```ts
import { Chart } from '@antv/g2';

/**
 * 基础玉珏图（径向条形图）
 * 场景：对比各获客渠道的转化率，用同心圆弧长度表达数值大小
 * 要点：interval + radial 坐标系；y 轴固定 0~1 映射百分比；隐藏坐标轴，用图例标识类别
 */
const data = [
  { channel: '自然搜索', conversionRate: 0.42 },
  { channel: '社交推荐', conversionRate: 0.68 },
  { channel: '广告投放', conversionRate: 0.35 },
  { channel: '邮件营销', conversionRate: 0.24 },
  { channel: '直接访问', conversionRate: 0.55 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'channel', y: 'conversionRate', color: 'channel' },
  coordinate: { type: 'radial', innerRadius: 0.25 },
  scale: { y: { domain: [0, 1] } },
  axis: {
    x: { title: false, label: false, tick: false, line: false },
    y: { title: false, label: false, tick: false, line: false, grid: false },
  },
  legend: { color: { position: 'right' } },
  tooltip: {
    title: 'channel',
    items: [
      {
        channel: 'y',
        name: '转化率',
        valueFormatter: (v) => `${(Number(v) * 100).toFixed(1)}%`,
      },
    ],
  },
  style: { radius: 4 },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 数值标签 | `labels` 的 `text` 回调拼单位，`position: 'outside'` 定位到弧末端 | [with-label.ts](../examples/radial-bar/with-label.ts) |
| 半圆造型 | `coordinate.startAngle / endAngle` 限定角度范围 | [semi-circle.ts](../examples/radial-bar/semi-circle.ts) |
| 自定义品牌色板 | `scale: { color: { range: [...] } }` | [semi-circle.ts](../examples/radial-bar/semi-circle.ts) |

半圆玉珏图核心差异（只画右半圆，中心留白更大）：

```ts-snippet
coordinate: {
  type: 'radial',
  innerRadius: 0.35,
  startAngle: -Math.PI / 2,
  endAngle: Math.PI / 2,
},
```

数值标签核心差异（`autoRotate: false` 让文字保持水平，避免沿弧旋转）：

```ts-snippet
labels: [
  {
    text: (d: { nps: number }) => `${d.nps} 分`,
    position: 'outside',
    autoRotate: false,
  },
],
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 中心留白 | `coordinate: { type: 'radial', innerRadius: 0.35 }` | 0~1 相对值；越大中心空洞越大，可放 HTML 中心文字 |
| 外圈留白 | `coordinate: { type: 'radial', outerRadius: 0.9 }` | 避免图例/标签贴边 |
| 角度范围 | `coordinate: { startAngle, endAngle }` | 默认 `-Math.PI/2` ~ `Math.PI*3/2`；半圆用 `-Math.PI/2` ~ `Math.PI/2` |
| 弧端圆角 | `style: { radius: 4 }` | 让每段圆弧两端变圆，数值小的时候更明显 |
| 类别色板 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 自定义颜色数组用 `range`，不要传给 `palette` |
| 固定数值范围 | `scale: { y: { domain: [0, 100] } }` | 保证所有弧从同一基准起算 |
| 图例位置 | `legend: { color: { position: 'top' } }` | `'top'` / `'bottom'` / `'left'` / `'right'`，或 `legend: false` 关闭 |
| 隐藏坐标轴 | `axis: { x: false, y: false }` | 玉珏图通常只留图例与标签 |
| 数值标签 | `labels: [{ text, position: 'outside', autoRotate: false }]` | 显示原始数值或格式化文案 |
| 主题 | `theme: 'classicDark'` | 大屏暗色场景，文字与网格自动适配 |

图表标题与 tooltip 格式化：

```ts-snippet
title: { title: '渠道转化率', subtitle: '统计周期：2026-10', align: 'left' },
tooltip: {
  title: 'channel',
  items: [{ channel: 'y', name: '转化率', valueFormatter: (v) => `${(Number(v) * 100).toFixed(1)}%` }],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'radial-bar'` / `type: 'radialBar'` | 无此 mark；用 `type: 'interval'` + `coordinate: { type: 'radial' }` |
| 把 `radial` 写进 `type` | `radial` 是坐标系：`coordinate: { type: 'radial' }` |
| 忘记 `coordinate` | 不加坐标系会渲染成普通直角坐标柱状图 |
| 用 `coordinate: { type: 'polar' }` 代替 `radial` | polar 得到的是玫瑰图/扇形，不是同心环的玉珏图 |
| `radius: 0.8, innerRadius: 0.2` 写在顶层（v2 配置） | 放进坐标系：`coordinate: { type: 'radial', innerRadius: 0.2 }` |
| `startAngle` / `maxAngle` 写在顶层（v4 配置） | 放进坐标系：`coordinate: { startAngle, endAngle }` |
| `seriesField: 'channel'`（v2 配置） | `encode: { color: 'channel' }` |
| `.coordinate('radial')`（v4 链式） | spec 中 `coordinate: { type: 'radial' }` |
| 百分比数据不固定 `domain` | 显式 `scale: { y: { domain: [0, 1] } }` 或 `[0, 100]`，否则自适应范围会夸大差异 |
| 用玉珏图表达正负增长 | 负值没有弧长方向；改用 bar 或发散条形图 |
| 类别超过 10 个仍用玉珏图 | 环太薄、不可读；改用 bar 条形图 |
| `new RadialBar('container', {...})`（G2Plot v2） | `new Chart({ container })` + `type: 'interval'` + radial |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/radial-bar/basic.ts) | 各渠道转化率对比，最简起步 | `type: 'interval'` + `coordinate.type: 'radial'`、`innerRadius: 0.25`、`scale.y.domain: [0, 1]` |
| [with-label.ts](../examples/radial-bar/with-label.ts) | 弧末端直接标出产品 NPS 分数 | `labels` text 回调 + `position: 'outside'` + `autoRotate: false` |
| [semi-circle.ts](../examples/radial-bar/semi-circle.ts) | 大屏半圆造型 + 品牌色板 | `startAngle` / `endAngle` 半圆、`scale.color.range`、`legend.position: 'top'` |
