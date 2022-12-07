
#### IView.meta

<embed src="@/docs/common/meta.en.md"></embed>

#### IView.coordinate

Configuration of coordinate, every view has its own coordinate. The geometries of the same view share the same coordinate system. 

| Properties  | Type     | Description      |
| ------- | --------------- | -------------------------------------------------------- |
| type    | _string_        | `'polar' | 'theta' | 'rect' | 'cartesian' | 'helix'` |
| cfg     | _CoordinateCfg_ |   CoordinateCfg 坐标系配置项，目前常用于极坐标    |
| actions | _array object_  | 坐标系的变换配置，具体可以见 G2 坐标系[文档](https://g2.antv.vision/en/docs/api/general/coordinate)

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

<description>**optional** _object | false_</description>

view 上的图形坐标轴配置，key 值对应 `xField` 和 `yField`， value 具体配置见：[Axis API](/en/docs/api/components/axis)

<div class="sign">

```ts
{
  [field]: AxisOptions | false,
}
```

</div>

#### IView.annotations

<description>**optional** _object[]_ </description>

Annotations of geometry in view, see more: [Annotations API](/en/docs/api/components/annotations)

#### IView.interactions

<description>**optional** _object[]_ </description>

Interactions of view, see more: [Interactions API](/en/docs/api/options/interactions)

#### IView.tooltip

<description>**optional** _object_ </description>

Tooltip of view, see more: [Tooltip API](/en/docs/api/options/tooltip)

#### IView.animation

<description>**optional** _object_ </description>

Animation of view, see more: [Animation API](/en/docs/api/options/animation)
