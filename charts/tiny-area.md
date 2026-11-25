# Tiny Area 迷你面积图

> 组件用途：在指标卡或表格单元格中展示单个非负指标随时间变化的趋势和大致量级。

## 何时使用

- 指标卡已显示指标名和当前值，需要补充最近几天的走势。
- 读者需要快速了解每日 Token 用量等指标的起伏或与固定预算的距离。

## 何时不用

- 逐项比较离散计数时，用柱形图。在紧凑空间中可用迷你柱形图。
- 要比较多个系列或需要完整坐标轴时，用 [面积图](./area.md) 或 [折线图](./line.md)。
- 只想看方向，或数值包含正负变化时，优先用 [折线图](./line.md) 表达。

## 数据要求

| 字段 | 要求 | 示例 |
|---|---|---|
| `day` | 每期一条，使用同一时间粒度，按时间升序排列 | `'2026-11-12'` |
| `tokenCount` | 当天消耗的 Token 总数。有记录时为有限非负数，缺测时用 `null` | `4200`、`0`、`null` |
| `dailyBudget` | 可选的每日预算，与用量使用同一单位和周期 | `9000` |

- 等间隔的逐日记录可使用点比例尺，日期域保留所有日期。间隔不规则时使用连续时间比例尺，保留实际的时间间隔。
- 同一天有多条记录时，先按业务口径聚合。保留缺测日期，让面积和折线在该日期断开。
- 对比多张指标卡时，统一时间窗口、单位、绘图区高度及从零开始的 y 域。上限需覆盖所有卡片的观测值和待展示的参考值。

## 基础实现（G2 v5）

1. 按日期升序整理 14 天数据，将日期和 Token 用量分别映射到 `encode.x` 和 `encode.y`，用 `type: 'area'` 填充曲线和零基线之间的区域。
2. 为 `#container` 提供明确高度，例如 `84px`。启用 `autoFit: true`，用 `axis: false` 与 `legend: false` 隐藏轴、网格和图例，清除默认 margin 并留少量 padding。
3. 在 tooltip 中保留完整日期和带单位的用量。两例共用 `[0, 12000]` 的 y 域。

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 带日预算参考线 | 用 `view` 叠加 area、line 和 lineY。参考线用 `data: [dailyBudget]`，与用量共享 y 比例尺 | [budget-reference.ts](../examples/tiny-area/budget-reference.ts) |
| 渐变填充和趋势轮廓 | 在 area 的 `style.fill` 配置纵向渐变，用独立 line 描绘顶部 | [budget-reference.ts](../examples/tiny-area/budget-reference.ts) |

参考线标出的是 **9,000 Token/天**。数值高于参考线的日期表示超出当日预算。参考线跨越整个日期范围，缺测日期的用量仍断开。

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 实色填充 | `style: { fill: '#3563CC', fillOpacity: 0.5 }` | 降低填充不透明度，让指标值保持醒目 |
| 纵向渐变 | `style.fill` 使用 `linear-gradient(90deg, ...)` | AntV 画布中的 `90deg` 表示从上到下 |
| 参考线 | `lineY.style` 设置 `stroke` 和 `lineDash`，用 `labels` 标注值和单位 | 用虚线区分参考值和用量走势 |

## 易错点

| 易错点 | 处理方式 |
|---|---|
| 把缺测当成零 | 用 `null` 留出断点。数值 `0` 仍连接到零基线 |
| 日用量和月预算直接比较 | 将预算换算到相同统计口径和单位，再标出参考线 |
| 用量与预算使用不同的 y 域 | 在同一个 `view` 共享 y 比例尺，统一从零开始且覆盖预算 |
| 用 area 的 stroke 只画顶部 | 用独立 line 标记画顶部，使底边和两侧保持无描边 |
| 叠加时出现多份 tooltip | 在 line 层提供用量提示，area 和 lineY 设置 `tooltip: false` |
| 使用 G2Plot v2 的 `new TinyArea()` | 用 `new Chart({ container: 'container', autoFit: true })` 和 G2 v5 Spec API |

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/tiny-area/basic.ts) | 在指标卡中查看最近 14 天每日消耗的 Token 数 | 按日期排序，填充至零基线，悬停查看当天用量 |
| [budget-reference.ts](../examples/tiny-area/budget-reference.ts) | 在指标卡中判断最近 14 天的 Token 用量何时超过日预算 | 面积与折线保留缺测断点，预算虚线和用量共用 y 比例尺 |

### 基础迷你面积图

```ts
/**
 * 基础迷你面积图
 * 场景：在指标卡中查看最近 14 天每日消耗的 Token 数。
 * 要点：按日期排序，填充至零基线，悬停查看当天用量。
 */
import { Chart } from '@antv/g2';

const data = [
  { day: '2026-11-21', tokenCount: 9800 },
  { day: '2026-11-12', tokenCount: 4200 },
  { day: '2026-11-13', tokenCount: 5100 },
  { day: '2026-11-14', tokenCount: 4800 },
  { day: '2026-11-15', tokenCount: 6100 },
  { day: '2026-11-16', tokenCount: 5300 },
  { day: '2026-11-17', tokenCount: 0 },
  { day: '2026-11-18', tokenCount: 7000 },
  { day: '2026-11-19', tokenCount: 6600 },
  { day: '2026-11-20', tokenCount: 8400 },
  { day: '2026-11-22', tokenCount: 7500 },
  { day: '2026-11-23', tokenCount: 10900 },
  { day: '2026-11-24', tokenCount: 8200 },
  { day: '2026-11-25', tokenCount: 9400 },
].sort((a, b) => a.day.localeCompare(b.day));

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'area',
  data,
  encode: { x: 'day', y: 'tokenCount' },
  margin: 0,
  padding: 6,
  scale: {
    x: { type: 'point', domain: data.map(({ day }) => day) },
    y: { domain: [0, 12000], nice: false },
  },
  axis: false,
  legend: false,
  style: { fill: '#3563CC', fillOpacity: 0.5 },
  tooltip: {
    title: 'day',
    items: [{
      channel: 'y',
      name: 'Token 用量',
      valueFormatter: (value) => value == null ? '缺测' : `${value.toLocaleString('en-US')} Token`,
    }],
  },
});

chart.render();
```

### 带日预算参考线的迷你面积图

```ts
/**
 * 带日预算参考线的迷你面积图
 * 场景：在指标卡中判断最近 14 天的 Token 用量何时超过日预算。
 * 要点：面积与折线保留缺测断点，预算虚线和用量共用 y 比例尺。
 */
import { Chart } from '@antv/g2';

const data = [
  { day: '2026-11-21', tokenCount: 9800 },
  { day: '2026-11-12', tokenCount: 4200 },
  { day: '2026-11-13', tokenCount: 5100 },
  { day: '2026-11-14', tokenCount: 4800 },
  { day: '2026-11-15', tokenCount: 6100 },
  { day: '2026-11-16', tokenCount: 5300 },
  { day: '2026-11-17', tokenCount: 0 },
  { day: '2026-11-18', tokenCount: 7000 },
  { day: '2026-11-19', tokenCount: 6600 },
  { day: '2026-11-20', tokenCount: 8400 },
  { day: '2026-11-22', tokenCount: null },
  { day: '2026-11-23', tokenCount: 10900 },
  { day: '2026-11-24', tokenCount: 8200 },
  { day: '2026-11-25', tokenCount: 9400 },
].sort((a, b) => a.day.localeCompare(b.day));

const dailyBudget = 9000;
const encode = { x: 'day', y: 'tokenCount' };
const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'view',
  data,
  margin: 0,
  padding: 6,
  scale: {
    x: { type: 'point', domain: data.map(({ day }) => day) },
    y: { domain: [0, 12000], nice: false },
  },
  axis: false,
  legend: false,
  children: [
    {
      type: 'area',
      encode,
      style: {
        fill: 'linear-gradient(90deg, rgba(53,99,204,0.60) 0%, rgba(53,99,204,0.08) 100%)',
      },
      tooltip: false,
    },
    {
      type: 'line',
      encode,
      style: { stroke: '#3563CC', lineWidth: 2 },
      tooltip: {
        title: 'day',
        items: [{
          channel: 'y',
          name: 'Token 用量',
          valueFormatter: (value) => value == null ? '缺测' : `${value.toLocaleString('en-US')} Token`,
        }],
      },
    },
    {
      type: 'lineY',
      data: [dailyBudget],
      style: { stroke: '#A54A18', lineWidth: 2, lineDash: [4, 3] },
      labels: [
        {
          text: `日预算 ${dailyBudget.toLocaleString('en-US')} Token`,
          position: 'top-left',
          style: { fill: '#A54A18', fontSize: 10, textBaseline: 'bottom', dy: -3 },
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
```
