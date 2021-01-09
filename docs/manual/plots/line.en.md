---
title: Line
order: 0
---

<div class="manual-docs">

# Design Guide

`markdown:examples/line/basic/design.en.md`

# Quick start

<playground path='line/basic/demo/line.ts' rid='rect1'></playground>

See more <a href="/en/examples/line/basic" target='blank'>examples</a>.

## Configuration

For an overview of the line plot options see the [API reference](/en/docs/api/plots/line).

# Line plot features

## Smooth

曲线图是用曲线将一系列的数据点连接的图表。

<playground path='line/basic/demo/spline.ts' rid='rect2'></playground>

对应的只需要配置 `smooth: true` 属性即可。

## Step

<playground path='line/step/demo/line.ts' rid='rect3'></playground>

对应的只需要配置 `stepType` 属性即可。

```ts
options: {
  stepType: 'vh' // 可选项：hv | vh | hvh | vhv
}
```

</div>