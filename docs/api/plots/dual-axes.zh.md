---
title: 双轴图
order: 6
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _Array<Record<string, any>[]>_</description>

设置图表数据源。数据源为二维数组，形式为[左轴图形对象集合，右轴图形对象集合]，例如：

```ts
const data = [[{ time: '1991'，value: 20 }], [{ time: '1992', count: 20 }]];
```

#### xField

<description>**required** _string_</description>

点形状在 x 方向位置映射对应的数据字段名，一般对应一个连续字段。例如`{xField: 'time'}`。

#### yField

<description>**required** _string[]_</description>

点形状在 y 方向位置映射所对应的数据字段名数组, 形式为[左轴图形数据字段名，右轴图形数据字段名]，例如 `{yField: ['value', 'count']}`。

#### meta

`markdown:docs/common/meta.zh.md`

使用示例：

```ts
{
  yField: ['value1', 'value2'],
  meta: {
    value1: {
      alias: '温度',
    },
    value2: {
      alias: '海拔'
    }
  }
}
```

### 图形样式

#### geometryOptions

<description>**optional** _array object_</description>

指定了双轴各自对应的图形配置，形式为[左轴图形配置，右轴图形配置]。每一个配置应为 Line 或 Column 类型的 Config。通过指定双轴对应图形，来实现混合图表功能:

- 双轴折线图: [Line, Line], 参考 [DEMO](/zh/examples/dual-axes/dual-line)
- 柱线混合图: [Column, Line], 参考 [DEMO](/zh/examples/dual-axes/column-line)

你还可以通过配置 Line 或 Column 的相关配置（见下文），形成双轴多折线图([DEMO](/zh/examples/dual-axes/dual-line#dual-multi-line)), 堆叠柱+折线图([DEMO](/zh/examples/dual-axes/stacked-column-line)), 分组柱+折线图([DEMO](/zh/examples/dual-axes/grouped-column-line))

折线对应的图形配置为：

| 细分配置项名称 | 类型                             | 功能描述                                                                       | 默认值 |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------ | ------ |
| geometry       | _string_                         | 图形类型，指定为'line'                                                         | 'line' |
| seriesField    | _string_                         | 拆分字段, 若存在则为多折线，具体用法同[折线图 seriesfield](/zh/docs/api/plots/line#seriesfield) |
| smooth         | _boolean_                        | 是否平滑，具体用法同[折线图 smooth](/zh/docs/api/plots/line#smooth)                             | false  |
| connectNulls   | _boolean_                        | 是否连接空数据，具体用法同[折线图 connectnulls](/zh/docs/api/plots/line#connectnulls)           | true   |
| lineStyle      | _StyleAttr \| Function_          | 折线图形样式，具体用法同[折线图 lineStyle](/zh/docs/api/plots/line#linestyle)                   |        |
| point          | _pointStyle_                     | 线数据点图形样式，具体用法同[折线图 point](/zh/docs/api/plots/line#point)                       |        |
| label          | _ContinueLegendLabelCfg_         | 折线图 label,具体用法同[折线图 label](/zh/docs/api/plots/line#label)                            |
| color          | _string \| string[] \| Function_ | 指定点的颜色。具体用法同[折线图 color](/zh/docs/api/plots/line#color)                           |

柱形对应的图形配置为：

| 细分配置项名称   | 类型                             | 功能描述                                                                                                                                        | 默认值 |
| ---------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| geometry         | _string_                         | 图形类型，应指定为'column'                                                                                                                      |        |
| seriesField      | _string_                         | 拆分字段, 在分组柱状图下同 groupField、colorField，在堆积柱状图下同 stackField、colorField ，具体参考[柱形图 seriesfield](/zh/docs/api/plots/column#seriesfield) |
| isGroup          | _boolean_                        | 是否分组柱形图，具体用法同[柱形图 isGroup](/zh/docs/api/plots/column#isgroup)                                                                                    | false  |
| isStack          | _boolean_                        | 是否堆积柱状图，具体用法同[柱形图 isStack](/zh/docs/api/plots/column#isstack)                                                                                    | false  |
| columnWidthRatio | _number_                         | 柱状图宽度占比 [0-1] ，具体用法同[柱形图 columnWidthRatio](/zh/docs/api/plots/column#columnwidthratio)                                                           |        |
| marginRatio      | _number_                         | 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用，具体用法同[柱形图 marginRatio](/zh/docs/api/plots/column#marginratio)                                            |        |
| columnStyle      | _StyleAttr \| Function_          | 柱子样式配置，具体用法同[柱形图 columnStyle](/zh/docs/api/plots/column#columnstyle)                                                                              |        |
| label            | _ContinueLegendLabelCfg_         | 柱形图 label,具体用法同[柱形图 label](/zh/docs/api/plots/column#label)                                                                                           |
| color            | _string \| string[] \| Function_ | 指定点的颜色。具体用法同[柱形图 color](/zh/docs/api/plots/column#color)                                                                                          |
| groupField       | _string_                         | 拆分字段，用于堆叠+分组柱图，拆分优先级高于 seriesField，isGroup: true 时会根据 groupField 进行分组。                                           | -      |

### 图表组件

#### 悬浮提示 - tooltip

`markdown:docs/common/tooltip.zh.md`

#### 坐标轴 - axis

xAxis、yAxis 配置相同，由于 DualAxes 是双轴， yAxis 类型是对象类型，形式为{左轴字段: 左轴配置，右轴字段: 右轴配置}。例如

```ts
{
  yField: ['pv', 'uv'],
  yAxis: {
    pv: {
      tickCount: 5
    },
    uv: {
      tickCount: 5
    }
  }
}
```

`markdown:docs/common/axis.zh.md`

#### annotations

xAxis、yAxis 配置相同，由于 DualAxes 是双轴， annotations 类型是对象类型，形式为{左轴字段: 左轴配置，右轴字段: 右轴配置}。例如

```ts
{
  yField: ['pv', 'uv'],
  yAxis: {
    pv: [
      {
        type: 'line',
        top: true,
        start: ['2020-08-26', 'min'],
        end: ['2020-08-26', 'max'],
        text: {
          content: '发布时间点',
          position: 'end',
          autoRotate: false,
          style: {
            textAlign: 'start',
          },
        },
      }
    ],
    uv: [
      {
        type: 'line',
        top: true,
        start: ['2020-08-26', 'min'],
        end: ['2020-08-26', 'max'],
        text: {
          content: '发布时间点',
          position: 'end',
          autoRotate: false,
          style: {
            textAlign: 'start',
          },
        },
      }
    ]
  }
}
```

`markdown:docs/common/annotations.zh.md`

#### 图例 - legend

`markdown:docs/common/legend.zh.md`

### 图表主题

`markdown:docs/common/theme.zh.md`

#### 缩略轴

`markdown:docs/common/slider.zh.md`

### 图表事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`
