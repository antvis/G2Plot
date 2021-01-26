---
title: Radar
order: 7
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

#### meta

`markdown:docs/common/meta.en.md`

```ts
const data = [
  { item: 'Design', score: 70 },
  { item: 'Development', score: 60 },
  { item: 'Marketing', score: 40 },
  { item: 'Technology', score: 30 },
];

const radarPlot = new Radar('container', {
  data,
  xField: 'item',
  yField: 'score',
  meta: {
    score: {
      alias: '分数',
    },
  },
  yAxis: {
    grid: {
      alternateColor: ['rgba(0, 0, 0, 0.04)', null],
    },
  },
  point: {},
});
radarPlot.render();
```

#### xField

<description>**required** _string_</description>

The radar map maps to the field corresponding to the circumference Angle, which is generally a classification field.

#### yField

<description>**required** _string_</description>

The radar map maps to the field corresponding to the radius, typically a continuous field.

#### seriesField

<description>**required** _string_</description>

A field that groups a radar map, usually corresponding to a classification field. By the value of this field, the radar map will be divided into groups, separated by color, and overlaid.

### Geometry Style

#### radius

<description>**optional** _number_</description>

The radius of the radar map, starting at the center of the drawing area (not including the chart component area). The configuration range is (0,1), where 1 means to fill the drawing area.

`markdown:docs/common/color.en.md`

#### smooth

<description>**optional** _boolean_ _default:_ `false`</description>

Whether to draw as a curve (spline).

#### lineStyle

<description>**optional** _object ｜ Function_</description>

Configure the polyline style on the radar chart, which can also be set according to the corresponding data through the method of the callback function. The return parameter is a generic ShapeStyle object

`markdown:docs/common/shape-style.en.md`

Examples of use:

```ts
{
  lineStyle: (x, y, series) => {
    return {
      stroke: series === 'a' ? 'red' : 'yellow',
      lineWidth: 3,
    };
  };
}
```

#### point

<description>**optional** _object_</description>

Configure the points on the radar chart

`markdown:docs/common/point-style.en.md`

#### area

<description>**optional** _object_</description>

Configure the area fill on the radar chart

| Properties | Type                             | Description                                                                                                         |
| ---------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| smooth     | _boolean_                        | Whether smooth                                                                                                      |
| color      | _string \| string[] \| Function_ | Fill area color, can also support the way callback set, callback parameter is `color: (x, y, series) => string`     |
| style      | _object \| Function_             | Fill area style, can also support the callback way set, the callback parameter is `style: (x, y, series) => object` |

Examples of use:

```ts
{
  area: {
    style: (x, y, series) => {
      return {
        fill: series === 'a' ? 'red' : 'yellow'
      }
    },
  },
}
```

### Plot Components

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*KnguSICzqXEAAAAAAAAAAAAAARQnAQ" alt="Load failed" width="600">

`markdown:docs/common/component.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
