import { Pie } from '@antv/g2plot';

fetch('../data/city-profit.json')
  .then((res) => res.json())
  .then((data) => {
    const piePlot = new Pie(document.getElementById('container'), {
      forceFit: true,
      radius: 0.6,
      padding: [16, 0, 0, 0],
      data,
      angleField: 'value',
      colorField: 'city',
      legend: {
        visible: false,
      },
      label: {
        visible: true,
        type: 'upgrade-pie',
        formatter: (text, item) => {
          return `${item._origin['city']} (${item._origin['value']})`;
        },
      },
      pieStyle: {
        lineWidth: 0,
      },
    });

    piePlot.render();
  });
