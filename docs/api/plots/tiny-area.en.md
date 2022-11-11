---
title: Tiny Area
order: 15
---

### Plot Container

<embed src="@/docs/common/chart-options.en.md"></embed>

### Data Mapping

#### data

<description>**required** _number[]_</description>

Configure the chart data source. The data of MINI area map directly uses a numeric array to represent the change trend of an indicator, without setting the X-axis field.

#### meta

<embed src="@/docs/common/meta.en.md"></embed>

### Plot Style

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

Whether Smooth.

#### areaStyle

<description>**optional** _StyleAttr | Function_</description>

Area chart style.

<embed src="@/docs/common/shape-style.en.md"></embed>

#### line

<description>**optional** _object_</description>

The pattern of polylines in the area.

| Properties | Type                                     | Description   |
| ---------- | ---------------------------------------- | ------------- |
| color      | _string \| string[] \| Function_         | Color mapping |
| style      | _ShapeStyle \| Function_                 | Style mapping |
| size       | _number \| [number, number] \| Function_ | Line width    |

#### point

<description>**optional** _pointStyle_</description>

Area Chart Data Point Graph Style.

<embed src="@/docs/common/point-style.en.md"></embed>

<embed src="@/docs/common/color.en.md"></embed>

#### pattern ✨

<description>**optional** _object | Function_</description>

<embed src="@/docs/common/pattern.en.md"></embed>

### Plot Component

<embed src="@/docs/common/component-tiny.en.md"></embed>
