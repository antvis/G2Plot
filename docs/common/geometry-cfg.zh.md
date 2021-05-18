
#### IGeometry.type

<description>**required** _string_</description>

几何图形 geometry 类型。可选值: `'line' | 'interval' | 'point' | 'area' | 'polygon'`。

#### IGeometry.mapping ✨

<description>**required** _object_</description>

图形配置规则。
在图形语法中，数据可以通过 `color`, `shape`, `size` 等视觉属性映射到图形上，另外 G2/G2Plot 还提供了 `style` 和 `tooltip`，让图形展示更多的信息。具体类型定义见下：（其中：ShapeStyle 具体见[绘图属性](/zh/docs/api/graphic-style))

<div class="sign">

```ts
type MappingOptions = {
  /** color 映射 */
  readonly color?: ColorAttr;
  /** shape 映射 */
  readonly shape?: ShapeAttr;
  /** 大小映射, 提供回调的方式 */
  readonly size?: SizeAttr;
  /** 样式映射 */
  readonly style?: StyleAttr;
  /** tooltip 映射 */
  readonly tooltip?: TooltipAttr;
};

/** 颜色映射 */
type ColorAttr = string | string[] | ((datum: Datum) => string);
/** 尺寸大小映射 */
type SizeAttr = number | [number, number] | ((datum: Datum) => number);
/** 图形 shape 映射 */
type ShapeAttr = string | string[] | ((datum: Datum) => string);
/** 图形样式 style 映射 */
type StyleAttr = ShapeStyle | ((datum: Datum) => ShapeStyle);
/** tooltip 的回调 */
type TooltipAttr = (datum: Datum) => { name: string; value: string | number };
```

</div>

#### IGeometry.xField

<description>**可选** _string_</description>

对应 x 轴字段。数据映射到几何图形 geometry 上时，最重要的通道是 `position` 通道。笛卡尔坐标系上的几何图形，通常是一维或二维的，对应位置视觉通道需要 `x`, `y` 两个（或一个）字段的值。

#### IGeometry.yField

<description>**可选** _string_</description>

对应 y 轴字段。数据映射到几何图形 geometry 上时，最重要的通道是 `position` 通道。笛卡尔坐标系上的几何图形，通常是一维或二维的，对应位置视觉通道需要 `x`, `y` 两个（或一个）字段的值。

#### IGeometry.colorField

<description>**可选** _string_</description>

对应颜色(color)映射字段。通过颜色视觉通道对数据进行分组。

#### IGeometry.shapeField

<description>**可选** _string_</description>

对应形状(shape)映射字段。通过不同的形状对数据进行分组。

#### IGeometry.sizeField

<description>**可选** _string_</description>

对应大小(size)映射字段。通过 size 字段，可以将数据按照 `sizeField` 对应的数据进行不同的大小映射。

#### IGeometry.styleField

<description>**可选** _string_</description>

style 映射字段。

#### IGeometry.tooltipFields

<description>**可选** _string[] | false_</description>

tooltip 映射字段。

#### IGeometry.label

<description>**可选** _object_</description>

label 映射通道，具体见 [Label API](/zh/docs/api/components/label)

#### IGeometry.adjust

数据调整配置项。
调整数据的目的是为了使得图形不互相遮挡，对数据的认识更加清晰，但是必须保证对数据的正确理解，更多信息可以查看 [数据调整 | G2](https://g2.antv.vision/zh/docs/manual/concepts/adjust)

| 参数名       | 类型       | 描述            |
| ------------ | ----------- | -------- |
| type         | 'stack' \| 'dodge' \| 'jitter' \| 'symmetric' | 数据调整类型    |
| marginRatio  | number                                        | 只对 'dodge' 生效，取 0 到 1 范围的值（相对于每个柱子宽度），用于控制一个分组中柱子之间的间距 |
| dodgeBy      | string                                        | 只对 'dodge' 生效，声明以哪个数据字段为分组依据                                               |
| reverseOrder | boolean                                       | 只对 'stack' 生效，用于控制是否对数据进行反序操作                                             |

#### IGeometry.state

<description>**可选** _object_</description>

不同状态的样式
