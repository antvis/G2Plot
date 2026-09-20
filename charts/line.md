# Line 折线图

> 组件用途：展示连续变量（通常是时间）的变化趋势，支持多系列对比。

## 何时使用

- 时间序列趋势：股价、气温、销售额走势、PV/UV 变化
- 多系列趋势对比：多产品线营收、多城市气温
- 数据点较多（≥ 5 个）且关注整体走向而非单点数值

## 何时不用

- 无序类别间数值对比 → 用 column 柱状图
- 占比/构成 → 用 pie 饼图
- 两个数值变量的相关性 → 用 scatter 散点图
- 强调累积量/量级感 → 用 area 面积图

## 数据要求

- 长表数据，每行一个数据点，见 [数据模式](../references/data-patterns.md)
- `x` 字段：时间字符串（`'2026-01'`）或有序类别；**不要**预先格式化成展示文案
- `y` 字段：数值（number）；字符串数字先 `Number()` 转换
- `series` 字段（多系列时）：字符串，用于 `encode.color` 分组

## 基础实现（G2 v5）

```ts
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 150 },
  { month: 'Apr', value: 280 },
  { month: 'May', value: 220 },
  { month: 'Jun', value: 350 },
];

const chart = new Chart({
  container: 'container',
  width: 640,
  height: 360,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'month', y: 'value' },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多系列 | `encode` 增加 `color: 'series'` | [multi-series.ts](../examples/line/multi-series.ts) |
| 平滑曲线 | `encode` 增加 `shape: 'smooth'` | [smooth.ts](../examples/line/smooth.ts) |
| 阶梯线 | `shape: 'hvh'`（或 `'hv'` / `'vh'`） | [step.ts](../examples/line/step.ts) |

多系列核心差异（数据需含 `series` 字段）：

```ts-snippet
chart.options({
  type: 'line',
  data,
  encode: { x: 'month', y: 'value', color: 'series' },
});
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `.position('month*value')` | `.encode('x', 'month').encode('y', 'value')` |
| `import { Line } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| `new Line('container', { xField, yField })` | `new Chart({ container })` + `chart.options(spec)` |
| `seriesField: 'series'`（v2 配置） | `encode: { color: 'series' }` |
| `smooth: true`（v2 配置） | `encode: { shape: 'smooth' }` |
| `.shape('smooth')`（v4 链式） | `encode: { shape: 'smooth' }` |
| `chart.source(data)`（v4） | `chart.options({ data })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

- [basic.ts](../examples/line/basic.ts) — 基础折线
- [multi-series.ts](../examples/line/multi-series.ts) — 多系列
- [smooth.ts](../examples/line/smooth.ts) — 平滑曲线
- [step.ts](../examples/line/step.ts) — 阶梯线
