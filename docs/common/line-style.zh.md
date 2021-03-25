<!--线条样式-->

> **注意:** 线条样式的完整配置是 `{ style: { stroke: '#ddd', ... } }`, 如果配置线条样式不生效的时候，请检查一下。

| 属性名        | 类型              | 介绍                                                                                                   |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------------ |
| stroke        | _string_          | 线的颜色                                                                                               |
| lineWidth     | _number_          | 线宽                                                                                                   |
| lineDash      | _[number,number]_ | 虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 |
| opacity       | _number_          | 透明度                                                                                                 |
| shadowColor   | _string_          | 阴影颜色                                                                                               |
| shadowBlur    | _number_          | 高斯模糊系数                                                                                           |
| shadowOffsetX | _number_          | 设置阴影距图形的水平距离                                                                               |
| shadowOffsetY | _number_          | 设置阴影距图形的垂直距离                                                                               |
| cursor        | _string_          | 鼠标样式。同 css 的鼠标样式,默认 'default'。                                                           |

示例（设置 x 轴的 grid 网格线条样式）：

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
