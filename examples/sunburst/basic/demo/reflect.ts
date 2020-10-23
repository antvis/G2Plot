import { Sunburst } from '@antv/g2plot';

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
    const sunburstPlot = new Sunburst('container', {
      data,
      type: 'treemap',
      seriesField: 'value',
      reflect: 'y',
      colorField: 'brand',
      hierarchyConfig: {
        size: [1, 0.1],
      },
      sunburstStyle: {
        lineWidth: 1,
        stroke: '#fff',
      },
      interactions: [{ type: 'element-active' }],
    });
    sunburstPlot.render();
  });
