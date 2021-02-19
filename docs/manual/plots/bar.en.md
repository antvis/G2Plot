---
title: Bar
order: 3
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
              <playground path="bar/basic/demo/basic.ts"></playground>
            </td>
            <td class="style1">
              <p><strong>定义</strong></p>
              <p>
                <span class="lake-fontsize-12"
                  >使用柱形显示维度的数值。横轴显示分类维度，纵轴显示相应的值</span
                >
              </p>
               <p>
                <strong>别名: </strong>
                <span class="lake-fontsize-12">
               条状图</span>
              </p>
            </td>
          </tr>
               <tr style="height: 33px">
            <td class="style1">
              <p><strong>何时使用</strong></p>
              <p><span class="lake-fontsize-12">条形图通过水平柱子长短对比数值大小，它与柱状图类似，只是交换了 X 轴与 Y 轴位置。均适用于对比一组或者多组分类数据。</span></p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td class="style1">
              <p><strong>视觉通道</strong></p>
              <p><span class="lake-fontsize-12">位置、颜色</span></p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td colspan="1">
              <p><strong>分析目的</strong></p>
              <p><span class="lake-fontsize-12">比较、分布、排名</span></p>
            </td>
          </tr>
          <tr style="height: 33px">
            <td colspan="1">
              <p><strong>数据准备</strong></p>
              <p>
                <span class="lake-fontsize-12">1 ～ 2 个「无序名词」字段</span>
              </p>
              <p><span class="lake-fontsize-12">1 个「数值」字段</span></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

## Design Guide

### 用法建议

<img alt="design" src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*0ijxQ78m7M0AAAAAAAAAAABkARQnAQ' width='1000'>

### 元素构成

<img alt="design" src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*hPSDQ5O0A9gAAAAAAAAAAABkARQnAQ' width='800'>

<div class="design-guide-list">

- X 轴：通常对应连续数据，值为数字，调用连续数据 X 轴。
- Y 轴：通常对应分类数据，值为文本，调用连续数据 Y 轴。
- 图例：通常出现在分组柱关图、分组条形图中，用来区分不同柱子代表的数据含义。
- 标签：用来解释数据点的值。
- 辅助元素：用来解释某个特殊的数据点的值，或标记出某个特殊含义的区域。

</div>

## Quick start

<div class='sign'>

```ts
import { Bar } from '@antv/g2plot';

const data = [
  { year: '1951 年', value: 38 },
  { year: '1952 年', value: 52 },
  { year: '1956 年', value: 61 },
  { year: '1957 年', value: 145 },
  { year: '1958 年', value: 48 },
];

const bar = new Bar('container', {
  data,
  xField: 'value',
  yField: 'year',
  seriesField: 'year',
  legend: {
    position: 'top-left',
  },
});

bar.render();
```

</div>

📊 See more <a href="/en/examples/bar/basic" target='blank'>examples</a>.

🎨 For an overview of the bar plot options see the [API reference](/en/docs/api/plots/bar).

</div>

## Bar plot features

### Specify minWidth and maxWidth of bar

Using `maxBarWidth` to specify the maximum width of bar, and `minBarWidth` to specify the minimum width of bar.

通过组合指定柱子最大宽度、最小宽度可以达到指定柱子宽度的效果。

<playground path="bar/basic/demo/width.ts" rid="specify-bar-width"></playground>

### Set corner-radius of bar

通过设置 `barStyle.radius` 可以指定柱子的圆角，数据类型可以是 `number` 也可以是 `number[]`。

当柱子数值为正值时，`const [r1, r2, r3, r4] = radius` 依次代表柱子左上角、右上角、右下角、左下角的 `radius`。
当柱子数值为负值时，`const [r1, r2, r3, r4] = radius` 依次代表柱子左下角、右下角、右上角、左上角的 `radius`。

<playground path="bar/grouped/demo/corner-radius.ts" rid="corner-radius"></playground>

### Set background style of bar

Using `barBackground.style` to specify the background style of bar.

<playground path="bar/basic/demo/bar-background.ts" rid="bar-background"></playground>
