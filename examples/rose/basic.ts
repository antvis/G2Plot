import { Chart } from '@antv/g2';

/**
 * 基础玫瑰图
 * 场景：展示不同产品线的 relative sales proportion（相对销售比例）
 * 要点：type: 'rose' + encode 使用 radius 映射数值；类别自动环绕圆心分布
 */
const data = [
  { product: '产品A', value: 120 },
  { product: '产品B', value: 200 },
  { product: '产品C', value: 150 },
  { product: '产品D', value: 280 },
  { product: '产品E', value: 220 },
  { product: '产品F', value: 350 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'rose',
  data,
  encode: { value: 'value' },
});

chart.render();