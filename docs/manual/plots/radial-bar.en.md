---
title: 玉珏图
order: 0
---

## 配置属性

### 图表容器

`markdown:docs/common/chart-options.en.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 30 }]`。

`markdown:docs/common/xy-field.en.md`

`markdown:docs/common/meta.en.md`

### 图形样式

#### radius

**可选**, _string_

功能描述: 半径， 0 ~ 1。

默认配置： `1`

#### innerRadius

**可选**, _number_;

功能描述： 内径，0 ~ 1。

#### maxAngle

**可选**, _number_

功能描述： 最大旋转角度，由 data 中最大的数值决定，最大值是 360 度。

默认配置： 240


#### barStyle

**可选**, _StyleAttr | Function_

功能描述： 样式配置 。

默认配置： 无

`markdown:docs/common/shape-style.en.md`

`markdown:docs/common/color.en.md`

### 图表组件

`markdown:docs/common/component.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
