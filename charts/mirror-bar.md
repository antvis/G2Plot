# Mirror Bar 对称条形图

> 组件用途：以中央零轴为界，把两组相反含义的数值左右对称排开，直观对比两个方向的数量。

## 何时使用

- 双向对比：男女、收入/支出、完成/未完成、流入/流出
- 人口金字塔（butterfly chart）、龙卷风图（tornado chart）
- 类别名较长或类别较多，横向排布更易读
- 关注每个类别上两组数值的相对大小，而不是总量

## 何时不用

- 只需要单向数值对比 → 用 bar 条形图
- 时间趋势 → 用 line 折线图
- 占比/构成 → 用 pie 饼图
- 两个量级或单位不同的指标（左右各一根独立轴）→ 用 dual-axes 双轴图
- 两组数据没有相反语义（都是正向）→ 用分组条形图（bar + `dodgeX`），强行镜像会误导读者

## 数据要求

- 长表数据，每行一个「类别 × 方向」组合，见 [数据模式](../references/data-patterns.md)
- `x` 字段：类别字符串（转置后显示在纵轴）
- `y` 字段：数值（number）；镜像效果通过「一侧取负值」实现
- `color` 字段（双向分组时）：方向字符串，如 `'男性'` / `'女性'`
- 原始数值保持正数，仅在 `encode.y` 中取负；若指标天然带正负（利润、盈亏），直接映射带符号字段

## 基础实现（G2 v5）

对称条形图 = `type: 'interval'` + `coordinate: { transform: [{ type: 'transpose' }] }` + 一侧 y 取负值。

```ts
import { Chart } from '@antv/g2';

const data = [
  { ageGroup: '0-14 岁', sex: '男性', population: 12.5 },
  { ageGroup: '15-29 岁', sex: '男性', population: 15.2 },
  { ageGroup: '30-44 岁', sex: '男性', population: 18.6 },
  { ageGroup: '45-59 岁', sex: '男性', population: 14.8 },
  { ageGroup: '60 岁以上', sex: '男性', population: 9.3 },
  { ageGroup: '0-14 岁', sex: '女性', population: 11.8 },
  { ageGroup: '15-29 岁', sex: '女性', population: 14.7 },
  { ageGroup: '30-44 岁', sex: '女性', population: 18.1 },
  { ageGroup: '45-59 岁', sex: '女性', population: 15.4 },
  { ageGroup: '60 岁以上', sex: '女性', population: 10.6 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'ageGroup',
    // 关键：男性取负值，形成左侧镜像；女性保持正值在右侧
    y: (d: { sex: string; population: number }) =>
      d.sex === '男性' ? -d.population : d.population,
    color: 'sex',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { color: { range: ['#5B8FF9', '#F6BD16'] } },
  axis: {
    x: { title: '年龄段' },
    // 镜像后 y 轴会出现负刻度，展示时取绝对值
    y: {
      title: '人口（百万人）',
      labelFormatter: (d: number) => String(Math.abs(d)),
    },
  },
  legend: { color: { position: 'top' } },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 单系列正负值 | 数据直接带符号，`encode.y: 'profit'` + 按符号着色 | [diverging.ts](../examples/mirror-bar/diverging.ts) |
| 带数值标签 | `labels` + `Math.abs` 在条形末端显示绝对值 | [with-label.ts](../examples/mirror-bar/with-label.ts) |
| 品牌样式定制 | `scale.color.range` + `style.radius` + `legend.position` | [custom-style.ts](../examples/mirror-bar/custom-style.ts) |

单系列正负值核心差异（数据本身有正负，无需再取负）：

```ts-snippet
chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'product',
    y: 'profit',
    color: (d) => (d.profit >= 0 ? '盈利' : '亏损'),
  },
  coordinate: { transform: [{ type: 'transpose' }] },
});
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 两侧配色 | `scale: { color: { range: ['#5B8FF9', '#F6BD16'] } }` | 按 color 域值顺序着色 |
| 固定域顺序 | `scale: { color: { domain: ['收入', '支出'], range: ['#5B8FF9', '#FF7875'] } }` | 避免图例顺序随数据变化 |
| 条体圆角 | `style: { radius: 4 }` | 转置后作用于条形末端 |
| 条体透明度 | `style: { fillOpacity: 0.9 }` | |
| 绝对值刻度 | `axis: { y: { labelFormatter: (d: number) => String(Math.abs(d)) } }` | 隐藏镜像产生的负号 |
| 百分比刻度 | `axis: { y: { labelFormatter: (d: number) => Math.abs(d) + '%' } }` | 占比场景 |
| 轴标题 | `axis: { x: { title: '年龄段' }, y: { title: '人口（百万人）' } }` | 转置后轴配置仍跟随字段通道 |
| 图例位置 | `legend: { color: { position: 'top' } }` | `'top'` / `'bottom'` / `'left'` / `'right'` |
| 关闭图例 | `legend: false` | 单系列自带正负含义时可用 |

数据标签写法：

```ts-snippet
labels: [
  {
    text: (d) => String(Math.abs(d.amount)),
    position: 'outside',
    style: { fontSize: 10, fill: '#595959' },
  },
],
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'bar'` 或 `type: 'mirrorBar'` | `type: 'interval'` + `coordinate: { transform: [{ type: 'transpose' }] }` |
| 两侧数据都传正数 | 一侧在 `encode.y` 中取负值，才能形成左右镜像 |
| 忘记 `transpose` | 不加转置会得到上下对称的柱状图，不是左右镜像条形图 |
| 为了镜像把原始数据改成负数 | 保留原始业务数据，在 `encode.y` 中取负 |
| y 轴直接显示负号 | `axis.y.labelFormatter` 用 `Math.abs` 转绝对值 |
| 两组数据没有相反语义也做镜像 | 用分组条形图（bar + `dodgeX`） |
| `new Bar('container', { xField, yField })`（G2Plot v2） | `new Chart({ container })` + `type: 'interval'` |
| `seriesField: 'type'`（v2 配置） | `encode: { color: 'type' }` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/mirror-bar/basic.ts) | 年龄段男女人口金字塔 | `transpose` + 男性取负值 + `labelFormatter` 取绝对值 |
| [diverging.ts](../examples/mirror-bar/diverging.ts) | 产品利润正负值发散对比 | `encode.y: 'profit'` + `color` 按符号分组 |
| [with-label.ts](../examples/mirror-bar/with-label.ts) | 每月收入/支出双向对比 + 数值标签 | `labels.text` 取绝对值 + `position: 'outside'` |
| [custom-style.ts](../examples/mirror-bar/custom-style.ts) | 渠道流入/流出品牌视觉定制 | `scale.color.domain/range` + `style.radius` + `legend.position` |
