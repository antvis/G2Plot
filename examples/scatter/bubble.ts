import { Chart } from '@antv/g2';

/**
 * 气泡图
 * 场景：三维数据对比（如各国：人均收入 x、预期寿命 y、人口 size）
 * 要点：size 通道映射第三维；scale.size 用 sqrt 比例尺并限制 range；
 *       size 图例意义不大，用 legend: { size: false } 隐藏
 */
const data = [
  { income: 28604, life: 77.0, population: 25, country: 'Australia' },
  { income: 31163, life: 77.4, population: 39, country: 'Canada' },
  { income: 13334, life: 76.9, population: 1412, country: 'China' },
  { income: 37599, life: 81.9, population: 68, country: 'France' },
  { income: 36162, life: 83.5, population: 126, country: 'Japan' },
  { income: 53354, life: 79.1, population: 332, country: 'United States' },
  { income: 21056, life: 75.2, population: 215, country: 'Brazil' },
  { income: 6508, life: 70.8, population: 1393, country: 'India' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data,
  encode: { x: 'income', y: 'life', size: 'population', color: 'country' },
  scale: { size: { type: 'sqrt', range: [6, 36] } },
  style: { fillOpacity: 0.7, lineWidth: 1, stroke: '#fff' },
  legend: { size: false },
  axis: {
    x: { title: '人均收入（USD）' },
    y: { title: '预期寿命（岁）' },
  },
});

chart.render();
