---
title: 设计规范
---

## 何时使用

饼图通过扇形区块的面积，弧度和颜色等视觉标记，展现数据的分类和占比情况。它的特点是展现部分与部分之间，以及部分与整体的关系。部分相加之和等于整体的 100%，用整圆表示。

## 数据类型

| **适合的数据**       | 一个「分类维度字段」和一个「数值度量字段」                                   |
| -------------------- | ---------------------------------------------------------------------------- |
| **功能**             | 对比分类数据的数值大小                                                       |
| **数据与图形的映射** | 「维度字段」的计数映射区块颜色和数量；「度量字段」的聚合值映射区块弧长和面积 |
| **适合的数据条数**   | 建议区块数目不超过 9 种，超出的部分可以考虑合并显示为“其它”                  |

## 用法建议

### 相对于饼图，更推荐使用环图

<img alt="design" src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*1OTpRJrwhgoAAAAAAAAAAABkARQnAQ' width='800'>

### 推荐使用复合指标显示在中心

<img alt="design" src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ulhDRpGQRmoAAAAAAAAAAABkARQnAQ' width='800'>

## 元素

<img alt="design" src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*rUSJQJmhtQ8AAAAAAAAAAABkARQnAQ' width='800'>

- 图形(Element)：饼图由扇形组成，环图由滑块组成。
- 图形标签(Label)：显示各个区块的占比（%），名称（华东、华南、华北）和实际数值（123.45）。
- 复合指标：在环图中心位置处显示，或以指标卡形式显示在图表上部分，。
- 图形辅助组件(Info Component)：图例，tooltip 或者指标卡等的组件支持。
