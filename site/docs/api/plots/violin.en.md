---
title: Violin
order: 31
---

### Plot Container

<embed src="@/docs/common/chart-options.en.md"></embed>

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

<embed src="@/docs/common/xy-field.en.md"></embed>

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

<embed src="@/docs/common/meta.en.md"></embed>

小提琴图内置箱线图配置。箱线图的统计数据分别为：

- high: 数据中的最大值，作为箱线图的最高点；
- low: 数据中的最小值，作为箱线图的最低点；
- q3: 上四分位，即 25% 的数据大于该数，作为箱线图中箱子的高点；
- q1: 下四分位，即 25% 的数据小于该数，作为箱线图中箱子的低点；
- median: 数据的中位数，在箱线图中用圆点表示。

可以通过 `meta` 来设置字段的元信息

<Playground path="more-plots/violin/demo/tooltip.ts" rid="tooltip-meta"></playground>

### Graphic Style

#### box

<description>**optional** _boolean | BoxOption_</description>

Whether to show box plot. Default show box plot, you can custom box plot with _BoxOption_. In addition, you could also hide box plot by setting `box: false`.

```ts
type BoxOption = {
  // configuration of state style of box, more detail to see: `state`
  state: State;
}
```

#### shape

<description>**optional** _'smooth'|'hollow'|'hollow-smooth'_</description>

The shape of violin geometry. Could be 'smooth', 'hollow' or 'hollow-smooth'. Defaults to rough, solid violins.

#### violinStyle

<description>**optional** _StyleAttr | Function_</description>

Violin graphic style.

<embed src="@/docs/common/shape-style.en.md"></embed>

<embed src="@/docs/common/color.en.md"></embed>

#### state

<description>**optional** _object_</description>

<embed src="@/docs/common/state-style.en.md"></embed>

### Plot Components

<embed src="@/docs/common/common-component.en.md"></embed>

### Plot Event

<embed src="@/docs/common/events.en.md"></embed>

### Plot Method

<embed src="@/docs/common/chart-methods.en.md"></embed>

### Plot Theme

<embed src="@/docs/common/theme.en.md"></embed>
