import { OverlappedComboPlot } from '@antv/g2plot';

const uvBillData = [
  { time: '2019-03', value: 350, type: 'uv' },
  { time: '2019-04', value: 900, type: 'uv' },
  { time: '2019-05', value: 300, type: 'uv' },
  { time: '2019-06', value: 450, type: 'uv' },
  { time: '2019-07', value: 470, type: 'uv' },
  { time: '2019-03', value: 220, type: 'bill' },
  { time: '2019-04', value: 300, type: 'bill' },
  { time: '2019-05', value: 250, type: 'bill' },
  { time: '2019-06', value: 220, type: 'bill' },
  { time: '2019-07', value: 362, type: 'bill' },
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
      type: 'groupedColumn',
      name: '订单量',
      data: uvBillData,
      xField: 'time',
      yField: 'value',
      groupField: 'type',
    },
    {
      type: 'line',
      name: '转化',
      data: transformData,
      xField: 'time',
      yField: 'value',
      color: '#f8ca45',
      lineSize: 2,
    },
  ],
});

comboPlot.render();
