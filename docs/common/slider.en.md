Object type refer to [ShapeAttrs](/en/docs/ API /graphic-style)

| Properties      | Type       | Description                             |
| --------------- | ---------- | --------------------------------------- |
| start           | _number_   | Default starting position               |
| end             | _number_   | Default ending position                 |
| height          | _number_   | Slider height                           |
| trendCfg        | _trendCfg_ | Configuration of background trends      |
| backgroundStyle | _object_   | Background style                        |
| foregroundStyle | _object_   | Foreground style                        |
| handlerStyle    | _object_   | Handle configuration                    |
| textStyle       | _object_   | Text style                              |
| minLimit        | _number_   | Lower limit of sliding position allowed |
| maxLimit        | _number_   | Upper limit of sliding position allowed |
| formatter       | _Function_ | Slider text formatting function         |

trendCfg

| Properties      | Type       | Description                    |
| --------------- | ---------- | ------------------------------ |
| data            | _number[]_ | Trend data                     |
| smooth          | _boolean_  | Whether smooth                 |
| isArea          | _boolean_  | Whether area                   |
| backgroundStyle | _object_   | Background style configuration |
| lineStyle       | _object_   | Line style configuration       |
| areaStyle       | _object_   | Area style configuration       |
