import { Chart } from '@antv/g2';

/**
 * 条内数值进度条（text-inside 风格）
 * 场景：单指标完成率，百分比白字压在进度条内部右端，和 Element UI / Ant Design 的 text-inside 一致
 * 要点：position: 'right' 默认就是 textAlign: 'end'（右端对齐条尾），dx 往回收 10px 才不贴边；
 *       条形短于文字宽度时文字会越过轨道左端被裁，所以用回调把它翻到条外并换成深色
 */
const data = [{ metric: '客服满意度目标', completionRate: 0.86 }];

// 条形长度低于该比例时，文字放不进条内，改为放在条外
const INSIDE_THRESHOLD = 0.08;

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'interval',
      encode: { x: 'metric', y: () => 1 },
      style: { fill: '#F0F2F5', radius: 12, maxWidth: 24 },
      tooltip: false,
    },
    {
      type: 'interval',
      encode: { x: 'metric', y: 'completionRate' },
      style: { fill: '#5B8FF9', radius: 12, maxWidth: 24 },
      labels: [
        {
          text: (d: { completionRate: number }) => `${Math.round(d.completionRate * 100)}%`,
          position: 'right',
          style: {
            // 条够长：右对齐压在条内；条太短：翻到条外，避免越过轨道左端被裁
            textAlign: (d: { completionRate: number }) =>
              d.completionRate >= INSIDE_THRESHOLD ? 'end' : 'start',
            dx: (d: { completionRate: number }) => (d.completionRate >= INSIDE_THRESHOLD ? -10 : 10),
            // 条内用白字衬蓝底，条外用深色衬浅灰轨道
            fill: (d: { completionRate: number }) =>
              d.completionRate >= INSIDE_THRESHOLD ? '#FFFFFF' : '#1D2129',
            // 主题默认 label 的 fillOpacity 是 0.65，不显式置 1 白字会发灰
            fillOpacity: 1,
            fontSize: 12,
            fontWeight: 600,
          },
        },
      ],
    },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { y: { domain: [0, 1] } },
  axis: false,
  legend: false,
  tooltip: {
    items: [{ channel: 'y', name: '完成率', valueFormatter: (v) => `${Math.round(Number(v) * 100)}%` }],
  },
});

chart.render();
