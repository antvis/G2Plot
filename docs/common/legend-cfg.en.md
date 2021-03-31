##### layout

<description>**optional** _horizontal | vertical_ </description>

Layout of legend.

##### title

<description>**optional** _G2LegendTitleCfg_ </description>

Legend title configuration is not displayed by default. _G2LegendTitleCfg_ Configuration is as follows:

| Properties | Type     | Default | Description                                                                         |
| ---------- | -------- | ------- | ----------------------------------------------------------------------------------- |
| title   | _string_ | Content of legend title                                            |
| spacing    | _number_ | -       | The spacing between the title and the legend item                                   |
| style      | _object_ | -       | Text style configuration item, refer to [Graphic Style](/zh/docs/api/graphic-style) |

##### position

<description>**optional** _string_ </description>

The position of legend is optional:'top', 'top-left', 'top-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-left', 'bottom-right'。

<playground path="component/legend/demo/legend-position.jsx" rid="legend-position"></playground>

##### offsetX

<description>**optional** _number_ </description>

Legends offset in the x direction.

##### offsetY

<description>**optional** _number_ </description>

Legends offset in the y direction.

##### background

<description>**optional** _LegendBackgroundCfg_ </description>

Background box configuration item. _LegendBackgroundCFG_ is configured as follows:

| Properties | Type               | Description                                             |
| ---------- | ------------------  | ------------------------------------------------------- |
| padding    | _number \| number[]_ | White space in the background                           |
| style      | _ShapeAttr_     | Background style configuration, Reference [Graphic Style](/en/docs/api/graphic-style) |

##### flipPage

<description>**optional** _boolean_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>,whether to page when there are too many legend items. (⚠️ 暂不支持多行展示分页)

##### pageNavigator

<description>**optional** _object_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, configure the style of page navigator, it works when legend is in flipPage. Types of _LegendPageNavigatorCfg_ are as follow:

| Properties | Type     | Description          |
| ------ | --------------------- | -------------- |
| marker.style | _PageNavigatorMarkerStyle_ | 分页器指示箭头配置项    |
| text.style   | _PageNavigatorTextStyle_   | The text style of page info.    |

Types of **_PageNavigatorMarkerStyle_** are as follow:

| Properties | Type     | Default | Description          |
| ------ | --------------------- | ------ | -------------- |
| inactiveFill | _string_ | -      | Fill color of arrow marker when unclickable (inactive status). |
| inactiveOpacity   | _number_   | -      | Fill opacity of arrow marker when unclickable (inactive status). |
| fill | _string_ | -      | Default fill color of arrow marker (active status). |
| opacity   | _number_   | -      | Default fill opacity of arrow marker (active status). |
| size   | _number_   | -      | Size of arrow marker. |

Types of **_PageNavigatorTextStyle_** are as follow:

| Properties | Type     | Default | Description          |
| ------ | --------------------- | ------ | -------------- |
| fill | _string_ | -      | Font color of page navigator info. |
| fontSize   | _number_   | -      |  Font size of page navigator info. |

Example：

```ts
pageNavigator: {
  marker: {
    style: {
      // 非激活，不可点击态时的填充色设置
      inactiveFill: '#000',
      inactiveOpacity: 0.45,
      // 默认填充色设置
      fill: '#000',
      opacity: 0.8,
      size: 12,
    },
  },
  text: {
    style: {
      fill: '#ccc',
      fontSize: 8,
    },
  },
},
```

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

##### itemValue

<description>**optional** _LegendItemValueCfg_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, configuration item of legend item Value added value. _LegendItemValueCfg_ Configuration is as follows:

| Properties | Type       | Default | Description                                                                          |
| ---------- | ---------- | ------- | ------------------------------------------------------------------------------------ |
| style      | _object_   | -       | Text style configuration item, reference [Graphic Style](/zh/docs/api/graphic-style) |
| alignRight | _boolean_  | `false` | Right-align, false by default, only when setting legend item width.                  |
| formatter  | _function_ | -       | Format function, `(text: string, item: ListItem, index: number) => any;`             |

<playground path="component/legend/demo/legend-item-value.ts" rid="legend-item-value"></playground>

##### itemSpacing

<description>**optional** _number_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, control the horizontal spacing of legend items.

##### marker

<description>**optional** _MarkerCfg_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, the configuration of the Marker icon of the legend item.

`markdown:docs/common/marker.en.md`

##### maxWidth

<description>**optional** _number_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, the maximum width of the legend item. 当 layout 等于 'horizontal' 时，生效，当图例项横向排布，超过最大宽度时，会结合 `flipPage: true` 进行分页。

##### maxHeight

<description>**optional** _number_ </description>

Apply to <tag color="green" text="Classification legend">Classification legend</tag>, the maximum height of the legend item. 当 layout 等于 'vertical' 时，生效，当图例项纵向排布，超过最大高度时，会结合 `flipPage: true` 进行分页。

##### reversed

<description>**optional** _boolean_ </description>
Apply to <tag color="green" text="Classification legend">Classification legend</tag>, whether to display legend items in reverse order.

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

##### min

<description>**optional** _number_ </description>

Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, select the minimum value of the range.

##### max

<description>**optional** _number_ </description>

Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, select the maximum value of the range.

##### value

<description>**optional** _number[]_ </description>

Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, 当前选中的范围.

##### slidable

<description>**optional** _boolean_ _default:_ `true`</description>
Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, whether the slider can slide.

##### rail

<description>**optional** _ContinueLegendRailCfg_ </description>
Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, a style configuration item for the legend slider (background)._ContinueLegendRailCfg_ Configuration is as follows:

| Properties    | Type     | Default | Description                                                                                                                                |
| ------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| type          | _string_ | -       | rail type: color and size, default: 'color'                                                                                                     |
| size          | _number_ | -       | The width of the slide rail                                                                                                                |
| defaultLength | _number_ | -       | The default length of the slider, default: 100. When maxWidth,maxHeight is limited, this property is not used and the length is automatically calculated |
| style         | _object_ | -       | Slide rail style, refer to [Graphic Style](/zh/docs/api/graphic-style)                                                                     |


|**rail.type='color'**| **rail.type='size** |
|---|---|
|![](https://gw.alipayobjects.com/zos/antfincdn/jwMUDJ63aN/72957823-0148-4b24-bbf4-c756959467d3.png)|![](https://gw.alipayobjects.com/zos/antfincdn/t%26LwpJHUA6/52de13d5-b232-4efb-aacf-6d673778d92a.png)|

##### label

<description>**optional** _ContinueLegendLabelCfg_ </description>

Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, a configuration item for the text, _ContinueLegendLabelCfg_ Configuration is as follows:

| Properties | Type     | Default | Description                                                                                                                                                                                                                                      |
| ---------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| align      | _string_ | -       | The alignment of text with the slider <br/> - rail : Align with the slide rail, at both ends of the slide rail <br/> - top, bottom: Legends are valid when laid out horizontally <br/> - left, right: Legends are valid when laid out vertically |
| style      | _object_ | -       | Text style configuration item, reference [Graphic Style](/zh/docs/api/graphic-style)                                                                                                                                                             |
| spacing    | _number_ | -       | The distance between the text and the slide                                                                                                                                                                                                      |

##### track

<description>**optional** _ContinueLegendTrackCfg_ </description>
Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, select the color block style configuration item for the range. _ContinueLegendTrackCfg_ Configuration is as follows:

| Properties | Type     | Default | Description                                                                     |
| ---------- | -------- | ------- | ------------------------------------------------------------------------------- |
| style      | _object_ | -       | Selected range of styles, reference [Graphic Style](/zh/docs/api/graphic-style) |

##### handler

<description>**optional** _ContinueLegendHandlerCfg_ </description>
Apply to <tag color="cyan" text="Continuous legend">Continuous legend</tag>, configuration items for slider. (暂不支持自定义)

_ContinueLegendHandlerCfg_ is configured as follows:

| Properties | Type     | Default | Description                                                                 |
| ---------- | -------- | ------- | --------------------------------------------------------------------------- |
| size       | _number_ | -       | Slider size, default: 10                                                             |
| style      | _object_ | -       | Slider configuration, reference [Graphic Style](/zh/docs/api/graphic-style) |

##### animate

<description>**optional** _boolean_  _default:_ `false`</description>

Whether to turn on the animation switch.

##### animateOption

<description>**optional** _ComponentAnimateOption_ </description>

Animation parameter configuration, which takes effect if and only if the animate property is true, that is, when the animation is turned on. Animation configuration details are as follows:

`markdown:docs/common/animate-option.en.md`
