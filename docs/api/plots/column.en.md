---
title: Column
order: 2
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

Split fields, same as GroupField and ColorField under the grouping bar chart, same as StackField and ColorField under the stacking bar chart.

#### groupField

<description>**optional** _string_</description>

Split field used to stack grouping columns. Split field has a higher priority than SeriesField. IsGroup: true will group by GroupField.

#### isGroup

<description>**optional** _boolean_</description>

Whether to group bar charts.

#### isStack

<description>**optional** _boolean_</description>

Whether to stack columns.

#### isRange

<description>**optional** _boolean_</description>

Whether to range columns.

#### isPercent

<description>**optional** _boolean_</description>

Whether to percent columns, if isPercent is true, isStack also needs to be true.

#### meta

`markdown:docs/common/meta.en.md`

### Geometry Style

`markdown:docs/common/color.en.md`

`markdown:docs/common/column-style.en.md`

#### columnWidthRatio

<description>**optional** _number_</description>

Width ratio of column [0-1].

#### marginRatio

<description>**optional** _number_</description>

The spacing between columns in a grouping [0-1] applies only to grouping columns.

#### state

<description>**optional** _object_</description>

`markdown:docs/common/state-style.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

#### slider

`markdown:docs/common/slider.en.md`

#### Conversion Tag

`markdown:docs/common/conversion-tag.en.md`

#### Connected Area

`markdown:docs/common/connected-area.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Plot Interactions

`markdown:docs/common/interactions.en.md`
