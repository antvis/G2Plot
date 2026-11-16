import { Chart } from '@antv/g2';

/**
 * 显示中位数标签的箱线图
 * 场景：分布对比时需要直接读取各组中位数，减少看轴估算
 * 要点：Spec 模式用 labels 数组；boxplot 自动统计后的 y2 通道是中位数，
 *       text 回调通过第四个参数的 channel.y2 读取，不要直接显示原始 salary
 */
const data = [
  { department: '研发', salary: 18 },
  { department: '研发', salary: 20 },
  { department: '研发', salary: 22 },
  { department: '研发', salary: 24 },
  { department: '研发', salary: 26 },
  { department: '研发', salary: 28 },
  { department: '研发', salary: 30 },
  { department: '研发', salary: 34 },
  { department: '设计', salary: 14 },
  { department: '设计', salary: 15 },
  { department: '设计', salary: 17 },
  { department: '设计', salary: 18 },
  { department: '设计', salary: 20 },
  { department: '设计', salary: 22 },
  { department: '设计', salary: 24 },
  { department: '设计', salary: 26 },
  { department: '市场', salary: 12 },
  { department: '市场', salary: 14 },
  { department: '市场', salary: 15 },
  { department: '市场', salary: 16 },
  { department: '市场', salary: 18 },
  { department: '市场', salary: 20 },
  { department: '市场', salary: 22 },
  { department: '市场', salary: 25 },
  { department: '运营', salary: 10 },
  { department: '运营', salary: 11 },
  { department: '运营', salary: 12 },
  { department: '运营', salary: 14 },
  { department: '运营', salary: 15 },
  { department: '运营', salary: 16 },
  { department: '运营', salary: 18 },
  { department: '运营', salary: 21 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'boxplot',
  data,
  encode: { x: 'department', y: 'salary' },
  labels: [
    {
      text: (
        _d: unknown,
        index: number,
        _data: unknown[],
        { channel }: { channel: { y2: number[] } },
      ) => `中位数 ${channel.y2[index]}`,
      position: 'inside',
      style: { fill: '#1D39C4', fontSize: 12, fontWeight: 'bold' },
    },
  ],
  axis: { y: { title: '月薪（千元）' } },
});

chart.render();
