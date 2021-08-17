---
title: Circle packing
order: 40
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _object_</description>

设置图表数据源。 Circle Packing 的数据格式要求为：

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

Circle packing 内含的数据字段有：'x', 'y', 'r', 'name', 'value', 'path', 'depth', 这些字段可以在元数据中获取（tooltip、style 回调中使用）.

可以通过下面的方式来设置字段的元信息：

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

颜色映射字段。默认为：`name`，按照 name 字段对颜色进行分类。

#### sizeField

<description>**optional** _string_</description>

点大小映射对应的数据字段名。

#### rawFields

<description>**optional** _string[]_</description>

额外的原始字段。配置之后，可以在 tooltip 等回调函数的 datum 参数中，获取到更多额外的原始数据。

<!-- 
#### sizeFields

<description>**optional** _string_</description>

点大小映射对应的数据字段名。 -->


### 图形样式

#### hierarchyConfig ✨

<description>**optional** _object_</description>

层级布局配置，参考[d3-hierarchy](https://github.com/d3/d3-hierarchy#pack)。

支持配置属性：

| 属性    | 类型               | 描述 ｜                                                                                                                              |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| field   | _string_           | 数据节点权重映射字段，默认为：`value`. 当你的节点数据格式不是：`{ name: 'xx', value: 'xx' }`, 可以通过该字段来指定，详细见：图表示例 |
| padding | _number\|number[]_ | 默认：`0`。参考：[d3-hierarchy#pack_padding](https://github.com/d3/d3-hierarchy#pack_padding)                              |
| size    | _number[]_         | 默认：`[1, 1]`。参考：[d3-hierarchy#pack_size](https://github.com/d3/d3-hierarchy#pack_size)                               |
| sort    | _Function_         | 数据节点排序方式，默认：降序。参考: [d3-hierarchy#node_sort](https://github.com/d3/d3-hierarchy#node_sort)                           |

<!-- #### size -->

<!-- <description>**optional**</description> -->

<!-- 指定点的大小。可以指定大小数组 [minSize, maxSize]，还可以配合 sizeFiled 进行了配置， 也可以通过回调函数的方法根据对应数值进行设置。 -->

<!-- Color 配置 -->
`markdown:docs/common/color.zh.md`

`markdown:docs/common/pattern.zh.md`

#### pointStyle

<description>**optional** _object_</description>

设置点样式。pointStyle 中的`fill`会覆盖 `color` 的配置。pointStyle 可以直接指定，也可以通过 callback 的方式，根据数据指定单独的样式。

默认配置：

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

可使用 `reflect: 'x'` 进行 x 轴反转，使用 `reflect: 'y'` 进行 y 轴反转。

### 图表组件

`markdown:docs/common/component-polygon.zh.md`

### 图表交互

<!-- 旭日图内置了一些交互，列表如下:

| 交互 | 描述 | 配置方式 |
| ---|---|---|
| drill-down | 用于下钻交互，配置该交互后，矩形树图默认显示深度为 1 的节点，点击后下钻。| `drilldown: { enabled: true }`  | -->

<!-- `markdown:docs/common/drill-down.zh.md` -->

`markdown:docs/common/interactions.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`
