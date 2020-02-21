---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### data

**required**,  object类型

数据源为对象集合，每条数据包括 `title` (标题)、 `measures` (进度值，array类型，支持阶段性的进度值)、 `targets` (目标值)、`ranges`（进度条的色条范围区间，取值范围为[0, 1]）。每条数据代表一个进度条，如 `[{ title: '满意度', measures: [91], target: 90, ranges: [0, 1] }]`

### rangeMax

**required**, number 类型
进度条的色条范围区间最大值

### measureSize

**optional**,  number类型。
实际进度条大小设置（即实际进度条的高度）。default：20

### measureColors

**optional**, string[] 类型
设置进度条颜色，进度条的色条区间颜色依次取数组中的颜色色值

### rangeSize

**optional**,  number类型。
区间背景条大小设置，相对数值（相对于measureSize）。default：1.2

### rangeColors

**optional**, string[] 类型
设置进度条背景颜色，进度条的色条区间颜色依次取数组中的颜色色值

### markerSize

**optional**,  number类型。
目标值 marker 大小设置（即目标值 marker 的高度），相对数值（相对于measureSize）。default：1.2

### markerColors

**optional**, string[] 类型
设置进度条目标值颜色

### markerStyle

**optional**,  object类型。
目标值 marker 的样式设置。

- `width: number` marker的 宽度，默认为 1。
- `fill: string`  marker 的填充色

### axis

**optional**,  object类型。
进度条刻度轴设置。

- `visible: boolean` 是否显示进度条刻度轴。
- `position: string`  坐标轴位置，可选值： `before | after`。默认为 `before` ，代表坐标轴在上方
- `formatter: Function`  进度条刻度轴刻度值格式化。
- `tickCount: number` 刻度值个数
- `tickLine: object` 刻度线设置
  - `visible: boolean` 是否显示刻度线
  - `lineWidth: number` 刻度线宽度
  - `lineDash: number[]` 刻度线样式

- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
