/**
 * @file Parallel sets are like parallel coordinates, but for categorical dimensions.
 *
 * Parallel Sets: Visual Analysis of Categorical Data. See more in https://kosara.net/publications/Bendix-InfoVis-2005.html
 */
import { Sankey } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/nokcOpy6fF/draggable-sankey.json')
  .then((data) => data.json())
  .then((data) => {
    const sankeyData = [];
    const keys = ['Survived', 'Sex', 'Age', 'Class'];
    data.forEach((d) => {
      keys.reduce((a, b) => {
        if (a && b) {
          sankeyData.push({
            source: d[a],
            target: d[b],
            value: d.value,
            path: `${d[keys[0]]} -> ${d[keys[1]]} -> ${d[keys[2]]} -> ${d[keys[3]]}`,
          });
        }
        return b;
      });
    });

    const sankey = new Sankey('container', {
      data: sankeyData,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
      nodeWidthRatio: 0.01,
      nodePaddingRatio: 0.03,
      nodeDraggable: true,
      rawFields: ['path'],
      tooltip: {
        fields: ['path', 'value'],
        formatter: ({ path, value }) => {
          return {
            name: path,
            value: value,
          };
        },
      },
    });

    sankey.render();
  });
