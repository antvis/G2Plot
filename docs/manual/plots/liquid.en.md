---
title: Liquid
order: 10
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
            <playground path='progress-plots/liquid/demo/basic.ts'></playground>
          </td>
          <td class="style1">
          <p><strong>定义</strong></p>
            <p><span class="lake-fontsize-12">水波图是一种用球形容器和其中的水平线位置来表示进度的示意图。</span></p>
            <p><strong>别名: </strong><span class="lake-fontsize-12">水波球、进度球</span></p>
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
            <p><span class="lake-fontsize-12">比较</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1">
            <p><strong>数据准备</strong></p>
            <p><span class="lake-fontsize-12">1 个「数值」字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

## Quick start

<div class='sign'>

```ts
import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid('container', {
  percent: 0.25,
});
liquidPlot.render();
```

</div>

📊 See more <a href="/en/examples/progress-plots/liquid" target='blank'>examples</a>.

🎨 For an overview of the liquid plot options see the [API reference](/en/docs/api/plots/liquid).

</div>