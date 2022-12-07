#### 💠 Shape Annotation

##### type

<description>**optional** _string_</description>

需要指定 `type: 'shape',`。自定义任意类型的图形标记，通过 option 中的 render 回调函数来在图表区域绘制自定义标记。option 配置如下：

##### render

<description> _(
container: IGroup,
view: View,
helpers: { parsePosition: (position: [string | number, string | number] | Datum) => Point }
) => void_ </description>

自定义标记的绘制 render 函数，其他 _container_ 为标记绘制的父容器, _view_ 为图形实例, _helpers_ 为辅助函数，其他 _parserPosition_ 可以用来计算数据点对应的坐标位置

<embed src="@/docs/common/annotations/base-annotation.zh.md"></embed>
