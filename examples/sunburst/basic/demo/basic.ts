import { Sunburst } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
  .then((res) => res.json())
  .then((data) => {
    const sunburstPlot = new Sunburst('container', {
      data,
      seriesField: 'sum',
      colorField: 'value',
      color: ['#BAE7FF', '#1890FF', '#0050B3'],
      innerRadius: 0.3,
      tooltip: {
        customContent: (_, item) => {
          const mappingData = item?.[0]?.mappingData;
          const originData = mappingData?._origin?.data;
          return `<div>${originData?.label} - ${originData?.sum}</div>`;
        },
      },
      interactions: [{ type: 'element-active' }],
    });
    sunburstPlot.render();
  });
