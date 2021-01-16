---
title: Bullet
order: 10
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{title: '满意度', ranges: [50,100], measures: [80], target: 85}]`。

`markdown:docs/common/meta.en.md`

```ts
const data = [
  {
    title: '满意度',
    ranges: [100],
    measures: [80],
    target: 85,
  },
];

const bulletPlot = new Bullet('container', {
  data,
  measureField: 'measures',
  rangeField: 'ranges',
  targetField: 'target',
  xField: 'title',
});

bulletPlot.render();
```

#### measureField 

<description>**required** _string[]_</description>

使用数据条的长度，实际数值的设置字段，表示实际数值。

#### rangeField 

<description>**required** _string[]_</description>

使用背景色条的长度的设置字段，表示区间范围。

#### targetField 

<description>**required** _string_</description>

使用测量标记的刻度轴位置的设置字段，表示目标值。

### Geometry Style

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

`markdown:docs/common/shape-style.en.md`

### Plot Components

#### label 

<description>**optional** _object_</description>

设置子弹图各图形 label 属性。

| 细分配置 | 类型                | 功能描述            | 默认配置 |
| -------- | ------------------- | ------------------- | -------- |
| range    | _GeometryLabelAttr_ | 区间的 label 属性   | 无       |
| measure  | _GeometryLabelAttr_ | 实际值的 label 属性 | true     |
| target   | _GeometryLabelAttr_ | 目标值的 label 属性 | 无       |

`markdown:docs/common/label.en.md`

#### tooltip

`markdown:docs/common/tooltip.en.md`

#### axis

Same for xAxis and yAxis.

`markdown:docs/common/axis.en.md`

#### legend

`markdown:docs/common/legend.en.md`
### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
