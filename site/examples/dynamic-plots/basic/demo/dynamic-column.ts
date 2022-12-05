import { Column } from '@antv/g2plot';

const data = [
  { type: '1-3秒', value: 0.16 },
  { type: '4-10秒', value: 0.125 },
  { type: '11-30秒', value: 0.24 },
  { type: '31-60秒', value: 0.19 },
  { type: '1-3分', value: 0.22 },
  { type: '3-10分', value: 0.05 },
  { type: '10-30分', value: 0.01 },
  { type: '30+分', value: 0.015 },
];

const paletteSemanticRed = '#F4664A';
const brandColor = '#5B8FF9';
const columnPlot = new Column('container', {
  data,
  xField: 'type',
  yField: 'value',
  seriesField: 'value',
  color: ({ value }) => {
    if (value < 0.05) {
      return paletteSemanticRed;
    }
    return brandColor;
  },
  legend: false,
});

columnPlot.render();
setInterval(() => {
  columnPlot.changeData(data.map((d) => ({ ...d, value: d.value * Math.random() })));
}, 1200);
