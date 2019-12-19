---
title: API
---

## axis

**optional**

`visible: boolean` 坐标轴是否可见

### line

坐标轴轴线

`visible: boolean` 坐标轴轴线是否可见

`style: object | function` 坐标轴轴线样式

- `stroke: string` 坐标轴轴线颜色
- `lineWidth: number`  描边宽度<br />
- `lineDash: number[]`  描边虚线显示<br />
- `opacity: number`  透明度

### grid

坐标轴网格

`visible: boolean` 坐标轴网格是否可见

`style: object | function` 坐标轴网格样式

- `stroke: string` 坐标轴轴线颜色
- `lineWidth: number`  描边宽度<br />
- `lineDash: number[]`  描边虚线显示<br />
- `opacity: number`  透明度

### label

坐标轴标签

`visible: boolean` 坐标轴网格是否可见

`formatter: function` 对 label 的显示文本进行格式化

`offsetX: number` 在 label 位置的基础上再往 x 方向的偏移量

`offsetY: number` 在 label 位置的基础上再往 y 方向的偏移量

`style: object` 配置 label 文本样式

- `fill: string` label 颜色
- `fontSize: number` label 文本大小
- `fontWeight: number` label 文本字体粗细
- `stroke: string` label 文本描边颜色
- `lineWidth: number` label 文本描边粗细
- `opacity: number` label 文本透明度

### title

坐标轴标题

`visible: boolean` 坐标轴标题是否可见
`text: string` 坐标轴标题文字
`offset: number` 坐标轴标题位置偏移量

`style: object` 配置 title 文本样式

- `fill: string` title 颜色
- `fontSize: number` title 文本大小
- `fontWeight: number` title 文本字体粗细
- `stroke: string` title 文本描边颜色
- `lineWidth: number` title 文本描边粗细
- `opacity: number` title 文本透明度

### tickLine

坐标轴刻度线

`visible: boolean` 坐标轴标题是否可见

`style: object | function` 坐标轴网格样式

- `stroke: string` 坐标轴轴线颜色
- `lineWidth: number`  描边宽度<br />
- `lineDash: number[]`  描边虚线显示<br />
- `opacity: number`  透明度

## linearAxis

连续型坐标轴，通常用于展示连续型数值映射的坐标轴。常见于表示时间连续性的 x 轴 (折线图) 和大部分直角坐标系图表的 y 轴（如折线图、面积图、柱状图等）。

`min: number` 设置坐标轴最小值

`max: number` 设置坐标轴最大值

`tickCount: number` 设置坐标轴刻度数量

`tickInterval: number` 设置坐标轴刻度间隔

## categoryAxis

分类型坐标轴，通常用于展示分类型数据的映射关系。常见于柱状图系列的 X 轴及条形图系列的 y 轴。

- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
