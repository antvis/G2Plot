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

### Graphic Style

#### shape

<description>**optional** _'smooth'|'hollow'|'hollow-smooth'_</description>

The shape of violin geometry. Could be 'smooth', 'hollow' or 'hollow-smooth'. Defaults to rough, solid voilins.

#### violinStyle

<description>**optional** _StyleAttr | Function_</description>

Violin graphic style.

`markdown:docs/common/shape-style.en.md`

### box

<description>**optional** _false | object_</description>

Options to render inner box plot. Set `false` to avoid rendering box plot.

```ts
type BoxOptions = false | {
  /** Text of the box plot. */
  textMap?: {
    /** Max value label. */
    max: string;
    /** Min value label. */
    min: string;
    /** 1st quantile value label. */
    q1: string;
    /** 3rd quantile value label. */
    q3: string;
    /** Median value label. */
    median: string;
  };
};
```

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
