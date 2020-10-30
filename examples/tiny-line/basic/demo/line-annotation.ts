import { TinyLine } from '@antv/g2plot';

const data = [
  264,
  417,
  438,
  887,
  309,
  397,
  550,
  575,
  563,
  430,
  525,
  592,
  492,
  467,
  513,
  546,
  983,
  340,
  539,
  243,
  226,
  192,
];

const avg = data.reduce((pre, cur) => pre + cur, 0) / data.length;
const targetVal = 800;

const tinyLine = new TinyLine('container', {
  height: 60,
  width: 300,
  autoFit: false,
  data,
  smooth: true,
  tooltip: false,
  annotations: [
    // 平均值
    {
      type: 'line',
      start: ['min', avg],
      end: ['max', avg],
      text: {
        content: '平均值',
        offsetY: -2,
        style: {
          textAlign: 'left',
          fontSize: 10,
          fill: 'rgba(44, 53, 66, 0.45)',
          textBaseline: 'bottom',
        },
      },
      style: {
        stroke: 'rgba(0, 0, 0, 0.25)',
      },
    },
    {
      type: 'line',
      start: ['min', targetVal],
      end: ['max', targetVal],
      text: {
        content: '目标值',
        offsetY: -2,
        style: {
          textAlign: 'left',
          fontSize: 10,
          fill: 'rgba(44, 53, 66, 0.45)',
          textBaseline: 'bottom',
        },
      },
      style: {
        stroke: 'rgba(0, 0, 0, 0.55)',
      },
    },
  ],
});

tinyLine.render();
