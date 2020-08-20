#### nice

<description>**可选** _boolean_</description>

功能描述：是否美化。

默认配置：`true`

#### min

<description>**可选** _number_</description>

功能描述：坐标轴最小值。

默认配置：`无`

#### max

<description>**可选** _number_</description>

功能描述：坐标轴最大值。

默认配置：`无`

#### minLimit

<description>**可选** _number_</description>

功能描述：最小值限定。

默认配置：`无`

#### maxLimit

<description>**可选** _number_</description>

功能描述：最大值限定。

默认配置：`无`

#### tickCount

<description>**可选** _number_</description>

功能描述：期望的坐标轴刻度数量，非最终结果。

默认配置：`无`

#### tickInterval

<description>**可选** _number_</description>

功能描述：坐标轴刻度间隔。

默认配置：`无`

#### tickMethod

<description>**可选** _Function_</description>

功能描述：自定义计算 tick 的方法。

默认配置：`无`

#### position

<description>**可选** _`top` | `bottom` | `left` | `right`_</description>

功能描述：适用于直角坐标系，设置坐标轴的位置。

默认配置：`无`

#### line

<description>**可选** _object_</description>

功能描述：坐标轴线的配置项，null 表示不展示。

默认配置：`无`

`markdown:common/line-style.zh.md`

#### tickLine

<description>**可选** _object_</description>

功能描述：坐标轴刻度线线的配置项，null 表示不展示。

默认配置：`无`

`markdown:common/line-style.zh.md`

#### subTickLine

<description>**可选** _object_</description>

功能描述：坐标轴子刻度线的配置项，null 表示不展示。

默认配置：`无`

`markdown:common/line-style.zh.md`

#### title

<description>**可选** _object_</description>

功能描述：标题的配置项，null 表示不展示。

默认配置：`无`

| 细分配置项名称 | 类型         | 功能描述                 |
| -------------- | ------------ | ------------------------ |
| offset         | _number_     | 标题距离坐标轴的距离     |
| spacing        | _lineStyle_  | 标题距离坐标轴文本的距离 |
| style          | _shapeStyle_ | 标题文本配置项           |
| autoRotate     | _boolean_    | 是否自动旋转             |

##### shapeStyle

`markdown:common/shape-style.zh.md`

#### label

<description>**可选** _object_</description>

功能描述：文本标签的配置项，null 表示不展示。

默认配置：`无`

`markdown:common/label.zh.md`

#### grid

<description>**可选** _object_</description>

功能描述：坐标轴网格线的配置项，null 表示不展示。

默认配置：`无`

| 细分配置项名称 | 类型               | 功能描述                                                 |
| -------------- | ------------------ | -------------------------------------------------------- |
| line           | _lineStyle_        | 线的样式                                                 |
| alternateColor | _string\|string[]_ | 两个栅格线间的填充色                                     |
| closed         | _boolean_          | 对于 circle 是否关闭 grid                                |
| alignTick      | _boolean_          | 是否同刻度线对齐，如果值为 false，则会显示在两个刻度中间 |

##### lineStyle

`markdown:common/line-style.zh.md`

#### animate

<description>**可选** _boolean_</description>

功能描述：动画开关，默认开启。

默认配置：`true`

#### animateOption

<description>**可选** _object_</description>

功能描述：动画参数配置。

默认配置： `无`

```ts
interface ComponentAnimateCfg {
  /** 动画执行时间 */
  readonly duration?: number;
  /** 动画缓动函数 */
  readonly easing?: string;
  /** 动画延迟时间 */
  readonly delay?: number;
}
// 配置参考
animateOption: {
  appear: ComponentAnimateCfg;
  update: ComponentAnimateCfg;
  enter: ComponentAnimateCfg;
  leave: ComponentAnimateCfg;
}
```

#### verticalFactor

<description>**可选** _number_</description>

功能描述：标记坐标轴 label 的方向，左侧为 1，右侧为 -1。

默认配置：`无`

#### verticalLimitLength

<description>**可选** _number_</description>

功能描述：配置坐标轴垂直方向的最大限制长度，对文本自适应有很大影响。

默认配置：`无`
