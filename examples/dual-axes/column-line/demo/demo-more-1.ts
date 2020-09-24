import { DualAxes } from '@antv/g2plot';

const data1 = [
  { time: '2020-08-20', consumeTime: 10868 },
  { time: '2020-08-21', consumeTime: 8786 },
  { time: '2020-08-22', consumeTime: 10824 },
  { time: '2020-08-23', consumeTime: 7860 },
  { time: '2020-08-24', consumeTime: 13253 },
  { time: '2020-08-25', consumeTime: 17015 },
  { time: '2020-08-26', consumeTime: 19298 },
  { time: '2020-08-27', consumeTime: 13937 },
  { time: '2020-08-28', consumeTime: 11541 },
  { time: '2020-08-29', consumeTime: 15244 },
  { time: '2020-08-30', consumeTime: 14247 },
  { time: '2020-08-31', consumeTime: 9402 },
  { time: '2020-09-01', consumeTime: 10440 },
  { time: '2020-09-02', consumeTime: 9345 },
  { time: '2020-09-03', consumeTime: 18459 },
  { time: '2020-09-04', consumeTime: 9763 },
  { time: '2020-09-05', consumeTime: 11074 },
  { time: '2020-09-06', consumeTime: 11770 },
  { time: '2020-09-07', consumeTime: 12206 },
  { time: '2020-09-08', consumeTime: 11434 },
  { time: '2020-09-09', consumeTime: 16218 },
  { time: '2020-09-10', consumeTime: 11914 },
  { time: '2020-09-11', consumeTime: 16781 },
  { time: '2020-09-12', consumeTime: 10555 },
  { time: '2020-09-13', consumeTime: 10899 },
  { time: '2020-09-14', consumeTime: 10713 },
  { time: '2020-09-15', consumeTime: 0 },
  { time: '2020-09-16', consumeTime: 0 },
  { time: '2020-09-17', consumeTime: 20357 },
  { time: '2020-09-18', consumeTime: 10424 },
];

const data2 = [
  { time: '2020-08-20', completeTime: 649.483 },
  { time: '2020-08-21', completeTime: 1053.7 },
  { time: '2020-08-22', completeTime: 679.817 },
  { time: '2020-08-23', completeTime: 638.117 },
  { time: '2020-08-24', completeTime: 843.3 },
  { time: '2020-08-25', completeTime: 1092.983 },
  { time: '2020-08-26', completeTime: 1036.317 },
  { time: '2020-08-27', completeTime: 1031.9 },
  { time: '2020-08-28', completeTime: 803.467 },
  { time: '2020-08-29', completeTime: 830.733 },
  { time: '2020-08-30', completeTime: 709.867 },
  { time: '2020-08-31', completeTime: 665.233 },
  { time: '2020-09-01', completeTime: 696.367 },
  { time: '2020-09-02', completeTime: 692.867 },
  { time: '2020-09-03', completeTime: 936.017 },
  { time: '2020-09-04', completeTime: 782.867 },
  { time: '2020-09-05', completeTime: 653.8 },
  { time: '2020-09-06', completeTime: 856.683 },
  { time: '2020-09-07', completeTime: 777.15 },
  { time: '2020-09-08', completeTime: 773.283 },
  { time: '2020-09-09', completeTime: 833.3 },
  { time: '2020-09-10', completeTime: 793.517 },
  { time: '2020-09-11', completeTime: 894.45 },
  { time: '2020-09-12', completeTime: 725.55 },
  { time: '2020-09-13', completeTime: 709.967 },
  { time: '2020-09-14', completeTime: 787.6 },
  { time: '2020-09-15', completeTime: 644.183 },
  { time: '2020-09-16', completeTime: 1066.65 },
  { time: '2020-09-17', completeTime: 932.45 },
  { time: '2020-09-18', completeTime: 753.583 },
];

const dualAxesChart = new DualAxes('container', {
  data: [data1, data2],
  xField: 'time',
  yField: ['consumeTime', 'completeTime'],
  meta: {
    time: {
      range: [0.05, 0.95],
    },
    consumeTime: {
      alias: '产出耗时',
      formatter: (v) => {
        return Number((v / 60).toFixed(2));
      },
    },
    completeTime: {
      alias: '完成时间',
      formatter: (v) => {
        return Number((v / 100).toFixed(1));
      },
    },
  },
  geometryOptions: [
    {
      geometry: 'column',
      color: '#586bce',
    },
    {
      geometry: 'line',
      color: '#29cae4',
    },
  ],
  xAxis: {
    label: {
      autoRotate: true,
      autoHide: false,
      autoEllipsis: false,
    },
    tickCount: data2.length / 2,
  },
  yAxis: [
    {
      label: {
        formatter: (v) => {
          return `${v}分`;
        },
      },
    },
    {
      label: {
        formatter: (v) => {
          return `${v}`;
        },
      },
    },
  ],
  legend: {
    itemName: {
      formatter: (text, item) => {
        return item.value === 'consumeTime' ? '产出耗时(分)' : '完成时间(分)';
      },
    },
  },
});

dualAxesChart.render();
