---
title: Funnel
order: 9
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### compareField

<description>**optional** _string_</description>

对比字段。

#### isTransposed

<description>**optional** _boolean_ _default:_ `false`</description>

是否转置。

`markdown:docs/common/meta.en.md`

### Geometry Style

#### dynamicHeight

<description>**optional** _boolean_ _default:_ `false`</description>

是否是动态高度。

#### conversionTag

<description>**optional** _false | object_</description>

配置转化率组件。

默认配置：`{offsetX: 10, offsetY: 0, formatter: (datum) => '转化率' + datum.$$percentage$$ * 100 + '%',}`。

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`
