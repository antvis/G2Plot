## 配置属性

### 图表容器

`markdown:docs/common/chart-options.en.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/meta.en.md`

```ts
const data = [
  { country: 'Asia', year: '1750', value: 502,},
  { country: 'Asia', year: '1800', value: 635,},
  { country: 'Europe', year: '1750', value: 163,},
  { country: 'Europe', year: '1800', value: 203,},
];

const piePlot = new Pie('container', {
  data,
  // highlight-start
  meta: {
    country: {
      alias:'国家'
      range: [0, 1],
    },
    value: {
      alias: '数量',
      formatter:(v)=>{return `${v}个`}
    }
  },
  // highlight-end
  angleField: 'value',
  colorField: 'country',
});
piePlot.render();
```

#### angleField 📌

**必选**, _string_

功能描述： 扇形切片大小（弧度）所对应的数据字段名。。

默认配置： 无

#### colorField 📌

**可选**, _string_

功能描述： 扇形颜色映射对应的数据字段名。

默认配置： 无

### 图形样式

#### radius ✨

**可选**, _number_

功能描述： 饼图的半径，原点为画布中心。配置值域为 [0,1]，0 代表饼图大小为 0，即不显示，1 代表饼图撑满绘图区域。

`markdown:docs/common/color.en.md`

#### pieStyle ✨

**可选**, _object_

功能描述： 设置扇形样式。pieStyle 中的`fill`会覆盖 `color` 的配置。pieStyle 可以直接指定，也可以通过 callback 的方式，根据数据为每个扇形切片指定单独的样式。

默认配置： 无

`markdown:docs/common/shape-style.en.md`

### 图表组件

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*93XzToUe1OQAAAAAAAAAAABkARQnAQ" width="600">

### 图表组件

#### tooltip

`markdown:docs/common/tooltip.en.md`

#### label ✨

功能描述： 标签文本

[DEMO1](../../pie/basic#basic)
[DEMO2](../../pie/basic#outer-label)

`markdown:docs/common/label.en.md`

#### legend

`markdown:docs/common/legend.en.md`

#### theme

`markdown:docs/common/theme.en.md`

### 事件

`markdown:docs/common/events.en.md`

### 图表方法

`markdown:docs/common/chart-methods.en.md`
