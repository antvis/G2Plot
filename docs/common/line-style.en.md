<!--line style-->

| Attr        | Type            | Description                                                                                                   |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| stroke        | string          | color of the line                                                                                               |
| lineWidth     | number          | width of the line                                                                                                   |
| lineDash      | [number,number] | configure dashed line, the first parameter is the length of each segment, the second parameter is the gap between segment. When lineDash is set to [0,0], there is no effect. |
| opacity       | number          | opacity                                                                                                 |
| shadowColor   | string          | shadow color                                                                                               |
| shadowBlur    | number          | Gaussian blur coefficient                                                                                           |
| shadowOffsetX | number          | configure horizontal distance between shadow and line                                                                               |
| shadowOffsetY | number          | configure vertical distance between shadow and line                                                                               |
| cursor        | string          | mouse style, same as the mouse style of CSS, default value : 'default'                                                           |

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
