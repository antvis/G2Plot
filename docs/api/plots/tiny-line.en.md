---
title: Tiny Line
order: 14
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _number[]_</description>

Configure the chart data source. MINI line chart data directly uses a numeric array, representing the trend of an indicator, without the need to set the X-axis field.

#### meta

`markdown:docs/common/meta.en.md`

### Plot Style

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

Whether the curve is smooth.

#### connectNulls

<description>**optional** _boolean_ _default:_ `true`</description>

For missing values in the line chart, whether to connect the empty data as a line, or the line is disconnected.

#### lineStyle

<description>**optional** _StyleAttr | Function_</description>

Polyline graphic style. You can either pass in the 'shapeStyle' structure directly, or you can use callbacks to return different styles for different data. For the ShapeStyle data structure, see:

`markdown:docs/common/shape-style.en.md`

#### point

<description>**optional**</description>

Polyline data point chart style.

`markdown:docs/common/point-style.en.md`

`markdown:docs/common/color.en.md`

### Plot Component

`markdown:docs/common/component-tiny.en.md`
