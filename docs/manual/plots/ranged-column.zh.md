---
title: Ranged-Column 区间柱状图
order: 5
---

# 数据类型

区间柱状图的数据结构为一个分类字段及一个由数值Array构成的连续字段。

示例数据：

```js
{
  level:'E',
  values: [10,50]
}
```

以示例数据举例，在区间柱状图中，分类字段 level 映射到 X 轴，而连续字段 values 映射到 Y 轴，values的两个值分别决定了柱形在 Y 方向上的伸展区域。


## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

#### data

**required**

数据源为对象集合，例如：`[{ segment: 分类一，values: [ 20, 50 ] }, { segment: 分类二，value: [10, 40] }]`。

#### label

**optional**

`visible: boolean`    图形标签是否显示 <br />
`position: 'outer' | 'inner'`     图形标签位于柱形的内部还是两端 <br />
`formatter: function`  对 label 的显示文本进行格式化 <br />
`offsetX: number` 在 label 位置的基础上再往 x 方向的偏移量 <br />
`offsetY: number` 在 label 位置的基础上再往 y 方向的偏移量 <br />
`style: object` 配置label样式 <br />
`topStyle: object` 配置上部 label 样式，优先级高于`style` <br />
`bottomStyle: object` 配置下部 label 样式, 优先级高于`style` <br />
`adjustColor: boolean` 是否根据图形颜色自动调整label颜色，仅在position为inner时有效  <br />
`adjustPosition: boolean` 当图形无法容纳label时是否自动调整位置，仅在position为inner时有效 

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

### xAxis

**optional** 见[通用图表配置](../general-config#categoryaxis)。

### yAxis

**optional** 见[通用图表配置](../general-config#linearaxis)。

### tooltip

**optional** 见[通用图表配置](../general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../general-config#legend)。

---

### 与基础柱状图相同的配置

#### data

**required** 见[基础柱状图配置](./column#data-collection)

#### xField

**reqiured** 见[基础柱状图配置](./column#xfield-string)

#### yField

**reqiured** 见[基础柱状图配置](./column#yField-string)

#### color

**optional** 见[基础柱状图配置](./column#color-string--string--function)

#### columnSize

**optional** 见[基础柱状图配置](./column#columnsize-number)

#### columnStyle

**optional** 见[基础柱状图配置](./column.zh#columnstyle-object--function)

#### label

**optional** 见[基础柱状图配置](./column#label)

#### events

**optional**

- 图形事件 见[基础柱状图配置](./column#events)

- 其他事件类型见[通用图表配置](../general-config#events)。
