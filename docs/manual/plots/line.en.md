---
title: Line
order: 0
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
              <Playground path="line/basic/demo/line.ts"></playground>
            </td>
            <td class="style1">
              <p><strong>Description</strong></p>
              <p>
                <span class="lake-fontsize-12"
                  >使用一条折线的线段显示数据在一个具有顺序性的维度上的变化。</span
                >
              </p>
              <p>
                <strong>Alias: </strong>
                <span class="lake-fontsize-12">折线图、线图、基础折线图</span>
              </p>
            </td>
          </tr>
                 <tr style="height: 33px">
            <td class="style1">
              <p><strong>When to use: </strong></p>
              <p><span class="lake-fontsize-12">折线图用于显示数据在一个连续的时间间隔或者时间跨度上的变化，它的特点是反映事物随时间或有序类别而变化的趋势。</span></p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td class="style1">
              <p><strong>视觉通道</strong></p>
              <p><span class="lake-fontsize-12">位置、方向</span></p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td colspan="1">
              <p><strong>This chart could be used for</strong></p>
              <p><span class="lake-fontsize-12">Comparison, Data Over Time</span></p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td colspan="1">
              <p><strong>数据准备</strong></p>
              <p>
                <span class="lake-fontsize-12">1 个「时间」或「有序名词」字段</span>
              </p>
              <p><span class="lake-fontsize-12">1 个「数值」字段</span></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

## Design Guide

<embed src="@/examples/line/basic/design.en.md"></embed>

## Quick start

<div class="sign">

```ts
import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line('container', {
      data,
      xField: 'Date',
      yField: 'scales',
    });

    line.render();
  });
```

</div>

📊 See more <a href="/en/examples/line/basic" target='blank'>examples</a>.

🎨 For an overview of the line plot options see the [API reference](/en/docs/api/plots/line).

## Line plot features

### Smooth

曲线图是用曲线将一系列的数据点连接的图表, 对应的只需要配置 `smooth: true` 属性即可。

<Playground path='line/basic/demo/spline.ts' rid='rect2'></playground>

### Step

对应的只需要配置 `stepType` 属性即可。

```ts
options: {
  stepType: 'vh' // 可选项：hv | vh | hvh | vhv
}
```

<Playground path='line/step/demo/line.ts' rid='rect3'></playground>

</div>