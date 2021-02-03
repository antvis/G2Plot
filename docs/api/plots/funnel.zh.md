---
title: 漏斗图
order: 9
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.zh.md`

#### compareField

<description>**optional** _string_</description>

对比字段。声明此字段时会自动渲染为对比漏斗图

#### seriesField

<description>**optional** _string_</description>

分组字段。声明此字段时会自动渲染为分组漏斗图

#### isTransposed

<description>**optional** _boolean_ _default:_ `false`</description>

是否转置。

#### meta

`markdown:docs/common/meta.zh.md`

### 图形样式

#### dynamicHeight

<description>**optional** _boolean_ _default:_ `false`</description>

是否映射为动态高度。


#### maxSize

<description>**optional** _number_ _default:_ `1`</description>

图形最大宽度，为 [0, 1] 之间小数，默认为 1。

注：因动态高度漏斗图将值映射为高度，因此声明 dynamicHeight: true 时，该字段无效


#### minSize

<description>**optional** _number_ _default:_ `1`</description>

图形最小宽度，为 [0, 1] 之间小数，默认为 0。

注：因动态高度漏斗图将值映射为高度，因此声明 dynamicHeight: true 时，该字段无效
#### conversionTag

<description>**optional** _false | object_</description>

配置转化率组件。

默认配置：`{offsetX: 10, offsetY: 0, formatter: (datum) => '转化率' + datum.$$percentage$$ * 100 + '%',}`。

`markdown:docs/common/color.zh.md`

### 图表组件

#### tooltip

`markdown:docs/common/tooltip.zh.md`

#### label

`markdown:docs/common/label.zh.md`

#### 图例

`markdown:docs/common/legend.zh.md`

#### annotations

`markdown:docs/common/annotations.zh.md`


### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`


### 图表主题

`markdown:docs/common/theme.zh.md`


### 静态变量

漏斗图提供静态变量，以方便用户在实际项目中的使用，包括


#### FUNNEL_CONVERSATION_FIELD

FUNNEL_CONVERSATION_FIELD 为数组，存储漏斗当前和上一项值，例如 [263, 151], 用户可由此计算转化率，例如:

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

