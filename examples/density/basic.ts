import { Chart } from '@antv/g2';

/**
 * 基础密度图
 * 场景：对比不同客服渠道「首次响应时长」的整体分布形态，而不只是均值
 * 要点：type: 'density' 必须搭配 data.transform 中的 kde；
 *       encode.y / encode.size 用的是 kde 的输出字段（默认 'y' / 'size'），
 *       不是原始字段名；x 必须是类别字段（band 比例尺）
 */
const data = [
  { channel: '在线客服', responseMinutes: 2 },
  { channel: '在线客服', responseMinutes: 3 },
  { channel: '在线客服', responseMinutes: 3 },
  { channel: '在线客服', responseMinutes: 4 },
  { channel: '在线客服', responseMinutes: 4 },
  { channel: '在线客服', responseMinutes: 5 },
  { channel: '在线客服', responseMinutes: 5 },
  { channel: '在线客服', responseMinutes: 6 },
  { channel: '在线客服', responseMinutes: 6 },
  { channel: '在线客服', responseMinutes: 7 },
  { channel: '在线客服', responseMinutes: 8 },
  { channel: '在线客服', responseMinutes: 9 },
  { channel: '在线客服', responseMinutes: 10 },
  { channel: '在线客服', responseMinutes: 12 },
  { channel: '在线客服', responseMinutes: 15 },
  { channel: '电话客服', responseMinutes: 1 },
  { channel: '电话客服', responseMinutes: 2 },
  { channel: '电话客服', responseMinutes: 2 },
  { channel: '电话客服', responseMinutes: 3 },
  { channel: '电话客服', responseMinutes: 3 },
  { channel: '电话客服', responseMinutes: 4 },
  { channel: '电话客服', responseMinutes: 4 },
  { channel: '电话客服', responseMinutes: 5 },
  { channel: '电话客服', responseMinutes: 5 },
  { channel: '电话客服', responseMinutes: 6 },
  { channel: '电话客服', responseMinutes: 7 },
  { channel: '电话客服', responseMinutes: 8 },
  { channel: '电话客服', responseMinutes: 9 },
  { channel: '电话客服', responseMinutes: 11 },
  { channel: '电话客服', responseMinutes: 14 },
  { channel: '邮件工单', responseMinutes: 10 },
  { channel: '邮件工单', responseMinutes: 12 },
  { channel: '邮件工单', responseMinutes: 15 },
  { channel: '邮件工单', responseMinutes: 18 },
  { channel: '邮件工单', responseMinutes: 20 },
  { channel: '邮件工单', responseMinutes: 22 },
  { channel: '邮件工单', responseMinutes: 25 },
  { channel: '邮件工单', responseMinutes: 28 },
  { channel: '邮件工单', responseMinutes: 30 },
  { channel: '邮件工单', responseMinutes: 32 },
  { channel: '邮件工单', responseMinutes: 35 },
  { channel: '邮件工单', responseMinutes: 38 },
  { channel: '邮件工单', responseMinutes: 40 },
  { channel: '邮件工单', responseMinutes: 45 },
  { channel: '邮件工单', responseMinutes: 52 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'density',
  data: {
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'kde',
        field: 'responseMinutes', // KDE 的输入字段
        groupBy: ['channel'], // 按渠道分别估计密度
        size: 24, // 采样点数量，越大曲线越细腻
        min: 0,
        max: 60,
      },
    ],
  },
  // y / size 必须引用 kde 的输出字段（默认 'y' / 'size'）
  encode: { x: 'channel', y: 'y', size: 'size' },
  style: {
    fill: '#5B8FF9',
    stroke: '#5B8FF9',
    fillOpacity: 0.35,
    lineWidth: 1.5,
  },
  axis: {
    x: { title: '客服渠道' },
    y: { title: '首次响应时长（分钟）' },
  },
});

chart.render();
