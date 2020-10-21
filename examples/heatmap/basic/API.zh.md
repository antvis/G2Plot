## 配置属性

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.zh.md`

`markdown:docs/common/meta.zh.md`

#### type

**可选**, _polygon | density_;

功能描述： 密度热力图需要指定为 density 。

默认配置： `polygon`

#### colorField

**可选**, _string_

功能描述: 颜色映射字段名。

#### sizeField

**可选**, _string_

功能描述: 点大小映射对应的数据字段名

#### reflect

**可选**, _x | y_

功能描述: 坐标轴映射。

### 图形样式

`markdown:docs/common/color.zh.md`

#### shape

**可选**, _rect | square | circle_

功能描述: 热力格子中的形状，密度热力图不用指定。

#### sizeRatio ✨

**可选**, _number_

功能描述： 热力格子中图形的尺寸比例，可选，只有当 shape 和 sizeField 至少指定一项后才生效。

#### heatmapStyle ✨

**可选**, _object_

功能描述： 热力图样式。 heatmapStyle 中的`fill`会覆盖 `color` heatmapStyle 可以直接指定，也可以通过 callback 的方式，根据数据指定单独的样式。

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

## 图表组件

### 图表组件

`markdown:docs/common/component.zh.md`
