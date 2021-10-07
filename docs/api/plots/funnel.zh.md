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

#### meta

`markdown:docs/common/meta.zh.md`

### 图形样式

#### isTransposed

<description>**optional** _boolean_ _default:_ `false`</description>

是否转置。

#### shape

<description>**optional** _string_ `'funnel' ｜ 'pyramid'` </description>

漏斗图形状。shape 设置为 'pyramid' 时，漏斗图展示为尖底样式（形如：金字塔）。目前只在基础漏斗图中适用。不适用场景：

1. 在对比漏斗图（`compareField` 存在时）不适用
2. 设置 dynamicHeight: 'true' 时不适用，此时需要设置 shape 为空。

#### dynamicHeight

<description>**optional** _boolean_ _default:_ `false`</description>

是否映射为动态高度。当设置为 'true' 时，漏斗图每个条目（图表元素）的高度和 y 轴字段对应数值成正比。

#### maxSize

<description>**optional** _number_ _default:_ `1`</description>

图形最大宽度，为 [0, 1] 之间小数，默认为 1。

注：因动态高度漏斗图将值映射为高度，因此声明 dynamicHeight: true 时，该字段无效

#### minSize

<description>**optional** _number_ _default:_ `1`</description>

图形最小宽度，为 [0, 1] 之间小数，默认为 0。

注：因动态高度漏斗图将值映射为高度，因此声明 dynamicHeight: true 时，该字段无效

#### funnelStyle

<description>**可选** _object_</description>

漏斗图样式。可以直接传入 `ShapeStyle` 结构，也可以使用回调函数的方式，针对不同的数据，来返回不同的样式。对于 ShapeStyle 的数据结构，可以参考：

`markdown:docs/common/shape-style.zh.md`

### 图表组件

#### tooltip

`markdown:docs/common/tooltip.zh.md`

#### label

`markdown:docs/common/label.zh.md`

#### conversionTag

<description>**optional** _false | object_</description>

配置转化率组件。

默认配置：`{offsetX: 10, offsetY: 0, formatter: (datum) => '转化率' + datum[Funnel.PERCENT_FIELD] * 100 + '%',}`。

| 配置项    | 类型                                                 | 功能描述         |
| --------- | ---------------------------------------------------- | ---------------- |
| offsetX   | _number_                                             | x 偏移量         |
| offsetY   | _number_                                             | y 偏移量         |
| style     | _ShapeAttrs \| false_                                | 文本字体样式配置 |
| formatter | _string \| ((datum?: Datum, data?: Data) => string)_ | 文本内容格式化   |

样式配置类型请参考 [绘图属性](/zh/docs/api/graphic-style)

`markdown:docs/common/color.zh.md`

#### 图例

`markdown:docs/common/legend.zh.md`

#### annotations

详细配置见末尾各 Annotation 配置项说明：

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`

### 静态属性

漏斗图提供静态属性，以方便用户在实际项目中的使用.

#### 静态变量

| 字段 key 值           | 说明                                                                                |
| --------------------- | ----------------------------------------------------------------------------------- |
| `CONVERSATION_FIELD`  | 该字段对应数值为数组，存储漏斗当前和上一项值，例如 [263, 151], 用户可由此计算转化率 |
| `PERCENT_FIELD`       | 该字段对应数值代表的是当前数值和上一项值的转化率百分比                              |
| `TOTAL_PERCENT_FIELD` | 该字段对应数值代表的总转化率百分比                                                  |

**使用示例：**

```javascript
// 引用
import { Funnel } from '@antv/g2plot';

// 使用
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

> 注意：在最新版本中，您可以直接使用 `Funnel.CONVERSATION_FIELD` 来替代 `FUNNEL_CONVERSATION_FIELD`

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

<!-- 直接 三级导航展开 -->

`markdown:docs/common/annotations.zh.md`
