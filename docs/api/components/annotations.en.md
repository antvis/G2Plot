---
title: Annotations
order: 6
---

<embed src="@/docs/styles/component.md"></embed>

🏷️  Annotation，as an auxiliary element of the chart, it is mainly used to identify additional mark notes on the plot.

🎨  Go to [AntV 设计 | 标注 Annotation](https://www.yuque.com/mo-college/vis-design/ybatti) of 墨者学院 to learn more about **Design guide**

### Types of annotations

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*B0q9R7s1v3sAAAAAAAAAAABkARQnAQ" class="component-img" alt="annotation" />

G2Plot 提供了以下图形标注类型：

|   **类型**   |     **描述**        |      **预览** |       **用法**              |
| :----------: | :--------------------------: | :-----------------: | :-----------------: |
|     arc      |      辅助弧线，只在**极坐标系**下生效。常用于绘制仪表盘。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SccqSpP2hG4AAAAAAAAAAABkARQnAQ)      |     `{ type: 'arc' }`      |
|    image     |                辅助图片，在图表上添加辅助图片。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*KYTbSbvRKHQAAAAAAAAAAABkARQnAQ)                |    `{ type: 'image' }`     |
|     line     |     辅助线（可带文本），例如表示平均值或者预期分布的直线。| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*hd7PQ4z_JS8AAAAAAAAAAABkARQnAQ)     |     `{ type: 'line' }`     |
|     text     |                辅助文本，指定位置添加文本说明。| ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PdjoSrdEhnwAAAAAAAAAAABkARQnAQ)                |     `{ type: 'text' }`     |
|    region    |            辅助框，框选一段图区，设置背景、边框等。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*VEOZR5rXpqMAAAAAAAAAAABkARQnAQ)            |    `{ type: 'region' }`    |
| regionFilter | 区域着色，将图表中位于矩形选区中的图形元素提取出来，重新着色。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*cp2jSJfeJDYAAAAAAAAAAABkARQnAQ) | `{ type: 'regionFilter' }` |
|  dataMarker  |             特殊数据点标注，多用于折线图和面积图。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*h-e2TLivyI4AAAAAAAAAAABkARQnAQ)             |  `{ type: 'dataMarker' }`  |
|  dataRegion  |            特殊数据区间标注，多用于折线图和面积图。 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*NHbSRKacUesAAAAAAAAAAABkARQnAQ)            |  `{ type: 'dataRegion' }`  |
|  html  |           自定义 HTML 标注，新增 🆕 。 | -           |  `{ type: 'html' }`  |
|  shape  |           自定义 shape 标注，新增 🆕 。 | -           |  `{ type: 'shape' }`  |

### Usage

`annotations` is an array type, and multiple annotations can be set.

```ts
annotations: [
  {
    type: 'text',
    position: ['median', 'median'],
    content: 'Content',
    style: {
      fill: 'red',
    },
  },
];
```

Details of configuration:

<embed src="@/docs/common/annotations.en.md"></embed>