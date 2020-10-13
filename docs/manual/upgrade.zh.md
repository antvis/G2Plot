---
title: G2Plot 2.0 升级指南
order: 7
---

## 概述

G2Plot 2.0 持续开发中，截止目前，我们已经完成了 P0 、P1 级图表的开发，其它图表的开发也会如期进行，详情请参考[开发计划](https://www.yuque.com/antv/g2plot/ffgrfy#U9F3)。

## 图表变更

### 类型变更

- 去掉 Bubble，合并到 Scatter 中，通过配置实现，参考图表示例-[Scatter](../../examples/scatter/basic)。

- 去掉 StackedArea、PercentStackedArea，合并到 Area 中，通过配置实现，参考图表示例-[Area](../../examples/area/basic)。

- 去掉 StackedColumn、RangeColumn、GroupedColumn、PercentStackedColumn，合并到 Column 中，通过配置实现，参考图表示例-[Column](../../examples/column/basic)。

- 去掉 StackedBar、GroupedBar、PercentStackedBar、RangeBar，合并到 Bar 中，通过配置实现，参考图表示例-[Bar](../../examples/bar/basic)。

- 去掉 Donut，合并到 Pie 中，通过配置实现，参考图表示例-[Pie](../../examples/pie/basic)。

- 去掉 DualLine、ColumnLine、StackedColumnLine、GroupedColumnLine，统一到 DualAxes 中，通过配置实现，参考图表示例-[DualAxes](../../examples/dual-axes/dual-line)。

### 配置变更

G2Plot 2.0 兼容大部分的 1.x 版本图表功能和配置项，详情如下：

#### 通用配置

**title**: 不再支持

**description**: 不再支持

**forceFit**: 不再支持，改用 autoFit

**slider**:

```ts
// 变更前
interactions: [
  {
    type: 'slider',
    start: 0.1,
    end: 0.8
  },
],
// 变更后
slider: {
  start: 0.1,
  end: 0.8
},
```

**scrollbar**:

```ts
// 变更前
interactions: [
  {
    type: 'scrollbar',
  },
],
// 变更后
scrollbar: {},
```

**events**:

```ts
// 变更前
events: {
  'plot:click': callback
}
// 变更后
chart.on('element:click', callback)
```

**visible**:

```ts
// 变更前
label: {
  visible: false
}
label: {
  visible: true,
  fill: 'red'
}
// 变更后
label: false
label: {
  fill: 'red'
}
```

**animation**:

```ts
// 变更前
...
// 变更后
默认为 true，也可以自己设定。

animation: {
  appear: {
    duration: 300,
    easing: 'linear',
    delay: 100
  },
  enter: ..., // 同appear，下同
  update: ...,
  delay: ....
}
```

#### 私有配置

**Scatter**:

- pointSize: 不再支持，改用 size 。

**Rose**:

- categoryField: 不再支持，改用 xField 。
- radiusField: 不再支持，改用 yField 。
- colorField: 不再支持，改用 seriesField 。

**Bullet**:

```ts
// 变更前
range: [0, 0.5, 1],

...
// 变更后采用实际数值
range: [20, 50, 100],
```

**WordCloud**:

- maskImage: 不再支持， 改用 imageMask。
- wordStyle 选项中的 gridSize 改为 padding。

## 遇到问题

我们尽可能收集了已知的所有不兼容变化和相关影响，但是有可能还是有一些场景我们没有考虑到。如果你在升级过程中遇到了问题，请到 [GitHub issues](https://github.com/antvis/G2Plot/issues) 进行反馈。我们会尽快响应和相应改进这篇文档。
