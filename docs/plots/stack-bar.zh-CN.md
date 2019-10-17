# Stacked-Bar 堆叠条形图

## 图表故事

堆叠条形图是基础条形图的扩展形式，将每个条形进行分割，以显示大类目下的细分类目占比情况。堆叠条形图可以展示更多维度的数据：大类目之间的数值比较、大类目下各细分类目的占比情况、不同大类目下同一细分类目的横向数值比较。

堆叠条形图的一个缺点是堆叠太多时会导致数据很难区分对比，同时很难对比不同分类下相同维度的数据，因为它们不是按照同一基准线对齐的。

## 数据类型

堆叠条形图适合的数据类型为两个**分类字段**(分类字段、堆叠字段)和一个**连续字段**(数值)。在下面这个例子中，`type`为分类数据字段，`quarter`为堆叠数据字段，`value`为离散数据字段。

```
const data = [
  {type:'a',quarter:'Q1',value: 100},
  {type:'a',quarter:'Q2',value: 70},
  {type:'a',quarter:'Q3',value: 20},
  {type:'b',quarter:'Q1',value: 10},
  {type:'b',quarter:'Q2',value: 50},
  {type:'b',quarter:'Q3',value: 40},
  {type:'c',quarter:'Q1',value: 30},
  {type:'c',quarter:'Q2',value: 50},
  {type:'c',quarter:'Q3',value: 20},
 ];
```

图表绘制时，每一个分类对应一个条形，映射到 y 轴，而堆叠字段决定条形被如何分割，连续字段决定每块细分的宽度，映射到 x 轴，细分宽度之和即是条形的总体长度。

## 图表用法

- **Dont's**
  - 分类数目过多，这将使数据变得难以比较
  - x 轴不以 0 值为起点，将有可能导致显示错误的比例关系

* **Do**

  - 极小值会让细分类目难以用视觉辨认，可以将极小值进行合并

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

#### stackField: string

**required**

数据集中的分组字段名，通过该字段的值，条形将会被分割为多个部分，通过颜色进行区分。

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

### 与基础条形图相同的配置

#### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一, value: 20 }, { segment: 分类二, value: 20 }]。

#### xField: string

**required**

条形在 x 方向长度映射对应的数据字段名，一般对应一个离散字段。

#### yField: string

**required**

条形在 y 方向位置映射所对应的数据字段名，一般对应一个分类字段。

#### colorField: string

**optional**

条形颜色映射对应的数据字段名。

#### color: string | string[] | function

**optional**

指定条形颜色。如不进行配置则采用 theme 中的配色。

#### barSize: number

**optional**

设置条形的高度为一个固定值。

#### barStyle: object | function

**optional**

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

- 其他事件类型见[通用图表配置](../generalConfig.zh-CN.md)。
