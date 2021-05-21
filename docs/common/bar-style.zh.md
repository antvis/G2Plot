#### intervalPadding

<description>**可选**, _number_</description>

功能描述: 分组柱状图的组间间距调整，像素级别。

<playground path='bar/grouped/interval-padding.ts' rid='rect1'></playground>

#### dodgePadding

<description>**可选**, _number_</description>

功能描述: 分组柱状图的组内柱子间距调整，像素级别。

<playground path='bar/grouped/dodge-padding.ts' rid='rect2'></playground>

#### minBarWidth

<description>**可选**, _number_</description>

功能描述: 柱子的最小宽度设置。

#### maxBarWidth

<description>**可选**, _number_</description>

功能描述: 柱子的最大宽度设置。

#### barStyle

<description>**可选** _StyleAttr | Function_</description>

功能描述： 样式配置 。

`markdown:docs/common/shape-style.zh.md`

#### barBackground.style

<description>**可选** _StyleAttr_</description>

功能描述：柱子的背景样式配置 。 **注意**: 当玉珏图 `type="line"` 时，柱子背景设置不起作用。

Example:

```ts
{
  barBackground: {
    style: {
      fill: '#000',
      fillOpacity: 0.25,
    }
  }
}
```
