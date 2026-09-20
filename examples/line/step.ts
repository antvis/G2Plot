import { Chart } from '@antv/g2';

/**
 * 阶梯折线图
 * 场景：数值在离散时间点发生跳变（如价格调整、利率变化）
 * shape 取值：'hv'（先横后竖）、'vh'（先竖后横）、'hvh'（中点跳变）
 */
const data = [
  { date: '2026-01', price: 99 },
  { date: '2026-02', price: 99 },
  { date: '2026-03', price: 129 },
  { date: '2026-04', price: 129 },
  { date: '2026-05', price: 119 },
  { date: '2026-06', price: 149 },
];

const chart = new Chart({
  container: 'container',
  width: 640,
  height: 360,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'date', y: 'price', shape: 'hvh' },
});

chart.render();
