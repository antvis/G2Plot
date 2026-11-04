import { Chart } from '@antv/g2';

/**
 * 基础对称条形图（人口金字塔）
 * 场景：同一类别下两组相反含义的数据左右对比（如各年龄段男女人口）
 * 要点：interval + transpose 横向；男性取负值形成左侧；y 轴 labelFormatter 显示绝对值
 */
const data = [
  { ageGroup: '0-14 岁', sex: '男性', population: 12.5 },
  { ageGroup: '15-29 岁', sex: '男性', population: 15.2 },
  { ageGroup: '30-44 岁', sex: '男性', population: 18.6 },
  { ageGroup: '45-59 岁', sex: '男性', population: 14.8 },
  { ageGroup: '60 岁以上', sex: '男性', population: 9.3 },
  { ageGroup: '0-14 岁', sex: '女性', population: 11.8 },
  { ageGroup: '15-29 岁', sex: '女性', population: 14.7 },
  { ageGroup: '30-44 岁', sex: '女性', population: 18.1 },
  { ageGroup: '45-59 岁', sex: '女性', population: 15.4 },
  { ageGroup: '60 岁以上', sex: '女性', population: 10.6 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'ageGroup',
    // 关键：男性取负值，形成左侧镜像；女性保持正值在右侧
    y: (d: { sex: string; population: number }) =>
      d.sex === '男性' ? -d.population : d.population,
    color: 'sex',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { color: { range: ['#5B8FF9', '#F6BD16'] } },
  axis: {
    x: { title: '年龄段' },
    // 镜像后 y 轴会出现负刻度，展示时取绝对值
    y: {
      title: '人口（百万人）',
      labelFormatter: (d: number) => String(Math.abs(d)),
    },
  },
  legend: { color: { position: 'top' } },
});

chart.render();
