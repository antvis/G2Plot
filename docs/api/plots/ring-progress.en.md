---
title: Ring progress plot
order: 19
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### percent

<description>**required** _number_</description>

设置百分比数值 [0-1]，表示进度条图的进度情况。

### Plot Style

#### radius

<description>**optional** _number_</description>

外环的半径 [0-1]，相对于画布宽高的最小值来计算的。

#### innerRadius

<description>**optional** _number_</description>

内环的半径 [0-1]，相对于内半径 radius 来计算的。

#### progressStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置。

`markdown:docs/common/shape-style.en.md`

`markdown:docs/common/color.en.md`

### Plot Component

`markdown:docs/common/component-progress.en.md`

#### statistic

<description>**optional** _object_</description>

Metric central text component, contains 'title' and 'content'.

`markdown:docs/common/statistic.en.md`
