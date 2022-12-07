---
title: 条形图
order: 3
---

### 图表容器

<embed src="@/docs/common/chart-options.zh.md"></embed>

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

<embed src="@/docs/common/xy-field.zh.md"></embed>

#### seriesField

<description>**optional** _string_</description>

拆分字段，在分组条形图下同 groupField、colorField，在堆积条形图下同 stackField、colorField。

#### groupField

<description>**optional** _string_</description>

拆分字段，用于堆叠分组条形图，拆分优先级高于 seriesField，isGroup: true 时会根据 groupField 进行分组。

#### isGroup

<description>**optional** _boolean_</description>

是否分组柱形图。

#### isStack

<description>**optional** _boolean_</description>

是否堆积条形图。

#### isRange

<description>**optional** _boolean_</description>

是否区间条形图。

#### isPercent

<description>**optional** _boolean_</description>

是否百分比条形图，isPercent 为 true 时，isStack 也需要为 true。

#### meta

<embed src="@/docs/common/meta.zh.md"></embed>

### 图形样式

<embed src="@/docs/common/coordinate.zh.md"></embed>

<embed src="@/docs/common/color.zh.md"></embed>

#### pattern ✨

<description>**optional** _object | Function_</description>

<embed src="@/docs/common/pattern.zh.md"></embed>

<embed src="@/docs/common/bar-style.en.md"></embed>

#### barWidthRatio

<description>**optional** _number_</description>

条形图宽度占比 [0-1]。

#### marginRatio

<description>**optional** _number_</description>

分组中柱子之间的间距 [0-1]，仅对分组条形图适用。

#### shape

<description>**可选** _string_</description>

内置 shape 类型有：`hollow-rect`, `tick`; 此外，还可以搭配 [`registerShape`](https://g2.antv.vision/zh/docs/api/advanced/register-shape) 进行自定义使用. 

[Demo](/zh/examples/bar/basic#shape)

#### state

<description>**可选** _object_</description>

<embed src="@/docs/common/state-style.zh.md"></embed>

### 图表组件

<embed src="@/docs/common/common-component.zh.md"></embed>

#### 缩略轴 slider

<embed src="@/docs/common/slider.zh.md"></embed>

#### 滚动条 scrollbar

<embed src="@/docs/common/scrollbar.zh.md"></embed>

#### 转化标签 conversionTag

适用于基础柱形图和基础条形图，转化率组件可以让用户关注到数据的变化比例。

<embed src="@/docs/common/conversion-tag.zh.md"></embed>

#### 联通对比区域

<embed src="@/docs/common/connected-area.zh.md"></embed>

### 图表事件

<embed src="@/docs/common/events.zh.md"></embed>

### 图表方法

<embed src="@/docs/common/chart-methods.zh.md"></embed>

### 图表主题

<embed src="@/docs/common/theme.zh.md"></embed>

### 图表交互

条形图内置了一些交互，列表如下:

| 交互       | 描述                                     | 配置                           |
| ----------- | ---------------------------------------- | ------------------------------ |
| brush | 用于刷选交互，配置该交互后，可进行刷选。 | `brush: { enabled: true }` |

<embed src="@/docs/common/brush.zh.md"></embed>

<embed src="@/docs/common/interactions.zh.md"></embed>
