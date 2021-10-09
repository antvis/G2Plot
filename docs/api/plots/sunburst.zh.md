---
title: 旭日图
order: 17
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _object_</description>

设置图表数据源。旭日图的数据格式要求为：

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

`markdown:docs/common/meta.zh.md`

旭日图内含的数据字段有：

| 字段 | 字段描述 | 字段值类型 |
｜ --- ｜ --- ｜ --- ｜
｜`Sunburst.SUNBURST_PATH_FIELD`| 节点的路径信息 |_string_ |
｜`Sunburst.SUNBURST_ANCESTOR_FIELD`| 当前节点的祖先节点 | _string_ |
｜`Sunburst.NODE_ANCESTORS_FIELD`| 当前节点的祖先节点列表 |_object[]_ |
｜`nodeIndex`| 当前节点在同一父节点下的所有节点中的索引顺序 |_number_ |
| `childNodeCount` | 当前节点的儿子节点数 |_number_ |
｜`depth`| |_number_ |
｜`height`| | _number_ |

可以通过下面的方式来设置字段的元信息：

```ts
meta: {
  [Sunburst.SUNBURST_PATH_FIELD]: {
    alias: '节点路径',
    formatter: (v) => `${v}`,
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

颜色映射字段。默认为：`Sunburst.SUNBURST_ANCESTOR_FIELD`，即节点的祖先节点，颜色透明度逐渐减小（可以通过 sunburstStyle 回调来控制填充透明度）

#### rawFields

<description>**optional** _string[]_</description>

额外的原始字段。配置之后，可以在 tooltip，sunburstStyle 等回调函数的 datum 参数中，获取到更多额外的原始数据。

### 图形样式

#### hierarchyConfig ✨

<description>**optional** _object_</description>

层级布局配置，参考[d3-hierarchy](https://github.com/d3/d3-hierarchy#partition)。

支持配置属性：

| Properties        | Type               | Description                                                                                                                          |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| field             | _string_           | 数据节点权重映射字段，默认为：`value`. 当你的节点数据格式不是：`{ name: 'xx', value: 'xx' }`, 可以通过该字段来指定，详细见：[图表示例](/zh/examples/more-plots/sunburst#basic2) |
| activeDepth             | _number_           | 默认展示的层级深度。默认空,代表全部展示。 取值范围为: [1, ∞)，详细见：[图表示例](/zh/examples/more-plots/sunburst#active-depth) |
| padding           | _number\|number[]_ | 默认：`0`。参考：[d3-hierarchy#partition_padding](https://github.com/d3/d3-hierarchy#partition_padding)                              |
| size              | _number[]_         | 默认：`[1, 1]`。参考：[d3-hierarchy#partition_size](https://github.com/d3/d3-hierarchy#partition_size)                               |
| round             | _boolean_          | 默认：`false`。参考：[d3-hierarchy#partition_round](https://github.com/d3/d3-hierarchy#partition_round)                              |
| sort              | _Function_         | 数据节点排序方式，默认：降序。参考: [d3-hierarchy#node_sort](https://github.com/d3/d3-hierarchy#node_sort)                           |
| ignoreParentValue | _boolean_          | 是否忽略 parentValue, 默认：true。 当设置为 true 时，父节点的权重由子元素决定                                                        |

#### radius

<description>**optional** _string_ _default:_ `0.85`</description>

半径，0 ~ 1。

#### innerRadius

<description>**optional** _number_ _default:_ `0`</description>

内径，0 ~ 1。

<!-- Color 配置 -->

`markdown:docs/common/color.zh.md`

#### pattern ✨

<description>**optional** _object | Function_</description>

`markdown:docs/common/pattern.zh.md`

#### sunburstStyle

<description>**optional** _object | Function_</description>

旭日图形样式。旭日图默认随着层级增加，而逐渐减小填充透明度，可以通过 sunburstStyle 回调来控制填充透明度，详细见：[图表示例](/zh/examples/more-plots/sunburst#style)

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
// 直接指定
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

径向类型，非特殊情况不建议使用。在旭日图中，不可使用 `reflect: 'x'` 进行 x 轴反转，使用 `reflect: 'y'` 进行 y 轴反转后，祖先节点在最外层，从外至内依次：父节点 - 孩子节点 - 孙子节点

### 图表组件

`markdown:docs/common/component-polygon.zh.md`

### 图表交互

旭日图内置了一些交互，列表如下:

| 交互       | 描述                                     | 配置                           |
| ---------- | ---------------------------------------- | ------------------------------ |
| drill-down | 用于下钻交互，配置该交互后，点击可下钻。 | `drilldown: { enabled: true }` |

`markdown:docs/common/drill-down.zh.md`

`markdown:docs/common/interactions.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`
