---
title: Circle packing
order: 40
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _object_</description>

Configure the chart data source. For Circle packing：

```sign
type Node = { name: string; value?: number; children: Node[]; }
```

示例:

```ts
{
  name: 'root',
  children: [
    { name: 'type1', value: 1 },
    { name: 'type2', value: 3, children: [{ name: 'type2-1', value: 2 }] }
  ]
}
```

#### meta

`markdown:docs/common/meta.en.md`


Circle packing contains data fields such as 'x', 'y', 'r', 'name', 'value', 'path', and 'depth', which can be retrieved from the metadata (used in tooltip and style callbacks).

You can set the meta information of a field as follows:

```ts
meta: {
  name: {
    formatter: (v) => `名称：${v}`,
  },
  value: {
    alias: '值',
  },
  depth: {
    alias: '深度',
  }
},
```

#### colorField

<description>**optional** _string_</description>

Color mapping field. The default is: 'name', and the colors are sorted by name field.

#### sizeField

<description>**optional** _string_</description>

The name of the data field corresponding to the point size map.

#### rawFields

<description>**optional** _string[]_</description>

Extra original fields. Once configured, you can retrieve additional raw data in the datum parameter of callback functions such as Tooltip.

### Geometry Style

#### hierarchyConfig ✨

<description>**optional** _object_</description>

Hierarchy configuration, such as' size ', 'padding', etc., refer to [D3-Hierarchy](https://github.com/d3/d3-hierarchy#pack) for detailed configuration.

Supports configuration properties:

| Properties    | Type               | Description ｜                                                                                                                              |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| field   | _string_           | The data node weight mapping field, default is: 'value'. When your node data format is not: '{name: 'xx', value: 'xx'} ', you can use this field to specify. See the example chart for details |
| padding | _number\|number[]_ | default: `0`。reference：[d3-hierarchy#pack_padding](https://github.com/d3/d3-hierarchy#pack_padding)                              |
| size    | _number[]_         | default: `[1, 1]`。reference：[d3-hierarchy#pack_size](https://github.com/d3/d3-hierarchy#pack_size)                               |
| sort    | _Function_         | Data node sorting method, default: descending order.reference: [d3-hierarchy#node_sort](https://github.com/d3/d3-hierarchy#node_sort)                           |

<!-- 
#### radius

<description>**optional** _string_ _default:_ `0.85`</description>

Radius, 0~1 of the value.

#### innerRadius

<description>**optional** _number_ _default:_ `0`</description>

Inner radius, 0~1 of the value. -->

<!-- Color 配置 -->
`markdown:docs/common/color.en.md`

`markdown:docs/common/pattern.en.md`

#### pointStyle

<description>**optional** _object_</description>

Set the point style. The `fill` in pointStyle overrides the configuration of `color`. PointStyle can be specified either directly or via a callback to specify individual styles based on the data.

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
  pointStyle: {
    fill: 'red',
    stroke: 'yellow',
    opacity: 0.8
  },
}
// Function
{
  pointStyle: ({ value }) => {
    if (value > 50000) {
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

#### reflect

<description>**optional** _x | y_</description>

You can use `reflect: 'x'` to carry out an X-axis reverse and `reflect: 'y'` to carry out a Y-axis reverse.

### Plot Components

`markdown:docs/common/component-polygon.en.md`

### Plot Interactions
<!-- 
Built-in interactions of Sunburst are as follows:

| Interaction        | Description                  | Configuration    |
| ---|---|---|
| drill-down | 用于下钻交互，配置该交互后，矩形树图默认显示深度为 1 的节点，点击后下钻。| `drilldown: { enabled: true }`  | -->

<!-- `markdown:docs/common/drill-down.zh.md` -->

`markdown:docs/common/interactions.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
