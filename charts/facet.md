# Facet 分面图

> 组件用途：按一个或两个分类字段拆分数据，为每个子集复用同一种图形和编码，便于在小多图中比较

## 何时使用

- 同一指标要跨地区、渠道、设备或批次对照，但重叠到一幅图会遮挡或造成图例过多
- 希望保持相同的时间顺序、单位与刻度，比较各组水平或走势
- 有两个分类字段，想同时比较列与行的组合，例如渠道 × 设备

## 何时不用

- 数据只有一个组，或两三个序列在同一坐标系已经清晰，优先单图或多系列图
- 目标是比较同一类别下的精确组间差值，可以改用分组条形图或同轴散点
- 多个指标单位不同、图形规则也不同，不能假定它们可共用轴；优先明确标注的独立视图
- 类别过多导致每个面板不可读，先筛选、聚合或分批展示，而不是把全部类别塞进同一网格

## 数据要求

- 长表每行是一条观测，保留分面字段、子图使用的类别或时间字段、可比较的有限数值，见 [数据模式](../references/data-patterns.md)
- 分面字段负责分区，子图字段负责单个面板内的图形位置；明确两层字段和域
- 同一指标在各面板的单位、时间窗和统计口径一致；对照绝对量时给子图明确一致的线性域和类别顺序
- 若子图是条形图，公共量轴从零开始；如使用折线并选择非零起点，必须在所有可比面板上明确且一致
- 缺失值不等于零；无观测组合可留空并标注，不能合成零来填满网格

## 基础实现（G2 v5）

顶层使用 `facetRect`，以 `encode.x` 指定面板列，子图 `children` 中的 `encode` 和 `scale` 独立描述每个区域内的周次和数量；为每个面板应用同一个 `[0, 50]` 数值域，确保 24 单在所有面板上等高

```ts
/**
 * 按三个区域分面比较每周工单数量
 * 每个面板只显示本区域，子图共用周序和零起点数量轴
 * 合成数据：各区域 W2 都是 24 单，正确同步的面板中等量柱应等高
 */
import { Chart } from '@antv/g2';

const weeks = ['W1', 'W2', 'W3', 'W4'];
const regions = [
  { region: 'North', totals: [18, 24, 33, 42] },
  { region: 'Central', totals: [22, 24, 20, 30] },
  { region: 'South', totals: [9, 24, 29, 36] },
];
const data = regions.flatMap(({ region, totals }) =>
  totals.map((tickets, i) => ({ region, week: weeks[i], tickets })),
);

// Leave room for labels of the nested panel axes.
const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 56,
  paddingBottom: 36,
});

chart.options({
  type: 'facetRect',
  title: 'Weekly tickets (count)',
  data,
  encode: { x: 'region' },
  scale: {
    x: { domain: regions.map(({ region }) => region) },
  },
  axis: { x: { title: false } },
  legend: false,
  children: [
    {
      type: 'interval',
      encode: { x: 'week', y: 'tickets', color: 'region' },
      scale: {
        x: { type: 'band', domain: weeks, padding: 0.25 },
        color: { domain: ['North', 'Central', 'South'], range: ['#2563EB', '#0F766E', '#B45309'] },
        y: { type: 'linear', domain: [0, 50], nice: false, tickCount: 6 },
      },
      axis: { x: { title: false }, y: { title: false } },
      tooltip: { title: 'week', items: ['region', 'tickets'] },
    },
  ],
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 单字段列分面 | 顶层 `encode.x` 分区，子层画同样的区间标记 | [basic.ts](../examples/facet/basic.ts) |
| 双字段行列网格 | 顶层 `encode.x` 和 `encode.y` 分区，每格复用同一折线 | [grid.ts](../examples/facet/grid.ts) |

```ts
/**
 * 用渠道与设备组成 2 × 2 分面，比较每周会话走势
 * 两个字段只负责面板分区；每个面板用同一种折线图
 * 子图共享周序与 0 至 60 的数量轴，便于对照峰值和走势
 */
import { Chart } from '@antv/g2';

const weeks = ['W1', 'W2', 'W3', 'W4', 'W5'];
const groups = [
  { channel: 'Direct', device: 'Desktop', counts: [12, 18, 26, 24, 39] },
  { channel: 'Direct', device: 'Mobile', counts: [19, 26, 22, 41, 52] },
  { channel: 'Referral', device: 'Desktop', counts: [8, 12, 10, 18, 23] },
  { channel: 'Referral', device: 'Mobile', counts: [10, 15, 14, 20, 17] },
];
const data = groups.flatMap(({ channel, device, counts }) =>
  counts.map((sessions, i) => ({ channel, device, week: weeks[i], sessions })),
);

// Leave room for labels of the nested panel axes.
const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 56,
  paddingBottom: 36,
});

chart.options({
  type: 'facetRect',
  title: 'Weekly sessions (count)',
  data,
  encode: { x: 'channel', y: 'device' },
  scale: {
    x: { domain: ['Direct', 'Referral'] },
    y: { domain: ['Desktop', 'Mobile'] },
  },
  axis: { x: { title: false }, y: { title: false } },
  children: [
    {
      type: 'line',
      encode: { x: 'week', y: 'sessions' },
      scale: {
        x: { type: 'point', domain: weeks },
        y: { type: 'linear', domain: [0, 60], nice: false, tickCount: 4 },
      },
      axis: { x: { title: false }, y: { title: false } },
      style: { stroke: '#2563EB', lineWidth: 2.5 },
      tooltip: { title: 'week', items: ['channel', 'device', 'sessions'] },
    },
  ],
});

chart.render();
```

## 样式自定义

| 定制项 | 对应配置 | 注意 |
|---|---|---|
| 面板排序 | 顶层 `scale.x.domain` 和 `scale.y.domain` | 只控制分面列和行，不是子图的周序或数值域 |
| 时间与数量轴 | 子层 `scale.x.domain` 和 `scale.y.domain` | 共用类别顺序和数值域；有业务上相同的值，应该对应相同长度或高度 |
| 面板间距 | 顶层分类轴的 `paddingInner` | 改变面板间距，不会同步子图尺度 |
| 固定组别颜色 | 子图明确 `scale.color.domain` / `range` | 配色不能替代面板标题、单位或图例 |
| 轴标签留白 | 图表构造配置的 `paddingLeft` 和 `paddingBottom` | 实例为内层坐标轴专门留空间，容器宽高仍由 `autoFit` 根据容器决定 |
| 单一折线样式 | 子图 `style.stroke` 与 `style.lineWidth` | 统一笔画便于比较，避免让不同线宽暗示权重 |

## 易错点

1. 顶层 `encode.x/y` 控制分区，子层 `encode.x/y` 控制位置；不要把区域名当作两层的同一个字段
2. 绝对量对照时在子图明确固定全局域，不让每个面板按自身极值独立放大；固定域应覆盖全量有效数据
3. `shareSize` 影响面板尺寸分配，不等于同步子图的数值轴；固定大小与固定域是不同约束
4. 保留 G2 按边缘位置减少内侧轴标签的默认设计；少标签并不表示尺度可以不同
5. 两个分面字段会生成网格，空组合不是零；保留空白或标明无观测
6. 用 G2 v5 的 `facetRect` + `children`，不使用 G2 v4 的 `chart.facet(..., { eachView })` 或 G2Plot v2 API

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/facet/basic.ts) | 三个区域的每周工单 | 列分面 + 每格条形图 + 公共周序和零基数值轴 |
| [grid.ts](../examples/facet/grid.ts) | 两渠道 × 两设备的周会话走势 | 行列分面 + 每格折线 + 公共周序和数值域 |

参考：[G2 官方 Chart API](https://g2.antv.antgroup.com/en/manual/api) · [G2 v4 到 v5 迁移](https://g2.antv.antgroup.com/en/manual/whats-new/migration-from-g2v4/)
