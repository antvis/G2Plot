---
title: Box
order: 21
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### groupField

<description>**optional** _string_</description>

Grouping field. It is used for grouping by default, and color is used as visual channel.

#### outliersField

<description>**optional** _string_</description>

Outlier field.

#### meta

`markdown:docs/common/meta.en.md`

### Graphic Style

#### boxStyle

<description>**optional** _StyleAttr | Function_</description>

Box graphic style.

`markdown:docs/common/shape-style.en.md`

#### outliersStyle

<description>**optional** _StyleAttr | Function_</description>

Outliers graphic style, the same configuration as boxStyle.

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
