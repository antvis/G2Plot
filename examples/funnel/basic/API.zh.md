---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### data: collection

**required**

数据源为对象集合，例如：`[{ action: '浏览网站', pv: 50000 }, { action: '放入购物车', pv: 35000 }, { action: '生成订单', pv: 25000 }]`。

### xField: string

**required**

漏斗条目对应的数据字段名，一般对应一个分类字段。

### yField: string

**required**

漏斗数值对应的数据字段名，一般对应一个离散字段。

### dynamicHeight: boolean

设置漏斗数值映射关系。`false` 数值大小映射到漏斗形状宽度，视觉上呈现为定高度变角度的漏斗图。`true` 数值大小映射到漏斗图形高度，视觉上呈现为定角度变高度的漏斗图。

默认为 `false`。

|                                                                                |                                                                                |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| ![固定高度](https://gw.alicdn.com/tfs/TB1XLBxuxn1gK0jSZKPXXXvUXXa-590-386.png) | ![动态高度](https://gw.alicdn.com/tfs/TB1Ju4wuEH1gK0jSZSyXXXtlpXa-516-389.png) |
| `dynamicHeight: false`                                                         | `dynamicHeight: true`                                                          |

### transpose: boolean

**optional**

设置布局方式，`false` 为垂直布局，`true` 为水平布局，默认为 `false`。

|                                                                            |                                                                            |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![垂直](https://gw.alicdn.com/tfs/TB1XLBxuxn1gK0jSZKPXXXvUXXa-590-386.png) | ![水平](https://gw.alicdn.com/tfs/TB1ghUYuX67gK0jSZPfXXahhFXa-499-452.png) |
| `transpose: false`                                                         | `transpose: true`                                                          |

### compareField: string

**optional**

对比漏斗图必选。

数据集中的对比字段名，一般对应一个分类字段。

通过该字段值，漏斗图将会被分成两组，通过左右镜像位置区分，视觉上呈现为对比漏斗图。

注意，由于对比漏斗图左右图形对称布局，数值大小只能映射在漏斗形状宽度，所以启动 `compareField` 时 `dynamicHeight` 设置 `true` 将无效。

例如 [代码演示](../basic/#compare) 中以 `quarter` 作为对比字段进行两个季度数据的比较。

### compareText

**optional**

配置对比漏斗图位于侧方的分类文案样式及显示。

![](https://gw.alicdn.com/tfs/TB137asuAT2gK0jSZFkXXcIQFXa-394-117.png)

`visible: boolean`: 是否显示分类文案<br/>
`offsetX: number`: 分类文案相对漏斗图形左侧沿 x 方向的偏移量，仅在水平布局有效<br/>
`offsetY: number`: 分类文案相对漏斗图形上侧沿 y 方向的偏移量，仅在垂直布局有效<br/>
`style: object`: 分类文案样式<br/>

### percentage

**optional**

配置转化率样式及内容。在漏斗图中，转化率展示由 _固定线段_、_固定文案_、_数值文案_ 3 个部分组成，样式及内容可以分别通过 `percentage.line`、`percentage.text`、`percentage.value` 配置。

![转化率组成图](https://gw.alicdn.com/tfs/TB1pLtAuuL2gK0jSZPhXXahvXXa-258-104.png)

`visible: boolean` 是否显示转化率<br />
`line.visible: boolean` 是否显示固定线段<br />
`line.style: object` 固定线段样式<br />
`text.visible: boolean` 是否显示固定文案<br />
`text.style: object` 固定文案样式<br />
`text.content: string` 固定文案内容<br />
`value.visible: boolean` 是否显示数值文案<br />
`value.style: object` 数值文案样式<br />
`value.formatter: (yValueUpper, yValueLower) => string` 数值文案内容<br />
`offsetX: number`  在当前位置基础上再往 x 方向的偏移量<br />
`offsetY: number`  在当前位置基础上再往 Y 方向的偏移量<br />
`spacing: number` 固定线段、固定文本、数值文案之间的间隔<br />

### funnelStyle: object | function

**optional**

配置漏斗单个图形样式。
