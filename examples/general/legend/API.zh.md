---
title: API
---

功能描述：图例，配置 colorField 时显示，用于展示颜色分类信息

默认配置：

```js
visible: true,
position: 'top',
flipPage: true
```

| 细分配置  | 类型     | 功能描述                                                                                                                                                                                                 |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible   | boolean  | 是否可见                                                                                                                                                                                                 |
| position  | string   | 位置，支持 12 方位布局<br />top-left, top-center,top-right<br />bottom-left,bottom-center,bottom-right<br />left-top,left-center,left-bottom<br />right-top,right-center,right-bottom                    |
| formatter | function | 对图例显示信息进行格式化                                                                                                                                                                                 |
| flipPage  | boolean  | 图例过多时是否翻页显示                                                                                                                                                                                   |
| offsetX   | number   | 图例在 position 的基础上再往 x 方向偏移量，单位 px                                                                                                                                                       |
| offsetY   | number   | 图例在 position 的基础上再往 y 方向偏移量，单位 px                                                                                                                                                       |
| marker    | string   | 图例 marker，默认为 'circle'<br />可选类型：`circle`,`square`,`diamond`,`triangle`,`triangleDown`,`hexagon`,`bowtie`,`cross`,`tick`,`plus`,`hyphen`,`line`,`hollowCircle`,`hollowSquare`,`hollowDiamond` |
