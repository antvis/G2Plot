---
title: Scatter
order: 5
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### meta

`markdown:docs/common/meta.en.md`

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

Adjust the data.
Adjust types provided by G2Plot includes 'stack', 'dodge' 'jitter', 'symmetric'. Not recommended to modify.

#### colorField

<description>**optional** _string_</description>

The name of the data field corresponding to the dot color map.

#### shapeField

<description>**optional** _string_</description>

The name of the data field corresponding to the dot shape map.

#### sizeField

<description>**optional** _string_</description>

The name of the data field corresponding to the point size map.

### Geometry Style

`markdown:docs/common/color.en.md`

#### size

<description>**optional** \_number | [number, number] | Function\_</description>

<playground path="scatter/scatter/demo/color-mapping.ts" rid="rect"></playground>

Specifies the size of the point. If no sizeField is configured, specify one. When the Sizefiled is configured, the size array '[minSize, maxSize]' can be specified, or the corresponding value can be set through the callback function method.

```ts
// Set a single size
{
  size: 10
}
// size range
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

Specifies the size of the point. If no sizeField is configured, specify one. When the Sizefiled is configured, the size array '[minSize, maxSize]' can be specified, or the corresponding value can be set through the callback function method.

Built-in shape: circle, square, bowtie, diamond, hexagon, triangle,triangle-down, hollow-circle, hollow-square, hollow-bowtie,hollow-diamond, hollow-hexagon, hollow-triangle, hollow-triangle-down, cross, tick, plus, hyphen, line.

```ts
// Set a single size
{
  shape: 'square'
}
// The size of the range
{
  shapeField: 'gender',
  shape: ['circle', 'square'],
}
// Function
{
  shapeField: 'gender',
  shape: (gender) => {
    if(type === 'male'){
      return 'circle';
    }
    // TODO
    return 'square';
  },
}
```

#### pointStyle

<description>**optional** _object_</description>

Set polyline styles. The 'fill' in pointStyle overrides the configuration of 'color'. PointStyle can be specified either directly or via a callback to specify a separate style based on the data.

Default configuration:

| Properties    | Type   | Description           |
| ------------- | ------ | --------------------- |
| fill          | string | Fill color            |
| stroke        | string | Stroke color          |
| lineWidth     | number | Line width            |
| lineDash      | number | The dotted lines show |
| opacity       | number | Transparency          |
| fillOpacity   | number | Fill transparency     |
| strokeOpacity | number | Stroke transparency   |

```ts
// Specified directly
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

### Plot Components

#### tooltip

`markdown:docs/common/tooltip.en.md`

#### label

`markdown:docs/common/label.en.md`

#### axis

Same for xAxis and yAxis. **Note**: Since `DualAxes` or `BidirectionalBar` has double Y-axes, the yAxis is a object which takes the field in yField as the 'key'.

`markdown:docs/common/axis.en.md`

#### legend

<description>**optional** _false | LegendCfg_</description>

```sign
When colorField existed and legend is not false, color legend will be rendered.
When shapeField existed and legend is not false, shape legend will be rendered. You can set `shapeLegend: false` to hide shape legend.
```

`markdown:docs/common/legend.en.md`

#### shapeLegend

<description>**optional** _false | LegendCfg_</description>

```sign
当 shapeField 存在时，且 legend 不为 false 以及 shapeLegend 不为 false，默认会渲染 shape 映射图例。

1、你可以通过设置 `shapeLegend: false` 来隐藏 shape 图例。
2、你也可以通过定义 `shapeLegend` 来对 shape 图例进行配置。
```

Details to see: [legend](#legend)

#### sizeLegend

<description>**optional** _false | LegendCfg_</description>

```sign
Default size legend is not shown, only when `sizeField` and `sizeLegend` existed，size legend will be shown。
```

Details to see: [legend](#legend)

#### annotations

`markdown:docs/common/annotations.en.md`

#### quadrant

[**DEMO**](../../../examples/scatter/bubble#quadrant)

<description>**optional** _object_</description>

Quadrant components.

| Properties  | Type     | Description                                                                                         |
| ----------- | -------- | --------------------------------------------------------------------------------------------------- |
| xBaseline   | number   | The quadrant dividing baseline in the x direction, which defaults to 0                              |
| yBaseline   | number   | The Y direction of the quadrant division base line, the default is 0                                |
| lineStyle   | object   | Configure the style of the quadrant divider. Configure the reference drawing properties for details |
| regionStyle | object[] | Quadrant style with detailed configuration of reference drawing properties                          |
| labels      | object[] | Quadrant text configuration, detailed configuration reference drawing properties                    |

#### regressionLine

[**DEMO**](../../../examples/scatter/scatter#line)

<description>**optional** _object_</description>

Regression line.

| Properties | Type                                                                | Description                                                                                 |
| ---------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| type       | string                                                              | The type of regression line, exp \| linear \| loess \| log \| poly \| pow \| quad           |
| style      | object                                                              | Configure the regression line style. Configure the reference drawing properties for details |
| algorithm  | Array<[number, number]> \| ((data: any) => Array<[number, number]>) | Custom algorithm with a higher priority than type                                           |
| top        | boolean                                                             | Whether top level display                                                                   |

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

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Plot Interactions

`markdown:docs/common/interactions.en.md`
