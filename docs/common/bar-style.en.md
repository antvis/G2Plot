#### minBarWidth

<description>**optional**, _number_</description>

Specify the min width of bar, pixel value. Auto adapt by default.

#### maxBarWidth

<description>**optional**, _number_</description>

Specify the max width of bar, pixel value. Auto adapt by default.

#### barStyle

<description>**optional** _StyleAttr | Function_</description>

Bar graphic Style.

`markdown:docs/common/shape-style.en.md`

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
