## 配置属性

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### percent 📌

**必选**, _number_

功能描述： 指标比例

默认配置： 无

#### radius

**可选**, _number_

功能描述： 圆盘的外半径， 0 ~ 1 。

默认配置： `0.95`

#### innerRadius

**可选**, _number_

功能描述： 圆盘的内半径， 0 ~ 1 。

默认配置： `0.9`

#### startAngle

**可选**, _number_

功能描述： 圆盘的起始角度。

默认配置： `(-7 / 6) * Math.PI`

#### endAngle

**可选**, _number_

功能描述： 圆盘的终止角度。

默认配置： `(1 / 6) * Math.PI`

### 图形样式

#### range

**可选**, _object_

功能描述： 仪表盘辅助圆弧的样式。

| 配置项  | 类型                   | 描述     |
| ------- | ---------------------- | -------- |
| ticks  | number[] | 辅助圆弧显示数字数组     |
| color | string[] | 辅助圆弧的颜色色板，按照色板顺序取值 |

#### indicator

**可选**, _object_

功能描述： 仪表盘指示器样式配置。按照组件分成为：

 - `pointer`：指示器中的指针样式配置
 - `pin`：指示器中的圆盘样式配置

| 配置项    | 类型     | 描述                 |
| --------- | -------- | -------------------- |
| style     | object   | 组件样式配置       |

#### statistic

**可选**, _object_

功能描述： 指标文本组件 。

默认配置： 无

`markdown:docs/common/statistic.zh.md`

#### axis

**可选**, _object_

功能描述： 指标辅助轴样式 。

默认配置： 无

`markdown:docs/common/axis.zh.md`

