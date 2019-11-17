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

数据源为对象集合，例如：`[{ segment: '分类一'，value: 20 }, { segment: '分类二'，value: 20 }]`。

### xField: string

**required**

面积形状在 x 方向（横向延伸）对应的数据字段名，一般对应一个连续字段。

### yField: string

**required**

面积形状在 y 方向对应的数据字段名，一般对应一个离散字段。

### color: string[] | function

**optional**

指定折线颜色。如不进行配置则采用 theme 中的配色。

### areaStyle: object | function

**optional**

配置面积样式。

`strokeStyle: string`  面积的边框颜色<br />
`opacity: number`  透明度<br />
`lineWidth: number`  面积区域边框线的线宽<br />
`lineDash: number[]`  面积区域边框线的虚线配置

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### line: object

**optional**

配置面积图上线，起到辅助阅读的作用。分组及颜色映射方式与面积图形保持一致。

`visible: boolean`  是否显示数据线<br />
`opacity: number`  透明度<br />
`color: string`  颜色<br />
`size: number`  线宽<br />
`style: object | function`  线图形样式，另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### point: object

**optional**

配置面积图上的数据点，起到辅助阅读的作用。分组及颜色映射方式与面积图形保持一致。

`visible: boolean`  是否显示数据点<br />
`shape: string`  数据点形状<br />
`size: number`  数据点大小<br />
`style: object | function`  数据点图形样式，另外该属性还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象

### tooltip

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#legend)。

### label

**optional**

`visible: boolean`  图形标签是否显示<br />
`formatter: function`  对 label 的显示文本进行格式化<br/>
`offsetX: number` 在 label 位置的基础上再往 x 方向的偏移量<br/>
`offsetY: number` 在 label 位置的基础上再往 y 方向的偏移量<br/>
`style: object` 配置 label 文本

### events

**optional**

- 图形事件
  `onAreaClick: function` 区域点击事件<br />
  `onAreaDblclick: function` 区域双击事件<br />
  `onAreaMousemove: function` 区域鼠标移动事件<br />
  `onAreaMouseenter: function` 区域鼠标进入事件<br />
  `onAreaMouseleave: function` 区域鼠标移出事件<br />
  `onAreaMousedown: function` 区域鼠标点击事件<br />
  `onAreaMouseup: function` 区域鼠标抬起事件<br />
  `onAreaContextmenu: function` 右键事件

  如配置了区域图上的数据点：

  `onPointClick: function`  数据点点击事件<br />
  `onPointDblClick: function` 数据点双击事件<br />
  `onPointMousemove: function` 数据点鼠标移动事件<br />
  `onPointMouseenter: function` 数据点鼠标进入事件<br />
  `onPointMouseleave: function` 数据点鼠标移出事件<br />
  `onPointMousedown: function` 数据点鼠标点击事件<br />
  `onPointMouseup: function` 数据点鼠标抬起事件<br />
  `onPointContextmenu: function` 数据点右键事件

  如配置了区域图上的折线：

  `onLineClick: function` 折线点击事件<br />
  `onLineDblClick: function` 折线双击事件<br />
  `onLineMousemove: function` 折线鼠标移动事件<br />
  `onLineMouseenter: function` 折线鼠标进入事件<br />
  `onLineMouseleave: function` 折线鼠标移出事件<br />
  `onLineMousedown: function` 折线鼠标点击事件<br />
  `onLineMouseup: function` 折线鼠标抬起事件<br />
  `onLineContextmenu: function` 折线右键事件

- 其他事件类型见[通用图表配置](../../../../zh/docs/manual/general-config#events)。


- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
