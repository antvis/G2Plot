---
title: Column - 基础柱状图
order: 0
---

## 图表故事

柱状图用于描述分类数据之间的对比，如果我们把时间周期，如周、月、年，也理解为一种分类数据 (time category)，那么柱状图也可以用于描述时间周期之间的数值比较。

## 数据类型

基础柱状图适合的数据类型为一个**分类字段**（类型）和一个**离散字段**（数值）。在下面这个例子中，`type`为分类数据字段，`value`为离散数据字段。

```typescript
const data = [
  { type: 'a', value: 100 },
  { type: 'b', value: 60 },
  { type: 'c', value: 30 },
];
```

图表绘制时，每一个分类对应一根柱子，映射到 x 轴，而分类数值对应柱子的高度，映射到 y 轴。

## 图表用法

- **Dont's**
  - 尽量避免在基础柱状图中使用颜色映射。
  - y 轴不以 0 值为起点，将有可能导致柱状图显示错误的比例关系。

* **Do**
  - 如果分类之间的序列关系 (ranking) 有意义且不是时间周期，可以考虑将数据进行排序。
  - 如果需要关注具体数据，可以考虑移除坐标轴，显示图形标签，使用户的注意力更加聚焦。

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

数据源为对象集合，例如：[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]。

### xField: string

**required**

柱形在 x 方向位置映射对应的数据字段名，一般对应一个分类字段。

### yField: string

**required**

柱形在 y 方向高度映射所对应的数据字段名，一般对应一个离散字段。

### colorField: string

**optional**

柱形颜色映射对应的数据字段名。

### color: string | string[] | function

**optional**

指定柱形颜色。如不进行配置则采用 theme 中的配色。

### columnSize: number

**optional**

设置柱形的宽度为一个固定值。

### columnStyle: object | function

**optional**

配置柱形样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### tooltip

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### legend

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### label

**optional**

`visible: boolean`    图形标签是否显示<br />
`position: 'top' | 'middle' | 'bottom'`    图形标签相对于柱形的位置<br />
`formatter: function`  对 label 的显示文本进行格式化。/>
`offsetX: number` as br    在 label 位置的基础上再往 x 方向的偏移量。/>
`offsetY: number` as br    在 label 位置的基础上再往 y 方向的偏移量。/>
`style: object` as br    配置 label 文本

### events

**optional**

- 图形事件
  `onColumnClick: function`  柱形点击事件<br />
  `onColumnDblClick: function`  柱形双击事件<br />
  `onColumnMousemove: function`  柱形鼠标移动事件<br />
  `onColumnContextmenu: function`    柱形右键事件

- 其他事件类型见[通用图表配置](../generalConfig.zh-CN.md)。
