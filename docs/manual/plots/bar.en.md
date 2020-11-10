---
title: Bar
order: 3
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### seriesField

<description>**optional** _string_</description>

拆分字段，在分组条形图下同 groupField、colorField，在堆积条形图下同 stackField、colorField。

#### groupField

<description>**optional** _string_</description>

拆分字段，用于堆叠分组条形图，拆分优先级高于 seriesField。

#### isGroup

<description>**optional** _boolean_</description>

是否分组柱形图。

#### isStack

<description>**optional** _boolean_</description>

是否堆积条形图。

#### isRange

<description>**optional** _boolean_</description>

是否区间条形图。

#### isPercent

<description>**optional** _boolean_</description>

是否百分百条形图，isPercent 为 true 时，isStack 也需要为 true。

`markdown:docs/common/meta.en.md`

### Geometry Style

#### barWidthRatio

<description>**optional** _number_</description>

条形图宽度占比 [0-1]。

#### marginRatio

<description>**optional** _number_</description>

分组中柱子之间的间距 [0-1]，仅对分组条形图适用。

#### barStyle

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

`markdown:docs/common/theme.en.md`
