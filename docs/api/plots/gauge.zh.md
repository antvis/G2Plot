---
title: 仪表盘
order: 5
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
| ticks  | _number[]_ | 辅助圆弧显示数字数组                 |
| color  | _string \|string[]_ | 辅助圆弧的颜色色板，按照色板顺序取值; 当设置 ticks 时，color 无法使用回调的方式 |
| width | _number_ | 对辅助圆弧的宽度进行像素级别的设置。默认通过 radius，innerRadius 来计算辅助圆弧的宽度。|

<playground rid="gauge" path="progress-plots/gauge/demo/custom-color.ts"></playground>

#### type ✨

<description>**optional** _string_ _default_: `undefined`</description>

仪表盘的展示类型。可选项为：`meter`，默认为空
#### meter ✨

<description>**optional** _object_</description>

当 `type = 'meter'` 时生效，具体配置属性如下。

| 配置项 | 类型     | 描述          | 默认值 |
| ------ | -------- | ----------------- | ---------|
| steps  | _number_ | 总步数        |  50 |
| stepRatio  | _number_ | [0, 1] 范围。代表着 step 和 gap 的比例关系，当 `stepRatio` 为 1 时，gap 为 0 | 0.5，即默认 step 等于 gap 宽度 |

<img src="https://gw.alipayobjects.com/zos/antfincdn/WBhwhNUzkg/image.png" width="400" align="center" style="display:flex;margin:0 auto;" alt="gauge">

#### gaugeStyle

<description>**optional** _StyleAttr | Function_</description>

仪表盘的样式设置。

`markdown:docs/common/shape-style.zh.md`

### 图表组件

#### axis

<description>**optional** _object_</description>

指标辅助轴样式。
- 💡 在仪表盘中，axis 组件可以使用的配置有：`label`, `tickLine`, `subTickLine`, 其他配置项不建议在仪表盘中使用。
- 💡 关于 `tick` 的设置, 可以直接在 `range.ticks` 中进行配置。

`markdown:docs/common/axis.zh.md`

#### indicator ✨

<description>**optional** _object_</description>

仪表盘**指示器**样式配置。按照组件分成为：

- `pointer`：指示器中的**指针**样式配置
- `pin`：指示器中的**圆盘**样式配置
- `shape`：自定义指示器形状，需要搭配自定义 `registerShape` 使用. 默认: `gauge-indicator` (具体实现, 见: [gauge/shapes/indicator](https://github.com/antvis/g2plot/blob/master/plots/gauge/shapes/indicator.ts))

他们都有以下配置项：

| 配置项 | 类型   | 描述         |
| ------ | ------ | ------------ |
| style  | object | ShapeStyle |

`markdown:docs/common/shape-style.zh.md`

#### statistic

<description>**optional** _object_</description>

指标中心文本组件。

`markdown:docs/common/statistic.zh.md`

