---
title: Box
order: 31
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### seriesField

<description>**optional** _string_</description>

Grouping field. It is used for grouping by default, and color is used as visual channel.
Outlier field.

#### kde

<description>**optional** _object_</description>

Options to generate Kernel Density Estimation. Currently only triangular kernel was supported.

```ts
type KdeOptions = {
  /** Triangular kernel */
  type: 'triangular';
  /** Min value for the kde's x range. Defaults to smallest value minus some threshold. */
  min?: number;
  /** Max value for the kde's x range. Defaults to largest value plus some threshold. */
  max?: number;
  /** Number of points to represent the kde. Defaults to 32. */
  sampleSize?: number;
  /** Bandwith of the triangular kernel. Defaults to 3. */
  width?: number;
};
```

#### meta

`markdown:docs/common/meta.en.md`

小提琴图内置的箱线图配置。设置为 `false` 时不渲染箱线图。

箱线图的统计数据分别为：

- high: 数据中的最大值，作为箱线图的最高点；
- low: 数据中的最小值，作为箱线图的最低点；
- q3: 上四分位，即 25% 的数据大于该数，作为箱线图中箱子的高点；
- q1: 下四分位，即 25% 的数据小于该数，作为箱线图中箱子的低点；
- median: 数据的中位数，在箱线图中用圆点表示。

可以通过 `meta` 来设置字段的元信息

<playground path="more-plots/violin/demo/tooltip.ts" rid="tooltip-meta"></playground>

### Graphic Style

#### shape

<description>**optional** _'smooth'|'hollow'|'hollow-smooth'_</description>

The shape of violin geometry. Could be 'smooth', 'hollow' or 'hollow-smooth'. Defaults to rough, solid voilins.

#### violinStyle

<description>**optional** _StyleAttr | Function_</description>

Violin graphic style.

`markdown:docs/common/shape-style.en.md`

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
