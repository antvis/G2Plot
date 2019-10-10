# Bar - 基础条形图

## 图表故事

条形图即是横向柱状图，相比基础柱状图，条形图的分类文本可以横向排布，因此适合用于分类较多的场景。

## 数据类型

条形图适合的数据类型为一个**分类字段**(类型)和一个**离散字段**(数值)。在下面这个例子中，`type`为分类数据字段，`value`为离散数据字段。

```
const data = [
  type:'a',value: 100,
  type:'b',value:60,
  type:'c',value: 30
 ];
```

图表绘制时，每一个分类对应一根柱子，映射到 y 轴，而分类数值对应柱子的长度，映射到 x 轴。

## 图表用法

- **Dont's**
  - 尽量避免在基础条形图中使用颜色映射。
  - x 轴不以 0 值为起点，将有可能导致条形图显示错误的比例关系。

* **Do**

  - 如果分类之间的序列关系(ranking)有意义且不是时间周期，可以考虑将数据进行排序。
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

数据源为对象集合，例如：[{ segment: 分类一, value: 20 }, { segment: 分类二, value: 20 }]。

### xField: string

**required**

条形在 x 方向长度映射对应的数据字段名，一般对应一个离散字段。

### yField: string

**required**

条形在 y 方向位置映射所对应的数据字段名，一般对应一个分类字段。

### colorField: string

**optional**

条形颜色映射对应的数据字段名。

### color: string | string[] | function

**optional**

指定条形颜色。如不进行配置则采用 theme 中的配色。

### barSize: number

**optional**

设置条形的高度为一个固定值。

### barStyle: object | function

**optional**

配置条形样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度<br />

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### tooltip

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### legend

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### label

**optional**

`visible: boolean`    图形标签是否显示<br />
`position: 'top' | 'middle' | 'bottom'`    图形标签相对于柱形的位置<br />
`formatter: (text: string, item: object, index: number) => string` 对 label 的显示文本进行格式化。<br />`offsetX: number`    在 label 位置的基础上再往 x 方向的偏移量。<br />
`offsetY: number`    在 label 位置的基础上再往 y 方向的偏移量。<br />
`style: object`    配置 label 文本

### events

**optional**

- 图形事件
  `onBarClick: function`  条形点击事件<br />
  `onBarDblClick: function`  条形双击事件<br />
  `onBarMousemove: function`  条形鼠标移动事件<br />
  `onBarContextmenu: function`    条形右键事件

- 其他事件类型见[通用图表配置](../generalConfig.zh-CN.md)。
