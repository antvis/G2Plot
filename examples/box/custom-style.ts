import { Chart } from '@antv/g2';

/**
 * 品牌视觉定制的箱线图
 * 场景：需要统一品牌配色、坐标轴标题与中文 tooltip 指标名的报表页
 * 要点：boxplot 是复合 mark，样式键按 box* / point* 前缀分发，tooltip 同理用
 *       boxItems / pointItems；箱体、须、中位数共用一条 path，只能整体设置
 *       boxStroke / boxLineWidth；5 个数值通道依次是 y=下须、y1=Q1、y2=中位数、y3=Q3、y4=上须
 */
const data = [
  { channel: 'App', nps: 72 },
  { channel: 'App', nps: 75 },
  { channel: 'App', nps: 78 },
  { channel: 'App', nps: 80 },
  { channel: 'App', nps: 82 },
  { channel: 'App', nps: 85 },
  { channel: 'App', nps: 88 },
  { channel: 'App', nps: 90 },
  { channel: '小程序', nps: 65 },
  { channel: '小程序', nps: 68 },
  { channel: '小程序', nps: 70 },
  { channel: '小程序', nps: 72 },
  { channel: '小程序', nps: 75 },
  { channel: '小程序', nps: 78 },
  { channel: '小程序', nps: 80 },
  { channel: '小程序', nps: 84 },
  { channel: '网页', nps: 58 },
  { channel: '网页', nps: 60 },
  { channel: '网页', nps: 62 },
  { channel: '网页', nps: 65 },
  { channel: '网页', nps: 68 },
  { channel: '网页', nps: 70 },
  { channel: '网页', nps: 72 },
  { channel: '网页', nps: 76 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'boxplot',
  data,
  encode: { x: 'channel', y: 'nps' },
  style: {
    boxFill: '#5B8FF9',
    boxFillOpacity: 0.15,
    boxStroke: '#1D39C4',
    boxLineWidth: 1.5,
    pointFill: '#FA8C16',
    pointR: 3,
  },
  axis: {
    x: { title: '渠道' },
    y: { title: 'NPS 评分' },
  },
  tooltip: {
    boxItems: [
      { channel: 'y', name: '最小值' },
      { channel: 'y1', name: 'Q1' },
      { channel: 'y2', name: '中位数' },
      { channel: 'y3', name: 'Q3' },
      { channel: 'y4', name: '最大值' },
    ],
    pointItems: [{ channel: 'y', name: '离群值' }],
  },
});

chart.render();
