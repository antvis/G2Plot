---
title: Sunburst
order: 17
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _object_</description>

Set up the chart data source.

#### meta

`markdown:docs/common/meta.en.md`

#### type

<description>**optional** _partition | treemap_ _default:_ `partition`</description>

Layout types, more types to explore.

#### seriesField

<description>**optional** _string_</description>

Grouping fields, that is, numeric fields to map.

#### reflect

<description>**optional** _x | y_</description>

Radial type, not recommended in special cases.

#### hierarchyConfig

<description>**optional** _object_</description>

Hierarchy configuration, such as' size ', 'padding', etc., refer to [D3-Hierarchy](https://github.com/d3/d3-hierarchy#treemap) for detailed configuration.

### Geometry Style

#### radius

<description>**optional** _string_ _default:_ `1`</description>

Radius, 0~1 of the value.

#### innerRadius

<description>**optional** _number_ _default:_ `0`</description>

Inner radius, 0~1 of the value.

#### colorField

<description>**optional** _string_</description>

Color mapping field.

`markdown:docs/common/color.en.md`

#### sunburstStyle

<description>**optional** _object_</description>

Sunburst graphic style. The 'fill' in pointStyle overrides the configuration of 'color'. SunBurstStyle can be specified either directly or via a callback to specify a separate style based on the data.

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
  sunburstStyle: {
    fill: 'red',
    stroke: 'yellow',
    opacity: 0.8
  },
}
// Function
{
  sunburstStyle: (value, item) => {
    if (value === 0.5) {
      return {
        fill: 'green',
        stroke: 'yellow',
        opacity: 0.8,
      }
    }
    // TODO
    return {
      fill: 'red',
      stroke: 'yellow',
      opacity: 0.8,
    }
  }
}
```

### Plot Components

`markdown:docs/common/component-polygon.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Plot Interactions

`markdown:docs/common/interactions.en.md`
