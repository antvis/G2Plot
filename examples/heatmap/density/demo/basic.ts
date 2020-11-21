import { Heatmap } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/heatmap.json')
  .then((res) => res.json())
  .then((data) => {
    const heatmapPlot = new Heatmap(document.getElementById('container'), {
      data,
      type: 'density',
      xField: 'g',
      yField: 'l',
      colorField: 'tmp',
      color: '#c6e5ff-#9ec9ff-#7cabff-#5b8ff9-#3474db-#005cbe-#00419f-#00287e',
      legend: {
        position: 'bottom',
      },
      annotations: [
        {
          type: 'image',
          start: ['min', 'max'],
          end: ['max', 'min'],
          src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
        },
      ],
    });
    heatmapPlot.render();
  });
