---
title: Line
order: 0
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### seriesField

<description>**optional** _string_</description>

分组字段。

`markdown:docs/common/meta.en.md`

### Geometry Style

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

`markdown:docs/common/shape-style.en.md`

#### point

<description>**optional** _pointStyle_</description>

折线数据点图形样式。

`markdown:docs/common/point-style.en.md`

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

#### slider

`markdown:docs/common/slider.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
