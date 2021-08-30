### Region Annotation

#### type

<description>**optional** _string_</description>

需要指定 `type: 'regionFilter',` 标识为：区域着色，将图表中位于矩形选区中的图形元素提取出来，重新着色。

#### start

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

#### end

<description>**optional** _AnnotationPosition_ </description>

结束位置，一般用于 line、region 等。具体配置属性参考: [start](#start)

#### style

<description>**optional** _object_ </description>

辅助线样式属性，参考[绘图属性](/zh/docs/api/graphic-style)

#### color

<description>**optional** _string_ </description>

染色色值，一般用于 regionFilter。

#### apply

<description>**optional** _string[]_ </description>

设定 regionFilter 只对特定 geometry 类型起作用，如 apply: ['area']，一般用于 regionFilter。

`markdown:docs/common/annotations/base-annotation.zh.md`
