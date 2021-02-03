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

The density heat map needs to be specified as Density.

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

### Plot Components

`markdown:docs/common/component.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
