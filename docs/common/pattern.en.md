Set the pattern style of the geometries.
- PatternOption: consists of `type` and `cfg`, `type` includes: `dot`, `line`, `square`, `cfg` is optional.
- Features: pattern will override the `style` of geometry (such as pieStyle, columnStyle, etc.).
- Usage: You can set a uniform pattern style for all geometries of the chart by using configuration (`PatternOption`) or `CanvasPattern` object, and a `callback` is provided to set the pattern for each geometry.
In addition, we provide `getCanvasPattern` function, pass in the PatternOption to create the pattern to modify the Legend, Tooltip Marker styles[Demo](/zh/examples/plugin/pattern#legend-marker-with-pattern)

The type of pattern is defined as follows:
```plain
PatternAttr =
  | CanvasPattern
  | PatternOption
  | ((datum: Datum, color: string /** inherit color */) => PatternOption | CanvasPattern);
```

Usage:
```ts
// set a uniform pattern style for all geometries
{
   pattern: {
    type: 'dot',
    cfg: {
      size: 4,
      padding: 4,
      rotation: 0,
      fill: '#FFF',
      isStagger: true,
    },
  },
}
// set the pattern for each geometry
{
  pattern: ({type}, color) =>{
    if(type ==='分类一') {
      return { 
        type: 'dot',
        cfg: {
          backgroundColor: color, // inherit color
        }
      }
    } else if(type ==='分类二') {
      return {
         type: 'square',
         cfg: {
           backgroundColor: 'pink', // custom color
         }
       }
    } else if(type ==='分类三') {
      return { 
        type: 'line' 
      }
    }
  },
}
```
<!--Configuration items for each pattern-->

Common configuration(cfg) for all types of pattern:

| Attribute        | Type            | Description            |
| ------------- | --------------- | ---------------- |
| backgroundColor   | _string_         | Background color of the pattern |
| fill     | _string_         |  Fill color of the symbol in pattern  |
| fillOpacity   |   _number_ | Transparency of the symbol in pattern  |
| stroke   | _string_         | Stroke color of the symbol in pattern |
| strokeOpacity       | _number_         | Stroke opacity of the symbol in pattern  |
| lineWidth   | _number_         | The thickness of the symbol's stroke       |
| opacity | _number_         | Overall transparency of the pattern              |
| rotation    | _number_         | Rotation angle of the pattern   |

Additional configuration for dotPattern

| Attribute        | Type             | Description            |
| ------------- | --------------- | ---------------- |
| size          | _number_         | The size of the dot, default: `4`  |
| padding          | _number_         | The distance between dots, default: `2` |
| isStagger        | _boolean_         | Staggered dots. default: `true`    |

Additional configuration for linePattern

| Attribute        | Type             | Description           |
| ------------- | --------------- | ---------------- |
| spacing          | _number_         | The distance between the two lines, default: `4`  |

Additional configuration for squarePattern

| Attribute        | Type             | Description           |
| ------------- | --------------- | ---------------- |
| size          | _number_         | The size of the square, default: `5`  |
| padding          | _number_         | The distance between squares, default:`0` |
| isStagger        | _boolean_         | Staggered squares. default:`true`    |