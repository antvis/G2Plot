import { Chart } from '@antv/g2';

/**
 * 基础棒棒糖图（Lollipop）
 * 场景：5~12 个类别的数值对比（各渠道订单量、各城市活跃用户数），
 *       希望比柱状图更轻量、视觉焦点落在数值顶点上
 * 要点：view 组合 link（茎）+ point（糖头）；link 的 encode.x / y 必须传
 *       [起点字段, 终点字段] 数组，单字段只会画出一个端点；
 *       baseline 字段固定为 0，是茎的起点，也让 y 轴从 0 开始
 */
const data = [
  { channel: '自然搜索', orders: 4820, baseline: 0 },
  { channel: '信息流广告', orders: 3610, baseline: 0 },
  { channel: '社交媒体', orders: 2940, baseline: 0 },
  { channel: '邮件营销', orders: 1260, baseline: 0 },
  { channel: '线下活动', orders: 870, baseline: 0 },
  { channel: '合作渠道', orders: 430, baseline: 0 },
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
      // 茎：从 baseline(0) 连到 orders
      type: 'link',
      encode: { x: ['channel', 'channel'], y: ['baseline', 'orders'] },
      style: { stroke: '#5B8FF9', lineWidth: 2 },
      tooltip: false,
    },
    {
      // 糖头：数值顶点，position 决定视觉焦点
      type: 'point',
      encode: { x: 'channel', y: 'orders' },
      style: { r: 5, fill: '#5B8FF9', stroke: '#fff', lineWidth: 2 },
    },
  ],
  axis: {
    x: { title: '获客渠道' },
    y: { title: '订单量（单）' },
  },
  tooltip: {
    title: 'channel',
    items: [{ channel: 'y', name: '订单量', valueFormatter: (v) => `${v} 单` }],
  },
});

chart.render();
