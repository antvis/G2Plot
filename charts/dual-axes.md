# Dual Axes 双轴图

> 组件用途：同图对比两个量级或单位不同的指标，左右各一根 y 轴。

## 何时使用

- 量级悬殊的双指标：销售额（万元）vs 增长率（%）、PV（百万）vs 转化率（%）
- 柱线组合：柱表达绝对量、线表达比率/趋势
- 两个指标共享同一 x 轴（通常是时间）

## 何时不用

- 两个指标同单位同量级 → 用多系列 line 或 column（单轴即可）
- 指标间无业务关联 → 拆成两张图更清晰
- 占比构成 → 用 pie 饼图

## 数据要求

- 长表数据，每行一个 x 观测点，两个数值字段并列，见 [数据模式](../references/data-patterns.md)
- `x` 字段：时间字符串或有序类别
- 两个 `y` 字段：均为数值（number），量级/单位不同

## 基础实现（G2 v5）

双轴图 = `type: 'view'` + children 叠加两个 mark；第二个 mark 用 `scale: { y: { independent: true } }` 启用独立右轴。

```ts
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', sales: 320, growth: 0.12 },
  { month: 'Feb', sales: 420, growth: 0.31 },
  { month: 'Mar', sales: 380, growth: -0.1 },
  { month: 'Apr', sales: 520, growth: 0.37 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'interval',
      encode: { x: 'month', y: 'sales' },
      axis: { y: { title: '销售额（万元）' } },
    },
    {
      type: 'line',
      encode: { x: 'month', y: 'growth' },
      scale: { y: { independent: true } },
      style: { stroke: '#F6BD16', lineWidth: 2 },
      axis: { y: { title: '增长率', labelFormatter: (v) => `${(v * 100).toFixed(0)}%` } },
    },
  ],
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 柱线双轴 | children：interval + line | [column-line.ts](../examples/dual-axes/column-line.ts) |
| 双折线双轴 | children：line + line，第二条独立 y 轴 | [two-lines.ts](../examples/dual-axes/two-lines.ts) |

核心要点：每个 child 各自配置 `encode.y`、`scale.y`、`axis.y`、`style.stroke`；用颜色区分左右轴归属（左轴系列用主色、右轴系列用对比色）。

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 右轴独立刻度 | 第二 child 加 `scale: { y: { independent: true } }` | 双轴的核心开关 |
| 轴标题 | 各 child 的 `axis: { y: { title } }` | 左右轴分别命名 |
| 百分比格式化 | `axis.y.labelFormatter: (v) => ...` | 比率轴常用 |
| 系列颜色 | 各 child 的 `style.stroke` / `style.fill` | 与轴标题颜色呼应更易读 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| 忘记 `scale: { y: { independent: true } }` | 不加则两系列共用一根轴，量级小的被压平 |
| 用 `type: 'dualAxes'` | 无此类型；用 `type: 'view'` + children |
| `new DualAxes('container', {...})`（G2Plot v2） | `new Chart({ container })` + view children |
| `yField: ['sales', 'growth']`（v2 配置） | 各 child 分别 `encode: { y: '字段' }` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [column-line.ts](../examples/dual-axes/column-line.ts) | 销售额（柱）+ 增长率（线） | `view` children、`scale.y.independent` |
| [two-lines.ts](../examples/dual-axes/two-lines.ts) | PV + 转化率双折线 | 双 line children、各自 `axis.y` |
