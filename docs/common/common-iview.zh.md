#### IView.meta

`markdown:docs/common/meta.zh.md`

#### IView.coordinate

坐标系的配置，每一个 view 具有自己的坐标系。同一个 view 下的 geometries 共用一个坐标系。

| 参数名  | 类型            | 可选值 ｜                                                                                           |
| ------- | --------------- | --------------------------------------------------------------------------------------------------- |
| type    | _string_        | `'polar' \| 'theta' \| 'rect' \| 'cartesian' \| 'helix'`                                            |
| cfg     | _CoordinateCfg_ | CoordinateCfg 坐标系配置项，目前常用于极坐标                                                        |
| actions | _array object_  | 坐标系的变换配置，具体可以见 G2 坐标系[文档](https://g2.antv.vision/zh/docs/api/general/coordinate) |

<div class="sign">

```ts
type CoordinateCfg = {
  // 用于极坐标，配置起始弧度。
  startAngle?: number;
  // 用于极坐标，配置结束弧度。
  endAngle?: number;
  // 用于极坐标，配置极坐标半径，0 - 1 范围的数值。
  radius?: number;
  // 用于极坐标，极坐标内半径，0 -1 范围的数值。
  innerRadius?: number;
};
```

</div>

#### IView.axes

<description>**可选** _object | false_</description>

view 上的图形坐标轴配置，key 值对应 `xField` 和 `yField`， value 具体配置见：[Axis API](/zh/docs/api/components/axis)

<div class="sign">

```ts
{
  [field]: AxisOptions | false,
}
```

</div>

#### IView.annotations

<description>**可选** _object[]_ </description>

view 上的几何图形的图形标注配置。具体见：[Annotations API](/zh/docs/api/components/annotations)

#### IView.interactions

<description>**可选** _object[]_ </description>

view 上的交互配置。具体见：[Interactions API](/zh/docs/api/options/interactions)

#### IView.tooltip

<description>**可选** _object_ </description>

每一个子 view 的 tooltip 配置。具体见：[Tooltip API](/zh/docs/api/options/tooltip)

#### IView.animation

<description>**可选** _object_ </description>

每一个子 view 的动画配置。具体见：[Animation API](/zh/docs/api/options/animation)
