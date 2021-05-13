---
title: FAQ
order: 8
---

## FAQ

以下整理了一些 G2Plot 社区常见的问题和官方答复，提问或新增 issue 前先看看。

### 怎么设置横轴从 0 开始

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*NAvlTZ66qzMAAAAAAAAAAAAAARQnAQ" alt="faq">

横轴的范范是可配置的，在 meta 里面配置即可，range 可选范围是 0~1。

```ts
meta: {
  [xField]: {
    range: [0, 1]
  }
}
```

### 双轴图如何共用一个 Y 轴

可以通过开启 scale 同步， 然后隐藏其中一个 y 轴坐标。

```ts
// 适用于 DualAxes plot
{
  yFields: ['y1', 'y2'],
  meta: {
    y1: { sync: 'y2' },
    y2: { sync: true },
  },
  yAxis: {
    y2: false
  }
}
```

### 多图层图表自 2.3.20 版本从 MultiView 更名为 Mix

具体使用：可以见 Mix Plot [API](/zh/docs/api/mix) 文档。

### 水波图无法设置透明或者图片背景

因为水波图需要支持 distance 和通过 path 来自定义 shape，所以目前没有办法设置透明或者图片背景。
