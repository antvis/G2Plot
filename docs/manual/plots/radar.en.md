---
title: Radar
order: 19
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
            <playground path='more-plots/radar/demo/basic.ts' rid='rect1'></playground>
          </td>
          <td class="style1">
          <p><strong>定义</strong></p>
            <p><span class="lake-fontsize-12">将不同系列的多个维度的数据量映射到坐标轴上，这些坐标轴起始于同一个圆心点，通常结束于圆周边缘，将同一组的点使用线连接起来，用颜色区分系列。</span></p>
            <p><strong>别名: </strong><span class="lake-fontsize-12">蛛网图</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td class="style1">
            <p><strong>视觉通道</strong></p>
            <p><span class="lake-fontsize-12">颜色、位置</span></p>
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
               <p><span class="lake-fontsize-12">1 ~ 2 个「无序名词」字段</span></p>
            <p><span class="lake-fontsize-12">1 个「数值」字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

## Quick start

<div class='sign'>

```ts
import { Radar } from '@antv/g2plot';

// 数据更新于 2021.01.09
const data = [
  { name: 'G2', star: 10371 },
  { name: 'G6', star: 7380 },
  { name: 'F2', star: 7414 },
  { name: 'L7', star: 2140 },
  { name: 'X6', star: 660 },
  { name: 'AVA', star: 885 },
  { name: 'G2Plot', star: 1626 },
];
const radarPlot = new Radar('container', {
  data: data.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
  xField: 'name',
  yField: 'star',
  meta: {
    star: {
      min: 0,
      nice: true,
    },
  },
  area: {},
});
radarPlot.render();
```

</div>

📊 See more <a href="/en/examples/more-plots/radar" target='blank'>examples</a>.

🎨 For an overview of the radar plot options see the [API reference](/en/docs/api/plots/radar).

</div>