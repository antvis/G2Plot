import { Chart } from '@antv/g2';

/**
 * 多指标进度对比
 * 场景：看板中横向对比多条业务线的目标完成率，并按是否达标着色
 * 要点：interval + transpose 多条并列；view 叠加轨道；color 通道映射达标状态，需显式给 scale.color.domain 固定颜色顺序
 */
const data = [
  { team: '华东大区', completed: 92, target: 100, status: '达成' },
  { team: '华南大区', completed: 78, target: 100, status: '达成' },
  { team: '华北大区', completed: 64, target: 100, status: '预警' },
  { team: '西南大区', completed: 45, target: 100, status: '预警' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: {
    y: { domain: [0, 100] },
    color: { domain: ['达成', '预警'], range: ['#52C41A', '#FAAD14'] },
  },
  axis: { x: { title: false }, y: false },
  legend: false,
  children: [
    {
      type: 'interval',
      encode: { x: 'team', y: 'target', size: 16 },
      style: { fill: '#EEF2F7', radius: 8 },
      tooltip: false,
    },
    {
      type: 'interval',
      encode: { x: 'team', y: 'completed', size: 16, color: 'status' },
      style: { radius: 8 },
      labels: [
        {
          text: (d: { completed: number }) => `${d.completed}%`,
          position: 'right',
          style: { fontSize: 12, fill: '#595959' },
        },
      ],
    },
  ],
});

chart.render();
