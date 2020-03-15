---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

## padding: number[] | string

**optional**

图表内边距，是边框相对绘图区域的边距。坐标轴 (axis）和图例 (legend) 都显示在这一区域。/>目前支持以下两种配置方式：

1. `padding: [10,10,10,10]`，顺序与 CSS 盒模型相同：上边距、右边距、下边距、左边距
1. `padding: 'auto'`，此为默认配置，将会自动计算边距所占的空间
