---
title: G2Plot 1.0 升级指引
order: 6
---

## 图表命名变更

G2Plot 1.0 参考业界标准重新确定了图表命名，对于大部分的命名变更都提供了兼容方案，用户调用旧的命名方式仍然生效，但是会报warning。

### 兼容性变更

Ring => Donut

StackColumn => stackedColumn

GroupColumn => groupedColumn

PercentageStackColumn => percentStackedColumn

StackBar => stackedBar

GroupBar => groupedBar

PercentageStackBar => percentStackedBar

StackArea => stackedArea

PercentageStackArea => percentStackedArea


### 非兼容变更

Matrix => Heatmap

Heatmap => DensityHeatmap


## 图表类型拆分

G2Plot 1.0 在不影响图表功能的基础上，对一些图表类型进行了更细致的拆分：

Rose => Rose, StackedRose, GroupedRose <br />[https://g2plot.antv.vision/zh/examples/rose/rose#basic](https://g2plot.antv.vision/zh/examples/rose/rose#basic)

Gauge => Gauge, MeterGauge, FanGauge<br />[https://g2plot.antv.vision/zh/examples/gauge/gauge](https://g2plot.antv.vision/zh/examples/gauge/gauge)


## API 更新

- title & description   新增position配置，可选项为'left' | 'middle' | 'right'

- guideline: 自定义辅助线的start和end支持数据与百分比混合配置

- tooltip：开放tooltip CSS样式配置

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*hVUTQZ-eqiMAAAAAAAAAAABkARQnAQ" width="600">


- Gauge： 

     statistic配置项全量更新，详情见： [https://g2plot.antv.vision/zh/docs/manual/plots/gauge/#statistic](https://g2plot.antv.vision/zh/docs/manual/plots/gauge/#statistic)<br />     color: 配置仪表盘色带的颜色，不再放在GaugeStyle中，而是独立配置，与其他图表统一，详情见：[https://g2plot.antv.vision/zh/docs/manual/plots/gauge/#color](https://g2plot.antv.vision/zh/docs/manual/plots/gauge/#color)<br />    



## API 缺失待补

- tooltip.htmlContent: 底层技术栈 G2 不再支持tooltipContent，自定义tooltip相关配置项需要G2Plot在上层重新封装，将在后续小版本进行支持。
