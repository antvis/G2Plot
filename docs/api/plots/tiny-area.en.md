---
title: Tiny Area
order: 15
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _number[]_</description>

Configure the chart data source. The data of MINI area map directly uses a numeric array to represent the change trend of an indicator, without setting the X-axis field.

#### meta

`markdown:docs/common/meta.en.md`

### Plot Style

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

Whether Smooth.

#### areaStyle

<description>**optional** _StyleAttr | Function_</description>

Area chart style.

`markdown:docs/common/shape-style.en.md`

#### line

<description>**optional** _lineStyle_</description>

The pattern of polylines in the area.

| Properties | Type                                     | Description   |
| ---------- | ---------------------------------------- | ------------- |
| color      | _string \| string[] \| Function_         | Color mapping |
| style      | _ShapeStyle \| Function_                 | Style mapping |
| size       | _number \| [number, number] \| Function_ | Line width    |

#### point

<description>**optional** _pointStyle_</description>

Area Chart Data Point Graph Style.

`markdown:docs/common/point-style.en.md`

`markdown:docs/common/color.en.md`

### Plot Component

`markdown:docs/common/component-tiny.en.md`
