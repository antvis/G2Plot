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

**optional** check [general configeration](../general-config#title)。

### description

**optional** check [general configeration](../general-config#description)。

### width

**optional** check [general configeration](../general-config#width)。

### height

**optional** check [general configeration](../general-config#height)。

### forceFit

**optional** check [general configeration](../general-config#forceFit)。

### padding

**optional** check [general configeration](../general-config#padding)。

### theme

**optional** check [general configeration](../general-config#theme)。

### data

**required**

The data source of chart，the standard data format in G2Plot is JSON array.

Example:

`[{ segment: 'category1'，value: 20 }, { segment: 'category2'，value: 20 }]`

### xField

**required**, `string`

The data field mapped to the horizontal (x) poisition of line shape, usually is a linear field.

### yField

**required**, `string`

The data field mapped to the vertical (y) poisition of line shape, usually is a discrete field.

### seriesField

**required**, `string`

Reuired in Multi-line chart.

The data field to group data items which visually displayed as multiple line shapes with different colors, usually is a category field.

### lineSize

**optional**, `number`

The width of line shape, default value is 2.

### smooth

**optional**, `boolean`

Whether to transfer line to spline。

### color

**optional**, `string[] | function`

The color of line shape, default as theme color.

### lineStyle

**optional**, `object | function`

Setting visual style of line shape.

`stroke: string`  line color<br />
`lineWidth: number`  line width<br />
`lineDash: number[]` dash<br />
`opacity: number`  opacity<br />

In addition, it also supports callback function as configuration method. The input parameter is shape data, and the output parameter is a configuration object.

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
