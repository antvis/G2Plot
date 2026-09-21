# Pie 饼图

> 组件用途：展示少量类别占总体的比例构成。

## 何时使用

- 占比/构成：流量来源分布、销售额品类构成、预算分配
- 类别数量少（≤ 6 个），各类别占比差异明显
- 需要中心展示汇总指标时用环形图（Donut）

## 何时不用

- 类别很多（> 6 个）→ 用 bar 条形图（饼图切片过细难读）
- 类别间数值对比（非占比）→ 用 column 柱状图
- 占比随时间变化 → 用堆叠 area 面积图

## 数据要求

- 长表数据，每行一个类别，见 [数据模式](../references/data-patterns.md)
- `y` 字段：数值（number），映射为扇形角度
- `color` 字段：类别字符串
- 饼图**不需要** `x` 通道

## 基础实现（G2 v5）

饼图三要素：`type: 'interval'` + `transform: [{ type: 'stackY' }]` + `coordinate: { type: 'theta' }`，缺一不可。

```ts
import { Chart } from '@antv/g2';

const data = [
  { source: '搜索引擎', value: 400 },
  { source: '社交媒体', value: 300 },
  { source: '直接访问', value: 200 },
  { source: '外部链接', value: 100 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { y: 'value', color: 'source' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta' },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 环形图 | `coordinate.theta` 加 `innerRadius: 0.6` | [donut.ts](../examples/pie/donut.ts) |
| 百分比标签 | `labels` 的 `text` 用回调算占比 | [percentage.ts](../examples/pie/percentage.ts) |
| 交互 + 动画 | `interaction` 高亮/筛选 + `animate.enter` 用 `waveIn` | [interaction.ts](../examples/pie/interaction.ts) |

环形图核心差异：

```ts-snippet
coordinate: { type: 'theta', innerRadius: 0.6 }, // 0.5~0.7 是常见值
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 外径 | `coordinate: { type: 'theta', outerRadius: 0.8 }` | 给外部标签留空间 |
| 调色板 | `scale: { color: { range: [...] } }` | 各类别着色 |
| 标签位置 | `labels: [{ position: 'outside' }]` | 外部标签更易读 |
| 图例位置 | `legend: { color: { position: 'right' } }` | |
| 悬停高亮 | `interaction: [{ type: 'elementHighlight' }]` | |
| 图例筛选 | `interaction: [{ type: 'legendFilter' }]` | 点击图例隐藏/显示对应扇形 |
| 入场动画 | `animate: { enter: { type: 'waveIn', duration: 1000 } }` | 极坐标专用波浪展开 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| 忘记 `stackY` | 必须加，否则所有扇形从 0 开始完全重叠 |
| 用 `coordinate: { type: 'polar' }` 做饼图 | 饼图用 `theta`；`polar` 得到的是玫瑰图 |
| `encode` 里写 `x: 'type'` | theta 饼图只需 `y` 和 `color`，`x` 多余 |
| `new Pie('container', {...})`（G2Plot v2） | `new Chart({ container })` + `type: 'interval'` + theta |
| `radius: 0.8` / `innerRadius: 0.6`（v2 顶层配置） | 放进 `coordinate.theta` 的 `outerRadius` / `innerRadius` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/pie/basic.ts) | 少量类别占比，最简起步 | `stackY` + `coordinate: { type: 'theta' }` |
| [donut.ts](../examples/pie/donut.ts) | 构成 + 中心汇总区 | `innerRadius: 0.6` |
| [percentage.ts](../examples/pie/percentage.ts) | 直接展示百分比 | `labels` text 回调、`tooltip` 格式化 |
| [interaction.ts](../examples/pie/interaction.ts) | 悬停高亮、图例筛选、入场动效 | `elementHighlight` + `legendFilter` + `animate.enter: waveIn` |
