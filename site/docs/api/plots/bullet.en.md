---
title: Bullet
order: 10
---

### Plot Container

<embed src="@/docs/common/chart-options.en.md"></embed>

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{title: '满意度', ranges: [50,100], measures: [80], target: 85}]`。

#### meta

<embed src="@/docs/common/meta.en.md"></embed>

#### measureField

<description>**required** _string_</description>

Use the length of the data bar, the setting field for the actual value, to represent the actual value.

#### rangeField

<description>**required** _string_</description>

Use the setting field for the length of the background bar to represent the range.

#### targetField

<description>**required** _string_</description>

Use a setting field for the position of the scale axis of the measurement mark to represent the target value.

#### xField

<description>**optional** _string_</description>

Used to distinguish different types, suitable for grouping bullet diagrams.

### Geometry Style

#### layout

<description>**optional** _'horizontal' | 'vertical'_ _default:_ 'horizontal'</description>

Represents the direction of the bullet diagram.

#### color

<description>**optional** _object_</description>

Set color property of each graph of bullet map.

| Properties | Type               | Description               | Default |
| ---------- | ------------------ | ------------------------- | ------- |
| range      | _string\|string[]_ | Interval background color | -       |
| measure    | _string\|string[]_ | Actual value color        | -       |
| target     | _string\|string[]_ | Target value color        | -       |

#### size

<description>**optional** _object_</description>

Set the size property of each graph of bullet map.

| Properties | Type       | Description               | Default |
| ---------- | ---------- | ------------------------- | ------- |
| range      | _SizeAttr_ | Interval Background Style | 30      |
| measure    | _SizeAttr_ | Actual value style        | 20      |
| target     | _SizeAttr_ | Target value styles       | 20      |

```plain
type SizeAttr = number | [number, number] | ((datum: Datum) => number);
```

#### bulletStyle

<description>**optional** _object_</description>

Set the style properties of each bullet map.

| Properties | Type        | Description               | Default              |
| ---------- | ----------- | ------------------------- | -------------------- |
| range      | _StyleAttr_ | Interval Background Style | { fillOpacity: 0.5 } |
| measure    | _StyleAttr_ | Actual value style        | -                    |
| target     | _StyleAttr_ | Target value styles       | -                    |

```plain
type StyleAttr = ShapeStyle | ((datum: object) => ShapeStyle);
```

`ShapeStyle` The structure can be referred to:

<embed src="@/docs/common/shape-style.en.md"></embed>

### Plot Components

#### label

<description>**optional** _object_</description>

Set the label attribute of each graph of the bullet map.

| Properties | Type                | Description                             | Default |
| ---------- | ------------------- | --------------------------------------- | ------- |
| range      | _GeometryLabelAttr_ | The label attribute of the range        | -       |
| measure    | _GeometryLabelAttr_ | The label attribute of the actual value | true    |
| target     | _GeometryLabelAttr_ | The label attribute of the target value | -       |

<embed src="@/docs/common/label.en.md"></embed>

#### tooltip

<embed src="@/docs/common/tooltip.en.md"></embed>

#### axis

Same for xAxis and yAxis.

<embed src="@/docs/common/axis.en.md"></embed>

#### legend

<embed src="@/docs/common/legend.en.md"></embed>

### Plot Event

<embed src="@/docs/common/events.en.md"></embed>

### Plot Method

<embed src="@/docs/common/chart-methods.en.md"></embed>

### Plot Theme

<embed src="@/docs/common/theme.en.md"></embed>
