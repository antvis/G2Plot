import { each } from '@antv/util';
import { Mix } from '@antv/g2plot';

const datas = [
  [
    { company: 'Apple', type: '整体', value: 30 },
    { company: 'Facebook', type: '整体', value: 35 },
    { company: 'Google', type: '整体', value: 28 },
  ],
  [
    { company: 'Apple', type: '非技术岗', value: 40 },
    { company: 'Facebook', type: '非技术岗', value: 65 },
    { company: 'Google', type: '非技术岗', value: 47 },
  ],
  [
    { company: 'Apple', type: '技术岗', value: 35 },
    { company: 'Facebook', type: '技术岗', value: 30 },
    { company: 'Google', type: '技术岗', value: 25 },
  ],
];

const plots = [];
const total = datas.length;
each(datas, (data, idx) => {
  const startX = idx / total;
  plots.push({
    type: 'column',
    region: {
      start: { x: startX, y: 0 },
      end: { x: (idx + 1) / total, y: 1 },
    },
    options: {
      data,
      xField: 'company',
      yField: 'value',
      seriesField: 'company',
      isGroup: true,
      meta: {
        value: {
          sync: true,
        },
      },
      xAxis: {
        label: {
          autoRotate: true,
        },
      },
      yAxis: idx === 0 ? { tickCount: 10 } : { label: { formatter: (v) => '' }, tickCount: 10 },
      tooltip: { showMarkers: false, fields: ['SalesTerritoryRegion', 'SalesAmount', 'quarter'] },
      // fixme 设置 yAxis label false 会导致
      // yAxis: idx === 0 ? {} : { label: false },
      minColumnWidth: 24,
      appendPadding: [20, 0],
      annotations: [
        {
          type: 'text',
          content: data[0].type,
          position: ['50%', '0%'],
          offsetY: -15,
          style: {
            textAlign: 'center',
          },
        },
      ],
    },
  });
});
const plot = new Mix('container', {
  plots,
  syncViewPadding: true,
  tooltip: false,
  legend: {},
});

plot.render();
