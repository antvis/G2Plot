import { Chart } from '@antv/g2';

/**
 * 颜色分组圆包裹图
 * 场景：不同类别的子节点用不同颜色标记，便于在层级结构中快速区分所属类别
 */
const data = [
  { name: '电子产品', value: 100, category: 'tech' },
  { name: '手机', value: 40, parent: '电子产品', category: 'tech' },
  { name: '电脑', value: 60, parent: '电子产品', category: 'tech' },
  { name: '服装', value: 80, category: 'fashion' },
  { name: '衬衫', value: 30, parent: '服装', category: 'fashion' },
  { name: '裤子', value: 50, parent: '服装', category: 'fashion' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'circle-packing',
  data,
  encode: {
    name: 'name',
    value: 'value',
    color: 'category',
  },
  scale: {
    color: { range: ['#5B8FF9', '#5AD8A6', '#FA8C00'] },
  },
});

chart.render();