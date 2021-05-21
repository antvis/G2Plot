##### top

<description>**optional** _boolean_  _default:_ `false`</description>

是否渲染在画布顶层，防止部分图形中，需要将 axis 显示在图形上面，避免被图形遮挡。

##### position

<description>**optional** _`top` | `bottom` | `left` | `right`_</description>

For Cartesian coordinates, set the position of the coordinate axes.

##### title

<description>**optional** _object_</description>

A configuration item for the title, NULL means not to be displayed.

| Properties | Type         | Description                                                                |
| ---------- | ------------ | -------------------------------------------------------------------------- |
| text       | _string_     | The title of axis                                                          |
| position   | _string_     | Position of the axis title, default: 'center'. Options: start, center, end |
| offset     | _number_     | The distance of the title from the coordinate axis                         |
| spacing    | _number_     | The distance between the title and the text on the coordinate axis         |
| style      | _shapeStyle_ | Title text configuration items                                             |
| autoRotate | _boolean_    | Whether to rotate automatically or not                                     |

**_shapeStyle_**

`markdown:docs/common/shape-style.en.md`

**_label_**

<description>**optional** _object_</description>

A configuration item for the text label. NULL indicates that it is not displayed.

`markdown:docs/common/label.en.md`

##### label

<description> _AxisLabelCfg | null_ **optional** </description>

Configurations related to axis label. Set this to `null` to prevent the axis label from appearing. The details of _ AxisLabelCfg_ are as follows:

| Properties   | Type                                                     |         |
| ------------ | -------------------------------------------------------- | ------- | --------------------------------------------------------- |
| style        | _[ShapeAttrs](/en/docs/api/graphic-style)_               | -       | Axis label text graphic property style                    |
| offset       | _number_                                                 | -       | Axis label offset                                         |
| rotate       | _number_                                                 | -       | Axis label text rotation Angle                            |
| autoRotate   | _boolean \|avoidCallback_                                                 | `true`  | Whether to rotate automatically, default true             |
| autoHide     | _boolean \|avoidCallback \| { type:string,cfg?:AxisLabelAutoHideCfg }_                | `false` | Whether to hide it automatically, default to false        |
| autoEllipsis | _boolean_                                                | `false` | Whether to ellipsis label when overflow, default to false |
| formatter    | _`(text: string, item: ListItem, index: number) => any`_ | `false` | Format function                                           |

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

Mark the direction of the label on the axis, with 1 to the left and -1 to the right (Only works in vertical axis).

##### verticalLimitLength

<description>**optional** _number_</description>

Configuring the maximum limit length in the vertical direction of the coordinate axis has a significant impact on text adaptation.

##### grid

<description>**optional** _object_</description>

Axis grid line configuration item. NULL means not shown.

| Properties     | Type               | Description                                                        |
| -------------- | ------------------ | ------------------------------------------------------------------ |
| line           | _lineStyle_        | The style of the line                                              |
| alternateColor | _string\|string[]_ | The fill color between two grid lines                              |
| closed         | _boolean_          | Whether to close the grid for circle                               |
| alignTick      | _boolean_          | If the value is false, it will be displayed between the two scales |

Then config of `grid.line` is the same as: [line](#line)

##### line

<description>**optional** _object_</description>

Coordinate axis configuration item, NULL means not displayed.

`markdown:docs/common/line-style.en.md`

##### tickLine

<description>**optional** _object_</description>

The configuration item of the coordinate axis scale line. NULL means not displayed.

| Properties | Type        | Description                            |
| ---------- | ----------- | -------------------------------------- |
| style      | _lineStyle_ | The style of tickLine.                 |
| alignTick  | _boolean_   | Whether aligh tickLine with tick label |
| length     | _number_    | The length of tickLine.                |

Go [ShapeAttrs](/zh/docs/api/graphic-style) see more details about _ShapeAttrs_. The params of _ShapeAttrsCallback_ are as follow：

```ts
type ShapeAttrsCallback = (item: any, index: number, items: any[]) => ShapeAttrs;
```

##### subTickLine

<description>**optional** _object_</description>

A configuration item for a coordinate subscale. NULL indicates that it is not displayed.

| Properties | Type                               | Description                |
| ---------- | ---------------------------------- | -------------------------- |
| style      | _ShapeAttrs \| ShapeAttrsCallback_ | The style of subTickLine.  |
| count      | _number_                           | The count of subTickLine.  |
| length     | _number_                           | The length of subTickLine. |

Go [ShapeAttrs](/zh/docs/api/graphic-style) see more details about _ShapeAttrs_. The params of _ShapeAttrsCallback_ are as follow：

```ts
type ShapeAttrsCallback = (item: any, index: number, items: any[]) => ShapeAttrs;
```

##### nice

<description>**optional** _boolean_ _default:_ `true`</description>

Whether to nice.

##### min

<description>**optional** _number_ _default:_ `0`</description>

Minimum axis.

##### max

<description>**optional** _number_</description>

Maximum axis.

##### minLimit

<description>**optional** _number_</description>

Minimal limit.

##### maxLimit

<description>**optional** _number_</description>

Maximum limit.

##### tickCount

<description>**optional** _number_</description>

The expected number of axes, not the final result.

##### tickInterval

<description>**optional** _number_</description>

Interval of axes.

##### tickMethod

<description>**optional** _string | Function_ _default:_ `false`</description>

Specify a tick calculation method, or customize a tick calculation method. Built-in tick calculations include `cat`、`time-cat`、 `wilkinson-extended`、`r-pretty`、`time`、`time-pretty`、`log`、`pow`、`quantile`、`d3-linear`。

##### animate

<description>**optional** _boolean_ _default:_ `true`</description>

Animation switch, default true.

##### animateOption

<description>**optional** _object_</description>

Animation parameter configuration.

```ts
interface ComponentAnimateCfg {
  /** Duration of the first animation */
  readonly duration?: number;
  /** Easing method used for the first animation. */
  readonly easing?: string;
  /** Delay before updating the animation */
  readonly delay?: number;
}
// Configure the reference
{
  animateOption: {
    appear: ComponentAnimateCfg;
    update: ComponentAnimateCfg;
    enter: ComponentAnimateCfg;
    leave: ComponentAnimateCfg;
  }
}
```
