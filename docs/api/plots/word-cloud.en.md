---
title: Word Cloud
order: 8
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

#### wordField

<description>**required** _string_</description>

The name of the field in the data that the word content corresponds to.

#### weightField

<description>**required** _string_</description>

The name of the field in the data that the weight of the word corresponds to.

#### colorField

<description>**optional** _string_</description>

Color mapping is performed according to this field.

#### random

<description>**optional** _number | function_</description>

The value of a random function can be a value in the interval [0, 1] or a function that returns the value. When the value is a fixed value, the layout coordinates of each word corresponding to the word cloud of the same data will be the same every time the word cloud of the same data is rendered.

Default configuration: By default, the browser's built-in 'Math.random' is used, which means that each rendering will change the position of the word.

#### spiral

<description>**optional** _'archimedean' | 'rectangular'_ _default:_ `'archimedean'`</description>

When set to 'Archimedean', the whole lexical cloud map is close to the shape of 'ellipse', and when set to 'rectangular', the whole lexical cloud map is close to the shape of 'rectangle'.

#### placementStrategy

<description>**optional** _function_</description>

Customize the coordinates of each word, the return value must contain the x and y attributes, the rest are optional. It can also be set in the options in 'wordStyle'.

The return value is of the following type:

| Properties | Type               | Description                                |
| ---------- | ------------------ | ------------------------------------------ |
| x          | _number_           | Horizontal coordinates of the current text |
| y          | _number_           | Vertical coordinates of the current text   |
| font       | _string_           | Font of text                               |
| weight     | _number \| string_ | Text weight                                |
| size       | _number_          | The font size of the text                  |
| rotate     | _number_          | The rotation angle of the text             |

#### timeInterval

<description>**optional** _number_ _default:_ `2000`</description>

Sets the maximum execution time of the drawing program in milliseconds. If the time is set too short, it may draw only part of the words.

#### meta

`markdown:docs/common/meta.en.md`

### Geometry Style

#### imageMask

<description>**optional** _HTMLImageElement \| string_</description>

Configure an image, and then the diagram can be rendered based on the shape of the image, either as an image element instance or as a URL address and base64.

Note: words are only rendered in the dark parts of the image, light parts (such as white) are not rendered words. When using the URL address of the image, the size of the image should not be too large, otherwise the image load time will be too long.

#### wordStyle

<description>**optional** _object_</description>

Set the style of each word.

| Properties    | Type                             | Default   | Description                                                                                                  |
| ------------- | -------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| fontFamily    | _string \| function_             | 'Verdana' | Word cloud font                                                                                              |
| fontWeight    | _string \| number \| function_   | 'normal'  | Sets the size of the font                                                                                    |
| padding       | _number \| function_             | 1         | The padding of the box for each word, default to 1. The bigger the words, the bigger the space between them. |
| fontSize      | _number[] \| number \| function_ | [20, 60]  | The range of font sizes, such as [10, 20], means that the minimum font is 10 and the maximum font is 20      |
| rotation      | _number[] \| number \| function_ | [0, 90]   | Rotation minimum and maximum angles by default [0, 90]                                                       |
| rotationSteps | _number_                         | 2         | Rotate the actual number of steps, the larger the rotation angle may be smaller, default is 2                |

Above, some properties can be set to a function that takes the following parameters:

| Properties | Type     | Description                                                  |
| ---------- | -------- | ------------------------------------------------------------ |
| word       | _Word_   | Data objects for each text                                   |
| index      | _number_ | The index value of the current text object in the total data |
| words      | _Word[]_ | The total text data, is an array                             |

类型`Word`的配置如下：

| Properties | Type     | Description                                    |
| ---------- | -------- | ---------------------------------------------- |
| text       | _string_ | The text content                               |
| value      | _number_ | The text weight                                |
| color      | _any_    | Value for color mapping                        |
| datum      | _object_ | The original data corresponding to the storage |

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

### Plot Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`

### Plot Interactions

`markdown:docs/common/interactions.en.md`
