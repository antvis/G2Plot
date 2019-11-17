---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

### groupField: string

**reqiured**

数据集中的分组字段名，通过该字段的值，柱子将会被分为多个组，通过颜色进行区分。

---

### 通用图表配置

#### title

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#title)。

#### description

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#description)。

#### width

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#width)。

#### height

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#height)。

#### forceFit

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#forceFit)。

#### padding

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#padding)。

#### theme

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#theme)。

### tooltip

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#legend)。

---

### 与基础柱状图相同的配置

#### data: collection

**required** 见[基础柱状图配置](../../../../zh/docs/manual/plots/column#data-collection)

#### xField: string

**reqiured** 见[基础柱状图配置](../../../../zh/docs/manual/plots/column#xfield-string)

#### yField: string

**reqiured** 见[基础柱状图配置](../../../../zh/docs/manual/plots/column#yField-string)

#### color: string | string[] | function

**optional** 见[基础柱状图配置](../../../../zh/docs/manual/plots/column#color-string--string--function)

#### columnSize: number

**optional** 见[基础柱状图配置](../../../../zh/docs/manual/plots/column#columnsize-number)

#### columnStyle: object | function

**optional** 见[基础柱状图配置](../../../../zh/docs/manual/plots/column.zh#columnstyle-object--function)

#### label

**optional** 见[基础柱状图配置](../../../../zh/docs/manual/plots/column#label)

#### events

**optional**

- 图形事件 见[基础柱状图配置](../../../../zh/docs/manual/plots/column#events)

- 其他事件类型见[通用图表配置](../../../../zh/docs/manual/general-config#events)。

* Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
* Server-side Rendering
* [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
