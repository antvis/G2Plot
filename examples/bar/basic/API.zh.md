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

### xField: string

**required**

条形在 x 方向长度映射对应的数据字段名，一般对应一个离散字段。

### yField: string

**required**

条形在 y 方向位置映射所对应的数据字段名，一般对应一个分类字段。

### colorField: string

**optional**

条形颜色映射对应的数据字段名。

### color: string | string[] | function

**optional**

指定条形颜色。如不进行配置则采用 theme 中的配色。

### barSize: number

**optional**

设置条形的高度为一个固定值。

### barStyle: object | function

**optional**

配置条形样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度<br />

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### tooltip

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#legend)。

### label

**optional**

`visible: boolean`    图形标签是否显示<br />
`position: 'top' | 'middle' | 'bottom'`    图形标签相对于柱形的位置<br />
`formatter: function`  对 label 的显示文本进行格式化。<br/>
`offsetX: number` 在 label 位置的基础上再往 x 方向的偏移量。<br/>
`offsetY: number` 在 label 位置的基础上再往 y 方向的偏移量。<br/>
`style: object` 配置 label 文本
`adjustColor: boolean` 自动调整 label 的文本颜色
`adjustPosition: boolean` 自动调整 label 相对柱形的位置

### conversionTag

**optional**

<img src="https://gw.alicdn.com/tfs/TB1ac.gvNv1gK0jSZFFXXb0sXXa-1194-1108.png" width="400">

`visible: boolean` 转化率组件是否显示，默认 `false`。<br/>
`size: number` 转化率组件宽度，默认 `80`。<br/>
`spacing: number` 与条图形的间距，默认 `12`。<br/>
`offset: number` 相对 x 轴的偏移距离，默认 `0`。<br/>
`arrow.visible: boolean` 箭头图形是否显示，默认 `true`。<br/>
`arrow.headSize: number` 箭头图形尖的高度，默认 `12`。<br/>
`arrow.style: object` 箭头图形绘图属性。<br/>
`value.visible: boolean` 转化率值是否显示，默认 `true`。<br/>
`value.style: object` 转化率值绘图属性。<br/>
`value.formatter: (v1, v2) => string` 转化率值 formatter，用于自定义内容，v1 为上侧条的数值，v2 位下侧条的数值。<br/>

### events

**optional**

- 图形事件
  `onBarClick: function`  条形点击事件<br />
  `onBarDblClick: function`  条形双击事件<br />
  `onBarMousemove: function`  条形鼠标移动事件<br />
  `onBarContextmenu: function`    条形右键事件

- 其他事件类型见[通用图表配置](../../../../zh/docs/manual/general-config#events)。

* Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
* Server-side Rendering
* [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
