import { Sunburst } from '@antv/g2plot';
import { last } from '@antv/util';
import chromaJs from 'chroma-js';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
  .then((res) => res.json())
  .then((data) => {
    const colors = [
      '#5B8FF9',
      '#61DDAA',
      '#65789B',
      '#F6BD16',
      '#7262fd',
      '#78D3F8',
      '#9661BC',
      '#F6903D',
      '#008685',
      '#F08BB4',
    ];
    function getPaletteByColor(color, count) {
      const origin = chromaJs(color);
      const range = [origin.brighten(0.5), origin, origin.darken(0.5)];
      return (
        chromaJs
          // @ts-ignore
          .scale(range)
          .mode('lab')
          .cache(false)
          .colors(count)
      );
    }

    const plot = new Sunburst('container', {
      data,
      innerRadius: 0.3,
      interactions: [{ type: 'element-active' }],
      hierarchyConfig: {
        field: 'sum',
      },
      sunburstStyle: (datum) => {
        const depth = datum.depth;
        const nodeIndex = datum[Sunburst.NODE_INDEX_FIELD];

        const ancestorIndex = last(datum['ancestors'])?.[Sunburst.NODE_INDEX_FIELD] || 0;

        const colorIndex = depth === 1 ? nodeIndex : ancestorIndex;
        let color = colors[colorIndex % colors.length];

        if (depth > 1) {
          const newColors = getPaletteByColor(color, last(datum['ancestors'])?.childNodeCount);
          color = newColors[nodeIndex % colors.length];
        }

        return {
          fill: color,
          stroke: '#fff',
          lineWidth: 0.5,
        };
      },
    });
    plot.render();
  });
