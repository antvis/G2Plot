---
title: API
---

## 配置属性

### 图表容器

`markdown:common/chart-options.en.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

#### meta

**可选**, _object_

功能描述： 全局化配置图表数据元信息，以字段为单位进行配置。在 meta 上的配置将同时影响所有组件的文本信息。

默认配置： 无

| 细分配置项名称 | 类型       | 功能描述                                    |
| -------------- | ---------- | ------------------------------------------- |
| alias          | _string_   | 字段的别名                                  |
| formatter      | _function_ | callback 方法，对该字段所有值进行格式化处理 |
| values         | _string[]_ | 枚举该字段下所有值                          |
| range          | _number[]_ | 字段的数据映射区间，默认为[0,1]             |

```ts
const data = [
  { country: 'Asia', year: '1750', value: 502,},
  { country: 'Asia', year: '1800', value: 635,},
  { country: 'Europe', year: '1750', value: 163,},
  { country: 'Europe', year: '1800', value: 203,},
];

const scatterPlot = new Scatter('container', {
  data,
  // highlight-start
  meta: {
    year: {
      alias:'年份'
      range: [0, 1],
    },
    value: {
      alias: '数量',
      formatter:(v)=>{return `${v}个`}
    }
  },
  // highlight-end
  xField: 'year',
  yField: 'value',
  colorField: 'country',
});
scatterPlot.render();

```

#### xField 📌

**必选**, _string_

功能描述： 点形状在 x 方向位置映射对应的数据字段名，一般对应一个连续字段。

默认配置： 无

#### yField 📌

**必选**, _string_

功能描述： 点形状在 y 方向位置映射所对应的数据字段名，一般对应一个连续字段。

默认配置： 无

#### type

**可选**, _jitter | stack | symmetric | dodge_;

功能描述： 数据调整类型，不建议修改。

默认配置： `jitter`

#### colorField

**可选**, _string_

功能描述: 点颜色映射对应的数据字段名。

### 图形样式

#### color

**可选**, _string | string[] | Function_

[**DEMO1**](../../scatter/basic#color-mapping)

功能描述： 指定点的颜色。如没有配置 colorField，指定一个单值即可。对 colorFiled 进行了配置的情况下，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。

默认配置：采用 theme 中的色板。

```ts
// 设置单一颜色
{
  color: '#a8ddb5'
}
// 设置多色
{
  colorField: 'type',
  color: ['#d62728', '#2ca02c', '#000000'],
}
 // Function
{
  colorField: 'type',
  color: (type) => {
    if(type === 'male'){
      return 'red';
    }
    // TODO
    return 'yellow';
  }
}
```

#### sizeField

**可选**, _string_

功能描述: 点大小映射对应的数据字段名。

#### size ✨

[**DEMO1**](../../scatter/basic#color-mapping)

**可选**, \_number | [number, number] | Function\_

功能描述： 指定点的大小。如没有配置 sizeField，指定一个即可。对 sizeFiled 进行了配置的情况下，可以指定大小数组 `[minSize, maxSize]`， 也可以通过回调函数的方法根据对应数值进行设置。

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

**可选**, _string_

功能描述: 点形状映射对应的数据字段名。

#### shape ✨

<<<<<<< HEAD

[**DEMO2**](../../scatter/basic#shape-mapping)

=======

[**DEMO2**](../../scatter/basic#shape-mapping)

> > > > > > > a6bca564... docs: 添加图表通用配置 (#1439)
> > > > > > > **可选**, \_string | string[] | Function\_

功能描述： 指定点的形状。如没有配置 shapeField ，指定一个即可。对 shapeField 进行了配置的情况下，可以指定形状数组 `['cicle', 'square']`， 也可以通过回调函数的方法根据对应数值进行设置。

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
    if(type === 'male'){
      return 'circle';
    }
    // TODO
    return 'square';
  },
}
```

#### pointStyle ✨

**可选**, _object_

[**DEMO**](../../scatter/basic#color-mapping)

功能描述： 设置折线样式。pointStyle 中的`fill`会覆盖 `color` 的配置。pointStyle 可以直接指定，也可以通过 callback 的方式，根据数据指定单独的样式。

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

<<<<<<< HEAD

### tooltip

`markdown:common/tooltip.en.md`

### axis

xAxis、yAxis 配置相同。

`markdown:common/axis.en.md`

<!--`markdown:common/legend.en.md`
`markdown:common/theme.en.md` -->

### 事件

#### 通用事件

<!-- `markdown:common/events.en.md` -->

#### 图表事件

```ts
const data = [
  {
    Title: 'Guardians of the Galaxy',
    Genre: 'Action',
    'Revenue (Millions)': 333.13,
    Rating: 8.1,
  },
  {
    Title: 'Prometheus',
    Genre: 'Adventure',
    'Revenue (Millions)': 126.46,
    Rating: 7,
  },
];
const scatterPlot = new Scatter('container', {
  appendPadding: 10,
  data: [],
  xField: 'Revenue (Millions)',
  yField: 'Rating',
  shape: 'circle',
});
scatterPlot.render();
// 添加点击事件
scatterPlot.on('element:click', (...args) => {
  console.log(...args);
});
```

#### 图表方法

=======

### 图表组件

=======

### tooltip

> > > > > > > 3aa0cb2c... docs: 添加 axis (#1465)

`markdown:common/tooltip.en.md`

### axis

xAxis、yAxis 配置相同。

`markdown:common/axis.en.md`

<!-- `markdown:common/xAxis.en.md`
`markdown:common/yAxis.en.md`
`markdown:common/legend.en.md`
`markdown:common/theme.en.md` -->

### 事件

#### 通用事件

<!-- `markdown:common/events.en.md` -->

#### 点图形事件

> > > > > > > a6bca564... docs: 添加图表通用配置 (#1439)

`markdown:common/chart-methods.en.md`
