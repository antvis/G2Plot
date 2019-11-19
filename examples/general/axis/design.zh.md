---
title: 设计规范
---

## 定义

轴是用来定义一个坐标系的一组直线或一组曲线。

## 何时使用

目的是显示数据中的尺寸。常在：折线图、面积图，条形图、柱形图、散点图等图表中使用

## 元素

轴的常见元素包括：轴线、刻度线、轴上的网格线、文字标签和文字标题

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Dbb_TqO0WdwAAAAAAAAAAABkARQnAQ' width='800>

## 轴类型

轴通常分为：连续轴、时间轴、分类轴；他们同时存在于直角坐标系(如折线图、柱状图)和极坐标系(如饼图、环图、雷达图)中。

常见轴如下图所示：

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*PYVFSphMgecAAAAAAAAAAABkARQnAQ' width='800'>

## 轴标题

**何时使用**：通常用来描述当前轴的主题
**设计建议**：在图表内容无法对当前轴的主题和单位进行准确描述时，建议加上轴标题，且后跟数据单位。

**例**：生产总值（亿元）

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*-SqxRqB4EvMAAAAAAAAAAABkARQnAQ' width='800'>

## 轴标签

**设计建议**：
可根据图表类型设置轴标签是否显示、旋转角度以及显示间隔。

**默认方案**：
连续轴、时间轴默认自动抽样 + 不旋转；分类轴默认自动旋转 + 自动省略。

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*fOPmSY9QSJwAAAAAAAAAAABkARQnAQ' width='800'>

## 轴元素的显示策略

**设计建议**：
轴上所有的元素可根据图表类型设置不同的显示策略。

**1、折线、面积图为例**

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*whg2SLJc-Z4AAAAAAAAAAABkARQnAQ' width='800'>

**2、柱状图为例**

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*2VtiT5FechAAAAAAAAAAAABkARQnAQ' width='800'>

**3、条形图为例**

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*5UXYT5M4hA4AAAAAAAAAAABkARQnAQ' width='800'>

**4、散点图为例**

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*opqcQZ3M9ocAAAAAAAAAAABkARQnAQ' width='800'>

**另外：**
上面 4 个设计建议中提到的，轴标签「若图形区域内有数据标签」，则轴标签可以考虑隐藏，如下图：

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*WA83TZR9KUAAAAAAAAAAAABkARQnAQ' width='800'>