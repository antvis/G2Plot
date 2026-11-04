/**
 * 面积 + 折线 + 散点：三层叠加
 * 场景：日活趋势既要量级氛围（面积）、走势（折线），又要标出每个采样点（散点）
 * 要点：父级 encode 只写一次，子 mark 自动继承；散点关掉 tooltip 避免重复提示
 */
import { Chart } from '@antv/g2';

const data = [
  { date: '06-01', dau: 18200 },
  { date: '06-02', dau: 19600 },
  { date: '06-03', dau: 18900 },
  { date: '06-04', dau: 21400 },
  { date: '06-05', dau: 23100 },
  { date: '06-06', dau: 22800 },
  { date: '06-07', dau: 24900 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  encode: { x: 'date', y: 'dau' },
  children: [
    {
      type: 'area',
      style: { fill: '#5B8FF9', fillOpacity: 0.15 },
    },
    {
      type: 'line',
      style: { stroke: '#5B8FF9', lineWidth: 2 },
    },
    {
      type: 'point',
      encode: { shape: 'circle', size: 3 },
      style: { fill: '#fff', stroke: '#5B8FF9', lineWidth: 2 },
      tooltip: false,
    },
  ],
  axis: { x: { title: '日期' }, y: { title: '日活用户数' } },
});

chart.render();
