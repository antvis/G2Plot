import { Column, getCanvasPattern } from '@antv/g2plot';
import { deepMix } from '@antv/util';

const PATTERN_MAP = {
  Gas: {
    type: 'dot',
  },
  Wasserkraft: {
    type: 'line',
  },
  Biomasse: {
    type: 'square',
  },
  Wind: {
    type: 'line',
    cfg: {
      rotation: 90,
    },
  },
  Solar: {
    type: 'square',
    cfg: {
      size: 5,
      padding: 2,
      rotation: 45,
      isStagger: false,
    },
  },
};

const pattern = ({ type }, color) =>
  getCanvasPattern(deepMix({}, PATTERN_MAP[type], { cfg: { backgroundColor: color } }));

fetch('https://gw.alipayobjects.com/os/antfincdn/jSRiL%26YNql/percent-column.json')
  .then((data) => data.json())
  .then((data) => {
    const columnPlot = new Column('container', {
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'type',
      isPercent: true,
      isStack: true,
      meta: {
        value: {
          min: 0,
          max: 1,
        },
      },
      pattern: ({ type }, color) => pattern({ type }, color),
      legend: {
        marker: (text, index, item) => {
          const color = item.style.fill;
          return {
            style: {
              fill: pattern({ type: text }, color),
              r: 8,
            },
          };
        },
      },
      interactions: [{ type: 'element-highlight-by-color' }, { type: 'element-link' }],
    });

    columnPlot.render();
  });
