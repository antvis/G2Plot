---
title: 图例
order: 2
---

`markdown:docs/styles/component.md`

图例（legend）是图表的辅助元素，使用颜色、大小、形状区分不同的数据类型，用于图表中数据的筛选。

前往墨者学院 [AntV 设计 | 图例 Legend](https://www.yuque.com/mo-college/vis-design/hcs9p2) 查看**设计指引**。 

#### 使用方式

<b>配置图例有两种方式：</b>

第一种，传入 `false` 设置关闭图例。

```ts
legend: false; // 关闭图例
```

第二种，传入 _LegendCfg_ 对图例进行整体配置。


```ts
legend: {
  layout: 'horizontal',
  position: 'right'
}
```

#### 配置项（_LegendCfg_）

| 属性 | 类型 | 默认值 | 描述 | 适用于 |
| --- | --- | --- | --- | --- |
| layout | _string_ | horizontal | 图例的布局方式，可选项：_horizontal \| vertical_ |  |
| title | _object_ | - | 图例标题配置，默认不展示。详见 [title 配置](#title) |  |
| position | _string_ | - | 图例的位置。详见 [position 配置](#position) |  |
| offsetX | _number_ | - | 图例 x 方向的偏移。 |  |
| offsetY | _number_ | - | 图例 y 方向的偏移。 |  |
| background | _object_ | - | 背景框配置项。详见 [background 配置](#background) |  |
| flipPage | _boolean_ | false | 当图例项过多时是否进行分页。 | <tag color="green" text="分类图例">分类图例</tag> |
| itemWidth | _number \| null_ | null | 图例项的宽度, 默认为 null（自动计算）。 | <tag color="green" text="分类图例">分类图例</tag> |
| itemHeight | _number \| null_ | null | 图例的高度, 默认为 null。 | <tag color="green" text="分类图例">分类图例</tag> |
| itemName | _object_ | - | 图例项 name 文本的配置。详见 [itemName 配置](#itemname) | <tag color="green" text="分类图例">分类图例</tag> |
| itemValue | _object_ | - | 图例项 value 附加值的配置项。详见 [itemValue 配置](#itemvalue)。 | <tag color="green" text="分类图例">分类图例</tag> |
| itemSpacing | _number_ | - | 控制图例项水平方向的间距 | <tag color="green" text="分类图例">分类图例</tag> |
| animate | _boolean_ | - | 是否开启动画开关。 |  |
| animateOption | _object_ | - | 动画参数配置，当且仅当 animate 属性为 true，即动画开启时生效，详见 [animateOption 配置](#animateOption) |  |
| label | _object_ | - | 文本的配置项。详见 [label 配置](#label) | <tag color="green" text="分类图例">分类图例</tag> |
| marker | _object_ | - | 图例项的 marker 图标的配置。 | <tag color="green" text="分类图例">分类图例</tag> |
| maxWidth | _number_ | - | 图例项最大宽度设置。 | <tag color="green" text="分类图例">分类图例</tag> |
| maxHeight | _number_ | - | 图例项最大高度设置。 | <tag color="green" text="分类图例">分类图例</tag> |
| rail | _object_ | - | 图例滑轨（背景）的样式配置项。详见 [rail 配置](#rail) | <tag color="green" text="分类图例">分类图例</tag> |
| reversed | _boolean_ | - | 是否将图例项逆序展示。 | <tag color="green" text="分类图例">分类图例</tag> |
| min | _number_ | - | 范围的最小值。 | <tag color="cyan" text="连续图例">连续图例</tag> |
| max | _number_ | - | 选择范围的最大值。 | <tag color="cyan" text="连续图例">连续图例</tag> |
| value | _number[]_ | - | 选择的值。 | <tag color="cyan" text="连续图例">连续图例</tag> |
| slidable | _boolean_ | - | 滑块是否可以滑动。 | <tag color="cyan" text="连续图例">连续图例</tag> |
| track | _object_ | - | 选择范围的色块样式配置项。详见 [track 配置](#track) | <tag color="cyan" text="连续图例">连续图例</tag> |
| handler | _object_ | - | 滑块的配置项。详见 [handler 配置](#handler) | <tag color="cyan" text="连续图例">连续图例</tag> |
| custom | _boolean_ | false | 是否为自定义图例，当该属性为 true 时，需要声明 items 属性。 |  |
| items | _object[]_ | - | 用户自己配置图例项的内容。详见 [items 配置](#items) |  |

<a name="fDpx7"></a>

#### 配置项详解

`markdown:docs/common/legend-cfg.zh.md`



