---
title: Facet
order: 21
contributors:
  [{ author: '新茗', github: 'visiky', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/KAeYPA3TV0/avatar.jpeg' }]
---

<!-- ### 用法建议 -->
## Introduction

分面（Facet）是指利用 G2 提供的 View 递归嵌套能力，将一份数据按照某个维度分隔成若干子集，然后创建一个图表的集合，将每一个数据子集绘制到图表矩阵的窗格中。

分面主要提供了两个功能：

1. 按照指定的维度划分数据集；
2. 对图表进行排版和布局。

对于探索型数据分析来说，分面是一个强大有力的工具，能帮我们快速地分析出数据各个子集模式的异同。目前 G2 内置的分面包括六种：rect、list、circle、tree、mirror 和 matrix，具体描述如下表所示：

| **分面类型** |                       **说明**                        |
| :----------: | :---------------------------------------------------: |
|     rect     | **默认类型**，指定 2 个维度作为行列，形成图表的矩阵。 |
|     list     |   指定一个维度，可以指定一行有几列，超出自动换行。    |
|    circle    |              指定一个维度，沿着圆分布。               |
|     tree     |  指定多个维度，每个维度作为树的一级，展开多层图表。   |
|    mirror    |             指定一个维度，形成镜像图表。              |
|    matrix    |             指定一个维度，形成矩阵分面。              |

## Qucik start

<div class='sign'>

```ts
import { Facet } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/VnrXpYSuqW/circle-pie.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Facet('container', {
      type: 'circle',
      fields: ['clarity'],
      data,
      tooltip: { showMarkers: false },
      meta: {
        cut: {
          sync: true,
        },
      },
      eachView: (view, f) => {
        return {
          type: 'pie',
          options: {
            data: f.data,
            angleField: 'mean',
            colorField: 'cut',
            pieStyle: { stroke: null },
          },
        };
      },
    });
    plot.render();
  });

```

</div>

📊 See more <a href="/en/examples/plugin/facet#column" target='blank'>examples</a>.

🎨 For an overview of the gauge plot options see the [API reference](/en/docs/api/advanced-plots/facet).

</div>
