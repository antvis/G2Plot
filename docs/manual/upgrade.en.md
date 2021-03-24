---
title: G2Plot 2.0 Upgrade guide
order: 7
---

## Summary

G2Plot 2.0 is under continuous development. Up to now, we have completed the development of P0 and P1 charts, and the development of other charts will be carried out as scheduled. More details please reference [Development Plan](https://www.yuque.com/antv/g2plot/ffgrfy#U9F3).

## Abandoned charts

| Chart name           | Description                                                                                                                                                                              | Example                                               |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Bubble               | 改用 Scatter 实现， 修改图表名称即可。                                                                                                                                                   | [Scatter](/en/examples/scatter/bubble#quadrant)     |
| StackedColumn        | 改用 Column 实现。<br/> 删除 stackField 配置，改为 seriesField，需要指定 `isStack: true`。                                                                                               | [Column](/en/examples/column/stacked)               |
| GroupedColumn        | 改用 Column 实现。<br/>删除 groupField 配置，改为 seriesField，需要指定 `isGroup: true`。                                                                                                | [Column](/en/examples/column/grouped)               |
| PercentStackedColumn | 改用 Column 实现。<br/> 删除 stackField 配置，改为 seriesField，需要指定 `isStack: true`、`isPercent: true`。                                                                            | [Column](/en/examples/column/percent)               |
| RangeColumn          | 改用 Column 实现。 <br/> 删除 stackField 配置，需要指定 `isRange: true`。 <br/> label 不再支持 topStyle、bottomStyle，详细配置请参考 [API](/en/examples/column/range/API#label) 文档。 | [Column](/en/examples/column/range#basic)           |
| StackedBar           | 改用 Bar 实现。<br/>删除 stackField 配置，改为 seriesField，需要指定 `isStack: true`。                                                                                                   | [Bar](/en/examples/bar/stacked)                     |
| PercentStackedBar    | 改用 Bar 实现。<br/> 删除 stackField 配置，改为 seriesField，需要指定 `isStack: true`、`isPercent: true`。                                                                               | [Bar](/en/examples/bar/percent)                     |
| RangeBar             | 改用 Bar 实现。 <br/>删除 stackField 配置，需要指定 `isRange: true`。 <br/> label 不再支持 topStyle、bottomStyle，详细配置请参考 [API](/en/examples/bar/range/API#label) 文档          | [Bar](/en/examples/bar/range#basic)                 |
| Donut                | 改用 Pie 实现，修改图表名称即可。                                                                                                                                                        | [Pie](/en/examples/pie/donut)                       |
| DualLine             | 改用 DualAxes 实现。                                                                                                                                                                     | [Demos](/en/examples/dual-axes/dual-line)           |
| ColumnLine           | 改用 DualAxes 实现。                                                                                                                                                                     | [Demos](/en/examples/dual-axes/column-line)         |
| StackedColumnLine    | 改用 DualAxes 实现。                                                                                                                                                                     | [Demos](/en/examples/dual-axes/stacked-column-line) |
| GroupedColumnLine    | 改用 DualAxes 实现。                                                                                                                                                                     | [Demos](/en/examples/dual-axes/grouped-column-line) |
| StackedArea          | 改用 Area 实现。 <br/>去掉 stackField ，改用 seriesField。                                                                                                                               | [Area](/en/examples/area/stacked)                   |
| PercentStackedArea   | 改用 Area 实现。去掉 stackField ，改用 seriesField ，需要指定 `isPercent: true`。                                                                                                        | [Area](/en/examples/area/percent)                   |
| StepLine             | 改用 Line 实现，需要指定 stepType。<br/>1.0 版版本可以使用默认 step ，2.0 版本必须手动指定 stepType（hv, vh, hvh, vhv），                                                                | [Line](/en/examples/line/step)                      |

## Configuration change

G2Plot 2.0 is compatible with most of the chart functions and configuration items of version 1.x. The details are as follows:

### General attributes

| Properties  | Description                                                            | Example                                                                                                        |
| ----------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| title       | 不再支持                                                               | -                                                                                                              |
| description | 不再支持                                                               | -                                                                                                              |
| forceFit    | 不再支持，改用 autoFit                                                 | -                                                                                                              |
| responsive  | 不再支持，内置                                                         | -                                                                                                              |
| guideLine   | 不再支持，改用 [annotations](/en/examples/general/annotation) 实现。 | -                                                                                                              |
| label       | label.type 会有兼容性问题，如果报错修改 type 配置或者去掉              | -                                                                                                              |
| slider      | 写法变更                                                               | <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*IZmLQaZ8ANMAAAAAAAAAAAAAARQnAQ" alt="示例" /> |
| scrollbar   | 写法变更                                                               | <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*Zq3NSpae7NEAAAAAAAAAAAAAARQnAQ" alt="示例" /> |
| events      | 写法变更                                                               | <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*NW8VTp2JPm0AAAAAAAAAAAAAARQnAQ" alt="示例" /> |
| visible     | 写法变更                                                               | <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*WRVJR6jRJ5AAAAAAAAAAAAAAARQnAQ" alt="示例" /> |
| animation   | 写法变更                                                               | <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*CE30TZLMIL4AAAAAAAAAAAAAARQnAQ" alt="示例" /> |

### Private configuration

| Chart name                      | Description                                                                                                                                                                                      | Example                                                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Scatter                         | pointSize: 不再支持，改用 size。<br /> shape: 去掉默认类型 circle，需要显性设置。<br /> trendline: 不再支持，改用 regressionLine，删除 showConfidence、confidenceStyle 配置，新增 algorithm 配置 | -                                                                                                              |
| Rose                            | categoryField: 不再支持，改用 xField。<br /> radiusField: 不再支持，改用 yField。<br /> colorField: 不再支持，改用 seriesField。                                                                 | -                                                                                                              |
| Bullet                          | 改动较大，详细参考 [Bullet](/en/examples/progress-plots/bullet)                                                                                                                                | -                                                                                                              |
| WordCloud                       | maskImage: 不再支持， 改用 imageMask。<br /> wordStyle 选项中的 gridSize 改为 padding。<br /> data 不再做限制，但需要指定 wordField、weightField。                                               | -                                                                                                              |
| TinyArea、TinyColumn、 TinyLine | 删除 xField 、yField。<br /> data 类型由 object[] 变为 number[]。                                                                                                                                | -                                                                                                              |
| Gauge                           | 删除 color 、 min 、 max。<br />删除 value , 改用 percent。 <br />删除 pivot 改用 indicator。 <br /> 更新 range ，详细参考[Gauge](/en/examples/progress-plots/gauge#basic)                     | <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*icQqR71EdikAAAAAAAAAAAAAARQnAQ" alt="示例" /> |
| Radar                           | 删除 radiusAxis ，改用 yAxis。<br /> 删除 angleField ， 改用 xField。<br /> 删除 radiusField ， 改用 yField。                                                                                    | -                                                                                                              |
| Liquid                          | 删除 min 、max。<br /> 删除 value ，改用 percent。<br /> 更新 statistic。                                                                                                                        | <img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*_CeWQbi4jlsAAAAAAAAAAAAAARQnAQ" alt="示例" /> |

## Problems

We've collected as much as possible all known incompatible changes and related impacts, but there may still be scenarios that we haven't taken into account. If you have problems during the upgrade process, please go to [GitHub issues](https://github.com/antvis/G2Plot/issues) for feedback. We will respond and improve this document as soon as possible.
