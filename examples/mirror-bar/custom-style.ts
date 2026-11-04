import { Chart } from '@antv/g2';

/**
 * 样式自定义：对称条形图的品牌视觉
 * 覆盖：两侧配色、条体圆角、轴标题、图例位置
 */
const data = [
  { channel: '自然搜索', type: '流入', visitors: 3200 },
  { channel: '付费广告', type: '流入', visitors: 2100 },
  { channel: '社交媒体', type: '流入', visitors: 1800 },
  { channel: '自然搜索', type: '流出', visitors: 2600 },
  { channel: '付费广告', type: '流出', visitors: 2400 },
  { channel: '社交媒体', type: '流出', visitors: 1200 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'channel',
    y: (d: { type: string; visitors: number }) =>
      d.type === '流出' ? -d.visitors : d.visitors,
    color: 'type',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: {
    color: { domain: ['流入', '流出'], range: ['#5B8FF9', '#F6BD16'] },
  },
  style: { radius: 4, fillOpacity: 0.9 },
  axis: {
    x: { title: '渠道' },
    y: {
      title: '访客数',
      labelFormatter: (d: number) => String(Math.abs(d)),
    },
  },
  legend: { color: { position: 'top' } },
});

chart.render();
