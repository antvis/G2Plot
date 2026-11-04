import { Chart } from '@antv/g2';

/**
 * 样式自定义的瀑布图
 * 场景：汇报大屏 / 品牌视觉统一，关注配色、留白、标题与图例位置
 * 要点：scale.color.range 固定语义色；style.radius 给柱体圆角；
 *       scale.x.padding 控制柱间距；title 必须是对象而不是字符串
 */
const steps = [
  { stage: '期初现金', change: 200, kind: 'start' },
  { stage: '销售回款', change: 150, kind: 'change' },
  { stage: '采购付款', change: -80, kind: 'change' },
  { stage: '工资支出', change: -60, kind: 'change' },
  { stage: '税费缴纳', change: -25, kind: 'change' },
  { stage: '期末现金', change: 0, kind: 'end' },
] as const;

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
      range: ['#0E9F6E', '#F05252', '#1F2937'],
    },
    // 柱间距：x 为 band scale，padding 越大柱子越窄
    x: { padding: 0.35 },
  },
  // 圆角只作用在柱体四个角，浮动柱同样生效
  style: { radius: 3 },
  title: {
    title: '季度现金流变动',
    subtitle: '单位：万元',
    align: 'left',
    titleFontSize: 16,
    subtitleFontSize: 12,
    subtitleFill: '#8c8c8c',
  },
  axis: {
    x: { labelFontSize: 11 },
    y: { title: null, gridLineDash: [4, 4] },
  },
  // 图例放在顶部，给底部类别名留出空间
  legend: { color: { position: 'top', itemLabelFontSize: 11 } },
});

chart.render();
