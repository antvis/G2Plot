---
title: Venn
order: 12
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _object_</description>

Configure the chart data source. For example：

```ts
 const data = [
    { sets: ['A'], size: 5 },
    { sets: ['B'], size: 10 },
    { sets: ['A', 'B'], size: 2 },
    ...
   ];
```

#### setsField

<description>**optional** _string_</description>

The field of the collection(sets).

#### sizeField

<description>**optional** _string_</description>

The name of the data field corresponding to the point size map.

### Geometry Style

#### color

<description>**optional** _string | string[] | Function_</description>

指定图形元素的颜色。可以指定单色，或者一系列色值，也可以通过回调函数的方法根据对应数值进行设置。（**注意**：韦恩图的 color 系列色值只作用于单个集合上，交集部分通过指定 blendMode 来进行叠加处理。另外，color 回调中，第二个参数代表默认分配的颜色。）

默认配置：采用 theme 中的色板。演示 [Demo](/zh/examples/more-plots/venn#blend-mode)

```ts
// 设置单一颜色
{
  color: '#a8ddb5'
}
// 设置多色
{
  color: ['#d62728', '#2ca02c', '#000000'],
}
// Function
{
  color: (datum, defaultColor) => {
    if(datum.size > 100){
      return 'red';
    }
    return defaultColor;
  }
}
```


#### blendMode

<description>**optional** _string_</description>

Color blend mode of the intersection area, default: `multiply`. Other: `normal`, `darken`, `lighten`, `screen`, `overlay`, `burn`, and `dodge`.
reference：https://gka.github.io/chroma.js/#chroma-blend

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
  pointStyle: ({ size }) => {
    if (size > 1) {
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
  },
}
```

### Plot Components

#### legend

`markdown:docs/common/legend.en.md`

#### label

`markdown:docs/common/label.en.md`

#### tooltip

`markdown:docs/common/tooltip.en.md`


### Plot Interactions

There are interactions for venn diagrams, listed below:

| interaction | description | configuration method |
| ---|--|--|
| venn-element-active | enable the "mouse-over venn diagram element triggers active" interaction | `interactions:[{ type: 'venn-element-active', enabled: true }]` |
| venn-element-selected | enable the interaction "trigger selected when mouse clicked on venn diagram element", multiple options available | `interactions:[{ type: 'venn-element-selected', enabled: true }]` |

`markdown:docs/common/interactions.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
