---
title: 漏斗图
order: 9
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.zh.md`

#### compareField

<description>**optional** _string_</description>

对比字段。

#### isTransposed

<description>**optional** _boolean_ _default:_ `false`</description>

是否转置。

`markdown:docs/common/meta.zh.md`

### 图形样式

#### dynamicHeight

<description>**optional** _boolean_ _default:_ `false`</description>

是否是动态高度。

#### conversionTag

<description>**optional** _false | object_</description>

配置转化率组件。

默认配置：`{offsetX: 10, offsetY: 0, formatter: (datum) => '转化率' + datum.$$percentage$$ * 100 + '%',}`。

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`

### 事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`



### 图表主题

`markdown:docs/common/theme.zh.md`
