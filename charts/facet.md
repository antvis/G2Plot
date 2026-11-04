# Facet 矩形分面图

> 组件用途：按一个或两个类别字段拆分数据，在网格中绘制结构一致的小多图，便于分组比较。

## 何时使用

- 分组趋势对比：每个地区、产品或部门各画一张趋势子图，避免多系列线条重叠
- 二维交叉比较：地区 × 渠道、产品 × 客户群等组合形成小多图矩阵
- 同构图形复用：每个分面使用相同 Mark、字段映射和视觉规则，仅数据分组不同
- 分组数量适中：建议控制在 2～12 个分面，保证每个子图仍有足够阅读空间

## 何时不用

- 只有一个分组，或不需要拆分子图 → 直接使用 line、column、scatter 等基础图表
- 少量系列叠在一起仍清晰，且更关注同一坐标系中的差异 → 用 `encode.color` 多系列图
- 只比较各类别的单个汇总值 → 用 column 柱状图，不必为每类创建分面
- 每个子图使用不同图形、不同指标或不同数据结构 → 使用独立图表或组合视图，而非同构分面
- 分面类别过多且无法筛选 → 先筛选、聚合或分页，避免子图过密

## 数据要求

- 长表数据，每行一条观测记录，见 [数据模式](../references/data-patterns.md)
- 分面字段：类别字符串；父级 `encode.x` 按字段值分列，父级 `encode.y` 按字段值分行，至少配置一个
- 子图位置字段：在 `children` 的 Mark 中配置，如折线图的 `x` 为时间/有序类别、`y` 为数值
- 数值字段必须是 `number`；字符串数字先用 `Number()` 转换
- 各分面字段结构保持一致；折线分面每组至少 2 个有效点，二维分面需包含对应的行列组合
- 数据放在父级 `data`，子 Mark 不写 `data`，自动继承当前分面过滤后的数据

## 基础实现（G2 v5）

矩形分面 = 父级 `type: 'facetRect'` + 父级 `encode` 指定分面维度 + `children` 定义每个子图的 Mark。

```ts
/**
 * 基础分面折线图
 * 用途：将各区域销售趋势拆成独立子图，避免多线重叠
 * 场景：按单一类别字段对比多个分组的同构趋势
 * 要点：facetRect 的 encode.x 指定列分面；children 继承并自动过滤父级数据
 */
import { Chart } from '@antv/g2';

const data = [
  { region: '华东', month: 'Jan', revenue: 120 },
  { region: '华东', month: 'Feb', revenue: 168 },
  { region: '华东', month: 'Mar', revenue: 152 },
  { region: '华东', month: 'Apr', revenue: 205 },
  { region: '华东', month: 'May', revenue: 228 },
  { region: '华东', month: 'Jun', revenue: 246 },
  { region: '华南', month: 'Jan', revenue: 96 },
  { region: '华南', month: 'Feb', revenue: 118 },
  { region: '华南', month: 'Mar', revenue: 142 },
  { region: '华南', month: 'Apr', revenue: 136 },
  { region: '华南', month: 'May', revenue: 174 },
  { region: '华南', month: 'Jun', revenue: 190 },
  { region: '华北', month: 'Jan', revenue: 82 },
  { region: '华北', month: 'Feb', revenue: 90 },
  { region: '华北', month: 'Mar', revenue: 108 },
  { region: '华北', month: 'Apr', revenue: 126 },
  { region: '华北', month: 'May', revenue: 121 },
  { region: '华北', month: 'Jun', revenue: 148 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'facetRect',
  data,
  encode: { x: 'region' },
  children: [
    {
      type: 'line',
      encode: { x: 'month', y: 'revenue' },
      style: { stroke: '#5B8FF9', lineWidth: 2 },
      axis: {
        x: { title: '月份' },
        y: { title: '销售额（万元）' },
      },
    },
  ],
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 单维度列分面 | 父级 `encode: { x: 'region' }`，每个类别一列 | [basic.ts](../examples/facet/basic.ts) |
| 二维分面矩阵 | 父级同时配置 `encode.x` 与 `encode.y`，按两个类别字段交叉拆分 | [matrix.ts](../examples/facet/matrix.ts) |
| 单维度行分面 | 只配置父级 `encode: { y: 'region' }`，每个类别一行 | 将 [basic.ts](../examples/facet/basic.ts) 的父级 `encode.x` 改为 `encode.y` |
| 分面柱状图 | `children` 中使用 `type: 'interval'`，子图 `encode` 映射类别与数值 | 将 [basic.ts](../examples/facet/basic.ts) 的子 Mark 改为 `interval` |
| 分面散点图 | `children` 中使用 `type: 'point'`，子图 `encode.x/y` 映射两个数值字段 | 将 [basic.ts](../examples/facet/basic.ts) 的子 Mark 与字段替换为散点配置 |

二维分面核心差异（完整代码见 [matrix.ts](../examples/facet/matrix.ts)）：

```ts-snippet
chart.options({
  type: 'facetRect',
  data,
  encode: { x: 'region', y: 'channel' },
  children: [
    {
      type: 'line',
      encode: { x: 'month', y: 'revenue' },
    },
  ],
});
```

分面内仍有多系列时，在子 Mark 上增加颜色分组；分面字段与系列字段职责不同：

```ts-snippet
children: [
  {
    type: 'line',
    encode: { x: 'month', y: 'revenue', color: 'metric' },
  },
],
```

## 样式自定义

分面内的颜色、线宽、坐标轴和图例配置在对应子 Mark 上；整个图表的标题与主题配置在 `facetRect` 父级。

| 定制项 | 写法 | 说明 |
|---|---|---|
| 固定子图颜色 | 子 Mark `style: { stroke: '#5B8FF9' }` | 折线用 `stroke`，柱/点用 `fill` |
| 子图线宽 | 子 Mark `style: { lineWidth: 2 }` | 所有分面应用同一规则 |
| 分面内系列配色 | 子 Mark `scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 配合子 Mark `encode.color` |
| 子图坐标轴标题 | 子 Mark `axis: { x: { title: '月份' }, y: { title: '销售额（万元）' } }` | 不要与父级分面编码混淆 |
| 子图图例位置 | 子 Mark `legend: { color: { position: 'top' } }` | 分面内使用 `encode.color` 时有效 |
| 关闭子图图例 | 子 Mark `legend: false` | 分面标题已表达分组时可减少重复信息 |
| 总标题与副标题 | 父级 `title: { title: '区域销售', subtitle: '单位：万元' }` | `title` 必须是对象，见 [matrix.ts](../examples/facet/matrix.ts) |
| 内置主题 | 父级 `theme: 'classicDark'` | 也可使用 `'light'` / `'dark'` / `'classic'` / `'academy'` |

带系列配色的子图片段：

```ts-snippet
children: [
  {
    type: 'line',
    encode: { x: 'month', y: 'revenue', color: 'metric' },
    scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } },
    style: { lineWidth: 2 },
    axis: {
      x: { title: '月份', labelFontSize: 11 },
      y: { title: '销售额（万元）', titleFill: '#666' },
    },
    legend: { color: { position: 'top', itemLabelFill: '#666' } },
  },
],
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `import { Facet } from '@antv/g2plot'` | `import { Chart } from '@antv/g2'` |
| `new Facet('container', { type: 'rect', fields, eachView })`（G2Plot v2） | `new Chart({ container })` + `chart.options({ type: 'facetRect', encode, children })` |
| `chart.facet('rect', { fields: ['region'], eachView })`（G2 v4） | 父级 `type: 'facetRect'`，分面字段放入父级 `encode.x/y` |
| `type: 'facet'` 或 `type: 'rect'` | 矩形分面使用 `type: 'facetRect'` |
| `fields: ['region']` 或 `facetField: 'region'` | 列分面用 `encode: { x: 'region' }`，行分面用 `encode: { y: 'region' }` |
| 父级写 `encode: { x: 'month', y: 'revenue' }` 作为子图位置映射 | 父级 `encode.x/y` 只负责分面列/行；子图位置映射写在 `children` 的 Mark 中 |
| 每个子 Mark 再写一遍全量 `data` | 数据只放父级，子 Mark 不写 `data`，自动继承当前分面过滤后的数据 |
| 为每个分组手工复制一个 Chart | 保留长表，用一个 `facetRect` 和一组共享的 `children` 配置 |
| 把分面字段同时当作子图 `encode.color` 的唯一分组依据 | 需要独立子图时用父级分面编码；只有分面内还需多系列时才配置子图 `color` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/facet/basic.ts) | 各区域月度销售趋势按列拆分，最简起步 | 父级 `type: 'facetRect'`、`encode.x: 'region'`；子 Mark `type: 'line'` |
| [matrix.ts](../examples/facet/matrix.ts) | 区域 × 渠道二维销售趋势矩阵 | 父级 `encode: { x: 'region', y: 'channel' }`、总标题、共享子图配置 |
