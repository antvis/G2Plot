---
title: Group-Bar 分组条形图
order: 0
---

## 图表故事

分组条形图是基础条形图的扩展形式，适合于在同一个轴上展示不同维度下相同分类的数据。相比于堆叠条形图，分组条形图更适合进行不同维度下同一分类的横向数值的比较，但缺点是无法直观的看到各维度总和的对比。

分组条形图和堆叠条形图是一对“矛盾”，一方的缺点恰恰是另一方的优点，可以根据具体场景选择使用。

## 数据类型

分组柱状图适合的数据类型为两个**分类字段**（分类字段、分组字段）和一个**连续字段**（数值）。在下面这个例子中，`type`为分类数据字段，`quarter`为分组数据字段，`value`为离散数据字段。

```typescript
const data = [
  { type: 'a', quarter: 'Q1', value: 100 },
  { type: 'a', quarter: 'Q2', value: 70 },
  { type: 'a', quarter: 'Q3', value: 20 },
  { type: 'b', quarter: 'Q1', value: 10 },
  { type: 'b', quarter: 'Q2', value: 50 },
  { type: 'b', quarter: 'Q3', value: 40 },
  { type: 'c', quarter: 'Q1', value: 30 },
  { type: 'c', quarter: 'Q2', value: 50 },
  { type: 'c', quarter: 'Q3', value: 20 },
];
```

图表绘制时，每一个分类对应一组条形，映射到 y 轴，而分组字段决定一组条形的分布情况，而连续字段决定条形的长度，映射到 x 轴。

## 图表用法

- **Dont's**

  - 分类数目过多，这将使数据变得难以比较
  - x 轴不以 0 值为起点，将有可能导致错误的比例关系

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

#### groupField: string

**reqiured**

数据集中的分组字段名，通过该字段的值，条形将会被分为多个组，通过颜色进行区分。

---

### 通用图表配置

#### title

**optional** 见[通用图表配置](../general-config#title)。

#### description

**optional** 见[通用图表配置](../general-config#description)。

#### width

**optional** 见[通用图表配置](../general-config#width)。

#### height

**optional** 见[通用图表配置](../general-config#height)。

#### forceFit

**optional** 见[通用图表配置](../general-config#forceFit)。

#### padding

**optional** 见[通用图表配置](../general-config#padding)。

#### theme

**optional** 见[通用图表配置](../general-config#theme)。

### tooltip

**optional** 见[通用图表配置](../general-config#theme)。

### legend

**optional** 见[通用图表配置](../general-config#legend)。

---

### 与基础条形图相同的配置

#### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]。

#### xField: string

**required**

条形在 x 方向长度映射对应的数据字段名，一般对应一个离散字段。

#### yField: string

**required**

条形在 y 方向位置映射所对应的数据字段名，一般对应一个分类字段。

#### colorField: string

**optional**

条形颜色映射对应的数据字段名。

#### color: string | string[] | function

**optional**

指定条形颜色。如不进行配置则采用 theme 中的配色。

#### barSize: number

**optional**

设置条形的高度为一个固定值。

#### barStyle: object | function

**optional**

配置条形样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度<br />

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

#### events

**optional**

- 图形事件
  `onBarClick: function`  条形点击事件<br />
  `onBarDblClick: function`  条形双击事件<br />
  `onBarMousemove: function`  条形鼠标移动事件<br />
  `onBarContextmenu: function`    条形右键事件

- 其他事件类型见[通用图表配置](../general-config#events)。
