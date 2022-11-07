---
title: Bidirectional Bar
order: 26
---

### Plot Container

<embed src="@/docs/common/chart-options.en.md"></embed>

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:

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

<!-- Meta options START -->

<embed src="@/docs/common/meta.en.md"></embed>

Example:

```ts
{
  meta: {
    '2016年耕地总面积': { alias: '耕地总面积' }
  }
}
```

<!-- Meta options END -->

### Geometry Style

#### layout

<description>**optional** _'horizontal' | 'vertical'_ _default:_ 'horizontal'</description>

Layout modes, whose optional values are:

- `horizontal`: horizontally layout all bars.
- `vertical`: vertically layout all bars (as columns).

#### barStyle

<description>**optional** _StyleAttr | Function_</description>

Configurations of the style of bars.

<embed src="@/docs/common/shape-style.en.md"></embed>

### Plot Components

<embed src="@/docs/common/component.en.md"></embed>

### Plot Events

<embed src="@/docs/common/events.en.md"></embed>

### Plot Methods

<embed src="@/docs/common/chart-methods.en.md"></embed>

### Plot Theme

<embed src="@/docs/common/theme.en.md"></embed>
