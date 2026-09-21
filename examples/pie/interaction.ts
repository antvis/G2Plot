import { Chart } from '@antv/g2';

/**
 * 交互与动画饼图
 * 场景：Dashboard 中需要悬停高亮、图例筛选，并要求入场动效
 * 要点：elementHighlight 悬停高亮 + legendFilter 图例筛选；
 *       animate.enter 用极坐标专用的 waveIn 波浪展开
 */
const data = [
  { source: '搜索引擎', value: 400 },
  { source: '社交媒体', value: 300 },
  { source: '直接访问', value: 200 },
  { source: '外部链接', value: 100 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { y: 'value', color: 'source' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', outerRadius: 0.8 },
  // 入场动画：waveIn 是极坐标（饼图/环形）专用的扇形波浪展开
  animate: { enter: { type: 'waveIn', duration: 1000 } },
  // 交互：悬停高亮当前扇形，图例点击筛选
  interaction: [{ type: 'elementHighlight' }, { type: 'legendFilter' }],
  labels: [
    { text: 'source', position: 'outside', style: { fontSize: 12 } },
  ],
});

chart.render();
