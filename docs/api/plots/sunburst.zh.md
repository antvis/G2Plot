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

颜色映射字段。默认为：`Sunburst.SUNBURST_ANCESTOR_FIELD`，即节点的祖先节点，颜色透明度逐渐减小（可以通过 sunburstStyle 回调来控制填充透明度）

### 图形样式

#### hierarchyConfig ✨

<description>**optional** _object_</description>

层级布局配置，参考[d3-hierarchy](https://github.com/d3/d3-hierarchy#partition)。

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

半径，0 ~ 1。

#### innerRadius

<description>**optional** _number_ _default:_ `0`</description>

内径，0 ~ 1。

<!-- Color 配置 -->
`markdown:docs/common/color.zh.md`

#### sunburstStyle

<description>**optional** _object | Function_</description>

旭日图形样式。旭日图默认随着层级增加，而逐渐减小填充透明度，可以通过 sunburstStyle 回调来控制填充透明度，详细见：[图表示例](/zh/examples/more-plots/sunburst#style)

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

#### 图表标注 - annotations

`markdown:docs/common/annotations.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`

### 图表交互

`markdown:docs/common/interactions.zh.md`
