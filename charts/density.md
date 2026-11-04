# Density 密度图

> 组件用途：用核密度估计（KDE）把一列数值的分布形状画出来，便于比较多个类别下分布的集中位置、离散程度与偏态。

## 何时使用

- 关注数值的整体分布形态，而不只是均值/总和：客单价、响应时长、成绩、年龄
- 多类别分布对比：不同客服渠道的响应时长、不同会员等级的消费金额
- 样本量较大（每组建议 ≥ 10 个观测），且可能存在偏态、双峰
- 同一类别下还要再分系列对比（如线上的新客/老客）

## 何时不用

- 只需比较汇总值（总量、均值、排名）→ 用 column 柱状图
- 数据点很少（每组 < 5 个）或取值高度重复 → 用 scatter 散点图 / 直接看原始点
- 关注中位数、四分位、离群点 → 用箱线图（`boxplot`）
- 时间趋势变化 → 用 line 折线图
- 想看固定区间的频数（直方图）→ 用 `interval` + 分箱，而不是 KDE

## 数据要求

- 长表数据，**每行一个原始观测**，不要预先聚合成频数，见 [数据模式](../references/data-patterns.md)
- `x` 字段：类别字符串（band 比例尺），KDE 的 `groupBy` 必须包含它
- `value` 字段：数值（number），作为 KDE 的输入
- `series` 字段（多系列时）：字符串，同一 x 下再分组
- 每组至少 10 个不同取值；单点或零方差（所有值相同）会让该组 KDE 退化、静默不渲染

## 基础实现（G2 v5）

密度图 = `type: 'density'` + `data.transform` 中的 `kde`。KDE 会为每个分组生成一对数组字段（默认 `y` / `size`），`encode` 必须引用这两个输出字段。

```ts
import { Chart } from '@antv/g2';

// 完整样本见 examples/density/basic.ts，每组需足够多的原始观测
const data = [
  { channel: '在线客服', responseMinutes: 2 },
  { channel: '在线客服', responseMinutes: 3 },
  { channel: '在线客服', responseMinutes: 4 },
  { channel: '在线客服', responseMinutes: 5 },
  { channel: '在线客服', responseMinutes: 7 },
  { channel: '在线客服', responseMinutes: 9 },
  { channel: '在线客服', responseMinutes: 12 },
  { channel: '电话客服', responseMinutes: 1 },
  { channel: '电话客服', responseMinutes: 2 },
  { channel: '电话客服', responseMinutes: 3 },
  { channel: '电话客服', responseMinutes: 4 },
  { channel: '电话客服', responseMinutes: 5 },
  { channel: '电话客服', responseMinutes: 7 },
  { channel: '电话客服', responseMinutes: 10 },
  { channel: '邮件工单', responseMinutes: 12 },
  { channel: '邮件工单', responseMinutes: 18 },
  { channel: '邮件工单', responseMinutes: 22 },
  { channel: '邮件工单', responseMinutes: 28 },
  { channel: '邮件工单', responseMinutes: 35 },
  { channel: '邮件工单', responseMinutes: 42 },
  { channel: '邮件工单', responseMinutes: 52 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'density',
  data: {
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'kde',
        field: 'responseMinutes', // KDE 的输入字段
        groupBy: ['channel'], // 按渠道分别估计密度
        size: 24, // 采样点数量，越大曲线越细腻
        min: 0,
        max: 60,
      },
    ],
  },
  // y / size 引用 kde 的输出字段（默认 'y' / 'size'），不是原始字段名
  encode: { x: 'channel', y: 'y', size: 'size' },
  style: {
    fill: '#5B8FF9',
    stroke: '#5B8FF9',
    fillOpacity: 0.35,
    lineWidth: 1.5,
  },
  axis: {
    x: { title: '客服渠道' },
    y: { title: '首次响应时长（分钟）' },
  },
});

chart.render();
```

字段对应关系（最容易记混）：

| 角色 | 字段 | 说明 |
|---|---|---|
| KDE 输入 | `kde.field` | 原始数值字段，如 `responseMinutes` |
| 形状纵向位置 | `encode.y` | KDE 输出的**数值网格**（默认 `'y'`），映射到数值轴 |
| 形状横向宽度 | `encode.size` | KDE 输出的**密度强度**（默认 `'size'`），越宽表示该处样本越密集 |

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多系列并排 | `groupBy` 加系列字段；`encode` 加 `series`（并排位置）与 `color`（颜色） | [multi-series.ts](../examples/density/multi-series.ts) |
| 横向布局 | `coordinate: { transform: [{ type: 'transpose' }] }` | [horizontal.ts](../examples/density/horizontal.ts) |
| 调节平滑度与采样精度 | `kde.size`（采样点数）+ `kde.width`（核宽），并显式给 `min` / `max` | [smooth.ts](../examples/density/smooth.ts) |

多系列核心差异（同一 x 下多个分布并排）：

```ts-snippet
data: {
  value: data,
  transform: [
    { type: 'kde', field: 'orderAmount', groupBy: ['storeType', 'memberType'] },
  ],
},
encode: { x: 'storeType', y: 'y', size: 'size', series: 'memberType', color: 'memberType' },
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 填充透明度 | `style: { fillOpacity: 0.3 }` | density 形状默认 `0.4`，多组重叠时调低 |
| 填充与描边 | `style: { fill: '#5B8FF9', stroke: '#3A7BD5', lineWidth: 2 }` | 形状同时有填充和描边，默认同色 |
| 系列调色板 | `scale: { color: { range: ['#5B8FF9', '#F6BD16'] } }` | 自定义颜色数组用 `range`，不要用 `palette` 传数组 |
| 曲线平滑度 | `kde.width`（默认 2） | 越大越平滑，过大会抹平双峰 |
| 曲线细腻度 | `kde.size`（默认 10） | 采样点数量，样本多时可调到 30~50 |
| 固定数值范围 | `kde.min` / `kde.max` | 多组共用同一范围，避免各组被拉伸到满宽 |
| 坐标轴标题 | `axis: { x: { title: '渠道' }, y: { title: '时长（分钟）' } }` | 转置后 x/y 的标题作用轴互换 |
| 图例位置 | `legend: { color: { position: 'top' } }` | 多系列时使用 |
| 关闭图例 | `legend: false` | 单系列按 x 着色时可关闭 |

### 图表标题与主题

与 line 一致：`title` 必须是对象（不能直接写字符串），内置主题一行切换。

```ts-snippet
title: {
  title: '各渠道响应时长分布',
  subtitle: '核密度估计，带宽越宽曲线越平滑',
  align: 'left',
  titleFontSize: 16,
},
theme: 'classicDark',
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `transform: [{ type: 'kde' }]` 写在 mark 顶层 | 放在 `data.transform` 中，`kde` 是数据变换不是标记变换 |
| `encode: { y: 'responseMinutes' }` | KDE 输出到 `as` 字段（默认 `y` / `size`），`encode` 用 `y: 'y', size: 'size'` |
| 缺 `groupBy` | `groupBy` 必填，且要包含 `x` 字段（多系列时再加系列字段） |
| x 用数值字段（如年龄、金额） | density 的 `x` 必须是类别字段（band 比例尺）；数值分布映射到 `y` 与 `size` |
| 以为 `encode.y` 是密度值 | `encode.y` 是数值刻度位置，密度大小映射到 `encode.size`（形状宽度） |
| 多系列时 `groupBy` 只写 x 字段 | 必须同时包含系列字段，否则并排形状错位、密度算成混合分布 |
| 某组只有 1 个样本或全部取值相同 | 该组 KDE 静默失败、不渲染；显式给 `kde.min` / `kde.max`，或改用散点图/箱线图 |
| `scale: { color: { palette: ['#5B8FF9'] } }` | `palette` 只接受调色板名字符串；自定义数组用 `range` |
| `type: 'density'` 但不配 `kde` | 没有 `kde` 就没有数组型的 `y` / `size`，图表空白 |
| `new Density('container', { xField, yField })`（G2Plot v2） | `new Chart({ container })` + `type: 'density'` + `data.transform` |
| `chart.source(data)`（v4） | `chart.options({ data: { value: data, transform: [...] } })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/density/basic.ts) | 多类别分布对比，最简起步 | `type: 'density'` + `data.transform.kde` + `encode: { x, y, size }` |
| [multi-series.ts](../examples/density/multi-series.ts) | 同一类别下新老用户分布并排对比 | `groupBy: [x, series]` + `encode.series/color` + `scale.color.range` |
| [horizontal.ts](../examples/density/horizontal.ts) | 类别名称较长，横向展开分布 | `coordinate: { transform: [{ type: 'transpose' }] }` |
| [smooth.ts](../examples/density/smooth.ts) | 大样本、偏态分布，调节平滑度 | `kde.size` / `kde.width` / `kde.min` / `kde.max` |
