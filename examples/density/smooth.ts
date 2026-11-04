import { Chart } from '@antv/g2';

/**
 * 平滑密度图（调节 KDE 参数）
 * 场景：样本量较大、分布偏态明显时，用更细的采样点和更宽的核让曲线更顺滑易读
 * 要点：kde 的 size 控制采样点数量（越大越细腻），width 控制核宽度（越大越平滑）；
 *       显式给 min / max 可固定横轴范围，避免多组数据各自拉伸
 */
const data = [
  { product: '基础版', userAge: 18 },
  { product: '基础版', userAge: 20 },
  { product: '基础版', userAge: 22 },
  { product: '基础版', userAge: 23 },
  { product: '基础版', userAge: 24 },
  { product: '基础版', userAge: 25 },
  { product: '基础版', userAge: 26 },
  { product: '基础版', userAge: 27 },
  { product: '基础版', userAge: 28 },
  { product: '基础版', userAge: 30 },
  { product: '基础版', userAge: 32 },
  { product: '基础版', userAge: 35 },
  { product: '基础版', userAge: 38 },
  { product: '基础版', userAge: 42 },
  { product: '基础版', userAge: 45 },
  { product: '专业版', userAge: 22 },
  { product: '专业版', userAge: 25 },
  { product: '专业版', userAge: 28 },
  { product: '专业版', userAge: 30 },
  { product: '专业版', userAge: 32 },
  { product: '专业版', userAge: 34 },
  { product: '专业版', userAge: 35 },
  { product: '专业版', userAge: 36 },
  { product: '专业版', userAge: 38 },
  { product: '专业版', userAge: 40 },
  { product: '专业版', userAge: 42 },
  { product: '专业版', userAge: 45 },
  { product: '专业版', userAge: 48 },
  { product: '专业版', userAge: 52 },
  { product: '专业版', userAge: 56 },
  { product: '企业版', userAge: 26 },
  { product: '企业版', userAge: 28 },
  { product: '企业版', userAge: 30 },
  { product: '企业版', userAge: 32 },
  { product: '企业版', userAge: 34 },
  { product: '企业版', userAge: 35 },
  { product: '企业版', userAge: 36 },
  { product: '企业版', userAge: 37 },
  { product: '企业版', userAge: 38 },
  { product: '企业版', userAge: 40 },
  { product: '企业版', userAge: 43 },
  { product: '企业版', userAge: 46 },
  { product: '企业版', userAge: 50 },
  { product: '企业版', userAge: 54 },
  { product: '企业版', userAge: 58 },
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
        field: 'userAge',
        groupBy: ['product'],
        size: 50, // 采样点更多，曲线更细腻
        width: 4, // 核更宽，曲线更平滑
        min: 15,
        max: 65,
      },
    ],
  },
  encode: { x: 'product', y: 'y', size: 'size', color: 'product' },
  style: { fillOpacity: 0.3, lineWidth: 2 },
  scale: {
    color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16'] },
  },
  axis: {
    x: { title: '产品版本' },
    y: { title: '用户年龄（岁）' },
  },
  legend: false,
});

chart.render();
