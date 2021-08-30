### DataRegion Annotation

#### type

<description>**optional** _string_</description>

需要指定 `type: 'dataRegion',` 标识为：特殊数据区间标注，多用于折线图和面积图。

#### position

<description>**required** _[string, string] | Datum | ((xScale, yScales) => [string, string])_</description>

DataMarker 标注位置，参考 Text Annotation 标注的 `position` 设置。

[Example](/zh/examples/component/annotation#text-annotation1)

#### lineLength

<description> _number_ **optional** _default:_ `0`</description>

line 长度。

#### region

<description> _null | { style?: ShapeAttrs }_ **optional** _default:_ `0`</description>

标注区间的配置。点击 [ShapeAttrs](/zh/docs/api/shape/shape-attrs) 查看详细样式配置。

#### text

<description> _null | EnhancedTextCfg_ **optional** _default:_ `0`</description>

文本的配置。

`markdown:docs/common/annotations/base-annotation.zh.md`
