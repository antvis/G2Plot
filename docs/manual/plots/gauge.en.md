---
title: Gauge
order: 22
---

### Chart Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### percent 

<description>**required** _number_</description>

指标比例。

#### radius

<description>**optional** _number_ _default:_ `0.95`</description>

圆盘的外半径，0 ~ 1。 

#### innerRadius

<description>**optional** _number_ _default:_ `0.9`</description>

圆盘的内半径，0 ~ 1。

#### startAngle

<description>**optional** _number_ _default:_ `(-7 / 6) * Math.PI`</description>

圆盘的起始角度。

#### endAngle

<description>**optional** _number_ _default:_ `(1 / 6) * Math.PI`</description>

圆盘的终止角度。

### Geometry Style

#### range

<description>**optional** _object_</description>

仪表盘辅助圆弧的样式。

| 配置项 | 类型     | 描述                                 |
| ------ | -------- | ------------------------------------ |
| ticks  | number[] | 辅助圆弧显示数字数组                 |
| color  | string[] | 辅助圆弧的颜色色板，按照色板顺序取值 |

#### indicator

<description>**optional** _object_</description>

仪表盘指示器样式配置。按照组件分成为：

- `pointer`：指示器中的指针样式配置
- `pin`：指示器中的圆盘样式配置

| 配置项 | 类型   | 描述         |
| ------ | ------ | ------------ |
| style  | object | 组件样式配置 |

#### statistic

<description>**optional** _object_</description>

指标文本组件。

`markdown:docs/common/statistic.en.md`

#### axis

<description>**optional** _object_</description>

指标辅助轴样式。

`markdown:docs/common/axis.en.md`

 
