# Bar 条形图

> 组件用途：横向条体对比各类别数值，适合类别名长或类别多的场景。

## 何时使用

- 类别名较长（部门名、商品名、长文案标签），纵向柱状图放不下
- 类别数量较多（> 8 个），横向滚动阅读更自然
- 排行榜：Top N 城市/商品/门店，强调名次

## 何时不用

- 类别少且名称短 → 用 column 柱状图（更符合常规阅读习惯）
- 时间趋势 → 用 line 折线图
- 占比构成 → 用 pie 饼图

## 数据要求

- 长表数据，每行一个数据点，见 [数据模式](../references/data-patterns.md)
- `x` 字段：类别字符串（转置后显示在纵轴）
- `y` 字段：数值（number，转置后显示在横轴）

## 基础实现（G2 v5）

条形图 = `type: 'interval'` + `coordinate: { transform: [{ type: 'transpose' }] }`。encode 仍按「x=类别、y=数值」书写，转置由坐标系完成。

```ts
import { Chart } from '@antv/g2';

const data = [
  { dept: '产品研发部', headcount: 120 },
  { dept: '市场营销部', headcount: 80 },
  { dept: '客户服务部', headcount: 95 },
  { dept: '人力资源部', headcount: 30 },
  { dept: '财务管理部', headcount: 25 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'dept', y: 'headcount' },
  coordinate: { transform: [{ type: 'transpose' }] },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 排名条形图 | `transform` 加 `sortX` 按 y 降序 + inside 自定义标签 | [ranking.ts](../examples/bar/ranking.ts) |
| 分组条形图 | `encode` 加 `color` + `transform` 加 `dodgeX` | [grouped.ts](../examples/bar/grouped.ts) |
| 堆叠条形图 | `encode` 加 `color` + `transform` 加 `stackY` | 同 column 堆叠写法 + transpose |

排名核心差异（先排序再转置）：

```ts-snippet
chart.options({
  type: 'interval',
  data,
  encode: { x: 'city', y: 'gdp' },
  transform: [{ type: 'sortX', by: 'y', reverse: true }],
  coordinate: { transform: [{ type: 'transpose' }] },
});
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 条体颜色 | `style: { fill: '#5B8FF9' }` | 单系列固定色 |
| 数据标签 | `labels: [{ text, position: 'inside' }]` | 放条体中间用 `'inside'`；text 回调自定义内容，`style.dx` 微调水平偏移 |
| 数值轴标题 | `axis: { x: { title: 'GDP（万亿）' } }` | 转置后数值轴仍是配置中的 `x` |

注意：转置后轴配置不互换 —— `axis.x` 仍对应数值字段（显示在横向），`axis.y` 仍对应类别字段（显示在纵向）。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'bar'` | `type: 'interval'` + `coordinate: { transform: [{ type: 'transpose' }] }` |
| 转置后把 encode 的 x/y 对调 | encode 保持 x=类别、y=数值，转置由 coordinate 完成 |
| 转置后把 axis 的 x/y 配置对调 | 轴配置跟随字段通道，不随视觉方向互换 |
| `new Bar('container', {...})`（G2Plot v2） | `new Chart({ container })` + `type: 'interval'` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/bar/basic.ts) | 长类别名横向对比，最简起步 | `coordinate: { transform: [{ type: 'transpose' }] }` |
| [ranking.ts](../examples/bar/ranking.ts) | Top N 排行榜 | `sortX` 降序 + `labels` inside 自定义名次文案 |
| [grouped.ts](../examples/bar/grouped.ts) | 长类别名多系列对比 | `dodgeX` + `transpose` |
