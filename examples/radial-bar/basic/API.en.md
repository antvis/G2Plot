## 配置属性

### 图表容器

`markdown:docs/common/chart-options.en.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/meta.en.md`


#### colorField 📌

**可选**, _string_

功能描述： 颜色映射对应的数据字段名。

默认配置： 无

### 图形样式

#### maxRadian

**可选**, _number_

功能描述： 最大弧度，由 data 中最大的数值决定，最大值是 360 度。

默认配置： 240

`markdown:docs/common/color.en.md`

#### barStyle

**可选**, _StyleAttr | Function_

功能描述： 样式配置 。

默认配置： 无

`markdown:docs/common/shape-style.en.md`


### 图表组件

`markdown:docs/common/component-no-axis.en.md`
