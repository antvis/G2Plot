import { Chart } from '@antv/g2';

/**
 * 环形进度（Donut Progress）
 * 场景：大屏 / 移动端单指标完成度，环形比条状更省空间且视觉更聚焦
 * 要点：interval + stackY + theta 坐标系；已完成/未完成两段堆叠，未完成段用浅灰充当轨道；innerRadius 挖空成环
 */
const data = [
  { status: '已完成', value: 68 },
  { status: '未完成', value: 32 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { y: 'value', color: 'status' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', innerRadius: 0.72 },
  scale: { color: { domain: ['已完成', '未完成'], range: ['#5B8FF9', '#EEF2F7'] } },
  axis: false,
  legend: false,
  labels: [
    {
      // 只标注「已完成」一段，避免白字落在浅灰轨道上看不清
      text: (d: { status: string; value: number }) =>
        d.status === '已完成' ? `${d.value}%` : '',
      position: 'inside',
      style: { fontSize: 14, fontWeight: 600, fill: '#fff' },
    },
  ],
});

chart.render();
