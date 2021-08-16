---
title: 热力图
order: 23
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.zh.md`

#### meta

`markdown:docs/common/meta.zh.md`

#### type

<description>**可选** _polygon | density_ _default:_ `polygon`</description>

密度热力图需要指定为 density。注意：由于密度热力图的特殊性，颜色配置不支持条件映射，因此当 `type='desity'` 时，color、heatmapStyle 回调不可用，state 状态样式也不可用。

#### colorField

<description>**可选** _string_</description>

颜色映射字段名。

#### sizeField

<description>**可选** _string_</description>

点大小映射对应的数据字段名。

#### reflect

<description>**可选** _x | y_</description>

坐标轴映射。

### 图形样式

`markdown:docs/common/color.zh.md`

`markdown:docs/common/pattern.zh.md`

#### shape

<description>**可选** _rect | square | circle_</description>

热力格子中的形状，密度热力图不用指定。

#### coordinate

<description>**可选**</description>

坐标系配置属性。

| 参数名   | 类型                  | 描述                         |
| ------- | --------------------- | ----------------------------|
| type    | string                | 坐标系类型                   |
| cfg     | _CoordinateCfg_       | 坐标系配置项，目前常用于极坐标 |

_**CoordinateOption.type**_ 坐标系类型：

- cartesian / rect：笛卡尔坐标系
- polar：极坐标系
- helix：螺旋坐标系，基于阿基米德螺旋线
- theta：一种特殊的极坐标系，半径长度固定，仅仅将数据映射到角度，常用于饼图的绘制

_**CoordinateCfg**_ 坐标系配置项，目前常用于极坐标：

| 参数名       | 类型     | 描述                                    |
| ----------- | -------- | ----------------------------------------|
| startAngle  | _number_ | 用于极坐标，配置起始弧度                  |
| endAngle    | _number_ | 用于极坐标，配置结束弧度                  |
| radius      | _number_ | 用于极坐标，配置极坐标半径，0-1 范围的数值 |
| innerRadius | _number_ | 用于极坐标，极坐标内半径，0 -1 范围的数值  |

#### sizeRatio

<description>**可选** _number_</description>

热力格子中图形的尺寸比例，可选，只有当 shape 和 sizeField 至少指定一项后才生效。

#### heatmapStyle

<description>**可选** _object_</description>

热力图样式。 heatmapStyle 中的`fill`会覆盖 `color` heatmapStyle 可以直接指定，也可以通过 callback 的方式，根据数据指定单独的样式。

默认配置：

| 细分配置      | 类型   | 功能描述   |
| ------------- | ------ | ---------- |
| fill          | string | 填充颜色   |
| stroke        | string | 描边颜色   |
| lineWidth     | number | 线宽       |
| lineDash      | number | 虚线显示   |
| opacity       | number | 透明度     |
| fillOpacity   | number | 填充透明度 |
| strokeOpacity | number | 描边透明度 |

```ts
// 直接指定
{
  heatmapStyle: {
    fill: 'red',
    stroke: 'yellow',
    opacity: 0.8
  },
}
// Function
{
  heatmapStyle: (item) => ({fill: 'red'})
}
```

#### state

<description>**可选** _object_</description>

`markdown:docs/common/state-style.en.md`

### 图表组件

`markdown:docs/common/component.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`



### 图表主题

`markdown:docs/common/theme.zh.md`
