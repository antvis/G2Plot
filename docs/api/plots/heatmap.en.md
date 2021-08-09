---
title: Heatmap
order: 23
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### meta

`markdown:docs/common/meta.en.md`

#### type

<description>**optional** _polygon | density_ _default:_ `polygon`</description>

The Density Heatmap needs to be specified as Density. Attention：Because of the particularity of Density Heatmap，Conditional color mapping is not supported. So when config `type='desity'`, `color callback`, `heatmapStyle` and style of `state` are not available.

#### colorField

<description>**optional** _string_</description>

Color mapping field name.

#### sizeField

<description>**optional** _string_</description>

The name of the data field corresponding to the point size map.

#### reflect

<description>**optional** _x | y_</description>

Axis mapping.

### Geometry Style

`markdown:docs/common/color.en.md`

#### shape

<description>**optional** _rect | square | circle_</description>

Shapes in thermal grids, density heat maps are not specified.

#### coordinate

<description>**optional** </description>

Coordinate system configuration property.

| Properties  | Type              | Description  |
| ------- | --------------------- | ------------------------------ |
| type    | string                | Type of coordinate system |
| cfg     | _CoordinateCfg_       | Coordinate system configuration term, currently commonly used in polar coordinates |

_**CoordinateOption.type**_ Type of coordinate system：

- cartesian / rect：Cartesian coordinate system
- polar：Polar coordinates
- helix：Spiral coordinate system, based on Archimedes helix
- theta：A special polar coordinate system with fixed radius lengths that maps data only to angles, often used in pie charts

_**CoordinateCfg**_ Coordinate system configuration term, currently commonly used in polar coordinates：

| Properties  | Type     | Description          |
| ----------- | -------- | ------------------------------------------ |
| startAngle  | _number_ | For polar coordinates, configure the starting radian   |
| endAngle    | _number_ | For polar coordinates, configure end radians       |
| radius      | _number_ | For polar coordinates, configure polar radius, values in the 0-1 range |
| innerRadius | _number_ | For polar coordinates, radius within polar coordinates, values in the range 0-1  |

#### sizeRatio

<description>**optional** _number_</description>

The scale of the shapes in the thermal lattice, optional, takes effect only if the shape and sizeField specify at least one of these.

#### heatmapStyle

<description>**optional** _object_</description>

Heat map style. The 'fill' in heatMapStyle overwrites the 'color' heatMapStyle and can be specified either directly or via a callback to specify individual styles based on the data.

Default configuration:

| Properties    | Type   | Description           |
| ------------- | ------ | --------------------- |
| fill          | string | Fill color            |
| stroke        | string | Stroke color          |
| lineWidth     | number | Line width            |
| lineDash      | number | The dotted lines show |
| opacity       | number | Transparency          |
| fillOpacity   | number | Fill transparency     |
| strokeOpacity | number | Stroke transparency   |

```ts
// Specified directly
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
