import { Chart } from '@antv/g2';

/**
 * 带数据标签与 tooltip 的瀑布图
 * 场景：经营复盘会上需要直接读出每一项变动的金额与方向
 * 要点：labels.text 用回调按方向加 +/- 号；position 'top' 相对柱体上边缘；
 *       tooltip.items 用 field 取原始变动值（range 柱的 y 通道是累计起点）
 */
type GmvStep = {
  stage: string;
  change: number;
  kind: 'start' | 'change' | 'end';
};

const steps: GmvStep[] = [
  { stage: '活动前 GMV', change: 320, kind: 'start' },
  { stage: '直播带货', change: 180, kind: 'change' },
  { stage: '优惠券核销', change: -60, kind: 'change' },
  { stage: '退货退款', change: -45, kind: 'change' },
  { stage: '自然流量', change: 75, kind: 'change' },
  { stage: '活动后 GMV', change: 0, kind: 'end' },
];

let running = 0;
const data = steps.map(({ stage, change, kind }) => {
  if (kind === 'start') {
    running = change;
    return { stage, base: 0, end: change, change, direction: '合计' };
  }
  if (kind === 'end') {
    return { stage, base: 0, end: running, change: running, direction: '合计' };
  }
  const after = running + change;
  const row = {
    stage,
    base: Math.min(running, after),
    end: Math.max(running, after),
    change,
    direction: change >= 0 ? '增加' : '减少',
  };
  running = after;
  return row;
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'stage', y: 'base', y1: 'end', color: 'direction' },
  scale: {
    color: {
      domain: ['增加', '减少', '合计'],
      range: ['#2FA84F', '#E15759', '#5B8FF9'],
    },
  },
  labels: [
    {
      text: (d: { change: number; direction: string }) => {
        // 合计项直接显示总值，变动项带正负号
        if (d.direction === '合计') return `${d.change}`;
        return `${d.change > 0 ? '+' : ''}${d.change}`;
      },
      position: 'top',
      style: {
        fontSize: 11,
        // 文字颜色跟随增减方向，深色背景下也清晰
        fill: (d: { direction: string }) =>
          d.direction === '增加' ? '#2FA84F' : d.direction === '减少' ? '#E15759' : '#5B8FF9',
        dy: -4,
      },
    },
  ],
  axis: {
    x: { title: '促销阶段' },
    y: { title: 'GMV（万元）' },
  },
  legend: { color: { position: 'top' } },
  tooltip: {
    title: 'stage',
    items: [{ field: 'change', name: '变动金额', valueFormatter: (v) => `${v} 万元` }],
  },
});

chart.render();
