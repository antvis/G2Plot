# Funnel 漏斗图

> 组件用途：展示流程各阶段的数值递减与转化情况。

## 何时使用

- 流程转化：访问 → 咨询 → 报价 → 成交、曝光 → 点击 → 加购 → 支付
- 各阶段有严格先后顺序，数值逐级递减
- 关注每一步的流失与转化率

## 何时不用

- 无顺序的类别对比 → 用 column 柱状图
- 占比构成 → 用 pie 饼图
- 阶段不递减（中间有回升）→ 漏斗形态会误导，改用 bar 条形图

## 数据要求

- 长表数据，每行一个阶段，按流程顺序排列，见 [数据模式](../references/data-patterns.md)
- `x` 字段：阶段名字符串
- `y` 字段：数值（number），通常逐级递减

## 基础实现（G2 v5）

漏斗图四要素：`type: 'interval'` + `encode.shape: 'funnel'` + `transform: [{ type: 'symmetryY' }]`（左右对称）+ `coordinate` 转置。

```ts
import { Chart } from '@antv/g2';

const data = [
  { stage: '访问', value: 8043 },
  { stage: '咨询', value: 2136 },
  { stage: '报价', value: 908 },
  { stage: '议价', value: 691 },
  { stage: '成交', value: 527 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'stage', y: 'value', color: 'stage', shape: 'funnel' },
  coordinate: { transform: [{ type: 'transpose' }] },
  transform: [{ type: 'symmetryY' }],
  axis: false,
  legend: false,
  labels: [
    {
      text: (d) => `${d.stage} ${d.value}`,
      position: 'inside',
      transform: [{ type: 'contrastReverse' }],
    },
  ],
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 金字塔 | `shape: 'pyramid'` + `style: { reverse: true }` | [pyramid.ts](../examples/funnel/pyramid.ts) |

金字塔核心差异：

```ts-snippet
encode: { x: 'level', y: 'value', color: 'level', shape: 'pyramid' },
style: { reverse: true }, // 小值在顶部
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 标签对比色 | `labels` 加 `transform: [{ type: 'contrastReverse' }]` | 深底白字自动适配 |
| 调色板 | `scale: { color: { range: [...] } }` | 各阶段着色 |
| 隐藏轴/图例 | `axis: false`、`legend: false` | 漏斗图常规配置 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| 忘记 `symmetryY` | 必须加，否则漏斗不居中、偏向一侧 |
| 忘记 `transpose` | 不加则漏斗竖向单层堆叠，非常规漏斗形态 |
| `type: 'funnel'` | 无此类型；用 `type: 'interval'` + `encode.shape: 'funnel'` |
| `new Funnel('container', {...})`（G2Plot v2） | `new Chart({ container })` + interval + funnel shape |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/funnel/basic.ts) | 流程转化，最简起步 | `shape: 'funnel'` + `symmetryY` + `transpose` |
| [pyramid.ts](../examples/funnel/pyramid.ts) | 层级结构占比，小值在顶 | `shape: 'pyramid'` + `style: { reverse: true }` |
