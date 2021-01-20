---
title: Radial Bar
order: 25
---

### Plot Container

`markdown:docs/common/chart-options.zh.md`

### Data Mapping

#### data 📌

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 30 }]`.

`markdown:docs/common/xy-field.zh.md`

`markdown:docs/common/meta.zh.md`

### Geometry Style

#### radius

<description>**optional** _number_ _default:_ `1`</description>

Radius of Polar coordinate. Value can be: (0, 1]

#### innerRadius

<description>**optional** _number_</description>

InnerRadius of Polar coordinate. Value can be: (0, 1]

#### startAngle 

<description>**optional** _number_ _default:_ `-Math.PI / 2`</description>

配置坐标系的起始角度。

#### endAngle 

<description>**optional** _number_ _default:_ `Math.PI / 2 * 3`</description>

配置坐标系的结束角度。

<playground path="more-plots/radial-bar/demo/line.ts" rid="startAngle-endAngle"></playground>

#### maxAngle

<description>**optional** _number_ _default:_ `240`</description>

Specify the maximum rotation angle of the bar, determined by the  maximum value in data. The maximum value is 360 degrees.

#### type

<description>**optional** _string_</description>

Display type of plot. You can specify `type: 'line'` to display a `Radial-Line` plot.

`markdown:docs/common/bar-style.en.md`

`markdown:docs/common/color.zh.md`

### Plot Components

`markdown:docs/common/component.zh.md`

### Event

`markdown:docs/common/events.zh.md`

### Plot Method

`markdown:docs/common/chart-methods.zh.md`

### Plot Theme

`markdown:docs/common/theme.zh.md`

### Plot Interactions

`markdown:docs/common/interactions.zh.md`
