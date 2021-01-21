##### fields

<description>**optional** _string[]_</description>

指定 tooltip 中显示的字段，默认不同图表有不同的默认字段列表。配合 `formatter` 配置一起使用，效果更加。

```ts
tooltip: {
  fields: ['x', 'y'],
}
```

##### formatter

<description>**optional** _Function_</description>

格式化 tooltip item 内容。

```ts
tooltip: {
  formatter: (datum: Datum) => {
    return { name: datum.x, value: datum.y + '% };
  },
}
```

##### follow

<description>**optional** _boolean_ _default:_ `true`</description>

设置 tooltip 内容框是否跟随鼠标移动。

##### enterable

<description>**optional** _boolean_ _default:_ `false`</description>

tooltip 是否允许鼠标滑入。

##### showTitle

<description>**optional** _boolean_ _default:_ `false`</description>

是否展示 tooltip 标题。

##### title

<description>**optional** _string_</description>

设置 tooltip 的标题内容：如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值。

##### position

<description>**optional** _`top` | `bottom` | `left` | `right`_</description>

设置 tooltip 的固定展示位置，相对于数据点。

##### shared

<description>**optional** _boolean_</description>

true 表示合并当前点对应的所有数据并展示，false 表示只展示离当前点最逼近的数据内容。

##### showCrosshairs

<description>**optional** _boolean_ _default:_ `false`</description>

是否展示 crosshairs。

##### crosshairs

<description>**optional** _object_</description>

配置 tooltip 的 crosshairs，当且仅当 `showCrosshairs` 为 true 时生效。

| 细分配置项名称 | 类型                  | 功能描述                                                            |
| -------------- | --------------------- | ------------------------------------------------------------------- |
| type           | _`x` \| `y` \| `xy`_  | crosshairs 的类型: `x` 表示 x 轴上的辅助线，`y` 表示 y 轴上的辅助项 |
| line           | _lineStyle_           | 线的配置项                                                          |
| text           | _textStyle_           | 辅助线文本配置，支持回调                                            |
| textBackground | _textBackgroundStyle_ | 辅助线文本背景配置                                                  |
| follow         | _boolean_             | 辅助线是否跟随鼠标移动，默认为 false，即定位到数据点                |

**_lineStyle_**

`markdown:docs/common/line-style.zh.md`

**_*textStyle*_**

`markdown:docs/common/text-style.zh.md`

**_textBackgroundStyle_**

| 细分配置项名称 | 类型                 | 功能描述           |
| -------------- | -------------------- | ------------------ |
| padding        | _number \| number[]_ | 文本背景周围的留白 |
| style          | _shapeStyle_         | 线的配置项         |

**_shapeStyle_**

`markdown:docs/common/shape-style.zh.md`

##### showMarkers

<description>**optional** _boolean_ _default:_ `true`</description>

是否渲染 tooltipMarkers。

##### marker

<description>**optional** _object_</description>

tooltipMarker 的样式配置。

##### showContent

<description>**optional** _boolean_ _default:_ `false`</description>

是否展示 tooltip 内容框。

##### container

<description>**optional** _string|HTMLElement_</description>

自定义 tooltip 的容器。

##### containerTpl

<description>**optional** _string_</description>

用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class。

##### itemTpl

<description>**optional** _string_</description>

每项记录的默认模板，自定义模板时必须包含各个 dom 节点的 class。

##### domStyles

<description>**optional** _TooltipDomStyles_</description>

传入各个 dom 的样式。

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

<description>**optional** _number_</description>

tooltip 偏移量。

##### customContent

<description>**optional** _Function_</description>

支持自定义模板。

```ts
{
  tooltip: {
    customContent: (title, data) => {
      return `<div>${title}</div>`;
    };
  }
}
```
