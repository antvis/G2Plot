---
title: 基础折线图
order: 0
---

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

功能描述： 分组字段 。

默认配置： 无

`markdown:docs/common/meta.zh.md`

### 图形样式

#### smooth

**可选**, _boolean_

功能描述： 是否平滑 。

默认配置： `false`

#### stepType

**可选**, _hv | vh | hvh | vhv_

功能描述： 阶梯折线图类型，配置后 smooth 无效，一般用在阶梯图中。

默认配置： 无

#### connectNulls

**可选**, _boolean_

功能描述： 是否连接空数据 。

默认配置： `true`

#### lineStyle

**可选**, _StyleAttr | Function_

功能描述： 折线图形样式 。

默认配置： 无

`markdown:docs/common/shape-style.zh.md`

#### point

**可选**, _pointStyle_

功能描述： 折线数据点图形样式

默认配置： 无

`markdown:docs/common/point-style.zh.md`

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`
