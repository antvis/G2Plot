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

数据源为对象集合，例如：`[{title: '满意度', ranges: [50,100], measures: [80], target: 85}]`。

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
  {
    title: '满意度',
    ranges: [100],
    measures: [80],
    target: 85,
  },
];

const bulletPlot = new Bullet('container', {
  data,
  measureField: 'measures',
  rangeField: 'ranges',
  targetField: 'target',
  xField: 'title',
});

bulletPlot.render();
```

### measureField 📌

**必选**, _number[]_

功能描述： 使用数据条的长度，实际数值的设置字段，表示实际数值。

默认配置： 无

### rangeField 📌

**必选**, _number[]_

功能描述： 使用背景色条的长度的设置字段，表示区间范围。

默认配置： 无

### targetField 📌

**必选**, _number_

功能描述： 使用测量标记的刻度轴位置的设置字段，表示目标值。

默认配置： 无

### label

**可选**, _object_

功能描述： 表示显示实际数值的 label。

默认配置： 无

### layout

**可选**, 'horizontal' | 'vertical'

功能描述： 表示子弹图方向。

默认配置： 'horizontal'

## 图形样式

bulletStyle ✨

**可选**, _object_

功能描述： 设置子弹图样式。

| 细分配置 | 类型         | 功能描述     |
| -------- | ------------ | ------------ |
| range    | _BasicStyle_ | 区间背景样式 |
| measure  | _BasicStyle_ | 实际值样式   |
| target   | _BasicStyle_ | 目标值样式   |

```js
type BasicStyle = {
  color?: string | string[] | ((...args: any[]) => string),
  style?: ShapeAttrs,
  size?: number,
};
```
