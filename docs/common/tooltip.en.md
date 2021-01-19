##### fields

<description>**optional** _string[]_</description>

Specifies the fields to be displayed in the Tooltip. By default, different charts have different default field lists. Use with the 'formatter' configuration for more effect.

```ts
tooltip: {
  fields: ['x', 'y'],
}
```

##### formatter

<description>**optional** _Function_</description>

Formats the contents of the Tooltip Item.

```ts
tooltip: {
  formatter: (datum: Datum) => {
    return { name: datum.x, value: datum.y + '% };
  },
}
```

##### follow

<description>**optional** _boolean_ _default:_ `true`</description>

Sets whether the Tooltip content box follows the mouse.

##### enterable

<description>**optional** _boolean_ _default:_ `false`</description>

Whether the tooltip allows mouse to slide in.

##### showTitle

<description>**optional** _boolean_ _default:_ `false`</description>

Whether show tooltip title.

##### title

<description>**optional** _string_</description>

Set the title content of the Tooltip: If the value is the name of the data field, the value for the field in the data is displayed, and if the field does not exist in the data, the title value is displayed directly.

##### position

<description>**optional** _`top` | `bottom` | `left` | `right`_</description>

Sets the fixed display location of the Tooltip relative to the data point.

##### shared

<description>**optional** _boolean_</description>

True means that all data corresponding to the current point is merged and displayed, while false means that only the data content closest to the current point is displayed.

##### showCrosshairs

<description>**optional** _boolean_ _default:_ `false`</description>

Whether show crosshairs。

##### crosshairs

<description>**optional** _object_</description>

Configure tooltip crosshairs to work if and only if 'showCrosshairs' is true.

| Attributes     | Type                   | Description                                                                                   |
| -------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| type           | \_`x` \| `y` \| `xy`\_ | Crosshairs Type: 'X' represents the auxiliary line on the X axis, 'Y' on the Y axis           |
| line           | _lineStyle_            | The configuration item for line                                                               |
| text           | _textStyle_            | Guideline text configuration, support callback                                                |
| textBackground | _textBackgroundStyle_  | Guideline text background configuration                                                       |
| follow         | _boolean_              | Whether the guide line follows the mouse. Default is false, that is, to locate the data point |

**_lineStyle_**

`markdown:docs/common/line-style.en.md`

**_*textStyle*_**

`markdown:docs/common/text-style.en.md`

**_textBackgroundStyle_**

| Attributes | Type                 | Description                                 |
| ---------- | -------------------- | ------------------------------------------- |
| padding    | _number \| number[]_ | White space around the background of a text |
| style      | _shapeStyle_         | The configuration item for line             |

**_shapeStyle_**

`markdown:docs/common/shape-style.en.md`

##### showMarkers

<description>**optional** _boolean_ _default:_ `true`</description>

Whether to render TooltipMarkers.

##### marker

<description>**optional** _object_</description>

TooltipMarker style configuration.

##### showContent

<description>**optional** _boolean_ _default:_ `false`</description>

Whether to display the Tooltip content box.

##### container

<description>**optional** _string|HTMLElement_</description>

Custom tooltip container.

##### containerTpl

<description>**optional** _string_</description>

Templates used to specify the legend container must include the classes of each DOM node when customizing the template

##### itemTpl

<description>**optional** _string_</description>

The default template for each record, which must include the classes of each DOM node when customizing the template.

##### domStyles

<description>**optional** _TooltipDomStyles_</description>

The styles for each DOM.

```ts
/** Tooltip content box css style */
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

<description>**optional** _number_</description>

Tooltip offset.

##### customContent

<description>**optional** _Function_</description>

Support for custom templates.

```ts
{
  tooltip: {
    customContent: (title, data) => {
      return `<div>${title}</div>`;
    };
  }
}
```
