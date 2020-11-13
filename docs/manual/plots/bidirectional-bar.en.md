---
title: 对称条形图
order: 26
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：

```plain
[
  { country: '乌拉圭', '2016年耕地总面积': 13.4, '2016年转基因种植面积': 12.3 },
  { country: '巴拉圭', '2016年耕地总面积': 14.4, '2016年转基因种植面积': 6.3 }
]

```

#### xField

<description>**required** _string_</description>

设置 x 轴字段。

#### yField

<description>**required** _[string,string]_</description>

设置 y 轴映射字段。

#### yAxis

<description>**optional** object</description>

 yAxis 为多个 key 为 yField 里面的 2 个字段。

 #### layout

<description>**optional** _'horizontal' | 'vertical'_ _default:_ 'horizontal'</description>

表示对称直方图方向。

`markdown:docs/common/meta.zh.md`

### 图形样式

#### barStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置。

`markdown:docs/common/shape-style.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`

### 事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`
