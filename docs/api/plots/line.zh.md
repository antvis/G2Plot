---
title: 折线图
order: 0
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 坐标系

#### 轴镜像反转 - reflect

<description>**可选** _'x' | 'y' | ['x', 'y']_</description>

折线图坐标系反转。当设置 `reflect: 'y'`时，可以对 y-axis 进行反转；同理，设置 `reflect: 'x'`时，可以对 x-axis 进行反转；也支持同时对 x-axis 和 y-axis 进行反转。

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：

```ts
const data = [
  { time: '1991'，value: 20 },
  { time: '1992'，value: 20 },
];
```

`markdown:docs/common/xy-field.zh.md`

#### seriesField

<description>**可选** _string_</description>

分组字段。用于同时看一个维度中不同情况的指标需求。比如：我们看不同大区最近 30 天的销售额趋势情况，那么这里的大区字段就是 seriesField。

#### meta

`markdown:docs/common/meta.zh.md`

### 图形样式

#### smooth

<description>**可选** _boolean_ _default:_ `false`</description>

曲线是否平滑。

#### stepType

<description>**可选** _hv | vh | hvh | vhv_</description>

阶梯折线图类型，配置后 smooth 无效。 这里的 h 和 v 是 `horizontal` 和 `vertical` 的首字母。所以 vh 的意思就是起始点先竖直方向，然后水平方向。

#### connectNulls

<description>**可选** _boolean_ _default:_ `true`</description>

对于折线图中缺失的值，是否连接空数据为一条线，或者折线断开。

#### isStack

<description>**可选** _boolean_ _default:_ `false`</description>

对于存在 seriesField 分组字段的情况，我们可以设置 isStack = true，让折线堆叠累加起来。

`markdown:docs/common/color.zh.md`

#### lineStyle

<description>**可选** _StyleAttr | Function_</description>

折线图形样式。可以直接传入 `ShapeStyle` 结构，也可以使用回调函数的方式，针对不同的数据，来返回不同的样式。对于 ShapeStyle 的数据结构，可以参考：

`markdown:docs/common/shape-style.zh.md`

#### point

<description>**可选** _object_</description>

折线数据点图形样式。

`markdown:docs/common/point-style.zh.md`

#### state

<description>**可选** _object_</description>

`markdown:docs/common/state-style.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`

#### 缩略轴 - slider

`markdown:docs/common/slider.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表交互

`markdown:docs/common/interactions.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`

### 自定义 ✨

#### customInfo

<description>**可选** _any_</description>

通过 `customInfo` 属性，可以向 shape 中传入自定义的数据。目前可能仅仅可能用于在 `registerShape` 的时候，像自定义 shape 中传入自定义的数据，方便实现自定义 shape 的配置能力。

