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

#### seriesField

**可选**, _string_

功能描述： 拆分字段，在分组条形图下同 groupField、colorField，在堆积条形图下同 stackField、colorField 。

默认配置： 无

#### isGroup

**可选**, _boolean_

功能描述： 是否分组柱形图 。

默认配置： 无

#### isStack

**可选**, _boolean_

功能描述： 是否堆积条形图 。

默认配置： 无

`markdown:docs/common/meta.zh.md`

### 图形样式

#### barWidthRatio

**可选**, _number_

功能描述： 条形图宽度占比 [0-1] 。

默认配置： 无

#### marginRatio

**可选**, _number_

功能描述： 分组中柱子之间的间距 [0-1]，仅对分组条形图适用 。

默认配置： 无

#### barStyle

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
