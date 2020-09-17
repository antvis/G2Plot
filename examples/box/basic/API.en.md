## 配置属性

### 图表容器

`markdown:docs/common/chart-options.en.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### groupField

**可选**, _string_

功能描述： 分组拆分字段，默认是分组情况，颜色作为视觉通道 。

默认配置： 无

#### outliersField

**可选**, _string_

功能描述： 异常值字段 。

默认配置： 无

`markdown:docs/common/meta.en.md`

### 图形样式

#### boxStyle

**可选**, _StyleAttr | Function_

功能描述： 柱子样式配置 。

默认配置： 无

`markdown:docs/common/shape-style.en.md`

#### outliersStyle

**可选**, _StyleAttr | Function_

功能描述： 柱子样式配置，配置同 boxStyle。

默认配置： 无

`markdown:docs/common/color.en.md`

### 图表组件

#### tooltip

`markdown:docs/common/tooltip.en.md`

#### label

`markdown:docs/common/label.en.md`

#### axis

xAxis、yAxis 配置相同。

`markdown:docs/common/axis.en.md`

#### legend

`markdown:docs/common/legend.en.md`

#### theme

`markdown:docs/common/theme.en.md`

### 事件

`markdown:docs/common/events.en.md`

### 图表方法

`markdown:docs/common/chart-methods.en.md`
