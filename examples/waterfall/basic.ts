import { Chart } from '@antv/g2';

/**
 * 基础瀑布图：月度利润构成拆解
 * 场景：从期初值出发，逐项展示增减变化如何累积到最终结果
 * 要点：G2 没有 waterfall mark —— 用 interval 的 y / y1 画浮动柱；
 *       先把「变动金额」累加成 [起, 止] 区间，再用 color 区分增加 / 减少 / 合计
 */
type ProfitStep = {
  stage: string;
  /** 该阶段的变动金额；期初项填起始值，期末项由累计结果决定 */
  change: number;
  kind: 'start' | 'change' | 'end';
};

const steps: ProfitStep[] = [
  { stage: '期初利润', change: 120, kind: 'start' },
  { stage: '新增订单', change: 46, kind: 'change' },
  { stage: '客单价提升', change: 28, kind: 'change' },
  { stage: '退款冲减', change: -34, kind: 'change' },
  { stage: '渠道费用', change: -22, kind: 'change' },
  { stage: '期末利润', change: 0, kind: 'end' },
];

// 累计：增加项从当前值向上画，减少项从当前值向下画
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
    // 负增长时 running > after，取 min/max 保证柱体从下往上画
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
  // y + y1 = 区间柱：柱体画在 [base, end] 之间，而不是从 0 起
  encode: { x: 'stage', y: 'base', y1: 'end', color: 'direction' },
  scale: {
    color: {
      domain: ['增加', '减少', '合计'],
      range: ['#2FA84F', '#E15759', '#5B8FF9'],
    },
  },
});

chart.render();
