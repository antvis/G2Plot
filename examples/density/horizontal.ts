import { Chart } from '@antv/g2';

/**
 * 横向密度图
 * 场景：类别名称较长时，转置坐标系让分布沿水平方向展开，标签更易读
 * 要点：coordinate.transform 加 transpose；转置后原 x（类别）落在纵轴、
 *       原 y（数值）落在横轴，axis.x / axis.y 的标题要跟着换位
 */
const data = [
  { department: '售前咨询', waitMinutes: 1 },
  { department: '售前咨询', waitMinutes: 2 },
  { department: '售前咨询', waitMinutes: 2 },
  { department: '售前咨询', waitMinutes: 3 },
  { department: '售前咨询', waitMinutes: 4 },
  { department: '售前咨询', waitMinutes: 5 },
  { department: '售前咨询', waitMinutes: 6 },
  { department: '售前咨询', waitMinutes: 7 },
  { department: '售前咨询', waitMinutes: 8 },
  { department: '售前咨询', waitMinutes: 10 },
  { department: '售前咨询', waitMinutes: 12 },
  { department: '售前咨询', waitMinutes: 15 },
  { department: '售后服务', waitMinutes: 3 },
  { department: '售后服务', waitMinutes: 4 },
  { department: '售后服务', waitMinutes: 5 },
  { department: '售后服务', waitMinutes: 6 },
  { department: '售后服务', waitMinutes: 7 },
  { department: '售后服务', waitMinutes: 8 },
  { department: '售后服务', waitMinutes: 9 },
  { department: '售后服务', waitMinutes: 11 },
  { department: '售后服务', waitMinutes: 13 },
  { department: '售后服务', waitMinutes: 16 },
  { department: '售后服务', waitMinutes: 20 },
  { department: '售后服务', waitMinutes: 25 },
  { department: '投诉处理', waitMinutes: 12 },
  { department: '投诉处理', waitMinutes: 15 },
  { department: '投诉处理', waitMinutes: 18 },
  { department: '投诉处理', waitMinutes: 20 },
  { department: '投诉处理', waitMinutes: 24 },
  { department: '投诉处理', waitMinutes: 28 },
  { department: '投诉处理', waitMinutes: 32 },
  { department: '投诉处理', waitMinutes: 36 },
  { department: '投诉处理', waitMinutes: 40 },
  { department: '投诉处理', waitMinutes: 46 },
  { department: '投诉处理', waitMinutes: 52 },
  { department: '投诉处理', waitMinutes: 60 },
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
        field: 'waitMinutes',
        groupBy: ['department'],
        size: 24,
        min: 0,
        max: 70,
      },
    ],
  },
  encode: { x: 'department', y: 'y', size: 'size' },
  coordinate: { transform: [{ type: 'transpose' }] },
  style: {
    fill: '#5AD8A6',
    stroke: '#3A9E72',
    fillOpacity: 0.35,
    lineWidth: 1.5,
  },
  axis: {
    x: { title: '部门' },
    y: { title: '等待时长（分钟）' },
  },
});

chart.render();
