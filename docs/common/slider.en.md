> Only line plot, area plot and dual-axes plot are supported.

| Properties      | Type           | Description                             |
| --------------- | -------------- | --------------------------------------- |
| start           | _number_       | Default starting position               |
| end             | _number_       | Default ending position                 |
| height          | _number_       | Slider height                           |
| trendCfg        | _TrendCfg_     | Configuration of background trends      |
| backgroundStyle | _object_       | Background style, reference[Graphic Style](/en/docs/api/graphic-style)                        |
| foregroundStyle | _object_       | Foreground style, reference[Graphic Style](/en/docs/api/graphic-style)                        |
| handlerStyle    | _HandlerStyle_ | Handler configuration                   |
| textStyle       | _object_       | Text style, reference[Graphic Style](/en/docs/api/graphic-style)                              |
| minLimit        | _number_       | Lower limit of sliding position allowed |
| maxLimit        | _number_       | Upper limit of sliding position allowed |
| formatter       | _Function_     | Slider text formatting function         |

Types of __*TrendCfg*__  are as follow:

| Properties      | Type       | Description                    |
| --------------- | ---------- | ------------------------------ |
| data            | _number[]_ | Trend data                     |
| smooth          | _boolean_  | Whether smooth                 |
| isArea          | _boolean_  | Whether area                   |
| backgroundStyle | _object_   | Background style configuration, reference[Graphic Style](/en/docs/api/graphic-style) |
| lineStyle       | _object_   | Line style configuration, reference[Graphic Style](/en/docs/api/graphic-style)       |
| areaStyle       | _object_   | Area style configuration, reference[Graphic Style](/en/docs/api/graphic-style)       |

Types of __*HandlerStyle*__ are as follow:

| Properties | Type     | Description              |
| ---------- | -------- | ------------------------ |
| width      | _number_ | Width of slider handler  |
| height     | _number_ | Height of slider handler |
| fill          | _string_ | Fill color of handler                           |
| highLightFill | _string_ | Highlight fill color of handler (when hovering) |
| stroke        | _string_ | Stroke color of handler                         |
| opacity       | _number_ | Fill opacity of handler                         |
| radius        | _number_ | Radius of handler rect                          |
| cursor        | _string_ | Style of cursor (when hovering handler)         |
