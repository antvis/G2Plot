---
title: 绘图属性
order: 11
---

G2Plot 使用 [G](https://github.com/antvis/g) 作为绘图引擎，一些图形的样式配置，如折线图的`lineStyle`，柱状图的`columnStyle`等，还有部分组件的样式配置，如`label.style`， `axis.line.style`等，都是直接透传 G 的绘图属性。

为了方便用户使用，在这里对 G2Plot 常用的绘图属性进行简单的介绍：

## 配置图形样式

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
| shadowBlur    | number          | 图形阴影的高斯模糊系数                                                                                       |
| shadowOffsetX | number          | 设置阴影距图形的水平距离                                                                                     |
| shadowOffsetY | number          | 设置阴影距图形的垂直距离                                                                                     |
| cursor        | string          | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                |

示例代码，使用全量图形样式配置 Column (基础柱状图) 的柱形图形样式 `ColumnStyle`：

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

效果：

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*PKH0QoRSb0QAAAAAAAAAAAAAARQnAQ" width="400">

## 配置线的样式

<embed src="@/docs/common/line-style.zh.md"></embed>

在折线图中，你可以直接使用 `linestyle` 来配置 line 几何图形的样式。示例:

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

效果：

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*X8fHTagDDOIAAAAAAAAAAABkARQnAQ" width="400">

## 配置文字样式

| 属性名        | 类型            | 介绍                                                                                                         |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------ | 
| fontSize      | number          | 文字大小                                                                                                     |
| fontFamily    | string          | 文字字体                                                                                                     |
| fontWeight    | number          | 字体粗细                                                                                                     |
| lineHeight    | number          | 文字的行高                                                                                                   |
| textAlign     | string          | 设置文本内容的当前对齐方式, 支持的属性：`center` \| `end` \| `left` \| `right` \| `start`，默认值为`start`   |
| textBaseline  | string          | 设置在绘制文本时使用的当前文本基线, 支持的属性:`top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`。默认值为`bottom` |
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

示例代码，以 Liquid （水波图) 的 statistic.style 配置为例：

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

效果：

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*gjR3Q6aIFSMAAAAAAAAAAABkARQnAQ" width ="300">

## 配置渐变色

提供线性渐变，环形渐变两种形式。

### 线性渐变

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/ieWkhtoHOijxweuNFWdz.png" width="600">

> 说明：`l`  表示使用线性渐变，绿色的字体为可变量，由用户自己填写。

```ts
// 使用渐变色描边，渐变角度为 0，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff';
```

示例代码(1)，通过 Area（面积图) 的 `areaStyle`，配置带渐变色的面积图。

```ts
areaStyle: {
  fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
}
```

效果：

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*f0EOS5Ay8noAAAAAAAAAAAAAARQnAQ" width="400">

示例代码（2)，通过 Bar (条形图) 的 `barStyle`, 配置带渐变色的条形图。

```ts
barStyle: {
  fill: 'l(0) 0:#3e5bdb 1:#dd3121',
}
```

效果：

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*MexsR7O4GPwAAAAAAAAAAAAAARQnAQ" width="400">

### 环形渐变

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/qnvmbtSBGxQlcuVOWkdu.png" width="600">

> 说明：`r`  表示使用放射状渐变，绿色的字体为可变量，由用户自己填写，开始圆的 x y r 值均为相对值，0 至 1 范围。

```ts
// example
// 使用渐变色填充，渐变起始圆的圆心坐标为被填充物体的包围盒中心点，半径为(包围盒对角线长度 / 2) 的 0.1 倍，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff';
```

## 纹理

用特定的纹理填充图形。纹理内容可以直接是图片或者  Data URLs。

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/NjtjUimlJtmvXljsETAJ.png" width="600">

> 说明：`p`  表示使用纹理，绿色的字体为可变量，由用户自己填写。

- `a`: 该模式在水平和垂直方向重复；<br />
- `x`: 该模式只在水平方向重复；<br />
- `y`: 该模式只在垂直方向重复；<br />
- `n`: 该模式只显示一次（不重复）。<br />

示例代码，以 Column（柱状图) 的 `columnStyle` 为例：

```ts
columnStyle: {
  fill: 'p(a)https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*58XjQY1tO7gAAAAAAAAAAABkARQnAQ',
}
```

效果：

<img alt="加载失败" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*CKQ7R4F8ClEAAAAAAAAAAAAAARQnAQ" width="400">
