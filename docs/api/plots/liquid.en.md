---
title: Liquid
order: 6
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### percent

<description>**required** _number_</description>

Ratio data( Range:[0-1] ).

#### radius

<description>**optional** _number_ _default:_ `0.9`</description>

Radius of outer ring( Range:[0-1] ).

### Graphic Style

#### liquidStyle

<description>**optional** _StyleAttr | Function_</description>

Liguid graphic style.

`markdown:docs/common/shape-style.en.md`

#### shape

<description>**optional** _String | Function_ default: `circle`</description>

There are four built-in shapes for liquid plot: `circle | diamond | triangle | pin`. It aslo supports custom shape if shape is a callback function to build path.

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

`markdown:docs/common/color.en.md`

#### outline

<description>**optional** _Outline_</description>

The ouline configure for liquid plot, includes:

| Properties | Type   | Desc                                          |
| ---------- | ------ | --------------------------------------------- |
| border     | number | border width of ouline, default 2px           |
| distance   | number | distance between ouline and wave, default 0px |

#### wave

<description>**optional** _Wave_</description>

The wave configure for liquid plot, includes:

| Properties | Type   | Desc                          |
| ---------- | ------ | ----------------------------- |
| count      | number | wave count, default 3         |
| length     | number | wave length, default is 192px |

### Plot Components

#### statistic

<description>**optional** _object_</description>

Text component.

`markdown:docs/common/statistic.en.md`
