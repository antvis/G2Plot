---
title: BidirectionalBar
order: 26
---

### Plot container

`markdown:docs/common/chart-options.en.md`

### Data mapping

#### data

<description>**required** _array object_</description>

Set up the chart data source. The data source is a collection of objects, such as:

```js
[
  { country: '乌拉圭', '2016年耕地总面积': 13.4, '2016年转基因种植面积': 12.3 },
  { country: '巴拉圭', '2016年耕地总面积': 14.4, '2016年转基因种植面积': 6.3 },
];
```

#### xField

<description>**required** _string_</description>

Set the X-axis field.

#### yField

<description>**required** _[string,string]_</description>

Set the Y-axis mapping field.

#### yAxis

<description>**optional** object</description>

The yAxis is multiple keys and the two fields inside the yField.

#### layout

<description>**optional** _'horizontal' | 'vertical'_ _default:_ 'horizontal'</description>

BidirectionalBar direction.

`markdown:docs/common/meta.en.md`

### Graphic style

#### barStyle

<description>**optional** _StyleAttr | Function_</description>

Column style configuration.

`markdown:docs/common/shape-style.en.md`

### Plot components

`markdown:docs/common/component.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot

`markdown:docs/common/theme.en.md`
