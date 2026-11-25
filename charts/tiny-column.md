# Tiny Column 迷你柱形图

> 组件用途：在紧凑空间里展示一小段有序数据的数值高低，例如指标卡中的每日调用量。

## 何时使用

- 指标卡、表格行或列表项旁空间有限，需要快速扫一眼一周内各天的调用量。
- 每次观测对应独立的柱子，需要辨认峰值或相邻记录的大小关系。
- 相同单位和统计口径的多个指标卡需要直接比较柱高，可以共用量程与绘图区高度。

## 何时不用

- 需要阅读轴刻度、长类别名称或详细比较多个系列时，使用 [column 柱状图](column.md)。
- 主要关注连续趋势而非单个观测的大小时，使用 [line 折线图](line.md)。
- 需要展示构成比例、分布频率或多层关系时，选择与数据语义对应的图表。

## 数据要求

- 使用长表，每条记录包含一个有序类别和一个非负有限数值。示例用 `day` 和 `requestCount`。同一天有多条记录时，按业务口径聚合后再绘制。
- 日期使用可排序的 ISO 格式，绘图前按日期升序排列。用 `scale.x.domain` 固定显示顺序。
- 将缺测日期写入 x 轴值域并留空。真实的零值应保留在数据中，柱长为零。缺测表示未知，不能据此推断零次调用。
- y 轴由零起步。跨卡片比较时，给同单位的图设置相同的显式上限和绘图区高度。示例共用 `[0, 30]`。实际数据超出上限时，先统一调整量程。

## 基础实现（G2 v5）

将容器的高度设为适合卡片的值，例如 84 px。图表使用 `autoFit: true` 随容器尺寸调整。用纵向 `interval` 映射日期和次数，隐藏坐标轴和图例，通过悬停查看准确值。

```ts
/**
 * 基础迷你柱形图
 * 场景：在指标卡中查看最近 7 天的 Agent 调用量。
 * 要点：日期从左到右，隐藏坐标轴与图例，悬停查看日期和次数。
 */
import { Chart } from '@antv/g2';

const data = [
  { day: '2026-11-19', requestCount: 12 },
  { day: '2026-11-20', requestCount: 18 },
  { day: '2026-11-21', requestCount: 15 },
  { day: '2026-11-22', requestCount: 26 },
  { day: '2026-11-23', requestCount: 20 },
  { day: '2026-11-24', requestCount: 17 },
  { day: '2026-11-25', requestCount: 22 },
];

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'interval',
  data,
  encode: { x: 'day', y: 'requestCount' },
  scale: {
    x: { domain: data.map(({ day }) => day) },
    y: { domain: [0, 30], nice: false },
  },
  axis: false,
  legend: false,
  style: { fill: '#4F6EB8' },
  tooltip: {
    title: 'day',
    items: [{ channel: 'y', name: '调用量', valueFormatter: (value) => `${value} 次` }],
  },
});

chart.render();
```

## 常见变体

| 变体 | 关键做法 | 完整案例 |
|---|---|---|
| 峰值高亮 | 从可用数据计算最大值，按是否达到正峰值映射颜色。并列峰值使用相同强调色，全零时全部使用普通色。 | [highlight-peak.ts](../examples/tiny-column/highlight-peak.ts) |

```ts
/**
 * 峰值高亮的迷你柱形图
 * 场景：在最近 7 天的 Agent 调用量中快速定位峰值。
 * 要点：从数据计算最大值，并列峰值共享强调色，全零时使用普通颜色。
 */
import { Chart } from '@antv/g2';

const dailyRequests = [
  { day: '2026-11-19', requestCount: 12 },
  { day: '2026-11-20', requestCount: 18 },
  { day: '2026-11-21', requestCount: 15 },
  { day: '2026-11-22', requestCount: 26 },
  { day: '2026-11-23', requestCount: 20 },
  { day: '2026-11-24', requestCount: 17 },
  { day: '2026-11-25', requestCount: 22 },
];
const peak = dailyRequests.reduce((max, { requestCount }) => Math.max(max, requestCount), 0);
const data = dailyRequests.map((item) => ({
  ...item,
  highlight: peak > 0 && item.requestCount === peak ? 'peak' : 'normal',
}));

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'interval',
  data,
  encode: { x: 'day', y: 'requestCount', color: 'highlight' },
  scale: {
    x: { domain: data.map(({ day }) => day) },
    y: { domain: [0, 30], nice: false },
    color: { domain: ['normal', 'peak'], range: ['#8498BF', '#254FC4'] },
  },
  axis: false,
  legend: false,
  tooltip: {
    title: 'day',
    items: [{ channel: 'y', name: '调用量', valueFormatter: (value) => `${value} 次` }],
  },
});

chart.render();
```

## 样式自定义

| 定制项 | 配置 | 作用 |
|---|---|---|
| 单系列柱色 | `style: { fill: '#4F6EB8' }` | 为所有柱子设置同一颜色 |
| 峰值与普通柱 | `encode.color` 配合显式 `scale.color.domain` 和 `range` | 让颜色含义不随数据顺序变化 |
| 紧凑布局 | `axis: false`、`legend: false` | 在容器有限时给柱形留出空间 |
| 悬停提示 | `tooltip.title` 使用日期，`tooltip.items` 指定 y 通道和值的单位 | 在隐藏轴刻度后保留精确读数 |

## 易错点

| 易错写法 | 建议 |
|---|---|
| 为了放大差异，将 y 轴下限设为样本最小值 | 从零绘制柱形，高度才能保留真实比例 |
| 分别使用各卡片当期最大值缩放 | 用同一量程与绘图区高度比较同单位的数据 |
| 只按现有记录生成全部日期，或把缺测填成零 | 用完整日期域留出缺测位置，真实零值保留在记录里 |
| 按数组索引或固定的数值染色 | 根据数据计算正的最大值，并高亮所有并列峰值 |
| 使用 G2Plot v2 的 `TinyColumn` 或 `xField` | 导入 `@antv/g2` 的 `Chart`，在 Spec 中配置 `interval` 与 `encode` |

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/tiny-column/basic.ts) | 查看最近 7 天的 Agent 调用量 | 日期域保持时间顺序，y 域为 0–30，隐藏轴和图例，悬停查看日期和次数 |
| [highlight-peak.ts](../examples/tiny-column/highlight-peak.ts) | 定位最近 7 天内的调用峰值 | 动态计算峰值，显式映射普通色与强调色，覆盖并列峰值和全零规则 |
