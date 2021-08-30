### Image Annotation

#### type

<description>**optional** _string_</description>

需要指定 `type: 'image',` 标识为：辅助图片，在图表上添加辅助图片。

#### src

<description>**optional** _string_ </description>

图片路径，用于 image 中。

#### position

<description>**optional** _[string, string] | Datum | ((xScale, yScales) => [string, string])_</description>

图片标注位置。

[Example](/zh/examples/component/annotation#image-annotation)

#### start

<description>**optional** _AnnotationPosition_ </description>

起始位置，需搭配 `end` 使用，也可以直接只使用 `position`。具体配置属性参考 Line Annotation `start` 配置。

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

结束位置，需搭配 `start` 使用，也可以直接只使用 `position`。具体配置属性参考: [start](#start)

#### style

<description>**optional** _object_ </description>

图片标注样式，可以设置图片标注的宽度和高度，如下：

```ts
annnotations: [{
  type: 'image',
  src: 'xxx',
  style: {
    width: 50,
    height: 50,
  }
}]
```

`markdown:docs/common/annotations/base-annotation.zh.md`
