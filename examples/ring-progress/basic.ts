import { Chart } from '@antv/g2';

/**
 * 环形进度条（基础）
 * 场景：单个指标的完成率，如项目进度 72%、活动目标达成率
 * 要点：theta 坐标系 + innerRadius 挖空成环；「已完成 / 剩余」两段 stackY 堆叠出进度；
 *       中心百分比用 text mark 定位在 50% / 50%
 */
const data = [
  { status: '已完成', percent: 72 },
  { status: '未完成', percent: 28 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data,
      encode: { y: 'percent', color: 'status' },
      transform: [{ type: 'stackY' }],
      coordinate: { type: 'theta', innerRadius: 0.76, outerRadius: 0.94 },
      scale: { color: { range: ['#5B8FF9', '#E8EDF3'] } },
      legend: false,
      tooltip: {
        title: 'status',
        items: [
          {
            channel: 'y',
            name: '占比',
            valueFormatter: (value: number) => `${value}%`,
          },
        ],
      },
    },
    {
      type: 'text',
      data: [{ value: 72 }],
      encode: { text: (d: { value: number }) => `${d.value}%` },
      style: {
        x: '50%',
        y: '50%',
        textAlign: 'center',
        textBaseline: 'middle',
        fontSize: 36,
        fontWeight: 600,
        fill: '#1d1d1d',
      },
      tooltip: false,
    },
  ],
});

chart.render();
