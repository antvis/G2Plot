import { Chart } from '@antv/g2';

/**
 * 基础条形图
 * 场景：类别名较长或类别较多时的横向数值对比
 * 要点：interval + transpose 坐标转置；encode 仍写 x=类别、y=数值
 */
const data = [
  { dept: '产品研发部', headcount: 120 },
  { dept: '市场营销部', headcount: 80 },
  { dept: '客户服务部', headcount: 95 },
  { dept: '人力资源部', headcount: 30 },
  { dept: '财务管理部', headcount: 25 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'dept', y: 'headcount' },
  coordinate: { transform: [{ type: 'transpose' }] },
});

chart.render();
