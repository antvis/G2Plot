---
title: Column
order: 3
---

<img src = 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*j4gkSL9OhCIAAAAAAAAAAABkARQnAQ' width = '400'>

## Story

Column chart is uesed to present the data comparison between catergories. It also capable of show numerical comparison between diffrent time periods, if we consider time periods, like week, month, year, as category (time category).

## Data

The data which is ideal for basic column chart is a **category** data field combining with a **discrete** field (value). In the example below, `type` is the category data field and `value` is the discrete data field.

```js
const data = [
  { type: 'a', value: 100 },
  { type: 'b', value: 60 },
  { type: 'c', value: 30 },
];
```

The category will be mapped to the horizontal poisition of column shapes, while discrete field will be mapped to the height of columns in the vertical direction (y axis).

## How to use

- **Dont's**
  - mapping column shapes in diffrent colors should be cautious.
  - starting at a non-zero baseline may lead to inaccurate proportionality display in column chart.

* **Do**
  - If the display order of categories is meaningful and the categories are not time cat, sorting data is a good choice.
  - Removing axis and showing labels makes data ranther than comparison, become the focal point.

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

数据源为对象集合，例如：[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]。

### xField

**required**, string 类型

柱形在 x 方向位置映射对应的数据字段名，一般对应一个分类字段。

### yField

**required**, string 类型

柱形在 y 方向高度映射所对应的数据字段名，一般对应一个离散字段。

### colorField

**optional**, string 类型

柱形颜色映射对应的数据字段名。

### color

**optional**, string | string[] | function 类型

指定柱形颜色。如不进行配置则采用 theme 中的配色。

### columnSize

**optional**, number 类型

设置柱形的宽度为一个固定值。

### columnStyle

**optional**, object | function 类型

配置柱形样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

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

- 图形事件
  `onColumnClick: function`  柱形点击事件<br />
  `onColumnDblClick: function`  柱形双击事件<br />
  `onColumnMousemove: function`  柱形鼠标移动事件<br />
  `onColumnContextmenu: function`    柱形右键事件

- 其他事件类型见[通用图表配置](../general-config#events)。
