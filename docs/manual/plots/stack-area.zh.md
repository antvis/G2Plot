---
title: StackArea - 堆叠面积图
order: 0
---

## 图表故事

work in progress

## 数据类型

work in progress

## 图表用法

- **Dont's**
  - 避免面积数量过多，且在视觉样式上无法区分主次。
  - 谨慎使用曲线面积图。

* **Do**
  - 多面积时，考虑堆叠面积图而不是重叠面积图。

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

#### stackField: string

**required**

面积堆叠的字段名，通过该字段的值，条形将会被分割为多个部分，通过颜色进行区分。

---

### 通用图表配置

#### title

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### description

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### width

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### height

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### forceFit

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### padding

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### theme

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### tooltip

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### legend

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

---

## 与基础面积图相同的配置

#### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一, value: 20 }, { segment: 分类二, value: 20 }]。

#### xField: string

**required**

面积形状在 x 方向(横向延伸)对应的数据字段名，一般对应一个连续字段。

#### yField: string

**required**

面积形状在 y 方向对应的数据字段名，一般对应一个离散字段。

#### color: string[] | function

**optional**

指定折线颜色。如不进行配置则采用 theme 中的配色。

#### areaStyle: object | function

**optional**

配置面积样式。

`strokeStyle: string`  面积的边框颜色<br />
`opacity: number`  透明度<br />
`lineWidth: number`  面积区域边框线的线宽<br />
`lineDash: number[]`  面积区域边框线的虚线配置

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

#### line: object

**optional**

配置面积图上线，起到辅助阅读的作用。分组及颜色映射方式与面积图形保持一致。

`visible: boolean`  是否显示数据线<br />
`opacity: number`  透明度<br />
`color: string`  颜色<br />
`size: number`  线宽<br />
`style: object | function`  线图形样式，另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

#### point: object

**optional**

配置面积图上的数据点，起到辅助阅读的作用。分组及颜色映射方式与面积图形保持一致。

`visible: boolean`  是否显示数据点<br />
`shape: string`  数据点形状<br />
`size: number`  数据点大小<br />

#### events

**optional**

- 图形事件
  `onAreaClick: function`  区域点击事件<br />
  `onAreaDblclick: function`    区域双击事件<br />
  `onAreaMousemove: function`  区域鼠标移动事件<br />
  `onAreaMouseenter: function`    区域鼠标进入事件<br />
  `onAreaMouseleave: function`    区域鼠标移出事件<br />
  `onAreaMousedown: function`    区域鼠标点击事件<br />
  `onAreaMouseup: function`    区域鼠标抬起事件<br />`onAreaContextmenu: function`    右键事件

  如配置了区域图上的数据点：

  `onPointClick: function`  数据点点击事件<br />
  `onPointDblClick: function`    数据点双击事件<br />
  `onPointMousemove: function`  数据点鼠标移动事件<br />
  `onPointMouseenter: function`    数据点鼠标进入事件<br />
  `onPointMouseleave: function`    数据点鼠标移出事件<br />
  `onPointMousedown: function`    数据点鼠标点击事件<br />
  `onPointMouseup: function`    数据点鼠标抬起事件<br />
  `onPointContextmenu: function`    数据点右键事件

  如配置了区域图上的折线：

  `onLineClick: function`  折线点击事件<br />
  `onLineDblClick: function`  折线双击事件<br />
  `onLineMousemove: function`  折线鼠标移动事件<br />
  `onLineMouseenter: function`    折线鼠标进入事件<br />
  `onLineMouseleave: function`    折线鼠标移出事件<br />
  `onLineMousedown: function`    折线鼠标点击事件<br />
  `onLineMouseup: function`    折线鼠标抬起事件<br />
  `onLineContextmenu: function`    折线右键事件<br />

- 其他事件类型见[通用图表配置](../generalConfig.zh-CN.md)。
