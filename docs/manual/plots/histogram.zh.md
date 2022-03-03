---
title: 直方图
order: 8
---

<iframe width="100%" height="500" frameborder="0" allowfullscreen style="border:1px solid #d9d9d9;" src="https://www.yuque.com/antv/g2plot/histogram-guide?view=doc_embed">

## 快速上手

<div class="sign">

```ts
import { Histogram } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/RoliHq%2453S/histogram.json')
  .then((data) => data.json())
  .then((data) => {
    const histogramPlot = new Histogram('container', {
      data,
      binField: 'value',
      binWidth: 2,
    });

    histogramPlot.render();
  });
```

</div>

📊 查看更多<a href="/zh/examples/more-plots/histogram" target='blank'>示例</a>.

🎨 直方图详细的配置参考 [API 文档](/zh/docs/api/plots/Histogram)。

</div>