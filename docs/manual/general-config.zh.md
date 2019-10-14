---
title: 图表通用配置
order: 2
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

## title

**optional**

配置图表的标题，默认显示在图表左上角。

> 请注意设置 title 将会压缩图表展示区域

`visible`:  `boolean`  是否显示标题<br />
`text`: `string`  标题文本<br />
`style`：`object`  标题样式，详见文本样式配置

## description

**optional**

配置图表的描述，description 显示在 title 下方，默认在图表左上角。

> 请注意设置 description 将会压缩图表展示区域

`visible`:  `boolean`  是否显示描述<br />
`text`: `string`  描述文本<br />
`style`：`object`  描述样式，详见文本样式配置

## width：number

**optional**

图表宽度。

如不进行配置，则默认采用 theme 中的宽度。

## height：number

**optional**

图表高度。

如不进行配置，则默认采用 theme 中的高度。

## forceFit: boolean

**optional**

图表是否自适应容器宽高。

## padding: number[] | string

**optional**

图表内边距，是边框相对绘图区域的边距。坐标轴(axis）和图例(legend)都显示在这一区域。<br />目前支持以下两种配置方式：

1. `padding: [10,10,10,10]`，顺序与 CSS 盒模型相同：上边距、右边距、下边距、左边距
1. `padding: 'auto'`，此为默认配置，将会自动计算边距所占的空间

## theme: object

**optional**

图表主题，如不进行配置则默认使用 G2Plot 默认主题。详见 theme 文档。

## tooltip

**optional**

`visible: boolean`  tooltip 是否可见

`shared: boolean`    设置 tooltip 是否只展示单条数据。

`crosshairs`: 配置 tooltip 辅助线<br />   `false`: 不显示辅助线<br />   `type: 'x' | 'y' | 'cross'`  配置辅助线的形态<br />   `style: object`  配置辅助线样式，详见图形属性

`htmlContent: function`<br />

自定义 tooltip，用户可以根据 htmlContent 方法返回的 title 和 items 两个参数定义 tooltip dom 节点的构成和显示方式。

```
htmlContent:(title,items)=>{
  return '<div><ul><li>.....</li></ul></div>';
}
```

此方法允许用户传入一个外部 dom 或 dom id 作为 tooltip 的容器。

```
htmlContent:(title,items)=>{
  return dom | dom.id;
}
```

## legend

**optional**

`visible: boolean`  图例是否可见<br />
`position: string` 图例位置，以十二方位布局

> 设置图例的显示位置，可设置的值为 12 个：`left-top`,`left-center`,`left-bottom`,`right-top`,`right-center`,`right-bottom`,`top-left`,`top-center`,`top-right`,`bottom-left`,`bottom-center`,`bottom-right`。

`formatter: function`  对图例的显示信息进行格式化<br />
`offsetX: number`    图例在 position 的基础上再往 x 方向偏移量，单位 px。<br />
`offsetY: number`    图例在 position 的基础上再往 y 方向偏移量，单位 px。

## events

**optional**

- 图表区域事件：<br />
  `onPlotClick: function`    图表区域点击事件<br />
  `onPlotDblClick: function`  图表区域双击事件<br />
  `onPlotMousemove: function`    图表区域鼠标移动事件<br />
  `onPlotContextmenu: function`    图表区域右键事件

- 图例事件：<br />
  `onLabelClick: function`    图例点击事件<br />
  `onLabelDblClick: function`  图例双击事件<br />
  `onLabelMouseMove: function`  图例鼠标移动事件<br />
  `onLabelContextmenu: function`    图例右键事件

## 通用方法

### render()

**reqiured**

渲染图表。

### updateConfig()

**optional**

更新图表配置项。

```
plot.updateConfig({
   width: 500,
   height: 600,
   legend:{
     visible: false
   }
});

```

### repaint()

**optional**

图表画布重绘。

### destory()

**optional**

销毁图表。
