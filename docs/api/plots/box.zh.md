---
title: 箱型图
order: 21
---

### 图表容器

<embed src="@/docs/common/chart-options.zh.md"></embed>

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

<embed src="@/docs/common/xy-field.zh.md"></embed>

#### groupField

<description>**optional** _string_</description>

分组拆分字段，默认是分组情况，颜色作为视觉通道。

#### outliersField

<description>**optional** _string_</description>

异常值字段。

#### meta

<embed src="@/docs/common/meta.zh.md"></embed>

### 图形样式

#### boxStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置。

<embed src="@/docs/common/shape-style.zh.md"></embed>

#### outliersStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置，配置同 boxStyle。

<embed src="@/docs/common/color.zh.md"></embed>

### 图表组件

<embed src="@/docs/common/component.zh.md"></embed>

### 图表事件

<embed src="@/docs/common/events.zh.md"></embed>

### 图表方法

<embed src="@/docs/common/chart-methods.zh.md"></embed>

### 图表主题

<embed src="@/docs/common/theme.zh.md"></embed>

### 图表交互

<embed src="@/docs/common/interactions.zh.md"></embed>
