import { Chart } from '@antv/g2';

/**
 * 分段进度条
 * 场景：一个项目的整体进度拆成已完成 / 进行中 / 未开始三段，横条按占比切分
 * 要点：三态是同一根条上的堆叠，用 stackY + color 通道；每段之和必须凑满 100，
 *       y 轴 domain 固定 [0, 100] 才是"占满一条"的语义
 */
const data = [
  { project: '官网改版', status: '已完成', proportion: 45 },
  { project: '官网改版', status: '进行中', proportion: 30 },
  { project: '官网改版', status: '未开始', proportion: 25 },
  { project: '数据中台', status: '已完成', proportion: 60 },
  { project: '数据中台', status: '进行中', proportion: 25 },
  { project: '数据中台', status: '未开始', proportion: 15 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'project', y: 'proportion', color: 'status' },
  transform: [{ type: 'stackY' }],
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: {
    y: { domain: [0, 100] },
    color: {
      domain: ['已完成', '进行中', '未开始'],
      range: ['#5AD8A6', '#5B8FF9', '#E8EAF0'],
    },
  },
  style: { maxWidth: 28 },
  axis: { x: { title: false }, y: false },
  legend: { color: { position: 'top' } },
  tooltip: {
    items: [{ channel: 'y', name: '占比', valueFormatter: (v) => `${v}%` }],
  },
});

chart.render();
