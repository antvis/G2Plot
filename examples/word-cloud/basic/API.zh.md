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

#### colorField

**可选**, _string_

功能描述： 根据该字段进行颜色映射

默认配置： 无

#### random

**可选**, _number | function_

功能描述： 自定义所使用的随机函数，其值可以是一个 [0, 1) 区间中的值，也可以是一个返回该值的函数，当该值是一个固定的值时，每次渲染相同数据的词云图时，其对应的每个单词的布局坐标一致

默认配置： 默认使用的是浏览器内置的 `Math.random`，也就是每次渲染，单词的位置都不一样

#### spiral

**可选**, _'archimedean' | 'rectangular'_

功能描述：当设置为 `archimedean` 时，整个词云图接近于`椭圆`的形状，当设置为 `rectangular` 时，整个词云图接近于`矩形`的形状

默认配置： _'archimedean'_

#### placementStrategy

**可选**, _function_

功能描述： 自定义每个词语的坐标，返回值必须包含 x 和 y 属性，其余的可选。也可以在 `wordStyle` 中的选项中设置

默认配置： 无

其返回值的类型如下：

| 细分配置 | 类型               | 功能描述           |
| -------- | ------------------ | ------------------ |
| x        | _number_           | 当前文本的横向坐标 |
| y        | _number_           | 当前文本的纵向坐标 |
| font     | _string_           | 文本的字体         |
| weight   | _number \| string_ | 文本的字重         |
| size     | _numberg_          | 文本的字体大小     |
| rotate   | _numberg_          | 文本的旋转角度     |

#### timeInterval

**可选**, _number_

功能描述： 设置绘制程序最大的执行时间，单位毫秒，如果时间设置过短可能会只绘制一部分词语

默认配置：2000

`markdown:docs/common/meta.zh.md`

### 图形样式

#### imageMask

**可选**, _HTMLImageElement \| string_

功能描述： 设置一张图片，然后图表就可以根据该图片的形状进行渲染，可以是图片元素实例或者 url 地址和 base64

注意： 词语只渲染在图片的深色部位，浅色的部位（如白色）不渲染词语。当使用图片的 url 地址时，图片的大小不宜过大，不然图片加载时间过长

默认配置： 无

#### wordStyle

**可选**, _object_

功能描述： 设置每个词语的样式

默认配置： 无

| 细分配置      | 类型                             | 默认值    | 功能描述                                                        |
| ------------- | -------------------------------- | --------- | --------------------------------------------------------------- |
| fontFamily    | _string \| function_             | 'Verdana' | 词云的字体                                                      |
| fontWeight    | _string \| number \| function_   | 'normal'  | 设置字体的粗细                                                  |
| padding       | _number \| function_             | 1         | 每个单词所占的盒子的内边距，默认为 1。 越大单词之间的间隔越大。 |
| fontSize      | _number[] \| number \| function_ | [20, 60]  | 字体的大小范围，比如 [10, 20] 表示最小字体是 10，最大 20        |
| rotation      | _number[] \| number \| function_ | [0, 90]   | 旋转的最小角度和最大角度 默认 [0, 90]                           |
| rotationSteps | _number_                         | 2         | 旋转实际的步数,越大可能旋转角度越小, 默认是 2                   |

以上，某些属性可以设置为一个函数，其函数的参数如下：

| 细分配置 | 类型     | 功能描述                       |
| -------- | -------- | ------------------------------ |
| word     | _Word_   | 每个文本的数据对象             |
| index    | _number_ | 当前文本对象在总数据中的索引值 |
| words    | _Word[]_ | 总的文本数据，是一个数组       |

类型`Word`的配置如下：

| 细分配置 | 类型     | 功能描述               |
| -------- | -------- | ---------------------- |
| text     | _string_ | 文本内容               |
| value    | _number_ | 文本权重               |
| color    | _any_    | 进行颜色映射的值       |
| datum    | _object_ | 存储的所对应的原始数据 |

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`
