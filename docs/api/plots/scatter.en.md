---
title: Scatter
order: 5
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Set up the chart data source. The data source is a collection of objects, for example：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

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

Adjust the type. Modification is not recommended.

#### colorField

<description>**optional** _string_</description>

The name of the data field corresponding to the dot color map.

### Geometry Style

`markdown:docs/common/color.en.md`

#### sizeField

<description>**optional** _string_</description>

The name of the data field corresponding to the point size map.

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

#### shapeField

<description>**optional** _string_</description>

The name of the data field corresponding to the dot shape map.

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

| Attr          | Type   | Description           |
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

`markdown:docs/common/component.en.md`

#### quadrant

[**DEMO**](../../../examples/scatter/bubble#quadrant)

<description>**optional** _object_</description>

Quadrant components.

| Attr        | Type     | Description                                                                                         |
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

| Attr      | Type                                                                | Description                                                                                 |
| --------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| type      | string                                                              | The type of regression line, exp \| linear \| loess \| log \| poly \| pow \| quad           |
| style     | object                                                              | Configure the regression line style. Configure the reference drawing properties for details |
| algorithm | Array<[number, number]> \| ((data: any) => Array<[number, number]>) | Custom algorithm with a higher priority than type                                           |
| top       | boolean                                                             | Whether top level display                                                                   |

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

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Plot Interactions

`markdown:docs/common/interactions.en.md`
