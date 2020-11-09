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

`markdown:docs/common/meta.zh.md`

### 图形样式

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

曲线是否平滑。

#### isStack

<description>**optional** _boolean_ _default:_ `true`</description>

是否堆积面积图。

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

`markdown:docs/common/component.zh.md`
