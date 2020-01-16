---
title: Scatter - 散点图
order: 0
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Mds9Q7-zeHMAAAAAAAAAAABkARQnAQ" width="400">

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### title

**optional** 见[通用图表配置](../general-config#title)。

### description

**optional** 见[通用图表配置](../general-config#description)。

### width

**optional** 见[通用图表配置](../general-config#width)。

### height

**optional** 见[通用图表配置](../general-config#height)。

### forceFit

**optional** 见[通用图表配置](../general-config#forceFit)。

### padding

**optional** 见[通用图表配置](../general-config#padding)。

### theme

**optional** 见[通用图表配置](../general-config#theme)。

### data

**required**

数据源为对象集合，例如：`[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]`。

### xField

**required**, string 类型

点形状在 x 方向位置映射对应的数据字段名，一般对应一个连续字段。

### yField

**required**, string 类型

点形状在 y 方向位置映射所对应的数据字段名，一般对应一个连续字段。

### colorField

**optional**, string 类型

点颜色映射对应的数据字段名。

### color

**optional**, string | string[] | function 类型

指定点的颜色。如不进行配置则采用 theme 中的配色。

用法：

* 没有设置colorField, color仅设定单值(string)，此时所有点都显示为一种颜色。

```js
const scatterPlot = new Scatter(document.getElementById('container'), {
      data,
      xField: 'Revenue (Millions)',
      yField: 'Rating',
      // highlight-start
      color: '#a8ddb5',
      // highlight-end
      xAxis: {
        visible: true,
        min: -5,
      },
    });
    scatterPlot.render();
```

效果：
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*QHRIRInL2xwAAAAAAAAAAABkARQnAQ" width = "400">

* 设置了colorField, color设定为多值（数组，string[])，此时点的颜色按照colorField字段对应值的顺序在color数组中取值。

```js
const scatterPlot = new Scatter(document.getElementById('container'), {
      data,
      xField: 'Revenue (Millions)',
      yField: 'Rating',
      // highlight-start
      colorField: 'Genre',
      color: ['#d62728', '#2ca02c', '#000000', '#9467bd', '#ffd500', '#1f77b4', '#00518a', '#ffbc69', '#9bd646'],
      // highlight-end
      xAxis: {
        visible: true,
        min: -5,
      },
    });
    scatterPlot.render();
```

效果：
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Mds9Q7-zeHMAAAAAAAAAAABkARQnAQ" width="400">

### pointStyle

配置点的样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度<br />

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

```js
const scatterPlot = new Scatter(document.getElementById('container'), {
      data,
      xField: 'Revenue (Millions)',
      yField: 'Rating',
      // highlight-start
      pointStyle:(v)=>{
         if(v>=50){
             return 'red';
         } 
         return 'blue';
      }
      // highlight-end
    });
    scatterPlot.render();
```

### tooltip

**optional** 见[通用图表配置](../general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../general-config#legend)。

### label

**optional**

图形标签。

`visible: boolean`    图形标签是否显示<br />
`position: 'top' | 'bottom' | 'left' | 'right' | 'middle'`    图形标签相对于点的位置<br />
`formatter: function`  对 label 的显示文本进行格式化。<br/>
`offsetX: number`  在 label 位置的基础上再往 x 方向的偏移量。<br/>
`offsetY: number`  在 label 位置的基础上再往 y 方向的偏移量。<br/>
`style: object`  配置 label 文本<br/>
`adjustColor: boolean` 只在label position为`middle`时生效。设置为`true`时，文本颜色会根据对应图形颜色自动调整。<br/>
`adjustPosition: boolean` 只在label position为`middle`时生效。设置为`true`时，当文本显示空间不够时自动隐藏。

### quadrant

**optional**

四象限组件。将图表区域进行象限划分，用以展示线性数据的分类趋势。

`xBaseline: number`  x方向上的象限分割基准线，默认数值为0<br />
`yBaseline: number`  y方向上的象限分割基准线，默认数值为0<br />
`lineStyle: object`  配置象限分割线的样式<br />
`regionStyle: object[] | Function`  配置象限分割线的样式，按照象限区域依次配置，顺序为左上-左下-右上-右下。也支持以callback的方式进行配置<br />
`label: object` 为象限配置说明文本<br />
- `text: string[] | Function`  配置象限文本内容，按照象限区域依次配置，顺序为左上-左下-右上-右下。也支持以callback的方式进行配置
- `style: object`  配置象限文本内容，按照象限区域依次配置，顺序为左上-左下-右上-右下。也支持以callback的方式进行配置

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


### trendline

**optional**

趋势线组件，为图表区间回归曲线。

`type: string` 趋势线类型，支持 `linear`  `exp`  `loess`  `log`  `poly`  `pow` `quad` 7种 <br />
`style: Object` 配置趋势线样式<br />
`showConfidence: boolean` 是否绘制置信区间曲线<br />
`confidenceStyle: Object` 配置置信区间样式

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

### events

**optional**

- 图形事件
  `onPointClick: function`  点形状点击事件<br />
  `onPointDblClick: function`  点形状双击事件<br />
  `onPointMouseenter: function`  点形状鼠标进入事件<br />
  `onPointMouseleave: function`  点形状鼠标离开事件<br />
  `onPointMousemove: function`  点形状鼠标移动事件<br />
  `onPointMousedown: function`  点形状鼠标按下事件<br />
  `onPointMouseup: function`  点形状鼠标松开事件<br />
  `onPointContextmenu: function`   点形状右键事件

- 其他事件类型见[通用图表配置](../general-config#events)。
