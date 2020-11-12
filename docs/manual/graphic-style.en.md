---
title: Graphic Style
order: 5
---

G2Plot uses [G](https://github.com/antvis/g) as the drawing engine. Some graphic styles, such as the `lineStyle` of Line, the `columnStyle` of Column, and the style configuration of some components, such as `label.style`, `axis.line.style`, are all transmitted transparently through the drawing properties of G.

In order to make it convenient for users, the common drawing attributes of G2Plot are briefly introduced here:

## Configure graphic styles

| Attributes        | Type            | Description                                                                                                         |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| fill          | string          | 图形的填充色                                                                                                 |
| fillOpacity   | number          | 图形的填充透明度                                                                                             |
| stroke        | string          | 图形的描边                                                                                                   |
| lineWidth     | number          | 图形描边的宽度                                                                                               |
| lineDash      | [number,number] | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 |
| lineOpacity   | number          | 描边透明度                                                                                                   |
| opacity       | number          | 图形的整体透明度                                                                                             |
| shadowColor   | string          | 图形阴影颜色                                                                                                 |
| shadowBlur    | number          | 图形阴影的高斯模糊系数                                                                                       |
| shadowOffsetX | number          | 设置阴影距图形的水平距离                                                                                     |
| shadowOffsetY | number          | 设置阴影距图形的垂直距离                                                                                     |
| cursor        | string          | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                |

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

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*PKH0QoRSb0QAAAAAAAAAAAAAARQnAQ" width="400">

## Configure line styles

| Attributes        | Type            | Description                                                                                                   |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| stroke        | string          | 线的颜色                                                                                               |
| lineWidth     | number          | 线宽                                                                                                   |
| lineDash      | [number,number] | 虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 |
| opacity       | number          | 透明度                                                                                                 |
| shadowColor   | string          | 阴影颜色                                                                                               |
| shadowBlur    | number          | 高斯模糊系数                                                                                           |
| shadowOffsetX | number          | 设置阴影距图形的水平距离                                                                               |
| shadowOffsetY | number          | 设置阴影距图形的垂直距离                                                                               |
| cursor        | string          | 鼠标样式。同 css 的鼠标样式,默认 'default'。                                                           |

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

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*X8fHTagDDOIAAAAAAAAAAABkARQnAQ" width="400">

## Configure text styles

| Attributes        | Type            | Description                                                                                                         |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| fontSize      | number          | 文字大小                                                                                                     |
| fontFamily    | string          | 文字字体                                                                                                     |
| fontWeight    | number          | 字体粗细                                                                                                     |
| lineHeight    | number          | 文字的行高                                                                                                   |
| textAlign     | string          | 设置文本内容的当前对齐方式, 支持的属性：`center`                                                             | `end` | `left` | `right` | `start`，默认值为`start` |
| textBaseline  | string          | 设置在绘制文本时使用的当前文本基线, 支持的属性:`top`                                                         | `middle` | `bottom` | `alphabetic` | `hanging`。默认值为`bottom` |
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

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*gjR3Q6aIFSMAAAAAAAAAAABkARQnAQ" width ="300">

## Gradient

G2Plot provides support for linear gradients and circular gradients by default.

### Linear gradient

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/ieWkhtoHOijxweuNFWdz.png" width="600">

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

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*f0EOS5Ay8noAAAAAAAAAAAAAARQnAQ" width="400">

Example (2): Use `barStyle` of Bar to configure the Bar with gradient color.

```ts
barStyle: {
  fill: 'l(0) 0:#3e5bdb 1:#dd3121',
}
```

Result:

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*MexsR7O4GPwAAAAAAAAAAAAAARQnAQ" width="400">

### Circular gradient

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/qnvmbtSBGxQlcuVOWkdu.png" width="600">

> Note: `r` indicates the use of a radial gradient, the green font is variable, which is filled in by the user. The xyr values ​​of the starting circle are all relative values, ranging from 0 to 1.

```ts
// example
// Use gradient color to fill, the center coordinate of the starting circle of the gradient is the center point of the bounding box of the filled object, the radius is 0.1 times (the diagonal length of the bounding box / 2), the color of the starting point of the gradient #ffffff , The gradient color at the midpoint is #7ec2f3, and the gradient color at the end is #1890ff
fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff';
```

## Texture

Fill the shape with a specific texture. Texture can be images or data URLs.

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/NjtjUimlJtmvXljsETAJ.png" width="600">

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

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*CKQ7R4F8ClEAAAAAAAAAAAAAARQnAQ" width="400">
