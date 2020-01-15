---
title: Pie - 饼图
order: 9
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*qFVQQL25Lo4AAAAAAAAAAABkARQnAQ" width="400">

## 图表故事

饼图主要用于表示不同分类的占比情况。饼图中的每个扇形切片表现一个分类，扇形切片的弧度表示该分类在整体中的占比，所有切片构成一个整体，即 100%。

饼图是一个饱受争议的图表类型，有人认为饼图看起来难以阅读，我们的视觉系统只能判断出一个切片比一个切片要大，但很难确定大多少。在一些极端的情况下，饼图各切片大小相近，饼图将变得失去其功能性。如果你也有这种担心的话，可以使用条形图代替。

## 数据类型

饼图适合的数据类型为一个分类数据字段和一个连续数据字段。在下面这个例子中，`type` 为分类字段，`value` 为联系字段。

```js
const data = [
  { type: 'a', value: 100 },
  { type: 'b', value: 60 },
  { type: 'c', value: 30 },
];
```

在进行图表绘制的时候，分类字段将映射到扇形切片的颜色，而连续字段将映射到扇形的面积（占比）。

## 图表用法

- **Dont's**
  - 数据条数超过 9 条
  - 数据之间的差异极小

* **Do**
  - 将多个极小值合并为一个（注：这里可以链一个 demo)
  - 将数据按占比从高到低排列

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

### radius

**optional**, number 类型

饼图的半径，原点为画布中心。配置值域为 [0,1]，0 代表饼图大小为 0，即不显示，1 代表饼图撑满绘图区域。<br/>
默认值为 0.8, 即 width / 2 \* 0.8。

### angleField

**required**, string 类型

扇形切片大小（弧度）所对应的数据字段名。

### colorField

**optional**, string 类型

扇形切片颜色所对应的数据字段名。

#### color

**optional**, string | string[] | function 类型

指定切片颜色。如不进行配置则采用 theme 中的配色。

### tooltip

**optional** 见[通用图表配置](../general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../general-config#legend)。

### label

**optional**

`visible: boolean`    图形标签是否显示<br />
`type: 'inner' | 'outer' | 'spider'`    图形标签的类型<br />

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*GnO6SaWohv0AAAAAAAAAAABkARQnAQ" alt="image.png" style="visibility: visible; width: 600px; height: 248px;">

`formatter: function` 对 label 的显示文本进行格式化

> 注意：当配置了 colorField，即扇形切片接受分类类型的颜色映射。
> 
> 此外 spider label 的文本默认为上下显示，返回值可以是 string 类型也可以是 string 数组（[bottom, top]）。

```js
label: {
  type: 'spider',
  formatter: (text, item, index) => {
    return [ 'value1','value2' ];
  },
}
```

### events

**optional**

- 图形事件

`onPieClick: function`  图形点击事件<br />
`onPieDoubleClick: function`    图形双击事件<br />
`onPieMousemove: function`  图形鼠标移动事件<br />
`onPieContextmenu: function`    图形右键事件<br />

- 其他事件类型见[通用图表配置](../general-config#events)。
