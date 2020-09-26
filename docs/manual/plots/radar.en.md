---
title: Radar
order: 0
---

## 配置属性

### 图表容器

`markdown:docs/common/chart-options.en.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

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

#### xField 📌

**必选**, _string_

功能描述： 雷达图映射到圆周角度所对应的字段，一般为一个分类字段。

默认配置： 无

#### yField 📌

**必选**, _string_

功能描述： 雷达图映射到半径所对应的字段，一般为一个连续字段。

默认配置： 无

#### seriesField 📌

**必选**, _string_

[DEMO](../../radar/basic#series)

功能描述： 对雷达图进行分组的字段，一般对应一个分类字段。通过该字段的值，雷达图将会被分为多个组，通过颜色进行区分，并上下重叠。

默认配置： 无

### 图形样式

`markdown:docs/common/color.en.md`

#### smooth ✨

**可选**, _boolean_

功能描述： 是否以曲线的形态绘制 (spline)。

默认配置: `false`

#### lineStyle ✨

**可选**, _object ｜ Function_

功能描述：配置雷达图上的折线样式，也可以通过回调函数的方法根据对应的数据进行设置，返回参数是通用的 ShapeStyle 对象

`markdown:docs/common/shape-style.en.md`

使用示例：

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

#### point ✨

**可选**, _object_

功能描述： 配置雷达图上的点

`markdown:docs/common/point-style.en.md`

#### area ✨

**可选**, _object_

功能描述： 配置雷达图上的面积填充

| 细分配置 | 类型      | 功能描述   |
| -------- | --------- | ---------- |
| smooth   | _boolean_ | 是否平滑   |
| color    | \_string  | string[]   | Function\_ | 填充面积颜色，也可以支持回调的方式设置，回调参数为 `color: (x, y, series) => string` |
| style    | \_object  | Function\_ | 填充面积样式，也可以支持回调的方式设置，回调参数为 `style: (x, y, series) => object` |

使用示例：

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

### 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*oiTPQLqYUvIAAAAAAAAAAABkARQnAQ" alt="雷达图 图表组件" width="600">

### 图表组件

`markdown:docs/common/component.en.md`
