/**
 * 基础玫瑰图
 * 场景：比较不同产品线的销售量，花瓣等角分布，半径表示数值大小
 * 要点：interval + polar；encode.x 显式映射类别，encode.y 映射数值
 */
import { Chart } from '@antv/g2';

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
  type: 'interval',
  data,
  coordinate: { type: 'polar' },
  encode: { x: 'product', y: 'value', color: 'product' },
});

chart.render();
