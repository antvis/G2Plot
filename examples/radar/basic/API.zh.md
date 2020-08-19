---
title: API
---

# 配置属性

## 图表容器

- 见 [通用配置](TODO)

## 数据映射

### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

### meta

**可选**, _object_

功能描述： 全局化配置图表数据元信息，以字段为单位进行配置。在 meta 上的配置将同时影响所有组件的文本信息。

默认配置： 无

| 细分配置项名称 | 类型       | 功能描述                                    |
| -------------- | ---------- | ------------------------------------------- |
| alias          | _string_   | 字段的别名                                  |
| formatter      | _function_ | callback 方法，对该字段所有值进行格式化处理 |
| values         | _string[]_ | 枚举该字段下所有值                          |
| range          | _number[]_ | 字段的数据映射区间，默认为[0,1]             |

```js
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
      alias: '分数'
    }
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

### xField 📌

**必选**, _string_

功能描述： 雷达图映射到圆周角度所对应的字段，一般为一个分类字段。

默认配置： 无

### yField 📌

**必选**, _string_

功能描述： 雷达图映射到半径所对应的字段，一般为一个连续字段。

默认配置： 无

### seriesField 📌

**必选**, _string_

[DEMO](../../radar/basic#series)

功能描述： 对雷达图进行分组的字段，一般对应一个分类字段。通过该字段的值，雷达图将会被分为多个组，通过颜色进行区分，并上下重叠。

默认配置： 无

## 图形样式

### color

**可选**, _string[] | Function_

功能描述： 指定颜色，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。

默认配置：采用 theme 中的色板。

### smooth ✨

**可选**, _boolean_

功能描述： 是否以曲线的形态绘制 (spline)。

默认配置: `false`

### lineStyle ✨

**可选**, _object ｜ Function_

功能描述：配置雷达图上的折线样式，也可以通过回调函数的方法根据对应的数据进行设置，返回参数是通用的`[ShapeStyle](TODO 补充通用类型定义)` 对象

使用示例：

```js
{
  lineStyle: (x, y, series) => {
    return {
      stroke: series === 'a' ? 'red' : 'yellow',
      lineWidth: 3
    };
  }
}
```

### point ✨

**可选**, _object_

功能描述： 配置雷达图上的点

| 细分配置 | 类型    | 功能描述          |
| -------- | ------- |------------- |
| color    | _string | string[] | Function_  | 数据点颜色，也可以支持回调的方式设置，回调参数为 `color: (x, y, series) => string` |
| shape    | _string | Function_   | 数据点形状，也可以支持回调的方式设置，回调参数为 `shape: (x, y, series) => string`       |
| size     | _number | Function_  | 数据点大小，也可以支持回调的方式设置，回调参数为 `size: (x, y, series) => number`    |
| style    | _object | Function_  | 数据点样式，也可以支持回调的方式设置，回调参数为 `style: (x, y, series) => object` |

### area ✨

**可选**, _object_

功能描述： 配置雷达图上的面积填充

| 细分配置 | 类型    | 功能描述          |
| -------- | ------- |------------- |
| smooth    | _boolean_  | 是否平滑 |
| color    | _string | string[] | Function_  | 填充面积颜色，也可以支持回调的方式设置，回调参数为 `color: (x, y, series) => string` |
| style    | _object | Function_  | 填充面积样式，也可以支持回调的方式设置，回调参数为 `style: (x, y, series) => object` |

使用示例：

```js
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

## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*oiTPQLqYUvIAAAAAAAAAAABkARQnAQ" alt="雷达图 图表组件" width="600">

### xAxis ✨

**可选**, _object_

功能描述： x 轴（或分类轴）。在雷达图中，对应的是分类轴的配置

- 见 [通用 xAxis 配置](TODO)

### yAxis ✨

**可选**, _object_

功能描述： y 轴（或值轴）。雷达图 y 轴配置

- 见 [通用 yAxis 配置](TODO)

### legend、tooltip、label、theme

`legend`、`tooltip`、`label`、`theme` 等通用组件请参考图表通用配置

## 事件

[通用 events](../../general/events/API)

# 图表方法

## render() 📌

**必选**

渲染图表。

## update()

**可选**

更新图表配置项。

使用示例：

```js
radarPlot.update({
  ...radarPlot.options,
  legend: false,
});
```

## changeData()

**可选**

更新图表数据。`update()`方法会导致图形区域销毁并重建，如果只进行数据更新，而不涉及其他配置项更新，推荐使用本方法。

使用示例：

```js
radarPlot.changeData(newData);
```
