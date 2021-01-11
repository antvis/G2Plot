---
title: 矩阵树图
order: 29
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _Record<string: array | string>_</description>

设置图表数据源。矩阵树图数据源为一个树状结构的对象，如下

```javascript
const data = {
  name: 'root',
  children: [
    { name: '分类 1', value: 560 },
    { name: '分类 2', value: 500 },
  ],
};

```

其中，每一层级的数据都需要具备三个属性

- name
- value (叶子节点)
- children (非叶子节点)

嵌套矩形树图中，布局由叶子节点的 value 值决定。

#### colorField

<description>**optional** _string_</description>

颜色映射字段名。





### 图形样式

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component-polygon.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`

### 图表交互

`markdown:docs/common/interactions.zh.md`
