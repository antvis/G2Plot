---
title: 仪表盘
order: 22
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### percent 

<description>**required** _number_</description>

指标比例数据 [0-1]。

#### radius

<description>**optional** _number_ _default:_ `0.95`</description>

外环的半径 [0-1]，相对于画布宽高的最小值来计算的。

#### innerRadius

<description>**optional** _number_ _default:_ `0.9`</description>

内环的半径 [0-1]，相对于内半径 radius 来计算的。

#### startAngle

<description>**optional** _number_ _default:_ `(-7 / 6) * Math.PI`</description>

圆盘的起始角度。

#### endAngle

<description>**optional** _number_ _default:_ `(1 / 6) * Math.PI`</description>

圆盘的终止角度。

### 图形样式

#### range

<description>**optional** _object_</description>

仪表盘辅助圆弧的样式。

| 配置项 | 类型     | 描述                                 |
| ------ | -------- | ------------------------------------ |
| ticks  | number[] | 辅助圆弧显示数字数组                 |
| color  | string[] | 辅助圆弧的颜色色板，按照色板顺序取值 |

#### axis

<description>**optional** _object_</description>

指标辅助轴样式。

`markdown:docs/common/axis.zh.md`

#### indicator

<description>**optional** _object_</description>

仪表盘指示器样式配置。按照组件分成为：

- `pointer`：指示器中的指针样式配置
- `pin`：指示器中的圆盘样式配置

他们都有以下配置项：

| 配置项 | 类型   | 描述         |
| ------ | ------ | ------------ |
| style  | object | ShapeStyle |

`markdown:docs/common/shape-style.zh.md`

#### statistic

<description>**optional** _object_</description>

指标中心文本组件。

`markdown:docs/common/statistic.zh.md`

