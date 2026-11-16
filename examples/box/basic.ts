import { Chart } from '@antv/g2';

/**
 * 基础箱线图
 * 场景：一个类别字段下每个类别有多个观测值，比较各组分布（如各部门月薪）
 * 要点：type: 'boxplot' + encode { x, y }，分位数与异常值由原始明细数据自动计算；
 *       每行一个观测值，不要把已经算好的分位数传进来
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
  axis: { y: { title: '月薪（千元）' } },
});

chart.render();
