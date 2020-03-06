---
title: Histogram - 直方图
order: 6
---

 <div data-card-type="block" data-lake-card="table" id="pLwYV" class="">
    <table class="lake-table" style="width: 735px; outline: none; border-collapse: collapse;">
      <colgroup>
        <col width="395" span="1">
        <col width="340" span="1">
      </colgroup>
      <tbody>
        <tr style="height: 33px;">
          <td colspan="1" rowspan="4" style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span data-card-type="inline" data-lake-card="image" contenteditable="false"><img data-role="image" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*p4SPRYI3UfIAAAAAAAAAAABkARQnAQ" data-raw-src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*p4SPRYI3UfIAAAAAAAAAAABkARQnAQ" class="image lake-drag-image" alt="屏幕快照 2020-03-05 下午7.26.23.png" title="屏幕快照 2020-03-05 下午7.26.23.png" style="border: none; box-shadow: none; width: 372px; height: 402px; visibility: visible;"></span></p>
          </td>
          <td style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">定义</span></span></strong><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"><br></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">直方图是一种统计报告图，由一系列高度不等的纵向条纹或线段表示数据分布的情况。</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">视觉通道</span></span></strong><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"><br></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">位置</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">分析目的</span></span></strong></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">比较、趋势</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">数据准备</span></span></strong><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;"><br></span><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">1 个「时间」或「有序名词」字段</span></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">0 ~ 1 个「无序名词」字段</span></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">1 个「数值」字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

# 快速上手

```js
import { Histogram } from '@antv/g2plot';

const data = [
  { value: 1.2 },
  { value: 3.4 },
  { value: 3.7 },
  { value: 4.3 },
  { value: 5.2 },
  { value: 5.8 },
  { value: 6.1 },
  { value: 6.5 },
  { value: 6.8 },
  { value: 7.1 },
  { value: 7.3 },
  { value: 7.7 },
  { value: 8.3 },
  { value: 8.6 },
  { value: 8.8 },
  { value: 9.1 },
  { value: 9.2 },
  { value: 9.4 },
  { value: 9.5 },
  { value: 9.7 },
  { value: 10.5 },
  { value: 10.7 },
  { value: 10.8 },
  { value: 11.0 },
  { value: 11.0 },
  { value: 11.1 },
  { value: 11.2 },
  { value: 11.3 },
  { value: 11.4 },
  { value: 11.4 },
  { value: 11.7 },
  { value: 12.0 },
  { value: 12.9 },
  { value: 12.9 },
  { value: 13.3 },
  { value: 13.7 },
  { value: 13.8 },
  { value: 13.9 },
  { value: 14.0 },
  { value: 14.2 },
  { value: 14.5 },
  { value: 15 },
  { value: 15.2 },
  { value: 15.6 },
  { value: 16.0 },
  { value: 16.3 },
  { value: 17.3 },
  { value: 17.5 },
  { value: 17.9 },
  { value: 18.0 },
  { value: 18.0 },
  { value: 20.6 },
  { value: 21 },
  { value: 23.4 },
];

const histogramPlot = new Histogram(document.getElementById('container'), {
  data,
  binField: 'value',
  binNumber: 6,
});
histogramPlot.render();

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

### data

**必选**, *array object*

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ type: 'a'，value: 20 }, { type: 'b'，value: 20 }]`。

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

### binField
**必选**, *string*

功能描述： 设置直方图绘制 (进行分箱) 的字段

默认配置： 无


### binWidth
**可选**, *number*

[DEMO](https://g2plot.antv.vision/zh/examples/column/histogram#histogram-binWidth)

功能描述： 设置直方图的分箱宽度，binWidth影响直方图分成多少箱。

注意：binWidth 和 binNumber 只能选择一个进行配置，默认采用binWidth.

默认配置： 自动计算


### binNumber
**可选**, *number*

[DEMO](https://g2plot.antv.vision/zh/examples/column/histogram#histogram-binNumber)

功能描述： 设置直方图的分箱数量，binNumber影响直方图分箱后每个柱子的宽度。

注意：binWidth 和 binNumber 只能选择一个进行配置，默认采用binWidth.

默认配置： 无


## 图形样式

### color
**可选**, *string*

功能描述： 指定直方图柱形颜色。

默认配置：采用 theme 中的色板。


### columnStyle
**可选**, *object*

功能描述： 设置直方图柱子样式。columnStyle中的`fill`会覆盖 `color` 的配置。
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

## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*998oTou8UhAAAAAAAAAAAABkARQnAQ" width="600">

### title
**可选**, *optional*

[DEMOS](https://g2plot.antv.vision/zh/examples/general/title-description)

功能描述： 配置图表的标题，默认显示在图表左上角。

默认配置：
```js
visible: false,
position: 'left',
text:'',
style:{
    fontSize: 18,
    fill: 'black',
}
```
| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| position | string | 位置，支持三种配置：<br />'left' | 'middle' | 'right' |
| style | object | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### description
**可选**, *optional*

[DEMOS](https://g2plot.antv.vision/zh/examples/general/title-description)

功能描述： 配置图表的描述，默认显示在图表左上角，标题下方。

默认配置：
```js
visible: false,
position: 'left',
text:'',
style:{
    fontSize: 12,
    fill: 'grey',
}
```
| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| position | string | 位置，支持三种配置：<br />'left' | 'middle' | 'right' |
| style | object | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### xAxis
**可选**, *object*

[DEMOS](https://g2plot.antv.vision/zh/examples/general/axis)

功能描述： x方向上的坐标轴，用于展示xField对应的映射信息

默认配置：

```js
visible: true,
autoHideLabel: false,
autoRotateLabel: false,
autoRotateTitle: false,
grid: {
    visible: false,
},
line: {
    visible: true
},
tickLine: {
     visible: true,
},
label: {
    visible: true,
},
title: {
    visible: false,
    offset: 12,
},
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| autoRotateLabel | boolean | 是否自动旋转标签 |
| autoHideLabel | boolean | 是否自动隐藏标签 |
| line | object | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br /> |
| grid | object | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br /> |
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化<br />- suffix: string 后缀<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br /> |
| tickLine | object | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br /> |
| title | object | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br /> |

### yAxis
**可选**, *object*

[DEMOS](https://g2plot.antv.vision/zh/examples/general/axis)

功能描述： y方向上的坐标轴，用于展示yField对应的映射信息

默认配置： 
```js
visible: true,
autoHideLabel: false,
autoRotateLabel: false,
autoRotateTitle: true,
grid: {
    visible: true,
},
line: {
    visible: false,
},
tickLine: {
    visible: false,
},
label: {
    visible: true,
},
title: {
    visible: true,
    offset: 12,
},
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| autoRotateLabel | boolean | 是否自动旋转标签 |
| autoHideLabel | boolean | 是否自动隐藏标签 |
| tickCount | number | 坐标轴刻度数量 |
| tickInterval | number | 坐标轴刻度间隔 |
| min | number | 设置坐标轴最小值 |
| max | number | 设置坐标轴最大值 |
| line | object | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br /> |
| grid | object | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br /> |
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化 DEMO<br />- suffix: string 后缀<br />- precision：number  标签精度，如配置为 2，则格式化为 2 位小数<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br /> |
| tickLine | object | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br /> |
| title | object | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br /> |


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
| htmlContent | function | 自定义 tooltip，用户可以根据 htmlContent 方法返回的 title 和 items 两个参数定义 tooltip dom 节点的构成和显示方式。 |

htmlContent 用法示例：
```js
htmlContent: (title, items) => {
  return '<div><ul><li>.....</li></ul></div>';
};
```
此方法允许用户传入一个外部 dom 或 dom id 作为 tooltip 的容器：
```js
htmlContent: (title, items) => {
  return dom | dom.id;
};
```

### label

功能描述： 标签文本


默认配置：
```js
visible: false
position: 'top'
offsetX: 6
offsetY: 6
style:{
  fill: 'rgba(0, 0, 0, 0.65)',
  stroke: '#ffffff',
  lineWidth: 2,
},
adjustColor: true,
adjustPosition: false
```

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


### guideLine

**可选**, *object[]*

[DEMOS](https://g2plot.antv.vision/zh/examples/general/guideLine)

功能描述： 配置图表辅助线，支持同时配置多条。

默认配置： 无

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| type | string | 含有统计意义的辅助线类型，可选类型为 max | min | median | mean<br />*注意：如指定了辅助线类型，则不需要配置辅助线的start和end。 |
| start | array | 指定辅助线起始位置，如不配置`type`，则该辅助线为自定义辅助线，`start`是必选项。<br/>支持两种配置形式，两者不能混用：<br />- 原始数据值，如 ['2010-01-01', 100]<br />- 绘图区域百分比位置，如 ['50%', '50%']<br /> |
| end | array | 指定辅助线终止位置，如不配置`type`，则该辅助线为自定义辅助线，end 是必选项。<br/>支持两种数据形式，两者不能混用：<br />- 原始数据值，如 ['2010-01-01', 100]<br />- 绘图区域百分比位置，如 ['50%', '50%']<br /> |
| lineStyle | object | 配置辅助线样式。 |
| text | object | 设置辅助线文本。<br />- position: string 辅助线文本位置，可选项：start、center、end<br />- content: string 辅助线文本内容<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY: number 位置在y方向上的偏移量<br />- style: object 文本样式<br /> |
|  |  |  |


配置统计辅助线示例代码：

```js
{
  guideLine: [
    {
      type: 'mean',
      lineStyle: {},
      text: {},
    },
  ],
}
```

配置自定义辅助线示例代码：

```js
{
  guideLine: [
    {
      start: ['2010-01-01', 100] || ['0%', '50%'],
      end: ['2010-01-10', 50] || ['100%', '80%'],
      lineStyle: {},
      text: {},
    },
  ],
}
```


## 事件

### 柱形图形事件

| onColumnClick<br />柱形点击事件 | onColumnDblClick<br />柱形双击事件 | onColumnDblClick<br />柱形双击事件 | onColumnMouseleave<br />柱形鼠标离开事件 |
| --- | --- | --- | --- |
| onColumnMousemove<br />柱形鼠标移动事件 | onColumnMousedown<br />柱形鼠标按下事件 | onColumnMouseup<br />柱形鼠标松开事件 | onColumnMouseenter<br />柱形鼠标进入事件 |


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


### 图形标签事件

| onLabelClick<br />图形标签点击事件 | onLabelDblClick<br />图形标签双击事件 | onLabelDblClick<br />图形标签双击事件 | onLabelMouseleave<br />图形标签鼠标离开事件 |
| --- | --- | --- | --- |
| onLabelMousemove<br />图形标签鼠标移动事件 | onLabelMousedown<br />图形标签鼠标按下事件 | onLabelMouseup<br />图形标签鼠标松开事件 | onLabelMouseenter<br />图形标签鼠标进入事件 |


### 标题事件

| onTitleClick<br />标题点击事件 | onTitleDblClick<br />标题双击事件 | onTitleDblClick<br />标题双击事件 | onTitleMouseleave<br />标题鼠标离开事件 |
| --- | --- | --- | --- |
| onTitleMousemove<br />标题鼠标移动事件 | onTitleMousedown<br />标题鼠标按下事件 | onTitleMouseup<br />标题鼠标松开事件 | onTitleMouseenter<br />标题鼠标进入事件 |


### 描述事件

| onDescriptionClick<br />标题点击事件 | onDescriptionDblClick<br />标题双击事件 | onDescriptionDblClick<br />标题双击事件 | onDescriptionMouseleave<br />标题鼠标离开事件 |
| --- | --- | --- | --- |
| onDescriptionMousemove<br />标题鼠标移动事件 | onDescriptionMousedown<br />标题鼠标按下事件 | onDescriptionMouseup<br />标题鼠标松开事件 | onDescriptionMouseenter<br />标题鼠标进入事件 |



## theme


## interaction
## 交互

### slider
**可选**, *object*

[DEMO](https://g2plot.antv.vision/zh/examples/column/basic#column-slider)

功能描述： 缩略轴 (slider) 交互适用于数据较多，用户希望关注数据集中某个特殊区间的场景。

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| height | number | slider高度 |
| start | number<br /> | 滑块初始开始位置，值域为[0,1] |
| end | number | 滑块初始结束位置，值域为[0,1] |
| trendCfg | object | 配置slider内的趋势组件<br />- smooth: boolean 趋势组件是否平滑<br />- isArea: boolean 趋势组件是都绘制为面积图，如设置false则绘制折线，默认false<br />- lineStyle: object 配置折线形态趋势组件的样式<br />- areaStyle: object 配置面积形态趋势组件的样式<br /> |
| backgroundStyle | object | 配置背景样式 |
| forgroundStyle | object | 配置前景样式 |
| handlerStyle | object | 配置滑块样式 |
| textStyle | object | 配置跟随滑块的文字样式 |
| minLimit | number | 允许滑动的最小位置，值域范围为[0,1] |
| maxLimit | number | 允许滑动的最大位置，值域范围为[0,1] |

### scrollBar
**可选**, *object*

[DEMO](https://g2plot.antv.vision/zh/examples/column/basic#column-scrollbar)

功能描述： 配置横向滚动条，适用于数据较多的场景。

示例代码：

```js
interactions: [
  {
    type: 'scrollbar',
    },
],
```


# 图表方法

## render()

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

## destory()

**可选**

销毁图表。

## getData()

获取图表数据。

## getPlotTheme()

获取图表 theme。
