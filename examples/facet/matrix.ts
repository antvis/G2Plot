/**
 * 二维矩形分面图
 * 用途：同时按区域和渠道拆分销售趋势，形成小多图矩阵
 * 场景：需要比较两个类别维度组合下的同构指标
 * 要点：父级 encode.x/y 定义分面列/行，子图 encode.x/y 定义图形位置
 */
import { Chart } from '@antv/g2';

const data = [
  { region: '华东', channel: '线上', month: 'Jan', revenue: 88 },
  { region: '华东', channel: '线上', month: 'Feb', revenue: 104 },
  { region: '华东', channel: '线上', month: 'Mar', revenue: 126 },
  { region: '华东', channel: '线上', month: 'Apr', revenue: 142 },
  { region: '华东', channel: '线下', month: 'Jan', revenue: 72 },
  { region: '华东', channel: '线下', month: 'Feb', revenue: 78 },
  { region: '华东', channel: '线下', month: 'Mar', revenue: 84 },
  { region: '华东', channel: '线下', month: 'Apr', revenue: 92 },
  { region: '华南', channel: '线上', month: 'Jan', revenue: 64 },
  { region: '华南', channel: '线上', month: 'Feb', revenue: 82 },
  { region: '华南', channel: '线上', month: 'Mar', revenue: 90 },
  { region: '华南', channel: '线上', month: 'Apr', revenue: 116 },
  { region: '华南', channel: '线下', month: 'Jan', revenue: 58 },
  { region: '华南', channel: '线下', month: 'Feb', revenue: 62 },
  { region: '华南', channel: '线下', month: 'Mar', revenue: 76 },
  { region: '华南', channel: '线下', month: 'Apr', revenue: 80 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'facetRect',
  data,
  encode: { x: 'region', y: 'channel' },
  title: {
    title: '区域 × 渠道销售趋势',
    subtitle: '单位：万元',
  },
  children: [
    {
      type: 'line',
      encode: { x: 'month', y: 'revenue' },
      style: { stroke: '#5AD8A6', lineWidth: 2 },
    },
  ],
});

chart.render();
