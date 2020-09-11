---
title: API
---

## 配置属性

### 图表容器

`markdown:common/chart-options.zh.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：
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
      formatter:(v) => { return `${v}年` },
    }
  },
  seriesField: 'year',
});

piePlot.render();
```

#### seriesField 📌

**可选**, _string_

功能描述：用于对数据进行分组的字段，比如想根据某个字段内容的不同显示不同的颜色，就可以把该字段的名字设为`seriesField`的值。

默认配置： 无

### 图形样式

#### radius ✨

**可选**, _number_

功能描述： 玫瑰图的半径，原点为画布中心。配置值域为 [0,1]，0 代表玫瑰图大小为 0，即不显示，1 代表玫瑰图撑满绘图区域。

#### innerRadius ✨

**可选**, _number_

功能描述： 玫瑰图内部空心圆的半径，规则与 radius 一致。

#### color

**可选**, _string | string[] | Function_

功能描述： 指定扇形颜色，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。

默认配置：采用 theme 中的色板。

用法示例：

```ts
// 配合颜色映射，指定多值
// 玫瑰图中的 seriesField 类似于其它图的 colorField
seriesField: 'type',
color: ['blue','yellow','green']

// 配合颜色映射，使用回调函数指定色值
// 玫瑰图中的 seriesField 类似于其它图的 colorField
seriesField: 'type',
// 回调的参数是一个对象，该对象的 key
// 是 xField，yField 和 seriesField 所指定的字段值
color: ({ year }) => {
    if (year === '2001') return 'red';
    return 'blue';
}
```

#### sectorStyle ✨

**可选**, _object | Function_

功能描述： 设置扇形样式。sectorStyle 中的`fill`会覆盖 `color` 的配置。sectorStyle 可以直接指定，也可以通过 callback 的方式，根据数据为每个扇形切片指定单独的样式。

默认配置： 无

| 细分配置      | 类型     | 功能描述   |
| ------------- | -------- | ---------- |
| fill          | _string_ | 填充颜色   |
| stroke        | _string_ | 描边颜色   |
| lineWidth     | _number_ | 描边宽度   |
| lineDash      | _number_ | 虚线描边   |
| opacity       | _number_ | 整体透明度 |
| fillOpacity   | _number_ | 填充透明度 |
| strokeOpacity | _number_ | 描边透明度 |

## 图表组件

### tooltip

`markdown:common/tooltip.zh.md`

### legend

`markdown:common/legend.zh.md`

### theme

`markdown:common/theme.zh.md`

### axis

xAxis、yAxis 配置相同，玫瑰图是基于极坐标的。

`markdown:common/axis.zh.md`

### label ✨

功能描述： 标签文本

[DEMO1](../../rose/basic#basic)
[DEMO2](../../rose/basic#inner-label)

`markdown:common/label.zh.md`

## 事件

[通用 events](../../general/events/API)

## 图表方法

`markdown:common/chart-methods.zh.md`
