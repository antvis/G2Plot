## 配置属性

### 图表容器

`markdown:docs/common/chart-options.en.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{title: '满意度', ranges: [50,100], measures: [80], target: 85}]`。

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

#### measureField 📌

**必选**, _number[]_

功能描述： 使用数据条的长度，实际数值的设置字段，表示实际数值。

默认配置： 无

#### rangeField 📌

**必选**, _number[]_

功能描述： 使用背景色条的长度的设置字段，表示区间范围。

默认配置： 无

#### targetField 📌

**必选**, _number_

功能描述： 使用测量标记的刻度轴位置的设置字段，表示目标值。

默认配置： 无

#### layout

**可选**, _'horizontal' | 'vertical'_

功能描述： 表示子弹图方向。

默认配置： 'horizontal'

### 图形样式

#### style ✨

**可选**, _object_

功能描述： 设置子弹图各图形 style 属性。

默认配置： 无

| 细分配置 | 类型        | 功能描述     | 默认配置             |
| -------- | ----------- | ------------ | -------------------- |
| range    | _StyleAttr_ | 区间背景样式 | { fillOpacity: 0.5 } |
| measure  | _StyleAttr_ | 实际值样式   | 无                   |
| target   | _StyleAttr_ | 目标值样式   | 无                   |

`markdown:docs/common/shape-style.zh.md`

### color ✨

**可选**, _object_

功能描述： 设置子弹图各图形 color 属性。

默认配置： 无

| 细分配置 | 类型        | 功能描述     | 默认配置 |
| -------- | ----------- | ------------ | -------- |
| range    | _colorAttr_ | 区间背景颜色 | 无       |
| measure  | _colorAttr_ | 实际值颜色   | 无       |
| target   | _colorAttr_ | 目标值颜色   | 无       |

`markdown:docs/common/color.zh.md`

### size ✨

**可选**, _object_

功能描述： 设置子弹图各图形 size 属性。

默认配置： 无

| 细分配置 | 类型       | 功能描述     | 默认配置 |
| -------- | ---------- | ------------ | -------- |
| range    | _SizeAttr_ | 区间背景样式 | 30       |
| measure  | _SizeAttr_ | 实际值样式   | 20       |
| target   | _SizeAttr_ | 目标值样式   | 20       |

```plain
type SizeAttr = number | [number, number] | ((datum: Datum) => number);

```

### label ✨

**可选**, _object_

功能描述： 设置子弹图各图形 label 属性。

默认配置： 无

| 细分配置 | 类型                | 功能描述            | 默认配置 |
| -------- | ------------------- | ------------------- | -------- |
| range    | _GeometryLabelAttr_ | 区间的 label 属性   | 无       |
| measure  | _GeometryLabelAttr_ | 实际值的 label 属性 | true     |
| target   | _GeometryLabelAttr_ | 目标值的 label 属性 | 无       |

`markdown:docs/common/label.en.md`

### 图表组件

`markdown:docs/common/component.en.md`
