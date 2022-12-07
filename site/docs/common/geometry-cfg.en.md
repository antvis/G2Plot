
#### IGeometry.type

<description>**required** _string_</description>

Type of geometry, includes: `'line' | 'interval' | 'point' | 'area' | 'polygon'`。

#### IGeometry.mapping ✨

<description>**required** _object_</description>

Mapping rules of geometry.

在图形语法中，数据可以通过 `color`, `shape`, `size` 等视觉属性映射到图形上，另外 G2/G2Plot 还提供了 `style` 和 `tooltip`，让图形展示更多的信息。具体类型定义见下：（其中：ShapeStyle 具体见[绘图属性](/en/docs/api/graphic-style))

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
}

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

<description>**optional** _string_</description>

对应 x 轴字段。数据映射到几何图形 geometry 上时，最重要的通道是 `position` 通道。笛卡尔坐标系上的几何图形，通常是一维或二维的，对应位置视觉通道需要 `x`, `y` 两个（或一个）字段的值。

#### IGeometry.yField

<description>**optional** _string_</description>

对应 y 轴字段。数据映射到几何图形 geometry 上时，最重要的通道是 `position` 通道。笛卡尔坐标系上的几何图形，通常是一维或二维的，对应位置视觉通道需要 `x`, `y` 两个（或一个）字段的值。

#### IGeometry.colorField

<description>**optional** _string_</description>

The mapping field of `color`. 通过颜色视觉通道对数据进行分组。

#### IGeometry.shapeField

<description>**optional** _string_</description>

The mapping field of `shape`. 通过不同的形状对数据进行分组。

#### IGeometry.sizeField

<description>**optional** _string_</description>

The mapping field of `size`. 通过 size 字段，可以将数据按照 `sizeField` 对应的数据进行不同的大小映射。

#### IGeometry.styleField

<description>**optional** _string_</description>

The mapping field of `style`, 

#### IGeometry.tooltipFields

<description>**optional** _string[] | false_</description>

The mapping fields of `tooltip`, 

#### IGeometry.label

<description>**optional** _object_</description>

The mapping of `label`, see more: [Label API](/en/docs/api/components/label)

#### IGeometry.adjust

Adjust of data.

The purpose of adjusting data is to make the graphics not obscure each other and to have a clearer understanding of the data, but the correct understanding of the data must be ensured. See more:  [Adjust | G2](https://g2.antv.vision/en/docs/manual/concepts/adjust)

| Properties  | Type     | Description      |
| ------------ | ----------- | -------- |
| type         | 'stack' \| 'dodge' \| 'jitter' \| 'symmetric' | 数据调整类型    |
| marginRatio  | number                                        | 只对 'dodge' 生效，取 0 到 1 范围的值（相对于每个柱子宽度），用于控制一个分组中柱子之间的间距 |
| dodgeBy      | string                                        | 只对 'dodge' 生效，声明以哪个数据字段为分组依据                                               |
| reverseOrder | boolean                                       | 只对 'stack' 生效，用于控制是否对数据进行反序操作                                             |

#### IGeometry.state

<description>**optional** _object_</description>

Style of different state.
