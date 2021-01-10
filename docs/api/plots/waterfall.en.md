---
title: Waterfall
order: 24
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

`markdown:docs/common/meta.en.md`

### Higher Configuration

#### labelMode

<description>**optional** _string_ _default:_ `difference`</description>

label 数据模式，可选值: `absolute`(数据的绝对值)，`difference`(数据的相对差值)。


#### total

<description>**optional** _false|object_</description>

是否展示总计值（自动进行统计，新增一根总计值的柱子）。

默认配置： 

| 参数名 | 类型 | 是否必选 | 默认值 | 描述 |
| :---| --- |  --- |  --- |  --- | 
| label| _string_ | false | 总计 | 总计值柱子的标签 |
| style | _object_ | false | `{ fill: 'rgba(0, 0, 0, 0.25)' }` | 总计值柱子的样式配置 |

#### leaderLine

<description>**optional** _false | object_</description>

是否展示牵引线。

默认配置： 

| 参数名 | 类型 | 是否必选 | 默认值 | 描述 |
| :---| --- |  --- |  --- |  --- | 
| style | _object_ | false | `{ lineWidth: 1, stroke: '#8c8c8c', lineDash: [4, 2]` | 牵引线的样式配置 |

### Geometry Style

#### risingFill

<description>**optional** _number_ _default:_ `#f4664a`</description>

上涨色配置。

#### fallingFill

<description>**optional** _number_ _default:_ `#30bf78`</description>

下降色配置。

#### columnWidthRatio

<description>**optional** _number_</description>

柱状图宽度占比 [0-1]。

#### waterfallStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置。

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
