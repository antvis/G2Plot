---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

## 特殊配置


### leaderLine ✨

**optional**,  object 类型

是否显示柱子间的辅助线以及辅助线的样式

`visible: boolean` 是否显示辅助线，默认 true

`style: object` 辅助线样式

### showTotal ✨

**optional**,  object 类型

是否显示总计值以及总计值的标签设置

`visible: boolean` 是否显示总计值，默认 true

`label: string` 总计值文本标签

### diffLabel ✨

**optional**,  object 类型

是否显示差值label（柱子的实际高度）以及自定义label样式

`visible: boolean` 是否显示差值标签，默认 true

`formatter: Function` 文本标签格式化，同 普通标签 的格式化方法的入参、出参一致

`style: object` 文本标签样式，同 普通标签 的文本样式一致

## 通用配置

### title

**optional** 见[通用图表配置](../general-config#title)。

### description

**optional** 见[通用图表配置](../general-config#description)。

### width

**optional** 见[通用图表配置](../general-config#width)。

### height

**optional** 见[通用图表配置](../general-config#height)。

### forceFit

**optional** 见[通用图表配置](../general-config#forceFit)。

### padding

**optional** 见[通用图表配置](../general-config#padding)。

### theme

**optional** 见[通用图表配置](../general-config#theme)。

### data

**required**

数据源为对象集合，例如：[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]。

### xField

**required**, string 类型

柱形在 x 方向位置映射对应的数据字段名，一般对应一个分类字段。

### yField

**required**, string 类型

柱形在 y 方向高度映射所对应的数据字段名，一般对应一个离散字段。

### color

**optional**, string | string[] | function 类型

设置瀑布图柱子的填充颜色，该值的定义优先级高于 waterfallStyle.fill 。该值的类型如下：

- string：  指定值为单值时，配置瀑布图柱子的颜色
- object： 指定值为一个对象数组时，可配置涨跌和总计值颜色，可选值如下：
   - `rising`  正值柱形填充颜色
   - `falling` 负值柱形填充颜色
   -  `total`  总计值柱形填充颜色，可选


### waterfallStyle

**optional**, object | function 类型

设置瀑布图的样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度

另外还支持回调函数的配置方式，入参为当前柱子的数值和累计值，出参为一个样式配置对象。默认样式为红涨绿降，总计值为灰色。

### xAxis

**optional** 见[通用图表配置](../general-config#categoryaxis)。

### yAxis

**optional** 见[通用图表配置](../general-config#linearaxis)。

### tooltip

**optional** 见[通用图表配置](../general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../general-config#legend)。

### label

**optional**

`visible: boolean`    图形标签是否显示<br />
`position: 'top' | 'middle' | 'bottom'`    图形标签相对于柱形的位置<br />
`formatter: function`  对 label 的显示文本进行格式化。<br />
`offsetX: number` 在 label 位置的基础上再往 x 方向的偏移量。<br />
`offsetY: number` 在 label 位置的基础上再往 y 方向的偏移量。<br/>
`style: object` 配置 label 文本

### events

**optional**

- 见基础柱形图[events配置](./column.zh/#events)

- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
