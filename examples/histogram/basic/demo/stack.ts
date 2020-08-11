import { Histogram } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const histogramPlot = new Histogram(document.getElementById('container'), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: data,
      binField: 'depth',
      binWidth: 2,
      stackField: 'cut',
      coloField: 'color',
      tooltip: {
        showMarkers: false,
        position: 'top',
      },
      interactions: [
        {
          name: 'element-highlight',
        },
      ],
    });

    histogramPlot.render();
  });
