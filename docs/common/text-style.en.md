<!--文本样式-->

| 属性名        | 类型            | 介绍                                                                                                         |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| fontSize      | number          | 文字大小                                                                                                     |
| fontFamily    | string          | 文字字体                                                                                                     |
| fontWeight    | number          | 字体粗细                                                                                                     |
| lineHeight    | number          | 文字的行高                                                                                                   |
| textAlign     | string          | 设置文本内容的当前对齐方式, 支持的属性：`center` \| `end` \| `left` \| `right` \| `start`，默认值为`start`   |
| fill          | string          | 文字的填充色                                                                                                 |
| fillOpacity   | number          | 文字的填充透明度                                                                                             |
| stroke        | string          | 文字的描边                                                                                                   |
| lineWidth     | number          | 文字描边的宽度                                                                                               |
| lineDash      | [number,number] | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 |
| lineOpacity   | number          | 描边透明度                                                                                                   |
| opacity       | number          | 文字的整体透明度                                                                                             |
| shadowColor   | string          | 文字阴影颜色                                                                                                 |
| shadowBlur    | number          | 文字阴影的高斯模糊系数                                                                                       |
| shadowOffsetX | number          | 设置阴影距文字的水平距离                                                                                     |
| shadowOffsetY | number          | 设置阴影距文字的垂直距离                                                                                     |
| cursor        | string          | 鼠标样式。同 css 的鼠标样式,默认 'default'。                                                                 |

示例代码，以 label.style 配置为例：

```ts
{
  label: {
    style:{
      fontSize: 80,
      fontWeight: 300,
      textAlign: 'center',
      textBaseline: 'middle',
      shadowColor: 'white',
      shadowBlur: 10,
    }
  }
}
```
