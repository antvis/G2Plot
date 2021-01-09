---
title: Line
order: 0
---

<div class="manual-docs">

# Design Guide

`markdown:examples/line/basic/design.en.md`

# Quick start

<div class="sign">

```ts
import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line('container', {
      data,
      xField: 'Date',
      yField: 'scales',
    });

    line.render();
  });
```

</div>

📊 See more <a href="/en/examples/line/basic" target='blank'>examples</a>.

🎨 For an overview of the line plot options see the [API reference](/en/docs/api/plots/line).

# Line plot features

## Smooth

曲线图是用曲线将一系列的数据点连接的图表, 对应的只需要配置 `smooth: true` 属性即可。

<playground path='line/basic/demo/spline.ts' rid='rect2'></playground>

## Step

对应的只需要配置 `stepType` 属性即可。

```ts
options: {
  stepType: 'vh' // 可选项：hv | vh | hvh | vhv
}
```

<playground path='line/step/demo/line.ts' rid='rect3'></playground>

</div>