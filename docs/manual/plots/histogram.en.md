---
title: Histogram
order: 8
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
            <playground path='more-plots/histogram/demo/basic.ts'></playground>
          </td>
          <td class="style1">
            <p><strong>定义</strong></p>
            <p><span class="lake-fontsize-12">直方图是一种统计报告图，由一系列高度不等的纵向条纹或线段表示数据分布的情况。</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td class="style1">
            <p><strong>视觉通道</strong></p>
            <p><span class="lake-fontsize-12">位置</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1">
            <p><strong>分析目的</strong></p>
            <p><span class="lake-fontsize-12">比较、趋势</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1">
            <p><strong>数据准备</strong></p>
            <p><span class="lake-fontsize-12">1 个「时间」或「有序名词」字段</span></p>
            <p><span class="lake-fontsize-12">0 ~ 1 个「无序名词」字段</span></p>
            <p><span class="lake-fontsize-12">1 个「数值」字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

## Quick start

<div class="sign">

```ts
import { Histogram } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/RoliHq%2453S/histogram.json')
  .then((data) => data.json())
  .then((data) => {
    const histogramPlot = new Histogram('container', {
      data,
      binField: 'value',
      binWidth: 2,
    });

    histogramPlot.render();
  });
```

</div>

📊 See more <a href="/en/examples/more-plots/histogram" target='blank'>examples</a>.

🎨 For an overview of the histogram plot options see the [API reference](/en/docs/api/plots/histogram).

</div>