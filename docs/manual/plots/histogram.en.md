---
title: Histogram
order: 8
---

<iframe width="100%" height="500" frameborder="0" allowfullscreen style="border:1px solid #d9d9d9;" src="https://www.yuque.com/antv/g2plot/histogram-guide?view=doc_embed">

## Quick start

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

📊 See more <a href="/en/examples/more-plots/histogram" target='blank'>examples</a>.

🎨 For an overview of the histogram plot options see the [API reference](/en/docs/api/plots/histogram).

</div>