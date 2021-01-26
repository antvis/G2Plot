---
title: Chord
order: 28
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the chart data source. The data source is a collection of objects, for example：`[{ source: '北京', target: '天津', value: 30 }, ...]`。

#### sourceField

<description>**required** _string_</description>

Sets the source node data field for the chord chart. For example, for the above data, it is： `source`。

#### targetField

<description>**required** _string_</description>

Sets the target node data field of the chord graph. For example, for the above data, it is： `target`。

#### weightField

<description>**required** _string_</description>

Set the weight field information of nodes and edges. The larger the data, the larger the nodes and edges. For example, for the above data, it is： `value`。

### Geometry Style

#### nodeStyle

<description>**optional** _StyleAttr | Function_</description>

Configuration of chord graph node styles.

#### edgeStyle

<description>**optional** _StyleAttr | Function_</description>

Configuration of chord graph edge styles.

`markdown:docs/common/color.en.md`

#### nodeWidthRatio

<description>**optional** _number_</description>

弦图节点的宽度配置，0 ~ 1，参考画布的宽度，默认为 `0.05`。

#### nodePaddingRatio

<description>**optional** _number_</description>

弦图节点之间的间距，0 ~ 1，参考画布的高度，默认为 `0.1`。

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Plot Interactions

#### 默认交互

```plain
interactions: [{ type: 'element-active' }]
```

`markdown:docs/common/interactions.en.md`
