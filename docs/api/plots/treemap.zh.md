---
title: 矩阵树图
order: 29
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _Record<string: array | string>_</description>

设置图表数据源。矩阵树图数据源为一个树状结构的对象，如下

```javascript
const data = {
  name: 'root',
  children: [
    { name: '分类 1', value: 560 },
    { name: '分类 2', value: 500 },
  ],
};

```

其中，每一层级的数据都需要具备三个属性

- name
- value (叶子节点)
- children (非叶子节点)

嵌套矩形树图中，布局由叶子节点的 value 值决定。

G2 plot 会根据 data 生成以下数据结构：

- name
- value
- path: 当前节点的层级信息(包含当前节点)
- children: 当前节点的叶节点信息（仅存在时给出）

其中，你可以在 label（tooltip）的 formatter 函数中获取 path 参数，从而计算占比, 可参见[DEMO](../../../examples/more-plots/treemap#treemap-nest)

#### colorField

<description>**optional** _string_</description>

颜色映射字段名。


### 图形样式

`markdown:docs/common/color.zh.md`
#### rectStyle
 
<description>**optional** _object_</description>

矩形图形样式。rectStyle 中的`fill`会覆盖 `color` 的配置。rectStyle 可以直接指定，也可以通过 callback 的方式，根据数据指定单独的样式。

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

层级布局配置，例如 `tile`等，详细配置参考[d3-hierarchy](https://github.com/d3/d3-hierarchy#treemap)。
默认为 `{tile: 'treemapSquarify', ratio: 0.5 * (1 + Math.sqrt(5))}` (黄金分割纵横比)

### 图表组件

`markdown:docs/common/component-polygon.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`

### 图表交互

矩形树图内置了一些交互，列表如下

#### treemap-drill-down

treemap-drill-down 用于下钻交互，配置该交互后，矩形树图默认显示深度为 1 的节点，点击后下钻。

示例

```plain
interactions: [
  {
    type: 'treemap-drill-down',
  },
],
```

#### view-zoom

view-zoom 用于放大 view，配置该交互后，canavs 自动识别 zoom 手势，放大或缩小矩形树图

示例

```plain
interactions: [
  {
    type: 'view-zoom',
  },
],
```

#### drag-move

drag-move 用于拖拽 view，可和 view-zoom 配套使用，查看矩形树图细节

示例

```plain
interactions: [
  {
    type: 'drag-move',
  },
],
```


`markdown:docs/common/interactions.zh.md`
