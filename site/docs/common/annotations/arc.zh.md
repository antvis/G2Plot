#### 💠 Arc Annotation

##### type

<description>**optional** _string_</description>

需要指定 `type: 'arc',` 标识为：辅助弧线，只在**极坐标系**下生效。常用于绘制仪表盘。

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
