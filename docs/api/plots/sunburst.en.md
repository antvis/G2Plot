---
title: Sunburst
order: 17
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _object_</description>

Configure the chart data source. 旭日图的数据格式要求为：

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

旭日图内含的数据字段有：Sunburst.SUNBURST_PATH_FIELD, Sunburst.SUNBURST_ANCESTOR_FIELD, depth, height，这些字段可以在元数据中获取（tooltip、style 回调中使用）.

可以通过下面的方式来设置字段的元信息：

```ts
meta: {
  [Sunburst.SUNBURST_PATH_FIELD]: {
    alias: '节点路径',
    formatter: (v) => `🌞 ${v}`,
  },
  [Sunburst.SUNBURST_ANCESTOR_FIELD]: {
    alias: '祖先节点',
  },
  depth: {
    alias: '节点层级',
  },
},
```

#### colorField

<description>**optional** _string_</description>

Color mapping field.

颜色映射字段。默认为：`Sunburst.SUNBURST_ANCESTOR_FIELD`，即节点的祖先节点，颜色透明度逐渐减小（可以通过 sunburstStyle 回调来控制填充透明度）

#### rawFields

<description>**optional** _string[]_</description>

额外的原始字段。配置之后，可以在 tooltip，sunburstStyle 等回调函数的 datum 参数中，获取到更多额外的原始数据。


### Geometry Style

#### hierarchyConfig ✨

<description>**optional** _object_</description>

Hierarchy configuration, such as' size ', 'padding', etc., refer to [D3-Hierarchy](https://github.com/d3/d3-hierarchy#partition) for detailed configuration.

支持配置属性：

| 属性    | 类型               | 描述 ｜                                                                                                                              |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| field   | _string_           | 数据节点权重映射字段，默认为：`value`. 当你的节点数据格式不是：`{ name: 'xx', value: 'xx' }`, 可以通过该字段来指定，详细见：图表示例 |
| padding | _number\|number[]_ | 默认：`0`。参考：[d3-hierarchy#partition_padding](https://github.com/d3/d3-hierarchy#partition_padding)                              |
| size    | _number[]_         | 默认：`[1, 1]`。参考：[d3-hierarchy#partition_size](https://github.com/d3/d3-hierarchy#partition_size)                               |
| round   | _boolean_          | 默认：`false`。参考：[d3-hierarchy#partition_round](https://github.com/d3/d3-hierarchy#partition_round)                              |
| sort    | _Function_         | 数据节点排序方式，默认：降序。参考: [d3-hierarchy#node_sort](https://github.com/d3/d3-hierarchy#node_sort)                           |


#### radius

<description>**optional** _string_ _default:_ `0.85`</description>

Radius, 0~1 of the value.

#### innerRadius

<description>**optional** _number_ _default:_ `0`</description>

Inner radius, 0~1 of the value.

<!-- Color 配置 -->
`markdown:docs/common/color.en.md`

#### sunburstStyle

<description>**optional** _object_</description>

Sunburst graphic style. 旭日图默认随着层级增加，而逐渐减小填充透明度，可以通过 sunburstStyle 回调来控制填充透明度，详细见：[图表示例](/zh/examples/more-plots/sunburst#style)

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
  sunburstStyle: (datum) => {
    if (datum.value === 0.5) {
      return {
        fill: 'green',
        stroke: 'yellow',
        opacity: 0.8,
      }
    }
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

Radial type, not recommended in special cases. 在旭日图中，不可使用 `reflect: 'x'` 进行 x 轴反转，使用 `reflect: 'y'` 进行 y 轴反转后，祖先节点在最外层，从外至内依次：父节点 - 孩子节点 - 孙子节点


### Plot Components

`markdown:docs/common/component-polygon.en.md`

#### annotations

`markdown:docs/common/annotations.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Plot Interactions

`markdown:docs/common/interactions.en.md`
