# Radar 雷达图

> 组件用途：在极坐标下展示单个或多个对象的多维能力评分。

## 何时使用

- 多维能力评估：产品的设计/性能/续航/拍照等评分
- 多对象多维对比：两款手机、两名候选人的能力画像
- 维度数量 4~8 个，各维度同量纲（如都是 0~100 分）

## 何时不用

- 维度量纲不同（分数 + 金额 + 百分比）→ 先归一化，否则图形失真
- 单维度对比 → 用 column 柱状图
- 类别占比 → 用 pie 饼图

## 数据要求

- 长表数据，每行一个维度观测值，见 [数据模式](../references/data-patterns.md)
- `x` 字段：维度名字符串
- `y` 字段：数值（number），各维度同量纲
- `series` 字段（多系列时）：对象名字符串，用于 `encode.color` 分组

## 基础实现（G2 v5）

雷达图 = `type: 'view'` + `coordinate: { type: 'polar' }` + area/line/point children 叠加。

```ts
import { Chart } from '@antv/g2';

const data = [
  { item: '设计', score: 85 },
  { item: '性能', score: 72 },
  { item: '续航', score: 90 },
  { item: '拍照', score: 60 },
  { item: '屏幕', score: 78 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  coordinate: { type: 'polar' },
  scale: {
    x: { padding: 0.5, align: 0 },
    y: { tickCount: 5, domainMin: 0, domainMax: 100 },
  },
  axis: {
    x: { grid: true },
    y: { zIndex: 1, title: false, label: false },
  },
  children: [
    {
      type: 'area',
      encode: { x: 'item', y: 'score' },
      style: { fill: '#5B8FF9', fillOpacity: 0.25 },
    },
    {
      type: 'line',
      encode: { x: 'item', y: 'score' },
      style: { stroke: '#5B8FF9', lineWidth: 2 },
    },
  ],
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多系列对比 | 各 child 的 `encode` 加 `color: 'series'` | [multi-series.ts](../examples/radar/multi-series.ts) |
| 带数据点 | children 加 `type: 'point'` | 见 [basic.ts](../examples/radar/basic.ts) |

多系列核心差异（area 用低透明度避免遮挡）：

```ts-snippet
children: [
  { type: 'area', encode: { x: 'item', y: 'score', color: 'product' }, style: { fillOpacity: 0.15 } },
  { type: 'line', encode: { x: 'item', y: 'score', color: 'product' }, style: { lineWidth: 2 } },
],
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 维度间距 | `scale: { x: { padding: 0.5, align: 0 } }` | 让首个维度在 12 点方向 |
| 刻度范围 | `scale: { y: { domainMin: 0, domainMax: 100 } }` | 固定起点 0，避免视觉夸大 |
| 网格线 | `axis: { x: { grid: true } }` | 雷达图常规配置 |
| 隐藏径向轴 | `axis: { y: { label: false, title: false } }` | 只留网格更干净 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| 忘记 `coordinate: { type: 'polar' }` | 不加则渲染成普通直角坐标折线/面积图 |
| 用 `type: 'radar'` | 无此类型；用 `type: 'view'` + polar + area/line children |
| y 轴不固定 `domainMin: 0` | 不固定起点会放大差异，误导对比 |
| `new Radar('container', {...})`（G2Plot v2） | `new Chart({ container })` + view + polar |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/radar/basic.ts) | 单对象多维评估 | `polar` + area/line/point children |
| [multi-series.ts](../examples/radar/multi-series.ts) | 多对象多维对比 | `encode.color` + 低 `fillOpacity` |
