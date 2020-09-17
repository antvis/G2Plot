## 配置属性

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data 📌

**必选**, _Array<Record<string, any>[]>_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：

```ts
const data = [[{ time: '1991'，value: 20 }], [{ time: '1992'，value: 20 }]];
```

#### xField 📌

**必选**, _string_

功能描述： 点形状在 x 方向位置映射对应的数据字段名，一般对应一个连续字段。

默认配置： 无

#### yField 📌

**必选**, _string[]_

功能描述： 点形状在 y 方向位置映射所对应的数据字段名，一般对应一个连续字段。

默认配置： 无

`markdown:docs/common/meta.zh.md`

### 图形样式

#### geometryOptions

**可选**, _array object_

功能描述： 指定了双轴各自对应的图形，第一项为左轴配置，第二项为右轴配置。每一个配置应为 Line 或 Column 类型的 Config 单轴支持图形范围包括折线图，多折线图，柱状图，分组柱状图，堆叠柱状图。

| 细分配置项名称 | 类型                       | 功能描述                             | 默认值 |
| -------------- | -------------------------- | ------------------------------------ | ------ |
| geometry       | _string_                   | 图形类型，`line`、`column` 等        |
| seriesField    | _string_                   | 分类字段, 若存在，则为多折线         |
| color          | _string_ or _array string_ | 颜色，同对应 geometry 图             |
| smooth         | _boolean_                  | 是否光滑，同对应 geometry 图         |
| style          |                            | 样式，同对应 geometry 图             |
| size           | _number_                   | 宽度，同对应 geometry 图             |
| point          | object                     | 点，同对应 geometry 图               |
| color          | color                      | 颜色映射，同对应 geometry 图         |
| labe           | label                      | 折线图所用 label, 同对应 geometry 图 |

### 图表组件

#### tooltip

`markdown:docs/common/tooltip.zh.md`

#### axis

xAxis、yAxis 配置项相同，由于是双轴 yAxis 类型是数组类型。

`markdown:docs/common/axis.zh.md`

#### legend

`markdown:docs/common/legend.zh.md`

#### theme

`markdown:docs/common/theme.zh.md`

### 事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`
