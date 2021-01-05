---
title: 弦图
order: 28
---

### Plot Container

`markdown:docs/common/chart-options.zh.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ source: '北京', target: '天津', value: 30 }, ...]`。

#### sourceField

<description>**required** _string_</description>

设置弦图的来源节点数据字段。比如针对上述数据，就是： `source`。

#### targetField

<description>**required** _string_</description>

设置弦图的目标节点数据字段。比如针对上述数据，就是： `target`。

#### weightField

<description>**required** _string_</description>

设置节点与边的权重字段信息，数据越大，节点与边越大。比如针对上述数据，就是： `value`。

### Geometry Style

#### nodeStyle

<description>**optional** _StyleAttr | Function_</description>

弦图节点样式的配置。

#### edgeStyle

<description>**optional** _StyleAttr | Function_</description>

弦图边样式的配置。

`markdown:docs/common/color.zh.md`

#### nodeWidthRatio

<description>**optional** _number_</description>

弦图节点的宽度配置，0 ~ 1，参考画布的宽度，默认为 `0.05`。

#### nodePaddingRatio

<description>**optional** _number_</description>

弦图节点之间的间距，0 ~ 1，参考画布的高度，默认为 `0.1`。


### Event

`markdown:docs/common/events.zh.md`

### Plot Method

`markdown:docs/common/chart-methods.zh.md`

### Plot Theme

`markdown:docs/common/theme.zh.md`

### Plot Interactions
#### 默认交互

```plain
interactions: [{ type: 'element-active' }]
```

`markdown:docs/common/interactions.zh.md`
