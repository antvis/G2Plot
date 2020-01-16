---
title: Bubble 气泡图
order: 1
---

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*tdedT4uaPaYAAAAAAAAAAABkARQnAQ" width="400">

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

除特殊配置外, 气泡图API与[散点图(Scatter)](./scatter)相同。

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

### timeline

**optional**

播放轴组件

`field: string` 播放轴筛选字段，必选<br />
`loop: boolean` 是否循环播放，可选<br />
`speed: number` 播放轴播放速度，多少s一个间隔，可选<br />
`height: number;` 播放轴高度，可选

完整示例：

```js
const bubblePlot = new Bubble(document.getElementById('container'), {
    data,
    xField: 'income',
    yField: 'lifeExpectancy',
    colorField: 'country',
    sizeField: 'population',
    // highlight-start
    interactions: [
        {
            type: 'timeline',
            cfg: {
                field: 'year',
            },
        },
    ],
    // highlight-end
});
bubblePlot.render();
```

效果：<img alt="播放轴组件效果" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*rvY2SZEIYo4AAAAAAAAAAABkARQnAQ" width="400">
