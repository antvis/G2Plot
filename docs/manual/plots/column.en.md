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
  - Removing axis and showing labels makes data, ranther than comparison, become the focal point.

## API

### title

**optional** check [general configeration](../general-config#title)

### description

**optional** check [general configeration](../general-config#description)

### width

**optional** check [general configeration](../general-config#width)

### height

**optional** check [general configeration](../general-config#height)

### forceFit

**optional** check [general configeration](../general-config#forceFit)

### padding

**optional** check [general configeration](../general-config#padding)

### theme

**optional** check [general configeration](../general-config#theme)

### data

**required**

The data source of chart，the standard data format in G2Plot is JSON array.

Example:

`[{ segment: cat1，value: 20 }, { segment: cat2，value: 20 }]`

### xField

**required**, `string`

The data field mapped to the horizontal (x) poisition of column shape, usually is a category field.

### yField

**required**, `string`

The data field mapped to the height of column shape in y direction, usually is a discrete field.

### colorField

**optional**, `string`

The data field mapped to the color of column shape.

### color

**optional**, `string | string[] | function`

Settig the color value of column shapes, default as theme color | colors.

### columnSize

**optional**, `number`

Setting the width of column shapes as a fixed value.

### columnStyle

**optional**, `object | function`

The style of column shape.

`fill: string`  column filling color<br />
`stroke: string`  stroke color<br />
`lineWidth: number`  line width<br />
`lineDash: number[]`  line dash<br />
`opacity: number`  opacity

In addition, it also supports callback function as configuration method. The input parameter is shape data, and the output parameter is a configuration object.

### tooltip

**optional** check [general configeration](../general-config#tooltip)

### legend

**optional** check [general configeration](../general-config#legend)

### label

**optional**

`visible: boolean`    whether to show label<br />
`position: 'top' | 'middle' | 'bottom'`    label position according to column shape<br />
`formatter: function`  format label content<br />
`offsetX: number` offset in x direction based on label position, the unit is px<br />
`offsetY: number` offset in y direction based on label position, the unit is px<br/>
`style: object` label text style

### events

**optional**

- shape events
  `onColumnClick: function`  the click event of column shape<br />
  `onColumnDblClick: function`  the double click event of column shape<br />
  `onColumnMousemove: function`  the mousemove event of column shape<br />
  `onColumnContextmenu: function`  the contextmenu event of column shape

- for other events, please check [general configeration](../general-config#events)
