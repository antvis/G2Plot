---
title: Box
order: 21
---

### Chart Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### groupField

<description>**optional** _string_</description>

分组拆分字段，默认是分组情况，颜色作为视觉通道。

#### outliersField

<description>**optional** _string_</description>

异常值字段。

`markdown:docs/common/meta.en.md`

### Geometry Style

#### boxStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置。

`markdown:docs/common/shape-style.en.md`

#### outliersStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置，配置同 boxStyle。

`markdown:docs/common/color.en.md`

### Chart Components

`markdown:docs/common/component.en.md`
