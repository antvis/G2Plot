---
title: Gauge
order: 5
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
| width |  _number_ | Setting the width of gauge range. Default using `'radius', 'innerRadius'` to calculate the width of range. |

<playground rid="gauge" path="progress-plots/gauge/demo/basic.ts"></playground>

#### type ✨

<description>**optional** _string_ _default_: `undefined`</description>

Display type of gauge. options: `meter`, default: `undefined`

#### meter ✨

<description>**optional** _object_</description>

It works when `type = 'meter'`. Properties are as followed:

| Properties | Type     | Description                  | Default |
| ------ | -------- | --------------------------------- | --------  |
| steps  | _number_ | The total step count  |  50         |
| stepRatio  | _number_ | 0 ~ 1. Represent the ratio between `step` and `gap`. `gap` is zero when `stepRatio` is setting to `1` | 0.5 |

<img src="https://gw.alipayobjects.com/zos/antfincdn/WBhwhNUzkg/image.png" width="400" align="center" style="display:flex;margin:0 auto;" alt="gauge">

#### gaugeStyle

<description>**optional** _StyleAttr | Function_</description>

Gauge graphic style.

`markdown:docs/common/shape-style.en.md`

### Plot Components

#### axis

<description>**optional** _object_</description>

Indicates auxiliary shaft styles.

`markdown:docs/common/axis.en.md`

#### indicator ✨

<description>**optional** _object_</description>

Dashboard indicator style configuration. Divided into components as follows:

- `pointer`：Pointer style configuration in a pointer
- `pin`：The disc style configuration in the indicator
- `shape`：Custom shape of indicator, used with the API `registerShape`. Default: `gauge-indicator` (Go to [gauge/shapes/indicator](https://github.com/antvis/g2plot/blob/master/plots/gauge/shapes/indicator.ts) see details.)

They all have the following configuration items:

| Properties | Type   | Description |
| ---------- | ------ | ----------- |
| style      | object | ShapeStyle  |

`markdown:docs/common/shape-style.en.md`

#### statistic

<description>**optional** _object_</description>

Metric central text component.

`markdown:docs/common/statistic.en.md`
