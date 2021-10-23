---
title: Area
order: 1
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### seriesField

<description>**optional** _string_</description>

Grouping field. For example, when we need to analyze the transaction volume trend of different provinces, the `province` field is the grouping field.

#### meta

`markdown:docs/common/meta.en.md`

### Graphic Style

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

Whether the curve is smooth.

#### isStack

<description>**optional** _boolean_ _default:_ `true`</description>

Whether the plot is Stacked Area.

#### isPercent

<description>**optional** _boolean_ _default:_ `true`</description>

Whether the plot is Percent Area. When the plot is Percent Area, isStack is `true` by default.

#### startOnZero

<description>**optional** _boolean_ _default:_ `true`</description>

Whether the plot is filled from 0 datum，isStack must be false when used.

| true                                                                                                                | false                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| <img alt='startOnZero-true' width='300' src='https://gw.alipayobjects.com/zos/rmsportal/ZQqwUCczalrKqGgagOVp.png'/> | <img alt='startOnZero-false' width='300' src='https://gw.alipayobjects.com/zos/rmsportal/yPswkaXvUpCYOdhocGwB.png'/> |

#### areaStyle

<description>**optional** _StyleAttr | Function_</description>

Area graphic style.

`markdown:docs/common/shape-style.en.md`

#### line

<description>**optional** _object_</description>

Line graphic style in the Area.

| Properties | Type                                     | Description        |
| ---------- | ---------------------------------------- | ------------------ |
| color      | _string \| string[] \| Function_         | Line color         |
| style      | _ShapeStyle \| Function_                 | Line graphic style |
| size       | _number \| [number, number] \| Function_ | Line width         |

#### point

<description>**optional** _pointStyle_</description>

Point graphic style in the Area.

`markdown:docs/common/point-style.en.md`

`markdown:docs/common/color.en.md`

#### pattern ✨

<description>**optional** _object | Function_</description>

`markdown:docs/common/pattern.en.md`

#### state

<description>**optional** _object_</description>

`markdown:docs/common/state-style.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Plot Interactions

`markdown:docs/common/interactions.en.md`

### Customize ✨

#### customInfo

<description>**optional** _any_</description>

通过 `customInfo` 属性，可以向 shape 中传入自定义的数据。目前可能仅仅可能用于在 `registerShape` 的时候，像自定义 shape 中传入自定义的数据，方便实现自定义 shape 的配置能力。

