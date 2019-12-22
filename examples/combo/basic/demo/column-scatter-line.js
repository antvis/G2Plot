import { OverlappedComboPlot } from '@antv/g2plot';

const uvData = [
  { time: '2019-03', value: 350 },
  { time: '2019-04', value: 900 },
  { time: '2019-05', value: 300 },
  { time: '2019-06', value: 450 },
  { time: '2019-07', value: 470 },
];

const billData = [
  { time: '2019-03', value: 220 },
  { time: '2019-04', value: 300 },
  { time: '2019-05', value: 250 },
  { time: '2019-06', value: 220 },
  { time: '2019-07', value: 362 },
];

const transformData = [
  { time: '2019-03', value: 800 },
  { time: '2019-04', value: 600 },
  { time: '2019-05', value: 400 },
  { time: '2019-06', value: 380 },
  { time: '2019-07', value: 220 },
];

const comboPlot = new OverlappedComboPlot(document.getElementById('container'), {
  layers: [
    {
      type: 'column',
      name: '浏览',
      data: uvData,
      xField: 'time',
      yField: 'value',
    },
    {
      type: 'scatter',
      name: '下单',
      data: billData,
      xField: 'time',
      yField: 'value',
      pointSize: 20,
      yAxis: {
        min: 0,
      },
    },
    {
      type: 'line',
      name: '转化',
      data: transformData,
      xField: 'time',
      yField: 'value',
      color: '#f8ca45',
    },
  ],
});

comboPlot.render();
