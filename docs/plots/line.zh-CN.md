# Line - 折线图


## 图表故事

折线图用于表示连续时间跨度内的数据，它通常用于显示某变量随时间的变化模式：是上升还是下降，是否存在周期性的循环？因此，相对于独立的数据点，折线图关注的是全局趋势。

在折线图中，一般水平轴（X轴）用来表示时间的推移，并且间隔相同；而垂直轴（Y轴）代表不同时刻的数据的大小。


## 数据类型

折线图适合的数据类型为一个**连续字段**(时间)和一个**离散字段**(数值)。在下面这个例子中，`time`为连续数据字段，`value`为离散数据字段。

```
const data = [
  time:'2000',value: 100,
  time:'2001',value:60,
  time:'2002',value: 30
 ];
```

在进行图表绘制的时候，连续字段将映射到折线形状在x方向上的信息，而离散字段将映射到折线形状在y方向上的信息。

在上面的示例数据中再加入一个**分类字段**`type`，折线将根据该分类字段分为两根，两根折线在x方向(时间)的信息是完全一致的，通常用作同一时间区间内两个变量发展趋势的对比。

```
const data = [
  time:'2000',value: 100,type:'a',
  time:'2001',value:60,type:'a',
  time:'2002',value: 30, type: 'a',
  time:'2000',value: 70,type:'b',
  time:'2001',value:120,type:'b',
  time:'2002',value: 40, type: 'b',
 ];
```

## 图表用法
- **Dont's**
  - 避免折线数量过多，且在视觉样式上无法区分主次
  - 谨慎使用曲线
  
- **Do**
  - 多折线时，善用视觉样式(线宽、颜色、透明度)突出重点。对于辅助数据可以采用灰色或降低透明度的方法与主要数据进行区分。
  
## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。


### title
**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### description
**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### width
**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### height
**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### forceFit
**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### padding
**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### theme
**optional** 见[通用图表配置](../generalConfig.zh-CN.md)。

### data: collection
**required**

数据源为对象集合，例如：[{ segment: 分类一, value: 20 }, { segment: 分类二, value: 20 }]。

### xField: string
**required**

折线形状在x方向(横向延伸)对应的数据字段名，一般对应一个连续字段。

### yField: string
**required**

折线形状在y方向对应的数据字段名，一般对应一个离散字段。

### seriesField: string
**required**

多折线必选。

数据集中的分组字段名，一般对应一个分类字段。

通过该字段的值，折线图将会被分为多个组，通过颜色进行区分，视觉上呈现为多条折线。

### lineSize: number
**optional**

设置折线宽度，默认为2。


### smooth: boolean
**optional**

是否将折线绘制为曲线(spline)。

### color: string[] | function
**optional**

指定折线颜色。如不进行配置则采用theme中的配色。


### lineStyle: object | function
**optional**

配置折线样式。

`stroke: string`  折线颜色<br />
`lineWidth: number`  折线宽度<br />
`lineDash: number[] ` 虚线显示<br />
`opacity: number`  透明度<br />

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### point
**optional**

配置折线上的数据点，起到辅助阅读的作用。分组及颜色映射方式与折线图形保持一致。

`visible: boolean`  是否显示数据点<br />
`shape: string`  数据点形状<br />
`size: number`  数据点大小<br />
`style: object | function`  数据点样式

### tooltip
**optional**  见[通用图表配置](../generalConfig.zh-CN.md)。

### legend
**optional**  见[通用图表配置](../generalConfig.zh-CN.md)。

### label
**optional**

`visible: boolean`   图形标签是否显示<br />
`type: 'point' | 'line'`  图形标签类型

<p><img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*m9CuRrHRW78AAAAAAAAAAABkARQnAQ" width="600"></p>

`formatter: function`  对label的显示文本进行格式化。<br />
`offsetX: number`   在label位置的基础上再往x方向的偏移量。<br />
`offsetY: number`   在label位置的基础上再往y方向的偏移量。<br />
`style: object`    配置label文本


### events
**optional**

- 图形事件：

`onLineClick: function`  折线点击事件<br />
`onLineDblClick: function`   折线双击事件<br />
`onLineMousemove: function`  折线鼠标移动事件<br />
`onLineContextmenu: function`   折线右键事件<br />

如配置了折线上的数据点：


`onPointClick: function`  数据点点击事件<br />
`onPointDblClick: function`   数据点双击事件<br />
`onPointMousemove: function`  数据点鼠标移动事件<br />
`onPointContextmenu: function`   数据点右键事件<br />


- 其他事件类型见[通用图表配置](../generalConfig.zh-CN.md)。