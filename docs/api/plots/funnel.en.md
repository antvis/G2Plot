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

#### isTransposed

<description>**optional** _boolean_ _default:_ `false`</description>

Whether the plot is transposed.

`markdown:docs/common/meta.en.md`

### Graphic Style

#### dynamicHeight

<description>**optional** _boolean_ _default:_ `false`</description>

Whether the height is dynamic.

#### maxSize

<description>**optional** _number_ _default:_ `1`</description>

the max size of graphic，is between 0 and 1, default 1。

Tip: when set dynamicHeight to be true, this field is invalid 

#### minSize

<description>**optional** _number_ _default:_ `1`</description>

the min size of graphic，is between 0 and 1, default 0。

Tip: when set dynamicHeight to be true, this field is invalid 

#### conversionTag

<description>**optional** _false | object_</description>

Configure the conversion rate component.

Defalut: `{offsetX: 10, offsetY: 0, formatter: (datum) => '转化率' + datum.$$percentage$$ * 100 + '%',}`。

`markdown:docs/common/color.en.md`

### Plot Components

#### tooltip

`markdown:docs/common/tooltip.en.md`

#### label

`markdown:docs/common/label.en.md`

#### 图例

`markdown:docs/common/legend.en.md`

#### annotations

`markdown:docs/common/annotations.en.md`


### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`


### 静态变量

Funnel plot provides static variables, such as:


#### FUNNEL_CONVERSATION_FIELD

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

