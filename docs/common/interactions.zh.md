交互（Interaction）是 G2 中的重要 API，通过这个方法可以加载 G2 内置的交互，或者基于交互语法形式自定义的 Interaction 交互。G2 4.0 在交互方面做了非常大的调整，所有的交互代码都是插入式的，通过交互语法进行组织。使用交互的方式也非常简单，仅需要设置交互的名称即可。

在 G2Plot 中，透传了 G2 的交互语法，同时也内置了一些与具体 plot 绑定的交互。

#### 开启交互

使用方式：
```plain
// 开启「鼠标移入图表元素（柱状图的柱子、点图的点等）时触发 active」的交互
interactions: [{ type: 'element-active' }]

// 开启多个交互
interactions: [{ type: 'element-active' }, { type: 'brush' }]
```

#### 关闭交互

```plain
plot.chart.removeInteraction('interaction-type');
```

使用示例：
```plain
// 移除 图例筛选 交互
plot.chart.removeInteraction('legend-filter');
```

#### 更多

更多关于交互的使用说明，见 [G2 文档](https://g2.antv.vision/zh/docs/api/general/interaction#element-active)

后续会补充内置支持的交互列表以及与具体 plot 绑定的交互，敬请期待。