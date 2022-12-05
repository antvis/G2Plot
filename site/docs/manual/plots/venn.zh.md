---
title: 韦恩图
order: 30
---

<iframe width="100%" height="500" frameborder="0" allowfullscreen style="border:1px solid #d9d9d9;" src="https://www.yuque.com/antv/g2plot/venn-guide?view=doc_embed">

## 快速上手

<div class="sign">

```ts
import { Venn } from '@antv/g2plot';

const plot = new Venn('container', {
  data: [
    { sets: ['A'], size: 12, label: 'A' },
    { sets: ['B'], size: 12, label: 'B' },
    { sets: ['C'], size: 12, label: 'C' },
    { sets: ['A', 'B'], size: 2, label: 'A&B' },
    { sets: ['A', 'C'], size: 2, label: 'A&C' },
    { sets: ['B', 'C'], size: 2, label: 'B&C' },
    { sets: ['A', 'B', 'C'], size: 1 },
  ],
  setsField: 'sets',
  sizeField: 'size',
});
plot.render();
```

</div>

📊 查看更多<a href="/zh/examples/more-plots/venn#basic" target='blank'>示例</a>.

🎨 韦恩图详细的配置参考 [API 文档](/zh/docs/api/plots/venn)。
