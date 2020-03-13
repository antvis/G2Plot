---
title: 图表通用配置
order: 2
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

## title

**optional**, object 类型

配置图表的标题，默认显示在图表左上角。

> 请注意设置 title 将会压缩图表展示区域

`visible`:  `boolean`  是否显示标题<br />
`text`: `string`  标题文本<br />
`style`：`object`  标题样式，详见文本样式配置

## description

**optional**, object 类型

配置图表的描述，description 显示在 title 下方，默认在图表左上角。

> 请注意设置 description 将会压缩图表展示区域

`visible`:  `boolean`  是否显示描述<br />
`text`: `string`  描述文本<br />
`style`：`object`  描述样式，详见文本样式配置

## width

**optional**, number 类型

图表宽度。

如不进行配置，则默认采用 theme 中的宽度。

## height

**optional**, number 类型

图表高度。

如不进行配置，则默认采用 theme 中的高度。

## forceFit

**optional**, boolean 类型

图表是否自适应容器宽高。

## padding

**optional**, number[] | string 类型

图表内边距，是边框相对绘图区域的边距。坐标轴 (axis）和图例 (legend) 都显示在这一区域。

目前支持以下两种配置方式：

1. `padding: [10,10,10,10]`，顺序与 CSS 盒模型相同：上边距、右边距、下边距、左边距
1. `padding: 'auto'`，此为默认配置，将会自动计算边距所占的空间

## theme

**optional**, string | object 类型

图表主题，如不进行配置则默认使用 G2Plot 默认主题。详见 theme 文档（待补充）。

## meta

**optional**, 全局化配置图表数据元信息。

`alias: string` 配置字段的别名，在 meta 配置别名将会影响坐标轴、tooltip 和 legend 上的字段名称显示<br/>
`range: number[]` 字段数据的映射区间，默认为[0,1]<br/>

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
      alias: '数量'
    }
  },
  // highlight-end
  xField: 'year',
  yField: 'value',
  stackField: 'country',
});
areaPlot.render();

```

## tooltip

**optional**, object 类型

`visible: boolean`  tooltip 是否可见<br />
`shared: boolean`    设置 tooltip 是否只展示单条数据<br />
`crosshairs`: 配置 tooltip 辅助线<br />   `false`: 不显示辅助线<br />   `type: 'x' | 'y' | 'cross'`  配置辅助线的形态<br />   `style: object`  配置辅助线样式，详见图形属性<br />
`htmlContent: function`<br />    自定义 tooltip，用户可以根据 htmlContent 方法返回的 title 和 items 两个参数定义 tooltip dom 节点的构成和显示方式。

```js
htmlContent: (title, items) => {
  return '<div><ul><li>.....</li></ul></div>';
};
```

此方法允许用户传入一个外部 dom 或 dom id 作为 tooltip 的容器。

```js
htmlContent: (title, items) => {
  return dom | dom.id;
};
```

## legend

**optional**, object 类型

`visible: boolean`  图例是否可见<br />
`position: string` 图例位置，以十二方位布局

> 设置图例的显示位置，可设置的值为 12 个：`left-top`,`left-center`,`left-bottom`,`right-top`,`right-center`,`right-bottom`,`top-left`,`top-center`,`top-right`,`bottom-left`,`bottom-center`,`bottom-right`。

`formatter: function`  对图例的显示信息进行格式化<br />
`offsetX: number`    图例在 position 的基础上再往 x 方向偏移量，单位 px<br />
`offsetY: number`     图例在 position 的基础上再往 y 方向偏移量，单位 px<br />
`marker: string`  图例 marker，默认为 'circle'

> 图例 marker 内置有：`circle`,`square`,`diamond`,`triangle`,`triangleDown`,`hexagon`,`bowtie`,`cross`,`tick`,`plus`,`hyphen`,`line`,`hollowCircle`,`hollowSquare`,`hollowDiamond`,`hollowTriangle`,`hollowTriangleDown`,`hollowHexagon`,`hollowBowtie`

## axis

**optional**

`visible: boolean` 坐标轴是否可见

### line

坐标轴轴线

`visible: boolean` 坐标轴轴线是否可见

`style: object | function` 坐标轴轴线样式

- `stroke: string` 坐标轴轴线颜色
- `lineWidth: number`  描边宽度<br />
- `lineDash: number[]`  描边虚线显示<br />
- `opacity: number`  透明度

### grid

坐标轴网格

`visible: boolean` 坐标轴网格是否可见

`style: object | function` 坐标轴网格样式

- `stroke: string` 坐标轴轴线颜色
- `lineWidth: number`  描边宽度<br />
- `lineDash: number[]`  描边虚线显示<br />
- `opacity: number`  透明度

### label

坐标轴标签

`visible: boolean` 坐标轴标签是否可见

`formatter: function` 对 label 的显示文本进行格式化

`precision: number` 对 label 显示的数据快捷定义精度，如配置为 2，则格式化为 2 位小数，不适用于分类坐标轴

`suffix: string` 对 label 显示的文本添加后缀，如数据单位万等

`mask: string` 为日期文本添加格式化遮罩，当坐标轴`type`为`time`时生效<br/>
用法示例:
```
xAxis:{
  type:'time',
  mask:'YYYY' //只显示年份
}
```

`offsetX: number` 在 label 位置的基础上再往 x 方向的偏移量

`offsetY: number` 在 label 位置的基础上再往 y 方向的偏移量

`position: string|function` 数据标签位置

`adjustPosition: boolean`: 是否开启数据标签位置自动调整

`adjustColor: boolean`: 是否开启数据标签颜色自动调整

`style: object` 配置 label 文本样式

- `fill: string` label 颜色
- `fontSize: number` label 文本大小
- `fontWeight: number` label 文本字体粗细
- `stroke: string` label 文本描边颜色
- `lineWidth: number` label 文本描边粗细
- `opacity: number` label 文本透明度

### title

坐标轴标题

`visible: boolean` 坐标轴标题是否可见
`text: string` 坐标轴标题文字
`offset: number` 坐标轴标题位置偏移量

`style: object` 配置 title 文本样式

- `fill: string` title 颜色
- `fontSize: number` title 文本大小
- `fontWeight: number` title 文本字体粗细
- `stroke: string` title 文本描边颜色
- `lineWidth: number` title 文本描边粗细
- `opacity: number` title 文本透明度

### tickLine

坐标轴刻度线

`visible: boolean` 坐标轴标题是否可见

`style: object | function` 坐标轴网格样式

- `stroke: string` 坐标轴轴线颜色
- `lineWidth: number`  描边宽度<br />
- `lineDash: number[]`  描边虚线显示<br />
- `opacity: number`  透明度

## linearAxis

连续型坐标轴，通常用于展示连续型数值映射的坐标轴。常见于表示时间连续性的 x 轴 (折线图) 和大部分直角坐标系图表的 y 轴（如折线图、面积图、柱状图等）。

`min: number` 设置坐标轴最小值

`max: number` 设置坐标轴最大值

`tickCount: number` 设置坐标轴刻度数量

`tickInterval: number` 设置坐标轴刻度间隔

## categoryAxis

分类型坐标轴，通常用于展示分类型数据的映射关系。常见于柱状图系列的 X 轴及条形图系列的 y 轴。

## guideLine

**optional**, object[] 类型

辅助线，适用于所有直角坐标系的图表，例如折线图、柱状图、面积图、散点图等，而不适用于极坐标的图表，如饼图、环图、雷达图等。

支持同时添加多条辅助线。

`type: string`    含有统计意义的辅助线类型，可选类型为  `'max'` | `'min'` | `'median'` |  `'mean'`。

> 如指定了辅助线类型，则不需要配置辅助线的`start`和`end`。

`start: array | function | object`  指定辅助线起始位置，如不配置`type`，则该辅助线为自定义辅助线，`start`是必选项。

支持两种数据形式，两者不能混用：

- 原始数据值，如 ['2010-01-01', 100]
- 绘图区域百分比位置，如 ['50%', '50%']

`end: array | function | object`  指定辅助线终点位置，如不配置`type`，则该辅助线为自定义辅助线，`end`是必选项。

支持两种数据形式，两者不能混用：

- 原始数据值，如 ['2010-01-01', 100]
- 绘图区域百分比位置，如 ['50%', '50%']

`lineStyle: object`    设置辅助线样式。<br />

- `stroke: string`    辅助线颜色<br />
- `lineWidth: number`  辅助线宽度<br />
- `lineDash: number[]`    辅助线虚线显示<br />
- `opacity: number`    辅助线透明度

`text: object`  设置辅助线文本。<br />

- `position: 'start' | 'center' | 'end' | '50%' | 0.5`  设置辅助线文本样式。<br />
- `content: string`    辅助线文本内容。<br />
- `offsetX: number`  辅助线文本位置在 x 方向上的偏移量。<br />
- `offsetY: number`  辅助线文本位置在 y 方向上的偏移量。<br />

- `style: object`    辅助线文本样式。<br />

  - `fontSize: number`    字号<br />
  - `fill: string`    文字颜色<br />
  - `opacity: number`  文字透明度<br />
  - `textAlign: 'start' | 'end' | 'center'`    对齐方式<br />
  - `textBaselin: 'top' | 'bottom' | 'middle'`  文字基线

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

## events

**optional**

- 图表区域事件:<br />
  <img src ="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*fKxnR6HZPtsAAAAAAAAAAABkARQnAQ" width="300"><br />
  `onPlotClick: function`     图表区域点击事件<br />
  `onPlotDblClick: function`  图表区域双击事件<br />
  `onPlotMouseenter: function`    图表区域鼠标进入事件<br />
  `onPlotMouseleave: function`    图表区域鼠标离开事件<br />
  `onPlotMousemove: function`    图表区域鼠标移动事件<br />
  `onPlotMousedown: function`    图表区域鼠标按下事件<br />
  `onPlotMouseup: function`    图表区域鼠标松开事件<br />
  `onPlotContextmenu: function`    图表区域右键事件<br />
  <br/>

- 图层事件：<br />
  \*\* 一般图层事件用于组合型混合图表中<br />
  `onLayerClick: function`     图层点击事件<br />
  `onLayerDblClick: function`  图层双击事件<br />
  `onLayerMouseenter: function`    图层鼠标进入事件<br />
  `onLayerMouseleave: function`    图层鼠标离开事件<br />
  `onLayerMousemove: function`    图层鼠标移动事件<br />
  `onLayerMousedown: function`    图层鼠标按下事件<br />
  `onLayerMouseup: function`    图层鼠标松开事件<br />
  `onLayerContextmenu: function`    图层右键事件<br/>
  <br/>

- 图形区域事件：<br />
  <img src ="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*PhmNS5z135wAAAAAAAAAAABkARQnAQ" width="300"><br />
  `onViewClick: function`     图形区域点击事件<br />
  `onViewDblClick: function`  图层双击事件<br />
  `onViewMouseenter: function`    图形区域鼠标进入事件<br />
  `onViewMouseleave: function`    图形区域鼠标离开事件<br />
  `onViewMousemove: function`    图形区域鼠标移动事件<br />
  `onViewMousedown: function`    图形区域鼠标按下事件<br />
  `onViewMouseup: function`    图形区域鼠标松开事件<br />
  `onViewContextmenu: function`    图形区域右键事件<br/>
  <br/>

* 图例事件:<br />
  `onLegendClick: function`     图例点击事件<br />
  `onLegendDblClick: function`  图例双击事件<br />
  `onLegendMouseenter: function`  图例鼠标进入事件<br />
  `onLegendMouseleave: function`  图例鼠标离开事件<br />
  `onLegendMousedown: function`  图例鼠标按下事件<br />
  `onLegendMouseup: function`  图例鼠标松开事件<br />
  `onLegendMousemove: function`  图例鼠标移动事件<br />
  `onLegendContextmenu: function`    图例右键事件<br/>
  <br/>

* 坐标轴事件:<br />
  `onAxisClick: function`     坐标轴点击事件<br />
  `onAxisDblClick: function`  坐标轴双击事件<br />
  `onAxisMouseenter: function`  坐标轴鼠标进入事件<br />
  `onAxisMouseleave: function`  坐标轴鼠标离开事件<br />
  `onAxisMousedown: function`  坐标轴鼠标按下事件<br />
  `onAxisMouseup: function`  坐标轴鼠标松开事件<br />
  `onAxisMousemove: function`  坐标轴鼠标移动事件<br />
  `onAxisContextmenu: function`    坐标轴右键事件<br/>
  <br/>

* 图形标签事件:<br />
  `onLabelClick: function`     图形标签点击事件<br />
  `onLabelDblClick: function`  图形标签双击事件<br />
  `onLabelMouseenter: function`  图形标签鼠标进入事件<br />
  `onLabelMouseleave: function`  图形标签鼠标离开事件<br />
  `onLabelMousedown: function`  图形标签鼠标按下事件<br />
  `onLabelMouseup: function`  图形标签鼠标松开事件<br />
  `onLabelMousemove: function`  图形标签鼠标移动事件<br />
  `onLabelContextmenu: function`    图形标签右键事件<br/>
  <br/>

* 图表标题事件:<br />
  `onTitleClick: function`     图表标题点击事件<br />
  `onTitleDblClick: function`  图表标题双击事件<br />
  `onTitleMouseenter: function`  图表标题鼠标进入事件<br />
  `onTitleMouseleave: function`  图表标题鼠标离开事件<br />
  `onTitleMousedown: function`  图表标题鼠标按下事件<br />
  `onTitleMouseup: function`  图表标题鼠标松开事件<br />
  `onTitleMousemove: function`  图表标题鼠标移动事件<br />
  `onTitleContextmenu: function`    图表标题右键事件<br/>
  <br/>

* 图表描述事件:<br />
  `onDescriptionClick: function`     图表描述点击事件<br />
  `onDescriptionDblClick: function`  图表描述双击事件<br />
  `onDescriptionMouseenter: function`  图表描述鼠标进入事件<br />
  `onDescriptionMouseleave: function`  图表描述鼠标离开事件<br />
  `onDescriptionMousedown: function`  图表描述鼠标按下事件<br />
  `onDescriptionMouseup: function`  图表描述鼠标松开事件<br />
  `onDescriptionMousemove: function`  图表描述鼠标移动事件<br />
  `onDescriptionContextmenu: function`    图表描述右键事件<br/>
  <br/>

用法示例：

```js
events: {
  onPlotClick: (ev) => {
    console.log(ev);
  };
}
```

## 通用方法

### render()

**reqiured**

渲染图表。

### updateConfig()

**optional**

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

### changeData()

更新图表数据。`updateConfig()`方法会导致图形区域销毁并重建，如果只进行数据更新，而不涉及其他配置项更新，推荐使用本方法。

```js
plot.changeData(newData);
```

### repaint()

**optional**

图表画布重绘。

### destory()

**optional**

销毁图表。

### getData()

获取图表数据。

### getPlotTheme()

获取图表 theme。
