import { Mix } from '@antv/g2plot';

const expectData = [
  { value: 100, name: '展现' },
  { value: 80, name: '点击' },
  { value: 60, name: '访问' },
  { value: 40, name: '咨询' },
  { value: 30, name: '订单' },
];
const actualData = [
  { value: 80, name: '展现' },
  { value: 50, name: '点击' },
  { value: 30, name: '访问' },
  { value: 10, name: '咨询' },
  { value: 5, name: '订单' },
];

const plot = new Mix('container', {
  appendPadding: [8, 40, 8, 18],
  syncViewPadding: true,
  meta: {
    value: { sync: true },
  },
  tooltip: { shared: true, showMarkers: false, showTitle: false },
  plots: [
    {
      type: 'funnel',
      options: {
        data: expectData,
        yField: 'value',
        xField: 'name',
        shape: 'pyramid',
        conversionTag: false,
        label: { position: 'right', style: { fill: 'rgba(0,0,0,0.65)' }, offsetX: 10 },
        funnelStyle: { fillOpacity: 0.85 },
      },
    },
    {
      type: 'funnel',
      options: {
        data: actualData,
        yField: 'value',
        xField: 'name',
        shape: 'pyramid',
        conversionTag: false,
        label: false,
        funnelStyle: { lineWidth: 1, stroke: '#fff' },
      },
    },
  ],
  interactions: [{ type: 'element-active' }],
});

plot.render();
