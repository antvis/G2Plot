# Radar - 雷达图

## 图表故事

雷达图又叫蜘蛛网图。传统的雷达图被认为是一种表现多维（4 维以上）数据的图表。它将多个维度的数据量映射到坐标轴上，这些坐标轴起始于同一个圆心点，通常结束于圆周边缘，将同一组的点使用线连接起来就称为了雷达图。

雷达图在图形表现上通常以线、面或线面叠加的方式呈现，也可以配置数据点。

## 数据类型

单组雷达图适合的数据类型为一个分类字段和一个连续字段。在下面这个例子中，`type`为分类字段，`value`为联系字段。

```
const data = [
  type:'a',value: 100,
  type:'b',value:60,
  type:'c',value: 30
 ];
```

多组雷达图需要在此基础上再加入一个分类字段作为分组字段。雷达图将根据此字段分为 N 组。在下面的例子中，`mark`为分组字段，将雷达图分为上下叠加的两组。

```
const data = [
  type:'a',mark:'top',value: 100,
  type:'b',mark:'top',value:60,
  type:'c',mark:'top',value: 30,
  type:'a',mark:'bottom',value: 100,
  type:'b',mark:'bottom',value:60,
  type:'c',mark:'bottom',value: 30,
 ];
```

在进行图表绘制的时候，分类字段将映射到圆周上的角度，连续字段映射到半径长度。

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### title

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### description

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### width

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### height

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### forceFit

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### padding

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### theme

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一, value: 20 }, { segment: 分类二, value: 20 }]。

### angleField: string

**required**

雷达图映射到圆周角度所对应的字段，一般为一个分类字段。

### radiusField: string

**required**

雷达图映射到半径所对应的字段，一般为一个连续字段。

### seriesField: string

**required**

多组雷达图必选。对雷达图进行分组的字段，一般对应一个分类字段。

通过该字段的值，雷达图将会被分为多个组，通过颜色进行区分，并上下重叠。

### Line

**optional**

雷达图上的线

`visible: boolean`  是否绘制线<br />
`style: object | function`  线的样式<br />

- `stroke: string`  线的颜色<br />
- `lineWidth: number`  线的宽度<br />
- `lineDash: number[]`  虚线<br />
- - `opacity: number`  透明度

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### Point

**optional**

雷达图上的数据点

`visible: boolean`  是否显示数据点<br />
`shape: string`  数据点形状<br />
`size: number`  数据点大小<br />
`style: object | function`  数据点样式

### tooltip

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### legend

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### label

**optional**

`visible: boolean`    图形标签是否显示<br />
`formatter: (text: string, item: object, index: number) => string` 对 label 的显示文本进行格式化。<br />
`offsetX: number`    在 label 位置的基础上再往 x 方向的偏移量。<br />
`offsetY: number`    在 label 位置的基础上再往 y 方向的偏移量。<br />
`style: object`    配置 label 文本

### events

**optional**

- 图形事件

  `onAreaClick: function`  区域点击事件<br />
  `onAreaDoubleClick: function`    区域双击事件<br />
  `onAreaMousemove: function`  区域鼠标移动事件<br />
  `onAreaContextmenu: function`    区域右键事件

  如配置了线：

  `onLineClick: function`  线点击事件<br />
  `onLineDoubleClick: function`    线双击事件<br />
  `onLineMousemove: function`  线鼠标移动事件<br />
  `onLineContextmenu: function`    线右键事件

  如配置了点：

  `onPointClick: function`  数据点的鼠标点击事件<br />
  `onPointDoubleClick: function`    数据点的鼠标双击事件<br />
  `onPointMousemove: function`  数据点鼠标移动事件<br />
  `onPointContextmenu: function`    数据点右键事件

- 其他事件类型见[通用图表配置](../generalConfig.zh-CN.md)。
