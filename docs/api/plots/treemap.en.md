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

G2 plot generates the following data structure based on data:

- name
- value
- path: Level information of the current node (including the current node)，The level information is from data (node metadata), value (node value), height (node height)
- children: Leaf node information of the current node (only if it exists)

Among them, you can get the path parameter in the formatter function of label (tooltip), so as to calculate the proportion, [DEMO](/en/examples/more-plots/treemap#treemap-nest)

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
The default is `{tile: 'treemapSquarify', ratio: 0.5 * (1 + Math.sqrt(5))}` (Golden Section Ratio)

### Plot Components

`markdown:docs/common/component-polygon.en.md`

### Plot Interactions

Built-in interactions of Treemap are as follows:

| Interaction        | Description                                                                          | Configuration                                                                         |
| ------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| drill-down | 用于下钻交互，配置该交互后，矩形树图默认显示深度为 1 的节点，点击后下钻。            | `drilldown: { enabled: true }` |
| view-zoom          | view-zoom 用于放大 view，配置该交互后，canavs 自动识别 zoom 手势，放大或缩小矩形树图 | `interactions: [{ type: 'view-zoom' }]`                                               |
| drag-move          | drag-move 用于拖拽 view，可和 view-zoom 配套使用，查看矩形树图细节                   | `interactions: [{ type: 'drag-move' }]`                                               |

`markdown:docs/common/drill-down.en.md`

`markdown:docs/common/interactions.en.md`

### Plot Events

`markdown:docs/common/events.en.md`

### Plot Methods

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
