import { Sunburst } from '../../../relation/sankey/demo/node_modules/@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
  .then((res) => res.json())
  .then((data) => {
    const sunburstPlot = new Sunburst('container', {
      data,
      seriesField: 'sum',
      colorField: 'label',
      innerRadius: 0.3,
      interactions: [{ type: 'element-active' }],
    });
    sunburstPlot.render();
  });
