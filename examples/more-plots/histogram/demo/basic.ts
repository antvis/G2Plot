import { Histogram } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/RoliHq%2453S/histogram.json')
  .then((data) => data.json())
  .then((data) => {
    const histogramPlot = new Histogram('container', {
      data,
      binField: 'value',
      binWidth: 2,
    });

    histogramPlot.render();
  });
