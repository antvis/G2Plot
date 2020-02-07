---
title: Range-Bar 区间条形图
order: 8
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*HtyxTaMKQ0UAAAAAAAAAAABkARQnAQ" width="400">

# 数据类型

区间条形图的数据结构为一个分类字段及一个由数值Array构成的连续字段。

示例数据：

```js
{
  level:'E',
  values: [10,50]
}
```

以示例数据举例，在区间条形图中，分类字段 level 映射到 Y 轴，而连续字段 values 映射到 X 轴，values的两个值分别决定了条形在 X 方向上的伸展区域。

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

#### data

**required**

数据源为对象集合，例如：`[{ segment: 分类一，values: [ 20, 50 ] }, { segment: 分类二，value: [10, 40] }]`。

#### label

**optional**

`visible: boolean`    图形标签是否显示 <br />
`position: 'outer' | 'inner'`     图形标签相对于条形的位置 <br />
`formatter: function`  对 label 的显示文本进行格式化 <br />
`offsetX: number` 在 label 位置的基础上再往 x 方向的偏移量 <br />
`offsetY: number` 在 label 位置的基础上再往 y 方向的偏移量 <br />
`style: object` 配置label样式 <br />
`leftStyle: object` 配置左边 label 样式，优先级高于`style` <br />
`rightStyle: object` 配置右边 label 样式, 优先级高于`style` <br />
`adjustColor: boolean` 是否根据图形颜色自动调整label颜色，仅在position为inner时有效  <br />
`adjustPosition: boolean` 当图形无法容纳label时是否自动调整位置，仅在position为inner时有效 


---

### 通用图表配置

#### title

**optional** 见[通用图表配置](../general-config#title)。

#### description

**optional** 见[通用图表配置](../general-config#description)。

#### width

**optional** 见[通用图表配置](../general-config#width)。

#### height

**optional** 见[通用图表配置](../general-config#height)。

#### forceFit

**optional** 见[通用图表配置](../general-config#forceFit)。

#### padding

**optional** 见[通用图表配置](../general-config#padding)。

#### theme

**optional** 见[通用图表配置](../general-config#theme)。

### xAxis

**optional** 见[通用图表配置](../general-config#categoryaxis)。

### yAxis

**optional** 见[通用图表配置](../general-config#linearaxis)。

### tooltip

**optional** 见[通用图表配置](../general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../general-config#legend)。

---

### 与基础条形图相同的配置

#### data

**required**

数据源为对象集合，例如：`[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]`。

#### xField

**required**, string 类型

条形在 x 方向长度映射对应的数据字段名，一般对应一个离散字段。

#### yField

**required**, string 类型

条形在 y 方向位置映射所对应的数据字段名，一般对应一个分类字段。

#### colorField

**optional**, string 类型

条形颜色映射对应的数据字段名。

#### color

**optional**, string | string[] | function 类型

指定条形颜色。如不进行配置则采用 theme 中的配色。

#### barSize: number

**optional**, number 类型

设置条形的高度为一个固定值。

#### barStyle

**optional**, object | function 类型

配置条形样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度<br />

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

#### events

**optional**

- 图形事件
  `onBarClick: function`  条形点击事件<br />
  `onBarDblClick: function`  条形双击事件<br />
  `onBarMousemove: function`  条形鼠标移动事件<br />
  `onBarContextmenu: function`    条形右键事件

- 其他事件类型见[通用图表配置](../general-config#events)。
### 与基础条形图相同的配置

#### data

**required**

数据源为对象集合，例如：`[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]`。

#### xField

**required**, string 类型

条形在 x 方向长度映射对应的数据字段名，一般对应一个离散字段。

#### yField

**required**, string 类型

条形在 y 方向位置映射所对应的数据字段名，一般对应一个分类字段。

#### colorField

**optional**, string 类型

条形颜色映射对应的数据字段名。

#### color

**optional**, string | string[] | function 类型

指定条形颜色。如不进行配置则采用 theme 中的配色。

#### barSize: number

**optional**, number 类型

设置条形的高度为一个固定值。

#### barStyle

**optional**, object | function 类型

配置条形样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度<br />

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

#### events

**optional**

- 图形事件
  `onBarClick: function`  条形点击事件<br />
  `onBarDblClick: function`  条形双击事件<br />
  `onBarMousemove: function`  条形鼠标移动事件<br />
  `onBarContextmenu: function`    条形右键事件

- 其他事件类型见[通用图表配置](../general-config#events)。