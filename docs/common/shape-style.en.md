<!--图形样式-->

| 属性名        | 类型            | 介绍                                                                                                         |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| fill          | string          | 图形的填充色                                                                                                 |
| fillOpacity   | number          | 图形的填充透明度                                                                                             |
| stroke        | string          | 图形的描边                                                                                                   |
| lineWidth     | number          | 图形描边的宽度                                                                                               |
| lineDash      | [number,number] | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 |
| lineOpacity   | number          | 描边透明度                                                                                                   |
| opacity       | number          | 图形的整体透明度                                                                                             |
| shadowColor   | string          | 图形阴影颜色                                                                                                 |
| strokeOpacity | number          | 图形边框透明度                                                                                               |
| shadowBlur    | number          | 图形阴影的高斯模糊系数                                                                                       |
| shadowOffsetX | number          | 设置阴影距图形的水平距离                                                                                     |
| shadowOffsetY | number          | 设置阴影距图形的垂直距离                                                                                     |
| cursor        | string          | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                |

示例代码：

```ts
{
  pointStyle: {
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
