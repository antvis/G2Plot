# Beeswarm 熊蜂图

> 组件用途：展示分类类别下数值的分布情况，通过点的位置和密度直观展示数据分布，适合小到中等规模的分类数据集。

## 何时使用

- **分类分布展示**：查看不同类别下数值的分布情况，如不同实验组的基因表达量、不同处理方案的效果分布
- **小规模数据可视化**：数据点 ≤ 200 条，希望展示每个数据点的具体位置和分布密度
- **替代箱线图**：当需要展示具体数据点而非五数概括时，或当数据量适中不想丢失个体信息时
- **多类别比较**：比较多个类别的数值分布差异

## 何时不用

- 大规模数据（> 500 条）：点会重叠过多，视觉效果差 → 使用 violin 小提琴图 或 histogram 直方图
- 连续二维空间的点密度分布：用 `type: 'heatmap'` 渐变热力图
- 时间序列趋势：用 `type: 'line'` 折线图
- 类别间纯数值大小对比：用 `type: 'column'` 柱状图

## 数据要求

- **长表数据**，每行一个数据点，包含类别字段和数值字段
- `category` 字段：类别标识符（字符串），表示数据属于哪个分组
- `value` 字段：数值（number），表示要展示的测量值
- **建议**：每个类别建议 5-50 个数据点，点过多时建议抽样或使用抖动策略

```ts
const data = [
  { category: 'Control', value: 12.5 },
  { category: 'Control', value: 15.3 },
  { category: 'Control', value: 11.8 },
  { category: 'Treatment', value: 22.1 },
  { category: 'Treatment', value: 19.7 },
  { category: 'Treatment', value: 23.4 },
];
```

## 基础实现（G2 v5）

Beeswarm 图通过 `type: 'point'` 标记展示个体数据点，类别通过 x 轴编码，数值通过 y 轴编码。点在类别内部通过轻微抖动（x jitter）防止重叠。

```ts
import { Chart } from '@antv/g2';

const data = [
  { category: 'Control', value: 12.5 },
  { category: 'Control', value: 15.3 },
  { category: 'Control', value: 11.8 },
  { category: 'Treatment', value: 22.1 },
  { category: 'Treatment', value: 19.7 },
  { category: 'Treatment', value: 23.4 },
  { category: 'Treatment', value: 21.0 },
  { category: 'Treatment', value: 24.5 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data,
  encode: {
    x: 'category',
    y: 'value',
  },
  // 点的样式自定义
  style: {
    fill: '#5B8FF9',
    stroke: '#1890FF',
    lineWidth: 2,
  },
  // 坐标轴配置
  axis: {
    x: { title: '实验组' },
    y: { title: '数值', min: 0 },
  },
  // 图例配置
  legend: false,
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 带数据标签 | `labels: [{ text: 'value', position: 'top' }]` | [with-label.ts](../examples/beeswarm/with-label.ts) |
| 多系列分组 | `encode.color: 'group'`，通过颜色分组不同实验 | [multi-group.ts](../examples/beeswarm/multi-group.ts) |
| 自定义点大小 | `encode.size: 'value'`，根据数值大小变点大小 | [size-variable.ts](../examples/beeswarm/size-variable.ts) |
| 水平展示 | `coordinate: { type: 'rect' }` 或交换 x/y 字段 | [horizontal.ts](../examples/beeswarm/horizontal.ts) |

### 带数据标签核心差异

```ts-snippet
chart.options({
  type: 'point',
  data,
  encode: { x: 'category', y: 'value' },
  labels: [{ text: 'value', position: 'top', style: { fontSize: 10 } }],
});
```

### 多系列分组核心差异（数据需含 `group` 字段）

```ts-snippet
chart.options({
  type: 'point',
  data,
  encode: { x: 'category', y: 'value', color: 'group' },
});
```

## 样式自定义

常用视觉定制项（以下写法均经 `@antv/g2` ^5 类型校验），完整示例见 [with-label.ts](../examples/beeswarm/with-label.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 点的颜色 | `style: { fill: '#5B8FF9' }` | 固定点颜色 |
| 点的颜色 scales | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 多系列按序着色 |
| 点的大小 | `style: { size: 6 }` | 固定点大小 |
| 点的大小 scales | `encode.size: 'value'` | 根据数值大小变点大小 |
| 透明度 | `style: { opacity: 0.7 }` | 整体透明度 |
| 坐标轴标题 | `axis: { x: { title: '类别' } }` | x/y 轴标题 |
| 刻度标签字体 | `axis.x.labelFontSize: 10` | x 轴刻度字体大小 |
| 关闭坐标轴 | `axis: { x: false }` | 关闭 x 轴 |
| 关闭图例 | `legend: false` | 关闭图例 |

### 图表标题与组件文字样式

`title: { title: '...', subtitle: '...', align: 'left' }`，一行切换整体配色。暗色场景用 `theme: 'classicDark'`。

### 内置主题

`theme: 'light' | 'dark' | 'classic' | 'classicDark' | 'academy'`，一行切换整体配色。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `.position('category*value')` | `.encode('x', 'category').encode('y', 'value')` |
| `import { BeeSwarm } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` + `type: 'point'` |
| `new BeeSwarm('container', {...})`（不存在的组件） | `new Chart({ container })` + `chart.options({ type: 'point', ... })` |
| `size: 'value'`（未编码） | `encode.size: 'value'` 或 `style: { size: number }` |
| 点重叠严重未抖动 | 需要配合数据预处理或 `transform` 进行抖动处理 |
| `chart.source(data)`（v4） | `chart.options({ data })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/beeswarm/basic.ts) | 最简 beeswarm 图，单类别分布 | `type: 'point'` + `encode: { x, y }` |
| [with-label.ts](../examples/beeswarm/with-label.ts) | 点旁标注数值 | `labels` + `encode x/y` |
| [multi-group.ts](../examples/beeswarm/multi-group.ts) | 多组别对比（颜色分组） | `encode.color: 'group'` |
| [size-variable.ts](../examples/beeswarm/size-variable.ts) | 点大小反映数值大小 | `encode.size: 'value'` |
| [horizontal.ts](../examples/beeswarm/horizontal.ts) | 水平展示形式 | 坐标轴互换 |