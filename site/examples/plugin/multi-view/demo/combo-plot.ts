import { Mix } from '@antv/g2plot';

const averageData = [
  { date: '2015-02', value: 21168 },
  { date: '2015-08', value: 21781 },
  { date: '2016-01', value: 23818 },
  { date: '2017-02', value: 25316 },
  { date: '2018-01', value: 26698 },
  { date: '2018-08', value: 27890 },
];

const plot = new Mix('container', {
  appendPadding: 8,
  tooltip: { shared: true },
  syncViewPadding: true,
  plots: [
    {
      type: 'column',
      options: {
        data: [
          { date: '2015-02', value: 160 },
          { date: '2015-08', value: 245 },
          { date: '2016-01', value: 487 },
          { date: '2017-02', value: 500 },
          { date: '2018-01', value: 503 },
          { date: '2018-08', value: 514 },
        ],
        xField: 'date',
        yField: 'value',
        yAxis: {
          type: 'log',
          max: 100000,
        },
        meta: {
          date: {
            sync: true,
          },
          value: {
            alias: '店数(间)',
          },
        },
        label: {
          position: 'middle',
        },
      },
    },
    {
      type: 'line',
      options: {
        data: averageData,
        xField: 'date',
        yField: 'value',
        xAxis: false,
        yAxis: {
          type: 'log',
          max: 100000,
        },
        label: {
          offsetY: -8,
        },
        meta: {
          value: {
            alias: '平均租金(元)',
          },
        },
        color: '#FF6B3B',
        annotations: averageData.map((d) => {
          return {
            type: 'dataMarker',
            position: d,
            point: {
              style: {
                stroke: '#FF6B3B',
                lineWidth: 1.5,
              },
            },
          };
        }),
      },
    },
    {
      type: 'line',
      options: {
        data: [
          { date: '2015-02', value: null },
          { date: '2015-08', value: 0.029 },
          { date: '2016-01', value: 0.094 },
          { date: '2017-02', value: 0.148 },
          { date: '2018-01', value: 0.055 },
          { date: '2018-08', value: 0.045 },
        ],
        xField: 'date',
        yField: 'value',
        xAxis: false,
        yAxis: {
          line: null,
          grid: null,
          position: 'right',
          max: 0.16,
          tickCount: 8,
        },
        meta: {
          date: {
            sync: 'date',
          },
          value: {
            alias: '递增',
            formatter: (v) => `${(v * 100).toFixed(1)}%`,
          },
        },
        smooth: true,
        label: {
          callback: (value) => {
            return {
              offsetY: value === 0.148 ? 36 : value === 0.055 ? 0 : 20,
              style: {
                fill: '#1AAF8B',
                fontWeight: 700,
                stroke: '#fff',
                lineWidth: 1,
              },
            };
          },
        },
        color: '#1AAF8B',
      },
    },
  ],
});

plot.render();
