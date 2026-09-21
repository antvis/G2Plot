import { Chart } from '@antv/g2';

/**
 * 分组散点图
 * 场景：对比不同组别在双变量空间中的分布差异（如男女用户的身高体重分布）
 * 要点：color 通道映射分组字段；加 fillOpacity 缓解点重叠
 */
const data = [
  { height: 165, weight: 55, gender: '女' },
  { height: 158, weight: 48, gender: '女' },
  { height: 170, weight: 60, gender: '女' },
  { height: 162, weight: 52, gender: '女' },
  { height: 168, weight: 58, gender: '女' },
  { height: 175, weight: 70, gender: '男' },
  { height: 180, weight: 78, gender: '男' },
  { height: 172, weight: 65, gender: '男' },
  { height: 178, weight: 75, gender: '男' },
  { height: 185, weight: 82, gender: '男' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data,
  encode: { x: 'height', y: 'weight', color: 'gender' },
  style: { fillOpacity: 0.7 },
  axis: {
    x: { title: '身高（cm）' },
    y: { title: '体重（kg）' },
  },
});

chart.render();
