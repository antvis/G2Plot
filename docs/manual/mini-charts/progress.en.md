---
title: Progress - 进度条
order: 13
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*lO9ITInUZhQAAAAAAAAAAABkARQnAQ" width="200">

进度条是 g2plot 图表体系中，迷你图表的一种。

> 迷你图表通常在空间有限的情况下作为 fullsize chart 的降级显示形式，相比于 fullsize chart，迷你图表省略了轴和图例，标题，标签等组件，而只保留了图表图形的基本态势。因此展现的信息量是有限的。通常，迷你图表会搭配表格进行使用。

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### width

**reuired**, number 类型

图表宽度

### height

**reuired**, number 类型

图表高度

### percent

**required**, number 类型

进度百分比，值域为 [0,1]。

### color

**optional**, string | string[] | function 类型

设置进度条颜色，该值的类型如下

- string    指定值为单值时，配置进度条已完成分段的颜色
- string[]    指定值为一个数组时，同时配置进度条已完成和未完成分段的颜色，顺序为 [ 已完成，未完成 ]
- function  指定值为一个回调函数时，入参为当前进度 (percent)，出参为一个数组，需要同时指定进度条已完成和未完成分段的颜色，顺序为 [ 已完成，未完成 ]

### progressStyle

**optional**, object | function 类型

设置进度条的样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度

另外还支持回调函数的配置方式，入参为当前进度 (percent)，出参为一个样式配置对象。

### events

**optional**

- 图形事件：

  `onProgressClick: function`  折线点击事件<br />
  `onProgresDblClick: function`    折线双击事件<br />
  `onProgresMousemove: function`  折线鼠标移动事件<br />
  `onProgresContextmenu: function`    折线右键事件<br />

- 图表区域事件：

  `onPlotClick: function`    图表区域点击事件<br />
  `onPlotDblClick: function`  图表区域双击事件<br />
  `onPlotMousemove: function`    图表区域鼠标移动事件<br />
  `onPlotContextmenu: function`    图表区域右键事件

## 方法

### update( percent:number )

更新进度。

```js
progress.update(0.5);
```