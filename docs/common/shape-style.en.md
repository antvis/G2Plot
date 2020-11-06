<!--shape style-->

| Attr        | Type            | Description                                                                                                         |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| fill          | string          | Fill color of the shape                                                                                                 |
| fillOpacity   | number          | Fill opacity of the shape                                                                                             |
| stroke        | string          | Stroke color of the shape                                                                                                   |
| lineWidth     | number          | The width of the stroke of the shape                                                                                               |
| lineDash      | [number,number] | Configure dashed line stroke. The first parameter is the length of each segment, and the second parameter is the gap between segment. When lineDash is set to [0,0], there is no effect. |
| lineOpacity   | number          | Opacity of the stroke                                                                                                   |
| opacity       | number          | Opacity of the shape                                                                                             |
| shadowColor   | string          | Shadow color of the shape                                                                                                 |
| strokeOpacity | number          | Stroke opacity of the shape                                                                                               |
| shadowBlur    | number          | Gaussian blur coefficient of the shadow                                                                                       |
| shadowOffsetX | number          | Configure horizontal distance between shadow and shape                                                                                     |
| shadowOffsetY | number          | Configure vertical distance between shadow and shape                                                                                     |
| cursor        | string          | Mouse style, same as the mouse style of CSS, default value : 'default'                                                                |

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

More documents about `ShapeStyle`, see [Graphic Style](../graphic-style).