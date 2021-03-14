##### layout

<description>**optional** _horizontal | vertical_ </description>

Layout

##### position

<description>**optional** _string_ </description>

The position of legend is optional:

- `top`
- `top-left`
- `top-right`
- `right`
- `right-top`
- `right-bottom`
- `left`
- `left-top`
- `left-bottom`
- `bottom`
- `bottom-left`
- `bottom-right`

##### background

<description>**optional** _LegendBackgroundCfg_ </description>

Background box configuration item. _LegendBackgroundCFG_ is configured as follows:

| Properties | Type               | Default | Description                                             |
| ---------- | ------------------ | ------- | ------------------------------------------------------- |
| padding    | number \| number[] | -       | White space in the background                           |
| style      | object             | -       | Background style configuration, Reference Graphic Style |

##### flipPage

<description>**optional** _boolean_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>,whether to page when there are too many legend items.

##### handler

<description>**optional** _ContinueLegendHandlerCfg_ </description>
Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, configuration items for slider _ContinueLegendHandlerCfg_ is configured as follows:

| Properties | Type     | Default | Description                                                                 |
| ---------- | -------- | ------- | --------------------------------------------------------------------------- |
| size       | _number_ | -       | Slider size                                                                 |
| style      | _object_ | -       | Slider configuration, reference [Graphic Style](/zh/docs/api/graphic-style) |

##### itemHeight

<description>**optional** _number_ _default:_ `null`</description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, lengend item height, default null。

##### itemWidth

<description>**optional** _number_ _default:_ `null`</description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, legend item width, default null, automatic calculation.

##### itemName

<description>**optional** _LegendItemNameCfg_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, configure the legend item name text. _LegendItemNameCfg_ is configured as follows：

| Properties | Type       | Default | Description                                                                      |
| ---------- | ---------- | ------- | -------------------------------------------------------------------------------- |
| style      | _object_   | -       | Text style configuration, referecnce [Graphic Style](/zh/docs/api/graphic-style) |
| spacing    | _number_   | `false` | The spacing between legend item marker and the following name                    |
| formatter  | _function_ | -       | Format function, `(text: string, item: ListItem, index: number) => any;`         |

##### itemSpacing

<description>**optional** _number_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, control the horizontal spacing of legend items.

##### itemValue

<description>**optional** _LegendItemValueCfg_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, configuration item of legend item Value added value. _LegendItemValueCfg_ Configuration is as follows:

| Properties | Type       | Default | Description                                                                          |
| ---------- | ---------- | ------- | ------------------------------------------------------------------------------------ |
| style      | _object_   | -       | Text style configuration item, reference [Graphic Style](/zh/docs/api/graphic-style) |
| alignRight | _boolean_  | `false` | Right-align, false by default, only when setting legend item width.                  |
| formatter  | _function_ | -       | Format function, `(text: string, item: ListItem, index: number) => any;`             |

##### animate

<description>**optional** _boolean_ </description>

Whether to turn on the animation switch.

##### animateOption

<description>**optional** _ComponentAnimateOption_ </description>

Animation parameter configuration, which takes effect if and only if the animate property is true, that is, when the animation is turned on. Animation configuration details are as follows:

`markdown:docs/common/animate-option.en.md`

##### label

<description>**optional** _ContinueLegendLabelCfg_ </description>

Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, a configuration item for the text, _ContinueLegendLabelCfg_ Configuration is as follows:

| Properties | Type     | Default | Description                                                                                                                                                                                                                                      |
| ---------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| align      | _string_ | -       | The alignment of text with the slider <br/> - rail : Align with the slide rail, at both ends of the slide rail <br/> - top, bottom: Legends are valid when laid out horizontally <br/> - left, right: Legends are valid when laid out vertically |
| style      | _object_ | -       | Text style configuration item, reference [Graphic Style](/zh/docs/api/graphic-style)                                                                                                                                                             |
| spacing    | _number_ | -       | The distance between the text and the slide                                                                                                                                                                                                      |

##### marker

<description>**optional** _MarkerCfg_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, the configuration of the Marker icon of the legend item.

`markdown:docs/common/marker.en.md`

##### min

<description>**optional** _number_ </description>

Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, select the minimum value of the range.

##### max

<description>**optional** _number_ </description>

Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, select the maximum value of the range.

##### maxWidth

<description>**optional** _number_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, the maximum width of the legend item.

##### maxHeight

<description>**optional** _number_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, the maximum height of the legend item.

##### offsetX

<description>**optional** _number_ </description>

Legends offset in the x direction.

##### offsetY

<description>**optional** _number_ </description>

Legends offset in the y direction.

##### rail

<description>**optional** _ContinueLegendRailCfg_ </description>
Apply to <tag color="green" text="Classification legend">Classification legend</tag>, a style configuration item for the legend slider (background)._ContinueLegendRailCfg_ Configuration is as follows:

| Properties    | Type     | Default | Description                                                                                                                                |
| ------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| type          | _string_ | -       | rail type: color and size                                                                                                                  |
| size          | _number_ | -       | The width of the slide rail                                                                                                                |
| defaultLength | _number_ | -       | The default length of the slider. When maxWidth,maxHeight is limited, this property is not used and the length is automatically calculated |
| style         | _object_ | -       | Slide rail style, refer to [Graphic Style](/zh/docs/api/graphic-style)                                                                     |

##### reversed

<description>**optional** _boolean_ </description>
Apply to <tag color="green" text="Classification legend">Classification legend</tag>, whether to display legend items in reverse order.

##### slidable

<description>**optional** _boolean_ </description>
Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, whether the slider can slide.

##### title

<description>**optional** _G2LegendTitleCfg_ </description>

Legend title configuration is not displayed by default. _G2LegendTitleCfg_ Configuration is as follows:

| Properties | Type     | Default | Description                                                                         |
| ---------- | -------- | ------- | ----------------------------------------------------------------------------------- |
| spacing    | _number_ | -       | The spacing between the title and the legend item                                   |
| style      | _object_ | -       | Text style configuration item, refer to [Graphic Style](/zh/docs/api/graphic-style) |

##### track

<description>**optional** _ContinueLegendTrackCfg_ </description>
Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, select the color block style configuration item for the range. _ContinueLegendTrackCfg_ Configuration is as follows:

| Properties | Type     | Default | Description                                                                     |
| ---------- | -------- | ------- | ------------------------------------------------------------------------------- |
| style      | _object_ | -       | Selected range of styles, reference [Graphic Style](/zh/docs/api/graphic-style) |

##### values

<description>**optional** _number[]_ </description>
Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, selected value.

##### custom

<description>**optional** _boolean_ </description>

If it is a custom legend, the items property needs to be declared when this property is true.

##### items

<description>**optional** _LegendItem[]_ </description>
Apply to <tag color="green" text="Classification legend">Classification legend</tag>, the user configures the content of the legend item. _LegendItem_ Configuration is as follows:

| Properties | Type        | Required | Description                          |
| ---------- | ----------- | -------- | ------------------------------------ |
| id         | _string_    |          | Unique value for animation or lookup |
| name       | _string_    | required | name                                 |
| value      | any         | required | value                                |
| marker     | _MarkerCfg_ |          | marker                               |

`markdown:docs/common/marker.en.md`
