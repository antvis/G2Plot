#### intervalPadding

<description>**可选**, _number_</description>

功能描述: 分组柱状图的组间间距调整，像素级别。

<playground path='column/grouped/interval-padding.ts' rid='rect1'></playground>

#### dodgePadding

<description>**可选**, _number_</description>

功能描述: 分组柱状图的组内柱子间距调整，像素级别。

<playground path='column/grouped/dodge-padding.ts' rid='rect2'></playground>

#### minColumnWidth

<description>**可选**, _number_</description>

功能描述: 柱子的最小宽度设置。

#### maxColumnWidth

<description>**可选**, _number_</description>

功能描述: 柱子的最大宽度设置。

#### columnStyle

<description>**可选** _StyleAttr | Function_</description>

功能描述： 样式配置 。

`markdown:docs/common/shape-style.zh.md`

#### columnBackground.style

<description>**可选** _StyleAttr_</description>

功能描述：柱子的背景样式配置 。

Example:

```ts
{
  columnBackground: {
    style: {
      fill: '#000',
      fillOpacity: 0.25,
    }
  }
}
```
