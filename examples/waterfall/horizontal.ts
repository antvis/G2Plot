/**
 * 横向瀑布图
 * 场景：类别名较长或项数较多（如成本拆解），横向排列更易读
 * 要点：coordinate 加 transpose 转置；y / y1 区间语义不变，
 *       labels 的 position 用 'outside' 贴在柱体末端
 */
import { Chart } from '@antv/g2';

type CostStep = {
  item: string;
  change: number;
  kind: 'start' | 'change' | 'end';
};

const steps: CostStep[] = [
  { item: '营业收入', change: 500, kind: 'start' },
  { item: '原材料成本', change: -180, kind: 'change' },
  { item: '人工成本', change: -90, kind: 'change' },
  { item: '物流仓储', change: -40, kind: 'change' },
  { item: '市场营销', change: -30, kind: 'change' },
  { item: '其他费用', change: -20, kind: 'change' },
  { item: '净利润', change: 0, kind: 'end' },
];

let running = 0;
const data = steps.map(({ item, change, kind }) => {
  if (kind === 'start') {
    running = change;
    return { item, base: 0, end: change, change, direction: '合计' };
  }
  if (kind === 'end') {
    return { item, base: 0, end: running, change: running, direction: '合计' };
  }
  const after = running + change;
  const row = {
    item,
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
  encode: { x: 'item', y: 'base', y1: 'end', color: 'direction' },
  // 转置坐标系：类别排到纵轴，柱体水平延伸
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: {
    color: {
      domain: ['增加', '减少', '合计'],
      range: ['#2FA84F', '#E15759', '#5B8FF9'],
    },
  },
  labels: [
    {
      text: (d: { change: number; direction: string }) =>
        d.direction === '合计' ? `${d.change}` : `${d.change > 0 ? '+' : ''}${d.change}`,
      position: 'outside',
      style: { fontSize: 11, fill: '#595959' },
    },
  ],
  axis: {
    x: { title: null },
    y: { title: '万元' },
  },
  legend: { color: { position: 'top' } },
});

chart.render();
