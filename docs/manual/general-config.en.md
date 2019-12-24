---
title: General Configuration
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

The theme of chart, if not configured, G2Plot default theme will be used by default.

For more details, please see Theme document.

## tooltip

**optional**, `Object`

`visible: boolean`  whether to show tooltip<br />
`shared: boolean`   whether displays single data<br />
`crosshairs`: tooltip guidelines<br />   `false`: hide crosshair<br />   `type: 'x' | 'y' | 'cross'`  crosshair type configeration<br />   `style: object`  the style of crosshair<br />
`htmlContent: function`<br />  users can customize tooltip by defining tooltip dom nodes according to the title and items parameters returned by the htmlContent method.

```js
htmlContent: (title, items) => {
  return '<div><ul><li>.....</li></ul></div>';
};
```

This method allows user to pass in an dom or dom id as tooltip container.

```js
htmlContent: (title, items) => {
  return dom | dom.id;
};
```

## legend

**optional**, `Object`

`visible: boolean`  whether to show legend<br />
`position: string` legend position

> G2Plot support 12 legend position settings：`left-top`,`left-center`,`left-bottom`,`right-top`,`right-center`,`right-bottom`,`top-left`,`top-center`,`top-right`,`bottom-left`,`bottom-center`,`bottom-right`。

`formatter: function`  format legend content<br />
`offsetX: number`   offset in x direction based on legend position, the unit is px<br />
`offsetY: number`   offset in y direction based on legend position, the unit is px

## events

**optional**

- Plot Events：<br />
  `onPlotClick: function`     the click event in the display area of chart<br />
  `onPlotDblClick: function`  the double-click event in the display area of chart<br />
  `onPlotMousemove: function`   the mousemove event in the display area of chart<br />
  `onPlotContextmenu: function`  the contextmenu event in the display area of chart

- Legend Events：<br />
  `onLabelClick: function`     the click event of legend<br />
  `onLabelDblClick: function`  the double-click event of legend<br />
  `onLabelMouseMove: function`  the mosemove event of legend<br />
  `onLabelContextmenu: function`   the context menu event of legend

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
