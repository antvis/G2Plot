import { Chart } from '@antv/g2';

/**
 * 基础漏斗图
 * 场景：流程转化分析（访问 → 咨询 → 报价 → 议价 → 成交）
 * 要点：interval + shape 'funnel' + symmetryY + transpose；隐藏坐标轴
 */
const data = [
  { stage: '访问', value: 8043 },
  { stage: '咨询', value: 2136 },
  { stage: '报价', value: 908 },
  { stage: '议价', value: 691 },
  { stage: '成交', value: 527 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'stage', y: 'value', color: 'stage', shape: 'funnel' },
  coordinate: { transform: [{ type: 'transpose' }] },
  transform: [{ type: 'symmetryY' }],
  axis: false,
  legend: false,
  labels: [
    {
      text: (d: { stage: string; value: number }) => `${d.stage} ${d.value}`,
      position: 'inside',
      transform: [{ type: 'contrastReverse' }],
    },
  ],
});

chart.render();
