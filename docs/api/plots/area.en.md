---
title: Area
order: 1
---

### Plot Container

<embed src="@/docs/common/chart-options.en.md"></embed>

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

<embed src="@/docs/common/xy-field.en.md"></embed>

#### seriesField

<description>**optional** _string_</description>

Grouping field. For example, when we need to analyze the transaction volume trend of different provinces, the `province` field is the grouping field.

#### meta

<embed src="@/docs/common/meta.en.md"></embed>

### Graphic Style

<embed src="@/docs/common/coordinate.en.md"></embed>

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

<embed src="@/docs/common/shape-style.en.md"></embed>

#### line

<description>**optional** _object_</description>

Line graphic style in the Area.

| Properties | Type                                     | Description                                |
| ---------- | ---------------------------------------- | ------------------------------------------ |
| color      | _string \| string[] \| Function_         | Line color                                 |
| style      | _ShapeStyle \| Function_                 | Line graphic style                         |
| size       | _number \| [number, number] \| Function_ | Line width                                 |
| state      | _object_                                 | State style of line，details to see: [#state] |

#### point

<description>**optional** _pointStyle_</description>

Point graphic style in the Area.

<embed src="@/docs/common/point-style.en.md"></embed>

<embed src="@/docs/common/color.en.md"></embed>

#### pattern ✨

<description>**optional** _object | Function_</description>

<embed src="@/docs/common/pattern.en.md"></embed>

#### state

<description>**optional** _object_</description>

<embed src="@/docs/common/state-style.en.md"></embed>

### Plot Components

<embed src="@/docs/common/component.en.md"></embed>

### Plot Event

<embed src="@/docs/common/events.en.md"></embed>

### Plot Method

<embed src="@/docs/common/chart-methods.en.md"></embed>

### Plot Theme

<embed src="@/docs/common/theme.en.md"></embed>

### Plot Interactions

<embed src="@/docs/common/interactions.en.md"></embed>

### Customize ✨

#### customInfo

<description>**optional** _any_</description>

通过 `customInfo` 属性，可以向 shape 中传入自定义的数据。目前可能仅仅可能用于在 `registerShape` 的时候，像自定义 shape 中传入自定义的数据，方便实现自定义 shape 的配置能力。
