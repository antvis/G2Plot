# Progress 进度图

> 组件用途：用一条横向进度条展示单个指标相对目标的完成度（0~100%），支持多指标并列、分段进度与阈值配色。

## 何时使用

- 单个指标的完成度：季度目标达成率、任务完成百分比、资源占用率
- 看板 / KPI 卡片里需要「一眼看出到没到 100%」
- 多个指标各自有独立的 0~100% 进度，需要一屏对比（见 [multi-metric.ts](../examples/progress/multi-metric.ts)）
- 项目阶段推进：已完成 / 进行中 / 未开始（见 [segmented.ts](../examples/progress/segmented.ts)）

## 何时不用

- 时间趋势（连续变量随时间变化）→ 用 line 折线图
- 类别间数值对比、数值可能超过 100% → 用 column / bar，进度条的量感会失真
- 各部分占比构成（加起来 100%）→ 用 pie 饼图
- 累积量随时间的量级变化 → 用 area 面积图
- 环形 / 圆周进度（G2Plot v2 的 RingProgress 是独立组件）→ 不属于本组件，需要 `theta` 极坐标 + `stackY` 自行组合

## 数据要求

- 长表数据，一行一个指标（多指标时多行），见 [数据模式](../references/data-patterns.md)
- `metric` 字段：指标名（string），作为 x 类别；多个指标时不要重复
- `completionRate` 字段：0~1 的小数（number）；后端返回 0~100 时先 `/ 100`，全篇只用一种量纲
- 进度值落在 0~1：超过 1 的部分会被 `domain: [0, 1]` 裁掉，超额完成请用文字标注实际值
- 轨道层不占用数据字段：轨道恒为 1，用 `encode: { y: () => 1 }` 表达

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

/**
 * 基础进度条
 * 场景：单个指标的完成度（如季度目标达成率），一条轨道 + 一段进度
 * 要点：轨道与进度是同一个 view 下叠放的两个 interval，靠 scale.y.domain 固定 0~100%；
 *       单类别不限制条厚会撑满画布高度，用 style.maxWidth 控制
 */
const data = [{ metric: '季度目标达成率', completionRate: 0.72 }];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      // 轨道：恒为满值，作为进度条的底
      type: 'interval',
      encode: { x: 'metric', y: () => 1 },
      style: { fill: '#F0F2F5', radius: 12, maxWidth: 24 },
      tooltip: false,
    },
    {
      // 进度：实际完成度
      type: 'interval',
      encode: { x: 'metric', y: 'completionRate' },
      style: { fill: '#5B8FF9', radius: 12, maxWidth: 24 },
    },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { y: { domain: [0, 1] } },
  axis: false,
  legend: false,
  tooltip: {
    items: [{ channel: 'y', name: '完成率', valueFormatter: (v) => `${Math.round(Number(v) * 100)}%` }],
  },
});

chart.render();
```

三个关键点，缺一个都会画错：

- **为什么是两层**：G2 v5 没有 `progress` mark，轨道 + 进度是同一个 `view` 下叠放的两个 `interval`
- **为什么必须写 `scale.y.domain: [0, 1]`**：不写时比例尺按数据最大值铺满，72% 会被画成满条；本例轨道恰好是 1 才碰巧得到 `[0, 1]`，换个没有轨道、或最大值不是 1 的场景就会画错，显式写死更稳
- **为什么限制 `style.maxWidth`**：只有一个 x 类别时，band 会占满整个画布高度，不限制就是一块大色块

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多指标并列 | 轨道层复用同一份数据（`y: () => 1`），x 轴保留指标名、隐藏数值轴 | [multi-metric.ts](../examples/progress/multi-metric.ts) |
| 分段进度 | `transform: [{ type: 'stackY' }]` + `encode.color`，每段之和凑满 100 | [segmented.ts](../examples/progress/segmented.ts) |
| 阈值配色 | `style.fill` 传回调，按完成度返回不同颜色 | [custom-style.ts](../examples/progress/custom-style.ts) |
| 条内数值 | `labels` + `position: 'right'`，文字右端对齐条尾 | [with-label.ts](../examples/progress/with-label.ts) |

条内数值的关键是**两端都不能裁**：条够长时文字压在条内右端（白字），条太短时翻到条外（深色），用回调按数据逐条切换：

```ts-snippet
labels: [
  {
    text: (d) => `${Math.round(d.completionRate * 100)}%`,
    position: 'right',
    style: {
      textAlign: (d) => (d.completionRate >= 0.08 ? 'end' : 'start'),
      dx: (d) => (d.completionRate >= 0.08 ? -10 : 10),
      fill: (d) => (d.completionRate >= 0.08 ? '#FFFFFF' : '#1D2129'),
      fillOpacity: 1,
    },
  },
],
```

分段进度的核心差异（三段之和必须等于 100）：

```ts-snippet
chart.options({
  type: 'interval',
  data,
  encode: { x: 'project', y: 'proportion', color: 'status' },
  transform: [{ type: 'stackY' }],
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { y: { domain: [0, 100] } },
});
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 条厚 | `style: { maxWidth: 24 }` | 单类别不限制会撑满整个高度 |
| 圆角 | `style: { radius: 12 }` | 取条厚的一半得到胶囊形 |
| 单边圆角 | `style: { radiusTopLeft: 0, radiusTopRight: 12 }` | 转置后角的方向与直觉不同，需按实际效果调 |
| 轨道颜色 | 轨道层 `style: { fill: '#F0F2F5' }` | 比进度色浅一档即可 |
| 进度颜色 | 进度层 `style: { fill: '#5B8FF9' }` | 也可用回调做阈值配色 |
| 颜色透明度 | `style: { fillOpacity: 1 }` | 主题默认 `interval` 是 0.95，严格还原品牌色时显式置 1 |
| 条内文字 | `labels[].style` 的 `fontSize` / `fill` / `fillOpacity` | 白字必须配 `fillOpacity: 1`，否则主题默认 0.65 会发灰 |
| 标题 | `title: { title: '86%', subtitle: '目标达成率', titleFontSize: 32 }` | 大号数字适合 KPI 卡片 |
| 关闭轴 / 图例 | `axis: false`、`legend: false` | 进度条默认都不需要 |
| 提示格式化 | `tooltip.items[].valueFormatter` | 把 0.86 显示成 86% |
| 暗色主题 | `theme: 'classicDark'` | 轨道色需要同步调深一档 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `new Progress('container', { percent: 0.7 })` | `new Chart({ container })` + `chart.options(...)` |
| `progressStyle: { fill }` | `style: { fill }` |
| `barWidth: 10` | `style: { maxWidth: 10 }` |
| `type: 'progress'` / `type: 'process'` | v5 没有这个 mark；用 `type: 'interval'` 叠两层 |
| 只画一层 `interval`，不写 domain | 加轨道层 + `scale.y.domain: [0, 1]`，否则 72% 会画成满条 |
| 两层 `interval` 分别 `new Chart()` | 放在同一个 `view` 的 `children` 里 |
| 不写 `coordinate` 直接画 | 会得到竖向柱状，必须 `coordinate: { transform: [{ type: 'transpose' }] }` |
| `coordinate('rect').transpose()`（v2 写法） | 同上，用 `coordinate.transform` |
| 单类别不限制条厚 | `style: { maxWidth }` 控制，否则撑满画布高度 |
| `labels` 死贴条尾 | 接近 100% 时被画布裁切；用条件回调翻到条外，或把数值交给外层布局 |
| 白字只改 `fill` | 主题 `label.fillOpacity` 默认 0.65，白字会发灰，必须同时写 `fillOpacity: 1` |
| 完成度 120% 直接塞进 `domain: [0, 1]` | 超出部分被裁掉；先截断到 1，再用文字标注「120%」 |
| `.position('percent')`（v4） | `encode: { x, y }` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/progress/basic.ts) | 单指标完成率，最简起步 | 两层 `interval`、`transpose`、`scale.y.domain [0,1]` |
| [multi-metric.ts](../examples/progress/multi-metric.ts) | 五个团队完成率一屏对比 | 多类别 `encode.x`、`axis.x` 保留指标名、`axis.y: false` |
| [segmented.ts](../examples/progress/segmented.ts) | 项目三态占比（已完成/进行中/未开始） | `stackY`、`encode.color`、`scale.color.domain`、`domain [0,100]` |
| [custom-style.ts](../examples/progress/custom-style.ts) | 按阈值分档配色 + 标题 | `style.fill` 回调、`title` 对象、`maxWidth` |
| [with-label.ts](../examples/progress/with-label.ts) | 条内百分比，短条自动外置 | `labels`、`textAlign`/`dx`/`fill` 回调、`fillOpacity: 1` |
