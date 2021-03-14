Annotations are array types and can be set multiple times.

```ts
annotations: [
  {
    type: 'text',
    position: ['median', 'median'],
    content: '辅助文本',
    style: {
      fill: 'red',
    },
  },
];
```

##### type

<description>**required** _string_ </description>

Type of annotation, text | line | image | region | dataMarker | dataRegion | regionFilter | shape | html.

##### position

<description>**required** _object_ </description>

The position of annotation.

- In the first case, object uses the raw data corresponding to graphs x and y. For example: { time: '2010-01-01', value: 200 };
- The second way is to configure the position [x, y] in an array. Based on the presence of the values in the array, the following forms are used:
  1、Corresponding to the original data in the data source;
  2、Key words: 'min', 'Max', 'median', 'median', 'start' and 'end' respectively represent the maximum value, minimum value, median value of data and the start and end of coordinate system interval;
  3、X, y are percentages, such as 30%, located in the drawing area (that is, in the coordinate system).
  The 1 and 2 types of data can be used interchangeably, but when using the percentage form, x and y must both be in the percentage form.
- The third, callback function, can dynamically determine the position of the auxiliary element, applied to dynamic data update, the position of the auxiliary element changes according to the data.

##### top

<description>**optional** _boolean_ _default:_ `false`</description>

If it is drawn at the top of the canvas, the default is false, meaning it is drawn at the bottom.

##### animate

<description>**optional** _boolean_ </description>

Whether to enable animation.

##### offsetX

<description>**optional** _number_ </description>

The offset in the x direction.

##### offsetY

<description>**optional** _number_ </description>

The offset in the y direction.

##### start

<description>**optional** _Array_ </description>

Starting position, commonly used for line, region, etc.

##### end

<description>**optional** _Array_ </description>

End position, commonly used for line, region, etc.

```ts
{
  type: 'line',
  start: ['min', 'median'],
  end: ['max', 'median'],
},
```

##### style

<description>**optional** _object_ </description>

The graph style properties refer to the Graphic Style.

##### src

<description>**optional** _string_ </description>

Image path, used in image.

##### content

<description>**optional** _string_ </description>

Text content, used in text.

##### rotate

<description>**optional** _number_ </description>

The rotation Angle of text in radians.

##### maxLength

<description>**optional** _number_ </description>

The maximum length of a text.

##### autoEllipsis

<description>**optional** _boolean_ </description>

Whether the maxLength beyond is automatically omitted.

##### ellipsisPosition

<description>**optional** _head | middle | tail _ </description>

The location of the text truncation.

##### isVertical

<description>**optional** _boolean_ </description>

The display position of the text in a two-dimensional coordinate system, whether it is displayed along the X axis or along the Y axis.

##### background

<description>**optional** _object_ </description>

Text wrap box style Settings.

| Properties | Type                 | Default | Description                                                                 |
| ---------- | -------------------- | ------- | --------------------------------------------------------------------------- |
| style      | _object_             | -       | Text background style, reference[Graphic Style](/en/docs/api/graphic-style) |
| padding    | _number \| number[]_ | -       | White space around the background of a text                                 |

##### color

<description>**optional** _string_ </description>

Color value, usually used in RegionFilter.

##### apply

<description>**optional** _string[]_ </description>

RegionFilter is set to work only on a specific Geometry type, such as Apply: ['area'], which is generally used with RegionFilter.

##### autoAdjust

<description>**optional** _boolean_ </description>

Whether to automatically adjust text orientation when text exceeds the drawn area.

##### direction

<description>**optional** _upward | downward_ </description>

Orientation.

##### lineLength

<description>**optional** _number_ </description>

Line length for dataRegion.

##### render

<description>**optional** _string_ </description>

Render function of custom marking, other container is the parent container of marking drawing, view is the graphic instance, helpers is the auxiliary function, other parserPosition can be used to calculate the coordinate position corresponding to data points, used in shape.

##### container

<description>**optional** _string | HTMLElement_ </description>

Container elements for custom HTML graphical tags for HTML

##### html

<description>**optional** _string | HTMLElement_ </description>

Custom graphical markup of HTML elements, either as HTML DOM strings, or HTML elements, or HTML callback functions, for HTML

##### alignX

<description>**optional** _'left' | 'middle' | 'right'_ </description>

Alignment of DOM elements in the X direction for HTML

##### alignY

<description>**optional** _left' | 'middle' | 'right'_ </description>

Alignment of DOM elements in the Y direction for HTML
