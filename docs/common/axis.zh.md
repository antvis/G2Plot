##### top

<description>**optional** _boolean_  _default:_ `false`</description>

是否渲染在画布顶层，防止部分图形中，需要将 axis 显示在图形上面，避免被图形遮挡。

##### position

<description>**optional** _`top` | `bottom` | `left` | `right`_</description>

适用于直角坐标系，设置坐标轴的位置。

##### title

<description>**optional** _object_</description>

标题的配置项，null 表示不展示。

| 细分配置项名称 | 类型         | 功能描述                                                  |
| -------------- | ------------ | --------------------------------------------------------- |
| text           | _string_     | 坐标轴标题                                                |
| position       | _string_     | 轴标题的位置，默认：'center'。可选项： start, center, end |
| offset         | _number_     | 标题距离坐标轴的距离                                      |
| spacing        | _number_     | 标题距离坐标轴文本的距离                                  |
| style          | _shapeStyle_ | 标题文本配置项                                            |
| autoRotate     | _boolean_    | 是否自动旋转，默认为: true                                              |
| rotation     | _number_    | 关闭 `autoRotate` 后，可以设置自动旋转的角度，如: -Math.PI / 2 (条形图 y 轴标题)                                          |

**_shapeStyle_**

`markdown:docs/common/shape-style.zh.md`

**_label_**

<description>**optional** _object_</description>

文本标签的配置项，null 表示不展示。

`markdown:docs/common/label.zh.md`

##### label

<description> **optional** _AxisLabelCfg | null_</description>

文本标签的配置项，null 表示不展示。_AxisLabelCfg_ 配置如下：

| 参数名       | 类型                                                     | 默认值  | 描述                     |
| ------------ | -------------------------------------------------------- | ------- | ------------------------ |
| offset       | _number_                                                 | -       | label 的偏移量           |
| rotate       | _number_                                                 | -       | 文本旋转角度             |
| autoRotate   | _boolean \|avoidCallback_             | `true`  | 是否自动旋转             |
| autoHide     | _boolean \|avoidCallback \| { type:string,cfg?:AxisLabelAutoHideCfg }_   | `false` | 是否自动隐藏             |
| autoEllipsis | _boolean \|avoidCallback \|string_                                                | `false` | 是否自动省略             |
| formatter    | _`(text: string, item: ListItem, index: number) => any`_ | `false` | 格式化函数               |
| style        | _[ShapeAttrs](/zh/docs/api/graphic-style)_               | -       | 坐标轴刻度线的样式配置项 |

**_avoidCallback_** 类型定义如下：

```ts
type avoidCallback = (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean;
```

**_AxisLabelAutoHideCfg_** 类型定义如下：

```ts
interface AxisLabelAutoHideCfg {
  /** 最小间距配置 */
  minGap?: number;
}
```

##### verticalFactor

<description>**optional** _number_</description>

标记坐标轴 label 的方向，左侧为 1，右侧为 -1（仅适用于垂直方向的坐标轴）

##### verticalLimitLength

<description>**optional** _number_</description>

配置坐标轴垂直方向的最大限制长度，对文本自适应有很大影响。

##### grid

<description>**optional** _object_</description>

坐标轴网格线的配置项，null 表示不展示。

| 细分配置项名称 | 类型               | 功能描述                                                 |
| -------------- | ------------------ | -------------------------------------------------------- |
| line           | _lineStyle_        | 线的样式,                                                |
| alternateColor | _string\|string[]_ | 两个栅格线间的填充色                                     |
| closed         | _boolean_          | 对于 circle 是否关闭 grid                                |
| alignTick      | _boolean_          | 是否同刻度线对齐，如果值为 false，则会显示在两个刻度中间 |

网格线条样式的配置与 [line](#line) 是一致的。

##### line

<description>**optional** _object_</description>

坐标轴线的配置项，null 表示不展示。

`markdown:docs/common/line-style.zh.md`

##### tickLine

<description>**optional** _object_</description>

坐标轴刻度线的配置项，null 表示不展示。

| 细分配置项名称 | 类型                               | 功能描述                     |
| -------------- | ---------------------------------- | ---------------------------- |
| style          | _ShapeAttrs \| ShapeAttrsCallback_ | 坐标轴刻度线的样式。         |
| alignTick      | _boolean_                          | 坐标轴刻度线是否同 tick 对齐 |
| length         | _number_                           | 坐标轴刻度线长度             |

关于 _ShapeAttrs_ 详细查看 [ShapeAttrs](/zh/docs/api/graphic-style) 文档。_ShapeAttrsCallback_ 回调参数如下：

```ts
type ShapeAttrsCallback = (item: any, index: number, items: any[]) => ShapeAttrs;
```

##### subTickLine

<description>**optional** _object_</description>

坐标轴子刻度线的配置项，null 表示不展示。

| 细分配置项名称 | 类型                               | 功能描述               |
| -------------- | ---------------------------------- | ---------------------- |
| style          | _ShapeAttrs \| ShapeAttrsCallback_ | 坐标轴子刻度线的样式。 |
| count          | _number_                           | 子刻度个数             |
| length         | _number_                           | 坐标轴子刻度线长度     |

关于 _ShapeAttrs_ 详细查看 [ShapeAttrs](/zh/docs/api/graphic-style) 文档。_ShapeAttrsCallback_ 回调参数如下：

```ts
type ShapeAttrsCallback = (item: any, index: number, items: any[]) => ShapeAttrs;
```

##### nice

<description>**optional** _boolean_ _default:_ `true`</description>

是否美化。

##### min

<description>**optional** _number_ _default:_ `0`</description>

坐标轴最小值。

##### max

<description>**optional** _number_</description>

坐标轴最大值。

##### minLimit

<description>**optional** _number_</description>

最小值限定。

##### maxLimit

<description>**optional** _number_</description>

最大值限定。

##### tickCount

<description>**optional** _number_</description>

期望的坐标轴刻度数量，非最终结果。

##### tickInterval

<description>**optional** _number_</description>

坐标轴刻度间隔。

##### tickMethod

<description>**optional** _string | Function_ _default:_ `false`</description>

指定 tick 计算方法，或自定义计算 tick 的方法，内置 tick 计算方法包括 `cat`、`time-cat`、 `wilkinson-extended`、`r-pretty`、`time`、`time-pretty`、`log`、`pow`、`quantile`、`d3-linear`。

##### animate

<description>**optional** _boolean_ _default:_ `true`</description>

动画开关，默认开启。

##### animateOption

<description>**optional** _object_</description>

动画参数配置。

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
{
  animateOption: {
    appear: ComponentAnimateCfg;
    update: ComponentAnimateCfg;
    enter: ComponentAnimateCfg;
    leave: ComponentAnimateCfg;
  }
}
```
