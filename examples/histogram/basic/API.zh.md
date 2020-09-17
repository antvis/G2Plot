## 配置属性

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

#### binField 📌

**必须选**, _string_

功能描述： 设置直方图绘制 (进行分箱) 的字段 。

默认配置： 无

#### binWidth

**可选**, _string_

功能描述： 设置直方图的分箱宽度，binWidth 影响直方图分成多少箱, 不能与 binNumber 一起使用 。

默认配置： 无

#### binNumber

**可选**, _number_

功能描述： 设置直方图的分箱数量，binNumber 影响直方图分箱后每个柱子的宽度 。

默认配置： 无

#### stackField

**可选**, _number_

功能描述： 指定层叠字段，通过该字段的值，柱子将会被分割为多个部分，通过颜色进行区分 。

默认配置： 无

`markdown:docs/common/meta.zh.md`

### 图形样式

#### columnStyle

**可选**, _StyleAttr | Function_

功能描述： 柱子样式配置 。

默认配置： 无

`markdown:docs/common/shape-style.zh.md`

`markdown:docs/common/color.zh.md`

### 图表组件

#### tooltip

`markdown:docs/common/tooltip.zh.md`

#### label

`markdown:docs/common/label.zh.md`

#### axis

xAxis、yAxis 配置相同。

`markdown:docs/common/axis.zh.md`

#### legend

`markdown:docs/common/legend.zh.md`

#### theme

`markdown:docs/common/theme.zh.md`

### 事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`
