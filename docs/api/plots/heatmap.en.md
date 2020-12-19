---
title: Heatmap
order: 23
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

`markdown:docs/common/meta.en.md`

#### type

<description>**optional** _polygon | density_ _default:_ `polygon`</description>

密度热力图需要指定为 density。

#### colorField

<description>**optional** _string_</description>

颜色映射字段名。

#### sizeField

<description>**optional** _string_</description>

点大小映射对应的数据字段名。

#### reflect

<description>**optional** _x | y_</description>

坐标轴映射。

### Geometry Style

`markdown:docs/common/color.en.md`

#### shape

<description>**optional** _rect | square | circle_</description>

热力格子中的形状，密度热力图不用指定。

#### sizeRatio

<description>**optional** _number_</description>

热力格子中图形的尺寸比例，可选，只有当 shape 和 sizeField 至少指定一项后才生效。

#### heatmapStyle

<description>**optional** _object_</description>

热力图样式。 heatmapStyle 中的`fill`会覆盖 `color` heatmapStyle 可以直接指定，也可以通过 callback 的方式，根据数据指定单独的样式。

默认配置：

| 细分配置      | 类型   | 功能描述   |
| ------------- | ------ | ---------- |
| fill          | string | 填充颜色   |
| stroke        | string | 描边颜色   |
| lineWidth     | number | 线宽       |
| lineDash      | number | 虚线显示   |
| opacity       | number | 透明度     |
| fillOpacity   | number | 填充透明度 |
| strokeOpacity | number | 描边透明度 |

```ts
// 直接指定
{
  heatmapStyle: {
    fill: 'red',
    stroke: 'yellow',
    opacity: 0.8
  },
}
// Function
{
  heatmapStyle: (item) => ({fill: 'red'})
}
```

### Plot Components

`markdown:docs/common/component.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
