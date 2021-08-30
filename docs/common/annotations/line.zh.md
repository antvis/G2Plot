#### Line Annotation

##### type

<description>**optional** _string_</description>

需要指定 `type: 'line',` 标识为：辅助线（可带文本），例如表示平均值或者预期分布的直线。

##### start

<description>**optional** _AnnotationPosition_ </description>

起始位置，一般用于 line、region 等。

**_AnnotationPosition_** 类型定义如下：

```ts
type AnnotationPositionCallback = (
  xScales: Scale[] | Record<string, Scale>,
  yScales: Scale[] | Record<string, Scale>
) => [number | string, number | string];

// types of annotation
type AnnotationPosition =
  | [number | string, number | string]
  | Record<string, number | string>
  | AnnotationPositionCallback;
```

除了指定原始数据之外，还可以使用预设定数据点，如：

- 'min': 最小值，minimum value.
- 'max': 最大值，maximum value.
- 'mean': 平均值，average value.
- 'median': 中位值，median value.
- 'start': 即 0.
- 'end': 即 1.

[Example](/zh/examples/component/annotation#line-annotation-position)

##### end

<description>**optional** _AnnotationPosition_ </description>

结束位置，一般用于 line、region 等。具体配置属性参考: [start](#start)

##### top

<description>**optional** _boolean_ </description>

指定 annotation 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

##### style

<description>**optional** _object_ </description>

辅助线样式属性，参考[绘图属性](/zh/docs/api/graphic-style)

##### offsetX

<description>**optional** _number_ </description>

x 轴方向的偏移量。

##### offsetY

<description>**optional** _number_ </description>

y 轴方向的偏移量。

##### text

<description>**optional** _LineAnnotationTextCfg_ </description>

辅助线上的文本设置。

**_LineAnnotationTextCfg_** 类型定义如下：

```ts
type LineAnnotationTextCfg = {
  /** 文本内容*/
  content?: string;
  /** 自动旋转，沿着线的方向，默认 true */
  autoRotate?: boolean;
  /** 文本的偏移 x */
  offsetX?: number;
  /** 文本的偏移 y */
  offsetY?: number;
  /** 字体样式，参考绘图属性 */
  style?: object;
};
```

[Example](/zh/examples/component/annotation#line-annotation-with-text)

##### animate

<description>**optional** _boolean_ </description>

是否进行动画。

##### animateOption

<description>**optional** _object_ </description>

动画参数配置，当且仅当 `animate` 属性为 true，即动画开启时生效。，参考[动画参数配置](/zh/docs/api/options/animation)
