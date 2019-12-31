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

* `layers[]`配置项中声明了两个统计图形图层，分别是 `groupColumn` (分组柱状图) 和 `line` (折线图)，图层的类型通过 `type` 配置项声明，除上文提到过的顶层组件（ `axis` | `legend` | `tooltip` ），统计图形图层的使用方式与使用[单个图表](../plots/line)完全相同。

* 图层的声明顺序决定了图层渲染的先后顺序，因此折线显示在柱形的上方。

* `axis`在双轴图中属于顶层组件，在`yAxis`配置项中可以看到在混合图表中顶层配置的一些特点。`colorMapping`决定当出现多个 Y 轴是否采用颜色映射，`synchroTick`决定多 Y 轴的情况下是否使轴刻度线一致。


## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### width

**optional**, number 类型

图表宽度。

如不进行配置，则默认采用 theme 中的宽度。

### height

**optional**, number 类型

图表高度。

如不进行配置，则默认采用 theme 中的高度。

### forceFit

**optional**, boolean 类型

图表是否自适应容器宽高。


### layers

**required**





### xAxis

**optional** 见[通用图表配置](../general-config#axis)。

### yAxis

**optional** 

`colorMapping: boolean` 当出现多个 Y 轴时，坐标轴颜色是否采用对应的统计图形颜色，默认为`true`。

** 注意： 该配置项只有在统计图形为单色才生效(例如单折线、基础柱状图等) <br />

`synchroTick` 当出现多个 Y 轴时，是否对齐左侧 Y 轴刻度线。 默认为`true` <br />

其余配置见[通用图表配置](../general-config#axis)。

### legend

**optional** 

见[通用图表配置](../general-config#legend)。

### tooltip

**optional**

`sort: boolean` tooltip items是否进行动态排序，默认为`true` <br />

其余配置见[通用图表配置](../general-config#tooltip)。
