---
title: Bullet
order: 26
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*u4fZSYLw-jMAAAAAAAAAAABkARQnAQ" width="600">


# 快速上手

```js
import { Bullet } from '@antv/g2plot';

const bulletPlot = new Bullet(document.getElementById('container'), {
  data: [
    {
      title: '满意度',
      measures: [83],
      targets: [90],
    },
  ],
  rangeMax: 100,
});

bulletPlot.render();

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

**必选**, *array object*

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，每条数据包括:

| title | string | 标题 |
| --- | --- | --- |
| measures | number[] | 进度值，支持阶段性的进度值 |
| targets | number | 目标值 |
| ranges | number[] | 进度条的色条范围区间，取值范围为[0, 1] |

 每条数据代表一个进度条，如 `[{ title: '满意度', measures: [91], target: 90, ranges: [0, 1] }]`

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


```js
const data = [
  { country: 'Asia', year: '1750', value: 502,},
  { country: 'Asia', year: '1800', value: 635,},
  { country: 'Europe', year: '1750', value: 163,},
  { country: 'Europe', year: '1800', value: 203,},
];

const areaPlot = new PercentageStackArea(document.getElementById('container'), {
  title: {
    visible: true,
    text: '百分比堆叠面积图',
  },
  data,
  // highlight-start
  meta: {
    year: {
      alias:'年份'
      range: [0, 1],
    },
    value: {
      alias: '数量',
      formatter:(v)=>{return `${v}个`}
    }
  },
  // highlight-end
  xField: 'year',
  yField: 'value',
  stackField: 'country',
});
areaPlot.render();

```

### rangeMax 📌
**必选**, *number*

[DEMO](../../../examples/bullet/basic#overflow)

功能描述： 进度条的色条范围区间最大值

默认配置： 无


### measureSize ✨
**可选**, *number*

功能描述： 实际进度条大小设置（即实际进度条的高度）。

默认配置：20


## 图形样式

### measureColors ✨
**可选**, *string[]*

功能描述： 设置进度条颜色，进度条的色条区间颜色依次取数组中的颜色色值

默认配置： theme默认色板


### rangeSize ✨
**可选**, *number*

功能描述：区间背景条大小设置，相对数值（相对于 measureSize）。

默认配置：1.2


### rangeColors ✨
**可选**, *string[]*

[DEMO](../../../examples/bullet/basic#color-range)

功能描述：设置进度条背景颜色，进度条的色条区间颜色依次取数组中的颜色色值

默认配置： theme默认色板

### markerSize ✨
**可选**, *number*

功能描述：目标值 marker 大小设置（即目标值 marker 的高度），相对数值（相对于 measureSize）。

默认配置：1.2


### markerColors ✨
**可选**, *string[]*

功能描述：设置进度条目标值颜色


### markerStyle ✨
**可选**, *object*

功能描述：目标值 marker 的样式设置。

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| width | number | marker 的 宽度，默认为 1。 |
| fill | string | marker 的填充色 |


## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*M0UBQaOh5XgAAAAAAAAAAABkARQnAQ" width="600">

### title
**可选**, *optional*

[DEMOS](../../../examples/general/title-description)

功能描述： 配置图表的标题，默认显示在图表左上角。

默认配置：
```js
visible: false,
alignTo: 'left',
text:'',
style:{
    fontSize: 18,
    fill: 'black',
}
```
| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| alignTo | string | 位置，支持三种配置：<br />'left' | 'middle' | 'right' |
| style | object | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### description
**可选**, *optional*

[DEMOS](../../../examples/general/title-description)

功能描述： 配置图表的描述，默认显示在图表左上角，标题下方。

默认配置：
```js
visible: false,
alignTo: 'left',
text:'',
style:{
    fontSize: 12,
    fill: 'grey',
}
```
| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| alignTo | string | 位置，支持三种配置：<br />'left' | 'middle' | 'right' |
| style | object | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### axis
**可选**, *object*

功能描述： 坐标轴，用于展示横方向上对应的映射信息

默认配置：

```js
visible: false,
position: 'before',
tickCount: 6,
formatter: (text, idx) => `${idx}`,
style: {
    fill: 'rgba(0, 0, 0, 0.25)',
    textBaseline: 'middle',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
},
tickLine: {
    visible: true,
    lineWidth: 1,
    stroke: '#FFF',
    lineDash: [4, 2],
},
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| position | string | 坐标轴位置。可选值： `before | after`。默认为 `before` ，代表坐标轴在上方 |
| tickCount | number | 坐标轴刻度数量 |
| tickInterval | number | 坐标轴刻度间隔 |
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化<br />- suffix: string 后缀<br />- precision：number  标签精度，如配置为 2，则格式化为 2 位小数<br />- mask: string 为日期文本添加格式化遮罩，当坐标轴type为time时生效<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br /> |
| tickLine | object | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br /> |


### legend
**可选**, *object*

[DEMOS1](../../../examples/bullet/basic#color-range)
[DEMOS2](../../../examples/bullet/basic#group-color-range)

功能描述：图例，用于展示颜色分类信息

默认配置：
```js
visible: true,
position: 'bottom',
flipPage: true
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| position | string | 位置，支持12方位布局<br />top-left, top-center,top-right<br />bottom-left,bottom-center,bottom-right<br />left-top,left-center,left-bottom<br />right-top,right-center,right-bottom |
| formatter | function | 对图例显示信息进行格式化 |
| offsetX | number | 图例在 position 的基础上再往 x 方向偏移量，单位 px |
| offestY | number | 图例在 position 的基础上再往 y 方向偏移量，单位 px |
| title | object | 图例标题<br />- visible: boolean 是否显示<br />- text: string 图例文本，如不配置则自动取对应字段名<br />- style: object 标题样式<br /> |
| marker | object | 图例 marker<br />- symbol: string marker符号，默认为 'circle'。可选类型：circle,square,diamond,triangle,triangleDown,hexagon,bowtie,cross,tick,plus,hyphen,line,hollowCircle,hollowSquare,hollowDiamond<br />- style: object marker样式，其中 `r` 配置marker的大小，其余样式参数参考绘图属性文档。<br /> |
| text | object | 图例文本<br />- style: object 配置图例文本样式<br />- formatter:(text,cfg)=>string 格式化图例文本<br /> |

**子弹图图例可以通过`custom`的方式定制，目前图例不支持“点击交互”**

### tooltip
**可选**, *object*

功能描述：信息提示框

默认配置：
```js
visible: true,
offset: 20,
```

| 细分属性 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| offset | number | 距离鼠标位置偏移值 |
| shared | boolean | 是否同时显示多条数据 |
| domStyles | object | 配置tooltip样式<br />- g2-tooltip: object 设置tooltip容器的CSS样式<br />- g2-tooltip-title: object 设置tooltip标题的CSS样式<br />- g2-tooltip-list: object 设置tooltip列表容器的CSS 样式<br />- g2-tooltip-marker: object 设置tooltip列表容器中每一项 marker的CSS样式<br />- g2-tooltip-value: object 设置tooltip 列表容器中每一项 value的CSS样式<br /> |

## 事件

### 实际值图形事件

| onBulletClick<br />实际值图形点击事件 | onBulletDblClick<br />实际值图形双击事件 | onBulletDblClick<br />实际值图形双击事件 | onLineMouseleave<br />实际值图形鼠标离开事件 |
| --- | --- | --- | --- |
| onBulletMousemove<br />实际值图形鼠标移动事件 | onBulletMousedown<br />实际值图形鼠标按下事件 | onBulletMouseup<br />实际值图形鼠标松开事件 | onBulletMouseenter<br />实际值图形鼠标进入事件 |

### 目标值图形事件

| onBulletTargetClick<br />目标值图形点击事件 | onBulletTargetDblClick<br />目标值图形双击事件 | onBulletTargetDblClick<br />目标值图形双击事件 | onBulletTargetMouseleave<br />目标值图形鼠标离开事件 |
| --- | --- | --- | --- |
| onBulletTargetMousemove<br />目标值图形鼠标移动事件 | onBulletTargetMousedown<br />目标值图形鼠标按下事件 | onBulletTargetMouseup<br />目标值图形鼠标松开事件 | onBulletTargetMouseenter<br />目标值图形鼠标进入事件 |


### 图表区域事件

| onPlotClick<br />图表区域点击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotMouseleave<br />图表区域鼠标离开事件 |
| --- | --- | --- | --- |
| onPlotMousemove<br />图表区域鼠标移动事件 | onPlotMousedown<br />图表区域鼠标按下事件 | onPlotMouseup<br />图表区域鼠标松开事件 | onPlotMouseenter<br />图表区域鼠标进入事件 |


### 图例事件

| onLegendClick<br />图例点击事件 | onLegendDblClick<br />图例双击事件 | onLegendMouseenter<br />图例鼠标进入事件 | onLegendMouseleave<br />图例鼠标离开事件 |
| --- | --- | --- | --- |
| onLegendMousemove<br />图例鼠标移动事件 | onLegendMousedown<br />图例鼠标按下事件 | onLegendMouseup<br />图例鼠标松开事件 | onLegendMouseenter<br />图例鼠标进入事件 |


### 坐标轴事件

| onAxisClick<br />坐标轴点击事件 | onAxisDblClick<br />坐标轴双击事件 | onAxisDblClick<br />坐标轴双击事件 | onAxisMouseleave<br />坐标轴鼠标离开事件 |
| --- | --- | --- | --- |
| onAxisMousemove<br />坐标轴鼠标移动事件 | onAxisMousedown<br />坐标轴鼠标按下事件 | onAxisMouseup<br />坐标轴鼠标松开事件 | onAxiMouseenter<br />坐标轴鼠标进入事件 |


### 标题事件

| onTitleClick<br />标题点击事件 | onTitleDblClick<br />标题双击事件 | onTitleDblClick<br />标题双击事件 | onTitleMouseleave<br />标题鼠标离开事件 |
| --- | --- | --- | --- |
| onTitleMousemove<br />标题鼠标移动事件 | onTitleMousedown<br />标题鼠标按下事件 | onTitleMouseup<br />标题鼠标松开事件 | onTitleMouseenter<br />标题鼠标进入事件 |


### 描述事件

| onDescriptionClick<br />标题点击事件 | onDescriptionDblClick<br />标题双击事件 | onDescriptionDblClick<br />标题双击事件 | onDescriptionMouseleave<br />标题鼠标离开事件 |
| --- | --- | --- | --- |
| onDescriptionMousemove<br />标题鼠标移动事件 | onDescriptionMousedown<br />标题鼠标按下事件 | onDescriptionMouseup<br />标题鼠标松开事件 | onDescriptionMouseenter<br />标题鼠标进入事件 |



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

## changeData()

**可选**

更新图表数据。`updateConfig()`方法会导致图形区域销毁并重建，如果只进行数据更新，而不涉及其他配置项更新，推荐使用本方法。

```js
plot.changeData(newData);
```

## repaint()

**可选**

图表画布重绘。

## destroy()

**可选**

销毁图表。

## getData()

获取图表数据。

## getPlotTheme()

获取图表 theme。
