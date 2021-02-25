import { Treemap } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/mobile.json')
  .then((res) => res.json())
  .then((fetchData) => {
    const data = {
      name: 'root',
      children: fetchData,
    };
    const treemapPlot = new Treemap('container', {
      data,
      colorField: 'brand',
      // 为矩形树图增加缩放,拖拽交互
      interactions: [
        {
          type: 'view-zoom',
        },
        {
          type: 'drag-move',
        },
      ],
    });
    treemapPlot.render();
  });
