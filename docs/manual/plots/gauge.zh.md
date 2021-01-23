---
title: 仪表盘
order: 6
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
            <playground path="progress-plots/gauge/demo/complex.ts" rid="rect0"></playground>
          </td>
          <td class="style1">
          <p><strong>定义</strong></p>
            <p><span class="lake-fontsize-12">仪表盘(Gauge)是一种拟物化的图表，刻度表示度量，指针表示维度，指针角度表示数值。仪表盘图表就像汽车的速度表一样，有一个圆形的表盘及相应的刻度，有一个指针指向当前数值。目前很多的管理报表或报告上都是用这种图表，以直观的表现出某个指标的进度或实际情况。</span></p>
            <p><span class="lake-fontsize-12">仪表盘的好处在于它能跟人们的常识结合，使大家马上能理解看什么、怎么看。拟物化的方式使图标变得更友好更人性化，正确使用可以提升用户体验。</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1">
            <p><strong>数据准备</strong></p>
            <p><span class="lake-fontsize-12">1 个百分比数值</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

## 设计指引

### 用法建议

为了视觉上的不拥挤且符合常识，我们建议指针的数量不超过 3 根。

## 快速上手

<div class='sign'>

```ts
import { Gauge } from '@antv/g2plot';

const gauge = new Gauge('container', {
  percent: 0.75,
  range: {
    color: '#5B8FF9',
  },
  statistic: {
    content: {
      formatter: ({ percent }) => `Rate: ${(percent * 100).toFixed(0)}%`,
    },
  },
});

gauge.render();
```

</div>

📊 查看更多<a href="/zh/examples/progress-plots/gauge" target='blank'>示例</a>.

🎨 仪表盘详细的配置参考 [API 文档](/zh/docs/api/plots/gauge).

</div>

## 图表特性

### 自定义指示器的样式

通过设置 `indicator` 来自定义指示器的样式，指示器包含指针 `pointer` 和 指针针头样式。

> 目前暂不支持指示器的形状自定义。

<playground path="progress-plots/gauge/demo/basic.ts" rid="rect1"></playground>

### 自定义辅助圆弧的样式

通过设置 `range` 的 `'ticks''` 和 `'color'` 来自定义辅助圆弧的样式

Example:

```ts
// 代表着，0 - 1/3: #F4664A, 1/3 - 2/3: #FAAD14, 2/3 - 1: #30BF78
{
  range: {
    ticks: [0, 1 / 3, 2 / 3, 1],
    color: ['#F4664A', '#FAAD14', '#30BF78'],
  },
}
```

<playground path="progress-plots/gauge/demo/custom-color.ts" rid="rect2"></playground>
