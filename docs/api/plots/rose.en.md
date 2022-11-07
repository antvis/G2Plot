---
title: Rose
order: 13
---

### Plot Container

<embed src="@/docs/common/chart-options.en.md"></embed>

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:

```ts
[
  { year: '2001', population: 41.8 },
  { year: '2002', population: 38 },
  { year: '2003', population: 33.7 },
  { year: '2004', population: 30.7 },
  { year: '2005', population: 25.8 },
  { year: '2006', population: 31.7 },
  { year: '2007', population: 33 },
  { year: '2008', population: 46 },
  { year: '2009', population: 38.3 },
  { year: '2010', population: 28 },
  { year: '2011', population: 42.5 },
  { year: '2012', population: 30.3 },
];
```

<embed src="@/docs/common/xy-field.en.md"></embed>

#### meta

<embed src="@/docs/common/meta.en.md"></embed>

```ts
const data = [
  { year: '2001', population: 41.8 },
  { year: '2002', population: 38 },
  { year: '2003', population: 33.7 },
  { year: '2004', population: 30.7 },
  { year: '2005', population: 25.8 },
  { year: '2006', population: 31.7 },
];

const rosePlot = new Rose('container', {
  data,
  xField: 'year',
  yField: 'population',
  meta: {
    year: {
      alias: '年份',
      // Only information for 2001, 2002, and 2003 is displayed
      values: ['2001', '2002', '2003'],
      // The conversion result is similar to "2001"
      formatter: (v) => {
        return `${v}年`;
      },
    },
  },
  seriesField: 'year',
});

piePlot.render();
```

#### seriesField

<description>**optional** _string_</description>

Fields used to group data. For example, if you want to display different colors according to the contents of a field, you can set the field name to the value of 'seriesField'.

#### isGroup

<description>**optional** _string_ _default:_ `false`</description>

Whether to group roses.

#### isStack

<description>**optional** _string_ _default:_ `false`</description>

Whether to stack roses.

### Geometry Style

#### radius

<description>**optional** _number_</description>

The radius of the rose with the origin being the center of the canvas. The configuration range is (0,1], where 1 represents the rose chart that fills the drawing area.

#### innerRadius

<description>**optional** _number_</description>

The radius of the hollow circle inside the rose is the same as radius.

#### startAngle

<description>**optional** _number_ _default:_ `(Math.PI * 0) / 180`</description>

The starting angle of the disk.

#### endAngle

<description>**optional** _number_ _default:_ `(Math.PI * 180) / 180`</description>

The termination angle of the disk.

<embed src="@/docs/common/color.en.md"></embed>

#### pattern ✨

<description>**optional** _object | Function_</description>

<embed src="@/docs/common/pattern.en.md"></embed>

#### sectorStyle

<description>**optional** _object | Function_</description>

Set the sector style. The 'fill' in sectorStyle overrides the 'color' configuration. The sectorStyle can be specified either directly or via a callback to specify a separate style for each sector slice based on the data.

<embed src="@/docs/common/shape-style.en.md"></embed>

#### state

<description>**optional** _object_</description>

<embed src="@/docs/common/state-style.en.md"></embed>

### Plot Components

<embed src="@/docs/common/component.en.md"></embed>

### Plot Event

<embed src="@/docs/common/events.en.md"></embed>

### Plot Method

<embed src="@/docs/common/chart-methods.en.md"></embed>

### Plot Theme

<embed src="@/docs/common/theme.en.md"></embed>

### Plot Interactions

<embed src="@/docs/common/interactions.en.md"></embed>
