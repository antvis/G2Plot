---
title: Ring - 环图
order: 0
---

## 图表故事

环图与饼图基本功能类似，用于比较整体和部分的关系，每个弧形切片表示整体中的一个分类。由饼图挖空中心部分构成，通常在中心部分会放置解释性文本。

## 数据类型

环图适合的数据类型为一个分类数据字段和一个连续数据字段。在下面这个例子中，`type`为分类字段，`value`为联系字段。

```
const data = [
  {type:'a',value: 100},
  {type:'b',value:60},
  {type:'c',value: 30}
 ];
```

在进行图表绘制的时候，分类字段将映射到弧形切片的颜色，而连续字段将映射到弧形的面积（占比）。

## 图表用法

- **Dont's**
  - 数据条数超过 9 条
  - 数据之间的差异极小

* **Do**
  - 将多个极小值合并为一个（注：这里可以链一个 demo)
  - 将数据按占比从高到低排列

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

#### innerRadius: number

**optional**

环图的内环半径，原点为画布中心。半径和内环半径决定了环图的厚度(thickness)。

配置范围为[0,1]，0 代表环图被完全填充，变为饼图，没有中心挖空部分，1 代表环图的厚度为 0。默认值为 0.8。

#### annotation

**optional**

图表的辅助标注

##### centralText

中心文本

`content: string|object`    中心文本内容，用户可以指定一段文字(此时中心文本单行显示)或一组数据(此时中心文本分两行显示)，指定数据时需采用{ name:xxx, value:xxx }的格式。如不配置 content，则默认显示第一行数据。/>
`htmlContent: string` as br    自定义中心文本，用户可以根据 htmlContent 方法的 data 参数定义中心文本 dom 节点的构成和显示方式。/>
`onActive: boolean` as br    是否自动响应鼠标交互。当设置为 true 时，鼠标滑过弧形切片时中心文本显示当前弧形切片内容，此时 tooltip 默认不再显示。

用法：

```
annotation: [
  { type: 'centralText',
    onActive: true
  }]
```

### 通用图表配置

#### title

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### description

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### width

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### height

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### forceFit

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### padding

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

#### theme

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### tooltip

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### legend

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

---

## 与饼图相同的配置

#### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一, value: 20 }, { segment: 分类二, value: 20 }]。

#### radius: number

**optional**

饼图的半径，原点为画布中心。配置值域为[0,1]，0 代表饼图大小为 0，即不显示，1 代表饼图撑满绘图区域。/>默认值为 0.8, 即 width / as br 2 \* 0.8。

#### angleField: string

**required**

扇形切片大小(弧度)所对应的数据字段名。

#### colorField: string

**optional**

扇形切片颜色所对应的数据字段名。

#### color: string | string[] | function

**optional**

指定切片颜色。如不进行配置则采用 theme 中的配色。

#### label

**optional**

`visible: boolean`    图形标签是否显示<br />
`type: 'inner' | 'outer' | 'spider'`    图形标签的类型<br/>
`formatter: function`  对 label 的显示文本进行格式化。/> as br

注意：当配置了 colorField，即扇形切片接受分类类型的颜色映射，此时 spider label 的文本为上下显示，此时 formatter 方法入参为 angleField 及 colorField 两个字段对应的值，返回值应为数组。

```
label: {
  type: 'spider',
  formatter:(angleField, colorField)=>{
    return ['value1','value2'];
  }
}
```

#### events

**optional**

- 图形事件

  `onPieClick: function`  图形点击事件<br />
  `onPieDoubleClick: function`    图形双击事件<br />
  `onPieMousemove: function`  图形鼠标移动事件<br />
  `onPieContextmenu: function`    图形右键事件<br />

- 其他事件类型见[通用图表配置](../generalConfig.zh-CN.md)。
