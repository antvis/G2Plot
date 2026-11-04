# Jitter 抖动图

> 组件用途：将类别轴上的观测点随机错开，展示各类别下原始数据的分布，减少相同或相近数值造成的点重叠。

## 何时使用

- 分类观测分布：不同设备的加载耗时、各门店的顾客评分、各批次的零件误差
- 同一类别有多次观测，且相同或相近的数值导致散点重叠
- 既要观察集中趋势、离散程度和离群点，又要保留每个原始观测
- 与箱线图叠加，同时呈现统计摘要和原始数据

## 何时不用

- 两个数值变量的相关性 → 用 scatter 散点图，不要抖动精确数值位置
- 只需要中位数、四分位数等统计摘要 → 用 boxplot 箱线图
- 点极多且随机偏移后仍严重重叠 → 用 heatmap 密度热力图或先抽样
- 时间序列趋势 → 用 line 折线图
- 每类只有一个聚合值、只比较类别大小 → 用 column 柱状图

## 数据要求

- 长表数据，每行一个原始观测点，见 [数据模式](../references/data-patterns.md)
- 基础竖向布局：`x` 字段为类别字符串，`y` 字段为数值（number）
- 水平布局：`x` 字段为数值，`y` 字段为类别字符串
- `color` 字段（分组时）：类别字符串，用于 `encode.color`
- 不要预先按类别聚合成均值或计数，否则无法还原原始分布；字符串数字先 `Number()` 转换

## 基础实现（G2 v5）

竖向抖动图 = `type: 'point'` + `transform: [{ type: 'jitterX' }]`。只散开分类轴方向，保持数值轴上的精确读数。

```ts
import { Chart } from '@antv/g2';

const data = [
  { deviceType: '桌面端', loadTimeMs: 820 },
  { deviceType: '桌面端', loadTimeMs: 760 },
  { deviceType: '桌面端', loadTimeMs: 910 },
  { deviceType: '桌面端', loadTimeMs: 840 },
  { deviceType: '桌面端', loadTimeMs: 780 },
  { deviceType: '桌面端', loadTimeMs: 1020 },
  { deviceType: '桌面端', loadTimeMs: 860 },
  { deviceType: '桌面端', loadTimeMs: 790 },
  { deviceType: '移动端', loadTimeMs: 1180 },
  { deviceType: '移动端', loadTimeMs: 1320 },
  { deviceType: '移动端', loadTimeMs: 1250 },
  { deviceType: '移动端', loadTimeMs: 1480 },
  { deviceType: '移动端', loadTimeMs: 1210 },
  { deviceType: '移动端', loadTimeMs: 1360 },
  { deviceType: '移动端', loadTimeMs: 1290 },
  { deviceType: '移动端', loadTimeMs: 1580 },
  { deviceType: '平板端', loadTimeMs: 960 },
  { deviceType: '平板端', loadTimeMs: 1040 },
  { deviceType: '平板端', loadTimeMs: 990 },
  { deviceType: '平板端', loadTimeMs: 1120 },
  { deviceType: '平板端', loadTimeMs: 1010 },
  { deviceType: '平板端', loadTimeMs: 1080 },
  { deviceType: '平板端', loadTimeMs: 970 },
  { deviceType: '平板端', loadTimeMs: 1150 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data,
  encode: { x: 'deviceType', y: 'loadTimeMs', size: 4 },
  transform: [{ type: 'jitterX', padding: 0.1 }],
  style: { fillOpacity: 0.7 },
  axis: { y: { title: '页面加载耗时（ms）' } },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 水平抖动 | 数值映射到 x、类别映射到 y，使用 `jitterY` | [horizontal.ts](../examples/jitter/horizontal.ts) |
| 箱线图 + 抖动点 | `type: 'view'`，children 叠加 `boxplot` 与带 `jitterX` 的 `point` | [with-boxplot.ts](../examples/jitter/with-boxplot.ts) |

水平布局核心差异：

```ts-snippet
chart.options({
  type: 'point',
  data,
  encode: { x: 'deliveryHours', y: 'warehouse', color: 'warehouse' },
  transform: [{ type: 'jitterY', padding: 0.1 }],
});
```

箱线图与原始点叠加核心差异：

```ts-snippet
chart.options({
  type: 'view',
  data,
  children: [
    { type: 'boxplot', encode: { x: 'department', y: 'monthlySalary' } },
    {
      type: 'point',
      encode: { x: 'department', y: 'monthlySalary', color: 'department' },
      transform: [{ type: 'jitterX', padding: 0.2 }],
    },
  ],
});
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 抖动内边距 | `transform: [{ type: 'jitterX', padding: 0.1 }]` | 类别带内的留白比例，建议取 0～0.5 |
| 可复现抖动 | `transform: [{ type: 'jitterX', random: seededRandom }]` | 传入固定种子的伪随机函数，避免每次渲染布局不同 |
| 点大小 | `encode: { size: 4 }` | 固定点径；点拥挤时适当调小 |
| 点透明度 | `style: { fillOpacity: 0.7 }` | 缓解残余重叠 |
| 分组调色板 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 按类别值序着色 |
| 点描边 | `style: { stroke: '#fff', lineWidth: 1 }` | 增强相邻点的边界 |
| 坐标轴标题 | `axis: { y: { title: '响应时间（分钟）' } }` | 水平布局的数值轴标题设在 `axis.x` |
| 关闭图例 | `legend: false` | color 与类别轴重复时可关闭 |

抖动只改变视觉位置，不应修改源数据。tooltip 应继续映射原始数值字段，而不是读取像素偏移。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'jitter'` | G2 v5 没有独立的 jitter mark；用 `type: 'point'` + `transform: [{ type: 'jitterX' }]` |
| `type: 'scatter'` | G2 v5 用 `type: 'point'` |
| x 为类别、y 为数值时使用 `jitter` | 优先 `jitterX`，避免数值 y 也被随机偏移；`jitter` 适用于 x/y 都需抖动的场景 |
| 数值在 x、类别在 y 时仍用 `jitterX` | 改用 `jitterY`，保持数值 x 的精确位置 |
| `transform: { type: 'jitterX' }` | transform 必须是数组：`transform: [{ type: 'jitterX' }]` |
| 把 `jitterX` 放进 `data.transform` | 它是 mark transform，放在 point mark 的 `transform` 中 |
| 对两个连续数值字段使用抖动 | 用普通 scatter 散点图，避免破坏精确的数值关系 |
| 每类只传均值，期望抖动恢复分布 | 传入每次原始观测；抖动不能还原被聚合掉的信息 |
| `new Jitter('container', {...})`（G2Plot v2） | `new Chart({ container })` + `type: 'point'` + jitter transform |
| `.position('department*salary')`（v4） | `encode: { x: 'department', y: 'monthlySalary' }` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/jitter/basic.ts) | 不同设备页面加载耗时的原始观测分布 | `type: 'point'` + `jitterX`、`padding`、`fillOpacity` |
| [horizontal.ts](../examples/jitter/horizontal.ts) | 横向比较各仓库配送时长，长类别名更易读 | 数值 x + 类别 y + `jitterY` |
| [with-boxplot.ts](../examples/jitter/with-boxplot.ts) | 同时查看薪资统计摘要与员工原始点 | `type: 'view'` + boxplot/point children + `jitterX` |
