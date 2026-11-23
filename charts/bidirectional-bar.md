# Bidirectional Bar 对称条形图

> 组件用途：以同一条零线为中心，按相同类别镜像比较两个组的同口径数量，或展示问卷中相反方向的分项

## 何时使用

- 左右组需要直接对照，且每个类别的两个指标含义、单位和口径一致，例如白班与晚班各类工单量
- 类别有共享的自然顺序，例如两地的年龄分段或两队的项目分组
- 问卷回答按态度方向分布，且需要分别看正向、负向与各档构成

## 何时不用

- 三个及以上并列组：优先考虑分组条形图，避免为匹配两侧而隐藏其他组
- 指标单位、分母或数量级不可比：用并列小图明确尺度，不能用同一零线比较原值长度
- 原始数值有真实正负且每类只有一个值，例如净增减：用发散条形图并保留负号，不伪装成两个组
- 重点是时间连续变化或总体构成，而非镜像配对：分别考虑折线图或占比图

## 数据要求

- 优先使用长表，每行为一个类别的一侧观测，字段有类别、组别、原始非负数值；宽表以 `flatMap` 展开，见 [数据模式](../references/data-patterns.md)
- 单一组别在同一类别只能有一条基准记录；有重复则先按业务口径聚合，或明确使用按子类堆叠的变体
- 保留原始字段作为提示值，另外派生左负右正的渲染值；缺测不等于零，只有原始记录确认为零时才写零
- 明确类别顺序与两侧组别，数值必须是有限的 `number`，并使用一个包含零的对称线性域
- 百分比必须说明分母，不能为了让左右看起来对称而任意对每侧再标准化

## 基础实现（G2 v5）

把类别映射到 `x`，把有符号布局值映射到 `y`，通过 `transpose` 让数值沿水平方向延伸，复用一条数轴，不需要两套视图或两个独立尺度


```ts
/**
 * 工单白班与晚班对比：两组按相同工单类别对齐
 * 负号只用于将白班绘制到左侧；刻度与提示显示原始非负工单数
 * 共用以零为中心的对称数轴，避免相同数量被画成不同长度
 */
import { Chart } from '@antv/g2';

const tickets = [
  { category: 'Account', day: 42, evening: 31 },
  { category: 'Billing', day: 28, evening: 37 },
  { category: 'Setup', day: 36, evening: 36 },
  { category: 'Delivery', day: 19, evening: 46 },
  { category: 'Other', day: 13, evening: 9 },
];

const data = tickets.flatMap(({ category, day, evening }) => [
  { category, shift: 'Day shift', count: day, signedCount: -day },
  { category, shift: 'Evening shift', count: evening, signedCount: evening },
]);
const limit = Math.max(10, Math.ceil(Math.max(...data.map((d) => d.count)) / 10) * 10);

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data,
  encode: { x: 'category', y: 'signedCount', color: 'shift' },
  scale: {
    x: { domain: tickets.map((d) => d.category), padding: 0.3 },
    y: { type: 'linear', domain: [-limit, limit], nice: false, tickCount: 5 },
    color: { domain: ['Day shift', 'Evening shift'], range: ['#2563EB', '#B45309'] },
  },
  axis: {
    x: { title: false },
    y: { title: 'Tickets (count)', labelFormatter: (value: number | string) => String(Math.abs(Number(value))) },
  },
  tooltip: { title: 'category', items: [{ field: 'count', name: 'Tickets' }, { field: 'shift', name: 'Shift' }] },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 双组镜像 | 每类两条数据，左侧布局值取负，右侧取正 | [basic.ts](../examples/bidirectional-bar/basic.ts) |
| 分层镜像堆叠 | 用 `stackY` 将正负方向分别堆叠，域按各侧堆叠合计计算 | [stacked.ts](../examples/bidirectional-bar/stacked.ts) |

问卷示例不绘制中立项，仍保留「全量答卷」作为分母，因此可见堆叠的两侧合计可能不到 100%，没有对显示项二次归一化

```ts
/**
 * 课程问卷对比：将不赞同分层堆叠在左，将赞同分层堆叠在右
 * 百分比以该题全部答卷为分母；中立项不画，也不重新归一化
 * 使用正负分离的 stackY，对称域按两侧堆叠合计而不是单个分段计算
 */
import { Chart } from '@antv/g2';

const surveys = [
  { topic: 'Pacing', stronglyDisagree: 6, disagree: 19, neutral: 23, agree: 37, stronglyAgree: 15 },
  { topic: 'Materials', stronglyDisagree: 3, disagree: 12, neutral: 20, agree: 39, stronglyAgree: 26 },
  { topic: 'Exercises', stronglyDisagree: 11, disagree: 24, neutral: 18, agree: 31, stronglyAgree: 16 },
];

const levels = ['Strongly disagree', 'Disagree', 'Agree', 'Strongly agree'];
const data = surveys.flatMap(({ topic, stronglyDisagree, disagree, agree, stronglyAgree }) =>
  [stronglyDisagree, disagree, agree, stronglyAgree].map((percent, i) => ({
    topic,
    opinion: levels[i],
    percent,
    signedPercent: i < 2 ? -percent : percent,
  })),
);
const maxTotal = Math.max(
  ...surveys.flatMap((d) => [d.stronglyDisagree + d.disagree, d.agree + d.stronglyAgree]),
);
const limit = Math.max(10, Math.ceil(maxTotal / 10) * 10);

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data,
  transform: [{ type: 'stackY' }],
  encode: { x: 'topic', y: 'signedPercent', color: 'opinion' },
  scale: {
    x: { domain: surveys.map((d) => d.topic), padding: 0.35 },
    y: { type: 'linear', domain: [-limit, limit], nice: false, tickCount: 5 },
    color: { domain: levels, range: ['#9A3412', '#F59E0B', '#60A5FA', '#1D4ED8'] },
  },
  axis: {
    x: { title: false },
    y: {
      title: 'Share of all responses (neutral not shown)',
      labelFormatter: (value: number | string) => `${Math.abs(Number(value))}%`,
    },
  },
  tooltip: { title: 'topic', items: [{ field: 'opinion', name: 'Response' }, { field: 'percent', name: 'Share (%)' }] },
});

chart.render();
```

## 样式自定义

| 定制项 | 对应配置 | 注意 |
|---|---|---|
| 固定左右颜色 | `scale.color.domain` 与 `scale.color.range` | 固定组别顺序，避免数据输入顺序改变颜色 |
| 数轴显示原始数量 | `axis.y.labelFormatter` | 仅布局符号用绝对值，真实负数仍显示负号 |
| 稳定类别顺序 | `scale.x.domain` | 两侧共用，单侧缺测时仍保留类别位置 |
| 刻度与单位 | `scale.y.tickCount` 与 `axis.y.title` | 采用对称线性域并在轴标题写清单位 |
| 提示内容 | `tooltip.title` 与 `tooltip.items` | 提示绑定原始数值和组名，不用有符号布局字段 |

## 易错点

1. 转置不等于交换编码字段，还是类别走 `x`、连续有符号布局值走 `y`
2. 不用左右独立自动缩放，等量条必须等长；两侧全零时用一个非零对称范围，零值条仍为零
3. 叠加变体用每个类别的左侧、右侧总量确定最大幅度，不按最大单一分段计算
4. 同时保留原始数字和布局数字；提示不能将左侧的负号误读成业务上的负值
5. 缺测的一侧不画，并在数据说明或表格里标注；不要把未知补成零
6. 不使用 G2Plot v2 的 `BidirectionalBar` 构造器、`xField` 或 `yField`

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/bidirectional-bar/basic.ts) | 五类工单的白班、晚班对照 | `interval` + `transpose` + 共同对称域 + 原始值提示 |
| [stacked.ts](../examples/bidirectional-bar/stacked.ts) | 三题课程问卷的赞同、不赞同方向对照 | `stackY` + 按侧合计定域 + 全部答卷分母 |

参考：[G2 官方 Bi-directional Bar](https://g2.antv.antgroup.com/en/charts/bi-directional-bar/)
