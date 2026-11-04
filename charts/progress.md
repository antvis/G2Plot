# Progress 进度条

> 组件用途：展示单一指标相对目标的完成进度，突出「已完成 / 剩余」的比例关系。

## 何时使用

- 完成度对比目标：季度目标完成率、KPI 达成度、任务进度
- 资源消耗比例：存储已用 / 总容量、预算消耗
- 少量指标（1~6 条）横向对比进度，且每条都有明确的目标上限
- 仪表盘、任务详情页里替代裸数字，让人一眼看出「还差多少」

## 何时不用

- 多类别构成占比（各部分拼成整体，但不是「完成 / 剩余」）→ 用 pie 饼图
- 没有目标值的类别数值对比 → 用 bar 条形图
- 指标随时间变化 → 用 line 折线图
- 主要诉求是精确比较多个数值，进度只是附属信息 → 用 column 柱状图
- 二维交叉的密度分布 → 用 heatmap 热力图

## 数据要求

- 长表数据，每行一个进度项，见 [数据模式](../references/data-patterns.md)
- `x` 字段：进度项名称（字符串）；单条进度也要给语义化标签（如 `'季度目标完成率'`）
- `y` 字段：当前值（`number`），与 `target` 同单位；**不要**写成 `'72%'` 字符串
- `target` 字段：目标值 / 上限（`number`），用于画背景轨道；不需要轨道时改用 `scale.y.domain` 固定上限
- 百分比不要在数据里拼成字符串，标签用 `text` 回调格式化

## 基础实现（G2 v5）

G2 v5 **没有** `type: 'progress'` mark：进度条 = `interval` + 转置坐标系，背景轨道用第二个 `interval` 叠在底层。

```ts
import { Chart } from '@antv/g2';

const data = [
  { metric: '季度目标完成率', completed: 72, target: 100 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { y: { domain: [0, 100] } },
  axis: { x: false, y: false },
  legend: false,
  children: [
    {
      type: 'interval',
      encode: { x: 'metric', y: 'target', size: 28 },
      style: { fill: '#EEF2F7', radius: 14 },
      tooltip: false,
    },
    {
      type: 'interval',
      encode: { x: 'metric', y: 'completed', size: 28 },
      style: { fill: '#5B8FF9', radius: 14 },
      labels: [
        {
          text: (d: { completed: number }) => `${d.completed}%`,
          position: 'right',
          style: { fontSize: 14, fontWeight: 600, fill: '#1d1d1d' },
        },
      ],
    },
  ],
});

chart.render();
```

关键点：

- `coordinate: { transform: [{ type: 'transpose' }] }` 把竖向柱转成横向条
- `scale: { y: { domain: [0, 100] } }` 固定值域，轨道与进度条长度才可比；不设会按数据自适应，72% 也可能撑满整条
- `encode: { size: 28 }` 控制条高（px，转置后即厚度）；`style.radius` 取条高一半得到胶囊形
- 轨道与进度条必须共享同一个 `x` 字段和 y 域（放在同一 `type: 'view'` 下即可自动共享 scale）
- 单条进度关闭坐标轴（`axis: { x: false, y: false }`）

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 多指标进度对比 | 多条数据 + `encode.size` 调细，保留 x 轴展示名称 | [multi-progress.ts](../examples/progress/multi-progress.ts) |
| 按达标状态着色 | `encode.color` 映射状态字段，`scale.color.domain/range` 固定颜色顺序 | [multi-progress.ts](../examples/progress/multi-progress.ts) |
| 环形进度 | `transform: [{ type: 'stackY' }]` + `coordinate: { type: 'theta', innerRadius }` | [ring-progress.ts](../examples/progress/ring-progress.ts) |

极简版（不需要背景轨道，靠固定值域表达剩余量）：

```ts-snippet
chart.options({
  type: 'interval',
  data: [{ metric: '任务完成度', completed: 72 }],
  encode: { x: 'metric', y: 'completed', size: 16 },
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { y: { domain: [0, 100] } },
  style: { fill: '#5B8FF9', radius: 8 },
  axis: false,
  legend: false,
});
```

分段进度（已完成 / 进行中 / 未开始，同一 x 上堆叠）：

```ts-snippet
chart.options({
  type: 'interval',
  data: [
    { stage: '上线进度', status: '已完成', value: 60 },
    { stage: '上线进度', status: '进行中', value: 25 },
    { stage: '上线进度', status: '未开始', value: 15 },
  ],
  encode: { x: 'stage', y: 'value', color: 'status' },
  transform: [{ type: 'stackY' }],
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { y: { domain: [0, 100] } },
  style: { radius: 8 },
  axis: { x: false, y: false },
  legend: { color: { position: 'bottom' } },
});
```

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 条高 | `encode: { size: 16 }` | px；转置后即进度条厚度，多条目建议 12~20 |
| 圆角 | `style: { radius: 8 }` | 取条高一半即为胶囊形 |
| 进度色 | 单色 `style: { fill: '#5B8FF9' }`；按状态 `encode: { color: 'status' }` + `scale.color.range` | 状态色需显式给 `scale.color.domain` 固定顺序 |
| 轨道色 | 轨道 interval 的 `style: { fill: '#EEF2F7' }` | 明显浅于进度色，暗色主题可换 `'#2A2A2A'` |
| 百分比标签 | `labels: [{ text: (d) => d.completed + '%', position: 'right' }]` | 转置后 `'right'` 即条尾外侧 |
| 关闭坐标轴 / 图例 | `axis: false`、`legend: false` | 单条进度常用 |
| 内置主题 | `theme: 'classicDark'` | 暗色大屏一行切换 |

tooltip 与标题（轨道 interval 设 `tooltip: false`，避免两条重叠时提示重复）：

```ts-snippet
title: {
  title: '季度目标完成情况',
  subtitle: '数据截至 2026-09-30',
  align: 'left',
},
tooltip: {
  title: 'metric',
  items: [
    { channel: 'y', name: '已完成', valueFormatter: (v) => `${v}%` },
  ],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'progress'`（G2 v5 无此 mark，白屏/报错） | `type: 'interval'` + `coordinate: { transform: [{ type: 'transpose' }] }` |
| `coordinate: { type: 'transpose' }` | 转置是坐标系变换：`coordinate: { transform: [{ type: 'transpose' }] }` |
| `new Progress('container', { percent: 0.72 })`（G2Plot v2） | `new Chart({ container })` + `chart.options(spec)` |
| `import { Progress } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| 把 `percent` / `progress` 当配置项传 | 数据字段 `completed: 72` + `encode: { y: 'completed' }` |
| 不设 `scale.y.domain` 就画进度条 | 固定 `domain: [0, target]`，否则当前值自动撑满，看不出剩余量 |
| 用 `style: { width }` / `style: { height }` 调条高 | 条高用 `encode: { size }`；`width` / `height` 是图表尺寸 |
| 百分比存成 `'72%'` 字符串 | 存 `number`，`labels.text` 回调拼 `%` |
| 轨道和进度条各自用不同数据域 / 不同 x 字段 | 放在同一 `type: 'view'` 下共享 scale，长度才对得齐 |
| `chart.source(data)`（v4） | `chart.options({ data })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/progress/basic.ts) | 单指标完成度（季度目标完成率），最简起步 | `type: 'view'` + 双 interval、`transpose`、`scale.y.domain`、`labels` |
| [multi-progress.ts](../examples/progress/multi-progress.ts) | 多业务线完成率横向对比，按达标状态着色 | `encode.size`、`encode.color` + `scale.color.domain`、x 轴保留 |
| [ring-progress.ts](../examples/progress/ring-progress.ts) | 大屏 / 移动端单指标环形进度 | `stackY`、`coordinate: { type: 'theta', innerRadius: 0.72 }`、`labels` |
