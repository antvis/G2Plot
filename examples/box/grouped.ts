import { Chart } from '@antv/g2';

/**
 * 分组箱线图
 * 场景：同一类别下多个系列（地区、渠道、机型）的分布并排对比
 * 要点：encode 必须同时给 color 与 series —— box 不像 interval 会自动 dodge，
 *       只写 color 时箱体颜色不同但位置重叠；series 负责并排偏移
 */
const data = [
  { month: 'Jan', region: '华东', orderValue: 128 },
  { month: 'Jan', region: '华东', orderValue: 142 },
  { month: 'Jan', region: '华东', orderValue: 156 },
  { month: 'Jan', region: '华东', orderValue: 168 },
  { month: 'Jan', region: '华东', orderValue: 185 },
  { month: 'Jan', region: '华东', orderValue: 210 },
  { month: 'Jan', region: '华北', orderValue: 96 },
  { month: 'Jan', region: '华北', orderValue: 108 },
  { month: 'Jan', region: '华北', orderValue: 120 },
  { month: 'Jan', region: '华北', orderValue: 132 },
  { month: 'Jan', region: '华北', orderValue: 148 },
  { month: 'Jan', region: '华北', orderValue: 170 },
  { month: 'Feb', region: '华东', orderValue: 145 },
  { month: 'Feb', region: '华东', orderValue: 158 },
  { month: 'Feb', region: '华东', orderValue: 172 },
  { month: 'Feb', region: '华东', orderValue: 190 },
  { month: 'Feb', region: '华东', orderValue: 205 },
  { month: 'Feb', region: '华东', orderValue: 235 },
  { month: 'Feb', region: '华北', orderValue: 102 },
  { month: 'Feb', region: '华北', orderValue: 115 },
  { month: 'Feb', region: '华北', orderValue: 128 },
  { month: 'Feb', region: '华北', orderValue: 140 },
  { month: 'Feb', region: '华北', orderValue: 152 },
  { month: 'Feb', region: '华北', orderValue: 176 },
  { month: 'Mar', region: '华东', orderValue: 160 },
  { month: 'Mar', region: '华东', orderValue: 175 },
  { month: 'Mar', region: '华东', orderValue: 188 },
  { month: 'Mar', region: '华东', orderValue: 205 },
  { month: 'Mar', region: '华东', orderValue: 226 },
  { month: 'Mar', region: '华东', orderValue: 258 },
  { month: 'Mar', region: '华北', orderValue: 118 },
  { month: 'Mar', region: '华北', orderValue: 130 },
  { month: 'Mar', region: '华北', orderValue: 145 },
  { month: 'Mar', region: '华北', orderValue: 158 },
  { month: 'Mar', region: '华北', orderValue: 172 },
  { month: 'Mar', region: '华北', orderValue: 198 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'boxplot',
  data,
  encode: { x: 'month', y: 'orderValue', color: 'region', series: 'region' },
  style: { boxFillOpacity: 0.3, pointR: 2 },
  legend: { color: { position: 'top' } },
  axis: { y: { title: '订单金额（元）' } },
});

chart.render();
