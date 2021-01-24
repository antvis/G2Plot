---
title: Treemap
order: 29
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _Record<string: array | string>_</description>

Configure the chart data source. The data source of the matrix tree graph is an object with a tree structure, as follows

```javascript
const data = {
  name: 'root',
  children: [
    { name: '分类 1', value: 560 },
    { name: '分类 2', value: 500 },
  ],
};
```

Each level of data needs to have three attributes

- name
- value (A leaf node)
- children (Non-leaf node)

In the nested rectangular tree diagram, the layout is determined by the value value of the leaf node.

#### colorField

<description>**optional** _string_</description>

Color mapping field name.

### Geometry Style

`markdown:docs/common/color.en.md`

#### rectStyle

<description>**optional** _object_</description>

Rectangular graphic styles. The 'fill' in rectStyle overrides the 'color' configuration. RectStyle can be specified either directly or via a callback to specify a separate style based on the data.

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
// Config
{
  rectStyle: {
    fill: 'red',
  },
}
// Function
{
  rectStyle: (data) => {
    if (data.value > 10) {
      return {
        fill: 'green',
      }
    }
    return {
      fill: 'red',
    }
  }
}
```

#### hierarchyConfig

<description>**optional** _object_</description>

Hierarchical layout configuration, such as' tile ', etc., refer to detailed configuration [d3-hierarchy](https://github.com/d3/d3-hierarchy#treemap)。
The default is `{tile: 'treemapResquarify'}`

### Plot Components

`markdown:docs/common/component-polygon.en.md`

### Plot Events

`markdown:docs/common/events.en.md`

### Plot Methods

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Interactions

`markdown:docs/common/interactions.en.md`
