# Bullet 子弹图

> 组件用途：用定性区间背景、实际值条形和目标刻线展示 KPI 达成情况，常用于目标管理与经营报表。

## 何时使用

- KPI 考核：同时观察实际完成情况、目标差距和所处等级
- 目标达成报告：多指标并列展示，快速定位未达标指标
- 多实际值构成：将多个系列堆叠为总实际值，再与统一目标比较

## 何时不用

- 多类别间单纯数值对比 → 用 column 柱状图或 bar 条形图
- 连续时间趋势 → 用 line 折线图
- 占比/构成而不需要目标值 → 用 pie 饼图或堆叠柱状图

## 数据要求

- 实际值数据：每行包含 `category`、`measure`、`target`，分别表示指标类别、实际值和目标值
- 定性区间数据：每行包含 `category`、`range`、`level`，同一类别的多行区间通过 `stackY` 堆叠
- 多实际值堆叠：实际值数据增加 `series` 字段；目标数据仍保持每个类别一行，避免目标刻线重复
- 数据应自包含且字段名语义化，长表模式见 [数据模式](../references/data-patterns.md)

## 核心结构

子弹图必须在同一个 `view` 中按以下顺序组合三层：

1. 背景区间：`interval` 映射 `range`，使用 `stackY` 和较大的 `maxWidth`
2. 实际值：`interval` 映射 `measure`，使用较小的 `maxWidth`
3. 目标刻线：`point` 映射 `target`，设置 `shape: 'line'`

所有层始终保持 `x: 'category'`，数值字段映射到 `y`。添加 `coordinate.transform: [{ type: 'transpose' }]` 得到横向子弹图；移除该配置即为竖向子弹图，不要交换类别与数值字段。

## 基础实现（G2 v5）

```ts
/**
 * 基础横向子弹图
 * 场景：展示单个 KPI 的实际值、目标值与定性区间
 * 要点：宽 interval 绘制堆叠背景区间，窄 interval 绘制实际值，point 的 line 形状绘制目标刻线
 */
import { Chart } from '@antv/g2';

const data = [{ category: 'Sales', measure: 65, target: 75 }];

const rangeData = data.flatMap(({ category }) => [
  { category, range: 40, level: 'Poor' },
  { category, range: 20, level: 'Fair' },
  { category, range: 20, level: 'Good' },
  { category, range: 20, level: 'Great' },
]);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  coordinate: { transform: [{ type: 'transpose' }] },
  children: [
    {
      type: 'interval',
      data: rangeData,
      encode: { x: 'category', y: 'range', color: 'level' },
      transform: [{ type: 'stackY' }],
      scale: {
        color: {
          domain: ['Poor', 'Fair', 'Good', 'Great'],
          range: ['#F0F0F0', '#D9D9D9', '#BFBFBF', '#8C8C8C'],
        },
      },
      style: { maxWidth: 36 },
      tooltip: false,
    },
    {
      type: 'interval',
      data,
      encode: { x: 'category', y: 'measure', color: '#5B8FF9' },
      style: { maxWidth: 16 },
      tooltip: {
        title: 'category',
        items: [
          { field: 'measure', name: '实际值' },
          { field: 'target', name: '目标值' },
        ],
      },
    },
    {
      type: 'point',
      data,
      encode: {
        x: 'category',
        y: 'target',
        shape: 'line',
        color: '#262626',
        size: 8,
      },
      tooltip: false,
    },
  ],
  legend: false,
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 竖向布局 | 保持三层 encode 不变，移除 `transpose` | [vertical.ts](../examples/bullet/vertical.ts) |
| 多指标对比 | 每个类别提供实际值、目标值和一组定性区间 | [multi-indicator.ts](../examples/bullet/multi-indicator.ts) |
| 四段定性区间 | 背景按 Poor/Fair/Good/Great 堆叠并设置独立色阶 | [ranges.ts](../examples/bullet/ranges.ts) |
| 达成率标签 | 在实际值层显示实际值与目标完成百分比 | [progress.ts](../examples/bullet/progress.ts) |
| 多实际值堆叠 | 实际值按 `series` 分色并 `stackY`，目标数据每类一行 | [compare.ts](../examples/bullet/compare.ts) |
| 标签与提示格式化 | 标签读取完整数据行，tooltip 读取真实 `target` 字段 | [with-label.ts](../examples/bullet/with-label.ts) |

## 样式自定义

以下配置均作用于对应 mark，完整示例见 [custom-style.ts](../examples/bullet/custom-style.ts)。

| 定制项 | 写法 | 说明 |
|---|---|---|
| 背景区间宽度 | `style: { maxWidth: 36 }` | 宽于实际值条形 |
| 实际值宽度 | `style: { maxWidth: 16 }` | 与背景形成宽窄层次 |
| 目标刻线 | `encode: { shape: 'line', size: 8 }` | 使用 point 的线形状 |
| 虚线目标 | `style: { stroke: '#FF6B35', lineDash: [4, 4] }` | 配置在目标 point 上 |
| 实际值配色 | `encode: { color: '#5B8FF9' }` | 固定实际值颜色 |
| 定性区间颜色 | `scale.color: { domain, range }` | domain 与 level 顺序一致 |
| 数值轴标题 | `axis: { y: { title: '完成度 (%)' } }` | transpose 前后都保持数值字段为 y |

### 图表标题与内置主题

完整示例见 [theme.ts](../examples/bullet/theme.ts)。`theme: 'classicDark'` 可一行切换暗色主题，标题配置如下：

```ts-snippet
title: {
  title: '指标达成情况分析',
  subtitle: '单位：%',
  align: 'left',
  titleFontSize: 16,
  titleFill: '#FFFFFF',
  subtitleFontSize: 12,
  subtitleFill: '#A6A6A6',
},
```

### 数据标签与 tooltip

完整示例见 [with-label.ts](../examples/bullet/with-label.ts)。标签和 tooltip 都配置在实际值 interval 上；目标值直接读取 `target` 字段，不使用其他数值通道代替。

```ts-snippet
labels: [
  {
    text: (d: any) => `${d.measure} (${Math.round((d.measure / d.target) * 100)}%)`,
    position: 'right',
    style: { fontSize: 11, fill: '#262626' },
  },
],
tooltip: {
  title: 'category',
  items: [
    {
      field: 'measure',
      name: '实际值',
      valueFormatter: (value) => `${value} 单位`,
    },
    {
      field: 'target',
      name: '目标值',
      valueFormatter: (value) => `${value} 单位`,
    },
  ],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `.position('category*measure')` | 在各层使用 `encode: { x: 'category', y: 'measure' }` |
| `import { Bullet } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` + `type: 'view'` |
| `targetField: 'target'`（v2 配置） | 目标 point 使用 `encode.y: 'target'` 和 `encode.shape: 'line'` |
| `rangeField: 'range'`（v2 配置） | 背景 interval 映射 `range` 并添加 `stackY` |
| 用柱子状态模拟目标值 | 单独添加目标 point 层 |
| 用恒为 0 的通道显示目标 tooltip | `tooltip.items` 使用 `{ field: 'target' }` |
| 竖向图交换类别和数值字段 | 保持 encode 一致，仅增删 `transpose` |
| 堆叠实际值的每行都生成目标点 | 目标数据单独保持每个类别一行 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息如下，代码均通过 `npm run validate` 校验。

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/bullet/basic.ts) | 单个 KPI 的横向完整子弹图 | 三层组合 + 背景 `stackY` + 宽窄 `maxWidth` |
| [multi-indicator.ts](../examples/bullet/multi-indicator.ts) | 多指标横向并列比较 | 每类三层结构 + 定性区间图例 |
| [ranges.ts](../examples/bullet/ranges.ts) | Poor/Fair/Good/Great 四段定性区间 | 背景 `stackY` + `scale.color.domain/range` |
| [progress.ts](../examples/bullet/progress.ts) | 显示实际值与目标完成百分比 | 实际值 `labels` + 虚线目标 point |
| [vertical.ts](../examples/bullet/vertical.ts) | 竖向完整子弹图 | 保持 `x=category`、不使用 `transpose` |
| [custom-style.ts](../examples/bullet/custom-style.ts) | 品牌配色与虚线目标刻线 | 背景色阶 + 实际值描边 + point `lineDash` |
| [with-label.ts](../examples/bullet/with-label.ts) | 达成率标签与提示格式化 | 实际值 `labels` + tooltip `field: 'target'` |
| [theme.ts](../examples/bullet/theme.ts) | 带标题的暗色主题子弹图 | `title` + `theme: 'classicDark'` |
| [compare.ts](../examples/bullet/compare.ts) | Online/Retail 多实际值堆叠后对比目标 | 实际值按 `series` 分色 + `stackY` + 独立目标数据 |
