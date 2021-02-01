---
title: Axis
order: 0
---

`markdown:docs/styles/component.md`

🏷️  Coordinate axis refers to the axis of statistical chart in two-dimensional space, which is used to define the mapping relationship between **direction** and **value of data** in coordinate system.

🎨  Go to [AntV Design | 坐标轴 Axis](https://www.yuque.com/mo-college/vis-design/twx9oi) of 墨者学院 to learn more about **Design guide**.

#### Axes

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*o64XRZfivrEAAAAAAAAAAABkARQnAQ" alt="axis" class="component-img" />

#### Usage

There are two kinds of coordinate axes: `xAxis` and `yAxis`, which vary according to the specific `Plot`.

<b>There are two ways to configure axes: </b>

Method 1, pass in 'Boolean' to set whether to display a legend.

```ts
xAxis: false; // hide xAxis
```

Method 2, pass in _AxisCfg_ to configure the axis as a whole.

```ts
xAxis: {
  text: 'title of xAxis'
}
```

#### Configuration (_AxisCfg_)

`markdown:docs/common/axis.en.md`