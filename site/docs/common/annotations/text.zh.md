#### 💠 Text Annotation

##### type

<description>**optional** _string_</description>

需要指定 `type: 'text',` 标识为：辅助文本，在指定位置添加文本说明。

##### position

<description>**required** _[string, string] | Datum | ((xScale, yScales) => [string, string])_</description>

文本标注位置。

[Example](/zh/examples/component/annotation#text-annotation1)

##### x

<description>**optional** _number_</description>

文本标注位置 x，需要搭配 `y` 属性配置。不建议使用，建议使用 `position`。

##### y

<description>**optional** _number_</description>

文本标注位置 y，需要搭配 `x` 属性配置。不建议使用，建议使用 `position`。

##### content

<description>**optional** _string_ </description>

Text annotations 的文本标注内容。

##### rotate

<description>**optional** _number_ </description>

文本的旋转角度，弧度制。顺时针旋转。

##### offsetX

<description>**optional** _number_ </description>

文本在 x 轴方向的偏移量。

##### offsetY

<description>**optional** _number_ </description>

文本在 y 轴方向的偏移量。

##### style

<description>**optional** _object_ </description>

文本标注样式，参考[绘图属性](/zh/docs/api/graphic-style)

##### background

<description>**optional** _object_ </description>

文字包围盒样式设置。

| 参数名  | 类型                 | 描述                                                       |
| ------- | -------------------- | ---------------------------------------------------------- |
| style   | _object_             | 文本背景的样式, 参考[绘图属性](/zh/docs/api/graphic-style) |
| padding | _number \| number[]_ | 文本背景周围的留白                                         |

##### maxLength

<description>**optional** _number_ </description>

文文本的最大长度。

##### autoEllipsis

<description>**optional** _boolean_ </description>

超出 maxLength 是否自动省略。

##### ellipsisPosition

<description>**optional** _head | middle | tail _ </description>

文本截断的位置。

##### isVertical

<description>**optional** _boolean_ </description>

文本在二维坐标系的显示位置，是沿着 x 轴显示 还是沿着 y 轴显示。
