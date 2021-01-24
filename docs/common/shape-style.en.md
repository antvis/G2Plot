<!--shape style-->

| Properties    | Type            | Description                                                                                                                                                                              |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fill          | _string_        | Fill color of the shape                                                                                                                                                                  |
| r          | _number_         | used in `point`, means the radius of geometry |
| fillOpacity   | _number_        | Fill opacity of the shape                                                                                                                                                                |
| stroke        | _string_        | Stroke color of the shape                                                                                                                                                                |
| lineWidth     | _number_        | The width of the stroke of the shape                                                                                                                                                     |
| lineDash      | [number,number] | Configure dashed line stroke. The first parameter is the length of each segment, and the second parameter is the gap between segment. When lineDash is set to [0,0], there is no effect. |
| lineOpacity   | _number_        | Opacity of the stroke                                                                                                                                                                    |
| opacity       | _number_        | Opacity of the shape                                                                                                                                                                     |
| shadowColor   | _string_        | Shadow color of the shape                                                                                                                                                                |
| strokeOpacity | _number_        | Stroke opacity of the shape                                                                                                                                                              |
| shadowBlur    | _number_        | Gaussian blur coefficient of the shadow                                                                                                                                                  |
| shadowOffsetX | _number_        | Configure horizontal distance between shadow and shape                                                                                                                                   |
| shadowOffsetY | _number_        | Configure vertical distance between shadow and shape                                                                                                                                     |
| cursor        | _string_        | Mouse style, same as the mouse style of CSS, default value : 'default'                                                                                                                   |

Example：

```ts
{
  style: {
    fill: 'red',
    fillOpacity: 0.5,
    stroke: 'black',
    lineWidth: 1,
    lineDash: [4, 5],
    strokeOpacity: 0.7,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    cursor: 'pointer'
  }
}
```

More documents about `ShapeStyle`, see [Graphic Style](/en/docs/api/graphic-style).
