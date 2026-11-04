# Ring Progress 环形进度条

> 组件用途：用圆环的已填充弧长表示单个指标的完成比例，中心留白放数值与状态文案，是 Dashboard 指标卡的常用形态。

## 何时使用

- 单指标完成率 / 达成率：项目进度 72%、季度 KPI、活动目标、课程学习进度
- 需要一眼看出「完成了多少、还差多少」的指标卡
- 中心需要放大号数值、单位或状态文案（如「86% / 达标」）
- 一屏并列多个指标（每个指标一个环，彼此独立）

## 何时不用

- 多类别占比构成 → 用 pie 环形图（每个类别一段弧，需要图例）
- 连续时间趋势 → 用 line 折线图
- 多个指标的精确横向对比 → 用 bar / column（弧长肉眼难以比较）
- 需要同时展示多个阈值区间和指针 → 用 gauge 仪表盘（`type: 'gauge'`）
- 想要水位起伏的「水球」效果 → 用 `type: 'liquid'`，不是进度环

## 数据要求

- 长表数据，**两行**即可：已完成 + 剩余（或 已用 + 可用），见 [数据模式](../references/data-patterns.md)
- `percent` 字段：数值（number），两行之和等于总量（通常 100）
- `status` 字段：字符串，用于 `encode.color` 区分进度段与底环段
- 数值范围与比例尺保持一致：数据用 0~100 就直接画；用 0~1 时显式配 `scale: { y: { domain: [0, 1] } }`
- 一个环只表达一个指标；多个指标并排时创建多个 `Chart` 实例，不要在一个环里堆多组数据

## 基础实现（G2 v5）

环形进度条 = `type: 'view'` 容器 + `interval` 画环 + `text` 写中心数值。其中 `interval` 三要素缺一不可：`transform: [{ type: 'stackY' }]`、`coordinate: { type: 'theta' }`、`coordinate.innerRadius`（挖空成环）。

```ts
import { Chart } from '@antv/g2';

/**
 * 环形进度条（基础）
 * 场景：单个指标的完成率，如项目进度 72%、活动目标达成率
 * 要点：theta 坐标系 + innerRadius 挖空成环；「已完成 / 剩余」两段 stackY 堆叠出进度；
 *       中心百分比用 text mark 定位在 50% / 50%
 */
const data = [
  { status: '已完成', percent: 72 },
  { status: '未完成', percent: 28 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data,
      encode: { y: 'percent', color: 'status' },
      transform: [{ type: 'stackY' }],
      coordinate: { type: 'theta', innerRadius: 0.76, outerRadius: 0.94 },
      scale: { color: { range: ['#5B8FF9', '#E8EDF3'] } },
      legend: false,
      tooltip: {
        title: 'status',
        items: [
          {
            channel: 'y',
            name: '占比',
            valueFormatter: (value: number) => `${value}%`,
          },
        ],
      },
    },
    {
      type: 'text',
      data: [{ value: 72 }],
      encode: { text: (d: { value: number }) => `${d.value}%` },
      style: {
        x: '50%',
        y: '50%',
        textAlign: 'center',
        textBaseline: 'middle',
        fontSize: 36,
        fontWeight: 600,
        fill: '#1d1d1d',
      },
      tooltip: false,
    },
  ],
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 半环仪表盘 | `coordinate` 增加 `startAngle: Math.PI` / `endAngle: Math.PI * 2`，只保留上半圆 | [semi-circle.ts](../examples/ring-progress/semi-circle.ts) |
| 阈值配色 + 入场动画 | 进度色由业务阈值计算，`animate.enter` 用 `waveIn` | [threshold.ts](../examples/ring-progress/threshold.ts) |
| 中心多行文案 | 再叠一个 `text` mark，`style.y` 下移到 `'62%'` 显示状态或单位 | [threshold.ts](../examples/ring-progress/threshold.ts) |

半环仪表盘核心差异（整环默认从 12 点方向顺时针画满一圈）：

```ts-snippet
coordinate: {
  type: 'theta',
  startAngle: Math.PI,      // 9 点方向
  endAngle: Math.PI * 2,    // 顺时针越过顶部到 3 点方向
  innerRadius: 0.7,
  outerRadius: 0.95,
},
```

阈值配色核心差异（颜色在图表外算好，再交给 `scale.color.range`）：

```ts-snippet
const progressColor =
  completionRate >= 80 ? '#22C55E' : completionRate >= 60 ? '#F59E0B' : '#EF4444';

scale: { color: { range: [progressColor, '#E8EDF3'] } },
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 环的粗细 | `coordinate: { type: 'theta', innerRadius: 0.76, outerRadius: 0.94 }` | 两者差值即环宽，常用区间 0.7~0.96；`innerRadius >= outerRadius` 会让圆环消失 |
| 进度色 / 底环色 | `scale: { color: { range: ['#5B8FF9', '#E8EDF3'] } }` | 数组顺序对应数据行的出现顺序：第一行进度、第二行底环 |
| 起始角度 | `coordinate.startAngle` / `coordinate.endAngle` | 默认 `-Math.PI / 2` 从 12 点方向顺时针画满；半环用 `Math.PI` → `Math.PI * 2` |
| 中心数值 | `text` mark + `style: { x: '50%', y: '50%' }` | `textAlign` / `textBaseline` 设为 `'center'` / `'middle'` 才真正居中 |
| 中心副文案 | 第二个 `text` mark，`style.y: '62%'` | 展示「季度目标达成度」「达标」等说明 |
| 关闭图例 | `legend: false` | 两段数据默认会生成「已完成 / 未完成」图例，进度环通常不需要 |
| 关闭提示 | `tooltip: false` | 中心已给出数值时可关闭 |
| 数值单位 | `text` 模板字符串或 `valueFormatter` | 如 `${d.value}%`、`${d.value} 万元` |
| 入场动画 | `animate: { enter: { type: 'waveIn', duration: 800 } }` | 极坐标专用的弧形展开；不需要动画时设 `animate: false` |
| 暗色大屏 | `theme: 'classicDark'` | 文字、底环颜色需同步调整为深色背景友好的值 |

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'ring-progress'`（G2 没有这个 mark） | `type: 'view'` + `interval` + `coordinate: { type: 'theta', innerRadius }` |
| 忘记 `transform: [{ type: 'stackY' }]` | 必须加，否则「已完成 / 剩余」两段都从 0 开始，完全重叠 |
| 忘记 `innerRadius` | 得到实心饼图；进度环必须设 `innerRadius` 挖空 |
| `radius` / `innerRadius` 写在 spec 顶层（G2Plot v2 写法） | 放进 `coordinate: { type: 'theta', innerRadius, outerRadius }` |
| `innerRadius` 大于 `outerRadius` | 保证 `innerRadius < outerRadius`（如 0.76 / 0.94） |
| `percent: '72'`（字符串数字） | `Number(percent)`，否则 y 比例尺异常 |
| 数据用 0~1，却让 y 轴自适应 | 显式 `scale: { y: { domain: [0, 1] } }`，否则 0.72 会被拉满整圈 |
| 中心文字写 `encode: { x: '50%', y: '50%' }` | 位置放在 `style.x` / `style.y`，`encode` 只负责 `text` 内容 |
| 用 pie 的 donut 承载进度但保留分类图例 | 进度环只需两种颜色（进度 / 底环），并 `legend: false` |
| `new RingProgress('container', { percent })`（G2Plot v2） | `new Chart({ container, autoFit: true })` + `chart.options(spec)` |
| `angleField` / `colorField`（G2Plot v2） | `encode: { y: 'percent', color: 'status' }` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/ring-progress/basic.ts) | 项目完成率 72%，最简起步 | `view` + `stackY` + `theta.innerRadius` + 中心 `text` |
| [semi-circle.ts](../examples/ring-progress/semi-circle.ts) | 季度 KPI 半环仪表盘，节省纵向空间 | `startAngle: Math.PI`、`endAngle: Math.PI * 2`、双 `text` 中心文案 |
| [threshold.ts](../examples/ring-progress/threshold.ts) | 监控指标按阈值变色（达标 / 预警 / 未达标） | 阈值计算 `scale.color.range`、`animate.enter: waveIn`、状态文案 |
