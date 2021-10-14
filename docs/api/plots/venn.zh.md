---
title: Venn
order: 12
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _object_</description>

设置图表数据源。数据源为对象集合，例如：

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

设置集合的字段。

#### sizeField

<description>**optional** _string_</description>

圆形大小映射对应的字段。

### 图形样式

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

交集区域的颜色混合方式, 默认: `multiply`（正片叠底）。可选项: `multiply`, `normal`, `darken`, `lighten`, `screen`, `overlay`, `burn`, and `dodge`.
参考：https://gka.github.io/chroma.js/#chroma-blend

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

### 图表组件

#### legend

`markdown:docs/common/legend.zh.md`

#### label

`markdown:docs/common/label.zh.md`

#### tooltip

`markdown:docs/common/tooltip.zh.md`

### 图表交互

内置了针对 venn 图交互，列表如下:

| 交互 | 描述 | 配置方式 |
| ---|---|---|
| venn-element-active | 开启「鼠标移入 venn 图元素时触发 active」的交互 | `interactions:[{ type: 'venn-element-active', enabled: true }]`  |
| venn-element-selected | 开启「鼠标点击 venn 图元素时触发 selected」的交互，可多选 | `interactions:[{ type: 'venn-element-selected', enabled: true }]` |

`markdown:docs/common/interactions.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`
