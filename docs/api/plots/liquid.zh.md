---
title: 水波图
order: 6
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

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

`markdown:docs/common/shape-style.zh.md`

#### shape

<description>**optional** _String | Function_ default: `circle`</description>

水波图有四种内置形状：`circle | diamond | triangle | pin`。同时也支持自定义图形，这个时候需要传入一个构建 Path 的回调函数。

示例代码如下：

```ts
/**
 * @param x the x for bounding rectangle
 * @param y the y for bounding rectangle
 * @param width the width for bounding rectangle
 * @param height the height for bounding rectangle
 * @return PathCommand[]
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

`markdown:docs/common/color.zh.md`

#### outline

<description>**optional** _Outline_</description>

水波图的外框容器配置。主要包含以下内容：

| 属性名        | 类型            | 介绍                                         |
| ------------ | -------------- | -------------------------------------------- |
| border       | number         | 外框容器的 border 宽度，默认为 2 像素             |
| distance     | number         | 外框容器和内部波形的间距，默认为 0 像素             |

#### wave

<description>**optional** _Wave_</description>

水波图的波形配置。主要包含以下内容：

| 属性名        | 类型            | 介绍                                         |
| ------------ | -------------- | -------------------------------------------- |
| count        | number         | 水波的个数，默认为 3 个                          |
| length       | number         | 水波的波长度，默认为 192 像素                     |

### 图表组件

#### statistic ✨

<description>**optional** _object_</description>

指标中心文本组件。

`markdown:docs/common/statistic.zh.md`
