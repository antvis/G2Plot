import { Chart } from '@antv/g2';

/**
 * 折线 + 数据点：组合视图
 * 场景：既要趋势线，又要清晰标出每个数据点
 * 要点：type 为 'view'，children 中叠加 line 与 point，共享 data
 */
const data = [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 150 },
  { month: 'Apr', value: 280 },
  { month: 'May', value: 220 },
  { month: 'Jun', value: 350 },
];

const chart = new Chart({
  container: 'container',
  width: 640,
  height: 360,
});

chart.options({
  type: 'view',
  data,
  children: [
    { type: 'line', encode: { x: 'month', y: 'value' } },
    {
      type: 'point',
      encode: { x: 'month', y: 'value', shape: 'point', size: 4 },
      style: { stroke: '#5B8FF9', fill: '#fff', lineWidth: 2 },
      tooltip: false,
    },
  ],
});

chart.render();
