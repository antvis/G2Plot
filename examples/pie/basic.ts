import { Chart } from '@antv/g2';

/**
 * 基础饼图
 * 场景：少量类别（≤ 6 个）的占比构成，如流量来源分布
 * 要点：interval + stackY + theta 坐标系，三者缺一不可
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
  coordinate: { type: 'theta' },
});

chart.render();
