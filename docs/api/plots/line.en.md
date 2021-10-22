---
title: Line
order: 0
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

### Coordinate

#### reflect

<description>**optional** _'x' | 'y' | ['x', 'y']_</description>

Apply `reflect` transform to the coordinate of line plot. When `reflect: 'y'` is set, y-axis can be inverted; in the same way, you can set `reflect: 'x'` to invert x-axis, and invert x-axis and y-axis at the same time is also supported.

#### data

<description>**required** _array object_</description>

Configure the chart data source. The data source is a collection of objects, such as:

```ts
const data = [
  { time: '1991'，value: 20 },
  { time: '1992'，value: 20 },
];
```

`markdown:docs/common/xy-field.en.md`

#### seriesField

<description>**optional** _string_</description>

Group fields. Metric requirements to see different situations in a dimension simultaneously. For example, if we look at the sales trends for the last 30 days in different regions, the region field is SeriesField.

#### meta

`markdown:docs/common/meta.en.md`

### Plot Style

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

Whether the curve is smooth.

#### stepType

<description>**optional** _hv | vh | hvh | vhv_</description>

Step line chart type, smooth is invalid after configuration. The h and v here are the initials of 'horizontal' and 'vertical'. So what VH means is we start in the vertical direction, and then we start in the horizontal direction.

#### connectNulls

<description>**optional** _boolean_ _default:_ `true`</description>

For missing values in the line chart, whether to connect the empty data as a line, or the line is disconnected.

#### isStack

<description>**optional** _boolean_ _default:_ `false`</description>

For cases where the SeriesField grouping field is present, we can set isStack = true to make the polyline stack stack up.

`markdown:docs/common/color.en.md`

#### lineStyle

<description>**optional** _StyleAttr | Function_</description>

Polyline graphic style. You can either pass in the 'shapeStyle' structure directly, or you can use callbacks to return different styles for different data. For the ShapeStyle data structure, see:

`markdown:docs/common/shape-style.en.md`

#### point

<description>**optional** _object_</description>

Polyline data point graph style.

`markdown:docs/common/point-style.en.md`

#### state

<description>**optional** _object_</description>

`markdown:docs/common/state-style.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

#### Slider

`markdown:docs/common/slider.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Plot Interactions

`markdown:docs/common/interactions.en.md`

### Customize ✨

#### customInfo

<description>**optional** _any_</description>

通过 `customInfo` 属性，可以向 shape 中传入自定义的数据。目前可能仅仅可能用于在 `registerShape` 的时候，像自定义 shape 中传入自定义的数据，方便实现自定义 shape 的配置能力。

