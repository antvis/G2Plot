---
title: Funnel
order: 9
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### compareField

<description>**optional** _string_</description>

Field for comparing.

#### seriesField

<description>**optional** _string_</description>

Field for spliting.

#### meta

`markdown:docs/common/meta.en.md`

### Graphic Style

#### isTransposed

<description>**optional** _boolean_ _default:_ `false`</description>

Whether the plot is transposed.

#### shape

<description>**optional** _string_ `'funnel' ｜ 'pyramid'` </description>

漏斗图形状。shape 设置为 'pyramid' 时，漏斗图展示为尖底样式（形如：金字塔）。目前只在基础漏斗图中适用。不适用场景：

1. 在对比漏斗图（`compareField` 存在时）不适用
2. 设置 dynamicHeight: 'true' 时不适用，此时需要设置 shape 为空。

#### dynamicHeight

<description>**optional** _boolean_ _default:_ `false`</description>

Whether the height is dynamic. When set to `true`, the height of each elemnet in funnel plot is directly proportional to the corresponding value of yField.

#### maxSize

<description>**optional** _number_ _default:_ `1`</description>

the max size of graphic，is between 0 and 1, default 1。

Tip: when set dynamicHeight to be true, this field is invalid

#### minSize

<description>**optional** _number_ _default:_ `1`</description>

the min size of graphic，is between 0 and 1, default 0。

Tip: when set dynamicHeight to be true, this field is invalid

#### funnelStyle

<description>**optional** _object_</description>

Graphic style of funnel. You can either pass in the 'shapeStyle' structure directly, or you can use callbacks to return different styles for different data. For the ShapeStyle data structure, see:

`markdown:docs/common/shape-style.en.md`

### Plot Components

#### tooltip

`markdown:docs/common/tooltip.en.md`

#### label

`markdown:docs/common/label.en.md`

#### conversionTag

<description>**optional** _false | object_</description>

Configure the conversion rate component.

Defalut: `{offsetX: 10, offsetY: 0, formatter: (datum) => '转化率' + datum[Funnel.PERCENT_FIELD] * 100 + '%',}`。

| Properties | Type                                                 | Description            |
| ---------- | ---------------------------------------------------- | ---------------------- |
| offsetX    | _number_                                             | x 偏移量               |
| offsetY    | _number_                                             | y 偏移量               |
| style      | _ShapeAttrs \| false_                                | Text style             |
| formatter  | _string \| ((datum?: Datum, data?: Data) => string)_ | Text content formatter |

Please refer to the style configuration [ShapeAttrs](/en/docs/api/graphic-style)

`markdown:docs/common/color.en.md`

#### 图例

`markdown:docs/common/legend.en.md`

#### annotations

详细配置见：各 Annotation 配置项说明。

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Static Properties

Funnel plot provides static properties, makes it easy to use.

#### Static variables

| Field                 | Description                                                                                                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONVERSATION_FIELD`  | The corresponding value of this field is an array, stores the current and previous values of the funnel, for example, [263, 151], from which the user can calculate the conversion rate |
| `PERCENT_FIELD`       | The corresponding value of this field represents the `conversion percentage` between current value and previous value                                                                   |
| `TOTAL_PERCENT_FIELD` | The corresponding value of this field represents the percentage of total conversion rate                                                                                                |

**Example:**

```javascript
import { Funnel } from '@antv/g2plot';

// usage
{
  conversionTag: {
    formatter: (datum) => {
      return `${(datum[Funnel.CONVERSATION_FIELD][1] / datum[Funnel.CONVERSATION_FIELD][0] * 100).toFixed(2)}%`;
    },
  },
  label: {
    formatter: (datum) => {
      return `${(datum[Funnel.PERCENT_FIELD] * 100).toFixed(2)}%`;
    }
  }
}
```

#### FUNNEL_CONVERSATION_FIELD

> Attention: you can use `Funnel.CONVERSATION_FIELD` to replace `FUNNEL_CONVERSATION_FIELD` in the latest version.

FUNNEL_CONVERSATION_FIELD is an array, stores the current and previous values of the funnel, for example, [263, 151], from which the user can calculate the conversion rate, for example:

```javascript
// 引用
import { FUNNEL_CONVERSATION_FIELD } from '@antv/g2plot';

// 使用
{
  conversionTag: {
    formatter: (datum) => {
      return (datum[FUNNEL_CONVERSATION_FIELD][1] / datum[FUNNEL_CONVERSATION_FIELD][0]).toFixed(2);
    },
  },
}
```

<!-- 直接 三级导航展开 -->

`markdown:docs/common/annotations.zh.md`
