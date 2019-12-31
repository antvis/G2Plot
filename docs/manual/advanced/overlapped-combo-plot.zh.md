---
title: 叠加型混合图表（双轴图）
order: 0
---

## 介绍

叠加型混合图表也就是我们常说的双轴图，多用于使用一张图表展示多个指标的场景。双轴图由多个统计图形图层（layer）构成，每个图层挂载一个独立数据源，所有图层共享同样的画布空间和坐标系，图层的声明顺序决定了图层的渲染顺序。

在双轴图中，tooltip、legend 和坐标轴 (axis) 是图层共享的顶层组件。所有图层共享一个 X 轴，当出现 y 轴度量（scale）不一致的情况时，会绘制多个Y 轴。

以比较常用的柱线混合图举例：

<img src ="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*FCouRbicQdkAAAAAAAAAAABkARQnAQ" width="600">

```js
import { OverlappedComboPlot } from '@antv/g2plot';

const comboPlot = new OverlappedComboPlot(document.getElementById('container'), {
  width: 600,
  height: 400,
  xAxis:{
      visible: true,
  },
  yAxis:{
      visible: true,
       // highlight-start
      colorMapping: true,
      synchroTick: true,
      // highlight-end
  },
   // highlight-start
  layers: [
  // highlight-end
    {
      // highlight-start
      type: 'groupColumn',
      name: '订单量',
      // highlight-end
      data: uvBillData,
      xField: 'time',
      yField: 'value',
      groupField: 'type',
    },
    {
      // highlight-start
      type: 'line',
      name: '转化',
      // highlight-end
      data: transformData,
      xField: 'time',
      yField: 'value',
      color: '#f8ca45',
      lineSize: 2,
    },
  ],
});

comboPlot.render();

```

上面的例子中，`layers[]`配置项中声明了两个统计图形图层，分别是 `groupColumn` (分组柱状图) 和 `line` (折线图)，图层的类型通过 `type` 配置项声明，除上文提到过的顶层组件（ axis | legend | tooltip ），统计图形图层的使用方式与使用单个图表()完全相同。图层的声明顺序决定了图层渲染的先后顺序，因此折线显示在柱形的上方。


## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。