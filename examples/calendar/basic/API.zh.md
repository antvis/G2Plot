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

折线形状在 x 方向（横向延伸）对应的数据字段名，一般对应一个连续字段。

### yField: string

**required**

折线形状在 y 方向对应的数据字段名，一般对应一个离散字段。

### seriesField: string

**required**

多折线必选。

数据集中的分组字段名，一般对应一个分类字段。

通过该字段的值，折线图将会被分为多个组，通过颜色进行区分，视觉上呈现为多条折线。

### lineSize: number

**optional**

设置折线宽度，默认为 2。

### smooth: boolean

**optional**

是否将折线绘制为曲线 (spline)。

### color: string[] | function

**optional**

指定折线颜色。如不进行配置则采用 theme 中的配色。

### lineStyle: object | function

**optional**

配置折线样式。

`stroke: string`  折线颜色<br />
`lineWidth: number`  折线宽度<br />
`lineDash: number[]` 虚线显示<br />
`opacity: number`  透明度<br />

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### point

**optional**

配置折线上的数据点，起到辅助阅读的作用。分组及颜色映射方式与折线图形保持一致。

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

`visible: boolean`    图形标签是否显示<br />
`type: 'point' | 'line'`  图形标签类型

<p><img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*m9CuRrHRW78AAAAAAAAAAABkARQnAQ" width="600"></p>

`formatter: function` 对 label 的显示文本进行格式化<br />
`offsetX: number` 在 label 位置的基础上再往 x 方向的偏移量<br />
`offsetY: number` 在 label 位置的基础上再往 y 方向的偏移量<br />
`style: object` 配置 label 文本

### events

**optional**

- 图形事件：

`onLineClick: function`  折线点击事件<br />
`onLineDblClick: function`    折线双击事件<br />
`onLineMousemove: function`  折线鼠标移动事件<br />
`onLineContextmenu: function`    折线右键事件<br />

如配置了折线上的数据点：

`onPointClick: function`  数据点点击事件<br />
`onPointDblClick: function`    数据点双击事件<br />
`onPointMousemove: function`  数据点鼠标移动事件<br />
`onPointContextmenu: function`    数据点右键事件<br />

- 其他事件类型见[通用图表配置](../../../../zh/docs/manual/general-config#events)。

- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
