---
title: 设计规范
---

## 定义

　　二维空间里统计图表中的轴，是用来定义坐标系中数据在方向和值的映射关系的图表组件。

## 何时使用

　　在二维笛卡尔坐标系中，轴通常为水平方向的横轴（x 轴）和竖直方向的纵轴（y 轴）。极坐标系中，轴分为切向的切向轴（angle）和径向轴（radius）。

## 元素

　　轴的元素包括：轴线、轴刻度线、轴标签和轴标题和坐标网格线。

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Dbb_TqO0WdwAAAAAAAAAAABkARQnAQ' width='800'>

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