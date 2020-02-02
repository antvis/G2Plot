---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

## 特殊配置

### stackField: string ✨

**required**
数据集中的分组字段名，通过该字段的值，玫瑰图中的扇形切片将会被分割为多个部分，通过颜色进行区分。

> 注意：当配置了 stackField 时，colorField 配置无效

### groupField: string ✨

**required**
数据集中的分组字段名，通过该字段的值，玫瑰图中的扇形切片将会被分为多个组，通过颜色进行区分

> 注意：当配置了 groupField 时，colorField 配置无效。如果同时配置 stackField 和 groupField时，优先取stackField

## 通用配置

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

### radiusField: string

**required**

扇形切片半径长度所对应的数据字段名。

### categoryField: string

**required**

扇形切片分类所对应的数据字段名（每个扇形的弧度相等）。

### colorField: string

**required**

扇形切片颜色所对应的数据字段名。

### radius: number

**optional**

玫瑰图的最大半径，原点为画布中心。配置值域为 [0,1]，0 代表玫瑰图大小为 0，即不显示，1 代表玫瑰图撑满绘图区域。默认值为 0.8, 即 width / 2 * 0.8。

### color: string[] | function

**optional**

指定玫瑰图颜色。如不进行配置则采用 theme 中的配色。

### tooltip

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#legend)。

### label

**optional** 

`visible: boolean`    图形标签是否显示
`type: 'inner' | 'outer'`    图形标签的类型
`autoRotate: boolean`  图形标签是否自动旋转
`adjustColor: boolean`  图形标签是否自动调整颜色

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*v47dTIPtnysAAAAAAAAAAABkARQnAQ" alt="image.png" style="visibility: visible; width: 607px; height: 240px;">

> 注意，当 type 为 inner 时，可以设置adjustColor 来自动调整标签颜色

其他见[通用图表配置](../../../../zh/docs/manual/general-config#label)。

### sectorStyle: object | function

**optional**

配置玫瑰图扇形切片样式。

`stroke: string`  折线颜色<br />
`lineWidth: number`  折线宽度<br />
`lineDash: number[]` 虚线显示<br />
`opacity: number`  透明度<br />

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### events

**optional**

- 详见：[基础柱形图events配置](https://g2plot.antv.vision/en/docs/manual/plots/column/#events)

- 其他事件类型见[通用图表配置](../../../../zh/docs/manual/general-config#events)。

- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
