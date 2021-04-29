---
title: Dual Axes
order: 6
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _Array<Record<string, any>[]>_</description>

Configure the chart data source. The data source is a two-dimensional array in the form of [left-axis graph object set, right-axis graph object set], for example:

```ts
const data = [[{ time: '1991'，value: 20 }], [{ time: '1992', count: 20 }]];
```

#### xField

<description>**required** _string_</description>

The dot shape maps the name of the corresponding data field in the x-direction position, generally corresponding to a consecutive field. For example: `{xField: 'time'}`。

#### yField

<description>**required** _string[]_</description>

The array of data field names to which the dot shape maps in the Y direction is of the form [left-axis graph data field name, right-axis graph data field name], for example '{yField: ['value', 'count']}'.

#### meta

`markdown:docs/common/meta.en.md`


Example:

```ts
{
  yField: ['value1', 'value2'],
  meta: {
    value1: {
      alias: 'temperature',
    },
    value2: {
      alias: 'altitude'
    }
  }
}
```

### Geometry Style

#### geometryOptions

<description>**optional** _array object_</description>

Specifies the respective configuration of the two axes in the form of "left axis configuration, right axis configuration". Each configuration should be a Config of type LINE or COLUMN. Mixed chart function is implemented by specifying the corresponding graph with two axes:

- Biaxial line chart: [Line, Line], reference [DEMO](/en/examples/dual-axes/dual-line)
- Column and Line Mixing Chart: [Column, Line], reference [DEMO](/en/examples/dual-axes/column-line)

You can also configure the related configuration of Line or Column (see below) to form a DualAxisLine([DEMO](/en/examples/dual-axes/dual-line#dual-multi-line)), StackingColumnLine([DEMO](/en/examples/dual-axes/stacked-column-line)), GroupColumnLine([DEMO](/en/examples/dual-axes/grouped-column-line))

The corresponding graph configuration of polyline is as follows:

| Properties   | Type                             | Description                                                                                                 | Default |
| ------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------- |
| geometry     | _string_                         | Chart type, specified as 'line'                                                                             | 'line'  |
| seriesField  | _string_                         | Split the field, if there is a polyline, the specific use of the same [Line seriesfield](../../docs/api/plots/line#seriesfield) |
| smooth       | _boolean_                        | Whether is smooth [Line smooth](../../docs/api/plots/line#smooth)                                                               | false   |
| connectNulls | _boolean_                        | Whether to connect empty data [Line connectnulls](../../docs/api/plots/line#connectnulls)                                       | true    |
| lineStyle    | _StyleAttr \| Function_          | Line style [Line lineStyle](../../docs/api/plots/line#linestyle)                                                                |         |
| point        | _pointStyle_                     | Line data point graphic style [Line point](../../docs/api/plots/line#point)                                                     |         |
| label        | _ContinueLegendLabelCfg_         | Line label [Line label](../../docs/api/plots/line#label)                                                                       |
| color        | _string \| string[] \| Function_ | Specifies the color of the point [Line color](../../docs/api/plots/line#color)                                                  |

The graph corresponding to the column is configured as follows:

| Properties       | Type                             | Description                                                                                                                                                                                               | Default |
| ---------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| geometry         | _string_                         | Chart type, specified as 'column'                                                                                                                                                                         |         |
| seriesField      | _string_                         | Split fields, same as GroupField and ColorField under the grouping bar chart, same as StackField and ColorField under the stacking bar chart, specificreference[Column seriesfield](./column#seriesfield) |
| isGroup          | _boolean_                        | Whether to group bar charts[Column isGroup](../../docs/api/plots/column#isgroup)                                                                                                                                             | false   |
| isStack          | _boolean_                        | Whether to stack histograms[Column isStack](../../docs/api/plots/column#isstack)                                                                                                                                             | false   |
| columnWidthRatio | _number_                         | Histogram width ratio [0-1] [Column columnWidthRatio](../../docs/api/plots/column#columnwidthratio)                                                                                                                          |         |
| marginRatio      | _number_                         | The spacing between columns in a grouping [0-1] applies only to grouping histograms[Column marginRatio](../../docs/api/plots/column#marginratio)                                                                             |         |
| columnStyle      | _StyleAttr \| Function_          | Column style configuration[Column columnStyle](../../docs/api/plots/column#columnstyle)                                                                                                                                      |         |
| label            | _ContinueLegendLabelCfg_         | Column label [Column label](../../docs/api/plots/column#label)                                                                                                                                                               |
| color            | _string \| string[] \| Function_ | Specifies the color of the point [Column color](../../docs/api/plots/column#color)                                                                                                                                              |
| groupField       | _string_                         | Split field, used to stack group histograms. Split field takes precedence over SeriesField. IsGroup: true will group by GroupField.                                                                       | -       |

### Plot Components

#### tooltip

`markdown:docs/common/tooltip.en.md`

#### axis

XAXIS and YAXIS are configured the same, since DualAxes are biaxial and YAXIS type is an object type, for example

```ts
{
  yField: ['pv', 'uv'],
  yAxis: {
    pv: {
      tickCount: 5
    },
    uv: {
      tickCount: 5
    }
  }
}
```

`markdown:docs/common/axis.en.md`

#### annotations

The configuration for Xaxis and Yaxis is the same, since DualAxes are biaxes, and the Annotations type is an object type, with the form {left axis field: left axis configuration, right axis field: right axis configuration}. For example,

```ts
{
  yField: ['pv', 'uv'],
  yAxis: {
    pv: [
      {
        type: 'line',
        top: true,
        start: ['2020-08-26', 'min'],
        end: ['2020-08-26', 'max'],
        text: {
          content: '发布时间点',
          position: 'end',
          autoRotate: false,
          style: {
            textAlign: 'start',
          },
        },
      }
    ],
    uv: [
      {
        type: 'line',
        top: true,
        start: ['2020-08-26', 'min'],
        end: ['2020-08-26', 'max'],
        text: {
          content: '发布时间点',
          position: 'end',
          autoRotate: false,
          style: {
            textAlign: 'start',
          },
        },
      }
    ]
  }
}
```

`markdown:docs/common/annotations.en.md`

#### legend

`markdown:docs/common/legend.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

#### slider

`markdown:docs/common/slider.en.md`

### Plot Events

`markdown:docs/common/events.en.md`

### Plot Methods

`markdown:docs/common/chart-methods.en.md`
