---
title: 折线图
order: 0
---

<div class="manual-docs">

# 设计指引

`markdown:examples/line/basic/design.zh.md`

# 快速上手

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

📊 查看更多<a href="/zh/examples/line/basic" target='blank'>示例</a>.

🎨 折线图详细的配置参考 [API 文档](/zh/docs/api/plots/line)。

# 折线图特性

## 曲线图

曲线图是用曲线将一系列的数据点连接的图表, 对应的只需要配置 `smooth: true` 属性即可。

<playground path='line/basic/demo/spline.ts' rid='rect2'></playground>

## 阶梯型直线图

对应的只需要配置 `stepType` 属性即可。

```ts
options: {
  stepType: 'vh' // 可选项：hv | vh | hvh | vhv
}
```

<playground path='line/step/demo/line.ts' rid='rect3'></playground>

</div>