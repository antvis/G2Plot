---
title: Scatter
order: 20
contributors:
  [
    {
      author: '新茗',
      github: 'visiky',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/KAeYPA3TV0/avatar.jpeg',
    },
  ]
---

<div class="manual-docs">

 <div data-card-type="block" data-lake-card="table" id="pLwYV" class="">
    <table class="lake-table" style="width: 100%; outline: none; border-collapse: collapse;">
      <colgroup>
        <col width="425" span="1">
        <col width="340" span="1">
      </colgroup>
      <tbody>
        <tr style="height: 33px;">
          <td colspan="1" rowspan="4" style="background:#fff">
            <Playground path="scatter/scatter/demo/color-mapping.ts" rid="rect1" ratio="0"></playground>
          </td>
          <td class="style1">
          <p><strong>定义</strong></p>
            <p><span class="lake-fontsize-12">散点图是将所有的数据以不同颜色的点的形式展现在平面直角坐标系上的统计图表。</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td class="style1">
            <p><strong>视觉通道</strong></p>
            <p><span class="lake-fontsize-12">分布</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1">
            <p><strong>分析目的</strong></p>
            <p><span class="lake-fontsize-12">比较</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1">
            <p><strong>数据准备</strong></p>
            <p><span class="lake-fontsize-12">1 个「数值」字段</span></p>
               <p><span class="lake-fontsize-12">0 ~ 1 个「无序名词」字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

## Quick start

<div class='sign'>

```ts
import { Scatter } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/j5ADHaMsZx/scatter.json')
  .then(data => data.json())
  .then(data => {
    const scatterPlot = new Scatter('container', {
      data,
      xField: 'x',
      yField: 'y',
      size: 5,
      pointStyle: {
        fill: '#5B8FF9',
      },
    });
    scatterPlot.render();
  });
```

</div>

📊 See more <a href="/en/examples/scatter/scatter" target='blank'>examples</a>.

🎨 For an overview of the scatter plot options see the [API reference](/en/docs/api/plots/scatter).

## Scatter plot features

### RegressionLine

<Playground path='scatter/scatter/demo/line.ts' rid='rect2'></playground>

### Bubble

气泡图是一种多变量的统计图表，由笛卡尔坐标系（直角坐标系）和大小不一、颜色不同的圆组成，可以看作是散点图的变形。

<Playground path='scatter/bubble/demo/quadrant.ts' rid='rect3'></playground>

</div>