##### layout

<description>**optional** _horizontal | vertical_ </description>

图例布局方式。提供横向布局和纵向布局。

##### title

<description>**optional** _G2LegendTitleCfg_ </description>

图例标题配置，默认不展示。_G2LegendTitleCfg_ 配置如下：

| 参数名  | 类型     | 描述                                                         |
| ------- | -------- | ------------------------------------------------------------ |
| title   | _string_ | 文本显示内容                                                 |
| spacing | _number_ | 标题同图例项的间距                                           |
| style   | _object_ | 文本样式配置项，参考  [绘图属性](/zh/docs/api/graphic-style) |

##### position

<description>**optional** _string_ </description>

图例位置，可选项：'top', 'top-left', 'top-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-left', 'bottom-right'。

尝试一下：

<playground path="component/legend/demo/legend-position.jsx" rid="legend-position"></playground>

##### offsetX

<description>**optional** _number_ </description>

图例 x 方向的偏移。

##### offsetY

<description>**optional** _number_ </description>

图例 y 方向的偏移。

##### background

<description>**optional** _LegendBackgroundCfg_ </description>

背景框配置项。_LegendBackgroundCfg_ 配置如下：

| 参数名  | 类型                 | 描述                                                       |
| ------- | -------------------- | ---------------------------------------------------------- |
| padding | _number \| number[]_ | 背景的留白                                                 |
| style   | _ShapeAttr_          | 背景样式配置项, 参考[绘图属性](/zh/docs/api/graphic-style) |

##### flipPage

<description>**optional** _boolean_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，当图例项过多时是否进行分页。(⚠️ 暂不支持多行展示分页)

##### pageNavigator

<description>**optional** _object_ </description>

<!-- todo 补充分页器的图文介绍 -->

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例分页导航器的主题样式设置。_LegendPageNavigatorCfg_ 配置如下：

| 参数名       | 类型                       | 默认值 | 描述                    |
| ------------ | -------------------------- | ------ | ----------------------- |
| marker.style | _PageNavigatorMarkerStyle_ | -      | 分页器指示箭头 样式配置 |
| text.style   | _PageNavigatorTextStyle_   | -      | 分页器页面信息 样式配置 |

**_PageNavigatorMarkerStyle_** 配置如下：

| 参数名          | 类型     | 默认值 | 描述                                                             |
| --------------- | -------- | ------ | ---------------------------------------------------------------- |
| inactiveFill    | _string_ | -      | Fill color of arrow marker when unclickable (inactive status).   |
| inactiveOpacity | _number_ | -      | Fill opacity of arrow marker when unclickable (inactive status). |
| fill            | _string_ | -      | Default fill color of arrow marker (active status).              |
| opacity         | _number_ | -      | Default fill opacity of arrow marker (active status).            |
| size            | _number_ | -      | Size of arrow marker.                                            |

**_PageNavigatorTextStyle_** 配置如下：

| 参数名   | 类型     | 默认值 | 描述                               |
| -------- | -------- | ------ | ---------------------------------- |
| fill     | _string_ | -      | Font color of page navigator info. |
| fontSize | _number_ | -      | Font size of page navigator info.  |

示例：

```ts
pageNavigator: {
  marker: {
    style: {
      // 非激活，不可点击态时的填充色设置
      inactiveFill: '#000',
      inactiveOpacity: 0.45,
      // 默认填充色设置
      fill: '#000',
      opacity: 0.8,
      size: 12,
    },
  },
  text: {
    style: {
      fill: '#ccc',
      fontSize: 8,
    },
  },
},
```

##### itemHeight

<description>**optional** _number_ _default:_ `null`</description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例的高度, 默认为 null。

##### itemWidth

<description>**optional** _number_ _default:_ `null`</description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项的宽度, 默认为 null，自动计算。

##### itemName

<description>**optional** _LegendItemNameCfg_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项 name 文本的配置。_LegendItemNameCfg_ 配置如下：

| 参数名    | 类型       | 默认值  | 描述                                                                |
| --------- | ---------- | ------- | ------------------------------------------------------------------- |
| style     | _object_   | -       | 文本样式配置项，参考  [绘图属性](/zh/docs/api/graphic-style)        |
| spacing   | _number_   | `false` | 图例项 marker 同后面 name 的间距                                    |
| formatter | _function_ | -       | 格式化函数, `(text: string, item: ListItem, index: number) => any;` |

##### itemValue

<description>**optional** _LegendItemValueCfg_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项 value 附加值的配置项。_LegendItemValueCfg_ 配置如下：

| 参数名     | 类型       | 默认值  | 描述                                                                |
| ---------- | ---------- | ------- | ------------------------------------------------------------------- |
| style      | _object_   | -       | 文本样式配置项，详见  [绘图属性](/zh/docs/api/graphic-style)        |
| alignRight | _boolean_  | `false` | 是否右对齐，默认为 false，仅当设置图例项宽度时生效                  |
| formatter  | _function_ | -       | 格式化函数, `(text: string, item: ListItem, index: number) => any;` |

<playground path="component/legend/demo/legend-item-value.ts" rid="legend-item-value"></playground>

##### itemSpacing

<description>**optional** _number_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，控制图例项水平方向的间距。

##### label

<description>**optional** _ContinueLegendLabelCfg_ </description>

适用于 <tag color="cyan" text="连续图例">连续图例</tag>，文本的配置项。_ContinueLegendLabelCfg_ 配置如下：

| 参数名  | 类型     | 默认值 | 描述                                                                                                                                          |
| ------- | -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| align   | _string_ | -      | 文本同滑轨的对齐方式 <br/> - rail ： 同滑轨对齐，在滑轨的两端 <br/> - top, bottom: 图例水平布局时有效 <br/> - left, right: 图例垂直布局时有效 |
| style   | _object_ | -      | 文本样式配置项，详见  [绘图属性](/zh/docs/api/graphic-style)                                                                                  |
| spacing | _number_ | -      | 文本同滑轨的距离                                                                                                                              |

##### marker

<description>**optional** _MarkerCfg_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项的 marker 图标的配置。

`markdown:docs/common/marker.zh.md`

##### maxWidth

<description>**optional** _number_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项最大宽度设置。当 layout 等于 'horizontal' 时，生效，当图例项横向排布，超过最大宽度时，会结合 `flipPage: true` 进行分页。

##### maxHeight

<description>**optional** _number_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，图例项最大高度设置。当 layout 等于 'vertical' 时，生效，当图例项纵向排布，超过最大高度时，会结合 `flipPage: true` 进行分页。

##### reversed

<description>**optional** _boolean_ </description>

适用于 <tag color="green" text="分类图例">分类图例</tag>，是否将图例项逆序展示。

##### custom

<description>**optional** _boolean_ </description>

是否为自定义图例，当该属性为 true 时，需要声明 items 属性。

##### items

<description>**optional** _LegendItem[]_ </description>
适用于 <tag color="green" text="分类图例">分类图例</tag>，用户自己配置图例项的内容。_LegendItem_ 配置如下：

| 参数名 | 类型        | 是否必选 | 描述                     |
| ------ | ----------- | -------- | ------------------------ |
| id     | _string_    |          | 唯一值，用于动画或者查找 |
| name   | _string_    | required | 名称                     |
| value  | any         | required | 值                       |
| marker | _MarkerCfg_ |          | 图形标记                 |

`markdown:docs/common/marker.zh.md`

##### min

<description>**optional** _number_ </description>

适用于 <tag color="cyan" text="连续图例">连续图例</tag>，选择范围的最小值。

##### max

<description>**optional** _number_ </description>

适用于 <tag color="cyan" text="连续图例">连续图例</tag>，选择范围的最大值。

##### value

<description>**optional** _number[]_ </description>

适用于 <tag color="cyan" text="连续图例">连续图例</tag>，当前选中的范围。
##### slidable

<description>**optional** _boolean_  _default:_ `true`</description>

适用于 <tag color="cyan" text="连续图例">连续图例</tag>，滑块是否可以滑动。

##### rail

<description>**optional** _ContinueLegendRailCfg_ </description>

适用于 <tag color="cyan" text="连续图例">连续图例</tag>，图例滑轨（背景）的样式配置项。_ContinueLegendRailCfg_ 配置如下：

| 参数名        | 类型     | 描述                                                                             |
| ------------- | -------- | -------------------------------------------------------------------------------- |
| type          | _string_ | rail 的类型，color, size，默认：'color'                                                       |
| size          | _number_ | 滑轨的宽度                                                                       |
| defaultLength | _number_ | 滑轨的默认长度，默认：100。当限制了 maxWidth,maxHeight 时，不会使用这个属性会自动计算长度 |
| style         | _object_ | 滑轨的样式，参考 [绘图属性](/zh/docs/api/graphic-style)                          |

|**rail.type='color'**| **rail.type='size** |
|---|---|
|![color](https://gw.alipayobjects.com/zos/antfincdn/jwMUDJ63aN/72957823-0148-4b24-bbf4-c756959467d3.png)|![size](https://gw.alipayobjects.com/zos/antfincdn/t%26LwpJHUA6/52de13d5-b232-4efb-aacf-6d673778d92a.png)|

##### track

<description>**optional** _ContinueLegendTrackCfg_ </description>
适用于 <tag color="cyan" text="连续图例">连续图例</tag>，选择范围的色块样式配置项。_ContinueLegendTrackCfg_ 配置如下：

| 参数名 | 类型     | 默认值 | 描述                                                        |
| ------ | -------- | ------ | ----------------------------------------------------------- |
| style  | _object_ | -      | 选定范围的样式，参考 [绘图属性](/zh/docs/api/graphic-style) |

##### handler

<description>**optional** _ContinueLegendHandlerCfg_ </description>
适用于 <tag color="cyan" text="连续图例">连续图例</tag>，滑块的配置项。(暂不支持自定义)

_ContinueLegendHandlerCfg_ 配置如下：

| 参数名 | 类型     | 默认值 | 描述                                                        |
| ------ | -------- | ------ | ----------------------------------------------------------- |
| size   | _number_ | -      | 滑块的大小，默认：10                                                  |
| style  | _object_ | -      | 滑块的样式设置，参考 [绘图属性](/zh/docs/api/graphic-style) |

##### animate

<description>**optional** _boolean_ _default:_ `false`</description>

是否开启动画开关。

##### animateOption

<description>**optional** _ComponentAnimateOption_ </description>

动画参数配置，当且仅当 animate 属性为 true，即动画开启时生效。动画配置详情如下：

`markdown:docs/common/animate-option.zh.md`
