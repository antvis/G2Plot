---
title: G2Plot 2.0 升级指南
order: 7
---

## 概述

G2Plot 2.0 持续开发中，截止目前，我们已经完成了 P0 、P1 级图表的开发，其它图表的开发也会如期进行，详情请参考[开发计划](https://www.yuque.com/antv/g2plot/ffgrfy#U9F3)。

## 删除图表

**Bubble**:

- 改用 Scatter 实现， 修改图表名称即可， 详细参考 [Scatter](../../examples/scatter/basic)。

**StackedColumn**:

- 改用 Column 实现。
- 删除 stackField 配置，改为 seriesField，需要指定 `isStack: true` ， 详细参考 [Column](../../examples/column/stacked)。

**GroupedColumn**:

- 改用 Column 实现。
- 删除 groupField 配置，改为 seriesField，需要指定 `isGroup: true` ， 详细参考 [Column](../../examples/column/grouped)。

**PercentStackedColumn**:

- 改用 Column 实现。
- 删除 stackField 配置，改为 seriesField，需要指定 `isStack: true`、`isGroup: true` ， 详细参考 [Column](../../examples/column/percent)。

**RangeColumn**:

- 改用 Column 实现。
- 删除 stackField 配置，改为 seriesField，需要指定 `isRange: true` ， 详细参考 [Column](../../examples/column/range)。
- label 不再支持 topStyle、bottomStyle，详细配置请参考 [API](../../examples/column/range/API#label) 文档。

**StackedBar**:

- 改用 Bar 实现。
- 删除 stackField 配置，改为 seriesField，需要指定 `isStack: true` ， 详细参考 [Bar](../../examples/bar/stacked)。

**GroupedBar**:

- 改用 Bar 实现。
- 删除 groupField 配置，改为 seriesField，需要指定 `isGroup: true` ， 详细参考 [Bar](../../examples/bar/stacked)。

**PercentStackedBar**:

- 改用 Bar 实现。
- 删除 stackField 配置，改为 seriesField，需要指定 `isStack: true`、`isGroup: true` ， 详细参考 [Bar](../../examples/bar/stacked)。

**RangeBar**:

- 改用 Bar 实现。
- 删除 stackField 配置，改为 seriesField，需要指定 `isRange: true` ， 详细参考 [Bar](../../examples/bar/stacked)。
- label 不再支持 topStyle、bottomStyle，详细配置请参考 [API](../../examples/bar/range/API#label) 文档

**Donut**:

- 改用 Pie 实现，修改图表名称即可 ， 详细参考 [Pie](../../examples/pie/basic)。

**DualLine**:

- 改用 DualAxes 实现，详细参考 [Demos](../../examples/dual-axes/dual-line) 。

**ColumnLine**:

- 改用 DualAxes 实现，详细参考 [Demos](../../examples/dual-axes/column-line) 。

**StackedColumnLine**:

- 改用 DualAxes 实现，详细参考 [Demos](../../examples/dual-axes/stacked-column-line) 。

**GroupedColumnLine**:

- 改用 DualAxes 实现，详细参考 [Demos](../../examples/dual-axes/grouped-column-line) 。

**StackedArea**:

- 改用 Area 实现。
- 去掉 stackField ，改用 seriesField 。

**PercentStackedArea**:

- 改用 Area 实现。
- 去掉 stackField ，改用 seriesField ，需要指定 `isStack: true` 。

**StepLine**:

- 改用 Line 实现，需要指定 stepType，详细参考 [Line](../../examples/line/step)。

```ts
// 变更前
step: 'hvh', // 可以选择 hv, vh, hvh, vhv

// 变更后
stepType: 'hvh', // 可以选择 hv, vh, hvh, vhv
```

## 配置变更

G2Plot 2.0 兼容大部分的 1.x 版本图表功能和配置项，详情如下：

### 通用配置

**title**: 不再支持

**description**: 不再支持

**forceFit**: 不再支持，改用 autoFit

**responsive**：不再支持，内置。

**guideLine**：不再支持，改用 [anniotations](../../examples/general/annotation) 实现。

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

### 私有配置

**Scatter**:

- pointSize: 不再支持，改用 size 。
- shape: 去掉默认类型 circle，需要显性设置。

**Rose**:

- categoryField: 不再支持，改用 xField 。
- radiusField: 不再支持，改用 yField 。
- colorField: 不再支持，改用 seriesField 。

**Bullet**:

- 改动较大，详细参考 [Bullet](../../examples/bullet/basic)

**WordCloud**:

- maskImage: 不再支持， 改用 imageMask。
- wordStyle 选项中的 gridSize 改为 padding。

**TinyArea、 TinyColumn、 TinyLine**:

- 删除 xField 、yField。
- data 类型由 object[] 变为 number[]。

**Gauge**:

- 删除 color 、 min 、 max。
- 删除 value , 改用 percent 。
- 删除 pivot 改用 indicator。
- 更新 range ，详细参考[Gauge](../../examples/gauge/basic#complex)

```ts
// 变更前
range: [0, 25, 50, 75, 100],
color: ['#39B8FF', '#52619B', '#43E089', '#C0EDF3'],
// 变更后
range: {
  ticks: [0, 0.25, 0.5, 0.75, 1],
  color: ['#39B8FF', '#52619B', '#43E089', '#C0EDF3'],
}
```

**Radar**:

- 删除 radiusAxis ，改用 yAxis。
- 删除 angleField ， 改用 xField 。
- 删除 radiusField ， 改用 yField 。

**Liquid**:

- 删除 min 、max。
- 删除 value ，改用 percent。
- 更新 statistic 。

```ts
// 变更前
statistic: {
  formatter: (value) => 'xx',
},
// 变更后
statistic: {
  content: {
    formatter: ({ percent }) => {
      return `xxx`;
    },
  },
},
```

## 遇到问题

我们尽可能收集了已知的所有不兼容变化和相关影响，但是有可能还是有一些场景我们没有考虑到。如果你在升级过程中遇到了问题，请到 [GitHub issues](https://github.com/antvis/G2Plot/issues) 进行反馈。我们会尽快响应和相应改进这篇文档。
