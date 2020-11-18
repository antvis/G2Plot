---
title: Funnel
order: 9
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### compareField

<description>**optional** _string_</description>

Field for comparing.

#### isTransposed

<description>**optional** _boolean_ _default:_ `false`</description>

Whether the plot is transposed.

`markdown:docs/common/meta.en.md`

### Graphic Style

#### dynamicHeight

<description>**optional** _boolean_ _default:_ `false`</description>

Whether the height is dynamic.

#### conversionTag

<description>**optional** _false | object_</description>

Configure the conversion rate component.

Defalut: `{offsetX: 10, offsetY: 0, formatter: (datum) => '转化率' + datum.$$percentage$$ * 100 + '%',}`。

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
