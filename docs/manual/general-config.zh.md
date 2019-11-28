---
title: 图表通用配置
order: 2
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

## title

**optional**, object 类型

配置图表的标题，默认显示在图表左上角。

> 请注意设置 title 将会压缩图表展示区域

`visible`:  `boolean`  是否显示标题<br />
`text`: `string`  标题文本<br />
`style`：`object`  标题样式，详见文本样式配置

## description

**optional**, object 类型

配置图表的描述，description 显示在 title 下方，默认在图表左上角。

> 请注意设置 description 将会压缩图表展示区域

`visible`:  `boolean`  是否显示描述<br />
`text`: `string`  描述文本<br />
`style`：`object`  描述样式，详见文本样式配置

## width

**optional**, number 类型

图表宽度。

如不进行配置，则默认采用 theme 中的宽度。

## height

**optional**, number 类型

图表高度。

如不进行配置，则默认采用 theme 中的高度。

## forceFit

**optional**, boolean 类型

图表是否自适应容器宽高。

## padding

**optional**, number[] | string 类型

图表内边距，是边框相对绘图区域的边距。坐标轴 (axis）和图例 (legend) 都显示在这一区域。

目前支持以下两种配置方式：

1. `padding: [10,10,10,10]`，顺序与 CSS 盒模型相同：上边距、右边距、下边距、左边距
1. `padding: 'auto'`，此为默认配置，将会自动计算边距所占的空间

## theme

**optional**, object 类型

图表主题，如不进行配置则默认使用 G2Plot 默认主题。详见 theme 文档。

## tooltip

**optional**, object 类型

`visible: boolean`  tooltip 是否可见<br />
`shared: boolean`    设置 tooltip 是否只展示单条数据<br />
`crosshairs`: 配置 tooltip 辅助线<br />   `false`: 不显示辅助线<br />   `type: 'x' | 'y' | 'cross'`  配置辅助线的形态<br />   `style: object`  配置辅助线样式，详见图形属性<br />
`htmlContent: function`<br />    自定义 tooltip，用户可以根据 htmlContent 方法返回的 title 和 items 两个参数定义 tooltip dom 节点的构成和显示方式。

```js
htmlContent: (title, items) => {
  return '<div><ul><li>.....</li></ul></div>';
};
```

此方法允许用户传入一个外部 dom 或 dom id 作为 tooltip 的容器。

```js
htmlContent: (title, items) => {
  return dom | dom.id;
};
```

## legend

**optional**, object 类型

`visible: boolean`  图例是否可见<br />
`position: string` 图例位置，以十二方位布局

> 设置图例的显示位置，可设置的值为 12 个：`left-top`,`left-center`,`left-bottom`,`right-top`,`right-center`,`right-bottom`,`top-left`,`top-center`,`top-right`,`bottom-left`,`bottom-center`,`bottom-right`。

`formatter: function`  对图例的显示信息进行格式化<br />
`offsetX: number`    图例在 position 的基础上再往 x 方向偏移量，单位 px<br />
`offsetY: number`     图例在 position 的基础上再往 y 方向偏移量，单位 px

## axis

**optional**

`visible: boolean` 坐标轴是否可见

### line

坐标轴轴线

`visible: boolean` 坐标轴轴线是否可见

`style: object | function` 坐标轴轴线样式

- `stroke: string` 坐标轴轴线颜色
- `lineWidth: number`  描边宽度<br />
- `lineDash: number[]`  描边虚线显示<br />
- `opacity: number`  透明度

### grid

坐标轴网格

`visible: boolean` 坐标轴网格是否可见

`style: object | function` 坐标轴网格样式

- `stroke: string` 坐标轴轴线颜色
- `lineWidth: number`  描边宽度<br />
- `lineDash: number[]`  描边虚线显示<br />
- `opacity: number`  透明度

### label

坐标轴标签

`visible: boolean` 坐标轴网格是否可见

`formatter: function` 对 label 的显示文本进行格式化

`offsetX: number` 在 label 位置的基础上再往 x 方向的偏移量

`offsetY: number` 在 label 位置的基础上再往 y 方向的偏移量

`style: object` 配置 label 文本样式

- `fill: string` label 颜色
- `fontSize: number` label 文本大小
- `fontWeight: number` label 文本字体粗细
- `stroke: string` label 文本描边颜色
- `lineWidth: number` label 文本描边粗细
- `opacity: number` label 文本透明度

### title

坐标轴标题

`visible: boolean` 坐标轴标题是否可见
`text: string` 坐标轴标题文字
`offset: number` 坐标轴标题位置偏移量

`style: object` 配置 title 文本样式

- `fill: string` title 颜色
- `fontSize: number` title 文本大小
- `fontWeight: number` title 文本字体粗细
- `stroke: string` title 文本描边颜色
- `lineWidth: number` title 文本描边粗细
- `opacity: number` title 文本透明度

### tickLine

坐标轴刻度线

`visible: boolean` 坐标轴标题是否可见

`style: object | function` 坐标轴网格样式

- `stroke: string` 坐标轴轴线颜色
- `lineWidth: number`  描边宽度<br />
- `lineDash: number[]`  描边虚线显示<br />
- `opacity: number`  透明度

## linearAxis

连续型坐标轴，通常用于展示连续型数值映射的坐标轴。常见于表示时间连续性的 x 轴 (折线图) 和大部分直角坐标系图表的 y 轴（如折线图、面积图、柱状图等）。

`min: number` 设置坐标轴最小值

`max: number` 设置坐标轴最大值

`tickCount: number` 设置坐标轴刻度数量

`tickInterval: number` 设置坐标轴刻度间隔

## categoryAxis

分类型坐标轴，通常用于展示分类型数据的映射关系。常见于柱状图系列的 X 轴及条形图系列的 y 轴。

## events

**optional**

- 图表区域事件:
  `onPlotClick: function`     图表区域点击事件<br />
  `onPlotDblClick: function`  图表区域双击事件<br />
  `onPlotMousemove: function`    图表区域鼠标移动事件<br />
  `onPlotContextmenu: function`    图表区域右键事件

- 图例事件:
  `onLabelClick: function`     图例点击事件<br />
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

```js
plot.updateConfig({
  width: 500,
  height: 600,
  legend: {
    visible: false,
  },
});
```

### repaint()

**optional**

图表画布重绘。

### destory()

**optional**

销毁图表。
