
##### layout

<description>**optional** _horizontal | vertical_ </description>

布局方式

##### position

<description>**optional** _string_ </description>

图例的位置，可选项：

- `top`
- `top-left`
- `top-right`
- `right`
- `right-top`
- `right-bottom`
- `left`
- `left-top`
- `left-bottom`
- `bottom`
- `bottom-left`
- `bottom-right`

##### background

<description>**optional** _LegendBackgroundCfg_ </description>

背景框配置项。_LegendBackgroundCfg_ 配置如下：

| 参数名  | 类型                | 默认值 | 描述           |
| ------- | ------------------- | ------ | -------------- |
| padding | number \| number[]  | -      | 背景的留白     |
| style   | object 参考绘图属性 | -      | 背景样式配置项 |

##### flipPage

<description>**optional** _boolean_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，当图例项过多时是否进行分页。

##### handler

<description>**optional** _ContinueLegendHandlerCfg_ </description>
适用于 <tag color="cyan" text="连续图例">连续图例</tag>，滑块的配置项。_ContinueLegendHandlerCfg_ 配置如下：

| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| size | _number_ | - | 滑块的大小 |
| style | _object_ | - | 滑块的样式设置，参考 [绘图属性](../graphic-style) |

##### itemHeight

<description>**optional** _number_ _default:_ `null`</description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例的高度, 默认为 null。

##### itemWidth

<description>**optional** _number_ _default:_ `null`</description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项的宽度, 默认为 null，自动计算。

##### itemName

<description>**optional** _LegendItemNameCfg_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项 name 文本的配置。_LegendItemNameCfg_ 配置如下：

| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| style | _object_ | - | 文本样式配置项，参考 [绘图属性](../graphic-style) |
| spacing | _number_ | `false` | 图例项 marker 同后面 name 的间距 |
| formatter | _function_ | - | 格式化函数, `(text: string, item: ListItem, index: number) => any;` |

##### itemSpacing

<description>**optional** _number_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，控制图例项水平方向的间距。

##### itemValue

<description>**optional** _LegendItemValueCfg_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项 value 附加值的配置项。_LegendItemValueCfg_ 配置如下：

| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| style | _object_ | - | 文本样式配置项，详见 [绘图属性](../graphic-style) |
| alignRight | _boolean_ | `false` | 是否右对齐，默认为 false，仅当设置图例项宽度时生效 |
| formatter | _function_ | - | 格式化函数, `(text: string, item: ListItem, index: number) => any;` |

##### animate

<description>**optional** _boolean_ </description>

是否开启动画开关。

##### animateOption

<description>**optional** _ComponentAnimateOption_ </description>

动画参数配置，当且仅当 animate 属性为 true，即动画开启时生效。动画配置详情点击 [ComponentAnimateOption](animate-option) 查看。

##### label

<description>**optional** _ContinueLegendLabelCfg_ </description>

适用于 <tag color="cyan" text="连续图例">连续图例</tag>，文本的配置项。_ContinueLegendLabelCfg_ 配置如下：

| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| align | _string_ | - | 文本同滑轨的对齐方式 <br/> - rail ： 同滑轨对齐，在滑轨的两端 <br/> - top, bottom: 图例水平布局时有效 <br/> - left, right: 图例垂直布局时有效 |
| style | _object_ | - | 文本样式配置项，详见 [绘图属性](../graphic-style) |
| spacing | _number_ | - | 文本同滑轨的距离 |

##### marker

<description>**optional** _MarkerCfg_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项的 marker 图标的配置。

`markdown:docs/common/marker.zh.md`

##### min

<description>**optional** _number_ </description>

适用于 <tag color="cyan" text="连续图例">连续图例</tag>，选择范围的最小值。

##### max

<description>**optional** _number_ </description>

适用于 <tag color="cyan" text="连续图例">连续图例</tag>，选择范围的最大值。

##### maxWidth

<description>**optional** _number_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项最大宽度设置。

##### maxHeight

<description>**optional** _number_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项最大高度设置。

##### offsetX

<description>**optional** _number_ </description>

图例 x 方向的偏移。

##### offsetY

<description>**optional** _number_ </description>

图例 y 方向的偏移。

##### rail

<description>**optional** _ContinueLegendRailCfg_ </description>
适用于 <tag color="green" text="分类图例">分类图例</tag>，图例滑轨（背景）的样式配置项。_ContinueLegendRailCfg_ 配置如下：

| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | _string_ | - | rail 的类型，color, size |
| size | _number_ | - | 滑轨的宽度 |
| defaultLength | _number_ | - | 滑轨的默认长度，，当限制了 maxWidth,maxHeight 时，不会使用这个属性会自动计算长度 |
| style | _object_ | - | 滑轨的样式，参考 [绘图属性](../graphic-style) |
##### reversed

<description>**optional** _boolean_ </description>
适用于 <tag color="green" text="分类图例">分类图例</tag>，是否将图例项逆序展示。

##### slidable

<description>**optional** _boolean_ </description>
适用于 <tag color="cyan" text="连续图例">连续图例</tag>，滑块是否可以滑动。

##### title

<description>**optional** _G2LegendTitleCfg_ </description>

图例标题配置，默认不展示。_G2LegendTitleCfg_ 配置如下：

| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| spacing | _number_ | - | 标题同图例项的间距 |
| style | _object_ | - | 文本样式配置项，参考 [绘图属性](../graphic-style) |

##### track

<description>**optional** _ContinueLegendTrackCfg_ </description>
适用于 <tag color="cyan" text="连续图例">连续图例</tag>，选择范围的色块样式配置项。_ContinueLegendTrackCfg_ 配置如下：

| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| style | _object_ | - | 选定范围的样式，参考 [绘图属性](../graphic-style) |

##### values

<description>**optional** _number[]_ </description>
适用于 <tag color="cyan" text="连续图例">连续图例</tag>，选择的值。

##### custom

<description>**optional** _boolean_ </description>

是否为自定义图例，当该属性为 true 时，需要声明 items 属性。

##### items

<description>**optional** _LegendItem[]_ </description>
适用于 <tag color="green" text="分类图例">分类图例</tag>，用户自己配置图例项的内容。_LegendItem_ 配置如下：

| 参数名 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| id | _string_ |  | 唯一值，用于动画或者查找 |
| name | _string_ | required | 名称 |
| value | any | required | 值 |
| marker | _MarkerCfg_ |  | 图形标记 |

`markdown:docs/common/marker.zh.md`
