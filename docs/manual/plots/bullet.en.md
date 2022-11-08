---
title: Bullet plot
order: 9
---

<div class="manual-docs">
  <div data-card-type="block" data-lake-card="table" id="pLwYV" class="">
      <table
        class="lake-table"
        style="width: 100%; outline: none; border-collapse: collapse"
      >
        <colgroup>
          <col width="425" span="1" />
          <col width="340" span="1" />
        </colgroup>
        <tbody>
          <tr style="height: 33px">
            <td colspan="1" rowspan="5" style="background: #fff">
              <Playground path="progress-plots/bullet/demo/grouped.ts"></playground>
            </td>
            <td class="style1">
              <p><strong>定义</strong></p>
              <p>
                <span class="lake-fontsize-12">子弹图通过线性表达方式展示单一数据源各阶段精确的数据信息、某项数据与不同目标的校对结果等。</span>
              </p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td class="style1">
              <p><strong>何时使用</strong></p>
              <p><span class="lake-fontsize-12">显示阶段性数据信息，表达一些阶段性的数据。</span></p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td class="style1">
              <p><strong>数据与图形的映射</strong></p>
              <p class="lake-fontsize-12">分类数据字段映射到分类轴位置；连续数据字段映射到数据条的长度；目标字段映射到测量标记的刻度轴位置；范围数组映射到背景色条的大小</p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td colspan="1">
              <p><strong>分析目的</strong></p>
              <p><span class="lake-fontsize-12">比较、范围</span></p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td colspan="1">
              <p><strong>数据准备</strong></p>
              <p><span class="lake-fontsize-12">1 个「数值」字段，作为度量实际数值</span></p>
              <p><span class="lake-fontsize-12">1 个「数值」字段，作为比较度量的目标标记</span></p>
              <p><span class="lake-fontsize-12">1 个范围数组「数值」字段，作为区间范围的划分</span></p>
              <p><span class="lake-fontsize-12">0 ～ 1 个「无序名词」字段，作为分类字段</span></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

## Design Guide

### 元素构成

子弹图的发明是为了取代仪表盘上常见的那种里程表，时速表等基于圆形的信息表达方式。更多可以查看：[Bullet Graph Design Specification](https://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf)

<img alt="design" src="https://zos.alipayobjects.com/rmsportal/DkOloAVoymGGRJgmezOc.png" width='600'>

## Quick start

<div class='sign'>

```ts
import { Bullet } from '@antv/g2plot';

const data = [
  {
    title: '满意度',
    ranges: [100],
    measures: [80],
    target: 85,
  },
];

const bulletPlot = new Bullet('container', {
  data: [{ title: '满意度', ranges: [100], measures: [80], target: 85 }],
  measureField: 'measures',
  rangeField: 'ranges',
  targetField: 'target',
  xField: 'title',
  color: {
    range: '#f0efff',
  },
  yAxis: false,
});

bulletPlot.render();
```

</div>

📊 See more <a href="/en/examples/progress-plots/bullet" target='blank'>examples</a>.

🎨 For an overview of the bullet plot options see the [API reference](/en/docs/api/plots/bullet)。

</div>

## Bullet plot features

- Working hard to add...