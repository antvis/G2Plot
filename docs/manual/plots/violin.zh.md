---
title: 小提琴图
order: 21
contributors:
  [{ author: '新茗', github: 'visiky', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/KAeYPA3TV0/avatar.jpeg' }]
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
            <Playground path="more-plots/violin/demo/basic.ts" rid="violin-basic"></playground>
          </td>
          <td class="style1">
          <p><strong>定义</strong></p>
            <p><span class="lake-fontsize-12">小提琴图 (Violin Plot) 用于显示数据分布及其概率密度。
</span></p>
            <p><span class="lake-fontsize-12">这种图表结合了箱形图和密度图的特征，主要用来显示数据的分布形状。中间的黑色粗条表示四分位数范围，从其延伸的幼细黑线代表 95% 置信区间，而白点则为中位数。</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1">
            <p><strong>数据准备</strong></p>
            <p><span class="lake-fontsize-12">1 或 2 个分类字段</span></p>
            <p><span class="lake-fontsize-12">1 个数值字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

## 快速开始

<div class='sign'>

```ts
import { Violin } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/6b0a5f1d-5931-42ae-b3ba-3c3cb77d0861.json')
  .then((response) => response.json())
  .then((data) => {
    const violinPlot = new Violin('container', {
      height: 500,
      data: data,
      xField: 'x',
      yField: 'y',
    });
    violinPlot.render();
  });
```

</div>

📊 See more <a href="/zh/examples/more-plots/violin" target='blank'>examples</a>.

🎨 For an overview of the violin plot options see the [API reference](/zh/docs/api/plots/violin).

</div>

## 图表特性

### 设置小提琴图形状

<Playground path="more-plots/violin/demo/shape.ts" rid="violin-shape"></playground>