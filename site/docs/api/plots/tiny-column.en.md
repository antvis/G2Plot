---
title: Tiny Column
order: 16
---

### Plot Container

<embed src="@/docs/common/chart-options.en.md"></embed>

### Data Mapping

#### data

<description>**required** _number[]_</description>

Configure the chart data source. The MINI bar chart uses an array of numbers directly to represent the trend of a metric, without the need to set X-axis fields.

#### meta

<embed src="@/docs/common/meta.en.md"></embed>

### Plot Style

#### columnWidthRatio

<description>**optional** _number_ _default:_ `0.5`</description>

Width ratio of histogram [0-1].

#### columnStyle

<description>**optional** _StyleAttr | Function_</description>

Bar chart graphic styles.

<embed src="@/docs/common/shape-style.en.md"></embed>

<embed src="@/docs/common/color.en.md"></embed>

#### pattern ✨

<description>**optional** _object | Function_</description>

<embed src="@/docs/common/pattern.en.md"></embed>

### Plot Component

<embed src="@/docs/common/component-tiny.en.md"></embed>
