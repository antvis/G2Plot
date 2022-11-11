---
title: 对称条形图
order: 26
---

### 图表容器

<embed src="@/docs/common/chart-options.zh.md"></embed>

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：

```js
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

<!-- Meta options START -->

<embed src="@/docs/common/meta.zh.md"></embed>

Example:

```ts
{
  meta: {
    '2016年耕地总面积': { alias: '耕地总面积' }
  }
}
```

<!-- Meta options END -->

### 图形样式

#### layout

<description>**optional** _'horizontal' | 'vertical'_ _default:_ 'horizontal'</description>

表示对称条形图方向。

#### barStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置。

<embed src="@/docs/common/shape-style.zh.md"></embed>

### 图表组件

<embed src="@/docs/common/component.zh.md"></embed>

### 图表事件

<embed src="@/docs/common/events.zh.md"></embed>

### 图表方法

<embed src="@/docs/common/chart-methods.zh.md"></embed>

### 图表主题

<embed src="@/docs/common/theme.zh.md"></embed>
