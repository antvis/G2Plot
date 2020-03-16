---
title: API
---

说明： **required** 标签代表组件的必选配置项，**optional** 标签代表组件的可选配置项。

- `style: object`    标注点样式。<br />

  - `fill: string`    标注点颜色<br />
  - `opacity: number`  标注点颜色透明度<br />
  - `stroke: string`    标注点描边色<br />
  - `lineWidth: number`    标注点描边粗细

## 快速开始

[DEMOS](https://g2plot.antv.vision/zh/examples/general/markerPoint)

配置标注点示例代码：

```js
{
  markerPoints: [
    {
      visible: true,
      shape: 'circle',
      data: [],
      style: {
        /** 正常样式 **/
        normal: {},
        /** 激活样式 **/
        active: {},
        /** 选中样式 **/
        selected: {},
      },
      label: {
        visible: true,
        position: 'top',
        style: {},
      },
    },
  ],
}
```

## symbol

**optional** string | Function, 默认: `circle`

标注点图形类型

1. string 类型。可参见 G2 支持的`symbol`类型，包括： `hexagon`, `bowtie`, `cross`, `tick`, `plus`, `hyphen`, `line`

2. Function 类型，可以自定义 symbol 绘制，如下：

```typwscript
sumbol: (x: number, y: number, r: number) => {
  return [
    ['M', x - r, y - r],
    ['L', x + r, y + r],
    ['L', x + r, y - r],
    ['L', x - r, y + r],
    ['L', x - r, y - r],
    ['Z'],
  ];
}
```

## size

**optional** number, 默认: 6

symbol 的大小

## data

**required** array

标注点的数据数组，每个数据项是一个对象

> 注意，标注点的数据数组是图表 data 的子集

示例:

```typescript
data: [
  // 匹配所有数据项为 3 的数据点
  { value: 3 },
  // 匹配 日期为 2019-10-01，且数值为 3 的数据点
  { date: '2019-10-01', value: 3 },
];
```

## field

**optional** string

标注点映射的数据字段，用于标注点标签

## label

**optional** object

- `visible` 标注点标签是否可见
- `formatter` 标签格式化
- `position` 标注点标签位置，`top` | `bottom`
- `offsetX` x 方向偏移
- `offsetY` y 方向偏移
- `style` 样式

## style

**optional** object

- `normal` 正常样式
- `active` 激活样式
- `selected` 选中样式

## events

**optional** object

标注点事件

- `mouseenter` 鼠标移入事件
- `mouseleave` 鼠标移出事件
- `click` 鼠标 click 事件

- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
