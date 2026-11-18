# Tiny Line 迷你折线图

> 组件用途：在 KPI 卡片、列表或小型报表中，用紧凑折线展示单个指标随时间或有序类别的变化趋势。

## 何时使用

- 单系列轻量趋势：近 7 天访问量、逐小时响应耗时、每日签到人数
- 空间有限的 KPI 卡片、列表行或小倍图，重点看走向而非精确读数
- 已有按时间或业务顺序排列的连续观测值，希望减少坐标轴和图例的视觉干扰

## 何时不用

- 需要精确读取数值、刻度或单位 → 用标准 line，并保留坐标轴和 tooltip
- 多系列趋势对比 → 用标准 line，配置 `encode.color`、坐标轴和图例
- x 是无序类别，只比较各类别数值 → 用 column 或 bar，不要用线连接
- 展示单个完成率或占比 → 用 liquid；展示类别构成 → 用 pie
- 只有极少观测点且需要强调具体数值 → 优先直接展示数字或使用 column

## 数据要求

- 长表数据，每行一个观测值，见 [数据模式](../references/data-patterns.md)
- `x` 字段：时间或有序类别，数据必须先按实际时间或业务顺序排列
- `y` 字段：数值（number），不要用百分比字符串或带单位的字符串代替数值
- 默认表达单系列趋势；多系列不要省略 `encode.color`，也不建议塞入紧凑卡片
- 时间字段需要真实时间比例尺时，将日期字符串转换为 `Date`；有序短标签可作为类别使用
- 缺失值用 `null`，不要把缺失当成 `0`；只有业务允许表达估算趋势时才跨缺口连接

## 基础实现（G2 v5）

迷你折线图不是独立 mark，核心是标准 `type: 'line'` 加上紧凑的组件配置。

```ts
/**
 * 基础迷你折线图
 * 场景：在 KPI 卡片中展示近 7 天访问量的单系列趋势
 * 要点：type: 'line' + encode { x, y }；关闭坐标轴、图例和 tooltip 保持紧凑
 */
import { Chart } from '@antv/g2';

const data = [
  { day: '11-10', visits: 120 },
  { day: '11-11', visits: 168 },
  { day: '11-12', visits: 145 },
  { day: '11-13', visits: 210 },
  { day: '11-14', visits: 186 },
  { day: '11-15', visits: 245 },
  { day: '11-16', visits: 228 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'day', y: 'visits' },
  style: { stroke: '#5B8FF9', lineWidth: 2 },
  axis: false,
  legend: false,
  tooltip: false,
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 基础紧凑折线 | `type: 'line'`，关闭坐标轴、图例和 tooltip | [basic.ts](../examples/tiny-line/basic.ts) |
| 平滑折线 | `encode.shape: 'smooth'`，弱化单点抖动 | [smooth.ts](../examples/tiny-line/smooth.ts) |
| 折线 + 数据点 | `type: 'view'` + `children` 叠加 line 与 point | [with-points.ts](../examples/tiny-line/with-points.ts) |
| 淡色面积背景 | `view` 中叠加 area 与 line，面积仅提供量感 | 见下方片段 |

淡色面积背景（不要用 area 的 `stroke` 代替顶部折线）：

```ts-snippet
chart.options({
  type: 'view',
  data,
  axis: false,
  legend: false,
  tooltip: false,
  children: [
    {
      type: 'area',
      encode: { x: 'day', y: 'visits' },
      style: { fill: '#5B8FF9', fillOpacity: 0.12 },
    },
    {
      type: 'line',
      encode: { x: 'day', y: 'visits' },
      style: { stroke: '#5B8FF9', lineWidth: 2 },
    },
  ],
});
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 线条颜色 | `style: { stroke: '#5B8FF9' }` | 单系列固定颜色 |
| 线条宽度 | `style: { lineWidth: 2 }` | 紧凑图表通常使用较细线条 |
| 平滑曲线 | `encode: { x: 'day', y: 'visits', shape: 'smooth' }` | `shape` 是 encode 通道 |
| 数据点 | `children` 中增加 `type: 'point'` | 与 line 共享 x / y 数据 |
| 面积背景 | `children` 中叠加 area 与 line | area 用 `fill` / `fillOpacity`，line 用 `stroke` |
| 隐藏组件 | `axis: false, legend: false, tooltip: false` | 适用于不需要精确读数的卡片 |
| 跨缺失值连线 | `style: { connect: true, connectStroke: '#aaa', connectLineDash: [4, 4] }` | 仅用于业务允许的估算趋势，连接段用虚线区分 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| 使用 `new TinyLine()`（G2Plot v2） | `new Chart()` + `chart.options({ type: 'line', ... })` |
| 使用 `.position('x*y')` 或 `.shape('smooth')` | 使用 `encode: { x, y }`；平滑用 `encode.shape: 'smooth'` |
| 用 `xAxis` / `yAxis` 隐藏旧版坐标轴 | Spec 中使用 `axis: false` |
| 用 `point: { visible: true }` 显示数据点 | 用 `type: 'view'` + `children` 叠加 line 和 point |
| 连续调用两次 `chart.options()` 分别添加 line 和 point | 后一次会覆盖前一次；在同一个 view 的 `children` 中组合 |
| 把缺失值写成 `0`，或使用不存在的 `connectNulls` | 缺失值用 `null`；确需跨缺口时使用 `style.connect`，并区分连接段样式 |
| x 数据未排序，直接连接无序类别 | 先按时间或业务顺序排序；纯类别比较改用 column 或 bar |
| 为强调趋势强行固定 `width` / `height` 或设置 spec `padding` | 使用 `autoFit: true`，由页面布局提供容器尺寸 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/tiny-line/basic.ts) | KPI 卡片中的近 7 天访问量趋势 | `type: 'line'`、`encode: { x, y }`、关闭坐标轴 / 图例 / tooltip |
| [smooth.ts](../examples/tiny-line/smooth.ts) | 监控卡片中的逐小时响应耗时趋势 | `encode.shape: 'smooth'`、`style.stroke` / `lineWidth` |
| [with-points.ts](../examples/tiny-line/with-points.ts) | 小型报表中同时展示趋势和每日观测点 | `type: 'view'`、`children` 叠加 line / point |

平滑迷你折线图完整代码：

```ts
/**
 * 平滑迷你折线图
 * 场景：在监控卡片中弱化单小时抖动，观察响应耗时的整体变化
 * 要点：通过 encode.shape: 'smooth' 平滑曲线，不使用旧版链式 shape API
 */
import { Chart } from '@antv/g2';

const data = [
  { hour: '08:00', latency: 42 },
  { hour: '09:00', latency: 58 },
  { hour: '10:00', latency: 47 },
  { hour: '11:00', latency: 65 },
  { hour: '12:00', latency: 52 },
  { hour: '13:00', latency: 70 },
  { hour: '14:00', latency: 61 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'hour', y: 'latency', shape: 'smooth' },
  style: { stroke: '#5AD8A6', lineWidth: 2 },
  axis: false,
  legend: false,
  tooltip: false,
});

chart.render();
```

带数据点的迷你折线图完整代码：

```ts
/**
 * 带数据点的迷你折线图
 * 场景：在小型报表卡片中既展示趋势，也标出每天的实际观测值
 * 要点：type: 'view' + children 叠加 line 与 point，共享有序数据
 */
import { Chart } from '@antv/g2';

const data = [
  { day: 'Mon', checkIns: 36 },
  { day: 'Tue', checkIns: 42 },
  { day: 'Wed', checkIns: 38 },
  { day: 'Thu', checkIns: 55 },
  { day: 'Fri', checkIns: 49 },
  { day: 'Sat', checkIns: 64 },
  { day: 'Sun', checkIns: 70 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  axis: false,
  legend: false,
  tooltip: false,
  children: [
    {
      type: 'line',
      encode: { x: 'day', y: 'checkIns' },
      style: { stroke: '#5B8FF9', lineWidth: 2 },
    },
    {
      type: 'point',
      encode: { x: 'day', y: 'checkIns', shape: 'point', size: 3 },
      style: { fill: '#fff', stroke: '#5B8FF9', lineWidth: 1.5 },
    },
  ],
});

chart.render();
```
