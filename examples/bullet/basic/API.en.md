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

#### bulletStyle ✨

**可选**, _object_

功能描述： 设置子弹图样式。

默认配置： 无

| 细分配置 | 类型         | 功能描述     |
| -------- | ------------ | ------------ |
| range    | _BasicStyle_ | 区间背景样式 |
| measure  | _BasicStyle_ | 实际值样式   |
| target   | _BasicStyle_ | 目标值样式   |

```ts
type BasicStyle = {
  color?: string | string[] | ((...args: any[]) => string);
  style?: StyleAttr;
  size?: number;
};
```

`markdown:docs/common/shape-style.en.md`

### 图表组件

#### tooltip

`markdown:docs/common/tooltip.en.md`

#### label

`markdown:docs/common/label.en.md`

#### axis

xAxis、yAxis 配置相同。

`markdown:docs/common/axis.en.md`

#### legend

`markdown:docs/common/legend.en.md`

#### theme

`markdown:docs/common/theme.en.md`

### 事件

`markdown:docs/common/events.en.md`

### 图表方法

`markdown:docs/common/chart-methods.en.md`
