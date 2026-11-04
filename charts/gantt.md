# Gantt 甘特图

> 组件用途：用水平时间条展示多个任务的起止时间与排期重叠关系，常用于项目计划与进度跟踪。

## 何时使用

- 项目排期：任务清单 + 开始/结束时间，观察工期与并行关系
- 里程碑跟踪：在任务条上叠加评审、提测、上线等关键节点
- 资源占用：多个人/团队的任务时间区间对比，发现排期冲突
- 任务数量可控（建议 ≤ 20 行），每行一个明确的时间区间

## 何时不用

- 单一时点的数值对比 → 用 column 柱状图或 bar 条形图
- 时间趋势（连续数值变化）→ 用 line 折线图
- 只有开始时间、没有结束时间 → 用 scatter 散点图或 line
- 层级任务（父子任务折叠）→ 甘特图需自行拍平数据，或改用专用项目管理组件
- 任务量很大（数百行）→ 需要虚拟滚动/分页，不适合一次性渲染

## 数据要求

- 长表数据，每行一个任务，见 [数据模式](../references/data-patterns.md)
- `task` 字段：任务名称（字符串），映射到 `x`；**每行必须唯一**，否则会落在同一个 band 上重叠
- `startDate` / `endDate` 字段：`Date` 对象（或数值时间戳），分别映射 `y` / `y1`；**不要**用 `'3月2日'` 这类展示字符串
- `phase` 字段（可选）：阶段/分组字符串，映射 `color` 按阶段着色
- 保证 `startDate < endDate`，否则时间条宽度为 0 或方向反转

## 基础实现（G2 v5）

G2 v5 没有 `gantt` mark：用 `interval` 画区间条，`y` / `y1` 表示起止时间，再用 `transpose` 转成水平方向。

```ts
import { Chart } from '@antv/g2';

/**
 * 基础甘特图
 * 场景：展示项目任务的起止时间与阶段划分
 * 要点：interval + transpose 实现水平时间条，y/y1 分别映射开始/结束时间
 */
const data = [
  { task: '需求调研', phase: '规划', startDate: new Date('2026-03-02'), endDate: new Date('2026-03-06') },
  { task: '方案设计', phase: '规划', startDate: new Date('2026-03-05'), endDate: new Date('2026-03-11') },
  { task: '接口开发', phase: '开发', startDate: new Date('2026-03-10'), endDate: new Date('2026-03-20') },
  { task: '页面开发', phase: '开发', startDate: new Date('2026-03-12'), endDate: new Date('2026-03-24') },
  { task: '联调测试', phase: '测试', startDate: new Date('2026-03-23'), endDate: new Date('2026-03-27') },
  { task: '上线验收', phase: '发布', startDate: new Date('2026-03-28'), endDate: new Date('2026-03-31') },
];

const formatMonthDay = (value: Date) => {
  const date = new Date(value);
  return `${date.getMonth() + 1}-${date.getDate()}`;
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'task',
    y: 'startDate',
    y1: 'endDate',
    color: 'phase',
  },
  scale: {
    y: { type: 'time' },
    color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A'] },
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  axis: {
    x: { title: '任务' },
    y: { title: '2026 年 3 月', labelFormatter: formatMonthDay },
  },
  style: { radius: 4 },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 单色任务条 | 去掉 `color` 通道，用 `style.fill` 固定颜色 | 见下方代码片段 |
| 里程碑 | `type: 'view'`，children 叠加 interval 与 point（菱形） | [milestone.ts](../examples/gantt/milestone.ts) |
| 今日参考线 + 工期标签 | `lineY` 标记今日；interval 的 `labels` 回调算工期 | [with-today-line.ts](../examples/gantt/with-today-line.ts) |
| 阶段着色 | `encode.color: 'phase'` + `scale.color.range` | [basic.ts](../examples/gantt/basic.ts) |

单色任务条（不需要阶段图例时）：

```ts-snippet
chart.options({
  type: 'interval',
  data,
  encode: { x: 'task', y: 'startDate', y1: 'endDate' },
  scale: { y: { type: 'time' } },
  coordinate: { transform: [{ type: 'transpose' }] },
  style: { fill: '#5B8FF9', radius: 4 },
});
```

里程碑叠加（`point` 与 `interval` 共享 y 时间轴）：

```ts-snippet
chart.options({
  type: 'view',
  scale: { y: { type: 'time' } },
  children: [
    {
      type: 'interval',
      data: tasks,
      encode: { x: 'task', y: 'startDate', y1: 'endDate' },
      coordinate: { transform: [{ type: 'transpose' }] },
    },
    {
      type: 'point',
      data: milestones,
      encode: { x: 'task', y: 'date', shape: 'diamond' },
      coordinate: { transform: [{ type: 'transpose' }] },
      style: { fill: '#E8684A', r: 6 },
      labels: [{ text: 'milestone', position: 'right', style: { fontSize: 10 } }],
    },
  ],
});
```

今日参考线（`lineY` 在 transpose 后变为竖线，`y` 传当天日期）：

```ts-snippet
{
  type: 'lineY',
  data: [{ today: new Date('2026-03-16') }],
  encode: { y: 'today' },
  coordinate: { transform: [{ type: 'transpose' }] },
  style: { stroke: '#E8684A', lineWidth: 1, lineDash: [4, 3] },
  tooltip: false,
}
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 任务条圆角 | `style: { radius: 4 }` | 数值为 px，0 为直角 |
| 单色任务条 | `style: { fill: '#5B8FF9' }` | 不设 `color` 通道时生效 |
| 阶段配色 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 按 `phase` 值序取色 |
| 日期刻度格式 | `axis: { y: { labelFormatter: (d) => ... } }` | 时间轴必须传函数，字符串会被当数值格式 |
| 坐标轴标题 | `axis: { x: { title: '任务' } }` | y 轴同理，`title: null` 可隐藏 |
| 图例位置 | `legend: { color: { position: 'top' } }` | `'top'` / `'bottom'` / `'left'` / `'right'` |
| 关闭图例 | `legend: false` | 单色或阶段无需图例时 |
| 任务顺序 | `scale: { x: { domain: ['需求调研', '方案设计', '接口开发'] } }` | 默认按数据出现顺序，也可先对数据排序 |
| 工期标签 | `labels: [{ text: (d) => ..., position: 'inside' }]` | 任务条过窄时改用 tooltip，避免文字溢出 |
| 今日线样式 | `style: { stroke, lineDash, lineWidth }` | 参考线用 `tooltip: false` 关闭提示 |

### 图表标题与组件文字样式

```ts-snippet
title: {
  title: '2026 年 3 月迭代排期',
  subtitle: '数据截至 2026-03-16',
  align: 'left',
  titleFontSize: 16,
  subtitleFontSize: 12,
  subtitleFill: '#8c8c8c',
},
```

组件文字样式命名规律同其他组件：`titleXxx`（轴标题）、`labelXxx`（轴刻度标签）、`itemLabelXxx`（图例项文字）——如 `axis.y.labelFill`、`axis.x.labelFontSize`、`legend.color.itemLabelFill`。

### 内置主题

`theme: 'light' | 'dark' | 'classic' | 'classicDark' | 'academy'`，一行切换整体配色；暗色大屏用 `'classicDark'`，坐标轴、图例、标题文字自动适配。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'gantt'`（G2 v5 不存在此 mark，直接白屏） | `type: 'interval'` + `encode.y1` + `coordinate.transpose` |
| 忘记 `transpose` → 任务条竖着长 | `coordinate: { transform: [{ type: 'transpose' }] }` |
| 只写 `encode: { x, y: 'startDate' }` → 从 0 画到开始时间 | 补 `y1: 'endDate'` |
| `y` 传结束、`y1` 传开始（顺序反转） | `y` 开始时间、`y1` 结束时间，且 `start < end` |
| 时间字段用 `'2026-03-02'` / `'3月2日'` 字符串 | 用 `new Date('2026-03-02')` 或时间戳，展示交给 `labelFormatter` |
| `axis.y.labelFormatter: 'MM-DD'`（v5 字符串走 d3-format，不是时间格式） | 传函数自行拼接月日：`(d) => d.getMonth() + 1 + '-' + d.getDate()` |
| 多行共用同一个 `task` 名称 → 时间条重叠 | `task` 唯一；名称过长时用短名或缩写，避免行标签换行 |
| 任务数量过多（> 20 行）→ 行高过窄无法阅读 | 分页/滚动/按阶段折叠，或只展示关键路径 |
| `new Gantt('container', { startField, endField })`（G2Plot v2） | `new Chart({ container })` + `chart.options(spec)` |
| `seriesField: 'phase'`（v2 配置） | `encode: { color: 'phase' }` |
| `chart.source(data)`（v4） | `chart.options({ data })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/gantt/basic.ts) | 项目任务排期，按阶段着色 | `type: 'interval'` + `encode.y1` + `coordinate.transpose` + `scale.y.type: 'time'` |
| [milestone.ts](../examples/gantt/milestone.ts) | 排期上标出评审/提测/上线节点 | `type: 'view'` + interval/point children + `shape: 'diamond'` |
| [with-today-line.ts](../examples/gantt/with-today-line.ts) | 进行中项目：今日位置 + 每项工期 | `lineY` 今日线 + `labels` 工期回调 + `legend.color.position` |
