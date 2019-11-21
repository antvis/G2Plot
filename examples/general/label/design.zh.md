---
title: 设计规范
---

## 定义

在图表中，标签是对当前的一组数据进行的内容标注。

## 元素

包括数据点、拉线、文本数值等元素，根据不同的图表类型选择使用。

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*zBZ7SpiXpvMAAAAAAAAAAABkARQnAQ' width='1000'>

## 显示策略

通常标签显示在图形外，但在「堆叠类」图表中，标签会显示在图形内。如下图：

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*gKp9S4i6oQ4AAAAAAAAAAABkARQnAQ' width='500'>

标签的文本和图形经常需要交叠展示，所以可读性需要足够良好，所以通过对HS值的判断，决定文字的颜色。这样对比度就在可控范围内，不会出现可读性的问题。

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*kUOSQ5x9xWUAAAAAAAAAAABkARQnAQ' width='400'>

## 常见问题

### 问题1：图表标签重叠时怎么办？

标签重叠时，g2plot 的默认方案为动态计算的抽样显示，在标签重叠时，自动隐藏其中一个，同时当 Hover 图表时，显示被隐藏的对应的数据。这样保证了图表的清晰度，也保证了信息的完整性。

<img src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*avVtSr0ZlugAAAAAAAAAAABkARQnAQ' width='500'>

### 问题2：我可以自定义标签吗？

可以，通过配置项你可以修改标签的样式，包括点的形状、文字大小等，但我们还是建议您使用默认方案。