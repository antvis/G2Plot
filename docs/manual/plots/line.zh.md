---
title: 折线图
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
              <playground path="line/basic/demo/line.ts"></playground>
            </td>
            <td class="style1">
              <p><strong>定义</strong></p>
              <p>
                <span class="lake-fontsize-12"
                  >使用一条折线的线段显示数据在一个具有顺序性的维度上的变化。</span
                >
              </p>
              <p>
                <strong>别名: </strong>
                <span class="lake-fontsize-12">折线图、线图、基础折线图</span>
              </p>
            </td>
          </tr>
             <tr style="height: 33px">
            <td class="style1">
              <p><strong>何时使用</strong></p>
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
              <p><strong>分析目的</strong></p>
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

## 设计指引

### 用法建议

<img
  alt="design"
  src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*NGoOQatmkx0AAAAAAAAAAABkARQnAQ"
  width="1000"
/>

### 元素构成

<img alt="design" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*uxv8RJgYx4oAAAAAAAAAAABkARQnAQ" width="800">

<div class="design-guide-list">

- X 轴：通常对应连续数据，值为时间，调用连续数据 X 轴。
- Y 轴：通常对应连续数据，值为数字，调用连续数据 Y 轴。
- 图例：通常出现在多条折线图中，用来区分不同折线代表的数据含义。
- 标签：用来解释数据点的值。
- 辅助元素：用来解释某个特殊的数据点的值，或标记出某个特殊含义的区域。

</div>

## 快速上手

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

📊 查看更多<a href="/zh/examples/line/basic" target='blank'>示例</a>.

🎨 折线图详细的配置参考 [API 文档](/zh/docs/api/plots/line)。

## 折线图特性

### 曲线图

曲线图是用曲线将一系列的数据点连接的图表, 对应的只需要配置 `smooth: true` 属性即可。

<playground path='line/basic/demo/spline.ts' rid='rect2'></playground>

### 阶梯型直线图

对应的只需要配置 `stepType` 属性即可。

```ts
options: {
  stepType: 'vh' // 可选项：hv | vh | hvh | vhv
}
```

<playground path='line/step/demo/line.ts' rid='rect3'></playground>

</div>