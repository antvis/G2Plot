---
title: Line
order: 0
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

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

<description>**optional**</description>

Polyline data point graph style.

`markdown:docs/common/point-style.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

#### Slider

`markdown:docs/common/slider.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
