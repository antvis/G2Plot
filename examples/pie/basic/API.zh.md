---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### title

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#title)。

### description

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#description)。

### width

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#width)。

### height

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#height)。

### forceFit

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#forceFit)。

### padding

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#padding)。

### theme

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#theme)。

### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]。

### radius: number

**optional**

饼图的半径，原点为画布中心。配置值域为 [0,1]，0 代表饼图大小为 0，即不显示，1 代表饼图撑满绘图区域。<br/>
默认值为 0.8, 即 width / 2 \* 0.8。

### angleField: string

**required**

扇形切片大小（弧度）所对应的数据字段名。

### colorField: string

**optional**

扇形切片颜色所对应的数据字段名。

#### color: string | string[] | function

**optional**

指定切片颜色。如不进行配置则采用 theme 中的配色。

### tooltip

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#legend)。

### label

optional

`visible: boolean`    图形标签是否显示

`type: 'inner' | 'outer' | 'spider'`    图形标签的类型

<img src="https://gw.alipayobjects.com/zos/antfincdn/nE%26kzHO1B%24/ca7bb353-6e8b-47ca-a1bf-557474ebc17c.png" alt="image.png" style="visibility: visible; width: 600px; height: 248px;">

`formatter: function` 对 label 的显示文本进行格式化

> 注意：当配置了 colorField，即扇形切片接受分类类型的颜色映射，此时 spider label 的文本为上下显示，此时 formatter 方法入参为 angleField 及 colorField 两个字段对应的值，返回值应为数组。

```js
label: {
  type: 'spider',
  formatter: (angleField, colorField) => {
    return [ 'value1','value2' ];
  }
}
```

### events

**optional**

- 图形事件

`onPieClick: function`  图形点击事件<br />
`onPieDoubleClick: function`    图形双击事件<br />
`onPieMousemove: function`  图形鼠标移动事件<br />
`onPieContextmenu: function`    图形右键事件<br />

- 其他事件类型见[通用图表配置](../../../../zh/docs/manual/general-config#events)。
