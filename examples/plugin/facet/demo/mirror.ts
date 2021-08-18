import { Facet } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/2Qttbqxmtw/symmetry-data.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Facet('container', {
      type: 'mirror',
      data,
      fields: ['gender'],
      transpose: true,
      padding: [32, 16, 28, 16],
      meta: {
        age: {
          sync: true,
          tickCount: 11,
        },
        total_percentage: {
          sync: true,
          formatter(v) {
            return v + '%';
          },
        },
        gender: {
          sync: true,
        },
      },
      axes: {},
      eachView: (view, f) => {
        return {
          padding: [0, 48, 0, 0],
          type: 'column',
          options: {
            data: f.data,
            xField: 'age',
            yField: 'total_percentage',
            seriesField: 'gender',
            color: ['#1890ff', '#f04864'],
          },
        };
      },
    });
    plot.render();
  });
