---
title: API
---

# 配置属性

## 图表容器

### width

**可选**, _number_

功能描述： 设置图表宽度。

默认配置： `400`

### height

**可选**, _number_

功能描述： 设置图表高度。

默认配置： `400`

### forceFit

**可选**, _boolean_

功能描述： 图表是否自适应容器宽高。当 `forceFit` 设置为 true 时，`width` 和 `height` 的设置将失效。

默认配置： `true`

### pixelRatio

**可选**, _number_

功能描述： 设置图表渲染的像素比

默认配置： `2`

### renderer

**可选**, _string_

功能描述: 设置图表渲染方式为 `canvas` 或 `svg`

默认配置： `canvas`

## 数据映射

### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ type: 'a'，value: 20 }, { type: 'b'，value: 20 }]`。

### meta

**可选**, _object_

功能描述： 全局化配置图表数据元信息，以字段为单位进行配置。在 meta 上的配置将同时影响所有组件的文本信息。

默认配置： 无

| 细分配置项名称 | 类型       | 功能描述                                    |
| -------------- | ---------- | ------------------------------------------- |
| alias          | _string_   | 字段的别名                                  |
| formatter      | _function_ | callback 方法，对该字段所有值进行格式化处理 |
| values         | _string[]_ | 枚举该字段下所有值                          |
| range          | _number[]_ | 字段的数据映射区间，默认为[0,1]             |

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

### angleField 📌

**必选**, _string_

功能描述： 扇形切片大小（弧度）所对应的数据字段名。。

默认配置： 无

### colorField

**可选**, _string_

功能描述：扇形颜色映射对应的数据字段名。

默认配置： 无

## 图形样式

### radius ✨

**可选**, _number_

功能描述： 饼图的半径，原点为画布中心。配置值域为 [0,1]，0 代表饼图大小为 0，即不显示，1 代表饼图撑满绘图区域。

默认配置： 0.8, 即 width / 2 \* 0.8。

### color

**可选**, _string | string[] | Function_

功能描述： 指定扇形颜色，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。

默认配置：采用 theme 中的色板。

用法示例：

```js
// 配合颜色映射，指定多值
colorField:'type',
color:['blue','yellow','green']
//配合颜色映射，使用回调函数指定色值
colorField:'type',
color:(d)=>{
    if(d==='a') return 'red';
    return 'blue';
}
```

### pieStyle ✨

**可选**, _object_

功能描述： 设置扇形样式。pieStyle 中的`fill`会覆盖 `color` 的配置。pieStyle 可以直接指定，也可以通过 callback 的方式，根据数据为每个扇形切片指定单独的样式。

默认配置： 无

| 细分配置      | 类型   | 功能描述   |
| ------------- | ------ | ---------- |
| fill          | string | 填充颜色   |
| stroke        | string | 描边颜色   |
| lineWidth     | number | 描边宽度   |
| lineDash      | number | 虚线描边   |
| opacity       | number | 整体透明度 |
| fillOpacity   | number | 填充透明度 |
| strokeOpacity | number | 描边透明度 |

## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*93XzToUe1OQAAAAAAAAAAABkARQnAQ" width="600">

### title

**可选**, _optional_

[DEMOS](../../general/title-description)

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

| 细分配置 | 类型    | 功能描述                                                                                                                                                                                                                                                                                  |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible  | boolean | 是否显示                                                                                                                                                                                                                                                                                  |
| alignTo  | string  | 位置，支持三种配置：<br />'left'                                                                                                                                                                                                                                                          | 'middle' | 'right' |
| style    | object  | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### description

**可选**, _optional_

[DEMOS](../../general/title-description)

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

| 细分配置 | 类型    | 功能描述                                                                                                                                                                                                                                                                                  |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible  | boolean | 是否显示                                                                                                                                                                                                                                                                                  |
| alignTo  | string  | 位置，支持三种配置：<br />'left'                                                                                                                                                                                                                                                          | 'middle' | 'right' |
| style    | object  | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### legend

**可选**, _object_

[DEMOS](../../general/legend#legend-position)

功能描述：图例，配置 colorField 时显示，用于展示颜色分类信息

默认配置：

```js
visible: true,
position: 'top',
flipPage: true
```

| 细分配置  | 类型     | 功能描述                                                                                                                                                                                                                                                                                                       |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible   | boolean  | 是否可见                                                                                                                                                                                                                                                                                                       |
| position  | string   | 位置，支持 12 方位布局<br />top-left, top-center,top-right<br />bottom-left,bottom-center,bottom-right<br />left-top,left-center,left-bottom<br />right-top,right-center,right-bottom                                                                                                                          |
| formatter | function | 对图例显示信息进行格式化                                                                                                                                                                                                                                                                                       |
| offsetX   | number   | 图例在 position 的基础上再往 x 方向偏移量，单位 px                                                                                                                                                                                                                                                             |
| offsetY   | number   | 图例在 position 的基础上再往 y 方向偏移量，单位 px                                                                                                                                                                                                                                                             |
| title     | object   | 图例标题<br />- visible: boolean 是否显示<br />- text: string 图例文本，如不配置则自动取对应字段名<br />- style: object 标题样式<br />                                                                                                                                                                         |
| marker    | object   | 图例 marker<br />- symbol: string marker 符号，默认为 'circle'。可选类型：circle,square,diamond,triangle,triangleDown,hexagon,bowtie,cross,tick,plus,hyphen,line,hollowCircle,hollowSquare,hollowDiamond<br />- style: object marker 样式，其中  `r`  配置 marker 的大小，其余样式参数参考绘图属性文档。<br /> |
| text      | object   | 图例文本<br />- style: object 配置图例文本样式<br />- formatter:(text,cfg)=>string 格式化图例文本<br />                                                                                                                                                                                                        |

### tooltip

**可选**, _object_

功能描述：信息提示框

默认配置：

```js
visible: true,
offset: 20,
```

| 细分属性  | 类型    | 功能描述                                                                                                                                                                                                                                                                                                                                                                       |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| visible   | boolean | 是否显示                                                                                                                                                                                                                                                                                                                                                                       |
| offset    | number  | 距离鼠标位置偏移值                                                                                                                                                                                                                                                                                                                                                             |
| domStyles | object  | 配置 tooltip 样式<br />- g2-tooltip: object 设置 tooltip 容器的 CSS 样式<br />- g2-tooltip-title: object 设置 tooltip 标题的 CSS 样式<br />- g2-tooltip-list: object 设置 tooltip 列表容器的 CSS 样式<br />- g2-tooltip-marker: object 设置 tooltip 列表容器中每一项 marker 的 CSS 样式<br />- g2-tooltip-value: object  设置 tooltip 列表容器中每一项 value 的 CSS 样式<br /> |
| fields    | string  | 设置 tooltip 内容字段，默认为[ `angleField`,`colorField`]                                                                                                                                                                                                                                                                                                                      |
| formatter | object  | 对 tooltip items 进行格式化，入参为 tooltip fields 对应数值，出参为格式为{name:'a',value:1}                                                                                                                                                                                                                                                                                    |

### label

功能描述： 标签文本

[DEMO1](../../pie/basic#basic)
[DEMO2](../../pie/basic#outer-label)
[DEMO3](../../pie/basic#outer-center-label)
[DEMO4](../../pie/basic#spider-label)

默认配置：

```js
visible: false;
type: 'inner';
autoRotate: false;
```

| 细分配置   | 类型     | 功能描述                                                                                                                                               |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| visible    | boolean  | 是否显示                                                                                                                                               |
| type       | string   | label 的类型<br />- inner label 显示于扇形切片内<br />- outer label 显示于饼外<br />- outer-center label 呈圆形排布于饼外<br />- spider 蜘蛛布局 label |
| autoRotate | boolean  | 是否自动旋转                                                                                                                                           |
| formatter  | function | 对文本标签内容进行格式化                                                                                                                               |
| offsetX    | number   | 在 label 位置的基础上再往 x 方向的偏移量                                                                                                               |
| offsetY    | number   | 在 label 位置的基础上再往 y 方向的偏移量                                                                                                               |
| style      | object   | 配置文本标签样式。                                                                                                                                     |

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*TeCBRbMLDKsAAAAAAAAAAABkARQnAQ" alt="image.png" style="visibility: visible; width: 800px; height: 248px;">

spider label formatter 用法示例：

当配置了 colorField，即扇形切片接受分类类型的颜色映射，此时 spider label 的文本为上下显示，此时 formatter 方法入参为 angleField 及 colorField 两个字段对应的值，返回值应为数组。

```js
label: {
  type: 'spider',
  formatter: (angleField, colorField) => {
    return [ 'value1','value2' ];
  }
}
```

## 事件

### 图形事件

| onPieClick<br />图形点击事件         | onPieDblClick<br />图形双击事件      | onPieDblClick<br />图形双击事件    | onPieMouseleave<br />图形鼠标离开事件 |
| ------------------------------------ | ------------------------------------ | ---------------------------------- | ------------------------------------- |
| onPieMousemove<br />图形鼠标移动事件 | onPieMousedown<br />图形鼠标按下事件 | onPieMouseup<br />图形鼠标松开事件 | onPieMouseenter<br />图形鼠标进入事件 |

### 图表区域事件

| onPlotClick<br />图表区域点击事件         | onPlotDblClick<br />图表区域双击事件      | onPlotDblClick<br />图表区域双击事件    | onPlotMouseleave<br />图表区域鼠标离开事件 |
| ----------------------------------------- | ----------------------------------------- | --------------------------------------- | ------------------------------------------ |
| onPlotMousemove<br />图表区域鼠标移动事件 | onPlotMousedown<br />图表区域鼠标按下事件 | onPlotMouseup<br />图表区域鼠标松开事件 | onPlotMouseenter<br />图表区域鼠标进入事件 |

### 图例事件

| onLegendClick<br />图例点击事件         | onLegendDblClick<br />图例双击事件      | onLegendMouseenter<br />图例鼠标进入事件 | onLegendMouseleave<br />图例鼠标离开事件 |
| --------------------------------------- | --------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| onLegendMousemove<br />图例鼠标移动事件 | onLegendMousedown<br />图例鼠标按下事件 | onLegendMouseup<br />图例鼠标松开事件    | onLegendMouseenter<br />图例鼠标进入事件 |

### 图形标签事件

| onLabelClick<br />图形标签点击事件         | onLabelDblClick<br />图形标签双击事件      | onLabelDblClick<br />图形标签双击事件    | onLabelMouseleave<br />图形标签鼠标离开事件 |
| ------------------------------------------ | ------------------------------------------ | ---------------------------------------- | ------------------------------------------- |
| onLabelMousemove<br />图形标签鼠标移动事件 | onLabelMousedown<br />图形标签鼠标按下事件 | onLabelMouseup<br />图形标签鼠标松开事件 | onLabelMouseenter<br />图形标签鼠标进入事件 |

### 标题事件

| onTitleClick<br />标题点击事件         | onTitleDblClick<br />标题双击事件      | onTitleDblClick<br />标题双击事件    | onTitleMouseleave<br />标题鼠标离开事件 |
| -------------------------------------- | -------------------------------------- | ------------------------------------ | --------------------------------------- |
| onTitleMousemove<br />标题鼠标移动事件 | onTitleMousedown<br />标题鼠标按下事件 | onTitleMouseup<br />标题鼠标松开事件 | onTitleMouseenter<br />标题鼠标进入事件 |

### 描述事件

| onDescriptionClick<br />标题点击事件         | onDescriptionDblClick<br />标题双击事件      | onDescriptionDblClick<br />标题双击事件    | onDescriptionMouseleave<br />标题鼠标离开事件 |
| -------------------------------------------- | -------------------------------------------- | ------------------------------------------ | --------------------------------------------- |
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
