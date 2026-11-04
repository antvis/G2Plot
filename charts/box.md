# Box 箱线图

> 组件用途：用一个箱体概括一组数值的五数分布（下须 / Q1 / 中位数 / Q3 / 上须）与异常值，适合组间分布对比。

## 何时使用

- 组间分布对比：各部门薪资、各渠道响应耗时、各机型评分的分布差异
- 关注中位数、离散程度（箱体高度 = IQR）、偏态与异常值，而不是单个数值
- 每组有足够观测值（建议 ≥ 5，≥ 10 更稳），且希望在一张图里放下多组

## 何时不用

- 每组只有 1~2 个观测值 → 四分位数没有统计意义，用 column 直接展示原始值
- 想看分布形状（单峰/双峰/长尾）→ 用 histogram 直方图，箱线图只给五数概括
- 时间趋势 → 用 line 折线图；占比/构成 → 用 pie 饼图
- 只比较一个汇总值（均值/总量）→ 用 column 柱状图
- 想看全部原始点 → 箱线图叠加 point（`type: 'view'` + `jitter`），点很多时优先箱线图

## 数据要求

- 长表数据，**每行一个观测值**（不是每行一个箱体），见 [数据模式](../references/data-patterns.md)
- `x` 字段：类别字符串（band 比例尺），一个取值对应一个箱体
- `y` 字段：数值（number），原始观测值；分位数与离群点由 `boxplot` 自动计算
- 分组字段（可选）：`color` 负责配色，`series` 负责并排偏移，两者都要给
- 已算好五数概括时改用 `type: 'box'`，显式提供 5 个数值通道（见「常见变体」）

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

/**
 * 基础箱线图
 * 场景：一个类别字段下每个类别有多个观测值，比较各组分布（如各部门月薪）
 * 要点：type: 'boxplot' + encode { x, y }，分位数与异常值由原始明细数据自动计算；
 *       每行一个观测值，不要把已经算好的分位数传进来
 */
const data = [
  { department: '研发', salary: 18 },
  { department: '研发', salary: 20 },
  { department: '研发', salary: 22 },
  { department: '研发', salary: 24 },
  { department: '研发', salary: 26 },
  { department: '研发', salary: 28 },
  { department: '研发', salary: 30 },
  { department: '研发', salary: 34 },
  { department: '设计', salary: 14 },
  { department: '设计', salary: 15 },
  { department: '设计', salary: 17 },
  { department: '设计', salary: 18 },
  { department: '设计', salary: 20 },
  { department: '设计', salary: 22 },
  { department: '设计', salary: 24 },
  { department: '设计', salary: 26 },
  { department: '市场', salary: 12 },
  { department: '市场', salary: 14 },
  { department: '市场', salary: 15 },
  { department: '市场', salary: 16 },
  { department: '市场', salary: 18 },
  { department: '市场', salary: 20 },
  { department: '市场', salary: 22 },
  { department: '市场', salary: 25 },
  { department: '运营', salary: 10 },
  { department: '运营', salary: 11 },
  { department: '运营', salary: 12 },
  { department: '运营', salary: 14 },
  { department: '运营', salary: 15 },
  { department: '运营', salary: 16 },
  { department: '运营', salary: 18 },
  { department: '运营', salary: 21 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'boxplot',
  data,
  encode: { x: 'department', y: 'salary' },
  axis: { y: { title: '月薪（千元）' } },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 分组并排 | `encode` 同时加 `color` 与 `series` | [grouped.ts](../examples/box/grouped.ts) |
| 突出异常点 | `style.pointFill` / `pointR` 定制离群点 | [outliers.ts](../examples/box/outliers.ts) |
| 品牌样式 + 中文 tooltip | `style.boxFill/boxStroke` + `tooltip.boxItems` | [custom-style.ts](../examples/box/custom-style.ts) |
| 水平箱线图 | `coordinate: { transform: [{ type: 'transpose' }] }` | 见下方片段 |
| 已聚合五数概括 | `type: 'box'` + `encode: { x, y, y1, y2, y3, y4 }` | 见下方片段 |

分组核心差异（`color` 只负责配色，**`series` 才负责并排偏移**，只写 `color` 箱体会重叠）：

```ts-snippet
chart.options({
  type: 'boxplot',
  data,
  encode: { x: 'month', y: 'orderValue', color: 'region', series: 'region' },
  style: { boxFillOpacity: 0.3, pointR: 2 },
  legend: { color: { position: 'top' } },
});
```

水平箱线图（类别名称长时更易读，x 放数值、y 放类别）：

```ts-snippet
chart.options({
  type: 'boxplot',
  data,
  encode: { x: 'salary', y: 'department' },
  coordinate: { transform: [{ type: 'transpose' }] },
});
```

已聚合数据（`type: 'box'`，通道顺序固定，不要凭直觉写 `y: 'median'`）：

```ts-snippet
chart.options({
  type: 'box',
  data: [
    { department: '研发', min: 18, q1: 21, median: 25, q3: 30, max: 34 },
    { department: '设计', min: 14, q1: 16, median: 19, q3: 23, max: 26 },
  ],
  encode: {
    x: 'department',
    y: 'min',
    y1: 'q1',
    y2: 'median',
    y3: 'q3',
    y4: 'max',
  },
});
```

## 样式自定义

`boxplot` 是复合 mark，**样式键必须带 `box` / `point` 前缀**（内部按前缀拆分给箱体 mark 与离群点 mark），无前缀的 `fill` / `stroke` 会被静默丢弃。完整示例见 [custom-style.ts](../examples/box/custom-style.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 箱体填充 | `style: { boxFill: '#5B8FF9', boxFillOpacity: 0.15 }` | 填充透明度保留颜色层次 |
| 箱体描边 | `style: { boxStroke: '#1D39C4', boxLineWidth: 1.5 }` | 箱体、须、中位数共用一条 path，无法分开设置 |
| 离群点样式 | `style: { pointFill: '#F4664A', pointStroke: '#F4664A', pointR: 3 }` | 默认 `point: true`，按 1.5 × IQR 规则标出离群点 |
| 隐藏离群点 | `style: { point: false }` | 注意：同时把须改成 min / max，不再按 1.5 × IQR 截断 |
| 按类别配色 | `encode: { color: 'region', series: 'region' }` | 分组并排时两个通道都要给 |
| 坐标轴标题 | `axis: { y: { title: '响应耗时（ms）' } }` | x 轴同理 |
| 图例位置 | `legend: { color: { position: 'top' } }` | `'top'` / `'bottom'` / `'left'` / `'right'` |
| 关闭图例 | `legend: false` | 单系列场景常用 |
| tooltip 指标名 | `tooltip: { boxItems: [...], pointItems: [...] }` | 复合 mark 用前缀键；直接写 `tooltip.items` 会被丢弃 |

tooltip 的 5 个数值通道顺序固定：`y` = 下须、`y1` = Q1、`y2` = 中位数、`y3` = Q3、`y4` = 上须：

```ts-snippet
tooltip: {
  boxItems: [
    { channel: 'y', name: '最小值' },
    { channel: 'y1', name: 'Q1' },
    { channel: 'y2', name: '中位数' },
    { channel: 'y3', name: 'Q3' },
    { channel: 'y4', name: '最大值' },
  ],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| 明细数据用 `type: 'box'` | `box` 需要手动提供五数概括；明细数据用 `type: 'boxplot'`（自动算分位数与异常值） |
| 用 `box` 时写 `encode: { y: 'median' }` | 通道顺序是 `y`=下须、`y1`=Q1、`y2`=中位数、`y3`=Q3、`y4`=上须（与默认 tooltip、G2 5.4 源码一致） |
| 分组只写 `encode: { color: 'region' }` | `box` 不会自动 dodge（`dodgeX` 对复合 mark 无效），必须同时给 `series`，否则箱体重叠 |
| `style: { fill: '#5B8FF9' }` | 无前缀键被静默丢弃 → `style: { boxFill: '#5B8FF9' }`；离群点用 `pointFill` |
| `style: { outlierFill / medianStroke / whiskerStroke }` | G2 5.4 不支持这些键：箱体、须、中位数共用一条 path，只能整体 `boxStroke` / `boxLineWidth` |
| `style: { point: false }` 用来“只隐藏离群点” | 它同时把须改成 min / max，1.5 × IQR 截断失效；只想淡化离群点就改 `pointR` / `pointFill` |
| 每组只有 1~2 个观测值也画箱线图 | 四分位数失真、箱体退化成一条线；改用 column 展示原始值 |
| 数据量级跨度大（5ms ~ 3000ms）直接画 | 箱体被压扁：`scale: { y: { type: 'log' } }`，且 log 要求所有 y > 0（含 0 / 负数需先过滤或加偏移） |
| `scale: { y: { zero: true } }` | 箱线图默认不强制 0 基线，强加零点会把箱体压到图顶；保持默认 |
| `new Box('container', { xField, yField })`（G2Plot v2） | `new Chart({ container })` + `chart.options({ type: 'boxplot', encode: { x, y } })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/box/basic.ts) | 各部门薪资分布，最简起步 | `type: 'boxplot'` + `encode: { x, y }` |
| [grouped.ts](../examples/box/grouped.ts) | 地区 × 月份的订单金额分布并排对比 | `encode.color` + `encode.series`、`legend.color.position` |
| [outliers.ts](../examples/box/outliers.ts) | 长尾耗时数据，突出离群点 | `style.pointFill/pointStroke/pointR`、`style.boxFill/boxStroke` |
| [custom-style.ts](../examples/box/custom-style.ts) | 品牌配色 + 中文 tooltip 指标名 | `style.box*` / `style.point*`、`axis.title`、`tooltip.boxItems/pointItems` |
