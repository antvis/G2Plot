---
title: 柱状图
order: 2
---

柱状图用于描述分类数据之间的对比，如果我们把时间周期，如周、月、年，也理解为一种分类数据 (time category)，那么柱状图也可以用于描述时间周期之间的数值比较。

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.zh.md`

#### seriesField

<description>**optional** _string_</description>

拆分字段，在分组柱状图下同 groupField、colorField，在堆积柱状图下同 stackField、colorField。

#### groupField

<description>**optional** _string_</description>

拆分字段，用于堆叠分组柱状图，拆分优先级高于 seriesField，isGroup: true 时会根据 groupField 进行分组。

#### isGroup

<description>**optional** _boolean_</description>

是否分组柱状图。

#### isStack

<description>**optional** _boolean_</description>

是否堆积柱状图。

#### isRange

<description>**optional** _boolean_</description>

是否区间柱状图。

#### isPercent

<description>**optional** _boolean_</description>

是否堆积百分比柱状图，isPercent 为 true 时，isStack 也需要为 true。

`markdown:docs/common/meta.zh.md`

### 图形样式

#### columnWidthRatio

<description>**optional** _number_</description>

柱状图宽度占比 [0-1]。

#### marginRatio

<description>**optional** _number_</description>

分组中柱子之间的间距 [0-1]，仅对分组柱状图适用。

#### columnStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置。

`markdown:docs/common/shape-style.zh.md`

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`

#### 滚动条

`markdown:docs/common/slider.zh.md`

#### 转化率

`markdown:docs/common/conversion-tag.zh.md`

#### 联通区域对比

`markdown:docs/common/connected-area.zh.md`

### 事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`



`markdown:docs/common/theme.zh.md`
