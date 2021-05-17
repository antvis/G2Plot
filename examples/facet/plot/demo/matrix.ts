import { Facet } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/iris.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Facet('container', {
      appendPadding: [0, 0, 16, 0],
      padding: 16,
      type: 'matrix',
      fields: ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'],
      data,
      meta: {
        Species: { sync: true },
        SepalLength: { sync: true, nice: true },
        SepalWidth: { nice: true },
        PetalLength: { nice: true },
        PetalWidth: { nice: true },
      },
      axes: {},
      eachView: (view, facet) => {
        if (facet.rowIndex === facet.columnIndex) {
          return {
            type: 'histogram',
            options: {
              data: facet.data,
              binField: facet.columnField,
              binNumber: 30,
              stackField: 'Species',
              isStack: true,
              columnStyle: { stroke: null },
            },
          };
        }
        return {
          type: 'scatter',
          options: {
            data: facet.data,
            xField: facet.columnField,
            yField: facet.rowField,
            colorField: 'Species',
            shape: 'circle',
            pointStyle: { fillOpacity: 0.3, stroke: null },
            size: 3,
          },
        };
      },
    });

    plot.render();
  });
