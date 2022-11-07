---
title: Box
order: 21
---

### Plot Container

<embed src="@/docs/common/chart-options.en.md"></embed>

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

<embed src="@/docs/common/xy-field.en.md"></embed>

#### groupField

<description>**optional** _string_</description>

Grouping field. It is used for grouping by default, and color is used as visual channel.

#### outliersField

<description>**optional** _string_</description>

Outlier field.

#### meta

<embed src="@/docs/common/meta.en.md"></embed>

### Graphic Style

#### boxStyle

<description>**optional** _StyleAttr | Function_</description>

Box graphic style.

<embed src="@/docs/common/shape-style.en.md"></embed>

#### outliersStyle

<description>**optional** _StyleAttr | Function_</description>

Outliers graphic style, the same configuration as boxStyle.

<embed src="@/docs/common/color.en.md"></embed>

### Plot Components

<embed src="@/docs/common/component.en.md"></embed>

### Plot Event

<embed src="@/docs/common/events.en.md"></embed>

### Plot Method

<embed src="@/docs/common/chart-methods.en.md"></embed>

### Plot Theme

<embed src="@/docs/common/theme.en.md"></embed>
