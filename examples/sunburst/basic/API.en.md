## 配置属性

### 图表容器

`markdown:docs/common/chart-options.en.md`

### 数据映射

#### data 📌

**必选**, _object_

功能描述： 设置图表数据源

默认配置： 无

`markdown:docs/common/meta.en.md`

#### type

**可选**, _partition | treemap_;

功能描述： 布局类型，更多类型探索中。

默认配置： `partition`

#### seriesField

**可选**, _string_;

功能描述： 分组字段，即要映射的数值字段。

默认配置： 无

#### reflect

**可选**, _x | y_;

功能描述： 径向类型，非特殊情况不建议使用。

默认配置： 无

#### hierarchyConfig

**可选**, _object_;

功能描述： 层级布局配置，例如 `size`、`padding` 等，详细配置参考[d3-hierarchy](https://github.com/d3/d3-hierarchy#treemap)。

默认配置： 无

### 图形样式

#### radius

**可选**, _string_

功能描述: 半径， 0 ~ 1。

默认配置： `1`

#### innerRadius

**可选**, _number_;

功能描述： 内径，0 ~ 1。

默认配置： `0`

#### colorField

**可选**, _string_;

功能描述： 颜色映射字段。

默认配置： 无

`markdown:docs/common/color.en.md`

#### sunburstStyle ✨

**可选**, _object_

功能描述： 旭日图形样式。pointStyle 中的`fill`会覆盖 `color` 的配置。sunburstStyle 可以直接指定，也可以通过 callback 的方式，根据数据指定单独的样式。

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

## 图表组件

### 图表组件

`markdown:docs/common/component-polygon.en.md`
