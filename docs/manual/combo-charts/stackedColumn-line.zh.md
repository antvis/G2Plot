---
title: StackedColumnLine - 堆叠柱+折线线混合图表
order: 3
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*S7V_SbjUSwsAAAAAAAAAAABkARQnAQ" width="600">

# 快速上手

```js
import { StackedColumnLine } from '@antv/g2plot';

const uvBillData = [
  { time: '2019-03', value: 350, type: 'uv' },
  { time: '2019-04', value: 900, type: 'uv' },
  { time: '2019-05', value: 300, type: 'uv' },
  { time: '2019-06', value: 450, type: 'uv' },
  { time: '2019-07', value: 470, type: 'uv' },
  { time: '2019-03', value: 220, type: 'bill' },
  { time: '2019-04', value: 300, type: 'bill' },
  { time: '2019-05', value: 250, type: 'bill' },
  { time: '2019-06', value: 220, type: 'bill' },
  { time: '2019-07', value: 362, type: 'bill' },
];

const transformData = [
  { time: '2019-03', count: 800 },
  { time: '2019-04', count: 600 },
  { time: '2019-05', count: 400 },
  { time: '2019-06', count: 380 },
  { time: '2019-07', count: 220 },
];

const columnLine = new StackedColumnLine(document.getElementById('container'), {
  data: [uvBillData, transformData],
  xField: 'time',
  yField: ['value', 'count'],
  stackField: 'type',
});
columnLine.render();

```

# 配置属性

## 图表容器

### width

**可选**, *number*

功能描述： 设置图表宽度。

默认配置： `400`

### height

**可选**, *number*

功能描述： 设置图表高度。

默认配置： `400`

### forceFit

**可选**, *boolean*

功能描述： 图表是否自适应容器宽高。当 `forceFit` 设置为true时，`width` 和 `height` 的设置将失效。

默认配置： `true`

### pixelRatio

**可选**, *number*

功能描述： 设置图表渲染的像素比

默认配置： `2`

### renderer

**可选**, *string*

功能描述: 设置图表渲染方式为 `canvas` 或 `svg`

默认配置： `canvas`


## 数据映射


### data 📌

**必选**, *arrayObject[]*

功能描述： 设置图表两份数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。
在双轴图中，需要指定两份数据源用以渲染双折线。第一份为柱形图数据，第二份为折线数据。


### meta
**可选**, *object*

功能描述： 全局化配置图表数据元信息，以字段为单位进行配置。在 meta 上的配置将同时影响所有组件的文本信息。

默认配置： 无

| 细分配置项名称 | 类型 | 功能描述 |
| --- | --- | --- |
| alias | *string* | 字段的别名 |
| formatter | *function* | callback方法，对该字段所有值进行格式化处理 |
| values | *string[]* | 枚举该字段下所有值 |
| range | *number[]* | 字段的数据映射区间，默认为[0,1] |


### xField 📌
**必选**, *string*

功能描述： 图形在 x 方向（横向延伸）对应的数据字段名，一般对应一个连续字段。柱线双轴图的x字段必需一致，否则图表将不进行渲染。

默认配置： 无


### yField 📌
**必选**, *string[]*

功能描述： 图形在 y 方向对应的数据字段名，一般对应分类字段。

柱线双轴图需要对的y字段进行分别指定，顺序为柱线图y字段、折线图y字段。

默认配置： 无

### columnStackField 📌
**必选**, *string*

数据集中的分组字段名，通过该字段的值，柱子将会被分割为多个部分，通过颜色进行区分。

默认配置： 无


### lineSeriesField
**可选**, *string*

功能描述： 多折线必选。 数据集中的分组字段名，一般对应一个分类字段。通过该字段的值，折线将会被分为多个组，通过颜色进行区分，视觉上呈现为多条折线。

注意： 在本图表内配置多折线会导致可视化指标过多，使图表失去可读性，该配置不推荐用户使用。

默认配置： 无


## 图形样式

### columnConfig
**可选**, *object*

配置柱线混合图的柱形样式。


#### color
**可选**, *string[] | Function*

功能描述： 指定柱子颜色，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。

默认配置：采用 theme 中的色板。


#### columnSize
**可选**, *number*

功能描述： 设置柱形宽度。对于一般场景来说，柱形宽度会根据数据自行计算，不需特别指定。

默认配置： 无

#### columnStyle
**可选**, *object*

功能描述： 设置柱子样式。columnStyle中的`fill`会覆盖 `color` 的配置。columnStyle可以直接指定，也可以通过callback的方式，根据数据为每一根柱子指定单独的样式。

默认配置： 无


| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| fill | string | 填充颜色 |
| stroke | string | 描边颜色 |
| lineWidth | number | 描边宽度 |
| lineDash | number | 虚线描边 |
| opacity | number | 整体透明度 |
| fillOpacity | number | 填充透明度 |
| strokeOpacity | number | 描边透明度 |

#### label

功能描述： 柱形的标签文本

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| position | string | label的位置<br />- top 位于柱子顶部<br />- middle 位于柱子垂直中心<br />- bottom 位于柱子底部<br /> |
| formatter | function | 对文本标签内容进行格式化 |
| offsetX | number | 在 label 位置的基础上再往 x 方向的偏移量 |
| offsetY | number | 在 label 位置的基础上再往 y 方向的偏移量 |
| style | object | 配置文本标签样式。 |
| adjustColor | boolean | 文本标签颜色是否自动适应图形颜色，position为middle时有效。 |
| adjustPosition | boolean | 是否根据显示区域自动调整文本标签位置，position为middle时有效。如图形区域容纳不下label，则label位置自动调整至图形上方。 |


### lineConfig
**可选**, *object*

配置柱线混合图的折线样式。

#### color
**可选**, *string | string[]*

功能描述： 指定折线颜色。不配置lineSeriesField时显示为单折线，此时color传入一个颜色值即可，而配置lineSeriesField时显示为多条折线，color需要传入一个数组。

默认配置：采用 theme 中的色板。

#### lineSize
**可选**, *number*

功能描述： 设置折线宽度

默认配置： `2`

#### lineStyle
**可选**, *object*

功能描述： 设置折线样式。linsStyle中的`lineWidth`会覆盖 `lineSize` 的配置，`stroke`会覆盖`color`的设置。

#### smooth
**可选**, *boolean*

功能描述： 是否将折线绘制为曲线 (spline)。

默认配置: `false`

#### point
**可选**, *object*

功能描述： 配置折线上的点

默认配置：
```js
visible: false,
shape: 'circle',
size: 3,
style: {
    stroke: '#fff',
},
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| shape | string | 数据点形状 |
| size | number | 数据点大小 |
| style | object | 数据点样式<br />- fill: string  填充色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

#### label

功能描述： 折线的标签文本

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| formatter | function | 对文本标签内容进行格式化 |
| offsetX | number | 在 label 位置的基础上再往 x 方向的偏移量 |
| offsetY | number | 在 label 位置的基础上再往 y 方向的偏移量 |
| style | object | 配置文本标签样式。 |

## 图表组件

### title
**可选**, *optional*

功能描述： 配置图表的标题，默认显示在图表左上角。

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| alignTo | string | 位置，支持三种配置：<br />'left' | 'middle' | 'right' |
| style | object | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### description
**可选**, *optional*

功能描述： 配置图表的描述，默认显示在图表左上角，标题下方。

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| alignTo | string | 位置，支持三种配置：<br />'left' | 'middle' | 'right' |
| style | object | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### xAxis
**可选**, *object*

功能描述： x方向上的坐标轴，用于展示xField对应的映射信息

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| type | string | 坐标轴类型<br />- 'time'：时间轴，<br />- 'linear': 连续轴<br /> |
| tickCount | number | 坐标轴刻度数量 |
| tickInterval | number | 坐标轴刻度间隔 |
| line | object | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br /> |
| grid | object | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br /> |
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化<br />- suffix: string 后缀<br />- precision：number  标签精度，如配置为 2，则格式化为 2 位小数<br />- mask: string 为日期文本添加格式化遮罩，当坐标轴type为time时生效<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br /> -autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转 |
| tickLine | object | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br /> |
| title | object | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br /> |

### yAxis
**可选**, *object*

双折线图的Y轴是双轴，分别位于图表区域的左右两端，其中左侧的Y轴对应柱形，右侧的Y轴对应折线。双Y轴有一些顶层配置，同时，也开放分别对两个轴进行配置。

#### min
**可选**, *number*

设置坐标轴最小值，该配置为顶层配置，同时影响两个Y轴。


#### max
**可选**, *number*

设置坐标轴最大值，该配置为顶层配置，同时影响两个Y轴。


#### tickCount
**可选**, *number*

设置坐标轴刻度数量，该配置为顶层配置，同时影响两个Y轴。

#### leftConfig
**可选**, *object*

左Y轴的细节配置。

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| line | object | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br /> |
| grid | object | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br /> |
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化 DEMO<br />- suffix: string 后缀<br />- precision：number  标签精度，如配置为 2，则格式化为 2 位小数<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br /> -autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转 |
| tickLine | object | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br /> |
| title | object | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br /> |

#### rightConfig
**可选**, *object*

右Y轴的细节配置，详细配置与`leftConfig`相同。


### legend
**可选**, *object*

功能描述：图例，用于展示双折线分类信息

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| marker | object | 图例 marker<br />- symbol: string marker符号，默认为 'circle'。可选类型：circle,square,diamond,triangle,triangleDown,hexagon,bowtie,cross,tick,plus,hyphen,line,hollowCircle,hollowSquare,hollowDiamond<br />- style: object marker样式，其中 `r` 配置marker的大小，其余样式参数参考绘图属性文档。<br /> |


### tooltip
**可选**, *object*

功能描述：信息提示框

| 细分属性 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| domStyles | object | 配置tooltip样式<br />- g2-tooltop: object 设置tooltip容器的CSS样式<br />- g2-tooltip-title: object 设置tooltip标题的CSS样式<br />- g2-tooltip-list: object 设置tooltip列表容器的CSS 样式<br />- g2-tooltip-marker: object 设置tooltip列表容器中每一项 marker的CSS样式<br />- g2-tooltip-value: object 设置tooltip 列表容器中每一项 value的CSS样式<br /> |


## 事件

参见折线图事件


# 图表方法

## render() 📌

**必选**

渲染图表。

## updateConfig()

**可选**

更新图表配置项。

```js
plot.updateConfig({
  width: 500,
  height: 600,
  legend: {
    visible: false,
  },
});
plot.render();
```

## changeData(data: DataItem[][])

**可选**

更新图表数据。`updateConfig()`方法会导致图形区域销毁并重建，如果只进行数据更新，而不涉及其他配置项更新，推荐使用本方法。
请注意在双轴图使用changeData方法需传入两份数据。

```js
plot.changeData(newData);
```

## changeDataByIndex(data, index)

**可选**

更新指定折线数据，其中data为要更新的数据源，index为对应的折线序列(index为0时更新左轴折线数据，index为1是更新右轴折线数据)

```js
plot.changeData(newData,0);
```

## repaint()

**可选**

图表画布重绘。

## destroy()

**可选**

销毁图表。