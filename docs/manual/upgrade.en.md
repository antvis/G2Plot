---
title: G2Plot 1.0 升级指南
order: 6
---

# 概述

- **图表类型扩展**：在 G2Plot 1.0 版本中，图表类型扩展到了常用的 40 多个类型，能够满足大部分统计分析场景的需求。同时，根据业务需要，G2Plot 的图表类型仍然在不断增加中，请及时关注。
- **文档体系升级**：在 1.0 中，我们根据社区反馈对文档进行了整体的升级，用户查看图表的使用方法时只需查找对应图表类型的文档即可，文档中📌图标代表该图表的必选配置，而 ✨图标代表了该图表区别于其他图表的特殊配置，缩短了文档的使用链路。同时，为了满足用户的个性化样式需求，为 [绘图属性](https://g2plot.antv.vision/zh/docs/manual/graphic-style) 部分增加了独立的文档。
- **常用图表组件功能增强**：根据社区的反馈，对图表标题、辅助线、tooltip 等常用的组件进行了功能扩展，详情见图表配置项变更说明。

# 变更说明

## 图表命名变更

G2Plot 1.0 参考可视化业界标准对图表命名进行了系统性的修正，使用户能够更方便的找到对应图表。我们为大部分命名变更提供了兼容性方案，但部分图表命名无法做到兼容，需要 0.x 的用户手动修改图表名称。

另外，在不影响图表功能的基础上，对一些图表类型进行了更细致的拆分，以保证系统上的一致性。

变更详情如下：

### 兼容性命名变更

G2Plot 1.0 的用户仍然可以调用 0.x 版本的图表名称使用图表，但是会报 warning 信息，但是我们强烈建议用户使用新的命名。

|  | G2Plot 1.0 命名 | G2Plot 0.x 命名 |
| --- | --- | --- |
| <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*7mqHS7IYeRwAAAAAAAAAAABkARQnAQ" width="200"> | Donut | Ring |
| <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*0t8aT7n94A4AAAAAAAAAAABkARQnAQ" width="200">  | StackedColumn | StackColumn |
| <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*EmCSSYa5dZMAAAAAAAAAAABkARQnAQ" width="200"> | GroupedColumn | GroupColumn |
| <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*aPzuQ5D24U8AAAAAAAAAAABkARQnAQ" width="200"> | PercentStackedColumn | PercentageStackColumn |
| <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*CLfuQI33_TIAAAAAAAAAAABkARQnAQ" width="200"> | StackedBar | StackBar |
| <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*a5SmRYq1wmcAAAAAAAAAAABkARQnAQ" width="200"> | GroupedBar | GroupBar |
| <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*rBB2QLxSjiUAAAAAAAAAAABkARQnAQ" width="200"> | PercentStackedBar | PercentageStackBar |
| <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*YYfSRoiOS_EAAAAAAAAAAABkARQnAQ" width="200"> | StackedArea | StackArea |
| <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*JnDeSZllp5gAAAAAAAAAAABkARQnAQ" width="200"> | PercentStackedArea | PercentageStackArea |


### 非兼容性命名变更

对于下列非兼容变更，需要用户手动更改代码中的图表类型：

|  | G2Plot 1.0 命名 | G2Plot 0.x 命名 |
| --- | --- | --- |
| <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*B9ImRILDn6QAAAAAAAAAAABkARQnAQ" width="200"> | Heatmap | Matrix |
| <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*1w6eSIFLQSkAAAAAAAAAAABkARQnAQ" width="200"> | DensityHeatmap | Heatmap |


### 图表类型拆分

- Rose (玫瑰图）在 1.0 中拆分为三种图表：Rose（基础玫瑰图）[链接](https://g2plot.antv.vision/zh/docs/manual/plots/rose)、StackedRose（堆叠玫瑰图）[链接](https://g2plot.antv.vision/zh/docs/manual/plots/stacked-rose)、GroupedRose（分组玫瑰图）[链接](https://g2plot.antv.vision/zh/docs/manual/plots/grouped-rose)。


- Gauge（仪表盘）在 1.0 中拆分为三种图表: Gauge（基础仪表盘）、 MeterGauge（标度仪表盘）、FanGauge（扇形仪表盘），详情见[文档](./plots/gauge)。


## 图表配置项变更

G2Plot 1.0 兼容大部分的 0.x 版本图表功能和配置项，同时根据社区反馈新增了一些配置项，详情如下：

### 配置项缺失待补

🔜 `tooltip.htmlContent`: 底层技术栈 G2 不再支持 tooltipContent，自定义 tooltip 相关配置项需要 G2Plot 在上层重新封装，将在后续小版本进行支持，请及时关注[CHANGELOG](https://github.com/antvis/G2Plot/blob/master/CHANGELOG.md)信息。

### 配置项非兼容性变更

- `Gauge.statistic` 配置项全量更新，详情见：[https://g2plot.antv.vision/zh/docs/manual/plots/gauge/#statistic](https://g2plot.antv.vision/zh/docs/manual/plots/gauge/#statistic)

- `Gauge.color`: 配置仪表盘色带的颜色，不再放在`GaugeStyle`中，而是独立配置，与其他图表统一，详情见：[https://g2plot.antv.vision/zh/docs/manual/plots/gauge/#color](https://g2plot.antv.vision/zh/docs/manual/plots/gauge/#color)


### 新增配置项

- `title`: 图表标题 新增 `position` 配置，可选项为 `left` | `middle` | `right`
- `description`: 图表标题 新增 `position` 配置，可选项为 `left` | `middle` | `right`
- `guideline`: 辅助线，自定义辅助线的 `start` 和 `end` 支持数据与百分比混合配置
```javascript
  guideLine: [
    {
      start: ['1991', '50%'], 
      end: ['1999', '50%'],
      text: {
        position: 'start',
        content: '自定义位置辅助线',
      },
    },
  ]
```

- `tooltip.domStyles`: 开放 tooltip 面板细粒度的 CSS 样式配置

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*hVUTQZ-eqiMAAAAAAAAAAABkARQnAQ" width="600">

- `tooltip.formatter`：开放 tooltip 内容信息定制
```
  tooltip:{
    formatter:(...args)=>{
      return {
        name:'a',
        value: 2
      }
    }
```

也可以通过指定 `tooltip` 的关联字段 `fields`  做更高程度的定制：
```
  tooltip:{
    fields:['a', 'b', 'c'],
    formatter:(...args)=>{
      return {
        name:'a',
        value: 2
      }
    }
```


## 遇到问题

我们尽可能收集了已知的所有不兼容变化和相关影响，但是有可能还是有一些场景我们没有考虑到。如果你在升级过程中遇到了问题，请到 [GitHub issues](https://github.com/antvis/G2Plot/issues) 进行反馈。我们会尽快响应和相应改进这篇文档。