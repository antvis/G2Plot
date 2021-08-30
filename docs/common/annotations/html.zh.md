### Html Annotation

#### type

<description>**optional** _string_</description>

需要指定 `type: 'html',`。自定义任意 HTML 类型的图形标记，通过 option 中的 html 配置来在图表中使用 HTML DOM 元素来添加图形标记。option 配置如下：

#### container

<description> _string_ | _HTMLElement_ **optional** </description>

可选，自定义 HTML 图形标记的容器元素

#### html

<description> _string_ | _HTMLElement_ | _((container: HTMLElement, view: View) => void | string | HTMLElement)_ </description>

自定义的图形标记的 HTML 元素，可为 HTML DOM 字符串，或 HTML 元素，或 html 回调函数

#### alignX

<description> _'left'_ | _'middle'_ | _'right'_ **optional** _default:_ 'left' </description>

DOM 元素在 X 方向的对齐方式

#### alignY

<description> _'top'_ | _'middle'_ | _'bottom'_ **optional** _default:_ 'top'</description>

DOM 元素在 Y 方向的对齐方式

#### offsetX

<description> _number_ **optional** </description>

X 方向的偏移

#### offsetY

<description> _number_ **optional** </description>

Y 方向的偏移
