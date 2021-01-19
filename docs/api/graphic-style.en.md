---
title: Graphic Style
order: 11
---

G2Plot uses [G](https://github.com/antvis/g) as the drawing engine. Some graphic styles, such as the `lineStyle` of Line, the `columnStyle` of Column, and the style configuration of some components, such as `label.style`, `axis.line.style`, are all transmitted transparently through the drawing properties of G.

In order to make it convenient for users, the common drawing attributes of G2Plot are briefly introduced here:

## Configure graphic styles

| Properties    | Type            | Description                                                                                                                                                                                                 |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fill          | string          | The fill color of the shape                                                                                                                                                                                 |
| fillOpacity   | number          | The fill transparency of the shape                                                                                                                                                                          |
| stroke        | string          | Stroke of the shape                                                                                                                                                                                         |
| lineWidth     | number          | The width of the shape stroke                                                                                                                                                                               |
| lineDash      | [number,number] | For the dashed line configuration of the stroke, the first value is the length of each segment of the dashed line, and the second value is the distance between segments. LineDash sets [0,0] to no stroke. |
| lineOpacity   | number          | Stroke transparency                                                                                                                                                                                         |
| opacity       | number          | The overall transparency of the shape                                                                                                                                                                       |
| shadowColor   | string          | Shape shadow color                                                                                                                                                                                          |
| shadowBlur    | number          | The Gaussian blur factor of the shadow of the shape                                                                                                                                                         |
| shadowOffsetX | number          | Sets the horizontal distance between the shadow and the shape                                                                                                                                               |
| shadowOffsetY | number          | Sets the vertical distance of the shadow from the shape                                                                                                                                                     |
| cursor        | string          | Mouse style. With CSS mouse styles, default 'default'.                                                                                                                                                      |

Use the full graphic style `columnStyle` to configure the Column graphic style. Example:

```ts
  columnStyle: {
    fill: 'red',
    fillOpacity: 0.5,
    stroke: 'black',
    lineWidth: 1,
    lineDash: [4,5],
    strokeOpacity: 0.7,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    cursor: 'pointer'
  }
```

Result:

<img alt="Load failed" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*PKH0QoRSb0QAAAAAAAAAAAAAARQnAQ" width="400">

## Configure line styles

| Properties    | Type            | Description                                                                                                                                                                                |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| stroke        | string          | The color of the line                                                                                                                                                                      |
| lineWidth     | number          | Line width                                                                                                                                                                                 |
| lineDash      | [number,number] | With dotted line configuration, the first value is the length of each segment of the dotted line, and the second value is the distance between segments. LineDash sets [0,0] to no stroke. |
| opacity       | number          | Transparency                                                                                                                                                                               |
| shadowColor   | string          | Shadow color                                                                                                                                                                               |
| shadowBlur    | number          | Gaussian blur coefficient                                                                                                                                                                  |
| shadowOffsetX | number          | Sets the horizontal distance between the shadow and the shape                                                                                                                              |
| shadowOffsetY | number          | Sets the vertical distance of the shadow from the shape                                                                                                                                    |
| cursor        | string          | Mouse style. Mouse styles with CSS, default 'default'。                                                                                                                                    |

Use the full graphic style `lineStyle` to configure the Line graphic style. Example:

```ts
lineStyle: {
  stroke: 'black',
  lineWidth: 2,
  lineDash: [4,5],
  strokeOpacity: 0.7,
  shadowColor: 'black',
  shadowBlur: 10,
  shadowOffsetX: 5,
  shadowOffsetY: 5,
  cursor: 'pointer'
}
```

Result:

<img alt="Load failed" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*X8fHTagDDOIAAAAAAAAAAABkARQnAQ" width="400">

## Configure text styles

| Properties    | Type            | Description                                                                                                                                                                                                 |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fontSize      | number          | Font size                                                                                                                                                                                                   |
| fontFamily    | string          | Font family                                                                                                                                                                                                 |
| fontWeight    | number          | Font weight                                                                                                                                                                                                 |
| lineHeight    | number          | Line height                                                                                                                                                                                                 |
| textAlign     | string          | Sets the current alignment of text content. Supported property: 'center' \| `end` \| `left` \| `right` \| `start`，默认值为`start`                                                                          |
| textBaseline  | string          | Sets the current text baseline to be used when drawing text. Supported property: 'top' \| `middle` \| `bottom` \| `alphabetic` \| `hanging`。默认值为`bottom`                                               |
| fill          | string          | Fill color for text                                                                                                                                                                                         |
| fillOpacity   | number          | Fill transparency of text                                                                                                                                                                                   |
| stroke        | string          | Stroke of text                                                                                                                                                                                              |
| lineWidth     | number          | The width of the text stroke                                                                                                                                                                                |
| lineDash      | [number,number] | For the dashed line configuration of the stroke, the first value is the length of each segment of the dashed line, and the second value is the distance between segments. LineDash sets [0,0] to no stroke. |
| lineOpacity   | number          | Stroke transparency                                                                                                                                                                                         |
| opacity       | number          | Overall transparency of the text                                                                                                                                                                            |
| shadowColor   | string          | Text shadow color                                                                                                                                                                                           |
| shadowBlur    | number          | The Gaussian blur coefficient of the text shadow                                                                                                                                                            |
| shadowOffsetX | number          | Sets the horizontal distance between the shadow and the text                                                                                                                                                |
| shadowOffsetY | number          | Sets the vertical distance between the shadow and the text                                                                                                                                                  |
| cursor        | string          | Mouse style. Mouse styles with CSS, default 'default'。                                                                                                                                                     |

Take the `statistic.style` of Liquid for example:

```ts
statistic: {
  style:{
    fontSize: 80,
    fontWeight: 300,
    textAlign: 'center',
    textBaseline: 'middle',
    shadowColor: 'white',
    shadowBlur: 10,
  }
}
```

Result:

<img alt="Load failed" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*gjR3Q6aIFSMAAAAAAAAAAABkARQnAQ" width ="300">

## Gradient

G2Plot provides support for linear gradients and circular gradients by default.

### Linear gradient

<img alt="Load failed" src="https://gw.alipayobjects.com/zos/rmsportal/ieWkhtoHOijxweuNFWdz.png" width="600">

> Note: `l` indicates the use of linear gradient, the green font is variable, filled by the user, separated by a blank.

```ts
// Use gradient color stroke, gradient angle is 0, gradient starting point color #ffffff, midpoint gradient color #7ec2f3, ending gradient color #1890ff
stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff';
```

Example (1): Use `areaStyle` of Area to configure the Area with gradient color.

```ts
areaStyle: {
  fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
}
```

Result:

<img alt="Load failed" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*f0EOS5Ay8noAAAAAAAAAAAAAARQnAQ" width="400">

Example (2): Use `barStyle` of Bar to configure the Bar with gradient color.

```ts
barStyle: {
  fill: 'l(0) 0:#3e5bdb 1:#dd3121',
}
```

Result:

<img alt="Load failed" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*MexsR7O4GPwAAAAAAAAAAAAAARQnAQ" width="400">

### Circular gradient

<img alt="Load failed" src="https://gw.alipayobjects.com/zos/rmsportal/qnvmbtSBGxQlcuVOWkdu.png" width="600">

> Note: `r` indicates the use of a radial gradient, the green font is variable, which is filled in by the user. The xyr values ​​of the starting circle are all relative values, ranging from 0 to 1.

```ts
// example
// Use gradient color to fill, the center coordinate of the starting circle of the gradient is the center point of the bounding box of the filled object, the radius is 0.1 times (the diagonal length of the bounding box / 2), the color of the starting point of the gradient #ffffff , The gradient color at the midpoint is #7ec2f3, and the gradient color at the end is #1890ff
fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff';
```

## Texture

Fill the shape with a specific texture. Texture can be images or data URLs.

<img alt="Load failed" src="https://gw.alipayobjects.com/zos/rmsportal/NjtjUimlJtmvXljsETAJ.png" width="600">

> Note: `p` indicates the use of texture. The green font is variable, filled by the user.

- `a`: The pattern repeats horizontally and vertically;<br />
- `x`: This pattern is repeated only horizontally;<br />
- `y`: This pattern is repeated only vertically;<br />
- `n`: This pattern is only displayed once (not repeated).<br />

Take the `columnStyle` of Column for example:

```ts
columnStyle: {
  fill: 'p(a)https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*58XjQY1tO7gAAAAAAAAAAABkARQnAQ',
}
```

Result:

<img alt="Load failed" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*CKQ7R4F8ClEAAAAAAAAAAAAAARQnAQ" width="400">
