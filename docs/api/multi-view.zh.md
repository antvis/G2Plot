---
title: 多图层图表
order: 8
---
### 图表容器

`markdown:docs/common/chart-options.zh.md`

#### syncViewPadding ✨

<description>**optional** _boolean_</description>

是否同步子 view 的 padding 配置。传入 boolean 值，含义是：是否需要将子 View 的 padding 同步，如果设置同步，那么可以保证子 View 在 auto padding 的情况下，所有子 View 的图形能够完全重合，避免显示上的错位。

### View 配置

#### views

<description>**required** _IView[]_</description>

每一个图层的配置，每个图层都包含自己的：数据、图形、图形映射。

下面介绍子 view 具体的配置项。

#### IView.region

<description>**optional** _object_</description>

view 的布局范围，默认是占满全部。

Example:

```ts
// 设置 view 的布局位置在上半部分
region: {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0.5 },
}
```

#### IView.data

`markdown:docs/common/data.zh.md`

#### IView.meta

`markdown:docs/common/meta.zh.md`

#### IView.coordinate

坐标系的配置，每一个 view 具有相同的坐标系。

| 参数名  | 类型            | 可选值 ｜                                                |
| ------- | --------------- | -------------------------------------------------------- |
| type    | _string_        | `'polar' \| 'theta' \| 'rect' \| 'cartesian' \| 'helix'` |
| cfg     | _CoordinateCfg_ |   CoordinateCfg 坐标系配置项，目前常用于极坐标    |
| actions | _array object_  | 坐标系的变换配置，具体可以见 G2 坐标系[文档](https://g2.antv.vision/zh/docs/api/general/coordinate)

```ts
type CoordinateCfg = {
  // 用于极坐标，配置起始弧度。
  startAngle?: number;
  // 用于极坐标，配置结束弧度。
  endAngle?: number;
  // 用于极坐标，配置极坐标半径，0 - 1 范围的数值。
  radius?: number;
  // 用于极坐标，极坐标内半径，0 -1 范围的数值。
  innerRadius?: number;
};
```

#### IView.geometries

<description>**optional** _array object_</description>

view 上的图形 geometry 及映射配置，具体见[图形映射](#图形映射)




#### IView.axes

<description>**optional** _object | false_</description>

view 上的图形坐标轴配置，key 值对应 `xField` 和 `yField`， value 具体配置见：[Axis API](https://g2plot.antv.vision/zh/docs/api/components/axis)

```ts
{
  [field]: AxisOptions | false,
}
```

#### IView.annotations

<description>**optional** _object[]</description>

view 上的几何图形的图形标注配置。具体见：[Annotations API](https://g2plot.antv.vision/zh/docs/api/components/annotations)

#### IView.interactions

<description>**optional** _object[]</description>

view 上的交互配置。具体见：[Interactions API]https://g2plot.antv.vision/zh/docs/api/interactions)

### 图形映射

#### IGeometry.type

<description>**required** _string_</description>

几何图形 geometry 类型。可选值: `'line' | 'interval' | 'point' | 'area' | 'polygon'`。

#### IGeometry.mapping ✨

<description>**required** _object_</description>

图形映射规则

#### IGeometry.xField

<description>**optional** _string_</description>

对应 x 轴字段。数据映射到几何图形 geometry 上时，最重要的通道是 `position` 通道。笛卡尔坐标系上的几何图形，通常是一维或二维的，对应位置视觉通道需要 `x`, `y` 两个（或一个）字段的值。

#### IGeometry.yField

<description>**optional** _string_</description>

对应 y 轴字段。数据映射到几何图形 geometry 上时，最重要的通道是 `position` 通道。笛卡尔坐标系上的几何图形，通常是一维或二维的，对应位置视觉通道需要 `x`, `y` 两个（或一个）字段的值。

#### IGeometry.colorField

<description>**optional** _string_</description>

对应颜色(color)映射字段。通过颜色视觉通道对数据进行分组。

#### IGeometry.shapeField

<description>**optional** _string_</description>

对应形状(shape)映射字段。通过不同的形状对数据进行分组。

#### IGeometry.sizeField

<description>**optional** _string_</description>

对应大小(size)映射字段。通过 size 字段，可以将数据按照 `sizeField` 对应的数据进行不同的大小映射。

#### IGeometry.styleField

<description>**optional** _string_</description>

style 映射字段。

#### IGeometry.tooltipFields

<description>**optional** _string[] | false_</description>

tooltip 映射字段。

#### IGeometry.label

<description>**optional** _object_</description>

label 映射通道，具体见 [Label API](httpa://g2plot.antv.vision/zh/docs/api/components/label)

#### IGeometry.state

<description>**optional** _object_</description>

不同状态的样式

#### IGeometry.adjust

数据调整配置项，TODO 补充说明
