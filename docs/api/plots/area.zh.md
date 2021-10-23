---
title: 面积图
order: 1
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

分组字段。比如：我们需要分析不同`省份`的交易额趋势，那么`省份字段`就是分组字段。

#### meta

`markdown:docs/common/meta.zh.md`

### 图形样式

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

曲线是否平滑。

#### isStack

<description>**optional** _boolean_ _default:_ `true`</description>

是否堆积面积图。

#### isPercent

<description>**optional** _boolean_ _default:_ `true`</description>

是否百分比面积图，百分比时默认开启 isStack。

#### startOnZero

<description>**optional** _boolean_ _default:_ `true`</description>

积图是否从 0 基准线开始填充，使用时 isStack 需为 false。

| true                                                                                                                | false                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| <img alt='startOnZero-true' width='300' src='https://gw.alipayobjects.com/zos/rmsportal/ZQqwUCczalrKqGgagOVp.png'/> | <img alt='startOnZero-false' width='300' src='https://gw.alipayobjects.com/zos/rmsportal/yPswkaXvUpCYOdhocGwB.png'/> |

#### areaStyle

<description>**optional** _StyleAttr | Function_</description>

面积图形样式。

`markdown:docs/common/shape-style.zh.md`

#### line

<description>**optional** _object_</description>

面积中折线的样式。

| 细分配置项名称 | 类型                                     | 功能描述 |
| -------------- | ---------------------------------------- | -------- |
| color          | _string \| string[] \| Function_         | 颜色映射 |
| style          | _ShapeStyle \| Function_                 | 样式映射 |
| size           | _number \| [number, number] \| Function_ | 折线宽度 |

#### point

<description>**optional** _pointStyle_</description>

面积图数据点图形样式。

`markdown:docs/common/point-style.zh.md`

`markdown:docs/common/color.zh.md`

#### pattern ✨

<description>**optional** _object | Function_</description>

`markdown:docs/common/pattern.zh.md`

#### state

<description>**可选** _object_</description>

`markdown:docs/common/state-style.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表交互

`markdown:docs/common/interactions.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`

### 自定义 ✨

#### customInfo

<description>**可选** _any_</description>

通过 `customInfo` 属性，可以向 shape 中传入自定义的数据。目前可能仅仅可能用于在 `registerShape` 的时候，像自定义 shape 中传入自定义的数据，方便实现自定义 shape 的配置能力。

