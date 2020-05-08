---
title: DualLine - 双折线
order: 0
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*RGnzR75vjlMAAAAAAAAAAABkARQnAQ" width="600">

# 快速上手

```js
import { DualLine } from '@antv/g2plot';

const data1 = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const data2 = [
  { year: '1991', count: 10 },
  { year: '1992', count: 4 },
  { year: '1993', count: 5 },
  { year: '1994', count: 5 },
  { year: '1995', count: 4.9 },
  { year: '1996', count: 35 },
  { year: '1997', count: 7 },
  { year: '1998', count: 1 },
  { year: '1999', count: 20 },
];

const dualLine = new DualLine(document.getElementById('container'), {
  data: [data1, data2],
  xField: 'year',
  yField: ['value', 'count'],
});
dualLine.render();

```

# 配置属性

## 图表容器

### width

**可选**, *number*

功能描述： 设置图表宽度。

默认配置： `400`

### height

**可选**, *number*

功能描述： 设置图表高度。

默认配置： `400`

### forceFit

**可选**, *boolean*

功能描述： 图表是否自适应容器宽高。当 `forceFit` 设置为true时，`width` 和 `height` 的设置将失效。

默认配置： `true`

### pixelRatio

**可选**, *number*

功能描述： 设置图表渲染的像素比

默认配置： `2`

### renderer

**可选**, *string*

功能描述: 设置图表渲染方式为 `canvas` 或 `svg`

默认配置： `canvas`


## 数据映射


### data 📌

**必选**, *arrayObject[]*

功能描述： 设置图表两份数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`，在双轴图中，需要制定两份数据源用以渲染双折线。


### meta
**可选**, *object*

功能描述： 全局化配置图表数据元信息，以字段为单位进行配置。在 meta 上的配置将同时影响所有组件的文本信息。

默认配置： 无

| 细分配置项名称 | 类型 | 功能描述 |
| --- | --- | --- |
| alias | *string* | 字段的别名 |
| formatter | *function* | callback方法，对该字段所有值进行格式化处理 |
| values | *string[]* | 枚举该字段下所有值 |
| range | *number[]* | 字段的数据映射区间，默认为[0,1] |


### xField 📌
**必选**, *string*

功能描述： 图形在 x 方向（横向延伸）对应的数据字段名，一般对应一个连续字段。双折线的x字段必需一致，否则图表将不进行渲染。

默认配置： 无


### yField 📌
**必选**, *string[]*

功能描述： 图形在 y 方向对应的数据字段名，一般对应一个离散字段，双轴图需要对两根折线的y字段进行分别指定。

默认配置： 无
