---
title: Legend
order: 2
---

`markdown:docs/styles/component.md`


Legend is an auxiliary component of a plot, which uses color, size, and shape mapping, to show the symbol, color, and name of different series. You can click legends to toggle displaying series in the plot.

Go to [AntV Design | 图例 Legend](https://www.yuque.com/mo-college/vis-design/hcs9p2) of 墨者学院 to learn more about **Design guide**

#### Usage

<b>There are two ways to configure legends:</b>

Method 1, pass in the 'false' setting to close the legend.

```ts
legend: false; // close legend
```

Method 2, pass in _LegendCfg_ to configure the legend as a whole.

```ts
legend: {
  layout: 'horizontal',
  position: 'right'
}
```

<a name="7a2DF"></a>

#### Configuration item（_LegendCfg_）

| Properties    | Type           | Default    | Description                                                                                                                                                                                   | Apply to                                                                    |
| ------------- | -------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| layout        | _string_       | horizontal | The layout of the legend is optional:_horizontal \| vertical_                                                                                                                                 |                                                                             |
| title         | _object_       | -          | Legend title configuration is not displayed by default, reference [title configuration](#title)                                                                                               |                                                                             |
| position      | _string_       | -          | Legend position, reference  [position configuration](#position)                                                                                                                               |                                                                             |
| offsetX       | _number_       | -          | Legends offset in the x direction.                                                                                                                                                            |                                                                             |
| offsetY       | _number_       | -          | Legends offset in the y direction.                                                                                                                                                            |                                                                             |
| background    | _object_       | -          | Background box configuration item.reference  [background configuration](#background)                                                                                                          |                                                                             |
| flipPage      | _boolean_      | false      | Whether to page when there are too many legend items.                                                                                                                                         | <tag color="green" text="Classification legend">Classification legend</tag> |
| itemWidth     | _number \| null_ | null       | The width of the legend item, default to null (automatically computed).                                                                                                                       | <tag color="green" text="Classification legend">Classification legend</tag> |
| itemHeight    | _number \| null_ | null       | The height of the legend, default to null.                                                                                                                                                    | <tag color="green" text="Classification legend">Classification legend</tag> |
| itemName      | _object_       | -          | Configure the legend item name text.reference  [itemName configuration](#itemname)                                                                                                            | <tag color="green" text="Classification legend">Classification legend</tag> |
| itemValue     | _object_       | -          | Configuration item of legend item Value added value.reference  [itemValue configuration](#itemvalue)。                                                                                        | <tag color="green" text="Classification legend">Classification legend</tag> |
| itemSpacing   | _number_       | -          | Controls the horizontal spacing of legend items                                                                                                                                               | <tag color="green" text="Classification legend">Classification legend</tag> |
| animate       | _boolean_      | -          | Whether to turn on the animation switch.                                                                                                                                                      |                                                                             |
| animateOption | _object_       | -          | Animate parameter configuration, which takes effect if and only if the animate property is true, that is, the animation is turned on, reference [animateOption configuration](#animateOption) |                                                                             |
| label         | _object_       | -          | A configuration item for the text.reference [label configuration](#label)                                                                                                                     | <tag color="green" text="Classification legend">Classification legend</tag> |
| marker        | _object_       | -          | The configuration of the Marker icon of the legend item.                                                                                                                                      | <tag color="green" text="Classification legend">Classification legend</tag> |
| maxWidth      | _number_       | -          | Legend item maximum width set.                                                                                                                                                                | <tag color="green" text="Classification legend">Classification legend</tag> |
| maxHeight     | _number_       | -          | Set the maximum height of the legend item.                                                                                                                                                    | <tag color="green" text="Classification legend">Classification legend</tag> |
| rail          | _object_       | -          | The style configuration item for the legend slider (background).reference  [rail configuration](#rail)                                                                                        | <tag color="green" text="Classification legend">Classification legend</tag> |
| reversed      | _boolean_      | -          | Whether to display legend items in reverse order.                                                                                                                                             | <tag color="green" text="Classification legend">Classification legend</tag> |
| min           | _number_       | -          | The minimum value of the range.                                                                                                                                                               | <tag color="cyan" text="Continuous legend">Continuous legend</tag>          |
| max           | _number_       | -          | Select the maximum value of the range.                                                                                                                                                        | <tag color="cyan" text="Continuous legend">Continuous legend</tag>          |
| value         | _number[]_     | -          | The selected value.                                                                                                                                                                           | <tag color="cyan" text="Continuous legend">Continuous legend</tag>          |
| slidable      | _boolean_      | -          | Whether the slider can slide.                                                                                                                                                                 | <tag color="cyan" text="Continuous legend">Continuous legend</tag>          |
| track         | _object_       | -          | Select the color block style configuration item for the range.reference  [track  configuration](#track)                                                                                       | <tag color="cyan" text="Continuous legend">Continuous legend</tag>          |
| handler       | _object_       | -          | Configuration items for the slider.reference [handler configuration](#handler)                                                                                                                | <tag color="cyan" text="Continuous legend">Continuous legend</tag>          |
| custom        | _boolean_      | false      | If it is a custom legend, the items property needs to be declared when this property is true.                                                                                                 |                                                                             |
| items         | _object[]_     | -          | The user configures the content of the legend item himself.reference [items configuration](#items)                                                                                            |                                                                             |

<a name="fDpx7"></a>

#### Configuration item details

`markdown:docs/common/legend-cfg.en.md`
