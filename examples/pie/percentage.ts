import { Chart } from '@antv/g2';

/**
 * 百分比标签饼图
 * 场景：报表中需要直接展示各项占比百分比，减少心算
 * 要点：labels 的 text 用回调计算百分比；tooltip 同步格式化
 */
const data = [
  { channel: '线上商城', value: 520 },
  { channel: '线下门店', value: 380 },
  { channel: '分销渠道', value: 240 },
  { channel: '直播带货', value: 160 },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { y: 'value', color: 'channel' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', outerRadius: 0.8 },
  labels: [
    {
      text: (d: { value: number }) => `${((d.value / total) * 100).toFixed(1)}%`,
      position: 'outside',
      style: { fontSize: 12 },
    },
  ],
  tooltip: {
    items: [
      {
        channel: 'y',
        name: '销售额',
        valueFormatter: (v) => `${v} 万（${((Number(v) / total) * 100).toFixed(1)}%）`,
      },
    ],
  },
});

chart.render();
