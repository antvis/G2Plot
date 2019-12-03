---
title: General Configeration
order: 2
---

## title

**optional**, `Object`

The title of chart, defaultly placed in the upper-left corner of chart's container.

> note: setting title will compress the display area of statistical graphics.

`visible`:  `boolean`  whether to show title<br />
`text`: `string`  title content<br />
`style`：`object`  the style of title

## description

**optional**, `Object`

The descriprion ( subtile ) of chart，defaultly placed in the upper-left corner of chart's container, below title.

> Note: setting description will compress of statistical graphics.

`visible`:  `boolean`  whether to show descriprion<br />
`text`: `string`  descriprion content<br />
`style`：`object`  the style of descriprion

## width

**optional**, `Number`

The width of chart in pixel.

If not configured, the width setting in theme will be used by default.

## height

**optional**, `Number`

The width of chart in pixel.

If not configured, the height setting in theme will be used by default.

## forceFit

**optional**, `Boolean`

Whether the chart size is adaptive to the container width and height.

## padding

**optional**, `number[] | string`

Chart padding is the inner margin relative to the drawing pannel of statistical graphics. Both axis and legend are displayed in this area.

Currently support the following two confogration methods:

1. `padding: [10,10,10,10]`，The order is the same as the CSS box model: top, right, bottom, left.
1. `padding: 'auto'`，automatically calculate padding space, which is the default configeration.

## theme

**optional**, `Object`

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

## events

**optional**

- 图表区域事件：<br />
  `onPlotClick: function`     图表区域点击事件<br />
  `onPlotDblClick: function`  图表区域双击事件<br />
  `onPlotMousemove: function`    图表区域鼠标移动事件<br />
  `onPlotContextmenu: function`    图表区域右键事件

- 图例事件：<br />
  `onLabelClick: function`     图例点击事件<br />
  `onLabelDblClick: function`  图例双击事件<br />
  `onLabelMouseMove: function`  图例鼠标移动事件<br />
  `onLabelContextmenu: function`    图例右键事件

## General Methods

### render()

**reqiured**

Render chart.

### updateConfig()

**optional**

Update configrations of chart

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

Repaint chart.

### destory()

**optional**

Destory chart.
