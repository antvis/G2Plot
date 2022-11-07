---
title: Radial Bar
order: 25
---

### Plot Container

<embed src="@/docs/common/chart-options.en.md"></embed>

### Data Mapping

#### data 📌

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 30 }]`.

<embed src="@/docs/common/xy-field.en.md"></embed>

#### meta

<embed src="@/docs/common/meta.en.md"></embed>

### Geometry Style

#### radius

<description>**optional** _number_ _default:_ `1`</description>

Radius of Polar coordinate. Value can be: (0, 1]

#### innerRadius

<description>**optional** _number_</description>

InnerRadius of Polar coordinate. Value can be: (0, 1]

#### startAngle

<description>**optional** _number_ _default:_ `-Math.PI / 2`</description>

Configure the starting angle of the coordinate system.

#### endAngle

<description>**optional** _number_ _default:_ `Math.PI / 2 * 3`</description>

Configure the end angle of the coordinate system.

<playground path="more-plots/radial-bar/demo/line.ts" rid="startAngle-endAngle"></playground>

#### maxAngle

<description>**optional** _number_ _default:_ `240`</description>

Specify the maximum rotation angle of the bar, determined by the maximum value in data. The maximum value is 360 degrees.

#### type

<description>**optional** _string_</description>

Display type of plot. You can specify `type: 'line'` to display a `Radial-Line` plot.

<embed src="@/docs/common/bar-style.en.md"></embed>

<embed src="@/docs/common/color.en.md"></embed>

#### pattern ✨

<description>**optional** _object | Function_</description>

<embed src="@/docs/common/pattern.en.md"></embed>

### Plot Components

<embed src="@/docs/common/component.en.md"></embed>

### Plot Event

<embed src="@/docs/common/events.en.md"></embed>

### Plot Method

<embed src="@/docs/common/chart-methods.en.md"></embed>

### Plot Theme

<embed src="@/docs/common/theme.en.md"></embed>

### Plot Interactions

<embed src="@/docs/common/interactions.en.md"></embed>
