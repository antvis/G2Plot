---
title: 图表方法
order: 1
---

# 图表方法

## render() 📌

**必选**

渲染图表。

## update()

**可选**

更新图表配置项。

```js
plot.update({
  width: 500,
  height: 600,
  legend: {
    visible: false,
  },
});

plot.render();
```

## changeData()

**可选**

更新图表数据。`update()`方法会导致图形区域销毁并重建，如果只进行数据更新，而不涉及其他配置项更新，推荐使用本方法。

```js
plot.changeData(newData);
```

## destroy()

**可选**

销毁图表。

## changeSize()

修改画布大小。
