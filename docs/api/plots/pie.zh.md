---
title: 饼图
order: 4
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

#### meta

`markdown:docs/common/meta.zh.md`

示例代码：

```ts
const data = [
  { name: '分类一', value: 27 },
  { name: '分类二', value: 25 },
  { name: '分类三', value: 18 },
  { name: '分类四', value: 15 },
  { name: '分类五', value: 10 },
  { name: '其他', value: 5 },
];

const piePlot = new Pie('container', {
  data,
  // highlight-start
  meta: {
    name: {
      alias: '分类',
      range: [0, 1],
    },
    value: {
      alias: '数量',
      range: [0.25, 0.75],
      formatter: (v) => {
        return `${v}%`;
      },
    },
  },
  // highlight-end
  angleField: 'value',
  colorField: 'name',
});
piePlot.render();
```

#### angleField

<description>**required** _string_</description>

扇形切片大小（弧度）所对应的数据字段名。

#### colorField

<description>**required** _string_</description>

扇形颜色映射对应的数据字段名。

### 图形样式

#### radius

<description>**optional** _number_</description>

饼图的半径，原点为画布中心。配置值域为 (0,1]，1 代表饼图撑满绘图区域。

#### innerRadius

<description>**optional** _number_</description>

饼图的内半径，原点为画布中心。配置值域为 (0,1]
#### startAngle

<description>**optional** _number_</description>

配置坐标系的起始角度。

#### endAngle

<description>**optional** _number_</description>

配置坐标系的结束角度。

<playground rid="quarter-circle" path="pie/basic/demo/quarter-circle.ts"></playground>

`markdown:docs/common/color.zh.md`

#### statistic ✨

<description>**optional** _object_</description>

统计内容组件。当内半径(`innerRadius`) 大于 0 时才生效，默认展示汇总值，可以通过 `formatter` 格式化展示内容，也可以通过 `customHtml` 自定义更多的内容。

![image](https://gw.alipayobjects.com/zos/bmw-prod/860bbf6e-cf20-4bdf-88bd-e8d685d12e9a.svg)

`markdown:docs/common/statistic.zh.md`

#### pieStyle

<description>**optional** _object_</description>

设置扇形样式。pieStyle 中的`fill`会覆盖 `color` 的配置。pieStyle 可以直接指定，也可以通过 callback 的方式，根据数据为每个扇形切片指定单独的样式。

`markdown:docs/common/shape-style.zh.md`

### 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*TBHtTY6RmHIAAAAAAAAAAAAAARQnAQ" alt="加载失败" width="600">

`markdown:docs/common/component-no-axis.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`

### 图表交互

`markdown:docs/common/interactions.zh.md`
