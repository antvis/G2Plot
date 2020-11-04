---
title: Area
order: 1
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

#### isStack

<description>**optional** _boolean_ _default:_ `true`</description>

是否堆积面积图。

#### areaStyle

<description>**optional** _StyleAttr | Function_</description>

面积图形样式。

`markdown:docs/common/shape-style.en.md`

#### line

<description>**optional** _lineStyle_</description>

面积中折线的样式。

| 细分配置项名称 | 类型                                     | 功能描述 |
| -------------- | ---------------------------------------- | -------- |
| color          | _string \| string[] \| Function_         | 颜色映射 |
| style          | _ShapeStyle \| Function_                 | 样式映射 |
| size           | _number \| [number, number] \| Function_ | 折线宽度 |

#### point

<description>**optional** _pointStyle_</description>

面积图数据点图形样式。

`markdown:docs/common/point-style.en.md`

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
