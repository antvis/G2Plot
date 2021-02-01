---
title: Pie
order: 4
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
  { country: 'Asia', year: '1750', value: 502 },
  { country: 'Asia', year: '1800', value: 635 },
  { country: 'Europe', year: '1750', value: 163 },
  { country: 'Europe', year: '1800', value: 203 },
];

const piePlot = new Pie('container', {
  data,
  // highlight-start
  meta: {
    country: {
      alias: '国家',
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
  angleField: 'value',
  colorField: 'country',
});
piePlot.render();
```

#### angleField

<description>**required** _string_</description>

The data field name corresponding to the sector slice size (radians).

#### colorField

<description>**required** _string_</description>

The data field name corresponding to the sector color map.

### Geometry Style

#### radius

<description>**optional** _number_</description>

The radius of the pie chart, the origin is the center of the canvas. The configuration range is (0,1), where 1 represents a pie chart that fills the drawing area.

#### innerRadius

<description>**optional** _number_</description>

The inner radius of the pie chart, starting at the center of the canvas. Configure the range (0,1)

#### startAngle

<description>**optional** _number_</description>

Configure the starting Angle of the coordinate system.

#### endAngle

<description>**optional** _number_</description>

Configure the end Angle of the coordinate system.

<playground rid="quarter-circle" path="pie/basic/demo/quarter-circle.ts"></playground>

`markdown:docs/common/color.en.md`

#### pieStyle

<description>**optional** _object_</description>

Set the sector style. The 'fill' in the pieStyle will override the 'color' configuration. The pieStyle can be specified either directly or via callback to specify a separate style for each sector slice based on the data.

`markdown:docs/common/shape-style.en.md`

### Plot Components

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*TBHtTY6RmHIAAAAAAAAAAAAAARQnAQ" alt="Load failed" width="600">

`markdown:docs/common/component-no-axis.en.md`

#### statistic ✨

<description>**optional** _object_</description>

Statistical content components. When the innerRadius (' innerRadius') is greater than 0, the default is to display the summary value. You can use 'formatter' to format the content, or you can use 'customHtml' to customize more content.

![image](https://gw.alipayobjects.com/zos/bmw-prod/860bbf6e-cf20-4bdf-88bd-e8d685d12e9a.svg)

`markdown:docs/common/statistic.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Plot Interactions

`markdown:docs/common/interactions.en.md`
