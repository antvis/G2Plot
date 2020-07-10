---
title: WordCloud
order: 29
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*vM7uTpItaZoAAAAAAAAAAABkARQnAQ" width="400">

# 快速上手

```js
import { WordCloud } from '@antv/g2plot';

const data = [...];

const wordCloud = new WorldCloud(document.getElementById('container'), {
  data,
  wordStyle:{
    fontSize:[20,60]
  }
});

wordCloud.render();

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
**必选**, *object[]*

功能描述： 设置图表数据源

默认配置： 无

词云图的每一条数据都需要具备一下属性：

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| word | string | 词条内容 |
| weight | number | 该词条权重 |
| id | number | 该词条的unique id |
| color | string | 可选，该词条的颜色。如不配置则使用默认色板。 |

### maskImage
**可选**，*string*

功能描述： 遮罩图片(url 或者 base64 地址)
默认配置： 无

## 图形样式

### shape
**可选**， *string*

功能描述： 词云图形状, 可选项为 | 'circle' | 'square' | 'cardioid' | 'diamond' | 'triangle' | 'triangle-forward' | 'triangle-backward' | 'triangle-up' | 'triangle-down' | 'pentagon' | 'star'

默认配置： 'circle'

### backgroundColor
**可选**, *string*

功能描述： 设置背景颜色

默认配置： `#ffffff`


### shuffle
**可选**, *boolean*

功能描述： 变换传入数据的顺序

默认配置： true


### selected
**可选**, *number*

功能描述：用于标记被选中 hover 的词云图文字

默认配置： -1，表示未选中任意文字


### wordStyle
**可选**, *object*

功能描述： 文字样式配置

| 细分配置 | 类型 | 功能描述 |
| --- | --- | --- |
| fontFamily | string | 配置词云的字体。<br />参照：[通用 CSS 配置](!https://www.w3schools.com/jsref/prop_style_fontfamily.asp) |
| fontWeight | number | 设置字体粗细 |
| gridSize | number | 单词的网格大小，默认为 8。 越大单词之间的间隔越大 |
| color | string|((word: string, weight: number) => string) | 设置字体颜色 |
| fontSize | [number,number] | 设置字体字号的最大值和最小值。，默认浏览器支持的最小字号：60 |
| rotation | [number,number] | 旋转的最小角度和最大角度 默认 [-π/2,π/2] |
| rotationSteps | number | 旋转实际的步数,越大可能旋转角度越小 |
| rotateRatio | number | 旋转的比率[0,1] 默认是 0.5 也就是 50%可能发生旋转 |
| active | object | hover 下词云图文字是否高亮效果, 默认开启.<br />- shadowColor: string 字体高亮时的阴影颜色，默认从字体颜色获取<br />- shadowBlur: number 字体阴影的高斯系数，默认为10<br /> |

## 图表组件

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
| domStyles | object | 配置tooltip样式<br />- g2-tooltip: object 设置tooltip容器的CSS样式<br />- g2-tooltip-title: object 设置tooltip标题的CSS样式<br />- g2-tooltip-list: object 设置tooltip列表容器的CSS 样式<br />- g2-tooltip-marker: object 设置tooltip列表容器中每一项 marker的CSS样式<br />- g2-tooltip-value: object 设置tooltip 列表容器中每一项 value的CSS样式<br /> |


## 事件

### onWordCloudHover

功能描述：hover 的 action 回调

类型: `(item: WordCloudData, dimension: Dimension, evt: MouseEvent, start: InnerStartFunction) => {};`

- `item` 表示词云图对象
- `dimension` 表示坐标信息[x,y,width,height]等
- `evt` 表示触摸事件对象
- `start` 表示内部的刷新回调函数 `(hoveredId: number) => void;` 当`hoveredId`不为-1 表示刷新立即刷新该 ID 的文本


### onWordCloudClick

功能描述： click 词云的 action 回调

类型: `(item: WordCloudData, dimension: Dimension, evt: MouseEvent, start: InnerStartFunction) => {};`

- `item` 表示词云图对象
- `dimension` 表示坐标信息[x,y,width,height]等
- `evt` 表示触摸事件对象
- `start` 表示内部的刷新回调函数 `(hoveredId: number) => void;` 当`hoveredId`不为-1 表示刷新立即刷新该 ID 的文本
  > 基本同 onWordCloudHover

### 图表区域事件

| onPlotClick<br />图表区域点击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotDblClick<br />图表区域双击事件 | onPlotMouseleave<br />图表区域鼠标离开事件 |
| --- | --- | --- | --- |
| onPlotMousemove<br />图表区域鼠标移动事件 | onPlotMousedown<br />图表区域鼠标按下事件 | onPlotMouseup<br />图表区域鼠标松开事件 | onPlotMouseenter<br />图表区域鼠标进入事件 |



