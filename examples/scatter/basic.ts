import { Chart } from '@antv/g2';

/**
 * 基础散点图
 * 场景：两个数值变量的相关性/分布（如广告花费 vs 销售额、身高 vs 体重）
 */
const data = [
  { spend: 1200, sales: 3200 },
  { spend: 1800, sales: 4100 },
  { spend: 1500, sales: 3600 },
  { spend: 2200, sales: 5200 },
  { spend: 2600, sales: 5800 },
  { spend: 2000, sales: 4300 },
  { spend: 3000, sales: 6500 },
  { spend: 2400, sales: 5100 },
  { spend: 1600, sales: 3900 },
  { spend: 2800, sales: 6200 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data,
  encode: { x: 'spend', y: 'sales' },
  axis: {
    x: { title: '广告花费（元）' },
    y: { title: '销售额（元）' },
  },
});

chart.render();
