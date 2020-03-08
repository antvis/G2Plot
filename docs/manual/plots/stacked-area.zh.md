---
title: StackedArea - 堆叠面积图
order: 2
---

<div data-card-type="block" data-lake-card="table" id="pLwYV" class="lake-card-embed-toolbar-active lake-activated">
    <table class="lake-table" style="width: 735px; outline: none; border-collapse: collapse;">
      <colgroup>
        <col width="395" span="1">
        <col width="340" span="1">
      </colgroup>
      <tbody>
        <tr style="height: 33px;">
          <td colspan="1" rowspan="4" style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span data-card-type="inline" data-lake-card="image" contenteditable="false"><img data-role="image" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*2tCTSq2_Oc8AAAAAAAAAAABkARQnAQ" data-raw-src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*2tCTSq2_Oc8AAAAAAAAAAABkARQnAQ" class="image lake-drag-image" alt="屏幕快照 2020-03-06 下午3.53.39.png" title="屏幕快照 2020-03-06 下午3.53.39.png" style="border: none; box-shadow: none; width: 372px; height: 417px; visibility: visible;"></span></p>
          </td>
          <td style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">定义</span></span></strong><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"><br></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">使用带不同样式的填充区域的层叠线段来显示多组数据在同一个具有顺序性的维度上的变化，线段在同一维度值上的端点高度按照数值累加。</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">视觉通道</span></span></strong><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"><br></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">颜色、面积</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">分析目的</span></span></strong><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"><br></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">比较、组成、趋势</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">数据准备</span></span></strong><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;"><br></span><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">1 个「时间」或「有序名词」字段</span></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">1 个「数值」字段</span></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">1 个「无序名词」字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

# 快速上手

```js
const areaPlot = new StackArea(document.getElementById('container'), {
    title: {
        visible: true,
        text: '堆叠面积图',
    },
    data,
    xField: 'date',
    yField: 'value',
    stackField: 'country',
    xAxis: {
        type: 'dateTime',
        tickCount: 5,
    },
    legend: {
        visible: true,
        position: 'right-top',
    },
    responsive: true,
});

areaPlot.render();
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

功能描述： 图形在 x 方向（横向延伸）对应的数据字段名，一般对应一个连续字段。

默认配置： 无

### yField
**必选**, *string*

功能描述： 图形在 y 方向对应的数据字段名，一般对应一个离散字段。

默认配置： 无

### stackField
**必选**, *string*

功能描述： 面积堆叠的字段名，通过该字段的值，面积图将会被分割为堆积的多个部分，通过颜色进行区分。

默认配置： 无

## 图形样式

### color
**可选**, *string[] | Function*

功能描述： 指定图形颜色，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。

默认配置：采用 theme 中的色板。


### areaStyle
**可选**, *object*

功能描述： 设置area图形的样式。areaStyle中的`fill`会覆盖`color`的设置。sreaStyle可以直接指定，也可以通过callback的方式，根据数据为每个形状指定单独的样式。

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| fill | string | 填充颜色 |
| stroke | string | 填充颜色 |
| lineWidth | number | 线宽 |
| lineDash | number | 虚线显示 |
| opacity | number | 透明度 |
| fillOpacity | number | 填充透明度 |
| strokeOpacity | number | 描边透明度 |

### smooth
**可选**, *boolean*

功能描述： 是否使用曲线形态描绘。

默认配置: `false`

### line
**可选**, *object*

功能描述：配置辅助折线，分组及颜色映射方式与面积图形保持一致。

默认配置：
```js
visible: true
size: 2
style:{
    opacity: 1,
    lineJoin: 'round',
    lineCap: 'round',
}
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| size | number | 折线的宽度 |
| style | object | 折线样式<br />- stroke: string 折线颜色<br />- lineDash: number[] 虚线显示<br />- opacity: number 透明度<br /> |


### point
**可选**, *object*

功能描述： 配置数据点，分组及颜色映射方式与面积图形保持一致。

默认配置： 
```js
visible: false,
shape: 'circle',
size: 3,
style: {
    stroke: '#fff',
}
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| shape | string | 数据点形状 |
| size | number | 数据点大小 |
| style | object | 数据点样式<br />- fill: string  填充色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*agWZSIRdzPkAAAAAAAAAAABkARQnAQ" width="600">

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
    visible: false,
},
line: {
    visible: true
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
| type | string | 坐标轴类型<br />- 'time'：时间轴，<br />- 'linear': 连续轴<br /> |
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
    visible: false,
},
tickLine: {
    visible: false,
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

功能描述：图例，配置了seriesField时显示，用于展示颜色分类信息

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
shared: true,
showCrosshairs: true,
crosshairs: 'y',
offset: 20,
```

| 细分属性 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| offset | number | 距离鼠标位置偏移值 |
| shared | boolean | 是否同时显示多条数据 |
| showCrosshairs | boolean | 是否tooltip辅助线 |
| crosshairs | object | 配置tooltip辅助线，可选项： x | y | cross 辅助线形态 |
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

**可选**, *object*

[DEMO1](https://g2plot.antv.vision/zh/examples/area/stack#area-label)
[DEMO2](https://g2plot.antv.vision/zh/examples/area/stack#line-label)

功能描述： 标签文本

默认配置：
```js
visible: false
type: 'area'
```

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| visible | boolean | 是否显示 |
| type | string | 文本标签类型<br />- point: 显示在对应数据点上<br />- area: 显示在面积区域内部<br /> - line: 显示在辅助折线尾部<br /> |
| formatter | function | 对文本标签内容进行格式化 |
| offsetX | number | 在 label 位置的基础上再往 x 方向的偏移量 |
| offsetY | number | 在 label 位置的基础上再往 y 方向的偏移量 |
| autoScale | boolean | label是否随area面积放缩。label type为 area 时生效，默认为 true |
| style | object | 配置文本标签样式。 |


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

### 面积事件

| onAreaClick<br />面积点击事件 | onAreaDblClick<br />面积双击事件 | onAreaDblClick<br />面积双击事件 | onAreaMouseleave<br />面积鼠标离开事件 |
| --- | --- | --- | --- |
| onAreaMousemove<br />面积鼠标移动事件 | onAreamousedown<br />面积鼠标按下事件 | onAreaMouseup<br />面积鼠标松开事件 | onAreaMouseenter<br />面积鼠标进入事件 |

### 折线事件

| onLineClick<br />折线点击事件 | onLineDblClick<br />折线双击事件 | onLineDblClick<br />折线双击事件 | onLineMouseleave<br />折线鼠标离开事件 |
| --- | --- | --- | --- |
| onLineMousemove<br />折线鼠标移动事件 | onLineMousedown<br />折线鼠标按下事件 | onLineMouseup<br />折线鼠标松开事件 | onLineMouseenter<br />折线鼠标进入事件 |


### 数据点事件

| onPointClick<br />数据点点击事件 | onPointDblClick<br />数据点双击事件 | onPointDblClick<br />数据点双击事件 | onPointMouseleave<br />数据点鼠标离开事件 |
| --- | --- | --- | --- |
| onPointMousemove<br />数据点鼠标移动事件 | onPointMousedown<br />数据点鼠标按下事件 | onPointMouseup<br />数据点鼠标松开事件 | onPointMouseenter<br />数据点鼠标进入事件 |


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

## 交互

### slider
**可选**, *object*

[DEMO](http://localhost:8000/zh/examples/line/basic#line-slider)

功能描述： 缩略轴 (slider) 交互适用于折线数据较多，用户希望关注数据集中某个特殊区间的场景。

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
