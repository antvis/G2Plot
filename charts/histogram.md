# Histogram 直方图

> 组件用途：把单个连续数值字段划分成若干区间（bin），用柱形高度展示每个区间的数据频次，刻画数据的分布形态。

## 何时使用

- 单变量分布：订单金额、用户年龄、接口响应耗时、房价的频次分布
- 关注数据集中趋势、偏态、长尾或异常区间，而不是某个具体类别的排名
- 数据是原始明细（每行一个样本），希望自动分箱统计，避免在业务代码里预先聚合
- 需要对比多个群体的分布（如线上/线下渠道的订单金额分布）

## 何时不用

- 类别之间的数值大小对比（类别已聚合）→ 用 column 柱状图
- 时间趋势、走势 → 用 line 折线图
- 两个数值变量的相关性 → 用 scatter 散点图
- 两个类别维度交叉的密度 → 用 heatmap 热力图
- 占比/构成（各部分之和为整体）→ 用 pie 饼图

**直方图 vs 柱状图**：直方图的 x 轴是连续数值区间，柱形之间通常无间隔；柱状图的 x 轴是离散类别，柱形之间有间隔。数据是「每行一个样本的连续数值」时选直方图，数据是「每个类别一个聚合值」时选柱状图。

## 数据要求

- 长表数据，每行一个样本，见 [数据模式](../references/data-patterns.md)
- `x` 字段：连续数值（number），如 `amount`、`age`、`latency`；分箱由 `binX` 自动完成
- `y` 字段：分箱后的统计值，通常写 `'count'`，由 `binX` transform 生成，原始数据中不需要该字段
- 分组字段（可选）：类别字符串（如 `channel`），用于 `encode.color` 分组对比
- 不要预先按区间聚合数据；直接把原始明细交给 `binX`，否则会丢失分箱控制能力

## 基础实现（G2 v5）

直方图 = `type: 'rect'` + `binX` transform（自动分箱并生成 `x1` 区间右边界）+ `encode.y` 统计频次。

```ts
import { Chart } from '@antv/g2';

/**
 * 基础直方图
 * 场景：单个连续数值字段的频次分布（如近 90 天订单金额分布）
 * 要点：rect mark + binX transform 自动分箱并统计频次，无需预先聚合
 */
const orderAmounts = [
  68, 72, 78, 82, 85, 88, 92, 95, 98, 102,
  105, 108, 112, 115, 118, 122, 125, 128, 132, 135,
  138, 142, 145, 148, 152, 155, 158, 162, 168, 175,
  182, 190, 198, 208, 220, 235, 252, 275, 305, 350,
];

const data = orderAmounts.map((amount, index) => ({
  orderNo: `SO-${String(index + 1).padStart(4, '0')}`,
  amount,
}));

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'rect',
  data,
  encode: { x: 'amount', y: 'count' },
  transform: [{ type: 'binX', y: 'count', thresholds: 8 }],
  style: { fill: '#5B8FF9', fillOpacity: 0.9, inset: 0.5 },
  axis: {
    x: { title: '订单金额（元）' },
    y: { title: '订单笔数' },
  },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 分组堆叠分布 | `encode` 增加 `color: 'channel'`，transform 追加 `{ type: 'stackY' }` | [grouped.ts](../examples/histogram/grouped.ts) |
| 精细分箱 + 品牌样式 | 调大 `thresholds`，配合 `style`、`title`、`tooltip` | [custom-style.ts](../examples/histogram/custom-style.ts) |
| 调整分箱粒度 | `thresholds` 改大（更细）或改小（更粗），常用 8 ~ 30 | 见下方片段 |
| 无缝柱形 | `style: { inset: 0 }` | 见下方片段 |

分箱粒度与柱形间距：

```ts-snippet
// 更细的分箱：区间更多、每根柱更窄
transform: [{ type: 'binX', y: 'count', thresholds: 20 }],

// 无缝柱形：去掉柱形之间的间隙，更接近连续密度曲线
style: { inset: 0 },
```

## 样式自定义

常用视觉定制项（以下写法均经 `@antv/g2` ^5 类型校验），完整示例见 [custom-style.ts](../examples/histogram/custom-style.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 柱形填充色 | `style: { fill: '#FF6B35' }` | 固定品牌色 |
| 填充透明度 | `style: { fillOpacity: 0.85 }` | 多系列重叠时建议调低 |
| 柱形间距 | `style: { inset: 1 }` | px，`0` 为无缝；也可用 `insetLeft/Right/Top/Bottom` 分别控制 |
| 分组调色板 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 分组直方图按类别着色 |
| 坐标轴标题 | `axis: { x: { title: '订单金额（元）' } }` | y 轴同理 |
| 图例位置 | `legend: { color: { position: 'top' } }` | `'top'` / `'bottom'` / `'left'` / `'right'` |
| 关闭图例 | `legend: false` | 单系列直方图可关闭 |
| 图表标题 | `title: { title: '订单金额分布', subtitle: '样本：近 90 天 40 笔订单', align: 'left' }` | `title` 必须是对象，不能直接写字符串 |
| 数值单位格式化 | `tooltip: { items: [{ channel: 'y', name: '订单数', valueFormatter: (v) => v + ' 笔' }] }` | 提示框中的频次带单位 |
| 内置主题 | `theme: 'classicDark'` | 暗色场景自动适配坐标轴、图例文字颜色 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| 直方图用 `type: 'interval'` | 连续数值分箱用 `type: 'rect'`；`binX` 会生成 `x1` 区间右边界，rect 才能画出区间宽度 |
| 只写 `encode: { x: 'amount', y: 'count' }`，不加 transform | 必须加 `transform: [{ type: 'binX', y: 'count' }]`，否则不会分箱统计 |
| `transform: [{ type: 'binX' }]` 缺少 `y` | 明确写 `{ type: 'binX', y: 'count', thresholds: 10 }`，告诉 binX 统计什么 |
| 对类别字段使用 `binX` | `binX` 只能处理数值字段；类别聚合用 `groupX`，类别对比用 column 柱状图 |
| 先按区间聚合数据再画图 | 直接把原始明细交给 `binX`，用 `thresholds` 控制分箱粒度 |
| `thresholds: 500` 追求「越细越好」 | 分箱过细会让每根柱只有 1~2 条数据，失去分布形态；常用 8 ~ 30 |
| `binWidth` / `binNumber`（G2Plot v2 Histogram 配置） | G2 v5 用 `transform: [{ type: 'binX', thresholds }]` |
| `new Histogram('container', { xField, yField })` | `new Chart({ container })` + `chart.options({ type: 'rect', ... })` |
| `chart.source(data)`（v4） | `chart.options({ data, ... })` |
| 直方图与柱状图混用：类别数据也套 `binX` | 类别数据用 column + `encode.x` 类别字段，不加 `binX` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/histogram/basic.ts) | 订单金额频次分布，最简起步 | `type: 'rect'` + `binX: { y: 'count', thresholds: 8 }` |
| [grouped.ts](../examples/histogram/grouped.ts) | 线上/线下渠道订单金额分布对比 | `encode.color: 'channel'` + `binX` + `stackY` |
| [custom-style.ts](../examples/histogram/custom-style.ts) | 品牌看板中的精细分箱与语义补充 | `thresholds: 12`、`style.fill`、`title`、`tooltip.items` |