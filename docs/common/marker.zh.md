<!-- #### *MarkerCfg*  配置 -->

| 参数名  | 类型                  | 默认值 | 描述                                                                     |
| ------- | --------------------- | ------ | ------------------------------------------------------------------------ |
| symbol  | _string \| MarkerSymbolCallback_  | -      | 配置图例 marker 的 symbol 形状 |
| style   | _ShapeAttrs \| ((style: ShapeAttrs) => ShapeAttrs)_  | -   | 图例项 marker 的配置项                                           |
| spacing | number                | -      | 图例项 marker 同后面 name 的间距                                         |

**_MarkerSymbolCallback_** 类型定义如下：

除了内置一些 symbol 类型，可以指定具体的标记类型，也可以通过回调的方式返回 symbol 绘制的 path 命令

内置支持的标记类型有：`"circle" | "square" | "line" | "diamond" | "triangle" | "triangle-down" | "hexagon" | "bowtie" | "cross" | "tick" | "plus" | "hyphen"`

回调的方式为：`(x: number, y: number, r: number) => PathCommand`；

自定义图例 marker [DEMO](zh/examples/component/legend#legend-marker-customize)

<!--这里可以插入一个代码示例-->
