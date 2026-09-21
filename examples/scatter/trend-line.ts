import { Chart } from '@antv/g2';

/**
 * 散点图 + 拟合趋势线
 * 场景：在相关性分布上叠加回归趋势线，直观呈现整体走向（如投入 vs 产出的平均关系）
 * 要点：view children 叠加 point 与 line；趋势线用最小二乘法手动拟合，
 *       生成两个端点连成直线，不依赖扩展包
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

// 最小二乘法拟合 y = kx + b
const n = data.length;
const sumX = data.reduce((s, d) => s + d.spend, 0);
const sumY = data.reduce((s, d) => s + d.sales, 0);
const sumXY = data.reduce((s, d) => s + d.spend * d.sales, 0);
const sumXX = data.reduce((s, d) => s + d.spend * d.spend, 0);
const k = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
const b = (sumY - k * sumX) / n;

// 用 x 的最小/最大值生成趋势线两个端点
const xMin = Math.min(...data.map((d) => d.spend));
const xMax = Math.max(...data.map((d) => d.spend));
const trendData = [
  { spend: xMin, sales: k * xMin + b },
  { spend: xMax, sales: k * xMax + b },
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
      type: 'point',
      encode: { x: 'spend', y: 'sales' },
      style: { fillOpacity: 0.7 },
    },
    {
      // 拟合趋势线：独立数据，两个端点连成直线
      type: 'line',
      data: trendData,
      encode: { x: 'spend', y: 'sales' },
      style: { stroke: '#F4664A', lineWidth: 2, lineDash: [4, 4] },
      tooltip: false,
    },
  ],
  axis: {
    x: { title: '广告花费（元）' },
    y: { title: '销售额（元）' },
  },
});

chart.render();
