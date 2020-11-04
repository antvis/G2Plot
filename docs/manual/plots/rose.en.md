---
title: Rose
order: 13
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：

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

`markdown:docs/common/xy-field.en.md`

`markdown:docs/common/meta.en.md`

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
      // 只显示 2001、2002、2003 年份的信息
      values: ['2001', '2002', '2003'],
      // 转换结果类似于 “2001年”
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

用于对数据进行分组的字段，比如想根据某个字段内容的不同显示不同的颜色，就可以把该字段的名字设为`seriesField`的值。

#### isGroup

<description>**optional** _string_ _default:_ `false`</description>

是否分组玫瑰图。

#### isStack

<description>**optional** _string_ _default:_ `false`</description>

是否堆积玫瑰图。

### Geometry Style

#### radius 

<description>**optional** _number_</description>

玫瑰图的半径，原点为画布中心。配置值域为 [0,1]，0 代表玫瑰图大小为 0，即不显示，1 代表玫瑰图撑满绘图区域。

#### innerRadius 

<description>**optional** _number_</description>

玫瑰图内部空心圆的半径，规则与 radius 一致。

`markdown:docs/common/color.en.md`

#### sectorStyle 

<description>**optional** _object | Function_</description>

设置扇形样式。sectorStyle 中的`fill`会覆盖 `color` 的配置。sectorStyle 可以直接指定，也可以通过 callback 的方式，根据数据为每个扇形切片指定单独的样式。

`markdown:docs/common/shape-style.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
