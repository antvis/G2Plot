<!--文本样式-->

| 属性名        | 类型            | 介绍                                                                                                         |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| fontSize      | _number_          | 文字大小                                                                                                     |
| fontFamily    | _string_          | 文字字体                                                                                                     |
| fontWeight    | _number_          | 字体粗细                                                                                                     |
| lineHeight    | _number_          | 文字的行高                                                                                                   |
| textAlign     | _string_          | 设置文本内容的当前对齐方式, 支持的属性：`center` \| `end` \| `left` \| `right` \| `start`，默认值为`start`   |
| fill          | _string_          | 文字的填充色                                                                                                 |
| fillOpacity   | _number_          | 文字的填充透明度                                                                                             |
| stroke        | _string_          | 文字的描边                                                                                                   |
| lineWidth     | _number_          | 文字描边的宽度                                                                                               |
| lineDash      | [number,number] | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 |
| lineOpacity   | _number_          | 描边透明度                                                                                                   |
| opacity       | _number_          | 文字的整体透明度                                                                                             |
| shadowColor   | _string_          | 文字阴影颜色                                                                                                 |
| shadowBlur    | _number_          | 文字阴影的高斯模糊系数                                                                                       |
| shadowOffsetX | _number_          | 设置阴影距文字的水平距离                                                                                     |
| shadowOffsetY | _number_          | 设置阴影距文字的垂直距离                                                                                     |
| cursor        | _string_          | 鼠标样式。同 css 的鼠标样式,默认 'default'。                                                                 |

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
