import { Heatmap } from '@antv/g2plot';
fetch('../data/heatmap.json')
  .then((res) => res.json())
  .then((data) => {
    const heatMapPlot = new Heatmap(document.getElementById('container'), {
      data,
      xField: 'g',
      yField: 'l',
      colorField: 'tmp',
      color: ['#295599', '#3e94c0', '#78c6d0', '#b4d9e4', '#fffef0', '#f9cdac', '#ec7d92', '#bc448c'],
      meta: {
        l: {
          alias: 'latitude',
        },
        g: {
          alias: 'longitude',
        },
      },
      legend: {
        visible: true,
        position: 'right-center',
      },
      radius: 10,
      intensity: 4,
      background: {
        type: 'image',
        src: 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*TU_aSrMV6KYAAAAAAAAAAABkARQnAQ',
        // value: '#262626'
      },
    });

    heatMapPlot.render();
  });
