import { Facet } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/VnrXpYSuqW/circle-pie.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Facet('container', {
      type: 'circle',
      fields: ['clarity'],
      data,
      tooltip: { showMarkers: false },
      meta: {
        cut: {
          sync: true,
        },
      },
      eachView: (view, f) => {
        return {
          type: 'pie',
          options: {
            data: f.data,
            angleField: 'mean',
            colorField: 'cut',
            pieStyle: { stroke: null },
          },
        };
      },
    });
    plot.render();
  });
