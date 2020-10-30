标注是数组类型，可以设置多个。

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

<description>**必选** _string_ </description>

功能描述： 标注类型, text | line | image | region | dataMarker | dataRegion | regionFilter | shape | html.

##### position

<description>**必选** _object_ </description>

功能描述：标注位置。

- 第一种，object 使用图表 x, y 对应的原始数据例如：{ time: '2010-01-01', value: 200 };
- 第二种，数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
  1、对应数据源中的原始数据；
  2、关键字：'min'、'max'、'median'、'start'、'end' 分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束；
  3、x, y 都是百分比的形式，如 30%，在绘图区域定位(即坐标系内)。
  1 和 2 两种类型的数据可以混用，但是使用百分比形式时 x 和 y 必须都是百分比形式。
- 第三种，回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景。

##### top

<description>**可选** _boolean_ </description>

功能描述：是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

默认值： false

##### animate

<description>**可选** _boolean_ </description>

功能描述：是否进行动画。

##### offsetX

<description>**可选** _number_ </description>

功能描述：x 方向的偏移量。

##### offsetY

<description>**可选** _number_ </description>

功能描述：y 方向的偏移量。

##### start

<description>**可选** _Array_ </description>

功能描述：起始位置，一般用于 line、region 等。

##### end

<description>**可选** _Array_ </description>

功能描述：结束位置，一般用于 line、region 等。

```ts
{
  type: 'line',
  start: ['min', 'median'],
  end: ['max', 'median'],
},
```

##### style

<description>**可选** _object_ </description>

功能描述：图形样式属性，参考绘图属性。

##### src

<description>**可选** _string_ </description>

功能描述：图片路径，用于 image 中。

##### content

<description>**可选** _string_ </description>

功能描述：文本内容，用于 text 中。

##### rotate

<description>**可选** _number_ </description>

功能描述：文本的旋转角度，弧度制。

##### maxLength

<description>**可选** _number_ </description>

功能描述：文文本的最大长度。

##### autoEllipsis

<description>**可选** _boolean_ </description>

功能描述：超出 maxLength 是否自动省略。

##### ellipsisPosition

<description>**可选** _head | middle | tail _ </description>

功能描述：文本截断的位置。

##### isVertical

<description>**可选** _boolean_ </description>

功能描述：文本在二维坐标系的显示位置，是沿着 x 轴显示 还是沿着 y 轴显示。

##### background

<description>**可选** _object_ </description>

功能描述：文字包围盒样式设置。

| 参数名  | 类型                | 是否必选 | 默认值 | 描述               |
| ------- | ------------------- | -------- | ------ | ------------------ |
| style   | object 参考绘图属性 |          | -      | 文本背景的样式     |
| padding | number \| number[]  |          | -      | 文本背景周围的留白 |

##### color

<description>**可选** _string_ </description>

功能描述：染色色值，一般用于 regionFilter 。

##### apply

<description>**可选** _string[]_ </description>

功能描述：设定 regionFilter 只对特定 geometry 类型起作用，如 apply: ['area']，一般用于 regionFilter 。

##### autoAdjust

<description>**可选** _boolean_ </description>

功能描述：文本超出绘制区域时，是否自动调节文本方向。

##### direction

<description>**可选** _upward | downward_ </description>

功能描述：朝向。

##### lineLength

<description>**可选** _number_ </description>

功能描述：line 长度，用于 dataRegion。

##### render

<description>**可选** _string_ </description>

功能描述：自定义标记的绘制 render 函数，其他 container 为标记绘制的父容器, view 为图形实例, helpers 为辅助函数，其他 parserPosition 可以用来计算数据点对应的坐标位置，用于 shape。

##### container

<description>**可选** _string | HTMLElement_ </description>

功能描述：自定义 HTML 图形标记的容器元素，用于 html

##### container

<description>**可选** _string | HTMLElement_ </description>

功能描述：自定义的图形标记的 HTML 元素，可为 HTML DOM 字符串，或 HTML 元素，或 html 回调函数，用于 html

##### alignX

<description>**可选** _left' | 'middle' | 'right'_ </description>

功能描述：DOM 元素在 X 方向的对齐方式，用于 html

##### alignY

<description>**可选** _left' | 'middle' | 'right'_ </description>

功能描述：DOM 元素在 Y 方向的对齐方式，用于 html
