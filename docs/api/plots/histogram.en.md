---
title: Histogram
order: 11
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

#### binField 

<description>**required** _string_</description>

设置直方图绘制 (进行分箱) 的字段。

#### binWidth

<description>**optional** _string_</description>

设置直方图的分箱宽度，binWidth 影响直方图分成多少箱, 不能与 binNumber 一起使用。

#### binNumber

<description>**optional** _number_</description>

设置直方图的分箱数量，binNumber 影响直方图分箱后每个柱子的宽度。

#### stackField

<description>**optional** _number_</description>

指定层叠字段，通过该字段的值，柱子将会被分割为多个部分，通过颜色进行区分。

`markdown:docs/common/meta.en.md`

### Geometry Style

#### columnStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置。

`markdown:docs/common/shape-style.en.md`

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

### Plot Theme

`markdown:docs/common/theme.en.md`
