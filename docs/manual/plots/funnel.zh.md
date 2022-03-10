---
title: 漏斗图
order: 6
---

<iframe width="100%" height="500" frameborder="0" allowfullscreen style="border:1px solid #d9d9d9;" src="https://www.yuque.com/antv/g2plot/funnel-guide?view=doc_embed">

## 快速上手

<div class="sign">

```ts
import { Funnel } from '@antv/g2plot';

const data = [
  { stage: '简历筛选', number: 253 },
  { stage: '初试人数', number: 151 },
  { stage: '复试人数', number: 113 },
  { stage: '录取人数', number: 87 },
  { stage: '入职人数', number: 59 },
];

const plot = new Funnel('container', {
  data: data,
  xField: 'stage',
  yField: 'number',
  legend: false,
});

plot.render();
```

</div>

📊 查看更多<a href="/zh/examples/more-plots/funnel#basic" target='blank'>示例</a>.

🎨 漏斗图详细的配置参考 [API 文档](/zh/docs/api/plots/funnel)。
