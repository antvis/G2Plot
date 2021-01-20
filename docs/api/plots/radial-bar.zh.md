---
title: 玉珏图
order: 25
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data 📌

<description>**必选** _array|object_</description>

功能描述： 设置图表数据源

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 30 }]`。

`markdown:docs/common/xy-field.zh.md`

`markdown:docs/common/meta.zh.md`

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

<playground path="more-plots/radial-bar/demo/line.ts" rid="startAngle-endAngle"></playground>

#### maxAngle

<description>**可选** _number_ _default:_ `240`</description>

功能描述： 最大旋转角度，由 data 中最大的数值决定，最大值是 360 度。

#### type

<description>**可选** _string_</description>

功能描述: 图表类型， 'line' 为线形图。

`markdown:docs/common/bar-style.zh.md`

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`

### 图表交互

`markdown:docs/common/interactions.zh.md`
