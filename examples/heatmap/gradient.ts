import { Chart } from '@antv/g2';

/**
 * 渐变热力图（高斯核密度）
 * 场景：连续二维空间的点密度，如大量经纬度点、点云分布，比散点更能看出聚集
 * 要点：type: 'heatmap'（区别于矩阵型 cell）；必须配 encode.color（强度，0~1）；
 *       encode.size 控制热晕半径；自定义颜色用 scale.color.range（数组），
 *       不要用 palette 传数组（palette 只接受调色板名字符串）
 */
// 模拟 4 个聚集簇的经纬度点
const data = Array.from({ length: 800 }, () => {
  const cluster = Math.floor(Math.random() * 4);
  const centers = [
    [116.4, 39.9],
    [121.5, 31.2],
    [113.3, 23.1],
    [104.1, 30.6],
  ];
  const [cx, cy] = centers[cluster];
  return {
    lng: cx + (Math.random() - 0.5) * 0.6,
    lat: cy + (Math.random() - 0.5) * 0.6,
    intensity: Math.random(), // 强度 0~1
  };
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'heatmap',
  data,
  encode: {
    x: 'lng',
    y: 'lat',
    color: 'intensity', // 必须：强度值 0~1
    size: 30, // 热晕半径（px）
  },
  scale: {
    // 自定义颜色数组用 range；palette 只能传调色板名字符串
    color: { type: 'sequential', range: ['#d0e8ff', '#0050b3', '#ff7f0e'] },
  },
  style: { opacity: 0.8 },
  axis: false,
  legend: false,
});

chart.render();
