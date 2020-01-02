import { Heatmap } from '@antv/g2plot';

fetch('../data/jobpaying.json')
  .then((res) => res.json())
  .then((data) => {
    const heatMapPlot = new Heatmap(document.getElementById('container'), {
      data,
      xField: 'prob',
      yField: 'Average annual wage',
      colorField: 'numbEmployed',
      color: ['#295599', '#3e94c0', '#78c6d0', '#b4d9e4', '#fffef0', '#f9cdac', '#ec7d92', '#bc448c'],
      radius: 20,
      intensity: 2,
    });

    heatMapPlot.render();
  });
