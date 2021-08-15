import { Heatmap } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/basement_prod/a719cd4e-bd40-4878-a4b4-df8a6b531dfe.json')
  .then((res) => res.json())
  .then((data) => {
    const heatmapPlot = new Heatmap(document.getElementById('container'), {
      width: 650,
      height: 500,
      autoFit: false,
      data,
      xField: 'Month of Year',
      yField: 'District',
      colorField: 'AQHI',
      color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
      meta: {
        'Month of Year': {
          type: 'cat',
        },
      },
      pattern: {
        type: 'square',
        cfg: {
          isStagger: true,
        },
      },
    });
    heatmapPlot.render();
  });
