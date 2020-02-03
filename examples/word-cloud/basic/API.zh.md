---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### data

**required**
类型：`Array<WordCloudData> | Function`

```typescript
type WordCloudData = {
  word: string; // cloud's word text
  weight: number; // cloud's text weight
  id: number; // index in data array. treat as unique id
  color?: string; // cloud's color
};
```

### width

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#width)。

### height

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#height)。

### maskImage

类型: `string`
**optional** 遮罩图片(url 或者 base64 地址)

### style

类型: `WordStyle`
```typescript
type WordStyle = {
  fontFamily?: string;
  // normal, lighter, bold, bolder, 100~900
  fontWeight?: string | ((word: string, weight: number) => string);
  color?: string | ((word: string, weight: number) => string);

  emphasis?: boolean;
  shadowColor?: string;
  shadowBlur?: number;

  // [min, max] ->  random by steps(each step (max - min) / steps))
  rotation?: [number, number];
  rotationSteps?: number;
  // the ratio of rotate
  rotateRatio?: number;

  // font's max and min size(determine by cloud's weight)
  fontSize?: [number, number];

  gridSize?: number;
};
```
**optional** 文字相关的配置

#### style.fontFamily

类型: `string`
**optional** [通用 CSS 配置](!https://www.w3schools.com/jsref/prop_style_fontfamily.asp)

#### style.fontWeight

类型: `string | ((word: string, weight: number) => string)`
**optional** 设置 fontWeight

#### style.gridSize

类型: `number`
**optional** 单词的网格大小，默认为 8 越大单词之间的间隔越大


#### style.color

类型: `string | ((word: string, weight: number) => string)`
**optional** 设置字体颜色

#### style.fontSize

类型: `[number,number]`
**optional** 设置最小字体和最大字体 size，默认[浏览器支持的最小字号,60]


#### style.rotation

类型: `[number,number]`
**optional** 旋转的最小角度和最大角度 默认 [-π/2,π/2]

#### style.rotationSteps

类型: `number`
**optional** 旋转实际的步数,越大可能旋转角度越小

#### style.rotateRatio

类型: `number`
**optional** 旋转的比率[0,1] 默认是 0.5 也就是 50%可能发生旋转

#### style.emphasis

类型: `boolean`
**optional**  hover 下词云图文字是否高亮效果, 默认 true

#### style.shadowColor

类型: `number`
**optional** `emphasis` 为 true 时 shadow 颜色, 默认通过 `color` 获取

#### style.shadowBlur

类型: `number`
**optional** `emphasis` 为 true 时 shadow 高斯系数, 默认 10

### backgroundColor

类型: `string`
**optional** 画布背景颜色，默认为 `#fff`
### wait

类型: `number`
**optional** 每个词云之间的动画间隔时间

### abortThreshold

类型: `number`
**optional** 每个词云之间执行最大的时间,操作直接 abort 回调

### abort

类型: `Function`
**optional** 每个词云之间操作执行最大的时间的回调函数

### toolTips.visible

类型: `boolean`
**optional** hover 下词云图文字是否显示 tooltips, 默认 true

### shuffle

类型: `boolean`
**optional** 变换传入数据的顺序，默认是 true

### hoveredId

类型: `number`
**optional** 用于标记当前被 hover 的词云图文字，默认-1

### shape

类型: `CloudShape | Function`

```typescript
type CloudShape =
  | 'circle'
  | 'square'
  | 'cardioid'
  | 'diamond'
  | 'triangle'
  | 'triangle-forward'
  | 'triangle-backward'
  | 'triangle-up'
  | 'triangle-down'
  | 'pentagon'
  | 'star';
```

**optional** 词云图形状，默认为 `circle`

### ellipticity

类型: `number`
**optional** 词云图形状的椭圆率 [0,1]，默认为 1，表示标准图形，越小图形越扁平

### onWordCloudHover

类型: `(item: WordCloudData, dimension: Dimension, evt: MouseEvent, start: InnerStartFunction) => {};`

- `item` 表示词云图对象
- `dimension` 表示坐标信息[x,y,width,height]等
- `evt` 表示触摸事件对象
- `start` 表示内部的刷新回调函数 `(hoveredId: number) => void;` 当`hoveredId`不为-1 表示刷新立即刷新该 ID 的文本

**optional** hover 的 action 回调

### onWordCloudClick

类型: `(item: WordCloudData, dimension: Dimension, evt: MouseEvent, start: InnerStartFunction) => {};`

- `item` 表示词云图对象
- `dimension` 表示坐标信息[x,y,width,height]等
- `evt` 表示触摸事件对象
- `start` 表示内部的刷新回调函数 `(hoveredId: number) => void;` 当`hoveredId`不为-1 表示刷新立即刷新该 ID 的文本
  > 基本同 onWordCloudHover

**optional** click 词云的 action 回调

##可能的问题

- 图形 shape 不完整
  > 可以尝试调节 `maxFontSize`,`minFontSize`,`width`,`height`, 四个属性来控制画布或者字体的大小来调整 shape 的范围
- 图片形状解析不完整
  > 可以尝试用白底黑色图形轮廓的图片
- 有些文字未被渲染
  > 首先词云图会 **过滤掉大量的文本信息**，但是可以尝试提高文字对应的 weight 权重值

* Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
* Server-side Rendering
* [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
