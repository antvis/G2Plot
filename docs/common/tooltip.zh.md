##### fields

<description>**可选** _string[]_</description>

指定 tooltip 中显示的字段，默认不同图表有不同的默认字段列表。配合 `formatter` 配置一起使用，效果更佳。

```ts
tooltip: {
  fields: ['x', 'y'],
}
```

##### formatter

<description>**可选** _Function_</description>

格式化 tooltip item 内容（暂时不支持多 tooltipItems 的格式化，可以使用 `customContent` 处理）

```ts
tooltip: {
  formatter: (datum: Datum) => {
    return { name: datum.x, value: datum.y + '%' };
  },
}
```

##### follow

<description>**可选** _boolean_ _default:_ `true`</description>

设置 tooltip 内容框是否跟随鼠标移动。

##### enterable

<description>**可选** _boolean_ _default:_ `false`</description>

tooltip 是否允许鼠标滑入。

##### showTitle

<description>**可选** _boolean_ _default:_ `false`</description>

是否展示 tooltip 标题。

##### title

<description>**可选** _string_</description>

设置 tooltip 的标题内容：如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值。

##### position

<description>**可选** _`top` | `bottom` | `left` | `right`_</description>

设置 tooltip 的固定展示位置，相对于数据点。

##### shared

<description>**可选** _boolean_</description>

true 表示合并当前点对应的所有数据并展示，false 表示只展示离当前点最逼近的数据内容。

##### showCrosshairs

<description>**可选** _boolean_ _default:_ `false`</description>

是否展示 crosshairs。

##### crosshairs

<description>**可选** _object_</description>

配置 tooltip 的 crosshairs，当且仅当 `showCrosshairs` 为 true 时生效。

| 细分配置项名称 | 类型                  | 功能描述                                                            |
| -------------- | --------------------- | ------------------------------------------------------------------- |
| type           | _'x' \| 'y' \| 'xy'_  | crosshairs 的类型: `x` 表示 x 轴上的辅助线，`y` 表示 y 轴上的辅助项 |
| line           | _lineStyle_           | 线的配置项，详细可见 [_ShapeAttrs_](/zh/docs/api/graphic-style#configure-line-styles)                          |
| text           | _TooltipCrosshairsText \| TooltipCrosshairsTextCallback_             | 辅助线文本配置，支持回调                                            |
| textBackground | _TextBackgroundStyle_ | 辅助线文本背景配置                                                  |
| follow         | _boolean_             | 辅助线是否跟随鼠标移动，默认为 false，即定位到数据点                |

`markdown:docs/common/crosshairs-text.zh.md`

**_TextBackgroundStyle_**

| 细分配置项名称 | 类型                 | 功能描述           |
| -------------- | -------------------- | ------------------ |
| padding        | _number \| number[]_ | 文本背景周围的留白 |
| style          | _shapeStyle_         | 线的配置项, 详细可见 [_ShapeAttrs_](/zh/docs/api/graphic-style)          |

##### showMarkers

<description>**可选** _boolean_ _default:_ `true`</description>

是否渲染 tooltipMarkers。

##### marker

<description>**可选** _ShapeAttrs_</description>

tooltipMarker 的样式配置。

样式配置类型，详细可见: [ShapeAttrs](/zh/docs/api/graphic-style)

##### showContent

<description>**可选** _boolean_ _default:_ `false`</description>

是否展示 tooltip 内容框。

##### container

<description>**可选** _string|HTMLElement_</description>

自定义 tooltip 的容器。

##### containerTpl

<description>**可选** _string_</description>

用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class。

##### itemTpl

<description>**可选** _string_</description>

每项记录的默认模板，自定义模板时必须包含各个 dom 节点的 class。

##### domStyles

<description>**可选** _TooltipDomStyles_</description>

传入各个 dom 的样式。

<img src="https://gw.alipayobjects.com/zos/antfincdn/pKDA06iIeQ/tooltip.png" class="img-400" alt="dom-styles" />

```ts
/** Tooltip 内容框的 css 样式定义 */
{
  domStyles: {
    'g2-tooltip'?: CSSProperties;
    'g2-tooltip-title'?: CSSProperties;
    'g2-tooltip-list'?: CSSProperties;
    'g2-tooltip-list-item'?: CSSProperties;
    'g2-tooltip-marker'?: CSSProperties;
    'g2-tooltip-value'?: CSSProperties;
    'g2-tooltip-name'?: CSSProperties;
  }
}
```

##### offset

<description>**可选** _number_</description>

tooltip 偏移量。

##### reversed

<description>**optional** _boolean_</description>

是否将 tooltip items 逆序.

##### showNil

<description>**optional** _boolean_</description>

是否显示空值的 tooltip 项

##### customItems

<description>**可选** _Function_</description>

在 tooltip 渲染之前，对最终的 items 进行自定义处理（比如排序、过滤、格式化等）。

```ts
{
  tooltip: {
    customItems: (originalItems: TooltipItem[]) => {
      // process originalItems, 
      return originalItems;
    };
  }
}
```
<!-- todo 补充 customItems demo -->

##### customContent

<description>**可选** _Function_</description>

支持自定义模板。[在线示例](/zh/examples/case/customize#customize-tooltip)

```ts
{
  tooltip: {
    customContent: (title, data) => {
      return `<div>${title}</div>`;
    };
  }
}
```

