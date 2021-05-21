---
title: 多图层图表
order: 8
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 图层配置

#### syncViewPadding ✨

<description>**可选** _boolean_</description>

是否同步子 view 的 padding 配置。传入 boolean 值，含义是：是否需要将子 View 的 padding 同步，如果设置同步，那么可以保证子 View 在 auto padding 的情况下，所有子 View 的图形能够完全重合，避免显示上的错位。

#### views

<description>**可选** _IView[]_</description>

每一个图层的配置，每个图层都包含自己的：数据、图形、图形配置。具体见 [IView](#iview)
#### plots

<description>**可选** _IPlot[]_</description>

每一个图层的配置，每一个 plot 也是一个图层，都包含自己的：数据、图形、图形配置。

在 2.3.9 版本之后，我们提供了 `plots` 的配置项，你可以使用 plots 来代替 views 或者联合使用。

<playground path="plugin/multi-view/demo/series-columns.ts" rid="multi-views-plots"></playground>

### IView

#### IView.region

<description>**可选** _object_</description>

view 的布局范围，默认是占满全部。

Example:

```ts
// 设置 view 的布局位置在上半部分
region: {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0.5 },
}
```

#### IView.data

`markdown:docs/common/data.zh.md`

#### IView.geometries

<description>**可选** _array object_</description>

view 上的图形 geometry 及映射配置，具体见[图层图形](#图层图形)

<!-- common iview configuration START -->
`markdown:docs/common/common-iview.zh.md`
<!-- common iview configuration END -->

### 图层图形

<!-- common geometry configuration START -->
`markdown:docs/common/geometry-cfg.zh.md`
<!-- common geometry configuration END -->

### IPlot

#### IPlot.region

<description>**可选** _object_</description>

plot 所在图层(view)的布局范围，默认是占满全部。

```ts
// 示例：设置 plot 所在图层(view)的布局位置在上半部分
region: {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0.5 },
}
```

`markdown:docs/common/plot-cfg.zh.md`

**示例**：添加一个图层，引入 column plot 和 bar plot

```ts
plots: [
  {
    type: 'column',
        region: { start: { x: 0, y: 0 }, end: { x: 0.48, y: 1 } },
    options: {
      data: [
        { city: '广州', sales: 1024 },
        { city: '杭州', sales: 724 },
        { city: '深圳', sales: 1256 },
      ],
      xField: 'city',
      yField: 'sales',
      seriesField: 'city',
    },
  },
  {
    type: 'bar',
    region: { start: { x: 0.52, y: 0 }, end: { x: 1, y: 1 } },
    options: {
      data: [
        { city: '广州', sales: 1024 },
        { city: '杭州', sales: 724 },
        { city: '深圳', sales: 1256 },
      ],
      yField: 'city',
      xField: 'sales',
      seriesField: 'city',
    },
  },
];
```


### 其他

#### tooltip

顶层 tooltip 配置(在 chart 层配置)。可以让所有图层共享一个 tooltip。

当你设置子图层的 tooltip 时，建议关闭顶层 tooltip。

#### legend

顶层 legend 配置(统一在 chart 层配置)。
