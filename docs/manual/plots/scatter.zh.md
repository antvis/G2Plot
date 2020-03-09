---
title: Scatter - 散点图
order: 20
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
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span data-card-type="inline" data-lake-card="image" contenteditable="false"><img data-role="image" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*A9l6TqZB2v4AAAAAAAAAAABkARQnAQ" data-raw-src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*A9l6TqZB2v4AAAAAAAAAAABkARQnAQ" class="image lake-drag-image" alt="屏幕快照 2020-03-06 下午11.10.44.png" title="屏幕快照 2020-03-06 下午11.10.44.png" style="border: none; box-shadow: none; width: 372px; height: 448px; visibility: visible;"></span></p>
          </td>
          <td style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">定义</span></span></strong><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"><br></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">散点图是将所有的数据以不同颜色的点的形式展现在平面直角坐标系上的统计图表。</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">视觉通道</span></span></strong><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"><br></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">颜色、位置</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">分析目的</span></span></strong></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">分布</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">数据准备</span></span></strong><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;"><br></span><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">2 个「数值」字段</span></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">0 ~ 1 个「无序名词」字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

# 快速上手

```js
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const scatterPlot = new Scatter(document.getElementById('container'), {
  data: data,
  xField: 'year',
  yField: 'value'
});

scatterPlot.render();

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

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

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

### xField
**必选**, *string*

功能描述： 点形状在 x 方向位置映射对应的数据字段名，一般对应一个连续字段。

默认配置： 无

### yField
**必选**, *string*

功能描述： 点形状在 y 方向位置映射所对应的数据字段名，一般对应一个连续字段。

默认配置： 无


### colorField

**可选**, *string*

功能描述:  点颜色映射对应的数据字段名。


## 图形样式

### color
**可选**, *string | string[] | Function*

[**DEMO1**](https://g2plot.antv.vision/zh/examples/scatter/basic#color-mapping)

功能描述： 指定点的颜色。如没有配置colorField,指定一个单值即可。对colorFiled进行了配置的情况下，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。

默认配置：采用 theme 中的色板。

```js
// 设置单一颜色
color:'#a8ddb5'
// 设置多色
colorField:'type',
color:['#d62728', '#2ca02c', '#000000']
```

### pointSize
**可选**, *number*

功能描述： 设置点的大小

默认配置： `2`


### pointStyle
**可选**, *object*

[**DEMO**](https://g2plot.antv.vision/zh/examples/scatter/basic#color-mapping)

功能描述： 设置折线样式。pointStyle中的`fill`会覆盖 `color` 的配置。pointtyle可以直接指定，也可以通过callback的方式，根据数据指定单独的样式。

默认配置： 


| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| fill | string | 填充颜色 |
| stroke | string | 描边颜色 |
| lineWidth | number | 线宽 |
| lineDash | number | 虚线显示 |
| opacity | number | 透明度 |
| fillOpacity | number | 填充透明度 |
| strokeOpacity | number | 描边透明度 |


## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*PqKZQrPXtT0AAAAAAAAAAABkARQnAQ" width="600">

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

功能描述： x方向上的坐标轴，用于展示xField对应的映射信息

[DEMOS](https://g2plot.antv.vision/zh/examples/general/axis)

默认配置：

```js
visible: true,
autoHideLabel: false,
autoRotateLabel: false,
autoRotateTitle: false,
grid: {
    visible: true,
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
},
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| autoRotateLabel | boolean | 是否自动旋转标签 |
| autoHideLabel | boolean | 是否自动隐藏标签 |
| tickCount | number | 坐标轴刻度数量 |
| tickInterval | number | 坐标轴刻度间隔 |
| line | object | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br /> |
| grid | object | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br /> |
| label | object | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化<br />- suffix: string 后缀<br />- precision：number  标签精度，如配置为 2，则格式化为 2 位小数<br />- mask: string 为日期文本添加格式化遮罩，当坐标轴type为time时生效<br />- offsetX: number 位置在x方向上的偏移量<br />- offsetY：number 位置在y方向上的偏移量<br />- style：object 样<br /> |
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
    visible: true,
},
tickLine: {
    visible: true,
},
label: {
    visible: true,
},
title: {
    visible: false,
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

### legend
**可选**, *object*

[DEMOS](https://g2plot.antv.vision/zh/examples/general/legend#legend-position)

功能描述：图例，配置了 `colorField` 时显示，用于展示颜色分类信息

默认配置：
```js
visible: true,
position: 'bottom',
flipPage: true
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否可见 |
| position | string | 位置，支持12方位布局<br />top-left, top-center,top-right<br />botton-left,bottom-center,bottom-right<br />left-top,left-center,left-bottom<br />right-top,right-center,right-bottom |
| formatter | function | 对图例显示信息进行格式化 |
| flipPage | boolean | 图例过多时是否翻页显示 |
| offsetX | number | 图例在 position 的基础上再往 x 方向偏移量，单位 px |
| offestY | number | 图例在 position 的基础上再往 y 方向偏移量，单位 px |
| marker | string | 图例 marker，默认为 'circle'<br />可选类型：`circle`,`square`,`diamond`,`triangle`,`triangleDown`,`hexagon`,`bowtie`,`cross`,`tick`,`plus`,`hyphen`,`line`,`hollowCircle`,`hollowSquare`,`hollowDiamond` |

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
offsetX: 6
offsetY: 6
style:{
  fill: 'rgba(0, 0, 0, 0.65)',
  stroke: '#ffffff',
  lineWidth: 2,
}
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| formatter | function | 对文本标签内容进行格式化 |
| offsetX | number | 在 label 位置的基础上再往 x 方向的偏移量 |
| offsetY | number | 在 label 位置的基础上再往 y 方向的偏移量 |
| style | object | 配置文本标签样式。 |


### quadrant
**可选**， *object*

[DEMO](https://g2plot.antv.vision/zh/examples/bubble/basic#quadrant)

功能描述： 四象限组件。将图表区域进行象限划分，用以展示线性数据的分类趋势。

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| xBaseline | number | x方向上的象限分割基准线，默认为0 |
| yBaseline | number | y方向上的象限分割基准线，默认为0 |
| lineStyle | object | 配置象限分割线的样式 |
| regionStyle | object | function | 配置象限分割线的样式，按照象限区域依次配置，顺序为左上-左下-右上-右下。也支持以callback的方式进行配置 |
| label | object | 为象限配置说明文本<br />- text: string[] | function 配置象限文本内容，按照象限区域依次配置，顺序为左上-左下-右上-右下。也支持以callback的方式进行配置<br />- style: object 配置象限文本内容，按照象限区域依次配置，顺序为左上-左下-右上-右下。也支持以callback的方式进行配置<br /> |

完整示例：

```js
const scatterPlot = new Scatter(document.getElementById('container'), {
      data,
      xField: 'Revenue (Millions)',
      yField: 'Rating',
      // highlight-start
      quadrant:{
        xBaseline: 0,
        yBaseline: 5,
        lineStyle:{
          stroke:'black'
        },
        regionStyle:[
          {fill:'#f0f9e8',opacity:0.4},
          {fill:'white',opacity:0},
          {fill:'white',opacity:0},
          {fill:'#f0f9e8',opacity:0.4},
        ],
        label:{
          text: ['第一象限','第二象限','第三象限','第四象限'],
          style:{
            fill:'#ccc',
            fontSize: 16,
            opacity: 0.6
          }
      }
      // highlight-end
    });
    scatterPlot.render();
```
效果： <img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ptIxSpu2vxAAAAAAAAAAAABkARQnAQ' width='400'>

### trendLine
**可选**，*object*

[DEMO](https://g2plot.antv.vision/zh/examples/scatter/basic#trendline)

功能描述： 趋势线组件，为图表田间回归曲线。

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| type | string | 趋势线类型，支持 `linear`  `exp`  `loess`  `log`  `poly`  `pow` `quad` 7种 |
| style | object | 配置趋势线样式 |
| showConfidence | boolean | 是否绘制置信区间曲线 |
| confidenceStyle | object | 配置置信区间样式 |

完整示例：

```js
const scatterPlot = new Scatter(document.getElementById('container'), {
      data,
      xField: 'x',
      yField: 'y',
      // highlight-start
      trendline:{
        type:'poly',
        style:{
            stroke:'black',
            lineWidth: 1
        },
        showConfidence: true,
        confidenceStyle: {
            fill:'red',
            opacity: 0.1
        }        
      }
      // highlight-end
    });
    scatterPlot.render();
```
效果：<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*K27lT5hfEx8AAAAAAAAAAABkARQnAQ" width="400">


## 事件

### 点图形事件

| onPointClick<br />点点击事件 | onPointDblClick<br />点双击事件 | onPointDblClick<br />点双击事件 | onPointMouseleave<br />点鼠标离开事件 |
| --- | --- | --- | --- |
| onPointMousemove<br />点鼠标移动事件 | onPlotMousedown<br />点鼠标按下事件 | onPointMouseup<br />点鼠标松开事件 | onPointMouseenter<br />点鼠标进入事件 |

### 趋势线事件

| onTrendlineClick<br />趋势线点击事件 | onTrendlineDblClick<br />趋势线双击事件 | onTrendlineDblClick<br />趋势线双击事件 | onTrendlineMouseleave<br />趋势线鼠标离开事件 |
| --- | --- | --- | --- |
| onTrendlineMousemove<br />趋势线鼠标移动事件 | onTrendlineMousedown<br />趋势线鼠标按下事件 | onTrendlineMouseup<br />趋势线鼠标松开事件 | onTrendlineMouseenter<br />趋势线鼠标进入事件 |

### 置信区间事件

| onConfidencelineClick<br />置信区间点击事件 | onConfidencelineDblClick<br />置信区间双击事件 | onConfidenceDblClick<br />置信区间双击事件 | onConfidenceMouseleave<br />置信区间鼠标离开事件 |
| --- | --- | --- | --- |
| onConfidenceMousemove<br />置信区间鼠标移动事件 | onConfidenceMousedown<br />置信区间鼠标按下事件 | onConfidenceMouseup<br />置信区间鼠标松开事件 | onConfidenceMouseenter<br />置信区间鼠标进入事件 |

### 象限区域事件

| onQuadrantClick<br />象限区域点击事件 | onQuadrantDblClick<br />象限区域双击事件 | onQuadrantDblClick<br />象限区域双击事件 | onQuadrantMouseleave<br />象限区域鼠标离开事件 |
| --- | --- | --- | --- |
| onQuadrantMousemove<br />象限区域鼠标移动事件 | onQuadrantMousedown<br />象限区域鼠标按下事件 | onQuadrantMouseup<br />象限区域鼠标松开事件 | onQuadrantMouseenter<br />象限区域鼠标进入事件 |


### 象限标签事件

| onQuadrantLabelClick<br />象限标签点击事件 | onQuadrantLabelDblClick<br />象限标签双击事件 | onQuadrantLabelDblClick<br />象限标签双击事件 | onQuadrantLabelMouseleave<br />象限标签鼠标离开事件 |
| --- | --- | --- | --- |
| onQuadrantLabelMousemove<br />象限标签鼠标移动事件 | onQuadrantLabelMousedown<br />象限标签鼠标按下事件 | onQuadrantLabelMouseup<br />象限标签鼠标松开事件 | onQuadrantLabelMouseenter<br />象限标签鼠标进入事件 |


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
