---
title: 折线图
order: 0
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.zh.md`

#### seriesField

<description>**optional** _string_</description>

分组字段。

`markdown:docs/common/meta.zh.md`

### 图形样式

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

是否平滑。

#### stepType

<description>**optional** _hv | vh | hvh | vhv_</description>

阶梯折线图类型，配置后 smooth 无效，一般用在阶梯图中。

#### connectNulls

<description>**optional** _boolean_ _default:_ `true`</description>

是否连接空数据。

#### isStack

<description>**optional** _boolean_ _default:_ `false`</description>

是否堆积折线。

#### lineStyle

<description>**optional** _StyleAttr | Function_</description>

折线图形样式。

`markdown:docs/common/shape-style.zh.md`

#### point

<description>**optional** _pointStyle_</description>

折线数据点图形样式。

`markdown:docs/common/point-style.zh.md`

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`

#### 滚动条

`markdown:docs/common/slider.zh.md`

### 事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`
