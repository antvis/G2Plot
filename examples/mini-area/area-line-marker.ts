/**
 * 迷你面积图（面积 + 折线 + 末点标记）
 * 场景：卡片中用迷你图强调「最新一天」的活跃用户数与整体走势
 * 要点：type: 'view' 叠加 area / line / point；末点用单元素 data 单独标记
 */
import { Chart } from '@antv/g2';

const data = [
  { date: '10-01', activeUsers: 1820 },
  { date: '10-02', activeUsers: 1760 },
  { date: '10-03', activeUsers: 1940 },
  { date: '10-04', activeUsers: 2010 },
  { date: '10-05', activeUsers: 1890 },
  { date: '10-06', activeUsers: 2150 },
  { date: '10-07', activeUsers: 2280 },
  { date: '10-08', activeUsers: 2190 },
  { date: '10-09', activeUsers: 2360 },
  { date: '10-10', activeUsers: 2410 },
  { date: '10-11', activeUsers: 2520 },
  { date: '10-12', activeUsers: 2470 },
  { date: '10-13', activeUsers: 2680 },
  { date: '10-14', activeUsers: 2790 },
];

const latest = data[data.length - 1];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  axis: { x: false, y: false },
  legend: false,
  children: [
    {
      type: 'area',
      encode: { x: 'date', y: 'activeUsers' },
      style: { fill: '#5AD8A6', fillOpacity: 0.2 },
    },
    {
      type: 'line',
      encode: { x: 'date', y: 'activeUsers' },
      style: { stroke: '#5AD8A6', lineWidth: 2 },
    },
    {
      // 只标记最后一个点：point 子 mark 用单元素数据
      type: 'point',
      data: [latest],
      encode: { x: 'date', y: 'activeUsers' },
      style: { fill: '#5AD8A6', stroke: '#fff', lineWidth: 2, r: 3 },
      tooltip: false,
    },
  ],
});

chart.render();
