---
title: 大数据量
order: 0
---

### 图表容器

#### width

<description>**可选** _number_ _default:_ `800`</description>

设置图表宽度。

#### height

<description>**可选** _number_ _default:_ `400`</description>

设置图表高度。

#### padding

<description>**可选** _number[] | number_ </description>

画布的 `padding` 值，代表图表在上右下左的间距，可以为单个数字 `16`，或者数组 `[16, 8, 16, 8]` 代表四个方向。

#### autoFit

<description>**可选** boolean _default:_ `false`</description>

图表是否自适应容器宽高。当 `autoFit` 设置为 true 时，`width` 和 `height` 的设置将失效。

### 数据映射

#### data

<description>**必选** _array object_</description>

设置图表数据源。数据源为对象集合，例如：

```ts
const data = [
  {
    "name": "aa.us.txt",
    "date": "2005-03-01",
    "open": 67.042,
    "high": 67.421,
    "close": 65.875,
    "volume": 2386346
  },
  {
    "name": "aa.us.txt",
    "date": "2005-03-28",
    "open": 63.39,
    "high": 63.974,
    "close": 62.68,
    "volume": 2156071
  },
  {
    "name": "aa.us.txt",
    "date": "2005-04-22",
    "open": 60.865,
    "high": 62.196,
    "close": 60.511,
    "volume": 2963954
  },
  ...
];
```

#### xField

<description>**必选** _string_</description>

图形在 x 方向对应的数据字段名，一般是横向的坐标轴对应的字段。比如：要看不同班级的人数情况，那么班级字段就是对应的 xField。

#### yField

<description>**必选** _string_</description>

图形在 y 方向对应的数据字段名，一般是纵向的坐标轴对应的字段。比如：要看不同班级的人数情况，那么人数字段就是对应的 yField。

#### seriesField

<description>**可选** _string_</description>

分组字段。用于同时看一个维度中不同情况的指标需求。比如：我们看不同大区最近 30 天的销售额趋势情况，那么这里的大区字段就是 seriesField。

#### meta

<description>**可选** _object_</description>

全局化配置图表数据元信息，以字段为单位进行配置，来定义数据的类型和展示方式。在 meta 上的配置将同时影响所有组件的文本信息。

| 细分配置项名称 | 类型       | 功能描述                                    |
| -------------- | ---------- | ------------------------------------------- |
| type          | _string_   | 度量类型：'linear'、'time'、'cat'、'timeCat'等 |
| alias          | _string_   | 字段的别名    |
| values         | _any[]_ | 枚举该字段下所有值，即输入域     |
| range          | _number[]_ | 字段的数据映射区间，即值域，默认为[0,1]  |
| formatter      | _function_ | callback 方法，对该字段所有值进行格式化处理 |
| min      | _any_ | 定义域的最小值, 分类型下无效。  |
| max      | _any_ | 定义域的最大值, 分类型下无效。 |
| nice      | _boolean_ | 自动调整 min、max 。默认为 true |

关于 `meta` 的更多配置项，请查看 [Meta Options](/zh/docs/api/options/meta)

### 图表组件

#### axis

<description>**可选** _object_</description>

xAxis、yAxis 配置相同。

##### top

<description>**可选** _boolean_  _default:_ `false`</description>

是否渲染在画布顶层，防止部分图形中，需要将 axis 显示在图形上面，避免被图形遮挡。

##### position

<description>**可选** _`top` | `bottom` | `left` | `right`_</description>

适用于直角坐标系，设置坐标轴的位置。

##### title

<description>**可选** _object_</description>

标题的配置项，null 表示不展示。

| 细分配置项名称 | 类型         | 功能描述                                                  |
| -------------- | ------------ | --------------------------------------------------------- |
| text           | _string_     | 坐标轴标题                                                |
| position       | _string_     | 轴标题的位置，默认：'center'。可选项： start, center, end |
| offset         | _number_     | 标题距离坐标轴的距离                                      |
| spacing        | _number_     | 标题距离坐标轴文本的距离                                  |
| style          | _shapeStyle_ | 标题文本配置项                                            |
| autoRotate     | _boolean_    | 是否自动旋转                                              |

**_shapeStyle_**

`markdown:docs/common/shape-style.zh.md`

##### label

<description> **可选** _AxisLabelCfg | null_</description>

文本标签的配置项，null 表示不展示。_AxisLabelCfg_ 配置如下：

| 参数名       | 类型                                                     | 默认值  | 描述                     |
| ------------ | -------------------------------------------------------- | ------- | ------------------------ |
| offset       | _number_                                                 | -       | label 的偏移量           |
| rotate       | _number_                                                 | -       | 文本旋转角度             |
| autoRotate   | _boolean \|avoidCallback_             | `true`  | 是否自动旋转             |
| autoHide     | _boolean \|avoidCallback \| { type:string,cfg?:AxisLabelAutoHideCfg }_   | `false` | 是否自动隐藏，当标签重叠时             |
| autoEllipsis | _boolean \|avoidCallback \|string_                                                | `false` | 是否自动省略             |
| formatter    | _`(text: string, item: ListItem, index: number) => any`_ | `false` | 格式化函数               |
| style        | _[ShapeAttrs](/zh/docs/api/graphic-style)_               | -       | 坐标轴刻度线的样式配置项 |

**_avoidCallback_** 类型定义如下：

```ts
type avoidCallback = (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean;
```

**_AxisLabelAutoHideCfg_** 类型定义如下：

```ts
interface AxisLabelAutoHideCfg {
  /** 最小间距配置 */
  minGap?: number;
}
```

##### verticalFactor

<description>**可选** _number_</description>

标记坐标轴 label 的方向，左侧为 1，右侧为 -1（仅适用于垂直方向的坐标轴）

##### verticalLimitLength

<description>**optional** _number_</description>

配置坐标轴垂直方向的最大限制长度，对文本自适应有很大影响。




