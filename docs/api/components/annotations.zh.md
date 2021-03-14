---
title: 图表标注
order: 4
---

`markdown:docs/styles/component.md`

🏷️  图形标注，Annotation，作为图表的辅助元素，主要用于在图表上标识额外的标记注解。

🎨  前往墨者学院 [AntV 设计 | 标注 Annotation](https://www.yuque.com/mo-college/vis-design/ybatti) 查看**设计指引**。 


#### 图表标注类型

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*B0q9R7s1v3sAAAAAAAAAAABkARQnAQ" class="component-img" alt="annotation" />

G2Plot 提供了以下图形标注类型：

|   **类型**   |     **描述**        |      **预览** |       **用法**              |
| :----------: | :-------------------------------: | :-----------------------: |  :----------------------: |
|     arc      |      辅助弧线，只在**极坐标系**下生效。常用于绘制仪表盘。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SccqSpP2hG4AAAAAAAAAAABkARQnAQ)      |     `{ type: 'arc' }`      |
|    image     |                辅助图片，在图表上添加辅助图片。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*KYTbSbvRKHQAAAAAAAAAAABkARQnAQ)                |    `{ type: 'image' }`     |
|     line     |     辅助线（可带文本），例如表示平均值或者预期分布的直线。| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*hd7PQ4z_JS8AAAAAAAAAAABkARQnAQ)     |     `{ type: 'line' }`     |
|     text     |                辅助文本，指定位置添加文本说明。| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PdjoSrdEhnwAAAAAAAAAAABkARQnAQ)                |     `{ type: 'text' }`     |
|    region    |            辅助框，框选一段图区，设置背景、边框等。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*VEOZR5rXpqMAAAAAAAAAAABkARQnAQ)            |    `{ type: 'region' }`    |
| regionFilter | 区域着色，将图表中位于矩形选区中的图形元素提取出来，重新着色。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*cp2jSJfeJDYAAAAAAAAAAABkARQnAQ) | `{ type: 'regionFilter' }` |
|  dataMarker  |             特殊数据点标注，多用于折线图和面积图。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*h-e2TLivyI4AAAAAAAAAAABkARQnAQ)             |  `{ type: 'dataMarker' }`  |
|  dataRegion  |            特殊数据区间标注，多用于折线图和面积图。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*NHbSRKacUesAAAAAAAAAAABkARQnAQ)            |  `{ type: 'dataRegion' }`  |

#### 使用方式

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
];s
```

#### 配置项（_AnnotationCfg_）

> ❕ 代表 _必选_

|   **属性**   |     **类型**        |      **描述** |       **用于**              |
| --- | --- | --- | --- |
| type ❕ | _string_ | 图形标注类型. |
| position ❕  | _object_ | 标注位置. |
| animate | _boolean_ | 是否进行动画. |
| autoAdjust | _boolean_ | 文本超出绘制区域时，是否自动调节文本方向. |
| start | _array_ | 起始位置. | <tag color="green" text="line"> Line </tag> <tag color="green" text="region"> Region </tag> 
| end | _array_ | 结束位置. | <tag color="green" text="line"> Line </tag> <tag color="green" text="region"> Region </tag> 
| src | _string_ | 图片路径. | <tag color="green" text="image"> Image</tag> 
| content | _string_ | 文本内容. | <tag color="green" text="text"> Text </tag> 
| lineLength | _string_ | line 长度. | <tag color="green" text="text"> DataRegion </tag> 
| container | _string_ | 自定义 HTML 图形标记的容器元素. | <tag color="green" text="html"> Html </tag> 
| html | _string_ | 自定义的图形标记的 HTML 元素，可为 HTML DOM 字符串，或 HTML 元素，或 html 回调函数. | <tag color="green" text="html"> Html </tag> 
| alignX | _string_ | DOM 元素在 X 方向的对齐方式，用于 html. 可选值: `'left' | 'middle' | 'right'` | <tag color="green" text="html"> Html </tag> 
| alignY | _string_ | DOM 元素在 Y 方向的对齐方式，用于 html. 可选值: `'left' | 'middle' | 'right'`  | <tag color="green" text="html"> Html </tag> 
| 更多内容，查看下方的具体 api |

#### 配置项详解

`markdown:docs/common/annotations.zh.md`