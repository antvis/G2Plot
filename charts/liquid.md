# Liquid 水波图

> 组件用途：用圆形中的液位与波浪展示单个百分比指标，突出完成率、进度或利用率。

## 何时使用

- 单一 KPI：季度目标完成率、项目进度、任务达成率
- 资源利用率：内存、CPU、存储容量或预算使用率
- 仪表盘核心指标：需要一个醒目的百分比读数，并通过液位提供直观反馈
- 指标可规范化为 0~1，且当前状态比历史变化或类别比较更重要

## 何时不用

- 多个类别的占比构成 → 用 pie 饼图
- 百分比随时间的变化趋势 → 用 line 折线图
- 多个指标或类别之间的数值比较 → 用 column 柱状图
- 需要展示精确刻度、阈值区间或超过 100% 的指针式读数 → 用 gauge 仪表盘或柱形进度图

## 数据要求

- 单值数据：`data` 直接接收一个 `number`，**不是对象数组**，也不需要 `encode`
- 取值范围：0~1，例如 72% 传 `0.72`，不要传 `72`
- 业务比例可由原始量计算：`const completionRate = completedCount / targetCount`
- 使用语义化变量名，如 `orderCompletionRate`、`memoryUsageRate`；数据源需自行处理目标量为 0、缺失值及超范围值

## 基础实现（G2 v5）

```ts
/**
 * 基础水波图
 * 场景：运营看板展示本季度订单完成率，突出单一核心指标
 * 要点：liquid 的 data 是 0~1 的单个数值；由完成量与目标量计算得出
 */
import { Chart } from '@antv/g2';

const completedOrderCount = 720;
const targetOrderCount = 1000;
const orderCompletionRate = completedOrderCount / targetOrderCount;

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: orderCompletionRate,
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 品牌色波浪 | `style.fill` 设置颜色，`style.fillOpacity` 设置透明度 | [custom-style.ts](../examples/liquid/custom-style.ts) |
| 中心百分比格式化 | `style.text.style.formatter` 将 0~1 数值格式化为百分比 | [custom-style.ts](../examples/liquid/custom-style.ts) |
| 自定义外框与背景 | `style.outlineBorder`、`style.outlineDistance`、`style.background.fill` | [custom-style.ts](../examples/liquid/custom-style.ts) |

中心文字保留一位小数的核心差异：

```ts-snippet
style: {
  text: {
    style: {
      formatter: (value: number) => `${(value * 100).toFixed(1)}%`,
    },
  },
},
```

## 样式自定义

完整示例见 [custom-style.ts](../examples/liquid/custom-style.ts)。

| 定制项 | 写法 | 说明 |
|---|---|---|
| 波浪颜色 | `style: { fill: '#5B8FF9' }` | 固定单一指标的波浪颜色 |
| 波浪透明度 | `style: { fillOpacity: 0.85 }` | 取值 0~1 |
| 外框宽度 | `style: { outlineBorder: 4 }` | 圆形外框的边框宽度 |
| 外框间距 | `style: { outlineDistance: 8 }` | 外框与液位圆的间距，单位 px |
| 波浪长度 | `style: { waveLength: 128 }` | 数值越大，单个波浪越长 |
| 背景圆颜色 | `style: { background: { fill: '#E8F0FE' } }` | 设置未被波浪覆盖区域的底色 |
| 中心文字样式 | `style: { text: { style: { fontSize: 32, fill: '#10239E' } } }` | 可设置字号、字重和颜色 |
| 中心文字内容 | `style.text.style.formatter` | 回调接收 0~1 数值，返回展示字符串 |
| 关闭多余组件 | `axis: false, legend: false, tooltip: false` | 单指标展示通常无需这些组件 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `import { Liquid } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| `new Liquid('container', { percent: 0.72 })` | `new Chart({ container })` + `chart.options({ type: 'liquid', data: 0.72 })` |
| `percent: 0.72`（G2Plot v2 配置） | `data: 0.72` |
| `data: [{ percent: 0.72 }]` | `data: 0.72`；liquid 直接接收单个数值 |
| `data: 72` 表示 72% | `data: 0.72`；先将百分数除以 100 |
| `encode: { y: 'percent' }` | liquid 不需要 `encode`，直接通过 `data` 传值 |
| 用 `labels` 配置中心百分比 | 使用 `style.text.style` 配置中心文字及其 `formatter` |
| `formatter` 直接拼接 `value` 与 `%`，把 0.72 显示成 0.72% | 先计算 `value * 100`，再格式化并拼接 `%` |
| 直接复用长表、多系列或 `color` 分组思路 | 一个 liquid 只表达一个指标；多指标请拆成多个图表或更换选型 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/liquid/basic.ts) | 订单目标完成率，最简起步 | `type: 'liquid'` + 单值 `data` |
| [custom-style.ts](../examples/liquid/custom-style.ts) | 内存使用率与品牌化监控卡片 | `fill/fillOpacity`、`outlineBorder/outlineDistance`、`waveLength`、`background`、`text.style.formatter` |
