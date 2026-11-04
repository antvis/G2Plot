/**
 * 基础分面折线图
 * 用途：将各区域销售趋势拆成独立子图，避免多线重叠
 * 场景：按单一类别字段对比多个分组的同构趋势
 * 要点：facetRect 的 encode.x 指定列分面；children 继承并自动过滤父级数据
 */
import { Chart } from '@antv/g2';

const data = [
  { region: '华东', month: 'Jan', revenue: 120 },
  { region: '华东', month: 'Feb', revenue: 168 },
  { region: '华东', month: 'Mar', revenue: 152 },
  { region: '华东', month: 'Apr', revenue: 205 },
  { region: '华东', month: 'May', revenue: 228 },
  { region: '华东', month: 'Jun', revenue: 246 },
  { region: '华南', month: 'Jan', revenue: 96 },
  { region: '华南', month: 'Feb', revenue: 118 },
  { region: '华南', month: 'Mar', revenue: 142 },
  { region: '华南', month: 'Apr', revenue: 136 },
  { region: '华南', month: 'May', revenue: 174 },
  { region: '华南', month: 'Jun', revenue: 190 },
  { region: '华北', month: 'Jan', revenue: 82 },
  { region: '华北', month: 'Feb', revenue: 90 },
  { region: '华北', month: 'Mar', revenue: 108 },
  { region: '华北', month: 'Apr', revenue: 126 },
  { region: '华北', month: 'May', revenue: 121 },
  { region: '华北', month: 'Jun', revenue: 148 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'facetRect',
  data,
  encode: { x: 'region' },
  children: [
    {
      type: 'line',
      encode: { x: 'month', y: 'revenue' },
      style: { stroke: '#5B8FF9', lineWidth: 2 },
      axis: {
        x: { title: '月份' },
        y: { title: '销售额（万元）' },
      },
    },
  ],
});

chart.render();
