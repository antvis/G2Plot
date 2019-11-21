---
title: 设计规范
---

## 定义

图例解释了图表区域中包含的所有视觉元素的含义。

## 何时使用

对图表中的图形进行解释说明，用来映射图形的尺寸、颜色、数值大小等含义，帮助用户直观地理解图表。

## 元素

由映射图形形状 + 文本组成。

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Owf5Rr8Llz0AAAAAAAAAAABkARQnAQ' width='1000'>

## 类型

根据数据类型不同，分为**连续型图例**和**分类型图例**。

根据状态不同，图例可以被设置为**静态**或**可交互态**。

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*kA9vS6rL5xIAAAAAAAAAAABkARQnAQ' width='1000'>

## 常见问题

### 问题1：如何决定图例的位置？

图例是对图形本身的概括。通常人的视觉动线是从上至下，从左到右。默认把图例放在左上角去做一个通用的方案看起来没毛病。
但更好的做法是：**缩短用户对照图例看图形的本能路径，提升信息获取效率**。

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*UKS2TbpxxYgAAAAAAAAAAABkARQnAQ' width='1000'>

虽然图例的位置从技术上支持了12个位置，我们总结了图例在不同的图表类型中不同的位置后，经过克制收敛为两类，并应用在 plot 图表类库中，以及智能生成图表工具中。

**设计者和观看者甚至并不会感知到位置的变化，但是对应图形获取信息的效率就在不经意间提升了。**

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*l-KKRYWtmrIAAAAAAAAAAABkARQnAQ' width='600'>

### 问题2：图例太多怎么办？

在 g2plot 中，图例如果占据了图表大部分的位置，你可以发现我们提供了翻页功能。
