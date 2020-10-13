#### render() 📌

<description>**required** </description>

Description: Render the chart.

Default: `none`

#### update()

<description>**optional** </description>

Description: Update chart configuration and overwrite it without comparing difference.

Default: `none`

Example：

```ts
plot.update({
  ...currentConfig,
  legend: false,
});
```

<!--
#### changeData()

<description>**可选** </description>

功能描述：更新图表数据。`update()`方法会导致图形区域销毁并重建，如果只进行数据更新，而不涉及其他配置项更新，推荐使用本方法。。

默认配置：`无`

使用示例：

```ts
plot.changeData(newData);
``` -->
