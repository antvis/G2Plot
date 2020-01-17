---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### title

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#title)。

### description

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#description)。

### width

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#width)。

### height

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#height)。

### forceFit

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#forceFit)。

### padding

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#padding)。

### theme

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#theme)。

### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]。

### angleField: string

**required**

雷达图映射到圆周角度所对应的字段，一般为一个分类字段。

### radiusField: string

**required**

雷达图映射到半径所对应的字段，一般为一个连续字段。

### radius: number

**optional**

雷达图半径

### seriesField: string

**required**

多组雷达图必选。对雷达图进行分组的字段，一般对应一个分类字段。

通过该字段的值，雷达图将会被分为多个组，通过颜色进行区分，并上下重叠。

### angleAxis

**optional**

雷达图角度轴配置，通用配置详见[通用图表配置](../../../../zh/docs/manual/general-config#categoryaxis)

### radiusAxis

**optional**

雷达图径向轴配置，通用配置详见[通用图表配置](../../../../zh/docs/manual/general-config#linearaxis)

- `gridType: string`  网格线样式<br />
- `gridAlternateColor: string`  网格设置交替的颜色，指定一个值则先渲染奇数层，两个值则交替渲染<br />

### Line

**optional**

雷达图上的线

`visible: boolean`  是否绘制线<br />
`style: object | function`  线的样式<br />

- `stroke: string`  线的颜色<br />
- `lineWidth: number`  线的宽度<br />
- `lineDash: number[]`  虚线<br />
- `opacity: number`  透明度

支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### Area

**optional**

雷达图上的面

`visible: boolean`  是否绘制面<br />
`style: object | function`  面的样式<br />

- `fill: string` 面的颜色<br />
- `opacity: number` 面的透明度<br />

支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### Point

**optional**

雷达图上的数据点

`visible: boolean`  是否显示数据点<br />
`shape: string`  数据点形状<br />
`size: number`  数据点大小<br />
`style: object | function`  数据点样式

### tooltip

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#legend)。

### label

**optional**

`visible: boolean`    图形标签是否显示。<br />
`formatter: function`  对 label 的显示文本进行格式化。<br />
`offsetX: number`  在 label 位置的基础上再往 x 方向的偏移量。<br />
`offsetY: number`  在 label 位置的基础上再往 y 方向的偏移量。<br />
`style: object` 配置 label 文本

### events

**optional**

- 图形事件

  `onAreaClick: function`  区域点击事件<br />
  `onAreaDoubleClick: function`    区域双击事件<br />
  `onAreaMousemove: function`  区域鼠标移动事件<br />
  `onAreaContextmenu: function`    区域右键事件

  如配置了线：

  `onLineClick: function`  线点击事件<br />
  `onLineDoubleClick: function`    线双击事件<br />
  `onLineMousemove: function`  线鼠标移动事件<br />
  `onLineContextmenu: function`    线右键事件

  如配置了点：

  `onPointClick: function`  数据点的鼠标点击事件<br />
  `onPointDoubleClick: function`    数据点的鼠标双击事件<br />
  `onPointMousemove: function`  数据点鼠标移动事件<br />
  `onPointContextmenu: function`    数据点右键事件

- 其他事件类型见[通用图表配置](../../../../zh/docs/manual/general-config#events)。

* Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
* Server-side Rendering
* [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
