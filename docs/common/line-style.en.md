<!--line style-->

| Attr        | Type            | Description                                                                                                   |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| stroke        | _string_          | color of the line                                                                                               |
| lineWidth     | _number_          | width of the line                                                                                                   |
| lineDash      | [number,number] | configure dashed line, the first parameter is the length of each segment, the second parameter is the gap between segment. When lineDash is set to [0,0], there is no effect. |
| opacity       | _number_          | opacity                                                                                                 |
| shadowColor   | _string_          | shadow color                                                                                               |
| shadowBlur    | _number_          | Gaussian blur coefficient                                                                                           |
| shadowOffsetX | _number_          | configure horizontal distance between shadow and line                                                                               |
| shadowOffsetY | _number_          | configure vertical distance between shadow and line                                                                               |
| cursor        | _string_          | mouse style, same as the mouse style of CSS, default value : 'default'                                                           |

Example：

```ts
{
  xAxis: {
    grid: {
      line: {
        style: {
          stroke: 'black',
          lineWidth: 2,
          lineDash: [4, 5],
          strokeOpacity: 0.7,
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
          cursor: 'pointer'
        }
      }
    }
  }
}
```
