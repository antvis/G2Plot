---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

## 通用配置

### width: number

**reuired**

图表宽度

### height: number

**reuired**

图表高度

### 图表区域事件

`onPlotClick: function`    图表区域点击事件<br />
`onPlotDblClick: function`  图表区域双击事件<br />
`onPlotMousemove: function`    图表区域鼠标移动事件<br />
`onPlotContextmenu: function`    图表区域右键事件

## TinyArea - 迷你面积图

### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]。

### xField: string

**required**

面积图在 x 方向（横向延伸）对应的数据字段名，一般对应一个连续字段。

### yField: string

**required**

面积图在 y 方向对应的数据字段名，一般对应一个离散字段。

### smooth: boolean

**optional**

面积图是否曲线展示。

### color: string | function

**optional**

指定面积图颜色。如不进行配置则采用 theme 中的配色。

### lineStyle: object | function

**optional**

指定面积图上部折线的样式。

`lineWidth: number`  折线宽度<br />
`lineDash: number[]`    虚线样式

### guideLine: object[]

**optional**

为图表添加辅助线，可以同时添加多条辅助线。

`type: string`    含有统计意义的辅助线类型，可选类型为  `'max'` | `'min'` | `'median'` |  `'mean'`。如指定了辅助线类型，则不需要配置辅助线的`start`和`end`。

`start: array | function | object`  指定辅助线起始位置，如不配置`type`，则该辅助线为自定义辅助线，`start`是必选项。

支持两种数据形式，两者不能混用：

- 原始数据值，如 ['2010-01-01', 100]
- 绘图区域百分比位置，如 ['50%', '50%']

`end: array | function | object`  指定辅助线终点位置，如不配置`type`，则该辅助线为自定义辅助线，`end`是必选项。

支持两种数据形式，两者不能混用：

- 原始数据值，如 ['2010-01-01', 100]
- 绘图区域百分比位置，如 ['50%', '50%']

`lineStyle: object`    设置辅助线样式。<br />

- `stroke: string`    辅助线颜色<br />
- `lineWidth: number`  辅助线宽度<br />
- `lineDash: number[]`    辅助线虚线显示<br />
- `opacity: number`    辅助线透明度

`text: object`  设置辅助线文本。<br />

- `position: 'start' | 'center' | 'end' | '50%' | 0.5`  设置辅助线文本样式。<br />
- `content: string`    辅助线文本内容。<br />
- `offsetX: number`  辅助线文本位置在 x 方向上的偏移量。<br />
- `offsetY: number`  辅助线文本位置在 y 方向上的偏移量。<br />
- `style: object`    辅助线文本样式。

  - `fontSize: number`    字号<br />
  - `fill: string`    文字颜色<br />
  - `opacity: number`  文字透明度<br />
  - `textAlign: 'start' | 'end' | 'center'`    对齐方式<br />
  - `textBaselin: 'top' | 'bottom' | 'middle'`  文字基线

配置统计辅助线示例代码：

```typescript
{
  guideLine: [
    {
      type: 'mean',
      lineStyle: {},
      text: {},
    },
  ];
}
```

配置自定义辅助线示例代码：

```typescript
{
  guideLine: [
    {
      start: ['2010-01-01', 100] || ['0%', '50%'],
      end: ['2010-01-10', 50] || ['100%', '80%'],
      lineStyle: {},
      text: {},
    },
  ];
}
```

### events

**optional**

图形事件：

`onAreaClick: function`  面积形状点击事件<br />
`onAreaDblClick: function`    面积形状双击事件<br />
`onAreaMousemove: function`  面积形状鼠标移动事件<br />
`onAreaContextmenu: function`    面积形状右键事件<br />
`onLineClick: function`  折线形状点击事件<br />
`onLineDblClick: function`    折线形状双击事件<br />
`onLineMousemove: function`  折线形状鼠标移动事件<br />
`onLineContextmenu: function`    折线形状右键事件<br />

## TinyColumn - 迷你柱形图

### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]。

### xField: string

**required**

柱形在 x 方向位置映射对应的数据字段名，一般对应一个分类字段。

### yField: string

**required**

柱形在 y 方向高度映射所对应的数据字段名，一般对应一个离散字段。

### colorField: string

**optional**

柱形颜色映射对应的数据字段名。

### color: string | string[] | function

**optional**

指定柱形颜色。如不进行配置则采用 theme 中的配色。

### columnStyle: object | function

**optional**

配置柱形样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### guideLine: object[]

**optional**

为图表添加辅助线，可以同时添加多条辅助线。

`type: string`    含有统计意义的辅助线类型，可选类型为  `'max'` | `'min'` | `'median'` |  `'mean'`。

> 如指定了辅助线类型，则不需要配置辅助线的`start`和`end`。

`start: array | function | object`  指定辅助线起始位置，如不配置`type`，则该辅助线为自定义辅助线，`start`是必选项。

支持两种数据形式，两者不能混用：

- 原始数据值，如 ['2010-01-01', 100]
- 绘图区域百分比位置，如 ['50%', '50%']

`end: array | function | object`  指定辅助线终点位置，如不配置`type`，则该辅助线为自定义辅助线，`end`是必选项。

支持两种数据形式，两者不能混用：

- 原始数据值，如 ['2010-01-01', 100]
- 绘图区域百分比位置，如 ['50%', '50%']

`lineStyle: object`    设置辅助线样式。<br />

- `stroke: string`    辅助线颜色<br />
- `lineWidth: number`  辅助线宽度<br />
- `lineDash: number[]`    辅助线虚线显示<br />
- `opacity: number`    辅助线透明度

`text: object`  设置辅助线文本。<br />

- `position: 'start' | 'center' | 'end' | '50%' | 0.5`  设置辅助线文本样式。<br />
- `content: string`    辅助线文本内容。<br />
- `offsetX: number`  辅助线文本位置在 x 方向上的偏移量。<br />
- `offsetY: number`  辅助线文本位置在 y 方向上的偏移量。<br />

- `style: object`    辅助线文本样式。<br />

  - `fontSize: number`    字号<br />
  - `fill: string`    文字颜色<br />
  - `opacity: number`  文字透明度<br />
  - `textAlign: 'start' | 'end' | 'center'`    对齐方式<br />
  - `textBaselin: 'top' | 'bottom' | 'middle'`  文字基线

配置统计辅助线示例代码：

```typescript
{
  guideLine: [
    {
      type: 'mean',
      lineStyle: {},
      text: {},
    },
  ];
}
```

配置自定义辅助线示例代码：

```typescript
{
  guideLine: [
    {
      start: ['2010-01-01', 100] || ['0%', '50%'],
      end: ['2010-01-10', 50] || ['100%', '80%'],
      lineStyle: {},
      text: {},
    },
  ];
}
```

### events

**optional**

图形事件：

`onColumnClick: function`  柱形点击事件<br />
`onColumnDblClick: function`    柱形双击事件<br />
`onColumnMousemove: function`  柱形鼠标移动事件<br />
`onColumnContextmenu: function`    柱形右键事件

## TinyLine - 迷你折线图

### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]。

### xField: string

**required**

折线形状在 x 方向（横向延伸）对应的数据字段名，一般对应一个连续字段。

### yField: string

**required**

折线形状在 y 方向对应的数据字段名，一般对应一个离散字段。

### size: number

**optional**

设置折线宽度，默认为 2。

### smooth: boolean

**optional**

是否将折线绘制为曲线 (spline)。

### color: string | function

**optional**

指定折线颜色。如不进行配置则采用 theme 中的配色。

### lineStyle: object | function

**optional**

设置折线的样式。

`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### guideLine: object[]

**optional**

为图表添加辅助线，可以同时添加多条辅助线。

`type: string`    含有统计意义的辅助线类型，可选类型为  `'max'` | `'min'` | `'median'` |  `'mean'`。如指定了辅助线类型，则不需要配置辅助线的`start`和`end`。

`start: array | function | object`  指定辅助线起始位置，如不配置`type`，则该辅助线为自定义辅助线，`start`是必选项。

支持两种数据形式，两者不能混用：

- 原始数据值，如 ['2010-01-01', 100]
- 绘图区域百分比位置，如 ['50%', '50%']

`end: array | function | object`  指定辅助线终点位置，如不配置`type`，则该辅助线为自定义辅助线，`end`是必选项。

支持两种数据形式，两者不能混用：

- 原始数据值，如 ['2010-01-01', 100]
- 绘图区域百分比位置，如 ['50%', '50%']

`lineStyle: object`    设置辅助线样式。<br />

- `stroke: string`    辅助线颜色<br />
- `lineWidth: number`  辅助线宽度<br />
- `lineDash: number[]`    辅助线虚线显示<br />
- `opacity: number`    辅助线透明度

`text: object`  设置辅助线文本。<br />

- `position: 'start' | 'center' | 'end' | '50%' | 0.5`  设置辅助线文本样式。
- `content: string`    辅助线文本内容。<br />
- `offsetX: number`  辅助线文本位置在 x 方向上的偏移量。
- `offsetY: number`  辅助线文本位置在 y 方向上的偏移量。<br />`style: object`    辅助线文本样式。

  - `fontSize: number`    字号<br />
  - `fill: string`    文字颜色<br />
  - `opacity: number`  文字透明度<br />
  - `textAlign: 'start' | 'end' | 'center'`    对齐方式<br />
  - `textBaselin: 'top' | 'bottom' | 'middle'`  文字基线

配置统计辅助线示例代码：

```typescript
{
  guideLine: [
    {
      type: 'mean',
      lineStyle: {},
      text: {},
    },
  ];
}
```

配置自定义辅助线示例代码：

```typescript
{
  guideLine: [
    {
      start: ['2010-01-01', 100] || ['0%', '50%'],
      end: ['2010-01-10', 50] || ['100%', '80%'],
      lineStyle: {},
      text: {},
    },
  ];
}
```

### events

**optional**

图形事件：

`onLineClick: function`  折线点击事件<br />
`onLineDblClick: function`    折线双击事件<br />
`onLineMousemove: function`  折线鼠标移动事件<br />
`onLineContextmenu: function`    折线右键事件

## Progress - 进度条

### percent: number

**required**

进度百分比，值域为 [0,1]。

### color: number | number[] | function

**optional**

设置进度条颜色，该值的类型如下

- number    指定值为单值时，配置进度条已完成分段的颜色
- number[]    指定值为一个数组时，同时配置进度条已完成和未完成分段的颜色，顺序为 [ 已完成，未完成 ]
- function  指定值为一个回调函数时，入参为当前进度 (percent)，出参为一个数组，需要同时指定进度条已完成和未完成分段的颜色，顺序为 [ 已完成，未完成 ]

### progressStyle: object | function

**optional**

设置进度条的样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度

另外还支持回调函数的配置方式，入参为当前进度 (percent)，出参为一个样式配置对象。

### events

**optional**

- 图形事件：

  `onProgressClick: function`  折线点击事件<br />
  `onProgresDblClick: function`    折线双击事件<br />
  `onProgresMousemove: function`  折线鼠标移动事件<br />
  `onProgresContextmenu: function`    折线右键事件<br />

### 方法

#### update( percent:number )

更新进度。

```typescript
progress.update(0.5);
```

## RingProgress - 环形进度条

### percent: number

**required**

进度百分比，值域为 [0,1]。

### color: number | number[] | function

**optional**

设置进度条颜色，该值的类型如下

- number    指定值为单值时，配置进度条已完成分段的颜色
- number[]    指定值为一个数组时，同时配置进度条已完成和未完成分段的颜色，顺序为 [ 已完成，未完成 ]
- function  指定值为一个回调函数时，入参为当前进度 (percent)，出参为一个数组，需要同时指定进度条已完成和未完成分段的颜色，顺序为 [ 已完成，未完成 ]

### progressStyle: object | function

**optional**

设置进度条的样式。

`fill: string`  填充颜色<br />
`stroke: string`  描边颜色<br />
`lineWidth: number`  描边宽度<br />
`lineDash: number[]`  描边虚线显示<br />
`opacity: number`  透明度

另外还支持回调函数的配置方式，入参为当前进度 (percent)，出参为一个样式配置对象。

### events

**optional**

- 图形事件：

  `onProgressClick: function`  折线点击事件<br />
  `onProgresDblClick: function`    折线双击事件<br />
  `onProgresMousemove: function`  折线鼠标移动事件<br />
  `onProgresContextmenu: function`    折线右键事件<br />

### 方法

#### update( percent:number )

更新进度。

```typescript
progress.update(0.5);


- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
```
