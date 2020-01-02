---
title: Heatmap - 热力图
order: 5
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*1w6eSIFLQSkAAAAAAAAAAABkARQnAQ" width="400">

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### title

**optional** 见[通用图表配置](../general-config#title)。

### description

**optional** 见[通用图表配置](../general-config#description)。

### width

**optional** 见[通用图表配置](../general-config#width)。

### height

**optional** 见[通用图表配置](../general-config#height)。

### forceFit

**optional** 见[通用图表配置](../general-config#forceFit)。

### padding

**optional** 见[通用图表配置](../general-config#padding)。

### theme

**optional** 见[通用图表配置](../general-config#theme)。

### data

**required**

数据源为对象集合，例如：`[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]`。

### xField

**required**, string 类型

heatmap 数据点在 x 方向位置映射对应的数据字段名，一般对应一个连续字段。

### yField

**required**, string 类型

heatmap 数据点在 y 方向位置映射所对应的数据字段名，一般对应一个连续字段。

### colorField

**required**, string 类型

heatmap 颜色映射对应的数据字段名，要求必须为**连续字段**。

### color

**optional**, string[]

指定散点图渲染的色带颜色，数值中的值为色带节点的色值。如不进行配置则采用 theme 中的配色。

例如，下图的连续渐变色带是这样通过`color`配置项生成：

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*s4l-TZbuhmMAAAAAAAAAAABkARQnAQ" width="300">

```js
color: ['#295599', '#3e94c0', '#78c6d0', '#b4d9e4', '#fffef0', '#f9cdac', '#ec7d92', '#bc448c']
```

### point

**optional**

显示数据点。

`visible: boolean`  是否显示数据点<br />
`shape: string`  数据点形状<br />
`size: number`  数据点大小<br />
`style: object | function`  数据点样式

**注意：相对于具体的数值，热力图更加关注的是趋势和分布。因此不推荐在热力图上显示数据点，尤其当点密集时很难得到理想的视觉效果。**

### tooltip

**optional** 见[通用图表配置](../general-config#tooltip)。

### label

**optional**

图形标签。

`visible: boolean`    数据点标签是否显示<br />
`formatter: function`  对 label 的显示文本进行格式化。<br/>
`offsetX: number`  在 label 位置的基础上再往 x 方向的偏移量。<br/>
`offsetY: number`  在 label 位置的基础上再往 y 方向的偏移量。<br/>
`style: object`  配置 label 文本<br/>

**注意：相对于具体的数值，热力图更加关注的是趋势和分布。因此不推荐在热力图上显示标签，尤其当数据点密集时很难得到理想的视觉效果。**


### legend

**optional**, object 类型

`visible: boolean`  图例是否可见<br />
`position: string` 图例位置，以十二方位布局

> 设置图例的显示位置，可设置的值为 12 个：`left-top`,`left-center`,`left-bottom`,`right-top`,`right-center`,`right-bottom`,`top-left`,`top-center`,`top-right`,`bottom-left`,`bottom-center`,`bottom-right`。

`width: number`  图例宽度<br />
`height: number`  图例高度<br />

`text: object` 图例两端刻度值
- `style: object` 刻度值样式<br />
- `formatter: function`  刻度值文本进行格式化<br />

`gridStyle: object`  图例网格线样式
- `stroke: string` 坐标轴轴线颜色
- `lineWidth: number`  描边宽度<br />
- `lineDash: number[]`  描边虚线显示<br />
- `opacity: number`  透明度

`triggerOn: string` 图例响应交互的事件，默认为`click`

完整配置示例：

```js
legend:{
    visible: true,
    position:'right-center',
    width: 10,
    height: 50,
    text:{
        formatter:(v)=>{
            return parseFloat(v) / 100;
        },
        style:{
            fill:'grey',
            fontSize: 12
        }
    },
    gridStyle:{
        lineDashL[2,2]
    },
    triggerOn:'click'
}
```

### background

**optional**, object 类型

配置热力图显示背景，支持颜色填充、图片及 callback 三种方式。

* 颜色填充背景

指定 background `type` 为'color', 通过`value`配置项指定色值。

为热力图配置黑色填充背景：
```js
background:{
    type:'color',
    value:'#000000'
}
```
效果：
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*aYLQQIlazB8AAAAAAAAAAABkARQnAQ" width="300">

* 图片背景

指定 background `type` 为'image', 通过`src`配置项指定图片资源链接。

为热力图配置图片背景：
```js
background:{
     type: 'image',
     src: 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*TU_aSrMV6KYAAAAAAAAAAABkARQnAQ',
}
```
效果：
<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*eFZySpX8E2gAAAAAAAAAAABkARQnAQ" width="300">

* callback

通过回调函数进行更加灵活的背景配置，例如在热力图下方叠加地图。

入参为：

`x: number` 热力图填充区域的 x 位置<br/>
`y: number` 热力图填充区域的 y 位置<br/>
`width: number` 热力图填充区域的宽度<br/>
`height: number` 热力图填充区域的高度<br/>
`container: G.Group` 热力图填充区域的绘图容器

### events

**optional**，见[通用图表配置](../general-config#events)。