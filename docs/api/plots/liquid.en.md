---
title: Liquid
order: 12
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

`markdown:docs/common/color.en.md`

#### outline

<description>**optional** _Outline_</description>

The ouline configure for liquid plot, includes:

| Attr         | Type           | Desc                                                  |
| ------------ | -------------- | ----------------------------------------------------- |
| border       | number         | border width of ouline, default 2px                   |
| distance     | number         | distance between ouline and wave, default 0px        |

#### wave

<description>**optional** _Wave_</description>

The wave configure for liquid plot, includes:

| Attr         | Type           | Desc                                                  |
| ------------ | -------------- | ----------------------------------------------------- |
| count        | number         | wave count, default 3                                 |
| length       | number         | wave length, default is 192px                         |

### Plot Components

#### statistic

<description>**optional** _object_</description>

Text component.

`markdown:docs/common/statistic.en.md`
