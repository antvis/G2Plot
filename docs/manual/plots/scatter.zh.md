---
title: Scatter - 散点图
order: 1
---

# 快速上手

```js
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
const scatter = new Scatter('container', {
  width: 400,
  height: 300,
  appendPadding: 10,
  data,
  xField: 'year',
  yField: 'value',
  yAxis: {
    nice: true,
  },
});

scatter.render();
```

# 配置属性

## 图表容器

### width

**可选**, _number_

功能描述： 设置图表宽度。

默认配置： `400`

### height

**可选**, _number_

功能描述： 设置图表高度。

默认配置： `400`
