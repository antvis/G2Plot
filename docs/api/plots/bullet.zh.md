---
title: 子弹图
order: 10
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{title: '满意度', ranges: [50,100], measures: [80], target: 85}]`。

#### meta

`markdown:docs/common/meta.zh.md`

#### measureField 

<description>**required** _string_</description>

使用数据条的长度，实际数值的设置字段，表示实际数值。

#### rangeField 

<description>**required** _string_</description>

使用背景色条的长度的设置字段，表示区间范围。

#### targetField 

<description>**required** _string_</description>

使用测量标记的刻度轴位置的设置字段，表示目标值。

#### xField 

<description>**optional** _string_</description>

用于区分不同的类型，适用于分组子弹图。

### 图形样式

#### layout

<description>**optional** _'horizontal' | 'vertical'_ _default:_ 'horizontal'</description>

表示子弹图方向。

#### color 

<description>**optional** _object_</description>

设置子弹图各图形 color 属性。

| 细分配置 | 类型        | 功能描述     | 默认配置 |
| -------- | ----------- | ------------ | -------- |
| range    | _string\|string[]_ | 区间背景颜色 | 无       |
| measure  | _string\|string[]_ | 实际值颜色   | 无       |
| target   | _string\|string[]_ | 目标值颜色   | 无       |

#### size 

<description>**optional** _object_</description>

设置子弹图各图形 size 属性。

| 细分配置 | 类型       | 功能描述     | 默认配置 |
| -------- | ---------- | ------------ | -------- |
| range    | _SizeAttr_ | 区间背景样式 | 30       |
| measure  | _SizeAttr_ | 实际值样式   | 20       |
| target   | _SizeAttr_ | 目标值样式   | 20       |

```plain
type SizeAttr = number | [number, number] | ((datum: Datum) => number);
```

#### bulletStyle 

<description>**optional** _object_</description>

设置子弹图各图形 style 属性。

| 细分配置 | 类型        | 功能描述     | 默认配置             |
| -------- | ----------- | ------------ | -------------------- |
| range    | _StyleAttr_ | 区间背景样式 | { fillOpacity: 0.5 } |
| measure  | _StyleAttr_ | 实际值样式   | 无                   |
| target   | _StyleAttr_ | 目标值样式   | 无                   |

```plain
type StyleAttr = ShapeStyle | ((datum: object) => ShapeStyle);
```

`ShapeStyle` 结构可以参考：

`markdown:docs/common/shape-style.zh.md`

### 图表组件

#### label 

<description>**optional** _object_</description>

设置子弹图各图形 label 属性。

| 细分配置 | 类型                | 功能描述            | 默认配置 |
| -------- | ------------------- | ------------------- | -------- |
| range    | _GeometryLabelAttr_ | 区间的 label 属性   | 无       |
| measure  | _GeometryLabelAttr_ | 实际值的 label 属性 | true     |
| target   | _GeometryLabelAttr_ | 目标值的 label 属性 | 无       |

`markdown:docs/common/label.zh.md`

#### tooltip

`markdown:docs/common/tooltip.zh.md`

#### axis

xAxis、yAxis 配置相同（由于 DualAxes 是双轴， yAxis 类型是数组类型）。

`markdown:docs/common/axis.zh.md`

#### 图例

`markdown:docs/common/legend.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`
