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

数据源为对象集合，例如：`[{ type: 'a'，value: 20 }, { type: 'b'，value: 20 }]`。

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
  { value: 20 },
  { value: 34 },
  { value: 56 },
  { value: 67 }
];

const HistogramPlot = new Histogram(document.getElementById('container'), {
  data,
  // highlight-start
  meta: {
    range: {
      min: 0,
      tickInterval: 2,
    },
    value: {
      max: 20,
      nice: true,
      alias: '数量',
      formatter:(v)=>{return `${v}个`}
    }
  },
  // highlight-end
  binField: 'value',
});
HistogramPlot.render();
```

### binField 📌

**必选**, _string_

功能描述： 设置直方图绘制 (进行分箱) 的字段。

默认配置： 无

### binWidth 📌

**可选**, _string_

功能描述： 设置直方图的分箱宽度，binWidth 影响直方图分成多少箱, 不能与 binNumber 一起使用。

默认配置： Sturges formula 计算得到

### binNumber 📌

**可选**, _string_

功能描述： 设置直方图的分箱数量，binNumber 会影响直方图分箱后每个柱子的宽度。

默认配置： 无

## 图形样式

columnStyle ✨

**可选**, _object_

功能描述： 设置直方图柱子样式。


| 细分配置      | 类型   | 功能描述   |
| ------------- | ------ | ---------- |
| fill          | string | 填充颜色   |
| stroke        | string | 描边颜色   |
| lineWidth     | number | 描边宽度   |
| lineDash      | number | 虚线描边   |
| opacity       | number | 整体透明度 |
| fillOpacity   | number | 填充透明度 |
| strokeOpacity | number | 描边透明度 |


