import { Gauge } from '@antv/g2plot';

const gauge = new Gauge('container', {
  tooltip: {
    containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>',
    domStyles: {
      'g2-tooltip': {
        padding: '4px 8px',
        fontSize: '10px',
      },
    },
    customContent: (x, data) => {
      return `${(Number(data?.[0]?.value || 0) * 100).toFixed(2)}%`;
    },
  },
  percent: 0.75,
  range: {
    color: '#30BF78',
  },
  indicator: {
    pointer: {
      style: {
        stroke: '#D0D0D0',
      },
    },
    pin: {
      style: {
        stroke: '#D0D0D0',
      },
    },
  },
  axis: {
    label: {
      formatter(v) {
        return Number(v) * 100;
      },
    },
    subTickLine: {
      count: 3,
    },
  },
  statistic: {
    content: {
      formatter: ({ percent }) => `Rate: ${(percent * 100).toFixed(0)}%`,
      style: {
        color: 'rgba(0,0,0,0.65)',
        fontSize: 48,
      },
    },
  },
});

gauge.render();
