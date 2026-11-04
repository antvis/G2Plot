# Mix 混合图

> 组件用途：在同一个坐标系里叠加两种及以上图形标记（柱 + 线、面积 + 线 + 点等），用不同视觉编码同时表达多个指标或同一指标的多层信息。

## 何时使用

- 柱线组合：柱表达绝对量，线表达目标、比率或趋势（实际营收 vs 目标营收）
- 面积 + 折线 + 散点：面积给量级氛围、折线强调走势、散点标出采样点
- 堆叠柱 + 总量折线：既看构成，又看总量趋势
- 主图上叠加参考线/阈值线（目标线、均值线、警戒线）

## 何时不用

- 只有一种 mark → 直接用对应图表（line / column / area），不要为组合而组合
- 两个指标量级或单位差异大、需要各自刻度 → 用 [dual-axes 双轴图](./dual-axes.md)
- 需要多个独立坐标系并排或分面 → 用 G2 的 `spaceFlex` / 分面组合，而不是单 view 叠加
- 占比构成 → 用 [pie 饼图](./pie.md)；相关性 → 用 [scatter 散点图](./scatter.md)

## 数据要求

- 长表数据，每行一个 x 观测点，见 [数据模式](../references/data-patterns.md)
- `x` 字段：时间字符串或有序类别，各层共用
- 共享数据时：多个数值字段并列（如 `actual` / `target`），每个子 mark 各取一个 `y`
- 子 mark 独立数据时：在 child 上直接写 `data`（如总量折线单独聚合）
- 堆叠场景：长表增加系列字段（如 `channel`），用 `encode.color` 分组 + `transform: [{ type: 'stackY' }]`
- 数值字段必须为 number；字符串数字先 `Number()` 转换

## 基础实现（G2 v5）

混合图 = `type: 'view'` 容器 + `children` 数组；每个 child 是一个 mark（必须有 `type`），按数组顺序渲染（后面的在上层）。默认共享 x/y 比例尺，因此同单位指标可直接叠加。

```ts
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', actual: 320, target: 300 },
  { month: 'Feb', actual: 420, target: 380 },
  { month: 'Mar', actual: 380, target: 410 },
  { month: 'Apr', actual: 520, target: 460 },
  { month: 'May', actual: 480, target: 500 },
  { month: 'Jun', actual: 610, target: 550 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'interval',
      encode: { x: 'month', y: 'actual' },
      style: { fill: '#5B8FF9', radiusTopLeft: 4, radiusTopRight: 4 },
    },
    {
      type: 'line',
      encode: { x: 'month', y: 'target', shape: 'smooth' },
      style: { stroke: '#F6BD16', lineWidth: 2, lineDash: [6, 4] },
    },
  ],
  axis: { x: { title: '月份' }, y: { title: '营收（万元）' } },
  legend: false,
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 柱线混合 | children：`interval` + `line`，共享单轴 | [basic.ts](../examples/mix/basic.ts) |
| 面积 + 折线 + 散点 | 父级 `encode` 写一次，三层 child 继承 | [area-line-point.ts](../examples/mix/area-line-point.ts) |
| 堆叠柱 + 总量折线 | `transform: [{ type: 'stackY' }]` + line child 独立 `data` | [stacked-column-line.ts](../examples/mix/stacked-column-line.ts) |
| 柱 + 目标参考线 | 叠加 `lineY` mark，`encode: { y: 'threshold' }` | [target-line.ts](../examples/mix/target-line.ts) |
| 柱线双轴 | 第二个 child 加 `scale: { y: { independent: true } }` | [column-line.ts](../examples/dual-axes/column-line.ts) |

多层叠加的核心是父级 `encode` 继承（数据需含 `date` / `dau` 字段）：

```ts-snippet
chart.options({
  type: 'view',
  data,
  encode: { x: 'date', y: 'dau' },
  children: [
    { type: 'area', style: { fill: '#5B8FF9', fillOpacity: 0.15 } },
    { type: 'line', style: { stroke: '#5B8FF9', lineWidth: 2 } },
    { type: 'point', encode: { shape: 'circle', size: 3 }, tooltip: false },
  ],
});
```

子 mark 需要不同数据时，直接在该 child 上写 `data`（不要在 `children` 里再套一层 `view`）：

```ts-snippet
children: [
  {
    type: 'interval',
    data: revenueByChannel,
    encode: { x: 'month', y: 'revenue', color: 'channel' },
    transform: [{ type: 'stackY' }],
  },
  {
    type: 'line',
    data: monthlyTotal,
    encode: { x: 'month', y: 'total' },
  },
],
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 共享坐标轴 | view 级 `axis: { x: { title }, y: { title } }` | 一次配置作用于所有 child |
| 图例位置 | view 级 `legend: { color: { position: 'top' } }` | 多系列堆叠时常用 |
| 系列配色 | view 级 `scale: { color: { range: [...] } }` | 堆叠/分组按系列值序着色 |
| mark 专属颜色 | 各 child 的 `style.fill` / `style.stroke` | 单系列柱、单条折线固定颜色 |
| 柱圆角 | `style: { radiusTopLeft: 4, radiusTopRight: 4 }` | interval 专属 |
| 折线平滑/虚线 | `encode: { shape: 'smooth' }`、`style: { lineDash: [6, 4] }` | 目标线常用虚线区分 |
| 参考线 | `type: 'lineY'` + `encode: { y: 'threshold' }` | 横向铺满坐标系 |
| 数据标签 | 各 child 的 `labels: [{ text: '字段', position: 'top' }]` | 柱顶/线点旁标数值 |
| tooltip 格式化 | 各 child 的 `tooltip.items` + `valueFormatter` | 辅助 mark 设 `tooltip: false` 去重 |
| 图表标题 | view 级 `title: { title, subtitle, align }` | `title` 必须是对象，不能直接写字符串 |
| 内置主题 | view 级 `theme: 'light' \| 'dark' \| 'classic' \| 'classicDark' \| 'academy'` | 暗色场景用 `'classicDark'` |

标题、轴样式与 tooltip 组合，完整示例见 [theme.ts](../examples/mix/theme.ts)：

```ts-snippet
title: {
  title: '营收与利润',
  subtitle: '单位：万元',
  align: 'left',
},
axis: {
  x: { title: '月份', labelFontSize: 12, labelFill: '#666' },
  y: { title: '金额', gridStroke: '#e8e8e8' },
},
```

双轴不属于混合图的默认行为：只有量级/单位确实不同才给第二个 child 加 `scale: { y: { independent: true } }`，并分别命名左右轴（详见 [dual-axes.md](./dual-axes.md)）。

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'mix'`（不存在的 mark） | `type: 'view'` + `children: [mark1, mark2]` |
| `new Mix('container', { plots: [...] })`（G2Plot v2） | `new Chart({ container })` + view children |
| `plots` / `views` 配置（v2 Mix 专属） | `children` 数组；各层数据挂在对应 child 的 `data` |
| 连续调用两次 `chart.options()` 叠加图层 | 后一次会覆盖前一次；合并为单个 view spec |
| 在 `children` 里再嵌套 `type: 'view'` | children 元素必须是 mark；独立数据直接写在 mark 上 |
| 双轴漏配 `scale: { y: { independent: true } }` | 两系列共用一根轴，量级小的会被压平 |
| 两个量级悬殊的指标硬塞进单轴混合图 | 改用 [dual-axes](./dual-axes.md) 双轴图 |
| `chart.line()` 之后再 `chart.interval()` 期望叠加 | 多 mark 叠加统一走 `type: 'view'` + children |
| `seriesField: 'channel'`（v2 配置） | `encode: { color: 'channel' }` |
| `chart.source(data)`（v4） | `chart.options({ data })`，或 child 内 `data` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/mix/basic.ts) | 实际营收（柱）vs 目标营收（线），最简柱线混合 | `type: 'view'` + interval/line children |
| [area-line-point.ts](../examples/mix/area-line-point.ts) | 日活趋势：面积 + 折线 + 采样点三层叠加 | 父级 `encode` 继承、`point.tooltip: false` |
| [stacked-column-line.ts](../examples/mix/stacked-column-line.ts) | 渠道营收构成 + 总营收趋势 | `transform: [{ type: 'stackY' }]`、line child 独立 `data` |
| [target-line.ts](../examples/mix/target-line.ts) | 月度完成量 vs 固定目标线 | `type: 'lineY'` + `encode: { y: 'threshold' }` + `lineDash` |
| [theme.ts](../examples/mix/theme.ts) | 品牌化柱线混合图：标题、轴、tooltip、主题 | view 级 `title`/`axis`、child 级 `tooltip.items`、`theme: 'classic'` |
