---
title: API
---

# 配置属性

### 图表容器

`markdown:common/chart-options.zh.md`

## 数据映射

### data 📌

**必选**, _array array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为二维数组，第一项对应左轴，第二项对应右轴，
例如：`[[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }], [{ time: '1991', count: 20 }, { time: '1992', count: 20 }]]`。

### meta

TODO

### xField 📌

**必选**, _string_

功能描述： 点形状在 x 方向位置映射对应的数据字段名，一般对应一个连续字段。

默认配置： 无

例如: `'time'`

### yField 📌

**必选**, _array string_

功能描述： 该项为二维数组，每一项都是，点形状在 y 方向位置映射所对应的数据字段名，一般对应一个连续字段。第一项对应左轴，第二项对应右轴

默认配置： 无

例如: `['value', 'count']`



## 图形样式

### geometryOptions

**可选**, _array object_

功能描述： 指定了双轴各自对应的图形，第一项为左轴配置，第二项为右轴配置。
每一个配置应为 Line 或 Column 类型的 Config
单轴支持图形范围包括折线图，多折线图，柱状图，分组柱状图，堆叠柱状图

#### LineOption


| 细分配置项名称 | 类型 | 功能描述 | 默认值 | 
| ----- | ----- | ----- | ----- |
| geometry | _string_ | 图形类型，`'line'`|
| seriesField | _string_ | 分类字段, 若存在，则为多折线|
| color | _string_ or _array string_ | 颜色，同折线图 |
| smooth | _boolean_ | 是否光滑，同折线图 | 
| style | | 样式，同折线图 |
| size | _number_ | 宽度，同折线图 | 
| point | _PointConfig | 点，同折线图 |
 
默认配置：采用 theme 中的色板。

例如
```js
{
  geometry : 'line'
  
}
```


#### ColumnOption


| 细分配置项名称 | 类型 | 功能描述 | 默认值 | 
| ----- | ----- | ----- | ----- |
| geometry | _string_ | 图形类型，`'column'`|
| colorField | _string_ | 颜色字段，同柱状图|
| seriesField | _string_ | 拆分字段，同柱状图 |
| isGroup | _boolean_ | 是否分组柱形图，同柱状图 | 
| groupField | _string_ | 分组拆分字段，同柱状图 |
| isStack | _boolean_ | 是否堆积柱状图，同柱状图 | 
| stackField | _boolean_ | 是否堆积柱状图，同柱状图 | 
| size | _number_ | 宽度，同柱状图 | 
| interval | _IntervalConfig | 柱子样式设置，同柱状图 |
 
默认配置：采用 theme 中的色板。

例如
```js
{
  geometry : 'line'
  
}
```

### sizeField

**可选**, _string_

功能描述: 点大小映射对应的数据字段名。

### size ✨

[**DEMO1**](../../scatter/basic#color-mapping)

**可选**, \_number | [number, number] | Function\_

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

[**DEMO2**](../../scatter/basic#shape-mapping)

**可选**, \_string | string[] | Function\_

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
