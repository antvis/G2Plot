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

### autoFit

**可选**, _boolean_

功能描述： 画布是否自动适配容器大小，当 `autoFit` 设置为 true 时，`width` 和 `height` 的设置将失效。

默认配置： `true`

### padding

**可选**, number[] | number | 'auto'

功能描述： 画布的 `padding` 值，或者开启 `auto`

### appendPadding

**可选**, number[] | number

功能描述： 额外怎加的 `appendPadding` 值

### renderer

**可选**, _string_

功能描述: 设置图表渲染方式为 `canvas` 或 `svg`

默认配置： `canvas`

### pixelRatio

**可选**, number

功能描述: 设置图表渲染的像素比

默认配置： `window.devicePixelRatio`

## 数据映射

### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

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

const scatterPlot = new Scatter('container', {
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
  colorField: 'country',
});
scatterPlot.render();

```

### xField 📌

**必选**, _string_

功能描述： 点形状在 x 方向位置映射对应的数据字段名，一般对应一个连续字段。

默认配置： 无

### yField 📌

**必选**, _string_

功能描述： 点形状在 y 方向位置映射所对应的数据字段名，一般对应一个连续字段。

默认配置： 无

### type

**可选**, `jitter` | `stack` | `symmetric` | `dodge`;

功能描述： 数据调整类型，不建议修改。

默认配置： `jitter`

### colorField

**可选**, _string_

功能描述: 点颜色映射对应的数据字段名。

## 图形样式

### color

**可选**, _string | string[] | Function_

[**DEMO1**](../../scatter/basic#color-mapping)

功能描述： 指定点的颜色。如没有配置 colorField，指定一个单值即可。对 colorFiled 进行了配置的情况下，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。

默认配置：采用 theme 中的色板。

```js
// 设置单一颜色
color: '#a8ddb5'
// 设置多色
colorField: 'type',
color: ['#d62728', '#2ca02c', '#000000'],
// Function
colorField: 'type',
color: (type) => {
  if(type === 'male'){
    return 'red';
  }
  // TODO
  return 'yellow';
},
```

### sizeField

**可选**, _string_

功能描述: 点大小映射对应的数据字段名。

### size ✨

_
**可选**, \_number | [number, number] | Function_

功能描述： 指定点的大小。如没有配置 sizeField，指定一个即可。对 sizeFiled 进行了配置的情况下，可以指定大小数组 `[minSize, maxSize]`， 也可以通过回调函数的方法根据对应数值进行设置。

```js
// 设置单一大小
size: 10
// 大小区间
sizeField: 'weight',
size: [2, 10],
// Function
sizeField: 'weight',
size: (weight) => {
  // TODO
  return Math.floor(weight / 100);
},
```

### shapeField

**可选**, _string_

功能描述: 点形状映射对应的数据字段名。

### shape ✨

_
**可选**, \_string | string[] | Function_

功能描述： 指定点的形状。如没有配置 shapeField ，指定一个即可。对 shapeField 进行了配置的情况下，可以指定形状数组 `['cicle', 'square']`， 也可以通过回调函数的方法根据对应数值进行设置。

内置图形：circle, square, bowtie, diamond, hexagon, triangle,triangle-down, hollow-circle, hollow-square, hollow-bowtie,hollow-diamond, hollow-hexagon, hollow-triangle, hollow-triangle-down, cross, tick, plus, hyphen, line.

```js
// 设置单一大小
shape: 'square'
// 大小区间
shapeField: 'gender',
shape: ['circle', 'square'],
// Function
shapeField: 'gender',
shape: (gender) => {
   if(type === 'male'){
    return 'circle';
  }
  // TODO
  return 'square';
},
```

### pointStyle ✨

**可选**, _object_

[**DEMO**](../../scatter/basic#color-mapping)

功能描述： 设置折线样式。pointStyle 中的`fill`会覆盖 `color` 的配置。pointStyle 可以直接指定，也可以通过 callback 的方式，根据数据指定单独的样式。

默认配置：

| 细分配置      | 类型   | 功能描述   |
| ------------- | ------ | ---------- |
| fill          | string | 填充颜色   |
| stroke        | string | 描边颜色   |
| lineWidth     | number | 线宽       |
| lineDash      | number | 虚线显示   |
| opacity       | number | 透明度     |
| fillOpacity   | number | 填充透明度 |
| strokeOpacity | number | 描边透明度 |

```js
// 直接指定
pointStyle: {
  fill: 'red',
  stroke: 'yellow',
  opacity: 0.8
}
// 回调
pointStyle: (x, y, colorField) => {
  if (colorField === 'male') {
    return {
      fill: 'green',
      stroke: 'yellow',
      opacity: 0.8,
    }
  }
  // TODO
  return {
    fill: 'red',
    stroke: 'yellow',
    opacity: 0.8,
  };
};
```

## 图表组件

`xAxis`、`yAxis` 、`legend` 、`tooltip` 、`label`、`theme` 等通用组件请参考图表通用配置

## 事件

[通用 events](../../general/events/API)

### 点图形事件

| onPointClick<br />点点击事件         | onPointDblClick<br />点双击事件     | onPointDblClick<br />点双击事件    | onPointMouseleave<br />点鼠标离开事件 |
| ------------------------------------ | ----------------------------------- | ---------------------------------- | ------------------------------------- |
| onPointMousemove<br />点鼠标移动事件 | onPlotMousedown<br />点鼠标按下事件 | onPointMouseup<br />点鼠标松开事件 | onPointMouseenter<br />点鼠标进入事件 |
