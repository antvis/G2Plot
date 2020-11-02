---
title: Sunburst
order: 17
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _object_</description>

设置图表数据源。

`markdown:docs/common/meta.en.md`

#### type

<description>**optional** _partition | treemap_ _default:_ `partition`</description>

布局类型，更多类型探索中。

#### seriesField

<description>**optional** _string_</description>

分组字段，即要映射的数值字段。

#### reflect

<description>**optional** _x | y_</description>

径向类型，非特殊情况不建议使用。

#### hierarchyConfig

<description>**optional** _object_</description>

层级布局配置，例如 `size`、`padding` 等，详细配置参考[d3-hierarchy](https://github.com/d3/d3-hierarchy#treemap)。

### Geometry Style

#### radius

<description>**optional** _string_ _default:_ `1`</description>

半径，0 ~ 1。

#### innerRadius

<description>**optional** _number_ _default:_ `0`</description>

内径，0 ~ 1。

#### colorField

<description>**optional** _string_</description>

颜色映射字段。

`markdown:docs/common/color.en.md`

#### sunburstStyle 

<description>**optional** _object_</description>

旭日图形样式。pointStyle 中的`fill`会覆盖 `color` 的配置。sunburstStyle 可以直接指定，也可以通过 callback 的方式，根据数据指定单独的样式。

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
  sunburstStyle: {
    fill: 'red',
    stroke: 'yellow',
    opacity: 0.8
  },
}
// Function
{
  sunburstStyle: (value, item) => {
    if (value === 0.5) {
      return {
        fill: 'green',
        stroke: 'yellow',
        opacity: 0.8,
      }
    }
    // TODO
    return {
      fill: 'red',
      stroke: 'yellow',
      opacity: 0.8,
    }
  }
}
```

### Plot Components

`markdown:docs/common/component-polygon.en.md`
