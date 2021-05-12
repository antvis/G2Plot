#### intervalPadding

<description>**optional**, _number_</description>

Specify the padding of interval, pixel value.  Used in GroupColumn plot.

<playground path='column/grouped/interval-padding.ts' rid='rect1'></playground>

#### dodgePadding

<description>**optional**, _number_</description>

Specify the padding of interval on the same group, pixel value. Used in GroupColumn plot.

<playground path='column/grouped/dodge-padding.ts' rid='rect2'></playground>

#### minColumnWidth

<description>**optional**, _number_</description>

Specify the min width of column, pixel value. Auto adapt by default.

#### maxColumnWidth

<description>**optional**, _number_</description>

Specify the max width of column, pixel value. Auto adapt by default.

#### columnStyle

<description>**optional** _StyleAttr | Function_</description>

Column graphic Style.

`markdown:docs/common/shape-style.en.md`

#### columnBackground.style

<description>**optional** _StyleAttr_</description>

Background style of column graphic

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
