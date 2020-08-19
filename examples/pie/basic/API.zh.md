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
  { country: 'Asia', year: '1750', value: 502,},
  { country: 'Asia', year: '1800', value: 635,},
  { country: 'Europe', year: '1750', value: 163,},
  { country: 'Europe', year: '1800', value: 203,},
];

const piePlot = new Pie('container', {
  data,
  // highlight-start
  meta: {
    country: {
      alias:'国家'
      range: [0, 1],
    },
    value: {
      alias: '数量',
      formatter:(v)=>{return `${v}个`}
    }
  },
  // highlight-end
  angleField: 'value',
  colorField: 'country',
});
piePlot.render();
```

### angleField 📌

**必选**, _string_

功能描述： 扇形切片大小（弧度）所对应的数据字段名。。

默认配置： 无

### colorField 📌

**可选**, _string_

功能描述： 扇形颜色映射对应的数据字段名。

默认配置： 无

## 图形样式

### radius ✨

**可选**, _number_

功能描述： 饼图的半径，原点为画布中心。配置值域为 [0,1]，0 代表饼图大小为 0，即不显示，1 代表饼图撑满绘图区域。

### color

**可选**, _string | string[] | Function_

功能描述： 指定扇形颜色，即可以指定一系列色值，也可以通过回调函数的方法根据对应数值进行设置。

默认配置：采用 theme 中的色板。

用法示例：

```js
// 配合颜色映射，指定多值
colorField:'type',
color:['blue','yellow','green']
//配合颜色映射，使用回调函数指定色值
colorField:'type',
color:(d)=>{
    if(d==='a') return 'red';
    return 'blue';
}
```

### pieStyle ✨

**可选**, _object_

功能描述： 设置扇形样式。pieStyle 中的`fill`会覆盖 `color` 的配置。pieStyle 可以直接指定，也可以通过 callback 的方式，根据数据为每个扇形切片指定单独的样式。

默认配置： 无

| 细分配置      | 类型   | 功能描述   |
| ------------- | ------ | ---------- |
| fill          | _string_ | 填充颜色   |
| stroke        | _string_ | 描边颜色   |
| lineWidth     | _number_ | 描边宽度   |
| lineDash      | _number_ | 虚线描边   |
| opacity       | _number_ | 整体透明度 |
| fillOpacity   | _number_ | 填充透明度 |
| strokeOpacity | _number_ | 描边透明度 |

## 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*93XzToUe1OQAAAAAAAAAAABkARQnAQ" width="600">

### legend、tooltip、theme

`legend`、`tooltip`、`theme` 等通用组件请参考图表通用配置

### label ✨

功能描述： 标签文本

[DEMO1](../../pie/basic#basic)
[DEMO2](../../pie/basic#outer-label)

| 细分配置      | 类型   | 功能描述   |
| ------------- | ------ | ---------- |
| type          | `inner`, `outer` | 标签类型  |
| content       | _string_, _Fucntion_ | 标签内容，可通过回调的方式，也支持模板字符串配置：内置标签名（`{name}`）、百分比（`{percentage}`）、数值（`{value}`） 三种   |
| style     | _object, _Fucntion_ | 标签样式，可通过回调的方式   |
| 其他 | any | 其他，请参考图表 label 通用配置 |


## 事件

[通用 events](../../general/events/API)

# 图表方法

## render() 📌

**必选**

渲染图表。

## update()

**可选**

更新图表配置项。

```js
piePlot.update({
  ...piePlot.options,
  legend: false,
});
```

## changeData()

**可选**

更新图表数据。`update()`方法会导致图形区域销毁并重建，如果只进行数据更新，而不涉及其他配置项更新，推荐使用本方法。

```js
piePlot.changeData(newData);
```
