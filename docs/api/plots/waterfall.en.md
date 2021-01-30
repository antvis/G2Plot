---
title: Waterfall
order: 24
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### meta

`markdown:docs/common/meta.en.md`

### Higher Configuration

#### labelMode

<description>**optional** _string_ _default:_ `difference`</description>

Label data mode, optional values: 'absolute' (absolute value of data), 'difference' (relative difference of data).

#### total

<description>**optional** _false|object_</description>

Whether to display totals (automatic statistics, add a column with totals).

Default configuration:

| Properties | Type     | Required | Default                           | Description                            |
| :--------- | -------- | -------- | --------------------------------- | -------------------------------------- |
| label      | _string_ | false    | Total                             | Total value of the column label        |
| style      | _object_ | false    | `{ fill: 'rgba(0, 0, 0, 0.25)' }` | Total value column style configuration |

#### leaderLine

<description>**optional** _false | object_</description>

Whether to show leader line.

Default configuration:

| Properties | Type     | Required | Default                                               | Description                     |
| :--------- | -------- | -------- | ----------------------------------------------------- | ------------------------------- |
| style      | _object_ | false    | `{ lineWidth: 1, stroke: '#8c8c8c', lineDash: [4, 2]` | Leader line style configuration |

### Geometry Style

#### risingFill

<description>**optional** _number_ _default:_ `#f4664a`</description>

Rising color configuration.

#### fallingFill

<description>**optional** _number_ _default:_ `#30bf78`</description>

Drop color configuration.

#### columnWidthRatio

<description>**optional** _number_</description>

Width ratio of histogram [0-1].

#### waterfallStyle

<description>**optional** _StyleAttr | Function_</description>

Column style configuration.

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
