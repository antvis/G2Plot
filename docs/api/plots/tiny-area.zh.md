---
title: 迷你面积图
order: 15
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _number[]_</description>

设置图表数据源。mini 面积图的数据直接采用一个数字数组，代表一个指标的变化趋势，无需设置 x 轴字段。

#### meta

`markdown:docs/common/meta.zh.md`

### 图形样式

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

是否平滑。

#### areaStyle

<description>**optional** _StyleAttr | Function_</description>

面积图形样式。

`markdown:docs/common/shape-style.zh.md`

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

`markdown:docs/common/point-style.zh.md`

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component-tiny.zh.md`
