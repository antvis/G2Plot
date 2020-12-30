import { Treemap } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/mobile.json')
  .then((res) => res.json())
  .then((fetchData) => {
    fetchData.forEach((mobile) => {
      mobile.value = null;
    });

    const data = {
      name: 'root',
      children: fetchData,
    };
    const treemapPlot = new Treemap('container', {
      data,
      colorField: 'brand',
    });
    treemapPlot.render();
  });
