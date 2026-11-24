import { Chart } from '@antv/g2';

/**
 * 品牌配色与标题定制
 * 用途：按品牌色板固定各分类颜色，并补齐标题与半径轴单位
 * 场景：面向客户的经营分析报告、品牌统一的可视化规范
 * 关键要点：scale.color.range 按分类顺序固定颜色；title 必须是对象；半径轴用 axis.y.title 标注量纲
 */
const data = [
  { channel: '直营', amount: 1240 },
  { channel: '经销', amount: 980 },
  { channel: '电商', amount: 860 },
  { channel: '团购', amount: 410 },
  { channel: '海外', amount: 330 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'channel', y: 'amount', color: 'channel' },
  coordinate: { type: 'polar', innerRadius: 0.4 },
  scale: {
    color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A', '#6DC8EC'] },
  },
  style: { radius: 4 },
  axis: { x: { grid: false }, y: { title: '销售额（万元）' } },
  title: {
    title: '各渠道销售额结构',
    subtitle: '统计周期：2026 年 10 月',
    align: 'center',
  },
  legend: false,
});

chart.render();