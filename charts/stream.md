# Stream 河流图

> 组件用途：以居中对称、连续流动的色带展示多个系列随时间或有序维度变化的规模与整体构成。

## 何时使用

- 多系列连续变化：各音乐品类收听时长、各内容品类播放量、各渠道访问量的变化
- 关注整体流动形态：观察总量的起伏、各系列相对权重和此消彼长，而非精确读数
- 展示型趋势看板：希望用平滑、居中的色带强调数据的节奏与视觉流动感
- 每个系列在多个连续时间点上都有非负数值，建议 3～8 个系列

## 何时不用

- 精确比较各系列数值 → 用多系列 line 折线图；河流图没有共同零基线
- 读取统一基线上的累计总量 → 用 area 堆叠面积图（只加 `stackY`，不加 `symmetryY`）
- 无序类别间数值对比 → 用 column 柱状图
- 单一时间点的静态占比 → 用 pie 饼图
- 同时包含正负变化量 → 用 line 或 column；本组件的常规堆叠语义要求非负数值
- 系列过多且需要逐项辨认 → 用多系列 line 或拆分小图，避免色带过薄、颜色难区分

## 数据要求

- 长表数据，每行表示一个系列在一个时间点的观测值，见 [数据模式](../references/data-patterns.md)
- `x` 字段：时间字符串（`'2026-01'`）或有序类别；各系列应覆盖一致且完整的时间点
- `y` 字段：非负数值（number）；字符串数字先 `Number()` 转换
- `series` 字段：字符串，用于 `encode.color` 分组和着色
- 缺失记录不等于 0：只有业务上确实表示“没有发生”时才补 0，否则先明确缺失语义，避免制造虚假波谷

## 基础实现（G2 v5）

河流图不是独立的 G2 mark，而是 `type: 'area'` + `encode.color` 分组 + `stackY` 堆叠 + `symmetryY` 居中对称。两个变换必须按 `stackY` → `symmetryY` 的顺序执行；`shape: 'smooth'` 用于形成连续平滑的流带。

```ts
import { Chart } from '@antv/g2';

/**
 * 基础河流图（Stream Graph）
 * 场景：观察多个内容品类随时间的收听规模变化与整体流动形态
 * 要点：area + color 分组，先 stackY 堆叠，再 symmetryY 居中对称
 */
const data = [
  { month: '2026-01', genre: '流行', listeningHours: 120 },
  { month: '2026-01', genre: '摇滚', listeningHours: 80 },
  { month: '2026-01', genre: '电子', listeningHours: 60 },
  { month: '2026-01', genre: '古典', listeningHours: 40 },
  { month: '2026-02', genre: '流行', listeningHours: 150 },
  { month: '2026-02', genre: '摇滚', listeningHours: 90 },
  { month: '2026-02', genre: '电子', listeningHours: 85 },
  { month: '2026-02', genre: '古典', listeningHours: 45 },
  { month: '2026-03', genre: '流行', listeningHours: 135 },
  { month: '2026-03', genre: '摇滚', listeningHours: 110 },
  { month: '2026-03', genre: '电子', listeningHours: 105 },
  { month: '2026-03', genre: '古典', listeningHours: 50 },
  { month: '2026-04', genre: '流行', listeningHours: 180 },
  { month: '2026-04', genre: '摇滚', listeningHours: 105 },
  { month: '2026-04', genre: '电子', listeningHours: 130 },
  { month: '2026-04', genre: '古典', listeningHours: 55 },
  { month: '2026-05', genre: '流行', listeningHours: 165 },
  { month: '2026-05', genre: '摇滚', listeningHours: 130 },
  { month: '2026-05', genre: '电子', listeningHours: 150 },
  { month: '2026-05', genre: '古典', listeningHours: 60 },
  { month: '2026-06', genre: '流行', listeningHours: 210 },
  { month: '2026-06', genre: '摇滚', listeningHours: 145 },
  { month: '2026-06', genre: '电子', listeningHours: 175 },
  { month: '2026-06', genre: '古典', listeningHours: 70 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data,
  encode: {
    x: 'month',
    y: 'listeningHours',
    color: 'genre',
    shape: 'smooth',
  },
  transform: [{ type: 'stackY' }, { type: 'symmetryY' }],
  axis: { y: false },
  style: { fillOpacity: 0.85 },
});

chart.render();
```

对称变换会平移堆叠后的坐标，因此通常用 `axis: { y: false }` 隐藏 y 轴；原始业务数值应通过 tooltip 的原始字段展示。

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 平滑河流图 | `encode` 设置 `shape: 'smooth'`，配合 `stackY` 与 `symmetryY` | [basic.ts](../examples/stream/basic.ts) |
| 横向河流图 | `coordinate` 增加 `transpose`，时间沿纵向排列、流带横向展开 | [horizontal.ts](../examples/stream/horizontal.ts) |
| 品牌配色与分层描边 | `scale.color.range` 定制调色板，`style.stroke` 增加色带边界 | [custom-style.ts](../examples/stream/custom-style.ts) |

横向河流图核心差异（保留原有 encode 和变换顺序）：

```ts-snippet
coordinate: { transform: [{ type: 'transpose' }] },
```

## 样式自定义

常用视觉定制项完整示例见 [custom-style.ts](../examples/stream/custom-style.ts)：

| 定制项 | 写法 | 说明 |
|---|---|---|
| 系列调色板 | `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 颜色数量应覆盖系列数 |
| 填充透明度 | `style: { fillOpacity: 0.85 }` | 建议 0.7～0.95，过低会削弱相邻色带的区分 |
| 分层边界 | `style: { stroke: '#fff', lineWidth: 1 }` | 用细描边分隔相邻流带 |
| 平滑流带 | `encode: { shape: 'smooth' }` | 放在 `encode`，不是 `style` |
| 图例位置 | `legend: { color: { position: 'top' } }` | `'top'` / `'bottom'` / `'left'` / `'right'` |
| 时间轴标题 | `axis: { x: { title: '月份' } }` | x 轴仍表达原始时间维度 |
| 隐藏数值轴 | `axis: { y: false }` | 对称偏移后的 y 坐标不代表原始业务值 |
| 图表标题 | `title: { title: '音乐品类收听趋势', subtitle: '单位：万小时' }` | `title` 必须是对象，不能直接写字符串 |

内置主题、标题和组件文字样式可复用 [line.md 样式自定义](./line.md#样式自定义) 中的通用配置。

原始数值 tooltip（不要使用已变换的 `channel: 'y'`）：

```ts-snippet
tooltip: {
  title: 'month',
  items: [
    {
      field: 'listeningHours',
      name: '收听时长',
      valueFormatter: (value) => `${value} 万小时`,
    },
  ],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'stream'` 或 `type: 'streamgraph'` | G2 v5 没有该 mark；用 `type: 'area'` + `stackY` + `symmetryY` |
| `import { Stream } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'`，通过 `chart.options(spec)` 声明面积图组合 |
| 只写 `symmetryY`，不写 `stackY` | 先 `stackY` 形成各系列区间，再 `symmetryY` 居中，否则系列会相互遮挡 |
| 只写 `stackY`，不写 `symmetryY` | 得到的是普通堆叠面积图；增加 `symmetryY` 才形成居中河流图 |
| `symmetryY` 放在 `stackY` 前 | 顺序固定为 `[{ type: 'stackY' }, { type: 'symmetryY' }]` |
| `transform: { type: 'stackY' }`（对象） | `transform: [{ type: 'stackY' }, { type: 'symmetryY' }]`（数组） |
| `style: { shape: 'smooth' }` | `encode: { shape: 'smooth' }` |
| `seriesField: 'genre'`（G2Plot v2） | `encode: { color: 'genre' }` |
| 对称后用 y 轴或 `tooltip.items.channel: 'y'` 读取原值 | 通常隐藏 y 轴；tooltip 用 `field` 指向原始数值字段 |
| 正负值直接混入常规河流图 | 常规 stream 数据应为非负数；正负变化改用 line 或 column |
| 所有缺失时间点都直接补 0 | 先判断业务语义；仅“没有发生”时补 0，未知数据不能被当作 0 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/stream/basic.ts) | 多内容品类收听趋势，最简起步 | `type: 'area'`、`encode.color/shape`、`stackY` → `symmetryY` |
| [horizontal.ts](../examples/stream/horizontal.ts) | 窄长报表区域的横向流带 | 基础 stream + `coordinate.transform: [{ type: 'transpose' }]` |
| [custom-style.ts](../examples/stream/custom-style.ts) | 品牌配色、分层边界、标题图例与原始值提示 | `scale.color.range`、`style.stroke/lineWidth/fillOpacity`、`title`、`legend.position`、`tooltip.items.field` |
