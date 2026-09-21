import { Chart } from '@antv/g2';

/**
 * 断点处理：缺失数据用虚线连接
 * 场景：部分日期无数据（如停采、系统故障），默认折线在缺口处断开；
 *       想表达「估算/插值」的连续趋势时，用 connect: true 跨断点连线
 *
 * 要点：
 * - 缺失值传 null（不要传 0 或 undefined）
 * - G2 v5 用 style.connect 控制断点连接，不存在 connectNulls 属性（写了会白屏）
 * - 必须配合 connectStroke（或 connectLineDash 等 connect 前缀样式）：
 *   只写 connect: true 时连接段沿用主线样式，视觉上和正常线没区别；
 *   加上 connectStroke/connectLineDash 后，连接段单独用灰色虚线绘制，才能看出是「补」的
 */
const data = [
  { date: '09-14', value: 120 },
  { date: '09-15', value: 200 },
  { date: '09-16', value: null }, // 缺失
  { date: '09-17', value: 280 },
  { date: '09-18', value: 220 },
  { date: '09-19', value: null }, // 缺失
  { date: '09-20', value: 350 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'date', y: 'value' },
  style: {
    connect: true, // 跨断点连线
    connectStroke: '#aaa', // 连接段颜色（灰色，区别于主线）
    connectLineDash: [4, 4], // 连接段虚线，表达「估算」含义
  },
});

chart.render();
