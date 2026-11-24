/**
 * 带阶段小计与连接线的瀑布图
 * 场景：活动复盘时先看活动期的净增，再继续看后续变化，需要同时读出每步变动与当前累计值
 * 要点：小计项按当前累计值画整柱、且不再加进 running；
 *       相邻阶段用 link mark 在同一累计水平上连线（先画线再画柱，线只露出柱间空隙）；
 *       labels 分两条：彩色变动金额 + 灰色「累计」标签
 */
import { Chart } from '@antv/g2';

type GmvStep = {
  stage: string;
  /** 变动金额；期初填起始值，小计 / 期末由累计结果决定，填 0 */
  change: number;
  kind: 'start' | 'change' | 'subtotal' | 'end';
};

const steps: GmvStep[] = [
  { stage: '期初 GMV', change: 320, kind: 'start' },
  { stage: '直播带货', change: 180, kind: 'change' },
  { stage: '优惠券核销', change: -60, kind: 'change' },
  { stage: '活动期小计', change: 0, kind: 'subtotal' },
  { stage: '自然流量', change: 75, kind: 'change' },
  { stage: '退货退款', change: -45, kind: 'change' },
  { stage: '期末 GMV', change: 0, kind: 'end' },
];

// 累计：小计只展示当前累计值，不把它再加进 running
let running = 0;
const data = steps.map(({ stage, change, kind }) => {
  if (kind === 'start') {
    running = change;
    return { stage, base: 0, end: running, change, cumulative: running, direction: '合计' };
  }
  if (kind === 'subtotal') {
    // 小计：从 0 画到当前累计值，running 保持不变
    return { stage, base: 0, end: running, change: 0, cumulative: running, direction: '小计' };
  }
  if (kind === 'end') {
    return { stage, base: 0, end: running, change: running, cumulative: running, direction: '合计' };
  }
  const after = running + change;
  const row = {
    stage,
    base: Math.min(running, after),
    end: Math.max(running, after),
    change,
    cumulative: after,
    direction: change >= 0 ? '增加' : '减少',
  };
  running = after;
  return row;
});

// 相邻阶段在同一累计水平上连线；level 取前一阶段的累计值，也就是后一阶段的起点
const connectors = data.slice(0, -1).map((d, i) => ({
  from: d.stage,
  to: data[i + 1].stage,
  level: d.cumulative,
}));

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  scale: {
    // 显式固定 x 顺序：连接线的 x 来自 from / to 两个字段，避免比例尺按不同数据源推断
    x: { domain: data.map((d) => d.stage), padding: 0.35 },
    color: {
      domain: ['增加', '减少', '合计', '小计'],
      range: ['#2FA84F', '#E15759', '#5B8FF9', '#F6BD16'],
    },
  },
  children: [
    {
      // 先画连接线，柱体后画会盖住线，只在柱间空隙露出
      type: 'link',
      data: connectors,
      encode: { x: 'from', x1: 'to', y: 'level', y1: 'level' },
      style: { stroke: '#BFBFBF', lineWidth: 1, lineDash: [4, 4] },
    },
    {
      type: 'interval',
      data,
      encode: { x: 'stage', y: 'base', y1: 'end', color: 'direction' },
      labels: [
        {
          // 变动金额：带正负号，按增减着色；小计不显示变动金额
          text: (d: { change: number; direction: string }) => {
            if (d.direction === '小计') return '';
            if (d.direction === '合计') return `${d.change}`;
            return `${d.change > 0 ? '+' : ''}${d.change}`;
          },
          position: 'top',
          style: {
            dy: -4,
            fontSize: 11,
            fill: (d: { direction: string }) =>
              d.direction === '减少' ? '#E15759' : d.direction === '增加' ? '#2FA84F' : '#5B8FF9',
          },
        },
        {
          // 阶段累计值：灰色小字压在变动金额上方，与变动金额区分
          text: (d: { cumulative: number }) => `累计 ${d.cumulative}`,
          position: 'top',
          style: { dy: -20, fontSize: 10, fill: '#8C8C8C' },
        },
      ],
    },
  ],
});

chart.render();
