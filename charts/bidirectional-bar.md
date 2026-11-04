# Bidirectional-Bar 双向条形图

> 组件用途：展示既有正值又有负值的类别数据，条条从中心 baseline 排出，正负双向对比。常用于满意度调查、得票对比、利润正负分析等场景。

## 何时使用

- 正负值对比：满意度调查（满意/不满意）、得票正负对比、利润亏损分析
- 双向评级：Likert 量表（如：非常不同意 → 非常同意）、员工满意度两端评分
- 需要同时展示正负趋势或量级，且类别维度较少（≤ 10 个）

## 何时不用

- 单纯正值对比 → 用 `type: 'interval'`（单向柱状图），更直观
- 类别很多且名称短 → 用 column 柱状图，竖向更紧凑
- 时间趋势 → 用 line 折线图
- 占比构成 → 用 pie 饼图

## 数据要求

- 长表数据，每行一个类别 + 正负数值对
- `category` 字段：类别字符串（如「东区」「西区」「北区」）
- `value` 字段：数值（number），**正数向右延伸，负数向左延伸**
- 正负值会自动以 0 为中心分别向两侧延伸

## 基础实现（G2 v5）

双向条形图 = `type: 'interval'` + 通过 scale 域包含负负正正 + `coordinate: { transform: ['transpose'] }` 实现横向展示。encode 中仍按 `x=数值、y=类别` 写，坐标系 transform 负责转置。

```ts
import { Chart } from '@antv/g2';

const data = [
  { category: '东区', value: 120 },
  { category: '西区', value: -80 },
  { category: '北区', value: 150 },
  { category: '南区', value: -50 },
  { category: '中区', value: 90 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'value', y: 'category' },
  scale: { x: { nice: false } },
  coordinate: { transform: [{ type: 'transpose' }] },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多系列分组 | `encode` 加 `color` 映射系列字段 + `transform` 加 `dodgeX` 避免重叠 | [multi-series.ts](../examples/bidirectional-bar/multi-series.ts) |
| 中心标线 | 在 0 处添加虚线参考线 `style: { lineDash: [4, 4] }` | [center-line.ts](../examples/bidirectional-bar/center-line.ts) |
| 数值标签 | `labels: [{ text: 'value', position: 'right' }]` 显示数值在条端 | [with-label.ts](../examples/bidirectional-bar/with-label.ts) |
| 绝对值排序 | `transform` 加 `sortX` 按绝对值 `|value|` 降序排列 | [sort-by-absolute.ts](../examples/bidirectional-bar/sort-by-absolute.ts) |

## 样式自定义

常用视觉定制项（均经 `@antv/g2` ^5 类型校验）：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 条体颜色 | `style: { fill: '#5B8FF9' }` | 单系列固定色 |
| 正负色区分 | `scale: { color: { range: ['#e6f2ff', '#1890ff'] } }` | 正负值用不同色阶区分 |
| 参考线 | `style: { stroke: '#8c8c8c', lineDash: [4, 4] }` | 在 0 处绘制虚线中心基线 |
| 数据标签 | `labels: [{ text, position: 'right', style: { fontSize: 10 } }]` | 条端展示数值 |
| 座标轴隐藏 | `axis: { x: false }` | 隐藏数值轴（仅保留类别轴） |

### 图表标题与组件文字样式

`title: { title: '...', subtitle: '...', align: 'left', titleFontSize: 16, titleFill: '#1d1d1d' }`，与 line 组件写法一致。

数据标签与 tooltip 格式化，完整示例见 [with-label.ts](../examples/bidirectional-bar/with-label.ts)：

```ts
labels: [{ text: 'value', position: 'right', style: { fontSize: 10 } }],
tooltip: {
  title: 'category',
  items: [{ channel: 'x', name: '数值', valueFormatter: (v) => `${v > 0 ? '+' : ''}${v} 件' }],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `.position('value*category')` | `.encode('x', 'value').encode('y', 'category')` |
| `import { Bar } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` + `type: 'interval'` |
| `new Bar('container', { xField, yField })` | `new Chart({ container })` + `chart.options(spec)` |
| `seriesField: 'series'`（v2 配置） | `encode: { color: 'series' }` |
| 正负值不设 scale 域 | 显式 `scale: { x: { nice: false } }` 确保包含负值，否则正数可能被截断 |
| `type: 'bar'`（G2Plot v2） | `type: 'interval'` + `coordinate: { transform: ['transpose'] }` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/bidirectional-bar/basic.ts) | 最简双向条形图，正负值从中心延伸 | `encode: { x: 'value', y: 'category' }` + `scale: { x: { nice: false } }` |
| [multi-series.ts](../examples/bidirectional-bar/multi-series.ts) | 多系列分组双向条形图 | `encode.color` + `transform: [{ type: 'dodgeX' }]` |
| [center-line.ts](../examples/bidirectional-bar/center-line.ts) | 中心虚线参考线，便于正负估值 | `style: { stroke, lineDash }` |
| [with-label.ts](../examples/bidirectional-bar/with-label.ts) | 数值标签直接标在条端 | `labels` 配置 + `valueFormatter` |
| [sort-by-absolute.ts](../examples/bidirectional-bar/sort-by-absolute.ts) | 按绝对值大小排序，最大的在中间 | `transform: [{ type: 'sortX', by: 'value' }]` 绝对值降序 |