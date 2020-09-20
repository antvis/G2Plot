---
title: 基础柱状图
order: 0
---

柱状图用于描述分类数据之间的对比，如果我们把时间周期，如周、月、年，也理解为一种分类数据 (time category)，那么柱状图也可以用于描述时间周期之间的数值比较。

## 配置属性

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.zh.md`

#### seriesField

**可选**, _string_

功能描述： 拆分字段，在分组柱状图下同 groupField、colorField，在堆积柱状图下同 stackField、colorField 。

默认配置： 无

#### isGroup

**可选**, _boolean_

功能描述： 是否分组柱形图 。

默认配置： 无

#### isStack

**可选**, _boolean_

功能描述： 是否堆积柱状图 。

默认配置： 无

`markdown:docs/common/meta.zh.md`

### 图形样式

#### columnWidthRatio

**可选**, _number_

功能描述： 柱状图宽度占比 [0-1] 。

默认配置： 无

#### marginRatio

**可选**, _number_

功能描述： 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用 。

默认配置： 无

#### columnStyle

**可选**, _StyleAttr | Function_

功能描述： 柱子样式配置 。

默认配置： 无

`markdown:docs/common/shape-style.zh.md`

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`
