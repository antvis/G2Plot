import { DensityHeatmap } from '@antv/g2plot';

fetch('../data/jobpaying.json')
  .then((res) => res.json())
  .then((data) => {
    const heatMapPlot = new DensityHeatmap(document.getElementById('container'), {
      data,
      xField: 'prob',
      yField: 'Average annual wage',
      colorField: 'numbEmployed',
      color: ['#295599', '#3e94c0', '#78c6d0', '#b4d9e4', '#fffef0', '#f9cdac', '#ec7d92', '#bc448c'],
      radius: 15,
      intensity: 2,
      xAxis: {
        visible: true,
        min: -0.05,
        max: 1.05,
        nice: false,
      },
      yAxis: {
        visible: true,
        min: -1000,
      },
    });

    heatMapPlot.render();
  });
