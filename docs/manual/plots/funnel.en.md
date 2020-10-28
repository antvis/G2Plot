---
title: Funnel
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

`markdown:docs/common/xy-field.en.md`

#### compareField

**可选**, _string_

功能描述： 对比字段 。

默认配置： 无

#### isTransposed

**可选**, _boolean_

功能描述： 是否转置 。

默认配置： `false`

`markdown:docs/common/meta.en.md`

### 图形样式

#### dynamicHeight

**可选**, _boolean_

功能描述： 是否是动态高度 。

默认配置： `false`

#### conversionTag

**可选**, _false | object_

功能描述： 配置转化率组件 。

默认配置：`{offsetX: 10, offsetY: 0, formatter: (datum) => '转化率' + datum.$$percentage$$ * 100 + '%',}`。

`markdown:docs/common/color.en.md`

### 图表组件

`markdown:docs/common/component.en.md`
