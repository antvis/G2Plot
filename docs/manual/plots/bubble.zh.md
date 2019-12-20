---
title: Bubble 气泡图
order: 1
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*tdedT4uaPaYAAAAAAAAAAABkARQnAQ" width="400">

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

** 除特殊配置外, 气泡图API与[散点图(Scatter)](./scatter)相同。

### sizeField

**reqiured**, string 类型

决定气泡图点大小的字段名。


### pointSize

**optional**, number[ ]

指定气泡图点大小的值域，顺序为[`min`,`max`]。

用法示例：

```js
const bubblePlot = new Bubble(document.getElementById('container'), {
      data,
      xField: 'change in female rate',
      yField: 'change in male rate',
      colorField: 'continent',
      color: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
      // highlight-start
      sizeField: 'pop',
      bubbleSize: [4, 30],
      // highlight-end
    });
    bubblePlot.render();
```

效果：<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*yN9WSJ8X1wcAAAAAAAAAAABkARQnAQ" width="400">