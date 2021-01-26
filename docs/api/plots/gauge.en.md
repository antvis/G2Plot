---
title: Gauage
order: 22
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### percent

<description>**required** _number_</description>

Indicator ratio data [0-1].

#### radius

<description>**optional** _number_ _default:_ `0.95`</description>

The radius of the outer ring [0-1] is calculated with respect to the minimum width and height of the canvas.

#### innerRadius

<description>**optional** _number_ _default:_ `0.9`</description>

The radius of the inner ring [0-1] is calculated relative to the inner radius radius.

#### startAngle

<description>**optional** _number_ _default:_ `(-7 / 6) * Math.PI`</description>

The starting Angle of the disk.

#### endAngle

<description>**optional** _number_ _default:_ `(1 / 6) * Math.PI`</description>

The termination Angle of the disk.

### Plot Style

#### range

<description>**optional** _object_</description>

Dashboard auxiliary arc style.

| Properties | Type                | Description                                                                                                                                     |
| ---------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| ticks      | _number[]_          | Dashboard auxiliary arc style.                                                                                                                  |
| color      | _string \|string[]_ | The color swatches of auxiliary arcs are selected in accordance with the color swatches; When ticks are set, color cannot be used as a callback |

<playground rid="gauge" path="progress-plots/gauge/demo/basic.ts"></playground>

#### axis

<description>**optional** _object_</description>

Indicates auxiliary shaft styles.

`markdown:docs/common/axis.en.md`

#### indicator

<description>**optional** _object_</description>

Dashboard indicator style configuration. Divided into components as follows:

- `pointer`：Pointer style configuration in a pointer
- `pin`：The disc style configuration in the indicator

They all have the following configuration items:

| Properties | Type   | Description |
| ---------- | ------ | ----------- |
| style      | object | ShapeStyle  |

`markdown:docs/common/shape-style.en.md`

#### statistic

<description>**optional** _object_</description>

Metric central text component.

`markdown:docs/common/statistic.en.md`
