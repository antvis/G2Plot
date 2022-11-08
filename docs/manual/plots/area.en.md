---
title: Area
order: 5
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
              <Playground path="area/basic/demo/basic.ts"></playground>
            </td>
            <td class="style1">
              <p><strong>定义</strong></p>
              <p>
                <span class="lake-fontsize-12"
                  >使用带填充区域的线段显示数据在一个具有顺序性的维度上的变化。</span
                >
              </p>
            </td>
          </tr>
            <tr style="height: 33px">
            <td class="style1">
              <p><strong>何时使用</strong></p>
              <p><span class="lake-fontsize-12">面积图可用来展示连续性数据，可很好地表示趋势、累积、减少以及变化。
               堆叠面积图更擅于展示部分和整体之间的关系或趋势，而不是传达特定的值。</span></p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td class="style1">
              <p><strong>视觉通道</strong></p>
              <p><span class="lake-fontsize-12">颜色、位置</span></p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td colspan="1">
              <p><strong>分析目的</strong></p>
              <p><span class="lake-fontsize-12">比较、组成、趋势</span></p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td colspan="1">
              <p><strong>数据准备</strong></p>
              <p>
                <span class="lake-fontsize-12">1 个「时间」或「有序名词」字段</span>
              </p>
              <p><span class="lake-fontsize-12">1 个「数值」字段</span></p>
              <p>
                <span class="lake-fontsize-12">1 个「无序名词」字段(可选)</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

## Design Guide

### 用法建议

<img alt="design" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*apZASYZEX68AAAAAAAAAAABkARQnAQ" width="1000">

### 元素构成

<img alt="design" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ENU-Q78K3w8AAAAAAAAAAABkARQnAQ" width="800">

<div class="design-guide-list">

- X 轴：通常对应连续数据，值为时间，调用连续数据 X 轴。
- Y 轴：通常对应连续数据，值为数字，调用连续数据 Y 轴。
- 图例：通常出现在多条折线图中，用来区分不同折线代表的数据含义。
- 标签：用来解释数据点的值。
- 辅助元素：用来解释某个特殊的数据点的值，或标记出某个特殊含义的区域。

</div>

## Quick start

<div class='sign'>

```ts
import { Area } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
  .then((res) => res.json())
  .then((data) => {
    const area = new Area('container', {
      data,
      xField: 'timePeriod',
      yField: 'value',
      xAxis: {
        range: [0, 1],
      },
    });
    area.render();
  });
```

</div>

📊 See more <a href="/en/examples/area/basic" target='blank'>examples</a>.

🎨 For an overview of the area plot options see the [API reference](/en/docs/api/plots/area)。

## Area features

### Add median line annotations

- Add a median line to the area plot by using `annotations`.

<Playground path="component/annotation/demo/area-with-line-annotation.ts" rid="area-line-annotations"></playground>

</div>
