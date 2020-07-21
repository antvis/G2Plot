---
title: API
---

## 分类轴：catergoryAxis

功能描述： 用于展示分类数据映射信息的坐标轴，柱状图 xAxis 及条形图 yAxis 都属于分类轴

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
| grid     | object  | 网格线<br />- visible: boolean 是否可见<br />- line：object 网格线样式<br />                                                                                                                                                                                                                                         |
| label    | object  | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function  坐标轴标签格式化<br />- suffix: string 后缀<br />- offsetX: number 位置在 x 方向上的偏移量<br />- offsetY：number 位置在 y 方向上的偏移量<br />- style：object 样<br /> -autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转 |
| tickLine | object  | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br />                                                                                                                                                                                                                                           |
| title    | object  | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br />                                                                                                                                                                            |

### linearAxis

功能描述： 用于展示连续性映射数据的坐标轴，如柱状图、折线图的 yAxis

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
| grid         | object  | 网格线<br />- visible: boolean 是否可见<br />- line：object 网格线样式<br />                                                                                                                                                                                                                                                                                                                 |
| label        | object  | 坐标轴标签<br />- visible: boolean 是否可见<br />- formatter: function 坐标轴标签格式化 DEMO<br />- suffix: string 后缀<br />- precision：number  标签精度，如配置为 2，则格式化为 2 位小数<br />- offsetX: number 位置在 x 方向上的偏移量<br />- offsetY：number 位置在 y 方向上的偏移量<br />- style：object 样<br /> -autoHide: boolean 是否自动隐藏<br/>-autoRotate: boolean 是否自动旋转 |
| tickLine     | object  | 坐标轴刻度<br />- visible：boolean 是否可见<br />- style: object 样式<br />                                                                                                                                                                                                                                                                                                                   |
| title        | object  | 坐标轴标题<br />- visible： boolean 是否可见<br />- text: string 标题文字<br />- offset: number 位置偏移量<br />- style：object 样式<br />                                                                                                                                                                                                                                                    |
