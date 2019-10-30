---
title: Gauge 仪表盘
order: 0
---

## 图表故事

仪表盘(Gauge)是一种拟物化的图表，刻度表示度量，指针表示维度，指针角度表示数值。仪表盘图表就像汽车的速度表一样，有一个圆形的表盘及相应的刻度，有一个指针指向当前数值。目前很多的管理报表或报告上都是用这种图表，以直观的表现出某个指标的进度或实际情况。

仪表盘的好处在于它能跟人们的常识结合，使大家马上能理解看什么、怎么看。拟物化的方式使图标变得更友好更`人性化`，正确使用可以提升用户体验。<br />仪表盘的圆形结构，可以更有效的`利用空间`。

为了视觉上的不拥挤且符合常识，我们建议指针的数量不超过  **3**  根。

## 数据类型

仪表盘适合的数据类型为一个`numder`类型

## 图表用法

- Dont's
  - 如果有多个数据要展示，建议拆成多个仪表盘展示
  - 数据之间差异极小或者非一个量级数据对比

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### title

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### description

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### width

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### height

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### forceFit

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### padding

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### theme

**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### data:number

**required**

数据源为对象集合，数据类型为 number。

### min:number

**optional**

仪表盘刻度最小值。默认为 0。

### max:number

**optional**

仪表盘刻度最大值。默认为 1。

### range:number[]

**optional**

仪表的色条范围区间，数组的前后两项组成的元组将对应一个颜色区间，例如：[0, 40, 60, 100]。

### label:number

**optional**

当 label 为 boolean 值时，为指示文字标签是否显示；

当 label 为一个 function 时，则该函数的两个入参分别是将要显示的数值 value，以及经过了格式化函数后的 formatted，该函数返回 html 字符串。

### formatter:number

**optional**

显示文字标签时对数值文本进行格式化的函数.该函数的入参为原本显示的数值。

示例如下：

```
format = (value) => `${value}%`
```
