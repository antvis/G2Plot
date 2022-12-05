---
title: 玉珏图
order: 25
---

### 图表容器

<embed src="@/docs/common/chart-options.zh.md"></embed>

### 数据映射

#### data 📌

<description>**必选** _array|object_</description>

功能描述： 设置图表数据源

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 30 }]`。

<embed src="@/docs/common/xy-field.zh.md"></embed>

#### meta

<embed src="@/docs/common/meta.zh.md"></embed>

### 图形样式
#### radius

<description>**可选** _number_ _default:_ `1`</description>

功能描述: 半径， 0 ~ 1。

#### innerRadius

<description>**可选** _number_</description>

功能描述： 内径，0 ~ 1。

#### startAngle 

<description>**optional** _number_ _default:_ `-Math.PI / 2`</description>

配置坐标系的起始角度。

#### endAngle 

<description>**optional** _number_ _default:_ `Math.PI / 2 * 3`</description>

配置坐标系的结束角度。

<Playground path="more-plots/radial-bar/demo/line.ts" rid="startAngle-endAngle"></playground>

#### maxAngle

<description>**可选** _number_ _default:_ `240`</description>

功能描述： 最大旋转角度，由 data 中最大的数值决定，最大值是 360 度。

#### type

<description>**可选** _string_</description>

功能描述: 图表类型， 'line' 为线形图。

<embed src="@/docs/common/bar-style.zh.md"></embed>

<embed src="@/docs/common/color.zh.md"></embed>

#### pattern ✨

<description>**optional** _object | Function_</description>

<embed src="@/docs/common/pattern.zh.md"></embed>

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
