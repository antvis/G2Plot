---
title: Column
order: 2
---

### Plot Container

<embed src="@/docs/common/chart-options.en.md"></embed>

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

<embed src="@/docs/common/xy-field.en.md"></embed>

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

<embed src="@/docs/common/meta.en.md"></embed>

### Geometry Style

<embed src="@/docs/common/coordinate.en.md"></embed>

<embed src="@/docs/common/color.en.md"></embed>

#### pattern ✨

<description>**optional** _object | Function_</description>

<embed src="@/docs/common/pattern.en.md"></embed>

<embed src="@/docs/common/column-style.en.md"></embed>

#### columnWidthRatio

<description>**optional** _number_</description>

Width ratio of column [0-1].

#### marginRatio

<description>**optional** _number_</description>

The spacing between columns in a grouping [0-1] applies only to grouping columns.

#### shape

<description>**可选** _string_</description>

内置 shape 类型有：`hollow-rect`, `tick`; 此外，还可以搭配 [`registerShape`](https://g2.antv.vision/en/docs/api/advanced/register-shape) 进行自定义使用.

[Demo](/zh/examples/column/basic#custom-shape)

#### state

<description>**optional** _object_</description>

<embed src="@/docs/common/state-style.en.md"></embed>

### Plot Components

<embed src="@/docs/common/common-component.zh.md"></embed>

#### Slider

<embed src="@/docs/common/slider.en.md"></embed>

#### Scrollbar

<embed src="@/docs/common/scrollbar.en.md"></embed>

#### Conversion Tag

Applicable to base bar charts and base bar charts, the Conversion Rate component allows the user to focus on the rate of change in the data.

<embed src="@/docs/common/conversion-tag.en.md"></embed>

#### Connected Area

<embed src="@/docs/common/connected-area.en.md"></embed>

### Plot Event

<embed src="@/docs/common/events.en.md"></embed>

### Plot Method

<embed src="@/docs/common/chart-methods.en.md"></embed>

### Plot Theme

<embed src="@/docs/common/theme.en.md"></embed>

### Plot Interactions

Built-in interactions of scatter are as follows:

| Interaction | Description                              | Configuration                  |
| ----------- | ---------------------------------------- | ------------------------------ |
| brush | 用于刷选交互，配置该交互后，可进行刷选。 | `brush: { enabled: true }` |

<embed src="@/docs/common/brush.en.md"></embed>

<embed src="@/docs/common/interactions.en.md"></embed>
