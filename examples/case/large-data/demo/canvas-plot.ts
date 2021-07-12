import { PixelPlot } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/eMjWBsbpkV/renderPixelsData.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new PixelPlot('container', {
      width: 1100,
      height: 600,
      padding: 50,
      data,
    });

    plot.render();

    setTimeout(() => {
      // plot.changeData(data.slice(0, data.length / 2));
    }, 5000);
  });
