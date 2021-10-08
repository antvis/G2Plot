#### 💠 Line Annotation

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
##### style

<description>**optional** _object_ </description>

辅助线样式属性，参考[绘图属性](/zh/docs/api/graphic-style)

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

`markdown:docs/common/annotations/base-annotation.zh.md`
