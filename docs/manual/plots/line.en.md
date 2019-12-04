---
title: Line Chart
order: 0
---

<img src ="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*FAMKRLERiAEAAAAAAAAAAABkARQnAQ" width="400">

## Story

The Line chart is ideal to present data in a continous time span, which is usually used to show the changing patterns of data over time: is it rising or falling, is there any trending can be discovred visually? As a result, Line chart focues on the global trend of data rather than single independent data point.

Generally speaking, the horizontal axis (x axis) reprents timeline with equal intervals, and vertical axis (y axis) indicates values in different points of time.

## Data

Line chart is suitable for a linear data field (time) combining with a discrete field ( value ). In the follow example, `time` is the linear data field and `value` is the discrete data field.

```js
const data = [
  { time: '2000', value: 100 },
  { time: '2001', value: 60 },
  { time: '2002', value: 30 },
];
```

The **linear** field will be mapped to the horizontal poisition of line shape, while the **discrete** field will be mapped to the horizontal position of line shape.

If we add an additional **category** field `type` in the sample data, line will be splited into two according to the category field, and we got a Multi-Line chart, the position informaion in horizontal (x) direction is completely the same. So Multi-Line chart is usually used to compare the development trend of two variables in the same time span.

```js
const data = [
  { time: '2000', value: 100, type: 'a' },
  { time: '2001', value: 60, type: 'a' },
  { time: '2002', value: 30, type: 'a' },
  { time: '2000', value: 70, type: 'b' },
  { time: '2001', value: 120, type: 'b' },
  { time: '2002', value: 40, type: 'b' },
];
```

## Usage

- **Dont's**
  - avoid too many lines with the same visual importance.
  - be careful to use smooth line.
- **Do**
  - use visual style such as lineWidth, color, opacity to enhance emphasis in Multi-Line chart. Grey color and lower opacity is good choice to seperate not important data from important ones.

## API

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

数据源为对象集合，例如：`[{ segment: '分类一'，value: 20 }, { segment: '分类二'，value: 20 }]`。

### xField

**required**, string 类型

折线形状在 x 方向（横向延伸）对应的数据字段名，一般对应一个连续字段。

### yField

**required**, string 类型

折线形状在 y 方向对应的数据字段名，一般对应一个离散字段。

### seriesField

**required**, string 类型

多折线必选。

数据集中的分组字段名，一般对应一个分类字段。

通过该字段的值，折线图将会被分为多个组，通过颜色进行区分，视觉上呈现为多条折线。

### lineSize

**optional**, number 类型

设置折线宽度，默认为 2。

### smooth

**optional**, boolean 类型

是否将折线绘制为曲线 (spline)。

### color

**optional**, string[] | function 类型

指定折线颜色。如不进行配置则采用 theme 中的配色。

### lineStyle

**optional**, object | function 类型

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

**optional** 见[通用图表配置](../general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../general-config#legend)。

### label

**optional**

`visible: boolean`    图形标签是否显示<br />
`type: 'point' | 'line'`  图形标签类型

| `type` 类型     | 表现                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `type: 'point'` | <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*4NmuSaVRZ44AAAAAAAAAAABkARQnAQ" width="350"> |
| `type: 'line'`  | <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*YMGnQoh_jSAAAAAAAAAAAABkARQnAQ" width="350"> |

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

- 其他事件类型见[通用图表配置](../general-config#events)。
