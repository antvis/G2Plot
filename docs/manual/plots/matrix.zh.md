---
title: Matrix - 色块热力图
order: 6
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*8ezYQrewt7wAAAAAAAAAAABkARQnAQ" width="400">

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

色块形状在 x 方向位置映射对应的数据字段名，一般对应一个分类字段。

### yField

**required**, string 类型

色块形状在 y 方向位置映射所对应的数据字段名，一般对应一个分类字段。

### colorField

**required**, string 类型

色块颜色映射对应的数据字段名，一般对应一个连续字段。

### color

**optional**, string[]

指定色块图颜色映射的色带颜色，数值中的值为色带节点的色值。如不进行配置则采用 theme 中的配色。

例如，下图的连续渐变色带是这样通过`color`配置项生成：

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*s4l-TZbuhmMAAAAAAAAAAABkARQnAQ" width="300">

```js
color: ['#295599', '#3e94c0', '#78c6d0', '#b4d9e4', '#fffef0', '#f9cdac', '#ec7d92', '#bc448c']
```

### sizeField

**optional**, string 类型

指定色块形状大小映射的字段，要求必须为一个**连续字段**。


### size

**可选**, number[ ]

指定色块形状大小的值域，顺序为[`min`,`max`]。

用法示例：

```js
const matrixPlot = new Matrix(document.getElementById('container'), {
    data,
    xField: 'name',
    yField: 'country',
    colorField: 'value',
    sizeField: 'value',
    shapeSize: [2,20]
});
matrixPlot.render();
```

### shapeType

**optional**, string 类型

指定色块形状的类型，支持设置`rect`和`circle`两种类型，默认为`rect`。


### forceSquare

**optional**, boolean 类型

是否强制色块形状的 width 和 height 相等。

### label

**optional**

图形标签。

`visible: boolean`    是否显示图形标签<br />
`formatter: function`  对 label 的显示文本进行格式化。<br/>
`offsetX: number`  在 label 位置的基础上再往 x 方向的偏移量。<br/>
`offsetY: number`  在 label 位置的基础上再往 y 方向的偏移量。<br/>
`adjustPosition: boolean`  当色块大小不足以容纳标签时是否自动隐藏，默认为`true`。<br/>
`adjustCololr: boolean`  图形标签颜色是否根据对应色块颜色自动调整，默认为`true`。<br/>
`style: object`  配置 label 文本<br/>


### tooltip

**optional** 见[通用图表配置](../general-config#tooltip)。


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

`ticklineStyle: object`  图例刻度线样式
- `stroke: string` 坐标轴轴线颜色
- `lineWidth: number`  描边宽度<br />
- `lineDash: number[]`  描边虚线显示<br />
- `opacity: number`  透明度<br />

`anchorStyle: object`  图例滑动锚点样式
- `fill: string` 锚点填充颜色<br />
- `stroke: string` 锚点描边颜色<br />
- `lineWidth: number`  锚点描边宽度<br />
- `lineDash: number[]`  锚点描边虚线显示<br />
- `opacity: number`  锚点透明度<br />

`triggerOn: string` 图例响应交互的事件，默认为`click`

完整配置示例：

```js
legend:{
    visible: true,
    position:'bottom-center',
    width: 300,
    height: 10,
    text:{
        formatter:(v)=>{
            return parseFloat(v) / 100;
        },
        style:{
            fill:'black',
            fontSize: 12
        }
    },
    anchorStyle:{
        fill:'black',
    },
    ticklineStyle:{
        lineDash:[2,2],
        stroke:'black'
    }
    triggerOn:'click'
}
```
效果： <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*PYRhRrc4kSoAAAAAAAAAAABkARQnAQ" width="400">

### events

**optional**，见[通用图表配置](../general-config#events)。


## 方法

色块热力图通过色块形状 `shapeType` 和 是否进行大小映射 `sizeField`的配置，可以组合成四种模式：

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*cJIpS4PlAyMAAAAAAAAAAABkARQnAQ" width="400">

针对四种模式的切换，提供了快捷方法：

### mappingSize( fieldName:string )  

切换为大小映射模式。

### disableMappingSize ()

取消色块的大小映射。

### changeShape( shapeType:string )  

切换色块形状类型。


其余图表方法见[通用图表配置](../general-config#通用方法)。