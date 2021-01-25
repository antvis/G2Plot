---
title: 图表标注
order: 4
---

`markdown:docs/styles/component.md`

图形标注，Annotation，作为图表的辅助元素，主要用于在图表上标识额外的标记注解。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*B0q9R7s1v3sAAAAAAAAAAABkARQnAQ)

前往墨者学院 [AntV 设计 | 标注 Annotation](https://www.yuque.com/mo-college/vis-design/ybatti) 查看**设计指引**。 

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
];
```

#### 图表标注类型

G2Plot 提供了以下图形标注类型：

|   **类型**   |     **描述**        |             **用法**              |
| :----------: | :-------------------------------------------------: | :-----------------------------------: |
|     arc      |      辅助弧线，只在**极坐标系**下生效。常用于绘制仪表盘。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SccqSpP2hG4AAAAAAAAAAABkARQnAQ)      |     `{ type: 'arc' }`      |
|    image     |                辅助图片，在图表上添加辅助图片。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*KYTbSbvRKHQAAAAAAAAAAABkARQnAQ)                |    `{ type: 'image' }`     |
|     line     |     辅助线（可带文本），例如表示平均值或者预期分布的直线。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*hd7PQ4z_JS8AAAAAAAAAAABkARQnAQ)     |     `{ type: 'line' }`     |
|     text     |                辅助文本，指定位置添加文本说明。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PdjoSrdEhnwAAAAAAAAAAABkARQnAQ)                |     `{ type: 'text' }`     |
|    region    |            辅助框，框选一段图区，设置背景、边框等。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*VEOZR5rXpqMAAAAAAAAAAABkARQnAQ)            |    `{ type: 'region' }`    |
| regionFilter | 区域着色，将图表中位于矩形选区中的图形元素提取出来，重新着色。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*cp2jSJfeJDYAAAAAAAAAAABkARQnAQ) | `{ type: 'regionFilter' }` |
|  dataMarker  |             特殊数据点标注，多用于折线图和面积图。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*h-e2TLivyI4AAAAAAAAAAABkARQnAQ)             |  `{ type: 'dataMarker' }`  |
|  dataRegion  |            特殊数据区间标注，多用于折线图和面积图。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*NHbSRKacUesAAAAAAAAAAABkARQnAQ)            |  `{ type: 'dataRegion' }`  |


#### 配置项（_AnnotationCfg_）

`markdown:docs/common/annotations.zh.md`