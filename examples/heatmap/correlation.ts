import { Chart } from '@antv/g2';

/**
 * 相关系数矩阵热力图
 * 场景：多指标两两相关性分析（-1 ~ 1），用发散色阶区分正负相关
 * 要点：发散色阶 palette 'RdBu' + 固定 domain [-1, 1]，0 点居中为白色
 */
const metrics = ['销量', '价格', '广告', '评分'];
const matrix = [
  [1, -0.62, 0.78, 0.45],
  [-0.62, 1, -0.35, -0.2],
  [0.78, -0.35, 1, 0.52],
  [0.45, -0.2, 0.52, 1],
];
const data = matrix.flatMap((row, i) =>
  row.map((corr, j) => ({ x: metrics[i], y: metrics[j], corr })),
);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'cell',
  data,
  encode: { x: 'x', y: 'y', color: 'corr' },
  scale: {
    color: { type: 'sequential', palette: 'RdBu', domain: [-1, 1] },
  },
  labels: [
    { text: (d: { corr: number }) => d.corr.toFixed(2), style: { fontSize: 10 } },
  ],
  style: { inset: 2 },
});

chart.render();
