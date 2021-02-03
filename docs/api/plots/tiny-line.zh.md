---
title: 迷你折线图
order: 14
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _number[]_</description>

设置图表数据源。mini 折线图的数据直接采用一个数字数组，代表一个指标的变化趋势，无需设置 x 轴字段。

#### meta

`markdown:docs/common/meta.zh.md`

### 图形样式

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

是否平滑曲线。

#### connectNulls

<description>**optional** _boolean_ _default:_ `true`</description>

对于折线图中缺失的值，是否连接空数据为一条线，或者折线断开。

#### lineStyle

<description>**optional** _StyleAttr | Function_</description>

折线图形样式。可以直接传入 `ShapeStyle` 结构，也可以使用回调函数的方式，针对不同的数据，来返回不同的样式。对于 ShapeStyle 的数据结构，可以参考：

`markdown:docs/common/shape-style.zh.md`

#### point

<description>**optional**</description>

折线数据点图形样式。

`markdown:docs/common/point-style.zh.md`

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component-tiny.zh.md`
