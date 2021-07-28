---
title: 散点图
order: 5
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.zh.md`

#### meta

`markdown:docs/common/meta.zh.md`

```ts
const data = [
  { country: 'Asia', year: '1750', value: 502 },
  { country: 'Asia', year: '1800', value: 635 },
  { country: 'Europe', year: '1750', value: 163 },
  { country: 'Europe', year: '1800', value: 203 },
];

const scatterPlot = new Scatter('container', {
  data,
  // highlight-start
  meta: {
    year: {
      alias: '年份',
      range: [0, 1],
    },
    value: {
      alias: '数量',
      formatter: (v) => {
        return `${v}个`;
      },
    },
  },
  // highlight-end
  xField: 'year',
  yField: 'value',
  colorField: 'country',
});
scatterPlot.render();
```

#### type

<description>**optional** _jitter | stack | symmetric | dodge_ _default:_ `jitter`</description>

数据调整类型，不建议修改。

#### colorField

<description>**optional** _string_</description>

点颜色映射对应的数据字段名。

#### sizeField

<description>**optional** _string_</description>

点大小映射对应的数据字段名。

#### shapeField

<description>**optional** _string_</description>

点形状映射对应的数据字段名。

### 图形样式

`markdown:docs/common/color.zh.md`

#### size

<description>**optional** \_number | [number, number] | Function\_</description>

<playground path="scatter/scatter/demo/color-mapping.ts" rid="rect"></playground>

指定点的大小。如没有配置 sizeField，指定一个即可。对 sizeFiled 进行了配置的情况下，可以指定大小数组 `[minSize, maxSize]`， 也可以通过回调函数的方法根据对应数值进行设置。

```ts
// 设置单一大小
{
  size: 10
}
// 大小区间
{
  sizeField: 'weight',
  size: [2, 10],
}
// Function
{
  sizeField: 'weight',
  size: (weight) => {
    // TODO
    return Math.floor(weight / 100);
  }
}
```

#### shape

<description>**optional** \_string | string[] | Function\_</description>

<playground path="scatter/bubble/demo/quadrant.ts" rid="rect-quadrant"></playground>

指定点的形状。如没有配置 shapeField ，指定一个即可。对 shapeField 进行了配置的情况下，可以指定形状数组 `['cicle', 'square']`， 也可以通过回调函数的方法根据对应数值进行设置。

内置图形：circle, square, bowtie, diamond, hexagon, triangle,triangle-down, hollow-circle, hollow-square, hollow-bowtie,hollow-diamond, hollow-hexagon, hollow-triangle, hollow-triangle-down, cross, tick, plus, hyphen, line.

```ts
// 设置单一大小
{
  shape: 'square'
}
// 大小区间
{
  shapeField: 'gender',
  shape: ['circle', 'square'],
}
// Function
{
  shapeField: 'gender',
  shape: (gender) => {
    if(gender === 'male'){
      return 'circle';
    }
    // TODO
    return 'square';
  },
}
```

#### pointStyle

<description>**optional** _object_</description>

设置折线样式。pointStyle 中的`fill`会覆盖 `color` 的配置。pointStyle 可以直接指定，也可以通过 callback 的方式，根据数据指定单独的样式。

默认配置：

| 细分配置      | 类型   | 功能描述   |
| ------------- | ------ | ---------- |
| fill          | string | 填充颜色   |
| stroke        | string | 描边颜色   |
| lineWidth     | number | 线宽       |
| lineDash      | number | 虚线显示   |
| opacity       | number | 透明度     |
| fillOpacity   | number | 填充透明度 |
| strokeOpacity | number | 描边透明度 |

```ts
// 直接指定
{
  pointStyle: {
    fill: 'red',
    stroke: 'yellow',
    opacity: 0.8
  },
}
// Function
{
  pointStyle: (x, y, colorField) => {
    if (colorField === 'male') {
      return {
        fill: 'green',
        stroke: 'yellow',
        opacity: 0.8,
      }
    }
    // TODO
    return {
      fill: 'red',
      stroke: 'yellow',
      opacity: 0.8,
    }
  }
}
```

### 图表组件

#### tooltip

`markdown:docs/common/tooltip.zh.md`

#### label

`markdown:docs/common/label.zh.md`

#### axis

xAxis、yAxis 配置相同。**注意**：由于 DualAxes(双轴图) 和 BidirectionalBar(对称条形图) 是双 y 轴， yAxis 类型是以 yField 中的字段作为 `key` 值的 `object`。

`markdown:docs/common/axis.zh.md`

#### legend

<description>**optional** _false | LegendCfg_</description>

```sign
当 colorField 存在时，且 legend 不为 false，默认会渲染 color 字段映射图例。
当 shapeField 存在时，且 legend 不为 false，默认会渲染 shape 映射图例。你可以通过设置 `shapeLegend: false` 来隐藏 shape 图例。
```

`markdown:docs/common/legend.zh.md`

#### shapeLegend

<description>**optional** _false | LegendCfg_</description>

```sign
当 shapeField 存在时，且 legend 不为 false 以及 shapeLegend 不为 false，默认会渲染 shape 映射图例。

1、你可以通过设置 `shapeLegend: false` 来隐藏 shape 图例。
2、你也可以通过定义 `shapeLegend` 来对 shape 图例进行配置。
```

详细配置同：[legend](#legend)

#### sizeLegend

<description>**optional** _false | LegendCfg_</description>

```sign
默认不展示 size 图例，只有当你定义 `sizeLegend` 时，才展示 size 图例。
```

详细配置同：[legend](#legend)

#### annotations

`markdown:docs/common/annotations.zh.md`


#### quadrant

[**DEMO**](/zh/examples/scatter/bubble#quadrant)

<description>**optional** _object_</description>

四象限组件。

| 细分配置    | 类型     | 功能描述                                   |
| ----------- | -------- | ------------------------------------------ |
| xBaseline   | number   | x 方向上的象限分割基准线，默认为 0         |
| yBaseline   | number   | y 方向上的象限分割基准线，默认为 0         |
| lineStyle   | object   | 配置象限分割线的样式，详细配置参考绘图属性 |
| regionStyle | object[] | 象限样式，详细配置参考绘图属性             |
| labels      | object[] | 象限文本配置，详细配置参考绘图属性         |

#### regressionLine

[**DEMO**](/zh/examples/scatter/scatter#line)

<description>**optional** _object_</description>

回归线。

| 细分配置  | 类型                                                                | 功能描述                                                         |
| --------- | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| type      | string                                                              | 回归线类型, exp \| linear \| loess \| log \| poly \| pow \| quad |
| style     | object                                                              | 配置回归线样式，详细配置参考绘图属性                             |
| algorithm | Array<[number, number]> \| ((data: any) => Array<[number, number]>) | 自定义算法，优先级高于 type                                      |
| top       | boolean                                                             | 是否顶层显示                                                     |

```ts
regressionLine: {
  algorithm: () => {
    return [
      [8, 6],
      [16, 7],
      [24, 7],
    ];
  },
}
```

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`

### 图表交互

散点图内置了一些交互，列表如下:

| 交互       | 描述                                     | 配置                           |
| ----------- | ---------------------------------------- | ------------------------------ |
| brush | 用于刷选交互，配置该交互后，可进行刷选。 | `brush: { enabled: true }` |

`markdown:docs/common/brush.zh.md`

`markdown:docs/common/interactions.zh.md`
