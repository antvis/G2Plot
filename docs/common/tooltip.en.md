##### formatter

<description>**可选** _Function_</description>

功能描述：格式化 tooltip value。

```ts
tooltip: {
  formatter: (item) => item.value + '%';
}
```

##### follow

<description>**可选** _boolean_</description>

功能描述：设置 tooltip 内容框是否跟随鼠标移动。

默认配置：`true`

##### enterable

<description>**可选** _boolean_</description>

功能描述：tooltip 是否允许鼠标滑入。

默认配置：`false`

##### showTitle

<description>**可选** _boolean_</description>

功能描述：是否展示 tooltip 标题。

默认配置：`false`

##### title

<description>**可选** _string_</description>

功能描述：设置 tooltip 的标题内容：如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值。

默认配置：`无`

##### position

<description>**可选** _`top` | `bottom` | `left` | `right`_</description>

功能描述：设置 tooltip 的固定展示位置，相对于数据点。

默认配置：`无`

##### shared

<description>**可选** _boolean_</description>

功能描述：true 表示合并当前点对应的所有数据并展示，false 表示只展示离当前点最逼近的数据内容。

默认配置：`无`

##### showCrosshairs

<description>**可选** _boolean_</description>

功能描述：是否展示 crosshairs。

默认配置：`false`

##### crosshairs

<description>**可选** _object_</description>

功能描述：配置 tooltip 的 crosshairs，当且仅当 `showCrosshairs` 为 true 时生效。

| 细分配置项名称 | 类型                   | 功能描述                                                            |
| -------------- | ---------------------- | ------------------------------------------------------------------- |
| type           | \_`x` \| `y` \| `xy`\_ | crosshairs 的类型: `x` 表示 x 轴上的辅助线，`y` 表示 y 轴上的辅助项 |
| line           | _lineStyle_            | 线的配置项                                                          |
| text           | _textStyle_            | 辅助线文本配置，支持回调                                            |
| textBackground | _textBackgroundStyle_  | 辅助线文本背景配置                                                  |
| follow         | _boolean_              | 辅助线是否跟随鼠标移动，默认为 false，即定位到数据点                |

**_lineStyle_**

`markdown:docs/common/line-style.en.md`

**_*textStyle*_**

`markdown:docs/common/text-style.en.md`

**_textBackgroundStyle_**

| 细分配置项名称 | 类型               | 功能描述           |
| -------------- | ------------------ | ------------------ |
| padding        | number \| number[] | 文本背景周围的留白 |
| style          | _shapeStyle_       | 线的配置项         |

**_shapeStyle_**

`markdown:docs/common/shape-style.en.md`

##### showMarkers

<description>**可选** _boolean_</description>

功能描述：是否渲染 tooltipMarkers。

默认配置：`true`

##### marker

<description>**可选** _object_</description>

功能描述：tooltipMarker 的样式配置。

默认配置：`无`

##### showContent

<description>**可选** _boolean_</description>

功能描述：是否展示 tooltip 内容框。

默认配置：`false`

##### container

<description>**可选** _string|HTMLElement_</description>

功能描述：自定义 tooltip 的容器。

默认配置：`无`

##### containerTpl

<description>**可选** _string_</description>

功能描述：用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class。

默认配置：`无`

##### itemTpl

<description>**可选** _string_</description>

功能描述：每项记录的默认模板，自定义模板时必须包含各个 dom 节点的 class。

默认配置：`无`

##### domStyles

<description>**可选** _TooltipDomStyles_</description>

功能描述：传入各个 dom 的样式。

默认配置： `无`

```ts
/** Tooltip 内容框的 css 样式定义 */
{
  domStyles: {
    'g2-tooltip'?: object;
    'g2-tooltip-title'?: object;
    'g2-tooltip-list'?: object;
    'g2-tooltip-list-item'?: object;
    'g2-tooltip-marker'?: object;
    'g2-tooltip-value'?: object;
    'g2-tooltip-name'?: object;
  }
}
```

##### offset

<description>**可选** _number_</description>

功能描述：tooltip 偏移量。

默认配置：`无`

##### customContent

<description>**可选** _Function_</description>

功能描述：支持自定义模板。

默认配置：`无`

```ts
{
  tooltip: {
    customContent: (title, data) => {
      return `<div>${title}</div>`;
    };
  }
}
```
