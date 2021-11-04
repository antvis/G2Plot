<!--label样式-->

| Properties | Type                                                         | Description                                                                                                                                                      |
| ---------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | --------- |
| type       | _string_                                                     | When a user uses a custom label type, need to declare the specific type, otherwise you will use the default label type rendering (pie chart label support `inner | outer | spiders`) |
| offset     | _number_                                                     | label offset                                                                                                                                                     |
| offsetX    | _number_                                                     | The offset distance of the label from the data point in the X direction                                                                                          |
| offsetY    | _number_                                                     | The offset distance of the label from the data point in the Y direction                                                                                          |
| content    | _string \| IGroup \| IShape \| GeometryLabelContentCallback_ | Text content that is displayed, if not declared, is displayed according to the value of the first field participating in the mapping                             |
| style      | _ShapeAttrs_                                                       | Label text graphic property style                                                                                                                                |
| autoRotate | _string_                                                     | Whether to rotate automatically, default true                                                                                                                    |
| rotate     | _number_                                                     | Text rotation Angle                                                                                                                                              |
| labelLine  | _null_ \| _boolean_ \| _LabelLineCfg_                               | Used to set the style property of the text connector. NULL indicates that it is not displayed.                                                                   |
| labelEmit  | _boolean_                                                    | Only applies to text in polar coordinates, indicating whether the text is radially displayed according to the Angle. True means on and false means off           |
| layout     | _'overlap' \| 'fixedOverlap' \| 'limitInShape'_              | Text layout type, support a variety of layout function combination.                                                                                              |
| position   | _'top' \| 'bottom' \| 'middle' \| 'left' \| 'right'_         | Specifies the position of the current Label relative to the current graphic   (💡 Attention: Only works for **column plot** and **bar plot**, which geometry is interval)                                                                                   |
| animate    | _boolean \| AnimateOption_                                   | Animation configuration.                                                                                                                                         |
| formatter  | _Function_                                                   | Format function                                                                                                                                                  |
| autoHide   | _boolean_                                                    | Whether to hide it automatically, default to false                                                                                                               |

Types of __*LabelLineCfg*__ are as follow: (Go [ShapeAttrs](/zh/docs/api/graphic-style) see more details about _ShapeAttrs_)

```plain
type LabelLineCfg = {
  style?: ShapeAttrs;
}
```

Example code:

```ts
{
  label: {
    style: {
      fill: 'red',
      opacity: 0.6,
      fontSize: 24
    },
    rotate: true
  }
}
```
