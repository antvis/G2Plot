---
title: 玉珏图
order: 0
---

## 配置属性

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 30 }]`。

`markdown:docs/common/xy-field.zh.md`

`markdown:docs/common/meta.zh.md`

### 图形样式

#### maxRadian

**可选**, _number_

功能描述： 最大弧度，由 data 中最大的数值决定，最大值是 360 度。

默认配置： 240

#### color

**可选**, _string_

功能描述： 图形颜色。

默认配置： 无

```ts
// 设置单一颜色
{
  color: '#a8ddb5'
}
// 设置多色（渐变色）
{
  color: '#BAE7FF-#1890FF-#0050B3',
}

```

#### barStyle

**可选**, _StyleAttr | Function_

功能描述： 样式配置 。

默认配置： 无

`markdown:docs/common/shape-style.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`
