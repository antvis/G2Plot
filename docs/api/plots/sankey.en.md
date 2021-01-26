---
title: Sankey
order: 27
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the chart data source. The data source is a collection of objects, for example：`[{ source: '支付宝首页', target: '花呗', value: 20 }, ...]`。

#### sourceField

<description>**required** _string_</description>

Sets the source node data field of the Sankey diagram. For example, for the above data, it is: 'source'.

#### targetField

<description>**required** _string_</description>

Sets the target node data field of Sankey diagram. For the above data, for example, it is: 'target'.

#### weightField

<description>**required** _string_</description>

Set the weight field information of the relationship between nodes. The larger the data, the larger the edge. For example, for the above data, it is: 'value'.

### Geometry Style

#### nodeStyle

<description>**optional** _StyleAttr | Function_</description>

Sankey diagram node style configuration.

#### edgeStyle

<description>**optional** _StyleAttr | Function_</description>

Sankey diagram variable style configuration.

`markdown:docs/common/color.en.md`

#### nodeWidthRatio

<description>**optional** _number_</description>

Sankey diagram node width configuration, 0 ~ 1, refer to the width of the canvas, the default is' 0.008 '.

#### nodeWidthPadding

<description>**optional** _number_</description>

The vertical spacing between nodes in Sankey diagram, 0 ~ 1, referring to the height of the canvas, default is' 0.01 '.

#### nodeAlign

<description>**optional** _string_</description>

The sankey diagram node layout direction, the default is `the justify`, can choose the 'left' | 'right' | 'center' | 'the justify' four ways.

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
