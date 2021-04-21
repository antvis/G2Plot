---
title: Column
order: 1
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
              <playground path="column/basic/demo/basic.ts" rid="rect1"></playground>
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
               柱形图</span>
              </p>
          </td>
          </tr>
          <tr style="height: 33px">
            <td class="style1">
              <p><strong>何时使用</strong></p>
              <p><span class="lake-fontsize-12">柱状图通过垂直柱子长短对比数值大小，适用于对比一组或者多组分类数据。</span></p>
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
              <p><strong>分析目的</strong></p>
              <p><span class="lake-fontsize-12">比较、趋势</span></p>
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
                <span class="lake-fontsize-12">0 ～ 1 个「无序名词」字段</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

## Design Guide

### 用法建议

<img alt="design" src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*ay53Q59BfbkAAAAAAAAAAABkARQnAQ' width='1000'>

### 元素构成

<img alt="design" src='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*O4GCSZuzPJ0AAAAAAAAAAABkARQnAQ' width='800'>

<div class="design-guide-list">

- X 轴：通常对应分类数据，值为文本，调用连续数据 X 轴。
- Y 轴：通常对应连续数据，值为数字，调用连续数据 Y 轴。
- 图例：通常出现在分组柱关图、分组条形图中，用来区分不同柱子代表的数据含义。
- 标签：用来解释数据点的值。
- 辅助元素：用来解释某个特殊的数据点的值，或标记出某个特殊含义的区域。

</div>

## Quick start

<div class='sign'>

```ts
import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/K0kfOzo4j%24/column.json')
   .then(data => data.json())
   .then(data => {
      const columnPlot = new Column('container', {
        data,
        xField: 'type',
        yField: 'sales',
      });

      columnPlot.render();
   });
```

</div>

📊 See more <a href="/en/examples/column/basic" target='blank'>examples</a>.

🎨 For an overview of the column plot options see the [API reference](/en/docs/api/plots/column).

</div>

## Column plot features

### Stacked Column

使用颜色不同的堆叠的柱形来显示各维度的数值。横轴标示出第一个分类维度，颜色标示出第二个分类维度，纵轴显示相应的值。

通过指定 `seriesField` 且设置 `isStack: true` 就可以创建堆叠柱状图。

<playground path="column/stacked/demo/basic.ts" rid="rect2"></playground>

### Grouped Column

使用颜色不同的柱形并排组成小组来显示各维度的数值。横轴标示出分组，颜色标示出分类，纵轴显示相应的值。

通过指定 `seriesField` 且设置 `isGroup: true` 就可以创建分组柱状图。

<playground path="column/grouped/demo/basic.ts" rid="group-column"></playground>

### Specify minWidth and maxWidth of column

Using `maxColumnWidth` to specify the maximum width of column, and `minColumnWidth` to specify the minimum width of column.

通过组合指定柱子最大宽度、最小宽度可以达到指定柱子宽度的效果。

<playground path="column/basic/demo/width.ts" rid="specify-column-width"></playground>

### Set corner-radius of column

通过设置 `columnStyle.radius` 可以指定柱子的圆角，数据类型可以是 `number` 也可以是 `number[]`。

当柱子数值为正值时，`const [r1, r2, r3, r4] = radius` 依次代表柱子左上角、右上角、右下角、左下角的 `radius`。
当柱子数值为负值时，`const [r1, r2, r3, r4] = radius` 依次代表柱子左下角、右下角、右上角、左上角的 `radius`。

<playground path="column/grouped/demo/corner-radius.ts" rid="corner-radius"></playground>

### Set background style of column

Using `columnBackground.style` to specify the background style of column.

<playground path="column/stacked/demo/column-background.ts" rid="column-background"></playground>
