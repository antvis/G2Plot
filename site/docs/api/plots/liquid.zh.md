---
title: 水波图
order: 6
---

### 图表容器

<embed src="@/docs/common/chart-options.zh.md"></embed>

### 数据映射

#### percent

<description>**required** _number_</description>

指标比例数据 [0-1]。

#### radius

<description>**optional** _number_ _default:_ `0.9`</description>

外环的半径 [0-1]，相对于画布宽高的最小值来计算的。

### 图形样式

#### liquidStyle

<description>**optional** _StyleAttr | Function_</description>

水波图的配色样式。

<embed src="@/docs/common/shape-style.zh.md"></embed>

#### shape

<description>**optional** _String | Function_ default: `circle`</description>

水波图有五种内置形状：`circle | diamond | triangle | pin | rect`。同时也支持自定义图形，这个时候需要传入一个构建 Path 的回调函数。

示例代码如下：

```ts
/**
 * @param x  外接矩形中心点的 x 坐标
 * @param y  外接矩形中心点的 y 坐标
 * @param width  外接矩形的宽
 * @param height  外接矩形的高
 * @return  PathCommand[]
 */
function shape(x: number, y: number, width: number, height: number) {
  const h = height / 2;
  const w = width / 2;
  return [
    ['M', x - x / 3, y - h],
    ['L', x + w, y - y / 3],
    ['L', x + x / 3, y + h],
    ['L', x - w, y + y / 3],
    ['Z'],
  ];
}
```

<embed src="@/docs/common/color.zh.md"></embed>

#### shapeStyle

<description>**optional** _StyleAttr | Function_</description>

形状的样式。

<embed src="@/docs/common/shape-style.zh.md"></embed>

#### pattern ✨

<description>**optional** _object | Function_</description>

<embed src="@/docs/common/pattern.zh.md"></embed>

#### outline

<description>**optional** _Outline_</description>

水波图的外框容器配置。主要包含以下内容：

| 属性名   | 类型              | 介绍                                    |
| -------- | ----------------- | --------------------------------------- |
| border   | _number_          | 外框容器的 border 宽度，默认为 2 像素   |
| distance | _number_          | 外框容器和内部波形的间距，默认为 0 像素 |
| style    | _OutlineStyleCfg_ | 外框容器的 border 样式设置              |

_*OutlineStyleCfg*_ 支持配置的样式如下：

| 属性名        | 类型     | 介绍                                                      |
| ------------- | -------- | --------------------------------------------------------- |
| stroke        | _string_ | 外框容器 border 填充色，默认和水波填充色 `color` 保持一致 |
| strokeOpacity | _number_ | 外框容器 border 填充透明度                                |

#### wave

<description>**optional** _Wave_</description>

水波图的波形配置。主要包含以下内容：

| 属性名 | 类型           | 介绍                          |
| ------ | -------------- | ----------------------------- |
| count  | _number_       | 水波的个数，默认为 3 个       |
| length | _number_ | 水波的波长度，默认为 192 像素 |

### 图表组件

#### statistic ✨

<description>**optional** _object_</description>

指标中心文本组件。

<embed src="@/docs/common/statistic.zh.md"></embed>
