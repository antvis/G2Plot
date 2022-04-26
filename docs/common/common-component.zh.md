#### axis

xAxis、yAxis 配置相同。**注意**：由于 DualAxes(双轴图) 和 BidirectionalBar(对称条形图) 是双 y 轴， yAxis 类型是以 yField 中的字段作为 `key` 值的`object`。

```ts
双 y 轴中 yAxis 配置示例：
yAxis: {
  '2016年耕地总面积': {
    nice: true,
  },
  '2016年转基因种植面积': {
    nice: true,
    min: 0,
    max: 100,
},
```

`markdown:docs/common/axis.zh.md`

#### legend

`markdown:docs/common/legend.zh.md`


#### label

> 小提琴图暂时不支持 label 展示，可以使用 annnotation 进行替代

`markdown:docs/common/label.zh.md`


#### tooltip

`markdown:docs/common/tooltip.zh.md`

#### annotations

详细配置见：各 Annotation 配置项说明。

<!-- 直接 三级导航展开 -->
`markdown:docs/common/annotations.zh.md`
