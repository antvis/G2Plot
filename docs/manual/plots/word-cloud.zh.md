---
title: 词云图
order: 0
---

## 配置属性

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data 📌

**必选**, _array object_

功能描述： 设置图表数据源

默认配置： 无

数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

#### wordField

**必选**, _string_

功能描述： 单词内容在数据中所对应的字段名

默认配置： 无

#### weightField

**必选**, _string_

功能描述： 单词所占权重在数据中所对应的字段名

默认配置： 无

#### timeInterval

**可选**, _number_

功能描述： 设置绘制程序最大的执行时间，单位毫秒，如果时间设置过短可能会只绘制一部分词语

默认配置：2000

`markdown:docs/common/meta.zh.md`

### 图形样式

#### imageMask

**可选**, _HTMLImageElement_

功能描述： 设置一张图片，然后图表就可以根据该图片的形状进行渲染，必须是已加载完成的图片对象

默认配置： 无

#### wordStyle

**可选**, _object_

功能描述： 设置每个词语的样式

默认配置： 无

| 细分配置      | 类型                           | 默认值    | 功能描述                                                        |
| ------------- | ------------------------------ | --------- | --------------------------------------------------------------- |
| fontFamily    | _string \| function_           | 'Verdana' | 词云的字体                                                      |
| fontWeight    | _string \| number \| function_ | 'normal'  | 设置字体的粗细                                                  |
| padding       | _number \| function_           | 1         | 每个单词所占的盒子的内边距，默认为 1。 越大单词之间的间隔越大。 |
| fontSize      | _number[] \| function_         | [20, 60]  | 字体的大小范围，比如 [10, 20] 表示最小字体是 10，最大 20        |
| rotation      | _number[]_                     | [0, 90]   | 旋转的最小角度和最大角度 默认 [0, 90]                           |
| rotationSteps | _number_                       | 2         | 旋转实际的步数,越大可能旋转角度越小, 默认是 2                   |
| rotateRatio   | _number_                       | 0.5       | 旋转的比率 [0, 1]，默认是 0.5 也就是 50%可能发生旋转            |

以上，某些属性可以设置为一个函数，其函数的参数是一个`object`，其属性如下

| 细分配置 | 类型                                | 功能描述                                             |
| -------- | ----------------------------------- | ---------------------------------------------------- |
| text     | _string_                            | 文本内容                                             |
| value    | _number_                            | 该文本所占权重                                       |
| font     | _string_                            | 字体                                                 |
| style    | _"normal" \| "italic" \| "oblique"_ | 字体样式                                             |
| weight   | _number \| string_                  | 文本粗细                                             |
| rotate   | _number_                            | 旋转角度                                             |
| size     | _number_                            | 字体大小                                             |
| padding  | _number_                            | 一个单词所占的盒子的内边距，值越大单词之间的间隔越大 |
| hasText  | _boolean_                           | 是否包含文本                                         |
| width    | _number_                            | 单词所占盒子的宽度                                   |
| height   | _number_                            | 单词所占盒子的高度                                   |
| x        | _number_                            | x 轴坐标                                             |
| y        | _number_                            | y 轴坐标                                             |

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`
