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

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

### dateField 📌

**必选**，_string_

功能描述： 日历图中对应日期数据的字段。

默认配置： 无

### valueField 📌

**必选**, _string_

功能描述： 日历图中对应每个格子中值的字段。

默认配置： 无

### months: string[] ✨

**可选**, _string[]_

功能描述：对应月份名称的数组。

默认配置：['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

### weeks: boolean ✨

**可选**，_string[]_

功能描述：对应星期名称的数组，从周日开始。

默认配置：['S', 'M', 'T', 'W', 'T', 'F', 'S']

## 图形样式

### colors

**可选**, _string | string[]_

功能描述： 日历图中对应 valueField 值映射的颜色数组或者字符串，例如：'#BAE7FF-#1890FF-#0050B3' 或者 ['#BAE7FF', '#1890FF', '#0050B3']。

默认配置： theme 中的默认色板

## 图表组件

### title

**可选**, _optional_

[DEMOS](../../general/title-description)

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

| 细分配置 | 类型    | 功能描述                                                                                                                                                                                                                                                                                  |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible  | boolean | 是否显示                                                                                                                                                                                                                                                                                  |
| position | string  | 位置，支持三种配置：<br />'left'                                                                                                                                                                                                                                                          | 'middle' | 'right' |
| style    | object  | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### description

**可选**, _optional_

[DEMOS](../../general/title-description)

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

| 细分配置 | 类型    | 功能描述                                                                                                                                                                                                                                                                                  |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible  | boolean | 是否显示                                                                                                                                                                                                                                                                                  |
| position | string  | 位置，支持三种配置：<br />'left'                                                                                                                                                                                                                                                          | 'middle' | 'right' |
| style    | object  | 样式：<br />- fontSize: number 文字大小<br />- fill: string 文字颜色<br />- stroke: string  描边颜色<br />- lineWidth: number 描边粗细<br />- lineDash: number 虚线描边<br />- opacity: number 透明度<br />- fillOpacity: number 填充透明度<br />- strokeOpacity: number 描边透明度<br /> |

### xAxis

**可选**, _object_

[DEMOS](../../general/axis)

功能描述： x 方向上的坐标轴，用于展示 xField 对应的映射信息

默认配置：

```js
visible: true,
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
    autoRotate: true,
    autoHide: true
},
title: {
    visible: false,
    offset: 12,
},
```

| 细分配置 | 类型    | 功能描述                                                                                                                                                                                                                                                                                                              |
| -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible  | boolean | 是否可见                                                                                                                                                                                                                                                                                                              |
| line     | object  | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br />                                                                                                                                                                                                                                       |
| grid     | object  | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br />                                                                                                                                                                                                                                         |
| label    | object  | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function  坐标轴标签格式化<br />- suffix: string 后缀<br />- offsetX: number 位置在 x 方向上的偏移量<br />- offsetY：number 位置在 y 方向上的偏移量<br />- style：object 样<br /> -autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转 |
| tickLine | object  | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br />                                                                                                                                                                                                                                           |
| title    | object  | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br />                                                                                                                                                                            |

### yAxis

**可选**, _object_

[DEMOS](../../general/axis)

功能描述： y 方向上的坐标轴，用于展示 yField 对应的映射信息

默认配置：

```js
visible: true,
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
    autoRotate: true,
    autoHide: true
},
title: {
    visible: true,
    offset: 12,
},
```

| 细分配置     | 类型    | 功能描述                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible      | boolean | 是否可见                                                                                                                                                                                                                                                                                                                                                                                      |
| tickCount    | number  | 坐标轴刻度数量                                                                                                                                                                                                                                                                                                                                                                                |
| tickInterval | number  | 坐标轴刻度间隔                                                                                                                                                                                                                                                                                                                                                                                |
| min          | number  | 设置坐标轴最小值                                                                                                                                                                                                                                                                                                                                                                              |
| max          | number  | 设置坐标轴最大值                                                                                                                                                                                                                                                                                                                                                                              |
| line         | object  | 坐标轴轴线<br />- visible: boolean 是否可见<br />- style：object 轴线样式<br />                                                                                                                                                                                                                                                                                                               |
| grid         | object  | 网格线<br />- visible: boolean 是否可见<br />- style：object 网格线样式<br />                                                                                                                                                                                                                                                                                                                 |
| label        | object  | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化 DEMO<br />- suffix: string 后缀<br />- precision：number  标签精度，如配置为 2，则格式化为 2 位小数<br />- offsetX: number 位置在 x 方向上的偏移量<br />- offsetY：number 位置在 y 方向上的偏移量<br />- style：object 样<br /> -autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转 |
| tickLine     | object  | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br />                                                                                                                                                                                                                                                                                                                   |
| title        | object  | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br />                                                                                                                                                                                                                                                    |

### tooltip

**可选**, _object_

功能描述：信息提示框

默认配置：

```js
visible: true,
offset: 20,
```

| 细分属性 | 类型    | 功能描述           |
| -------- | ------- | ------------------ |
| visible  | boolean | 是否显示           |
| offset   | number  | 距离鼠标位置偏移值 |

### label

**可选**, _object_

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

| 细分配置  | 类型     | 功能描述                                 |
| --------- | -------- | ---------------------------------------- |
| visible   | boolean  | 是否显示                                 |
| formatter | function | 对文本标签内容进行格式化                 |
| offsetX   | number   | 在 label 位置的基础上再往 x 方向的偏移量 |
| offsetY   | number   | 在 label 位置的基础上再往 y 方向的偏移量 |
| style     | object   | 配置文本标签样式。                       |

## 事件

### 矩形事件

| onRectClick<br />矩形点击事件       | onRectDblClick<br />矩形双击事件      | onRectDblClick<br />矩形双击事件    | onRectMouseleave<br />矩形鼠标离开事件 |
| ----------------------------------- | ------------------------------------- | ----------------------------------- | -------------------------------------- |
| onRectMousemove<br />矩形标移动事件 | onRectMousedown<br />矩形鼠标按下事件 | onRectMouseup<br />矩形鼠标松开事件 | onRectMouseenter<br />矩形鼠标进入事件 |

### 图表区域事件

| onPlotClick<br />图表区域点击事件         | onPlotDblClick<br />图表区域双击事件      | onPlotDblClick<br />图表区域双击事件    | onPlotMouseleave<br />图表区域鼠标离开事件 |
| ----------------------------------------- | ----------------------------------------- | --------------------------------------- | ------------------------------------------ |
| onPlotMousemove<br />图表区域鼠标移动事件 | onPlotMousedown<br />图表区域鼠标按下事件 | onPlotMouseup<br />图表区域鼠标松开事件 | onPlotMouseenter<br />图表区域鼠标进入事件 |

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

## destory()

**可选**

销毁图表。

## getData()

获取图表数据。

## getPlotTheme()

获取图表 theme。
