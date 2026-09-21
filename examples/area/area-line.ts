import { Chart } from '@antv/g2';

/**
 * 面积 + 折线组合
 * 场景：面积提供量感背景，折线提供精确走势边界（Dashboard 常用形态）
 * 要点：不要在 area 上用 stroke 描边（会包裹整个区域），用 view 叠加 line
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
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'area',
      encode: { x: 'month', y: 'value' },
      style: { fill: '#5B8FF9', fillOpacity: 0.2 },
    },
    {
      type: 'line',
      encode: { x: 'month', y: 'value' },
      style: { stroke: '#5B8FF9', lineWidth: 2 },
    },
  ],
});

chart.render();
