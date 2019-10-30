---
title: TinyLine - 迷你折线图
order: 0
---

迷你折线是 g2plot 图表体系中，迷你图表的一种。

> 迷你图表通常在空间有限的情况下作为 fullsize chart 的降级显示形式，相比于 fullsize chart，迷你图表省略了轴和图例，标题，标签等组件，而只保留了图表图形的基本态势。因此展现的信息量是有限的。通常，迷你图表会搭配表格进行使用。

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### width: number

**reuired**

图表宽度

### height: number

**reuired**

图表高度

### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一, value: 20 }, { segment: 分类二, value: 20 }]。

### xField: string

**required**

折线形状在 x 方向(横向延伸)对应的数据字段名，一般对应一个连续字段。

### yField: string

**required**

折线形状在 y 方向对应的数据字段名，一般对应一个离散字段。

### size: number

**optional**

设置折线宽度，默认为 2。

### smooth: boolean

**optional**

是否将折线绘制为曲线(spline)。

### color: string | function

**optional**

指定折线颜色。如不进行配置则采用 theme 中的配色。

### lineStyle: object | function

**optional**

设置折线的样式。

`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### guideLine: object[]

**optional**

为图表添加辅助线，可以同时添加多条辅助线。

`type: string`    含有统计意义的辅助线类型，可选类型为  `'max'` | `'min'` | `'median'` |  `'mean'`。如指定了辅助线类型，则不需要配置辅助线的`start`和`end`。

`start: array | function | object`  指定辅助线起始位置，如不配置`type`，则该辅助线为自定义辅助线，`start`是必选项。<br />支持两种数据形式，两者不能混用：

- 原始数据值，如['2010-01-01', 100]
- 绘图区域百分比位置，如['50%', '50%']

`end: array | function | object`  指定辅助线终点位置，如不配置`type`，则该辅助线为自定义辅助线，`end`是必选项。<br />支持两种数据形式，两者不能混用：

- 原始数据值，如['2010-01-01', 100]
- 绘图区域百分比位置，如['50%', '50%']

`lineStyle: object`    设置辅助线样式。<br /> -`stroke: string`    辅助线颜色<br /> -`lineWidth: number`  辅助线宽度<br /> -`lineDash: number[]`    辅助线虚线显示<br />-
`opacity: number`    辅助线透明度

`text: object`  设置辅助线文本。<br /> -`position: 'start' | 'center' | 'end' | '50%' | 0.5`  设置辅助线文本样式。<br /> -`content: string`    辅助线文本内容。<br /> -`offsetX: number`  辅助线文本位置在 x 方向上的偏移量。<br /> -`offsetY: number`  辅助线文本位置在 y 方向上的偏移量。<br /> -`style: object`    辅助线文本样式。<br />

- - `fontSize: number`    字号<br />
- - `fill: string`    文字颜色<br />
- - `opacity: number`  文字透明度<br />
- - `textAlign: 'start' | 'end' | 'center'`    对齐方式<br />
- - `textBaselin: 'top' | 'bottom' | 'middle'`  文字基线

配置统计辅助线示例代码：

```
{
  guideLine:[
    {type: 'mean',
     lineStyle:{},
     text:{}
  ]
}
```

配置自定义辅助线示例代码：

```
{
  guideLine:[
    {start: ['2010-01-01', 100] || ['0%','50%'],
     end: ['2010-01-10', 50] || ['100%','80%'],
     lineStyle:{},
     text:{}
  ]
}
```

### events

**optional**

图形事件：

`onLineClick: function`  折线点击事件<br />
`onLineDblClick: function`    折线双击事件<br />
`onLineMousemove: function`  折线鼠标移动事件<br />
`onLineContextmenu: function`    折线右键事件

图表区域事件：

`onPlotClick: function`    图表区域点击事件<br />
`onPlotDblClick: function`  图表区域双击事件<br />
`onPlotMousemove: function`    图表区域鼠标移动事件<br />
`onPlotContextmenu: function`    图表区域右键事件
