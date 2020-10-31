---
title: Tiny Area
order: 15
---

### Chart Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _number[]_</description>

设置图表数据源。

`markdown:docs/common/meta.en.md`

### Geometry Style

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

是否平滑。

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

### Chart Components

`markdown:docs/common/component-tiny.en.md`