#### render() 📌

<description>**必选** </description>

功能描述：渲染图表。

默认配置：`无`

#### update()

<description>**可选** </description>

功能描述：更新图表配置项。

默认配置：`无`

使用示例：

```ts
plot.update({
  legend: false,
});
```

#### changeData()

<description>**可选** </description>

功能描述：更新图表数据。`update()`方法会导致图形区域销毁并重建，如果只进行数据更新，而不涉及其他配置项更新，推荐使用本方法。。

默认配置：`无`

使用示例：

```ts
plot.changeData(newData);
```
