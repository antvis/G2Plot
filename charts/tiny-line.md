# Tiny Line 迷你折线图

> 组件用途：在指标卡、表格行等紧凑空间内，用一条精简折线展示单系列数据的整体趋势。

## 何时使用

- 指标卡趋势：日活、销售额、转化率等指标的近期走向
- 表格或列表行内趋势：每个商品、门店或地区配一条小型趋势线
- 空间有限，只关注上升、下降和波动形态，不需要从坐标轴精确读数
- 单系列、数据有序且通常不少于 5 个点

## 何时不用

- 需要精确读数、坐标刻度或轴标题 → 用 line 折线图
- 多系列趋势对比 → 用带图例的多系列 line 折线图
- 强调累积量或量级感 → 用 area 面积图
- 无序类别间数值对比 → 用 column 柱状图
- 不同卡片间需要按绝对数值严格比较 → 用保留统一坐标刻度的 line；迷你折线各自隐藏坐标轴，容易误读幅度

## 数据要求

- 长表数据，每行一个数据点，见 [数据模式](../references/data-patterns.md)
- `x` 字段：时间字符串或有序类别，数据按业务顺序排列
- `y` 字段：数值（number）；字符串数字先 `Number()` 转换
- 默认一张迷你折线只展示一个指标，不需要 `series` 字段
- 缺失值用 `null` 表示，不要用 `0` 代替；默认在缺失处断线

## 基础实现（G2 v5）

Tiny Line 不是独立的 G2 mark，而是 `type: 'line'` 加上精简组件配置。必须保留 `encode.x/y`，并关闭坐标轴、图例和不需要的 tooltip。

```ts
/**
 * 基础迷你折线图
 * 场景：在指标卡或表格行内展示单个指标的短期趋势，如每日新增订阅数
 * 要点：使用 line mark，关闭坐标轴、图例和 tooltip，只保留趋势线
 */
import { Chart } from '@antv/g2';

const data = [
  { date: '2026-10-01', newSubscribers: 120 },
  { date: '2026-10-02', newSubscribers: 132 },
  { date: '2026-10-03', newSubscribers: 101 },
  { date: '2026-10-04', newSubscribers: 164 },
  { date: '2026-10-05', newSubscribers: 182 },
  { date: '2026-10-06', newSubscribers: 156 },
  { date: '2026-10-07', newSubscribers: 210 },
  { date: '2026-10-08', newSubscribers: 236 },
  { date: '2026-10-09', newSubscribers: 218 },
  { date: '2026-10-10', newSubscribers: 264 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'date', y: 'newSubscribers' },
  axis: { x: false, y: false },
  legend: false,
  tooltip: false,
  style: { stroke: '#5B8FF9', lineWidth: 2 },
});

chart.render();
```

使用 `autoFit: true` 时，由页面 CSS 为容器设置非零高度；指标名称、当前值等精确信息放在卡片或表格的图外文字中。

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 平滑迷你折线 | `encode` 增加 `shape: 'smooth'` | [smooth.ts](../examples/tiny-line/smooth.ts) |
| 品牌色与预测虚线 | `style` 设置 `stroke`、`lineWidth`、`lineDash` | [custom-style.ts](../examples/tiny-line/custom-style.ts) |

平滑曲线核心差异：

```ts-snippet
encode: { x: 'hour', y: 'temperature', shape: 'smooth' },
```

平滑只改变视觉插值，不会补充或修正数据；需要保留突变和异常尖峰时不要使用 `smooth`。

## 样式自定义

常用视觉定制项，完整示例见 [custom-style.ts](../examples/tiny-line/custom-style.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 固定线色 | `style: { stroke: '#5B8FF9' }` | 单系列直接指定颜色 |
| 线宽 | `style: { lineWidth: 3 }` | 小尺寸下建议保持清晰，但不要过粗 |
| 虚线 | `style: { lineDash: [6, 4] }` | 数组依次表示实线段与间隔长度，适合预测趋势 |
| 平滑曲线 | `encode: { shape: 'smooth' }` | 弱化折角，见 [smooth.ts](../examples/tiny-line/smooth.ts) |
| 关闭坐标轴 | `axis: { x: false, y: false }` | 两个轴分别关闭，是迷你布局的核心 |
| 关闭图例 | `legend: false` | 指标名称由图外文案表达 |
| 关闭提示 | `tooltip: false` | 纯装饰或行内趋势可关闭；需要悬停读数时不要设置 |
| 断点连接 | `style: { connect: true, connectStroke: '#aaa', connectLineDash: [4, 4] }` | 默认 `connect: false`，数据为 `null` 时断开；置 `true` 可跨断点连接 |

需要悬停读数时，可保留精简坐标轴配置，仅将 tooltip 改为格式化提示：

```ts-snippet
tooltip: {
  title: 'date',
  items: [
    {
      channel: 'y',
      name: '新增订阅',
      valueFormatter: (value) => `${value} 人`,
    },
  ],
},
```

不要在小空间内重新开启全部标题、坐标轴、图例和数据标签；这些需求更适合完整 line 折线图。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `import { TinyLine } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| `new TinyLine('container', { xField, yField })` | `new Chart({ container })` + `chart.options({ type: 'line', encode: { x, y } })` |
| `type: 'tiny-line'`（G2 v5 没有此 mark） | `type: 'line'`，再关闭辅助组件 |
| `.position('date*value')` | `encode: { x: 'date', y: 'value' }` |
| `smooth: true` 或 `.shape('smooth')` | `encode: { shape: 'smooth' }` |
| `color: '#f00', lineStyle: { lineWidth: 3 }`（v2 配置） | `style: { stroke: '#f00', lineWidth: 3 }` |
| `xAxis: false, yAxis: false`（v2 配置） | `axis: { x: false, y: false }` |
| `chart.tooltip(false)`（v4 链式） | spec 中 `tooltip: false` |
| 隐藏坐标轴后省略 `encode.y` | 坐标轴是否显示与数据映射无关，始终保留 `encode.x/y` |
| 空容器使用 `autoFit` 后图表不可见 | 为容器设置非零 CSS 高度；不要依赖空 `div` 的默认高度 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/tiny-line/basic.ts) | 指标卡或表格行内的单系列趋势 | `type: 'line'`、`encode: { x, y }`、`axis: { x: false, y: false }`、`tooltip: false` |
| [smooth.ts](../examples/tiny-line/smooth.ts) | 天气卡片中的平滑气温趋势 | `encode.shape: 'smooth'`、无坐标轴与图例 |
| [custom-style.ts](../examples/tiny-line/custom-style.ts) | 品牌看板中的营收预测趋势 | `style.stroke/lineWidth/lineDash` |
