<!--文本样式-->

| Properties    | Type            | Description                                                                                                                                                                                                 |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fontSize      | _number_        | Font size                                                                                                                                                                                                   |
| fontFamily    | _string_        | Font family                                                                                                                                                                                                 |
| fontWeight    | _number_        | Font weight                                                                                                                                                                                                 |
| lineHeight    | _number_        | Line height                                                                                                                                                                                                 |
| textAlign     | _string_        | Text align, supported `center` \| `end` \| `left` \| `right` \| `start`, default `start`                                                                                                                    |
| fill          | _string_        | Fill color for text                                                                                                                                                                                         |
| fillOpacity   | _number_        | Fill transparency for text                                                                                                                                                                                  |
| stroke        | _string_        | Stroke text                                                                                                                                                                                                 |
| lineWidth     | _number_        | The width of the text stroke                                                                                                                                                                                |
| lineDash      | [number,number] | For the dashed line configuration of the stroke, the first value is the length of each segment of the dashed line, and the second value is the distance between segments. LineDash sets [0,0] to no stroke. |
| lineOpacity   | _number_        | Stroke transparency                                                                                                                                                                                         |
| opacity       | _number_        | Overall transparency of the text                                                                                                                                                                            |
| shadowColor   | _string_        | Shadow color                                                                                                                                                                                                |
| shadowBlur    | _number_        | Shadow blur                                                                                                                                                                                                 |
| shadowOffsetX | _number_        | Sets the horizontal distance between the shadow and the text                                                                                                                                                |
| shadowOffsetY | _number_        | Sets the vertical distance between the shadow and the text                                                                                                                                                  |
| cursor        | _string_        | Mouse style. With CSS mouse styles, default 'default'.                                                                                                                                                      |

Example code, using label.style configuration:

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
