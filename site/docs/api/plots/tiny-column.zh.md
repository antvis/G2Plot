---
title: 迷你柱形图
order: 16
---

### 图表容器

<embed src="@/docs/common/chart-options.zh.md"></embed>

### 数据映射

#### data

<description>**required** _number[]_</description>

设置图表数据源。mini 柱形图的数据直接采用一个数字数组，代表一个指标的变化趋势，无需设置 x 轴字段。

#### meta

<embed src="@/docs/common/meta.zh.md"></embed>

### 图形样式

#### columnWidthRatio

<description>**optional** _number_ _default:_ `0.5`</description>

柱状图宽度占比 [0-1]。

#### columnStyle

<description>**optional** _StyleAttr | Function_</description>

柱形图图形样式。

<embed src="@/docs/common/shape-style.zh.md"></embed>

<embed src="@/docs/common/color.zh.md"></embed>

#### pattern ✨

<description>**optional** _object | Function_</description>

<embed src="@/docs/common/pattern.zh.md"></embed>

### 图表组件

<embed src="@/docs/common/component-tiny.zh.md"></embed>
