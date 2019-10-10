# Area - 面积图

## 图表故事
面积图又叫区域图。它是在折线图的基础之上形成的，它将折线图中折线与自变量坐标轴之间的区域使用颜色或者纹理填充，这样一个填充区域我们叫做面积，颜色的填充可以更好得突出趋势信息。

面积图用于强调数量随时间而变化的程度，也可用于引起人们对总值趋势的注意。他们最常用于表现趋势和关系，而不是传达特定的值。

## 数据类型
折线图适合的数据类型为一个**连续字段**(时间)和一个**离散字段**(数值)。在下面这个例子中，`time` 为连续数据字段，`value` 为离散数据字段。

```js
const data = [
  { time: '2000', value: 100 },
  { time: '2001', value: 60 },
  { time: '2002', value: 30 }
 ];
```

在进行图表绘制的时候，连续字段将映射到折线形状在 x 方向上的信息，而离散字段将映射到折线形状在 y 方向上的信息。

在上面的示例数据中再加入一个**分类字段** `type`，折线将根据该分类字段分为两根，两根折线在 x 方向 (时间) 的信息是完全一致的，通常用作同一时间区间内两个变量发展趋势的对比。

```js
const data = [
  { time: '2000', value: 100, type:'a' },
  { time: '2001', value: 60, type:'a' },
  { time: '2002', value: 30, type: 'a' },
  { time: '2000', value: 70, type:'b' },
  { time: '2001', value: 120, type:'b' },
  { time: '2002', value: 40, type: 'b' }
 ];
```

## 图表用法

- **Dont's**
  - 避免面积数量过多，且在视觉样式上无法区分主次
  - 谨慎使用曲线面积图

- **Do**
  - 多面积时，考虑堆叠面积图而不是重叠面积图。

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

数据源为对象集合，例如：`[{ segment: 分类一, value: 20 }, { segment: 分类二, value: 20 }]`。


### xField: string
**required**

面积形状在 x 方向 (横向延伸) 对应的数据字段名，一般对应一个连续字段。


### yField: string
**required**

面积形状在 y 方向对应的数据字段名，一般对应一个离散字段。


### color: string[] | function
**optional**

指定折线颜色。如不进行配置则采用 theme 中的配色。


### areaStyle: object | function
**optional**

配置面积样式。

- `strokeStyle: string`  面积的边框颜色
- `opacity: number`  透明度
- `lineWidth: number`  面积区域边框线的线宽
- `lineDash: number[]`  面积区域边框线的虚线配置

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### line: object
**optional**

配置面积图上线，起到辅助阅读的作用。分组及颜色映射方式与面积图形保持一致。

- `visible: boolean`  是否显示数据线
- `opacity: number`  透明度
- `color: string`  颜色
- `size: number`  线宽
- `style: object | function`  线图形样式，另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象

### point: object
**optional**

配置面积图上的数据点，起到辅助阅读的作用。分组及颜色映射方式与面积图形保持一致。

- `visible: boolean`  是否显示数据点
- `shape: string`  数据点形状
- `size: number`  数据点大小
- `style: object | function`  数据点图形样式，另外该属性还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象

### tooltip
**optional**  见[通用图表配置](../generalConfig.zh-CN.md)。

### legend
**optional**  见[通用图表配置](../generalConfig.zh-CN.md)。

### label
**optional**

- `visible: boolean`   图形标签是否显示
- `type: 'area' | 'point' | 'line'`  图形标签类型，默认为 area
- `formatter: function`  对 label 的显示文本进行格式化
- `offsetX: number`   在 label 位置的基础上再往 x 方向的偏移量
- `offsetY: number`   在 label 位置的基础上再往 y 方向的偏移量
- `style: object`    配置 label 文本

### events
**optional**

- 图形事件
  * `onAreaClick: function`  区域点击事件
  * `onAreaDblclick: function`   区域双击事件
  * `onAreaMousemove: function`  区域鼠标移动事件
  * `onAreaMouseenter: function`   区域鼠标进入事件
  * `onAreaMouseleave: function`   区域鼠标移出事件
  * `onAreaMousedown: function`   区域鼠标点击事件
  * `onAreaMouseup: function`   区域鼠标抬起事件
  * `onAreaContextmenu: function`   右键事件

如配置了区域图上的数据点：
  * `onPointClick: function`  数据点点击事件
  * `onPointDblClick: function`   数据点双击事件
  * `onPointMousemove: function`  数据点鼠标移动事件
  * `onPointMouseenter: function`   数据点鼠标进入事件
  * `onPointMouseleave: function`   数据点鼠标移出事件
  * `onPointMousedown: function`   数据点鼠标点击事件
  * `onPointMouseup: function`   数据点鼠标抬起事件
  * `onPointContextmenu: function`   数据点右键事件

如配置了区域图上的折线：
  * `onLineClick: function`  折线点击事件
  * `onLineDblClick: function`  折线双击事件
  * `onLineMousemove: function`  折线鼠标移动事件
  * `onLineMouseenter: function`   折线鼠标进入事件
  * `onLineMouseleave: function`   折线鼠标移出事件
  * `onLineMousedown: function`   折线鼠标点击事件
  * `onLineMouseup: function`   折线鼠标抬起事件
  * `onLineContextmenu: function`   折线右键事件

- 其他事件类型见[通用图表配置](../generalConfig.zh-CN.md)。
