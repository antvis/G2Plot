---
title: Waterfall
order: 24
---

### Plot Container

<embed src="@/docs/common/chart-options.en.md"></embed>

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

<embed src="@/docs/common/xy-field.en.md"></embed>

#### meta

<embed src="@/docs/common/meta.en.md"></embed>

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

Falling color configuration.

#### columnWidthRatio

<description>**optional** _number_</description>

Width ratio of histogram [0-1].

#### waterfallStyle

<description>**optional** _StyleAttr | Function_</description>

Column style configuration.

<embed src="@/docs/common/color.en.md"></embed>

#### state

<description>**optional** _object_</description>

<embed src="@/docs/common/state-style.en.md"></embed>

### Plot Components

<embed src="@/docs/common/component.en.md"></embed>

### Plot Event

<embed src="@/docs/common/events.en.md"></embed>

### Plot Method

<embed src="@/docs/common/chart-methods.en.md"></embed>

### Plot Theme

<embed src="@/docs/common/theme.en.md"></embed>
