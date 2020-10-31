---
title: Pie
order: 4
---

### Chart Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

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

扇形切片大小（弧度）所对应的数据字段名。

#### colorField 

<description>**optional** _string_</description>

扇形颜色映射对应的数据字段名。

### Geometry Style

#### radius 

<description>**optional** _number_</description>

饼图的半径，原点为画布中心。配置值域为 [0,1]，0 代表饼图大小为 0，即不显示，1 代表饼图撑满绘图区域。

`markdown:docs/common/color.en.md`

#### pieStyle 

<description>**optional** _object_</description>

设置扇形样式。pieStyle 中的`fill`会覆盖 `color` 的配置。pieStyle 可以直接指定，也可以通过 callback 的方式，根据数据为每个扇形切片指定单独的样式。

`markdown:docs/common/shape-style.en.md`

### Chart Components

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*93XzToUe1OQAAAAAAAAAAABkARQnAQ" alt="加载失败" width="600">

### Chart Components

`markdown:docs/common/component-no-axis.en.md`
