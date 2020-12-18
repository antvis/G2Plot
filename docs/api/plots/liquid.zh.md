---
title: 水波图
order: 12
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### percent 

<description>**required** _number_</description>

指标比例数据 [0-1]。

#### radius

<description>**optional** _number_ _default:_ `0.9`</description>

外环的半径 [0-1]，相对于画布宽高的最小值来计算的。

### 图形样式

#### liquidStyle

<description>**optional** _StyleAttr | Function_</description>

水波图的配色样式。

`markdown:docs/common/shape-style.zh.md`

`markdown:docs/common/color.zh.md`

#### outline

<description>**optional** _Outline_</description>

水波图的外框容器配置。主要包含以下内容：

| 属性名        | 类型            | 介绍                                         |
| ------------ | -------------- | -------------------------------------------- |
| border       | number         | 外框容器的 border 宽度，默认为 2 像素             |
| disatance    | number         | 外框容器和内部波形的间距，默认为 0 像素             |

#### wave

<description>**optional** _Wave_</description>

水波图的波形配置。主要包含以下内容：

| 属性名        | 类型            | 介绍                                         |
| ------------ | -------------- | -------------------------------------------- |
| count        | number         | 水波的个数，默认为 3 个                          |
| length       | number         | 水波的波长度，默认为 192 像素                     |

### 图表组件

#### statistic ✨

<description>**optional** _object_</description>

指标中心文本组件。

`markdown:docs/common/statistic.zh.md`
