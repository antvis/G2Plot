---
title: 分面图
order: 9
---

分面（Facet）是指利用 G2 提供的 View 递归嵌套能力，将一份数据按照某个维度分隔成若干子集，然后创建一个图表的集合，将每一个数据子集绘制到图表矩阵的窗格中。

分面主要提供了两个功能：

1. 按照指定的维度划分数据集；
2. 对图表进行排版和布局。

对于探索型数据分析来说，分面是一个强大有力的工具，能帮我们快速地分析出数据各个子集模式的异同。目前 G2 内置的分面包括六种：rect、list、circle、tree、mirror 和 matrix，具体描述如下表所示：

| **分面类型** |                       **说明**                        |
| :----------: | :---------------------------------------------------: |
|     rect     | **默认类型**，指定 2 个维度作为行列，形成图表的矩阵。 |
|     list     |   指定一个维度，可以指定一行有几列，超出自动换行。    |
|    circle    |              指定一个维度，沿着圆分布。               |
|     tree     |  指定多个维度，每个维度作为树的一级，展开多层图表。   |
|    mirror    |             指定一个维度，形成镜像图表。              |
|    matrix    |             指定一个维度，形成矩阵分面。              |

具体 API 如下：

### 图表容器

#### width

<description>**optional** _number_ _default:_ `400`</description>

设置图表宽度。

#### height

<description>**optional** _number_ _default:_ `400`</description>

设置图表高度。

#### autoFit

<description>**optional** _boolean_ _default:_ `true`</description>

图表是否自适应容器宽高。当 `autoFit` 设置为 true 时，`width` 和 `height` 的设置将失效。

#### appendPadding

<description>**optional** _number[] | number_</description>

额外增加的 `appendPadding` 值，在 `padding` 的基础上，设置额外的 padding 数值，可以是单个数字 `16`，或者数组 `[16, 8, 16, 8]` 代表四个方向。

#### renderer

<description>**optional** _string_ _default:_ `canvas`</description>

设置图表渲染方式为 `canvas` 或 `svg`。

#### pixelRatio

<description>**optional** _number_ _default:_ `window.devicePixelRatio`</description>

设置图表渲染的像素比，和底层的 devicePixelRatio 含义一致，一般不用设置，除非在页面有整体 scale 的情况下，可以自定义。

#### limitInPlot

<description>**optional** _boolean_</description>

是否对超出坐标系范围的 Geometry 进行剪切。

### FacetCfg

#### FacetCfg.type

<description> _string_ **optional**</description> 可选项：'rect' | 'list' | 'circle' | 'tree' | 'mirror' | 'matrix';

分面类型。

| **分面类型** |                                                                    **说明**                                                                     |
| :----------: | :---------------------------------------------------------------------------------------------------------------------------------------------: |
|     rect     | **默认类型**，指定 2 个维度作为行列，形成图表的矩阵。矩形分面是 G2 的默认分面类型。支持一个或者两个维度的数据划分，按照先列后行的顺序进行配置。 |
|     list     |       指定一个维度，可以指定一行有几列，超出自动换行。水平列表分面可以通过设置 `cols` 属性来指定每行可显示分面的个数，超出时会自动换行。        |
|    circle    |                                                           指定一个维度，沿着圆分布。                                                            |
|     tree     |            指定多个维度，每个维度作为树的一级，展开多层图表。树形分面一般用于展示存在层次结构的数据，展示的是整体和部分之间的关系。             |
|    mirror    |                                                          指定一个维度，形成镜像图表。                                                           |
|    matrix    |                          指定一个维度，形成矩阵分面。矩阵分面主要对比数据中多个字段之间的关系，例如常见的散点矩阵图。                           |

#### FacetCfg.fields

<description> _string[]_ **optional**</description>

指定数据集划分依据的字段。

#### FacetCfg.padding

<description> _number | number[] | 'auto'_ **optional**</description>

每个 facet 的内边距，设置方式参考 css 盒模型。

#### FacetCfg.showTitle

<description> _boolean_ **optional**</description>

是否显示标题。

#### FacetCfg.title

<description> _FacetTitle_ **optional**</description>

标题样式。

`markdown:docs/common/facet-title.zh.md`

#### FacetCfg.cols

<description> _number_ **optional**</description>

指定每行可显示分面的个数，超出时会自动换行。适用于 <tag color="green" text="list 分面">list 分面</tag>

#### FacetCfg.line

<description> _Line_ **optional**</description>

适用于 <tag color="green" text="tree 分面">tree 分面</tag>

设置树线条的样式。_Line_ 配置如下：

| 参数名 | 类型                                     | 是否必选 | 默认值 | 描述         |
| ------ | ---------------------------------------- | -------- | ------ | ------------ |
| style  | [ShapeAttrs](/zh/docs/api/graphic-style) |          | -      | 线条样式     |
| smooth | boolean                                  |          | -      | 线条是否平滑 |

#### FacetCfg.transpose

<description> _boolean_ **optional** _default:_ `false`</description>

是否翻转，默认为 `false`。通过配置该值为 `true`，可以将镜像分面翻转。适用于 <tag color="green" text="mirror 分面">mirror 分面</tag>

#### FacetCfg.columnTitle

<description> _FacetTitle_ **optional**</description>

列标题的样式。适用于 <tag color="green" text="rect 分面">rect 分面</tag>、<tag color="green" text="matrix 分面">matrix 分面</tag>

`markdown:docs/common/facet-title.zh.md`

#### FacetCfg.rowTitle

<description> _FacetTitle_ **optional**</description>

行标题的样式。适用于 <tag color="green" text="rect 分面">rect 分面</tag>、 <tag color="green" text="matrix 分面">matrix 分面</tag>

`markdown:docs/common/facet-title.zh.md`

#### FacetCfg.eachView

<description> _ViewCallback_ **optional**</description>

使用回调函数配置每个 view 中具体的绘图表现，回调函数返回参数同 mix 图表的 plots 配置

```sign
type ViewCallback = (innerView: View, facet?: FacetData) => IPlot;
```

<playground path="facet/basic/demo/rect.ts" rid="facet-rect-plot"></playground>

其中 _FacetData_ 结构如下：

| 属性               | 类型       | 描述                                        |
| ------------------ | ---------- | ------------------------------------------- |
| type               | string     | 分面类型                                    |
| data               | object[]   | 当前分面子 view 的数据                      |
| region             | _Region_   | 当前分面子 view 的范围，_Region_ 结构见下面 |
| padding            | number     | 当前分面子 view 的 padding                  |
| view               | View       | 当前 facet 对应生成的 view                  |
| rowField           | string     | 分面行字段                                  |
| columnField        | string     | 分面列字段                                  |
| rowValue           | string     | 当前行分面的枚举值                          |
| columnValue        | string     | 当前列分面的枚举值                          |
| rowIndex           | number     | 当前行索引                                  |
| columnIndex        | number     | 当前列索引                                  |
| rowValuesLength    | number     | 当前行字段的枚举值长度                      |
| columnValuesLength | number     | 当前列字段的枚举值长度                      |
| children           | TreeData[] | 只有 tree 类型分面有，树 children 数据      |
| originColIndex     | number     | 只有 tree 类型分面有，原始数据列 index      |

### IPlot

`markdown:docs/common/plot-cfg.zh.md`

<!-- _IView_ 结构具体见下面详细介绍。

### IView

#### IView.data

<description>**optional** _array object_</description>

设置子 view 数据源。可选，默认按照 `fields` 划分数据集，进行数据分配。数据源为对象集合，例如：

```ts
const data = [
  { time: '1991'，value: 20 },
  { time: '1992'，value: 20 },
];
```

#### IView.geometries

<description>**可选** _array object_</description>

view 上的图形 geometry 及映射配置，具体见[图层图形](#图层图形)

`markdown:docs/common/common-iview.zh.md`

### 图层图形

`markdown:docs/common/geometry-cfg.zh.md` -->
