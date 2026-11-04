import { Chart } from '@antv/g2';

/**
 * 箱线图叠加抖动散点
 * 场景：同时查看不同部门月薪的分位数摘要与每个员工的原始观测
 * 要点：view 组合 boxplot 与 point；point 使用 jitterX 散点，箱线图保持统计摘要
 */
const data = [
  { department: '研发', monthlySalary: 18000 },
  { department: '研发', monthlySalary: 22000 },
  { department: '研发', monthlySalary: 25000 },
  { department: '研发', monthlySalary: 19000 },
  { department: '研发', monthlySalary: 21000 },
  { department: '研发', monthlySalary: 28000 },
  { department: '研发', monthlySalary: 23500 },
  { department: '研发', monthlySalary: 20500 },
  { department: '销售', monthlySalary: 12000 },
  { department: '销售', monthlySalary: 16000 },
  { department: '销售', monthlySalary: 14000 },
  { department: '销售', monthlySalary: 11000 },
  { department: '销售', monthlySalary: 19500 },
  { department: '销售', monthlySalary: 15500 },
  { department: '销售', monthlySalary: 17500 },
  { department: '销售', monthlySalary: 13000 },
  { department: '设计', monthlySalary: 17000 },
  { department: '设计', monthlySalary: 20000 },
  { department: '设计', monthlySalary: 18500 },
  { department: '设计', monthlySalary: 23000 },
  { department: '设计', monthlySalary: 21500 },
  { department: '设计', monthlySalary: 16500 },
  { department: '设计', monthlySalary: 19500 },
  { department: '设计', monthlySalary: 24000 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'boxplot',
      encode: { x: 'department', y: 'monthlySalary' },
      style: { fill: '#5B8FF9', fillOpacity: 0.12, stroke: '#5B8FF9' },
    },
    {
      type: 'point',
      encode: {
        x: 'department',
        y: 'monthlySalary',
        color: 'department',
        size: 3,
      },
      transform: [{ type: 'jitterX', padding: 0.2 }],
      style: { fillOpacity: 0.65 },
    },
  ],
});

chart.render();
