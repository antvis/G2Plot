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

Sets the fields drawn by the histogram.

#### stackField

<description>**optional** _number_</description>

Specifies cascading fields by which the column will be divided into sections, separated by color.

#### meta

`markdown:docs/common/meta.en.md`

Built-in fields of Histogram:

| Field Key | Description of field | Type of the value of the field |
｜ --- ｜ --- ｜ --- ｜
｜`range`| 分箱之后，所处分箱的区间范围 |_number[]_ |
｜`count`| 分箱之后，所处分箱的计数数量 | _number_ |

Example:

<playground path="more-plots/histogram/demo/binWidth.ts" rid="histogram-meta"></playground>

### Geometry Style

#### binWidth

<description>**optional** _string_</description>

Set the box width of the histogram. BinWidth affects how many boxes the histogram is divided into. Cannot be used with BinNumber.

#### binNumber

<description>**optional** _number_</description>

Set the number of histogram boxes. BinNumber affects the width of each column after histogram boxes.

#### columnStyle

<description>**optional** _StyleAttr | Function_</description>

Column style configuration.

`markdown:docs/common/shape-style.en.md`

`markdown:docs/common/color.en.md`

`markdown:docs/common/pattern.en.md`

#### state

<description>**optional** _object_</description>

`markdown:docs/common/state-style.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
