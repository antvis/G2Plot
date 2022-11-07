#### intervalPadding

<description>**optional**, _number_</description>

Specify the padding of interval, pixel value.  Used in GroupColumn plot.

<playground path='bar/grouped/interval-padding.ts' rid='rect1'></playground>

#### dodgePadding

<description>**optional**, _number_</description>

Specify the padding of interval on the same group, pixel value. Used in GroupColumn plot.

<playground path='bar/grouped/dodge-padding.ts' rid='rect2'></playground>

#### minBarWidth

<description>**optional**, _number_</description>

Specify the min width of bar, pixel value. Auto adapt by default.

#### maxBarWidth

<description>**optional**, _number_</description>

Specify the max width of bar, pixel value. Auto adapt by default.

#### barStyle

<description>**optional** _StyleAttr | Function_</description>

Bar graphic Style.

<embed src="@/docs/common/shape-style.en.md"></embed>

#### barBackground.style

<description>**optional** _StyleAttr_</description>

Background style of bar graphic. **Attention**: It doesn't work when `type="line"` in Radial-bar plot.

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
