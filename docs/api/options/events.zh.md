---
title: 图表事件
order: 6
---

### 事件类别

在 G2Plot 中(继承 G2 事件)，我们将事件分成为几种事件类型：

#### 1. 基础事件

> 主要包含有 DOM 的基础事件。

- **mouse 事件**
  - mousedown
  - mousemove
  - mouseup
  - mouseover
  - mouseout
  - mouseenter
  - mouseleave
- **touch 事件 (移动端事件)**
  - touchstart
  - touchmove
  - touchend
  - touchcancel
- drag 事件
  - dragenter
  - dragover
  - dragleave
  - drop
- contextmenu 右键事件
- dblclick 双击事件

#### 2. 组合事件

`基础事件`中，只要画布中触发这些事件，都会执行，但是大部分场景下，我们需要精确定位到某一个元素的点击，比如：

- 柱形图的柱子被 click 的时候
- 图例的某一项被 hover 的时候
- 坐标轴的标签被 dbclick 的时候
- ...

这种情况我们就可以使用 G2 的组合事件，G2 的组合事件规则为：`组件名:基础事件名`，即：

```sign
${componentName}:${eventName}
```

例如对应上述的几个场景，事件名称为：

- element:click
- legend-item:mouseover
- axis-label:dbclick
- ...

> G2Plot(G2) 内置的组件中，componentName 的分类很细，可以以下面的一个图进行大概说明。

<!-- 截图来自于 https://riddle.alibaba-inc.com/riddles/e899cd72 -->

![](https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ZFbySLuhjPsAAAAAAAAAAAAAARQnAQ)

也就是大致可以分成为：

- plot
- axis
  - axis-line
  - axis-label
- legend
  - legend-item
- label
- slider
- element
  - interval
  - line
  - area
  - point
  - polygon
  - schema
  - path
  - ...

然后将这些组件名称和基础事件名进行一个排列组合，即为 G2Plot(G2) 内置的事件。

### 使用示例

`markdown:docs/common/events.zh.md`