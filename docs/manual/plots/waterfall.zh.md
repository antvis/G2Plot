---
title: 瀑布图
order: 9
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
           <playground path='more-plots/waterfall/demo/basic.ts'></playground>
          </td>
          <td class="style1">
          <p><strong>定义</strong></p>
            <p><span class="lake-fontsize-12">瀑布图形似瀑布流水，采用绝对值与相对值结合的方式，适用于表达数个特定数值之间的数量变化关系。</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td class="style1">
            <p><strong>视觉通道</strong></p>
            <p><span class="lake-fontsize-12">颜色、长度、位置</span></p>
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
            <p><span class="lake-fontsize-12">1 个「数值」字段</span></p>
               <p><span class="lake-fontsize-12">1 个「有序名词」或「时间」或「无序名词」字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

# 快速上手


<div class="sign">

```ts
import { Waterfall } from '@antv/g2plot';

const data = [
  { type: '日用品', money: 120 },
  { type: '伙食费', money: 900 },
  { type: '交通费', money: 200 },
  { type: '水电费', money: 300 },
  { type: '房租', money: 1200 },
  { type: '商场消费', money: 1000 },
  { type: '红包收入', money: -2000 },
];

const waterfallPlot = new Waterfall('container', {
  data,
  xField: 'type',
  yField: 'money',
});

waterfallPlot.render();
```

</div>

<div style="height:12px;"></div>

📊 查看更多<a href="/zh/examples/more-plots/waterfall" target='blank'>示例</a>.

瀑布图详细的配置参考 [API 文档](/zh/docs/api/plots/waterfall)。

# 瀑布图特性

## 颜色

通过 `risingFill` 和 `fallingFill` 可以指定普通柱形颜色和正值柱形颜色，对于汇总值可以通过 `total.style.fill` 指定颜色。

Example：

```ts
{
  risingFill: 'red',
  fallingFill: 'green',
  total: {
    style: {
      fill: '#96a6a6',
    },
  },
}
```

</div>


