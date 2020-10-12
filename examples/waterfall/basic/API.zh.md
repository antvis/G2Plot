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

### 高级配置

#### labelMode ✨

**可选**, _string_

功能描述：label 数据模式，可选值: `absolute`(数据的绝对值)，`difference`(数据的相对差值)。

默认配置： `difference`

#### total ✨

**可选**, _false|object_

功能描述：是否展示总计值（自动进行统计，新增一根总计值的柱子）。

默认配置： 

| 参数名 | 类型 | 是否必选 | 默认值 | 描述 |
| :---| --- |  --- |  --- |  --- | 
| label| _string_ | false | 总计 | 总计值柱子的标签 |
| style | _object_ | false | `{ fill: 'rgba(0, 0, 0, 0.25)' }` | 总计值柱子的样式配置 |

#### leaderLine ✨

**可选**, _false | object_

功能描述：是否展示牵引线。

默认配置： 

| 参数名 | 类型 | 是否必选 | 默认值 | 描述 |
| :---| --- |  --- |  --- |  --- | 
| style | _object_ | false | `{ lineWidth: 1, stroke: '#8c8c8c', lineDash: [4, 2]` | 牵引线的样式配置 |

### 图形样式

#### risingFill ✨

**可选**, _number_

功能描述：上涨色配置。

默认配置： `#f4664a`

#### fallingFill ✨

**可选**, _number_

功能描述：上涨色配置。

默认配置： `#30bf78`

#### columnWidthRatio

**可选**, _number_

功能描述： 柱状图宽度占比 [0-1] 。

默认配置： 无

#### waterfallStyle

**可选**, _StyleAttr | Function_

功能描述：柱子样式配置 。

默认配置： 无

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`
